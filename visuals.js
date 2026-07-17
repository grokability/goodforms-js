
import MicroModal from './micromodal.mjs'
import goodforms_css from './goodforms.less'

import styleInject from 'style-inject'

import log from "./logging"
import modal_html from './modal.html'
import bad_address_html from './bad_address.html'
import pin_input_html from './pin_input.html'
import bad_pin_html from './bad_pin.html'

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

export function ensure_css() {
    if(typeof window.goodforms_css === 'undefined') {
        log.verbose("Ensuring CSS is added!!!")
        styleInject(goodforms_css, {insertAt: 'top'}) //insert at top so customer-generated styles will override
        window.goodforms_css = true
    } else {
        log.verbose("CSS has already been added, doing nothing")
    }
}

export function update_hidden_fields(form, checksum, status) {
    insert_or_update_hidden('goodforms_checksum','goodforms_checksum',checksum, form)
    insert_or_update_hidden('goodforms_status','goodforms_status',status, form)
}

let insert_or_update_hidden = function (name,id,value, form) {
    var element = document.getElementById(id) //TODO - should we get by 'name' instead to better handle folks who put in their own challenge hidden field?
    if(element) {
        element.value = value
        return
    }
    form.appendChild(node_creator('input', {'type': 'hidden','name': name,'value': value,'id': id}))
}

export class modal {
    constructor(email_field) {
        this.modal = null
        this.css = false
        this.email_field = email_field
    }

    show(challenge_key, message, button_callback) {
        this.message = message
        ensure_css()
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

    get_modal(challenge_key) {
        log.verbose("Getting modal - challenge key is: "+challenge_key)
        if(!this.modal) {
            //UGH - so, we need the 'button' - that's aproblem.
            // we also allegedly need a "messagE"?
            let wrapper = document.createElement('body')
            wrapper.innerHTML = modal_html
            this.modal = wrapper.firstChild
            document.body.appendChild(this.modal)
            this.button = document.getElementById('goodforms-continue-button')
        }
        return this.modal
    }

    display_challenge_modal(challenge_key) {
        this.get_modal(challenge_key)
        MicroModal.show('goodforms-modal',{
            debugMode: true,
            awaitCloseAnimation: true,
            onShow: modal => log.verbose(`${modal.id} is shown`),
            onClose: modal => {
                log.verbose(`${modal.id} is hidden`)
                if(this.modal) {
                    document.body.removeChild(this.modal)
                    delete this.modal
                } else {
                    log.debug("Modal's onClose method is invoked and yet 'this.modal' doesn't seem to exist? Ignoring...")
                }
            }
        })
    }

    bad_address() {
        document.getElementById("modal-1-content").innerHTML = bad_address_html
    }

    pin_input() {
        document.getElementById("modal-1-content").innerHTML = pin_input_html
    }

    bad_pin() {
        document.getElementById("modal-1-content").innerHTML = bad_pin_html
    }

}