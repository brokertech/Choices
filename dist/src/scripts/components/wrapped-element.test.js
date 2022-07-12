"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var defaults_1 = require("../defaults");
var wrapped_element_1 = __importDefault(require("./wrapped-element"));
describe('components/wrappedElement', function () {
    var instance;
    var element;
    beforeEach(function () {
        element = document.createElement('select');
        instance = new wrapped_element_1.default({
            element: element,
            classNames: defaults_1.DEFAULT_CLASSNAMES,
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
        it('sets isDisabled flag to false', function () {
            (0, chai_1.expect)(instance.isDisabled).to.eql(false);
        });
        describe('passing an element that is not an instance of HTMLInputElement or HTMLSelectElement', function () {
            it('throws a TypeError', function () {
                element = document.createElement('div');
                (0, chai_1.expect)(function () {
                    return new wrapped_element_1.default({
                        element: element,
                        classNames: defaults_1.DEFAULT_CLASSNAMES,
                    });
                }).to.throw(TypeError, 'Invalid element passed');
            });
        });
    });
    describe('value getter', function () {
        it('returns element value', function () {
            (0, chai_1.expect)(instance.value).to.eql(element.value);
        });
    });
    describe('isActive getter', function () {
        it('returns whether the "data-choice" attribute is set to "active"', function () {
            instance.element.dataset.choice = 'active';
            (0, chai_1.expect)(instance.isActive).to.equal(true);
            instance.element.dataset.choice = 'inactive';
            (0, chai_1.expect)(instance.isActive).to.equal(false);
        });
    });
    describe('dir getter', function () {
        it('returns the direction of the element', function () {
            (0, chai_1.expect)(instance.dir).to.equal(instance.element.dir);
        });
    });
    describe('conceal', function () {
        var originalStyling;
        beforeEach(function () {
            originalStyling = 'color:red';
            instance.element.setAttribute('style', originalStyling);
        });
        it('hides element', function () {
            instance.conceal();
            (0, chai_1.expect)(instance.element.tabIndex).to.equal(-1);
            (0, chai_1.expect)(instance.element.classList.contains(instance.classNames.input)).to.equal(true);
            (0, chai_1.expect)(instance.element.hidden).to.be.true;
            (0, chai_1.expect)(instance.element.getAttribute('data-choice')).to.equal('active');
            (0, chai_1.expect)(instance.element.getAttribute('data-choice-orig-style')).to.equal(originalStyling);
        });
    });
    describe('reveal', function () {
        var originalStyling;
        beforeEach(function () {
            originalStyling = 'color:red';
            instance.element.setAttribute('data-choice-orig-style', originalStyling);
        });
        it('shows element', function () {
            instance.reveal();
            (0, chai_1.expect)(instance.element.tabIndex).to.equal(0);
            (0, chai_1.expect)(instance.element.classList.contains(instance.classNames.input)).to.equal(false);
            (0, chai_1.expect)(instance.element.hidden).to.be.false;
            (0, chai_1.expect)(instance.element.getAttribute('style')).to.equal(originalStyling);
            (0, chai_1.expect)(instance.element.getAttribute('aria-hidden')).to.equal(null);
            (0, chai_1.expect)(instance.element.getAttribute('data-choice')).to.equal(null);
            (0, chai_1.expect)(instance.element.getAttribute('data-choice-orig-style')).to.equal(null);
        });
    });
    describe('enable', function () {
        beforeEach(function () {
            instance.disable();
        });
        it('removes disabled attribute', function () {
            (0, chai_1.expect)(instance.element.hasAttribute('disabled')).to.equal(true);
            instance.enable();
            (0, chai_1.expect)(instance.element.hasAttribute('disabled')).to.equal(false);
        });
        it('sets elements disabled state to false', function () {
            (0, chai_1.expect)(instance.element.disabled).to.equal(true);
            instance.enable();
            (0, chai_1.expect)(instance.element.disabled).to.equal(false);
        });
        it('sets isDisabled flag to false', function () {
            (0, chai_1.expect)(instance.isDisabled).to.equal(true);
            instance.enable();
            (0, chai_1.expect)(instance.isDisabled).to.equal(false);
        });
    });
    describe('disable', function () {
        beforeEach(function () {
            instance.enable();
        });
        it('sets disabled attribute (to blank string)', function () {
            (0, chai_1.expect)(instance.element.hasAttribute('disabled')).to.equal(false);
            instance.disable();
            (0, chai_1.expect)(instance.element.getAttribute('disabled')).to.equal('');
        });
        it('sets elements disabled state to true', function () {
            (0, chai_1.expect)(instance.element.disabled).to.equal(false);
            instance.disable();
            (0, chai_1.expect)(instance.element.disabled).to.equal(true);
        });
        it('sets isDisabled flag to true', function () {
            (0, chai_1.expect)(instance.isDisabled).to.equal(false);
            instance.disable();
            (0, chai_1.expect)(instance.isDisabled).to.equal(true);
        });
    });
    describe('triggerEvent', function () {
        it('fires event on element using passed eventType and data', function (done) {
            var data = {
                test: true,
            };
            instance.element.addEventListener('testEvent', function (_a) {
                var detail = _a.detail;
                (0, chai_1.expect)(detail).to.eql(data);
                done();
            });
            instance.triggerEvent('testEvent', data);
        });
    });
});
//# sourceMappingURL=wrapped-element.test.js.map