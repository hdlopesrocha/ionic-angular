import { Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, Renderer, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { isPresent, isTrueProperty } from '../../util/util';
import { Platform } from '../../platform/platform';
import { TimeoutDebouncer } from '../../util/debouncer';
/**
 * \@name Searchbar
 * \@module ionic
 * \@description
 * Manages the display of a Searchbar which can be used to search or filter items.
 *
 * \@usage
 * ```html
 * <ion-searchbar
 *   [(ngModel)]="myInput"
 *   [showCancelButton]="shouldShowCancel"
 *   (ionInput)="onInput($event)"
 *   (ionCancel)="onCancel($event)">
 * </ion-searchbar>
 * ```
 *
 * \@demo /docs/v2/demos/src/searchbar/
 * @see {\@link /docs/v2/components#searchbar Searchbar Component Docs}
 */
export class Searchbar extends Ion {
    /**
     * @param {?} config
     * @param {?} _plt
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} ngControl
     */
    constructor(config, _plt, elementRef, renderer, ngControl) {
        super(config, elementRef, renderer, 'searchbar');
        this._plt = _plt;
        this._value = '';
        this._shouldBlur = true;
        this._shouldAlignLeft = true;
        this._isCancelVisible = false;
        this._spellcheck = false;
        this._autocomplete = 'off';
        this._autocorrect = 'off';
        this._isActive = false;
        this._debouncer = new TimeoutDebouncer(250);
        this._showCancelButton = false;
        this._animated = false;
        /**
         * @input {string} Set the the cancel button text. Default: `"Cancel"`.
         */
        this.cancelButtonText = 'Cancel';
        /**
         * @input {string} Set the input's placeholder. Default `"Search"`.
         */
        this.placeholder = 'Search';
        /**
         * @input {string} Set the type of the input. Values: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, `"url"`. Default `"search"`.
         */
        this.type = 'search';
        /**
         * @output {event} Emitted when the Searchbar input has changed, including when it's cleared.
         */
        this.ionInput = new EventEmitter();
        /**
         * @output {event} Emitted when the Searchbar input has blurred.
         */
        this.ionBlur = new EventEmitter();
        /**
         * @output {event} Emitted when the Searchbar input has focused.
         */
        this.ionFocus = new EventEmitter();
        /**
         * @output {event} Emitted when the cancel button is clicked.
         */
        this.ionCancel = new EventEmitter();
        /**
         * @output {event} Emitted when the clear input button is clicked.
         */
        this.ionClear = new EventEmitter();
        /**
         * @private
         */
        this.onChange = (_) => { };
        /**
         * @private
         */
        this.onTouched = () => { };
        // If the user passed a ngControl we need to set the valueAccessor
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    /**
     * \@input {string} The color to use from your Sass `$colors` map.
     * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
     * For more information, see [Theming your App](/docs/v2/theming/theming-your-app).
     * @param {?} val
     * @return {?}
     */
    set color(val) {
        this._setColor(val);
    }
    /**
     * \@input {string} The mode determines which platform styles to use.
     * Possible values are: `"ios"`, `"md"`, or `"wp"`.
     * For more information, see [Platform Styles](/docs/v2/theming/platform-specific-styles).
     * @param {?} val
     * @return {?}
     */
    set mode(val) {
        this._setMode(val);
    }
    /**
     * \@input {boolean} If true, show the cancel button.
     * @return {?}
     */
    get showCancelButton() {
        return this._showCancelButton;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set showCancelButton(val) {
        this._showCancelButton = isTrueProperty(val);
    }
    /**
     * \@input {number} How long, in milliseconds, to wait to trigger the `ionInput` event after each keystroke. Default `250`.
     * @return {?}
     */
    get debounce() {
        return this._debouncer.wait;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set debounce(val) {
        this._debouncer.wait = val;
    }
    /**
     * \@input {string} Set the input's autocomplete property. Values: `"on"`, `"off"`. Default `"off"`.
     * @param {?} val
     * @return {?}
     */
    set autocomplete(val) {
        this._autocomplete = (val === '' || val === 'on') ? 'on' : this._config.get('autocomplete', 'off');
    }
    /**
     * \@input {string} Set the input's autocorrect property. Values: `"on"`, `"off"`. Default `"off"`.
     * @param {?} val
     * @return {?}
     */
    set autocorrect(val) {
        this._autocorrect = (val === '' || val === 'on') ? 'on' : this._config.get('autocorrect', 'off');
    }
    /**
     * \@input {string|boolean} Set the input's spellcheck property. Values: `true`, `false`. Default `false`.
     * @param {?} val
     * @return {?}
     */
    set spellcheck(val) {
        this._spellcheck = (val === '' || val === 'true' || val === true) ? true : this._config.getBoolean('spellcheck', false);
    }
    /**
     * \@input {boolean} If true, enable searchbar animation.
     * @return {?}
     */
    get animated() {
        return this._animated;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set animated(val) {
        this._animated = isTrueProperty(val);
    }
    /**
     * \@input {string} Set the input value.
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        this._value = val;
        if (this._searchbarInput) {
            let /** @type {?} */ ele = this._searchbarInput.nativeElement;
            if (ele) {
                ele.value = val;
            }
        }
    }
    /**
     * On Initialization check for attributes
     * @return {?}
     */
    ngOnInit() {
        let /** @type {?} */ showCancelButton = this.showCancelButton;
        if (typeof showCancelButton === 'string') {
            this.showCancelButton = (showCancelButton === '' || showCancelButton === 'true');
        }
    }
    /**
     * After View Checked position the elements
     * @return {?}
     */
    ngAfterContentInit() {
        this.positionElements();
    }
    /**
     * Positions the input search icon, placeholder, and the cancel button
     * based on the input value and if it is focused. (ios only)
     * @return {?}
     */
    positionElements() {
        let /** @type {?} */ isAnimated = this._animated;
        let /** @type {?} */ prevAlignLeft = this._shouldAlignLeft;
        let /** @type {?} */ shouldAlignLeft = (!isAnimated || (this._value && this._value.toString().trim() !== '') || this._sbHasFocus === true);
        this._shouldAlignLeft = shouldAlignLeft;
        if (this._mode !== 'ios') {
            return;
        }
        if (prevAlignLeft !== shouldAlignLeft) {
            this.positionPlaceholder();
        }
        if (isAnimated) {
            this.positionCancelButton();
        }
    }
    /**
     * @return {?}
     */
    positionPlaceholder() {
        if (!this._searchbarInput || !this._searchbarIcon) {
            return;
        }
        let /** @type {?} */ inputEle = this._searchbarInput.nativeElement;
        let /** @type {?} */ iconEle = this._searchbarIcon.nativeElement;
        if (this._shouldAlignLeft) {
            inputEle.removeAttribute('style');
            iconEle.removeAttribute('style');
        }
        else {
            // Create a dummy span to get the placeholder width
            var /** @type {?} */ doc = this._plt.doc();
            var /** @type {?} */ tempSpan = doc.createElement('span');
            tempSpan.innerHTML = this.placeholder;
            doc.body.appendChild(tempSpan);
            // Get the width of the span then remove it
            var /** @type {?} */ textWidth = tempSpan.offsetWidth;
            doc.body.removeChild(tempSpan);
            // Set the input padding left
            var /** @type {?} */ inputLeft = 'calc(50% - ' + (textWidth / 2) + 'px)';
            inputEle.style.paddingLeft = inputLeft;
            // Set the icon margin left
            var /** @type {?} */ iconLeft = 'calc(50% - ' + ((textWidth / 2) + 30) + 'px)';
            iconEle.style.marginLeft = iconLeft;
        }
    }
    /**
     * Show the iOS Cancel button on focus, hide it offscreen otherwise
     * @return {?}
     */
    positionCancelButton() {
        if (!this._cancelButton || !this._cancelButton.nativeElement) {
            return;
        }
        let /** @type {?} */ showShowCancel = this._sbHasFocus;
        if (showShowCancel !== this._isCancelVisible) {
            let /** @type {?} */ cancelStyleEle = this._cancelButton.nativeElement;
            let /** @type {?} */ cancelStyle = cancelStyleEle.style;
            this._isCancelVisible = showShowCancel;
            if (showShowCancel) {
                cancelStyle.marginRight = '0';
            }
            else {
                let /** @type {?} */ offset = cancelStyleEle.offsetWidth;
                if (offset > 0) {
                    cancelStyle.marginRight = -offset + 'px';
                }
            }
        }
    }
    /**
     * Update the Searchbar input value when the input changes
     * @param {?} ev
     * @return {?}
     */
    inputChanged(ev) {
        this._value = ev.target.value;
        this._debouncer.debounce(() => {
            this.onChange(this._value);
            this.ionInput.emit(ev);
        });
    }
    /**
     * Sets the Searchbar to focused and active on input focus.
     * @param {?} ev
     * @return {?}
     */
    inputFocused(ev) {
        this.ionFocus.emit(ev);
        this._sbHasFocus = true;
        this._isActive = true;
        this.positionElements();
    }
    /**
     * Sets the Searchbar to not focused and checks if it should align left
     * based on whether there is a value in the searchbar or not.
     * @param {?} ev
     * @return {?}
     */
    inputBlurred(ev) {
        // _shouldBlur determines if it should blur
        // if we are clearing the input we still want to stay focused in the input
        if (this._shouldBlur === false) {
            this._searchbarInput.nativeElement.focus();
            this._shouldBlur = true;
            return;
        }
        this.ionBlur.emit(ev);
        this._sbHasFocus = false;
        this.positionElements();
    }
    /**
     * Clears the input field and triggers the control change.
     * @param {?} ev
     * @return {?}
     */
    clearInput(ev) {
        this.ionClear.emit(ev);
        // setTimeout() fixes https://github.com/driftyco/ionic/issues/7527
        // wait for 4 frames
        setTimeout(() => {
            let /** @type {?} */ value = this._value;
            if (isPresent(value) && value !== '') {
                this.value = ''; // DOM WRITE
                this.onChange(this._value);
                this.ionInput.emit(ev);
            }
        }, 16 * 4);
        this._shouldBlur = false;
    }
    /**
     * Clears the input field and tells the input to blur since
     * the clearInput function doesn't want the input to blur
     * then calls the custom cancel function if the user passed one in.
     * @param {?} ev
     * @return {?}
     */
    cancelSearchbar(ev) {
        this.ionCancel.emit(ev);
        this.clearInput(ev);
        this._shouldBlur = true;
        this._isActive = false;
    }
    /**
     * Write a new value to the element.
     * @param {?} val
     * @return {?}
     */
    writeValue(val) {
        this.value = val;
        this.positionElements();
    }
    /**
     * Set the function to be called when the control receives a change event.
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Set the function to be called when the control receives a touch event.
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @return {?}
     */
    setFocus() {
        this._renderer.invokeElementMethod(this._searchbarInput.nativeElement, 'focus');
    }
}
Searchbar.decorators = [
    { type: Component, args: [{
                selector: 'ion-searchbar',
                template: '<div class="searchbar-input-container">' +
                    '<button ion-button mode="md" (click)="cancelSearchbar($event)" (mousedown)="cancelSearchbar($event)" clear color="dark" class="searchbar-md-cancel" type="button">' +
                    '<ion-icon name="md-arrow-back"></ion-icon>' +
                    '</button>' +
                    '<div #searchbarIcon class="searchbar-search-icon"></div>' +
                    '<input #searchbarInput class="searchbar-input" (input)="inputChanged($event)" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" ' +
                    '[attr.placeholder]="placeholder" ' +
                    '[attr.type]="type" ' +
                    '[attr.autocomplete]="_autocomplete" ' +
                    '[attr.autocorrect]="_autocorrect" ' +
                    '[attr.spellcheck]="_spellcheck">' +
                    '<button ion-button clear class="searchbar-clear-icon" [mode]="_mode" (click)="clearInput($event)" (mousedown)="clearInput($event)" type="button"></button>' +
                    '</div>' +
                    '<button ion-button #cancelButton mode="ios" [tabindex]="_isActive ? 1 : -1" clear (click)="cancelSearchbar($event)" (mousedown)="cancelSearchbar($event)" class="searchbar-ios-cancel" type="button">{{cancelButtonText}}</button>',
                host: {
                    '[class.searchbar-animated]': '_animated',
                    '[class.searchbar-has-value]': '_value',
                    '[class.searchbar-active]': '_isActive',
                    '[class.searchbar-show-cancel]': '_showCancelButton',
                    '[class.searchbar-left-aligned]': '_shouldAlignLeft'
                },
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
Searchbar.ctorParameters = () => [
    { type: Config, },
    { type: Platform, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: NgControl, decorators: [{ type: Optional },] },
];
Searchbar.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'cancelButtonText': [{ type: Input },],
    'showCancelButton': [{ type: Input },],
    'debounce': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'autocomplete': [{ type: Input },],
    'autocorrect': [{ type: Input },],
    'spellcheck': [{ type: Input },],
    'type': [{ type: Input },],
    'animated': [{ type: Input },],
    'ionInput': [{ type: Output },],
    'ionBlur': [{ type: Output },],
    'ionFocus': [{ type: Output },],
    'ionCancel': [{ type: Output },],
    'ionClear': [{ type: Output },],
    '_sbHasFocus': [{ type: HostBinding, args: ['class.searchbar-has-focus',] },],
    '_searchbarInput': [{ type: ViewChild, args: ['searchbarInput',] },],
    '_searchbarIcon': [{ type: ViewChild, args: ['searchbarIcon',] },],
    '_cancelButton': [{ type: ViewChild, args: ['cancelButton', { read: ElementRef },] },],
    'value': [{ type: Input },],
};
function Searchbar_tsickle_Closure_declarations() {
    /** @type {?} */
    Searchbar.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Searchbar.ctorParameters;
    /** @type {?} */
    Searchbar.propDecorators;
    /** @type {?} */
    Searchbar.prototype._value;
    /** @type {?} */
    Searchbar.prototype._shouldBlur;
    /** @type {?} */
    Searchbar.prototype._shouldAlignLeft;
    /** @type {?} */
    Searchbar.prototype._isCancelVisible;
    /** @type {?} */
    Searchbar.prototype._spellcheck;
    /** @type {?} */
    Searchbar.prototype._autocomplete;
    /** @type {?} */
    Searchbar.prototype._autocorrect;
    /** @type {?} */
    Searchbar.prototype._isActive;
    /** @type {?} */
    Searchbar.prototype._debouncer;
    /** @type {?} */
    Searchbar.prototype._showCancelButton;
    /** @type {?} */
    Searchbar.prototype._animated;
    /**
     * \@input {string} Set the the cancel button text. Default: `"Cancel"`.
     * @type {?}
     */
    Searchbar.prototype.cancelButtonText;
    /**
     * \@input {string} Set the input's placeholder. Default `"Search"`.
     * @type {?}
     */
    Searchbar.prototype.placeholder;
    /**
     * \@input {string} Set the type of the input. Values: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, `"url"`. Default `"search"`.
     * @type {?}
     */
    Searchbar.prototype.type;
    /**
     * \@output {event} Emitted when the Searchbar input has changed, including when it's cleared.
     * @type {?}
     */
    Searchbar.prototype.ionInput;
    /**
     * \@output {event} Emitted when the Searchbar input has blurred.
     * @type {?}
     */
    Searchbar.prototype.ionBlur;
    /**
     * \@output {event} Emitted when the Searchbar input has focused.
     * @type {?}
     */
    Searchbar.prototype.ionFocus;
    /**
     * \@output {event} Emitted when the cancel button is clicked.
     * @type {?}
     */
    Searchbar.prototype.ionCancel;
    /**
     * \@output {event} Emitted when the clear input button is clicked.
     * @type {?}
     */
    Searchbar.prototype.ionClear;
    /** @type {?} */
    Searchbar.prototype._sbHasFocus;
    /** @type {?} */
    Searchbar.prototype._searchbarInput;
    /** @type {?} */
    Searchbar.prototype._searchbarIcon;
    /** @type {?} */
    Searchbar.prototype._cancelButton;
    /** @type {?} */
    Searchbar.prototype.onChange;
    /** @type {?} */
    Searchbar.prototype.onTouched;
    /** @type {?} */
    Searchbar.prototype._plt;
}
//# sourceMappingURL=searchbar.js.map