"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../lib/utils");
var constants_1 = require("../constants");
var Input = /** @class */ (function () {
    function Input(_a) {
        var element = _a.element, type = _a.type, classNames = _a.classNames, preventPaste = _a.preventPaste;
        this.element = element;
        this.type = type;
        this.classNames = classNames;
        this.preventPaste = preventPaste;
        this.isFocussed = this.element.isEqualNode(document.activeElement);
        this.isDisabled = element.disabled;
        this._onPaste = this._onPaste.bind(this);
        this._onInput = this._onInput.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }
    Object.defineProperty(Input.prototype, "placeholder", {
        set: function (placeholder) {
            this.element.placeholder = placeholder;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "value", {
        get: function () {
            return (0, utils_1.sanitise)(this.element.value);
        },
        set: function (value) {
            this.element.value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Input.prototype, "rawValue", {
        get: function () {
            return this.element.value;
        },
        enumerable: false,
        configurable: true
    });
    Input.prototype.addEventListeners = function () {
        this.element.addEventListener('paste', this._onPaste);
        this.element.addEventListener('input', this._onInput, {
            passive: true,
        });
        this.element.addEventListener('focus', this._onFocus, {
            passive: true,
        });
        this.element.addEventListener('blur', this._onBlur, {
            passive: true,
        });
    };
    Input.prototype.removeEventListeners = function () {
        this.element.removeEventListener('input', this._onInput);
        this.element.removeEventListener('paste', this._onPaste);
        this.element.removeEventListener('focus', this._onFocus);
        this.element.removeEventListener('blur', this._onBlur);
    };
    Input.prototype.enable = function () {
        this.element.removeAttribute('disabled');
        this.isDisabled = false;
    };
    Input.prototype.disable = function () {
        this.element.setAttribute('disabled', '');
        this.isDisabled = true;
    };
    Input.prototype.focus = function () {
        if (!this.isFocussed) {
            this.element.focus();
        }
    };
    Input.prototype.blur = function () {
        if (this.isFocussed) {
            this.element.blur();
        }
    };
    Input.prototype.clear = function (setWidth) {
        if (setWidth === void 0) { setWidth = true; }
        if (this.element.value) {
            this.element.value = '';
        }
        if (setWidth) {
            this.setWidth();
        }
        return this;
    };
    /**
     * Set the correct input width based on placeholder
     * value or input value
     */
    Input.prototype.setWidth = function () {
        // Resize input to contents or placeholder
        var _a = this.element, style = _a.style, value = _a.value, placeholder = _a.placeholder;
        style.minWidth = "".concat(placeholder.length + 1, "ch");
        style.width = "".concat(value.length + 1, "ch");
    };
    Input.prototype.setActiveDescendant = function (activeDescendantID) {
        this.element.setAttribute('aria-activedescendant', activeDescendantID);
    };
    Input.prototype.removeActiveDescendant = function () {
        this.element.removeAttribute('aria-activedescendant');
    };
    Input.prototype._onInput = function () {
        if (this.type !== constants_1.SELECT_ONE_TYPE) {
            this.setWidth();
        }
    };
    Input.prototype._onPaste = function (event) {
        if (this.preventPaste) {
            event.preventDefault();
        }
    };
    Input.prototype._onFocus = function () {
        this.isFocussed = true;
    };
    Input.prototype._onBlur = function () {
        this.isFocussed = false;
    };
    return Input;
}());
exports.default = Input;
//# sourceMappingURL=input.js.map