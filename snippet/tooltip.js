/* 
import { createPopper } from '@popperjs/core/lib/popper-base.js'

import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
import flip from '@popperjs/core/lib/modifiers/flip.js';
popperOffsets //check
computeStyles //check
arrow //only bonus?
applyStyles //check
eventListeners //check
*/

//import { createPopper } from '@popperjs/core';
import tippy from 'tippy.js'
import tippy_css from 'tippy.js/dist/tippy.css'
import styleInject from 'style-inject'

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

    show(contents) { // FIXME - should be raw HTML or something?
        // inject CSS *IF IT IS NOT INJECTED ALREADY*
        if(!tooltip.CssInjected) {
            styleInject(tippy_css, {insertAt: 'top'})
            tooltip.CssInjected = true
        }
        /* document.body.insertAdjacentHTML('beforeend', 'my html contents')
        createPopper(reference,tooltip,{
            modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 8],
                  },
                },
              ],
            
        })
        */

        this.tippy = tippy(this.reference, {
            content: contents,
            trigger: 'manual',
            hideOnClick: false
        })
        this.tippy.show()
    }

    hide() {
        // let's actually *DELETE* everything here, yeah? why go nuts.
        // then at least it doesn't mangle their page
        if(this.tippy) {
            this.tippy.hide()
            this.tippy.destroy()
            this.tippy = null
        }
    }
}