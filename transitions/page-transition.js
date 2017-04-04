var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Animation } from '../animations/animation';
import { Transition } from './transition';
export var PageTransition = (function (_super) {
    __extends(PageTransition, _super);
    function PageTransition() {
        _super.apply(this, arguments);
    }
    /**
     * @return {?}
     */
    PageTransition.prototype.init = function () {
        var _this = this;
        if (this.enteringView) {
            this.enteringPage = new Animation(this.plt, this.enteringView.pageRef());
            this.add(this.enteringPage.beforeAddClass('show-page'));
            // Resize content before transition starts
            this.beforeAddRead(function () {
                _this.enteringView.readReady.emit();
            });
            this.beforeAddWrite(function () {
                _this.enteringView.writeReady.emit();
            });
        }
    };
    /**
     * @return {?}
     */
    PageTransition.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.enteringPage && this.enteringPage.destroy();
        this.enteringPage = null;
    };
    return PageTransition;
}(Transition));
function PageTransition_tsickle_Closure_declarations() {
    /** @type {?} */
    PageTransition.prototype.enteringPage;
}
//# sourceMappingURL=page-transition.js.map