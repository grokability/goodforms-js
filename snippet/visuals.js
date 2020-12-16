
import MicroModal from 'micromodal'
import micromodal_css from './micromodal.css'

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
    insert_or_update_hidden('goodforms_checksum','goodforms_checksum',checksum, form)
    insert_or_update_hidden('goodforms_status','goodforms_status',status, form)
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

    show(challenge_key, message, button_callback) {
        this.message = message
        if(!this.css) {
            styleInject(micromodal_css, {insertAt: 'top'}) //insert at top so customer-generated styles will override
            this.css = true //TODO - on a page with many forms, the CSS will be re-inserted multiple times
        }
        this.get_modal(challenge_key)
        this.set_modal_action(button_callback)
        this.display_challenge_modal(challenge_key)
    }

    hide() {
        if(this.modal) {
            MicroModal.close('goodforms-modal')
            //should we dispose of it as well? It could be junking up their DOM I guess?
            // I *think* that this is subsumed by our code to automagically clean up the modal onClose (see display_challenge_modal.onClose)
            //document.body.removeChild(this.modal)
            //this.modal = null
        }
    }

    set_modal_action(callback) {
        this.button.onclick = callback
    }

    get_challenge_address() {
        return document.getElementById('goodforms_challenge_address').value
    }

    get_pin_code() {
        return document.getElementById('goodforms_pin').value 
    }

    get_modal(challenge_key) { //TODO - this needs breaking up, it's a little rambly
        log.debug("Getting modal - challenge key is: "+challenge_key)
        if(!this.modal) {

            //FIXME prolly need to rename all of these classes to something unique
            //FIXME will need to update the CSS accordingly as well.
            /*
            There are a few bits of English here, that we need to replace. My initial instinct is to expand `message` (this.message)
            into a more complex blob of text - something like:

            // This sucks, and is stupid. Let's somehow do this better.
            // honestly I'm tempted to go Iframe. Then the server can send whatever bullshit it wants.
            // though that failed the last time we tried it. But we're smarter now :)
            {
                'close': 'Close modal',
                'message': 'We can't determine if the email address is valid or not.',
                'header': 'Too Many Verifications', // SIC FIXME - should not say this.
                'prompt': "To verify your email address, we need to send you an email. If you agree, re-type your email here: ",
                'continue': 'Continue',
                'close_verbose?': 'Close this dialog window',
                'close_again': 'Close'
            }
            */
            var modal = node_creator("div", {"id": "goodforms-modal", "aria-hidden":"true", "class": "modal micromodal-slide"})

            var overlay = node_creator("div", {"tabindex": "-1", "data-micromodal-close": "", "class": "modal__overlay"})

            var container = node_creator("div", {"role": "dialog","aria-modal": "true", "aria-labelledby": "modal-1-title", "class": "modal__container"})
            
            var header = node_creator("header", {"class":"modal__header"})
            
            // var h2 = node_creator("h2", {"id": "modal-1-title","class": "modal__title"},"Too Many Verifications") # HOW to get that language?

            var close_button = node_creator("button", {"aria-label": "Close modal","data-micromodal-close": "", "class": "modal__close"})

            //header.appendChild(h2)
            header.appendChild(close_button)

            var content = node_creator("div", {"id":"modal-1-content","class": "modal__content"},  this.message+". "+
            "To verify your email address, we need to send you an email. If you agree, re-type your email here: ") // FIXME - hardcoded en-us; should read it from server.
            var input = node_creator("input", {"type": "text","id": "goodforms_challenge_address"})
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
        MicroModal.show('goodforms-modal',{
            debugMode: true,
            awaitCloseAnimation: true,
            onShow: modal => console.info(`${modal.id} is shown`),
            onClose: modal => {
                console.info(`${modal.id} is hidden`)
                if(this.modal) {
                    document.body.removeChild(this.modal)
                    delete this.modal
                } else {
                    console.info("Wait, what?! this.modal is null (or false, or something?!)")
                }
            }
        })
    }

    bad_address() {
        document.getElementById("modal-1-content").innerHTML = "Email doesn't match field on form! Please retry: <input type='text' id='goodforms_challenge_address'>" //FIXME - don't use innerHTML
    }

    pin_input() {
        document.getElementById("modal-1-content").innerHTML = "Input emailed PIN: <input type='text' id='goodforms_pin' />" // FIXME - don't use innerHTML?
    }

    bad_pin() {
        document.getElementById("modal-1-content").innerHTML = "<span style='color: red'>Invalid PIN entered. Please retry.</span><br>Input emailed PIN: <input type='text' id='goodforms_pin' />" // FIXME - don't use innerHTML?
    }

}