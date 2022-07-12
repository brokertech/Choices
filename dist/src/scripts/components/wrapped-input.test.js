"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = require("sinon");
var defaults_1 = require("../defaults");
var wrapped_element_1 = __importDefault(require("./wrapped-element"));
var wrapped_input_1 = __importDefault(require("./wrapped-input"));
describe('components/wrappedInput', function () {
    var instance;
    var element;
    var delimiter = '-';
    beforeEach(function () {
        element = document.createElement('input');
        instance = new wrapped_input_1.default({
            element: element,
            classNames: defaults_1.DEFAULT_CLASSNAMES,
            delimiter: delimiter,
        });
    });
    afterEach(function () {
        document.body.innerHTML = '';
        instance = null;
    });
    describe('constructor', function () {
        it('assigns choices element to class', function () {
            (0, chai_1.expect)(instance.element).to.eql(element);
        });
        it('assigns classnames to class', function () {
            (0, chai_1.expect)(instance.classNames).to.eql(defaults_1.DEFAULT_CLASSNAMES);
        });
    });
    describe('inherited methods', function () {
        var methods = ['conceal', 'reveal', 'enable', 'disable'];
        methods.forEach(function (method) {
            describe(method, function () {
                beforeEach(function () {
                    (0, sinon_1.stub)(wrapped_element_1.default.prototype, method);
                });
                afterEach(function () {
                    wrapped_element_1.default.prototype[method].restore();
                });
                it("calls super.".concat(method), function () {
                    (0, chai_1.expect)(wrapped_element_1.default.prototype[method].called).to.equal(false);
                    instance[method]();
                    (0, chai_1.expect)(wrapped_element_1.default.prototype[method].called).to.equal(true);
                });
            });
        });
    });
    describe('value setter', function () {
        it('sets the value of the input to the given value', function () {
            var newValue = 'Value 1, Value 2, Value 3';
            (0, chai_1.expect)(instance.element.value).to.equal('');
            instance.value = newValue;
            (0, chai_1.expect)(instance.value).to.equal(newValue);
        });
    });
});
//# sourceMappingURL=wrapped-input.test.js.map