import { Button } from '../button/button';
import { MenuController } from './menu-controller';
import { Navbar } from '../navbar/navbar';
import { ViewController } from '../../navigation/view-controller';
/**
 * @name MenuToggle
 * @description
 * The `menuToggle` directive can be placed on any button to toggle a menu open or closed.
 * If it is added to the [NavBar](../../navbar/NavBar) of a page, the button will only appear
 * when the page it's in is currently a root page. See the [Menu Navigation Bar Behavior](../Menu#navigation-bar-behavior)
 * docs for more information.
 *
 *
 * @usage
 *
 * A simple `menuToggle` button can be added using the following markup:
 *
 * ```html
 * <button ion-button menuToggle>Toggle Menu</button>
 * ```
 *
 * To toggle a specific menu by its id or side, give the `menuToggle`
 * directive a value.
 *
 * ```html
 * <button ion-button menuToggle="right">Toggle Right Menu</button>
 * ```
 *
 * If placing the `menuToggle` in a navbar or toolbar, it should be
 * placed as a child of the `<ion-navbar>` or `<ion-toolbar>`, and not in
 * the `<ion-buttons>` element:
 *
 * ```html
 * <ion-header>
 *
 *   <ion-navbar>
 *     <ion-buttons start>
 *       <button ion-button>
 *         <ion-icon name="contact"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *     <button ion-button menuToggle>
 *       <ion-icon name="menu"></ion-icon>
 *     </button>
 *     <ion-title>
 *       Title
 *     </ion-title>
 *     <ion-buttons end>
 *       <button ion-button (click)="doClick()">
 *         <ion-icon name="more"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *   </ion-navbar>
 *
 * </ion-header>
 * ```
 *
 * Similar to `<ion-buttons>`, the `menuToggle` can be positioned using
 * `start`, `end`, `left`, or `right`:
 *
 * ```html
 * <ion-toolbar>
 *   <button ion-button menuToggle right>
 *     <ion-icon name="menu"></ion-icon>
 *   </button>
 *   <ion-title>
 *     Title
 *   </ion-title>
 *   <ion-buttons end>
 *     <button ion-button (click)="doClick()">
 *       <ion-icon name="more"></ion-icon>
 *     </button>
 *   </ion-buttons>
 * </ion-toolbar>
 * ```
 *
 * See the [Toolbar API docs](../../toolbar/Toolbar) for more information
 * on the different positions.
 *
 * @demo /docs/v2/demos/src/menu/
 * @see {@link /docs/v2/components#menus Menu Component Docs}
 * @see {@link ../../menu/Menu Menu API Docs}
 */
export declare class MenuToggle {
    private _menu;
    private _viewCtrl;
    private _button;
    private _navbar;
    /**
     * @private
     */
    menuToggle: string;
    /**
     * @private
     */
    private _isButton;
    /**
     * @private
     */
    private _inNavbar;
    constructor(_menu: MenuController, _viewCtrl: ViewController, _button: Button, _navbar: Navbar);
    ngAfterContentInit(): void;
    /**
    * @private
    */
    toggle(): void;
    /**
    * @private
    */
    readonly isHidden: boolean;
}
