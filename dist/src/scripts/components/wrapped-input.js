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
var WrappedInput = /** @class */ (function (_super) {
    __extends(WrappedInput, _super);
    function WrappedInput(_a) {
        var element = _a.element, classNames = _a.classNames, delimiter = _a.delimiter;
        var _this = _super.call(this, { element: element, classNames: classNames }) || this;
        _this.delimiter = delimiter;
        return _this;
    }
    Object.defineProperty(WrappedInput.prototype, "value", {
        get: function () {
            return this.element.value;
        },
        set: function (value) {
            this.element.setAttribute('value', value);
            this.element.value = value;
        },
        enumerable: false,
        configurable: true
    });
    return WrappedInput;
}(wrapped_element_1.default));
exports.default = WrappedInput;
//# sourceMappingURL=wrapped-input.js.map