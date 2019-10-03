
import log from "./logging"
import { is_array } from "./utils"
import JSONP from "browser-jsonp"

//import tingle from "tingle.js"

import Tooltip from "tooltip.js"

import MicroModal from 'micromodal';

//import 'tingle.js/dist/tingle.min.css' //FIXME - we should perhaps set the rollup config to NOT inject by default, and then we do it ourselves later when needed?
                                        //if other people are also using the Tingle library, then this would prevent us all from conflicting with each other

import './popper.css' //FIXME - this also should only be loaded if needed (allow customers to override CSS I guess?)

import './micromodal.css' //FIXME - only import when it's needed so we don't unnecessarily junk up the DOM

// FIXME - I also don't like Tingle very much, I think I want to swap it for Micromodal.js
// import MicroModal from 'micromodal';  // es6 module

var node_creator = function (name, attributes, text) {
    var elem = document.createElement(name)
    for (var key in attributes) {
        elem.setAttribute(key,attributes[key])
    }
    if(text) {
        elem.appendChild(document.createTextNode(text))
    }
    return elem
}

export default class Form {
    constructor(options) {
        log.debug("Invoking Class constructor!")
        for(let key in options) {
            log.debug("Setting: "+key+" to "+options[key])
            this[key] = options[key]
        }
        if(!this.form_key) {
            return log.error("No Form Key set!")
        }
        if(this.manual) {
            //bail out of the rest of setup for manual-mode
            log.debug("Manual mode selected; exiting setup")
            return
        }
        if(!this.email_field) {
            return log.error("No Email Field set!")
        }
        if(!this.form) {
            log.debug("Trying to guess Form value")
            //try and guess form from email field's 'form' property
            this.form = this.email_field.form
            log.debug("Picked: "+this.form)
        }
        if(!this.form) {
            return log.error("Could not determine Form!")
        }
        if(!this.submit_button) {
            log.debug("Trying to find submit buttons...")
            let submit_buttons=[]
            for(let element in this.form.elements) { //FIXME - should use integers only?
                let this_element = this.form.elements[element]
                log.debug("Checking element: "+element+" - nodeName: '"+this_element.nodeName+"' Type: '"+this_element.type+"'")
                if(this_element.nodeName == "INPUT" && this_element.type =="submit") { //FIXME - should find other submitting-buttons too! e.g. <button> or <input type='button'>
                    log.debug("Found a submit button")
                    submit_buttons.push(this_element)
                }
            }
            this.submit_button = submit_buttons
        }
        this.initialize_dom()
    }

    initialize_dom() {
        // set up the onchange handler for the email field
        let old_onchange = this.email_field.onchange
        this.email_field.onchange = (event) => {
            this.onchange_handler(event)
            if(old_onchange) {
                old_onchange(event)
            }
        }

        //set up the onsubmit handler for the form (if there is one)
        if(this.form) {
            let old_onsubmit = this.form.onsubmit
            this.form.onsubmit = function (event) {
                var results
                if(old_onsubmit) {
                    results = old_onsubmit(event) //FIXME - confusing, *their* old onsubmit handler fires *first*?
                }
                if(results) {
                    return this.onsubmit_handler(event)
                }
            }
        }

        //disable submit button, if there is one - 
        this.disable_submits()
    }

    disable_submits() {
        this.set_submit_button_disabled(true)
    }

    enable_submits() {
        this.set_submit_button_disabled(false)
    }

    set_submit_button_disabled(state) {
        if(this.submit_button) {
            log.debug("Trying to disable submit button...")
            if(is_array(this.submit_button)) {
                log.debug("Submit button IS ARRAY")
                for(let x in this.submit_button) {
                    this.submit_button[x].disabled = state
                }
            } else {
                this.submit_button.disabled = state
            }
        }
    }

    onchange_handler(event) {
        this.verify(this.email_field.value, (results) => {
            log.debug("Verification results are: ")
            log.debugdir(results)
            switch(results.status) {
                case "BAD":
                //FIRE HOOKS FIRST? FIXME
                if(!this.mytooltip) {
                    this.mytooltip = new Tooltip(this.email_field, {placement: 'bottom', title: 'Bad Email Address', trigger: 'manual'})
                }
                this.mytooltip.show()
                this.disable_submits()
                break

                case "GOOD": //FIXME copypasta EVERYWHERE
                //FIRE HOOKS FIRST? FIXME
                if(this.mytooltip) {
                    this.mytooltip.hide()
                }
                this.insert_checksum(results.checksum)
                this.insert_status(results.status)
                this.enable_submits()
                break

                case "CHALLENGE":
                //FIRE HOOKS FIRST? FIXME
                ///uh....throw up a prompt?
                this.display_challenge_modal(results.challenge_key)
                break
                //no idea!
            }
        })
    }

    insert_checksum(value) {
        var checksum_element = document.getElementById('goodverification_checksum')
        if(checksum_element) {
            checksum_element.value = value
            return
        }

        this.form.appendChild(node_creator('input', {'type': 'hidden','name': 'checksum','value': value,'id': 'goodverification_checksum'}))
    }

    insert_status(status) { //FIXME this is copypasta relative to insert_checksum()
        var status_element = document.getElementById('goodverification_status')
        if(status_element) {
            status_element.value = status
            return
        }

        this.form.appendChild(node_creator('input', {'type': 'hidden','name': 'status','value': status,'id': 'goodverification_status'})) //FIXME that name is going to collide
    }

    get_modal(challenge_key) { //TODO - this needs breaking up, it's a little rambly
        log.debug("Getting modal - challenge key is: "+challenge_key)
        if(!this.modal) {
            /*
            need to insert this right before the close-body tag. How in the hell will we do that?!
            document.body gives us the body tag
            .appendChild() will let you insert nodes, I guess?

            <!-- Container -->
            <div id="modal-1" aria-hidden="true">
                <!-- Overlay -->
                <div tabindex="-1" data-micromodal-close>
                    <!-- Container -->
                    <div role="dialog" aria-modal="true" aria-labelledby="modal-1-title" >
                        <header>
                            <h2 id="modal-1-title">
                            Modal Title
                            </h2>

                            <!-- [4] -->
                            <button aria-label="Close modal" data-micromodal-close></button>
                        </header>

                        <div id="modal-1-content">
                            Modal Content
                        </div>
                    </div>
                </div>
            </div>
            */
            /*
            //something I'm thinking about - doesn't work yet, and it doesn't make sense because
            you can't have two div's at the same level. But maybe something like this? Clever array stuff?
            Dunno. 
            var _test = {div: [{id: "modal-1","aria-hidden": true},{ //use native JS types; automatically cast bool to text
                div: [{tabindex: -1,"data-micromodal-close: ""},{ //use integer type, cast to text
                    div: [{role: "dialog","aria-modal": true,"aria-labelledby":"modal-1-title"},{
                        header: [{},{
                            h2: [{id: "modal-1-title"},"Modal Title"], //detect text?
                            button: [{"aria-label": "Close modal","data-micromodal-close":""},{}] //omit?
                        },
                        div: [{id: "modal-1-content"},"Modal Content"]] //text!
                    }]
                }]
            }]}

            if you needed *TWO* divs or something, you could do:

            {div: [{id: "blah"},[
                {div: [{},{}]},
                {div: [{},{}]}
            ]]}
            */

            //FIXME prolly need to rename all of these classes to something unique
            //FIXME will need to update the CSS accordingly as well.
            var modal = node_creator("div", {"id": "goodverification-modal", "aria-hidden":"true", "class": "modal micromodal-slide"})

            var overlay = node_creator("div", {"tabindex": "-1", "data-micromodal-close": "", "class": "modal__overlay"})

            var container = node_creator("div", {"role": "dialog","aria-modal": "true", "aria-labelledby": "modal-1-title", "class": "modal__container"})
            
            var header = node_creator("header", {"class":"modal__header"})
            
            var h2 = node_creator("h2", {"id": "modal-1-title","class": "modal__title"},"Too Many Verifications")

            var close_button = node_creator("button", {"aria-label": "Close modal","data-micromodal-close": "", "class": "modal__close"})

            header.appendChild(h2)
            header.appendChild(close_button)

            var content = node_creator("div", {"id":"modal-1-content","class": "modal__content"},  "Too many verifications from this IP. We need to send you an email to verify that you are you! "+
            "If you agree, re-type your email here: ")
            var input = node_creator("input", {"type": "text","id": "goodverification_challenge_address"})
            content.appendChild(input)

            var footer = node_creator("footer", {"class":"modal__footer"})
            var button = node_creator("button", {"class":"modal__btn modal__btn-primary"},"Continue")
            button.onclick = () => {
                if(this.email_field.value != document.getElementById('goodverification_challenge_address').value) {
                    log.debug("Field value: "+this.email_field.value+" , challenge_address: "+document.getElementById('goodverification_challenge_address').value)
                    document.getElementById("modal-1-content").innerHTML = "Email doesn't match field on form!" //FIXME - don't use innerHTML
                    //this.modal.setContent("Email doesn't match field on form!")
                    //can we yank the 'submit' button? FIXME!
                    return
                }
                this.challenge(this.email_field.value,challenge_key, (results) => {
                    log.debug("Challenge results are: ")
                    log.debugdir(results)
                    if(results.status == "ACCEPTED") {
                        document.getElementById("modal-1-content").innerHTML = "Input emailed PIN: <input type='text' id='goodverification_pin' />" // FIXME - don't use innerHTML?
                        button.onclick = () => {
                            let pin = document.getElementById('goodverification_pin').value
                            this.response(this.email_field.value,challenge_key, pin, (response) => {
                                log.debugdir(response)
                                if(response.status == "GOOD") {
                                    MicroModal.close('goodverification-modal')
                                    this.insert_checksum(response.checksum)
                                    this.insert_status(response.status)
                                    this.enable_submits()
                                }
                            })
                        }
                        //this.modal.setContent("Input emailed PIN: <input type='text' id='goodverification_pin' />")
                    } else {
                        window.alert("Challenge rejected!") //FIXME - should never happen tho!
                    }
                })
            }
            footer.appendChild(button)
            footer.appendChild(node_creator("button",{"class": "modal__btn","data-micromodal-close": "","aria-label":"Close this dialog window"},"Close"))

            container.appendChild(header)
            container.appendChild(content)
            container.appendChild(footer)

            overlay.appendChild(container)
            modal.appendChild(overlay)

            document.body.appendChild(modal)
            this.modal = true
        }
        return this.modal
    }

    display_challenge_modal(challenge_key) {
        this.get_modal(challenge_key)
        MicroModal.show('goodverification-modal',{
            debugMode: true,
            awaitCloseAnimation: true,
            onShow: modal => console.info(`${modal.id} is shown`),
            onClose: modal => console.info(`${modal.id} is hidden`), 
        })
        /* 
        if(!this.modal) {
            this.modal = new tingle.modal({
                footer: true,
                stickyFooter: false,
                closeMethods: ['button'], // ['overlay', 'button', 'escape'],
                closeLabel: "Close",
                //cssClass: ['custom-class-1', 'custom-class-2'],
                onOpen: function() {
                    console.log('modal open')
                },
                onClose: function() {
                    console.log('modal closed')
                },
                beforeClose: function() {
                    // here's goes some logic
                    // e.g. save content before closing the modal
                    return true // close the modal
                    //return false; // nothing happens
                }
            })
            this.modal.addFooterBtn('Cancel', 'tingle-btn', () => {
                // here goes some logic
                this.modal.close()
            })
            
            this.modal.addFooterBtn('Send Challenge Email', 'tingle-btn tingle-btn--primary', () => {
                // here goes some logic
                if(this.email_field.value != document.getElementById('goodverification_challenge_address').value) {
                    log.debug("Field value: "+this.email_field.value+" , challenge_address: "+document.getElementById('goodverification_challenge_address').value)
                    this.modal.setContent("Email doesn't match field on form!")
                    //can we yank the 'submit' button? FIXME!
                    return
                }
                this.challenge(this.email_field.value,challenge_key, (results) => {
                    log.debug("Challenge results are: "+results)
                    console.dir(results)
                    if(results.status == "ACCEPTED") {
                        this.modal.setContent("Input emailed PIN: <input type='text' id='goodverification_pin' />")
                    }
                })
                //this.modal.close()
            })
        }
        this.modal.setContent("Too many verifications from this IP. We need to send you an email to verify that you are you! "+
                                "If you agree, re-type your email here: <input type='text' id='goodverification_challenge_address' />")
        this.modal.open()
        */
    }

    onsubmit_handler(event) {
        DO_SOMETHING_CLEVERER()
        JSONP("url")
    }

    verify(email, callback) {
        JSONP({url: HOST+"/verify",
            data: {email: email, form_key: this.form_key}, 
            success: function (data) {
                if(data.error) {
                    log.error(data.error)
                }
                callback(data)
            }
        })
    }

    challenge(email, challenge_key, callback) {
        JSONP({url: HOST+"/challenge",
            data: {email: email, form_key: this.form_key, challenge_key: challenge_key},
            success: function (data) {
                callback(data)
                // switch(data.status) {
                //     case "GOOD":

                // }
            }
        })
    }

    response(email, challenge_key, pin, callback) {
        JSONP({url: HOST+"/response",
            data: {email: email, challenge_key: challenge_key, pin: pin, form_key: this.form_key},
            success: (data) => {
                if(this.mytooltip) {
                    this.mytooltip.hide()
                }
                this.enable_submits()

                callback(data)
        
            }
        })
    }
}