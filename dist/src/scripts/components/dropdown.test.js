"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = __importDefault(require("sinon"));
var defaults_1 = require("../defaults");
var dropdown_1 = __importDefault(require("./dropdown"));
describe('components/dropdown', function () {
    var instance;
    var choicesElement;
    beforeEach(function () {
        choicesElement = document.createElement('div');
        document.body.appendChild(choicesElement);
        instance = new dropdown_1.default({
            element: choicesElement,
            type: 'text',
            classNames: defaults_1.DEFAULT_CLASSNAMES,
        });
    });
    afterEach(function () {
        document.body.innerHTML = '';
        instance = null;
    });
    describe('constructor', function () {
        it('assigns choices element to instance', function () {
            (0, chai_1.expect)(instance.element).to.eql(choicesElement);
        });
        it('assigns classnames to instance', function () {
            (0, chai_1.expect)(instance.classNames).to.eql(defaults_1.DEFAULT_CLASSNAMES);
        });
    });
    describe('distanceFromTopWindow', function () {
        var top;
        var dimensions;
        var getBoundingClientRectStub;
        beforeEach(function () {
            top = 100;
            dimensions = {
                bottom: 121,
                height: 0,
                left: 0,
                right: 0,
                top: top,
                width: 0,
            };
            getBoundingClientRectStub = sinon_1.default
                .stub(instance.element, 'getBoundingClientRect')
                .returns(dimensions);
        });
        afterEach(function () {
            getBoundingClientRectStub.restore();
        });
        it('determines how far the top of our element is from the top of the viewport', function () {
            var expectedResponse = dimensions.bottom;
            var actualResponse = instance.distanceFromTopWindow;
            (0, chai_1.expect)(actualResponse).to.equal(expectedResponse);
        });
    });
    describe('getChild', function () {
        var childElement;
        var childClass = 'test-element';
        beforeEach(function () {
            childElement = document.createElement('span');
            childElement.classList.add(childClass);
            instance.element.appendChild(childElement);
        });
        it('returns child element', function () {
            var expectedResponse = childElement;
            var actualResponse = instance.getChild(".".concat(childClass));
            (0, chai_1.expect)(expectedResponse).to.eql(actualResponse);
        });
    });
    describe('show', function () {
        var actualResponse;
        beforeEach(function () {
            actualResponse = instance.show();
        });
        afterEach(function () {
            instance.hide();
        });
        it('adds active class', function () {
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.activeState)).to.equal(true);
        });
        it('sets expanded attribute', function () {
            (0, chai_1.expect)(instance.element.getAttribute('aria-expanded')).to.equal('true');
        });
        it('sets isActive instance flag', function () {
            (0, chai_1.expect)(instance.isActive).to.equal(true);
        });
        it('returns instance', function () {
            (0, chai_1.expect)(actualResponse).to.eql(instance);
        });
    });
    describe('hide', function () {
        var actualResponse;
        beforeEach(function () {
            actualResponse = instance.hide();
        });
        afterEach(function () {
            instance.show();
        });
        it('adds active class', function () {
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.activeState)).to.equal(false);
        });
        it('sets expanded attribute', function () {
            (0, chai_1.expect)(instance.element.getAttribute('aria-expanded')).to.equal('false');
        });
        it('sets isActive instance flag', function () {
            (0, chai_1.expect)(instance.isActive).to.equal(false);
        });
        it('returns instance', function () {
            (0, chai_1.expect)(actualResponse).to.eql(instance);
        });
    });
});
//# sourceMappingURL=dropdown.test.js.map