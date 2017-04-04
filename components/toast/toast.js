var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { ToastCmp } from './toast-component';
import { ViewController } from '../../navigation/view-controller';
export var Toast = (function (_super) {
    __extends(Toast, _super);
    /**
     * @param {?} app
     * @param {?=} opts
     */
    function Toast(app, opts) {
        if (opts === void 0) { opts = {}; }
        opts.dismissOnPageChange = isPresent(opts.dismissOnPageChange) ? !!opts.dismissOnPageChange : false;
        _super.call(this, ToastCmp, opts, null);
        this._app = app;
        // set the position to the bottom if not provided
        if (!opts.position || !this.isValidPosition(opts.position)) {
            opts.position = TOAST_POSITION_BOTTOM;
        }
        this.isOverlay = true;
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    Toast.prototype.getTransitionName = function (direction) {
        var /** @type {?} */ key = 'toast' + (direction === 'back' ? 'Leave' : 'Enter');
        return this._nav && this._nav.config.get(key);
    };
    /**
     * @param {?} position
     * @return {?}
     */
    Toast.prototype.isValidPosition = function (position) {
        return position === TOAST_POSITION_TOP || position === TOAST_POSITION_MIDDLE || position === TOAST_POSITION_BOTTOM;
    };
    /**
     * @param {?} message
     * @return {?}
     */
    Toast.prototype.setMessage = function (message) {
        this.data.message = message;
        return this;
    };
    /**
     * @param {?} dur
     * @return {?}
     */
    Toast.prototype.setDuration = function (dur) {
        this.data.duration = dur;
        return this;
    };
    /**
     * @param {?} pos
     * @return {?}
     */
    Toast.prototype.setPosition = function (pos) {
        this.data.position = pos;
        return this;
    };
    /**
     * @param {?} cssClass
     * @return {?}
     */
    Toast.prototype.setCssClass = function (cssClass) {
        this.data.cssClass = cssClass;
        return this;
    };
    /**
     * @param {?} closeButton
     * @return {?}
     */
    Toast.prototype.setShowCloseButton = function (closeButton) {
        this.data.showCloseButton = closeButton;
        return this;
    };
    /**
     * Present the toast instance.
     *
     * @param {?=} navOptions
     * @return {?}
     */
    Toast.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        navOptions.disableApp = false;
        return this._app.present(this, navOptions, 3 /* TOAST */);
    };
    /**
     * Dismiss all toast components which have been presented.
     * @return {?}
     */
    Toast.prototype.dismissAll = function () {
        this._nav && this._nav.popAll();
    };
    return Toast;
}(ViewController));
function Toast_tsickle_Closure_declarations() {
    /** @type {?} */
    Toast.prototype._app;
}
/**
 * \@name ToastController
 * \@description
 * A Toast is a subtle notification commonly used in modern applications.
 * It can be used to provide feedback about an operation or to
 * display a system message. The toast appears on top of the app's content,
 * and can be dismissed by the app to resume user interaction with
 * the app.
 *
 * ### Creating
 * All of the toast options should be passed in the first argument of
 * the create method: `create(opts)`. The message to display should be
 * passed in the `message` property. The `showCloseButton` option can be set to
 * true in order to display a close button on the toast. See the [create](#create)
 * method below for all available options.
 *
 * ### Positioning
 * Toasts can be positioned at the top, bottom or middle of the
 * view port. The position can be passed to the `Toast.create(opts)` method.
 * The position option is a string, and the values accepted are `top`, `bottom` and `middle`.
 * If the position is not specified, the toast will be displayed at the bottom of the view port.
 *
 * ### Dismissing
 * The toast can be dismissed automatically after a specific amount of time
 * by passing the number of milliseconds to display it in the `duration` of
 * the toast options. If `showCloseButton` is set to true, then the close button
 * will dismiss the toast. To dismiss the toast after creation, call the `dismiss()`
 * method on the Toast instance. The `onDidDismiss` function can be called to perform an action after the toast
 * is dismissed.
 *
 * \@usage
 * ```ts
 * constructor(private toastCtrl: ToastController) {
 *
 * }
 *
 * presentToast() {
 *   let toast = this.toastCtrl.create({
 *     message: 'User was added successfully',
 *     duration: 3000,
 *     position: 'top'
 *   });
 *
 *   toast.onDidDismiss(() => {
 *     console.log('Dismissed toast');
 *   });
 *
 *   toast.present();
 * }
 * ```
 * \@advanced
 * | Property              | Type      | Default         | Description                                                                                                   |
 * |-----------------------|-----------|-----------------|---------------------------------------------------------------------------------------------------------------|
 * | message               | `string`  | -               | The message for the toast. Long strings will wrap and the toast container will expand.                        |
 * | duration              | `number`  | -               | How many milliseconds to wait before hiding the toast. By default, it will show until `dismiss()` is called.  |
 * | position              | `string`  | "bottom"        | The position of the toast on the screen. Accepted values: "top", "middle", "bottom".                          |
 * | cssClass              | `string`  | -               | Additional classes for custom styles, separated by spaces.                                                    |
 * | showCloseButton       | `boolean` | false           | Whether or not to show a button to close the toast.                                                           |
 * | closeButtonText       | `string`  | "Close"         | Text to display in the close button.                                                                          |
 * | dismissOnPageChange   | `boolean` | false           | Whether to dismiss the toast when navigating to a new page.                                                   |
 *
 * \@demo /docs/v2/demos/src/toast/
 */
export var ToastController = (function () {
    /**
     * @param {?} _app
     */
    function ToastController(_app) {
        this._app = _app;
    }
    /**
     * Create a new toast component. See options below
     * @param {?=} opts
     * @return {?}
     */
    ToastController.prototype.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new Toast(this._app, opts);
    };
    ToastController.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ToastController.ctorParameters = function () { return [
        { type: App, },
    ]; };
    return ToastController;
}());
function ToastController_tsickle_Closure_declarations() {
    /** @type {?} */
    ToastController.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ToastController.ctorParameters;
    /** @type {?} */
    ToastController.prototype._app;
}
var /** @type {?} */ TOAST_POSITION_TOP = 'top';
var /** @type {?} */ TOAST_POSITION_MIDDLE = 'middle';
var /** @type {?} */ TOAST_POSITION_BOTTOM = 'bottom';
//# sourceMappingURL=toast.js.map