"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var wrapped_element_1 = __importDefault(require("./wrapped-element"));
var WrappedSelect = /** @class */ (function (_super) {
    __extends(WrappedSelect, _super);
    function WrappedSelect(_a) {
        var element = _a.element, classNames = _a.classNames, template = _a.template;
        var _this = _super.call(this, { element: element, classNames: classNames }) || this;
        _this.template = template;
        return _this;
    }
    Object.defineProperty(WrappedSelect.prototype, "placeholderOption", {
        get: function () {
            return (this.element.querySelector('option[value=""]') ||
                // Backward compatibility layer for the non-standard placeholder attribute supported in older versions.
                this.element.querySelector('option[placeholder]'));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WrappedSelect.prototype, "optionGroups", {
        get: function () {
            return Array.from(this.element.getElementsByTagName('OPTGROUP'));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WrappedSelect.prototype, "options", {
        get: function () {
            return Array.from(this.element.options);
        },
        set: function (options) {
            var _this = this;
            var fragment = document.createDocumentFragment();
            var addOptionToFragment = function (data) {
                // Create a standard select option
                var option = _this.template(data);
                // Append it to fragment
                fragment.appendChild(option);
            };
            // Add each list item to list
            options.forEach(function (optionData) { return addOptionToFragment(optionData); });
            this.appendDocFragment(fragment);
        },
        enumerable: false,
        configurable: true
    });
    WrappedSelect.prototype.appendDocFragment = function (fragment) {
        this.element.innerHTML = '';
        this.element.appendChild(fragment);
    };
    return WrappedSelect;
}(wrapped_element_1.default));
exports.default = WrappedSelect;
//# sourceMappingURL=wrapped-select.js.map