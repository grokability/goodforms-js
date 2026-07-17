
import tooltip_html from './tooltip.html'
import {ensure_css} from './visuals'

export class tooltip {
    constructor(email_field) {
        this.reference = email_field
    }


    show(contents) {
        ensure_css()
        document.body.insertAdjacentHTML('beforeend', tooltip_html)
        this.tooltip = document.body.lastChild

        // console.log("Last Child Is:")
        // console.dir(this.tooltip)
        this.tooltip.innerHTML = contents

        let rect = this.reference.getBoundingClientRect()
        this.tooltip.style.left = (rect.x + window.scrollX) + "px" //pageXOffset TODO - need the offset versions here for IE compat?
        this.tooltip.style.top = (rect.bottom + window.scrollY) + "px" //pageYOffset TODO - same

        // TODO - if we have *TWO* errors showing up - perhaps for two email fields - we will need to be able to handle that.
    }

    hide() {
        if( !this.tooltip ) { //nothing to do; there's no tooltip on display
            return
        }
        this.tooltip.innerHTML = "valid email" // TODO should come from server - maybe 'msg' parameter?
        this.tooltip.className += " goodforms_valid_email" //this *is* working

        this.tooltip.style.visibility = 'hidden' //can't move this to CSS too, because visibility is a transition trigger
        this.tooltip.style.opacity = 0 // also a trigger
        window.setTimeout( () => {
            // console.log("I am deleting myself, I am: ")
            // console.dir(this.tooltip)
            //this.remove()
        }, 2100)
    }

    remove() {
        if (!this.tooltip) {
            return
        }
        this.tooltip.parentNode.removeChild(this.tooltip) //it's saying it *has* no parent?
        this.tooltip = null
    }
}