"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = require("sinon");
var defaults_1 = require("../defaults");
var input_1 = __importDefault(require("./input"));
describe('components/input', function () {
    var instance;
    var choicesElement;
    beforeEach(function () {
        choicesElement = document.createElement('input');
        instance = new input_1.default({
            element: choicesElement,
            type: 'text',
            classNames: defaults_1.DEFAULT_CLASSNAMES,
            preventPaste: false,
        });
    });
    afterEach(function () {
        document.body.innerHTML = '';
        instance = null;
    });
    describe('constructor', function () {
        it('assigns choices element to class', function () {
            (0, chai_1.expect)(instance.element).to.eql(choicesElement);
        });
        it('assigns classnames to class', function () {
            (0, chai_1.expect)(instance.classNames).to.eql(defaults_1.DEFAULT_CLASSNAMES);
        });
    });
    describe('addEventListeners', function () {
        var addEventListenerStub;
        beforeEach(function () {
            addEventListenerStub = (0, sinon_1.stub)(instance.element, 'addEventListener');
        });
        afterEach(function () {
            addEventListenerStub.restore();
        });
        it('adds event listeners', function () {
            instance.addEventListeners();
            (0, chai_1.expect)(['input', 'paste', 'focus', 'blur']).to.have.members(Array.from({ length: addEventListenerStub.callCount }, function (_, i) { return addEventListenerStub.getCall(i).args[0]; }));
        });
    });
    describe('removeEventListeners', function () {
        var removeEventListenerStub;
        beforeEach(function () {
            removeEventListenerStub = (0, sinon_1.stub)(instance.element, 'removeEventListener');
        });
        afterEach(function () {
            removeEventListenerStub.restore();
        });
        it('removes event listeners', function () {
            instance.removeEventListeners();
            (0, chai_1.expect)(removeEventListenerStub.callCount).to.equal(4);
            (0, chai_1.expect)(removeEventListenerStub.getCall(0).args[0]).to.equal('input');
            (0, chai_1.expect)(removeEventListenerStub.getCall(1).args[0]).to.equal('paste');
            (0, chai_1.expect)(removeEventListenerStub.getCall(2).args[0]).to.equal('focus');
            (0, chai_1.expect)(removeEventListenerStub.getCall(3).args[0]).to.equal('blur');
        });
    });
    describe('_onInput', function () {
        var setWidthStub;
        beforeEach(function () {
            setWidthStub = (0, sinon_1.stub)(instance, 'setWidth');
        });
        afterEach(function () {
            setWidthStub.restore();
        });
        describe('when element is select one', function () {
            it('does not set input width', function () {
                instance.type = 'select-one';
                instance._onInput();
                (0, chai_1.expect)(setWidthStub.callCount).to.equal(0);
            });
        });
        describe('when element is not a select one', function () {
            it('sets input width', function () {
                instance.type = 'text';
                instance._onInput();
                (0, chai_1.expect)(setWidthStub.callCount).to.equal(1);
            });
        });
    });
    describe('_onPaste', function () {
        var eventMock;
        beforeEach(function () {
            eventMock = {
                preventDefault: (0, sinon_1.stub)(),
                target: instance.element,
            };
        });
        describe('when pasting is disabled and target is the element', function () {
            it('prevents default pasting behaviour', function () {
                instance.preventPaste = true;
                instance._onPaste(eventMock);
                (0, chai_1.expect)(eventMock.preventDefault.callCount).to.equal(1);
            });
        });
        describe('when pasting is enabled', function () {
            it('does not prevent default pasting behaviour', function () {
                instance.preventPaste = false;
                instance._onPaste(eventMock);
                (0, chai_1.expect)(eventMock.preventDefault.callCount).to.equal(0);
            });
        });
    });
    describe('_onFocus', function () {
        it('sets isFocussed flag to true', function () {
            (0, chai_1.expect)(instance.isFocussed).to.equal(false);
            instance._onFocus();
            (0, chai_1.expect)(instance.isFocussed).to.equal(true);
        });
    });
    describe('_onBlur', function () {
        it('sets isFocussed flag to false', function () {
            instance.isFocussed = true;
            instance._onBlur();
            (0, chai_1.expect)(instance.isFocussed).to.equal(false);
        });
    });
    describe('enable', function () {
        beforeEach(function () {
            instance.element.setAttribute('disabled', '');
            instance.isDisabled = true;
            instance.enable();
        });
        it('removes disabled attribute', function () {
            (0, chai_1.expect)(instance.element.getAttribute('disabled')).to.equal(null);
        });
        it('sets isDisabled flag to false', function () {
            (0, chai_1.expect)(instance.isDisabled).to.equal(false);
        });
    });
    describe('disable', function () {
        beforeEach(function () {
            instance.element.removeAttribute('disabled', '');
            instance.isDisabled = false;
            instance.disable();
        });
        it('removes disabled attribute', function () {
            (0, chai_1.expect)(instance.element.getAttribute('disabled')).to.equal('');
        });
        it('sets isDisabled flag to false', function () {
            (0, chai_1.expect)(instance.isDisabled).to.equal(true);
        });
    });
    describe('focus', function () {
        var focusStub;
        beforeEach(function () {
            focusStub = (0, sinon_1.stub)(instance.element, 'focus');
        });
        afterEach(function () {
            focusStub.restore();
        });
        describe('when element is not focussed', function () {
            it('focuses element if isFocussed flag is set to false', function () {
                instance.isFocussed = true;
                instance.focus();
                (0, chai_1.expect)(focusStub.callCount).to.equal(0);
            });
        });
        describe('when element is focussed', function () {
            it('focuses element if isFocussed flag is set to false', function () {
                instance.isFocussed = false;
                instance.focus();
                (0, chai_1.expect)(focusStub.callCount).to.equal(1);
            });
        });
    });
    describe('blur', function () {
        var blurStub;
        beforeEach(function () {
            blurStub = (0, sinon_1.stub)(instance.element, 'blur');
        });
        afterEach(function () {
            blurStub.restore();
        });
        describe('when element is not focussed', function () {
            it("doesn't blur element", function () {
                instance.isFocussed = false;
                instance.blur();
                (0, chai_1.expect)(blurStub.callCount).to.equal(0);
            });
        });
        describe('when element is focussed', function () {
            it('blurs element', function () {
                instance.isFocussed = true;
                instance.blur();
                (0, chai_1.expect)(blurStub.callCount).to.equal(1);
            });
        });
    });
    describe('clear', function () {
        var setWidthStub;
        beforeEach(function () {
            setWidthStub = (0, sinon_1.stub)(instance, 'setWidth');
        });
        afterEach(function () {
            setWidthStub.restore();
        });
        it("removes the element's value if it has one", function () {
            instance.element.value = 'test';
            (0, chai_1.expect)(instance.element.value).to.equal('test');
            instance.clear();
            (0, chai_1.expect)(instance.element.value).to.equal('');
        });
        it("sets the element's width if flag passed", function () {
            (0, chai_1.expect)(setWidthStub.callCount).to.equal(0);
            instance.clear(true);
            (0, chai_1.expect)(setWidthStub.callCount).to.equal(1);
        });
        it('returns instance', function () {
            var response = instance.clear();
            (0, chai_1.expect)(response).to.eql(instance);
        });
    });
    /**
     * Blocked by lack of ch support in JSDOM
     * @see {@link https://github.com/jsdom/cssstyle/pull/107}
     *
    describe('setWidth', () => {
      it('sets the width of the element based on input value and placeholder', () => {
        instance.placeholder = 'This is a placeholder';
        instance.element.value = 'This is a value';
        expect(instance.element.style.width).to.not.equal('16ch');
        instance.setWidth();
        expect(instance.element.style.width).to.equal('16ch');
        expect(instance.element.style.minWidth).to.equal('22ch');
      });
    });
    */
    describe('placeholder setter', function () {
        it('sets value of element to passed placeholder', function () {
            var placeholder = 'test';
            (0, chai_1.expect)(instance.element.placeholder).to.equal('');
            instance.placeholder = placeholder;
            (0, chai_1.expect)(instance.element.placeholder).to.equal(placeholder);
        });
    });
    describe('value setter', function () {
        it('sets value of element to passed value', function () {
            var value = 'test';
            (0, chai_1.expect)(instance.element.value).to.equal('');
            instance.value = value;
            (0, chai_1.expect)(instance.element.value).to.equal(value);
        });
        it('casts value to string', function () {
            var value = 1234;
            instance.value = value;
            (0, chai_1.expect)(instance.element.value).to.equal("".concat(value));
        });
    });
    describe('value getter', function () {
        it('sets value of element to passed value', function () {
            var value = 'test';
            instance.element.value = value;
            (0, chai_1.expect)(instance.value).to.equal(value);
        });
        it('strips HTML from value', function () {
            var value = '<script>somethingMalicious();</script>';
            instance.element.value = value;
            (0, chai_1.expect)(instance.value).to.equal('&lt;script&gt;somethingMalicious();&lt;/script&gt;');
        });
    });
    describe('setActiveDescendant', function () {
        it("sets element's aria-activedescendant attribute with passed descendant ID", function () {
            var activeDescendantID = '1234';
            (0, chai_1.expect)(instance.element.getAttribute('aria-activedescendant')).to.equal(null);
            instance.setActiveDescendant(activeDescendantID);
            (0, chai_1.expect)(instance.element.getAttribute('aria-activedescendant')).to.equal(activeDescendantID);
        });
    });
    describe('removeActiveDescendant', function () {
        it("remove elememnt's aria-activedescendant attribute", function () {
            var activeDescendantID = '1234';
            instance.element.setAttribute('aria-activedescendant', activeDescendantID);
            (0, chai_1.expect)(instance.element.getAttribute('aria-activedescendant')).to.equal(activeDescendantID);
            instance.removeActiveDescendant();
            (0, chai_1.expect)(instance.element.getAttribute('aria-activedescendant')).to.equal(null);
        });
    });
});
//# sourceMappingURL=input.test.js.map