
import MicroModal from 'micromodal'
import micromodal_css from './micromodal.css'

//import 'tingle.js/dist/tingle.min.css'
//import tingle from "tingle.js"

import Tooltip from "tooltip.js" //TODO - I think this is what's bloating everything out :/ It's huge :/
import tooltip_css from './tooltip.css'

import styleInject from 'style-inject'

import log from "./logging"

let node_creator = function (name, attributes, text) {
    var elem = document.createElement(name)
    for (var key in attributes) {
        elem.setAttribute(key,attributes[key])
    }
    if(text) {
        elem.appendChild(document.createTextNode(text))
    }
    return elem
}

export function update_hidden_fields(form, checksum, status) {
    insert_or_update_hidden('checksum','goodverification_checksum',checksum, form)
    insert_or_update_hidden('status','goodverification_status',status, form)
}

let insert_or_update_hidden = function (name,id,value, form) {
    var element = document.getElementById(id)
    if(element) {
        element.value = value
        return
    }
    form.appendChild(node_creator('input', {'type': 'hidden','name': name,'value': value,'id': id}))
}

// IDEA

/* **************************************************
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
**************************************************/

// NOTES 

/***************

This is the HTML that we need to insert right before the close-body tag. How in the hell will we do that?!
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
********************************/

export class modal {
    constructor(email_field) {
        this.modal = null
        this.css = false
        this.email_field = email_field
    }

    show(challenge_key, onclick_handler) {
        if(!this.css) {
            styleInject(micromodal_css, {insertAt: 'top'}) //insert at top so customer-generated styles will override
            this.css = true //TODO - on a page with many forms, the CSS will be re-inserted multiple times
        }
        this.get_modal(challenge_key)
        this.button.onclick = onclick_handler
        this.display_challenge_modal(challenge_key)
    }

    hide() {
        if(this.modal) {
            MicroModal.close('goodverification-modal')
            //should we dispose of it as well? It could be junking up their DOM I guess?
            document.body.removeChild(this.modal)
            this.modal = null
        }
    }

    get_modal(challenge_key) { //TODO - this needs breaking up, it's a little rambly
        log.debug("Getting modal - challenge key is: "+challenge_key)
        if(!this.modal) {

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
            "If you agree, re-type your email here: ") //TODO - internationalize!
            var input = node_creator("input", {"type": "text","id": "goodverification_challenge_address"})
            content.appendChild(input)

            var footer = node_creator("footer", {"class":"modal__footer"})
            var button = node_creator("button", {"class":"modal__btn modal__btn-primary"},"Continue")
            this.button = button //to make it easier to attach an onclick handler
            footer.appendChild(button)
            footer.appendChild(node_creator("button",{"class": "modal__btn","data-micromodal-close": "","aria-label":"Close this dialog window"},"Close")) //FIXME - internationalize!

            container.appendChild(header)
            container.appendChild(content)
            container.appendChild(footer)

            overlay.appendChild(container)
            modal.appendChild(overlay)

            document.body.appendChild(modal)
            this.modal = modal
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
    }

    bad_address() {
        document.getElementById("modal-1-content").innerHTML = "Email doesn't match field on form!" //FIXME - don't use innerHTML
    }

    pin_input() {
        document.getElementById("modal-1-content").innerHTML = "Input emailed PIN: <input type='text' id='goodverification_pin' />" // FIXME - don't use innerHTML?
    }

    //FIXME - not used anymore.
    display_deprecated_tingle_modal(challenge_key) {
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
}

export class tooltip {
    constructor(email_field) {
        this.tooltip = null
        this.email_field = email_field
        this.css = false //TODO - could get inserted multiple times. We can write our own style injector if needed and put it in with an 'id' maybe?
    }

    show(msg) {
        if(!this.css) {
            styleInject(tooltip_css, {insertAt: 'top'}) //deliberately insert at top so customer styles may override
            this.css = true
        }
        if(!this.tooltip) {
            this.tooltip = new Tooltip(this.email_field, {placement: 'bottom', title: msg, trigger: 'manual'})
        } else {
            this.tooltip.updateTitleContent(msg)
        }
        this.tooltip.show()
    }

    hide() {
        if(this.tooltip) {
            this.tooltip.hide()
            //should we 'destroy' it? if so that's this.tooltip.dispose()
        }
    }
}