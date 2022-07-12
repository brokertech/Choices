"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../lib/utils");
var constants_1 = require("../constants");
var Container = /** @class */ (function () {
    function Container(_a) {
        var element = _a.element, type = _a.type, classNames = _a.classNames, position = _a.position;
        this.element = element;
        this.classNames = classNames;
        this.type = type;
        this.position = position;
        this.isOpen = false;
        this.isFlipped = false;
        this.isFocussed = false;
        this.isDisabled = false;
        this.isLoading = false;
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }
    Container.prototype.addEventListeners = function () {
        this.element.addEventListener('focus', this._onFocus);
        this.element.addEventListener('blur', this._onBlur);
    };
    Container.prototype.removeEventListeners = function () {
        this.element.removeEventListener('focus', this._onFocus);
        this.element.removeEventListener('blur', this._onBlur);
    };
    /**
     * Determine whether container should be flipped based on passed
     * dropdown position
     */
    Container.prototype.shouldFlip = function (dropdownPos) {
        if (typeof dropdownPos !== 'number') {
            return false;
        }
        // If flip is enabled and the dropdown bottom position is
        // greater than the window height flip the dropdown.
        var shouldFlip = false;
        if (this.position === 'auto') {
            shouldFlip = !window.matchMedia("(min-height: ".concat(dropdownPos + 1, "px)"))
                .matches;
        }
        else if (this.position === 'top') {
            shouldFlip = true;
        }
        return shouldFlip;
    };
    Container.prototype.setActiveDescendant = function (activeDescendantID) {
        this.element.setAttribute('aria-activedescendant', activeDescendantID);
    };
    Container.prototype.removeActiveDescendant = function () {
        this.element.removeAttribute('aria-activedescendant');
    };
    Container.prototype.open = function (dropdownPos) {
        this.element.classList.add(this.classNames.openState);
        this.element.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
        if (this.shouldFlip(dropdownPos)) {
            this.element.classList.add(this.classNames.flippedState);
            this.isFlipped = true;
        }
    };
    Container.prototype.close = function () {
        this.element.classList.remove(this.classNames.openState);
        this.element.setAttribute('aria-expanded', 'false');
        this.removeActiveDescendant();
        this.isOpen = false;
        // A dropdown flips if it does not have space within the page
        if (this.isFlipped) {
            this.element.classList.remove(this.classNames.flippedState);
            this.isFlipped = false;
        }
    };
    Container.prototype.focus = function () {
        if (!this.isFocussed) {
            this.element.focus();
        }
    };
    Container.prototype.addFocusState = function () {
        this.element.classList.add(this.classNames.focusState);
    };
    Container.prototype.removeFocusState = function () {
        this.element.classList.remove(this.classNames.focusState);
    };
    Container.prototype.enable = function () {
        this.element.classList.remove(this.classNames.disabledState);
        this.element.removeAttribute('aria-disabled');
        if (this.type === constants_1.SELECT_ONE_TYPE) {
            this.element.setAttribute('tabindex', '0');
        }
        this.isDisabled = false;
    };
    Container.prototype.disable = function () {
        this.element.classList.add(this.classNames.disabledState);
        this.element.setAttribute('aria-disabled', 'true');
        if (this.type === constants_1.SELECT_ONE_TYPE) {
            this.element.setAttribute('tabindex', '-1');
        }
        this.isDisabled = true;
    };
    Container.prototype.wrap = function (element) {
        (0, utils_1.wrap)(element, this.element);
    };
    Container.prototype.unwrap = function (element) {
        if (this.element.parentNode) {
            // Move passed element outside this element
            this.element.parentNode.insertBefore(element, this.element);
            // Remove this element
            this.element.parentNode.removeChild(this.element);
        }
    };
    Container.prototype.addLoadingState = function () {
        this.element.classList.add(this.classNames.loadingState);
        this.element.setAttribute('aria-busy', 'true');
        this.isLoading = true;
    };
    Container.prototype.removeLoadingState = function () {
        this.element.classList.remove(this.classNames.loadingState);
        this.element.removeAttribute('aria-busy');
        this.isLoading = false;
    };
    Container.prototype._onFocus = function () {
        this.isFocussed = true;
    };
    Container.prototype._onBlur = function () {
        this.isFocussed = false;
    };
    return Container;
}());
exports.default = Container;
//# sourceMappingURL=container.js.map