
import tooltip_html from './tooltip.html'
import styleInject from 'style-inject' //not using this yet but it depends on how the CSS goes. We will want users to be able to override it perhaps?

export class tooltip {
    constructor(email_field) {
        //creates the thing, but does it show it?
        //does this inject the HTML into the DOM?
        // to inject the HTML, we I guess put together our own <div>, set a role="tooltip" on it,
        // set style="display: none" on it,
        // and then do innerHTML on it?
        //does this inject the CSS into the DOM?
        // NO.
        this.reference = email_field
    }

    // static CssInjected = false //not supported in Buble?

    show(contents) {
        // TODO - inject CSS in <head> using styleInject; so end-users can override it. Document those styles, and the properties.
        document.body.insertAdjacentHTML('beforeend', tooltip_html)
        this.tooltip = document.body.lastChild

        // console.log("Last Child Is:")
        // console.dir(this.tooltip)
        this.tooltip.innerHTML = contents

        this.tooltip.style.position = "absolute" //should bake this in to the HTML itself, so long as it works ok?
        let rect = this.reference.getBoundingClientRect()
        this.tooltip.style.left = (rect.x + window.scrollX) + "px" //pageXOffset TODO - need the offset versions here for IE compat?
        this.tooltip.style.top = (rect.bottom + window.scrollY) + "px" //pageYOffset TODO - same

        this.tooltip.style.visibility = "visible"
        // TODO - if we have *TWO* errors showing up - perhaps for two email fields - we will need to be able to handle that.
    }

    hide() {
        // TODO - should invoke these styles using a class transition rather than directly manipulating properties
        if( !this.tooltip ) { //nothing to do; there's no tooltip on display
            return
        }
        //this.tooltip.style.backgroundColor = "green"
        this.tooltip.style.color = "177305"
        this.tooltip.innerHTML = "valid email" // TODO should come from server - maybe 'msg' parameter?
        this.tooltip.style.transition = "visibility 0s 2s, opacity 2s linear"
        this.tooltip.style.opacity = 0
        this.tooltip.style.visibility = 'hidden'
        window.setTimeout( () => {
            // console.log("I am deleting myself, I am: ")
            // console.dir(this.tooltip)
            this.tooltip.parentNode.removeChild(this.tooltip) //it's saying it *has* no parent?
            this.tooltip = null
        }, 2100)
    }
}