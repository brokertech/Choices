"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dropdown = /** @class */ (function () {
    function Dropdown(_a) {
        var element = _a.element, type = _a.type, classNames = _a.classNames;
        this.element = element;
        this.classNames = classNames;
        this.type = type;
        this.isActive = false;
    }
    Object.defineProperty(Dropdown.prototype, "distanceFromTopWindow", {
        /**
         * Bottom position of dropdown in viewport coordinates
         */
        get: function () {
            return this.element.getBoundingClientRect().bottom;
        },
        enumerable: false,
        configurable: true
    });
    Dropdown.prototype.getChild = function (selector) {
        return this.element.querySelector(selector);
    };
    /**
     * Show dropdown to user by adding active state class
     */
    Dropdown.prototype.show = function () {
        this.element.classList.add(this.classNames.activeState);
        this.element.setAttribute('aria-expanded', 'true');
        this.isActive = true;
        return this;
    };
    /**
     * Hide dropdown from user
     */
    Dropdown.prototype.hide = function () {
        this.element.classList.remove(this.classNames.activeState);
        this.element.setAttribute('aria-expanded', 'false');
        this.isActive = false;
        return this;
    };
    return Dropdown;
}());
exports.default = Dropdown;
//# sourceMappingURL=dropdown.js.map