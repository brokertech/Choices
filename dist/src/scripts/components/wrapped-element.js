"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../lib/utils");
var WrappedElement = /** @class */ (function () {
    function WrappedElement(_a) {
        var element = _a.element, classNames = _a.classNames;
        this.element = element;
        this.classNames = classNames;
        if (!(element instanceof HTMLInputElement) &&
            !(element instanceof HTMLSelectElement)) {
            throw new TypeError('Invalid element passed');
        }
        this.isDisabled = false;
    }
    Object.defineProperty(WrappedElement.prototype, "isActive", {
        get: function () {
            return this.element.dataset.choice === 'active';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WrappedElement.prototype, "dir", {
        get: function () {
            return this.element.dir;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WrappedElement.prototype, "value", {
        get: function () {
            return this.element.value;
        },
        set: function (value) {
            // you must define setter here otherwise it will be readonly property
            this.element.value = value;
        },
        enumerable: false,
        configurable: true
    });
    WrappedElement.prototype.conceal = function () {
        // Hide passed input
        this.element.classList.add(this.classNames.input);
        this.element.hidden = true;
        // Remove element from tab index
        this.element.tabIndex = -1;
        // Backup original styles if any
        var origStyle = this.element.getAttribute('style');
        if (origStyle) {
            this.element.setAttribute('data-choice-orig-style', origStyle);
        }
        this.element.setAttribute('data-choice', 'active');
    };
    WrappedElement.prototype.reveal = function () {
        // Reinstate passed element
        this.element.classList.remove(this.classNames.input);
        this.element.hidden = false;
        this.element.removeAttribute('tabindex');
        // Recover original styles if any
        var origStyle = this.element.getAttribute('data-choice-orig-style');
        if (origStyle) {
            this.element.removeAttribute('data-choice-orig-style');
            this.element.setAttribute('style', origStyle);
        }
        else {
            this.element.removeAttribute('style');
        }
        this.element.removeAttribute('data-choice');
        // Re-assign values - this is weird, I know
        // @todo Figure out why we need to do this
        this.element.value = this.element.value; // eslint-disable-line no-self-assign
    };
    WrappedElement.prototype.enable = function () {
        this.element.removeAttribute('disabled');
        this.element.disabled = false;
        this.isDisabled = false;
    };
    WrappedElement.prototype.disable = function () {
        this.element.setAttribute('disabled', '');
        this.element.disabled = true;
        this.isDisabled = true;
    };
    WrappedElement.prototype.triggerEvent = function (eventType, data) {
        (0, utils_1.dispatchEvent)(this.element, eventType, data);
    };
    return WrappedElement;
}());
exports.default = WrappedElement;
//# sourceMappingURL=wrapped-element.js.map