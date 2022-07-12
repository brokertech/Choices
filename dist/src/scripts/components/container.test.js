"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = require("sinon");
var defaults_1 = require("../defaults");
var container_1 = __importDefault(require("./container"));
describe('components/container', function () {
    var instance;
    var element;
    beforeEach(function () {
        element = document.createElement('div');
        element.id = 'container';
        document.body.appendChild(element);
        instance = new container_1.default({
            element: document.getElementById('container'),
            classNames: defaults_1.DEFAULT_CLASSNAMES,
            position: 'auto',
            type: 'text',
        });
    });
    afterEach(function () {
        document.body.innerHTML = '';
        element = null;
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
            (0, chai_1.expect)(addEventListenerStub.callCount).to.equal(2);
            (0, chai_1.expect)(addEventListenerStub.getCall(0).args[0]).to.equal('focus');
            (0, chai_1.expect)(addEventListenerStub.getCall(1).args[0]).to.equal('blur');
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
            (0, chai_1.expect)(removeEventListenerStub.callCount).to.equal(2);
            (0, chai_1.expect)(removeEventListenerStub.getCall(0).args[0]).to.equal('focus');
            (0, chai_1.expect)(removeEventListenerStub.getCall(1).args[0]).to.equal('blur');
        });
    });
    describe('onFocus', function () {
        it('sets isFocussed flag to true', function () {
            (0, chai_1.expect)(instance.isFocussed).to.equal(false);
            instance._onFocus();
            (0, chai_1.expect)(instance.isFocussed).to.equal(true);
        });
    });
    describe('onBlur', function () {
        it('sets isFocussed flag to false', function () {
            instance.isFocussed = true;
            instance._onBlur();
            (0, chai_1.expect)(instance.isFocussed).to.equal(false);
        });
    });
    describe('shouldFlip', function () {
        describe('not passing dropdownPos', function () {
            it('returns false', function () {
                (0, chai_1.expect)(instance.shouldFlip()).to.equal(false);
            });
        });
        describe('passing dropdownPos', function () {
            describe('position config option set to "auto"', function () {
                beforeEach(function () {
                    instance.position = 'auto';
                });
            });
            describe('position config option set to "top"', function () {
                beforeEach(function () {
                    instance.position = 'top';
                });
                it('returns true', function () {
                    (0, chai_1.expect)(instance.shouldFlip(100)).to.equal(true);
                });
            });
            describe('position config option set to "bottom"', function () {
                beforeEach(function () {
                    instance.position = 'bottom';
                });
                it('returns false', function () {
                    (0, chai_1.expect)(instance.shouldFlip(100)).to.equal(false);
                });
            });
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
    describe('open', function () {
        beforeEach(function () {
            instance.open();
        });
        it('adds open state class', function () {
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.openState)).to.equal(true);
        });
        it('sets aria-expanded attribute to true', function () {
            (0, chai_1.expect)(instance.element.getAttribute('aria-expanded')).to.equal('true');
        });
        it('sets isOpen flag to true', function () {
            (0, chai_1.expect)(instance.isOpen).to.equal(true);
        });
        describe('flipping dropdown', function () {
            var shouldFlipStub;
            beforeEach(function () {
                shouldFlipStub = (0, sinon_1.stub)().returns(true);
                instance.shouldFlip = shouldFlipStub;
                instance.open();
            });
            afterEach(function () {
                instance.shouldFlip.reset();
            });
            it('adds adds flipped state class', function () {
                (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.flippedState)).to.equal(true);
            });
            it('sets isFlipped flag to true', function () {
                (0, chai_1.expect)(instance.isFlipped).to.equal(true);
            });
        });
    });
    describe('close', function () {
        beforeEach(function () {
            instance.close();
        });
        it('adds open state class', function () {
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.openState)).to.equal(false);
        });
        it('sets aria-expanded attribute to true', function () {
            (0, chai_1.expect)(instance.element.getAttribute('aria-expanded')).to.equal('false');
        });
        it('sets isOpen flag to true', function () {
            (0, chai_1.expect)(instance.isOpen).to.equal(false);
        });
        describe('flipped dropdown', function () {
            beforeEach(function () {
                instance.isFlipped = true;
                instance.close();
            });
            it('removes adds flipped state class', function () {
                (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.flippedState)).to.equal(false);
            });
            it('sets isFlipped flag to false', function () {
                (0, chai_1.expect)(instance.isFlipped).to.equal(false);
            });
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
        describe('isFocussed flag being set to false', function () {
            it('focuses element', function () {
                instance.isFocussed = false;
                instance.focus();
                (0, chai_1.expect)(focusStub.called).to.equal(true);
            });
        });
        describe('isFocussed flag being set to true', function () {
            it('does not focus element', function () {
                instance.isFocussed = true;
                instance.focus();
                (0, chai_1.expect)(focusStub.called).to.equal(false);
            });
        });
    });
    describe('addFocusState', function () {
        beforeEach(function () {
            instance.removeLoadingState();
        });
        it('adds focus state class', function () {
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.focusState)).to.equal(false);
            instance.addFocusState();
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.focusState)).to.equal(true);
        });
    });
    describe('removeFocusState', function () {
        beforeEach(function () {
            instance.addFocusState();
        });
        it('removes focus state class', function () {
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.focusState)).to.equal(true);
            instance.removeFocusState();
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.focusState)).to.equal(false);
        });
    });
    describe('enable', function () {
        beforeEach(function () {
            instance.disable();
        });
        it('removes disabled state class', function () {
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.disabledState)).to.equal(true);
            instance.enable();
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.disabledState)).to.equal(false);
        });
        it('removes aria-disabled attribute', function () {
            (0, chai_1.expect)(instance.element.getAttribute('aria-disabled')).to.equal('true');
            instance.enable();
            (0, chai_1.expect)(instance.element.getAttribute('aria-disabled')).to.equal(null);
        });
        it('sets isDisabled flag to true', function () {
            instance.enable();
            (0, chai_1.expect)(instance.isDisabled).to.equal(false);
        });
        describe('select one element', function () {
            beforeEach(function () {
                instance.type = 'select-one';
                instance.enable();
            });
            it('sets tabindex attribute', function () {
                (0, chai_1.expect)(instance.element.getAttribute('tabindex')).to.equal('0');
            });
        });
    });
    describe('disable', function () {
        beforeEach(function () {
            instance.enable();
        });
        it('removes disabled state class', function () {
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.disabledState)).to.equal(false);
            instance.disable();
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.disabledState)).to.equal(true);
        });
        it('removes aria-disabled attribute', function () {
            (0, chai_1.expect)(instance.element.getAttribute('aria-disabled')).to.equal(null);
            instance.disable();
            (0, chai_1.expect)(instance.element.getAttribute('aria-disabled')).to.equal('true');
        });
        it('sets isDisabled flag to true', function () {
            instance.disable();
            (0, chai_1.expect)(instance.isDisabled).to.equal(true);
        });
        describe('select one element', function () {
            beforeEach(function () {
                instance.type = 'select-one';
                instance.disable();
            });
            it('sets tabindex attribute', function () {
                (0, chai_1.expect)(instance.element.getAttribute('tabindex')).to.equal('-1');
            });
        });
    });
    describe('wrap', function () {
        var elementToWrap;
        beforeEach(function () {
            elementToWrap = document.createElement('div');
            elementToWrap.id = 'wrap-test';
            document.body.appendChild(elementToWrap);
        });
        afterEach(function () {
            document.getElementById('wrap-test').remove();
        });
        it('wraps passed element inside element', function () {
            (0, chai_1.expect)(instance.element.querySelector('div#wrap-test')).to.equal(null);
            instance.wrap(document.querySelector('div#wrap-test'));
            (0, chai_1.expect)(instance.element.querySelector('div#wrap-test')).to.equal(elementToWrap);
        });
    });
    describe('unwrap', function () {
        var elementToUnwrap;
        beforeEach(function () {
            elementToUnwrap = document.createElement('div');
            elementToUnwrap.id = 'unwrap-test';
            document.body.appendChild(elementToUnwrap);
            instance.wrap(document.getElementById('unwrap-test'));
        });
        afterEach(function () {
            document.body.removeChild(document.getElementById('unwrap-test'));
        });
        it('moves wrapped element outside of element', function () {
            (0, chai_1.expect)(instance.element.querySelector('div#unwrap-test')).to.be.instanceof(HTMLElement);
            instance.unwrap(elementToUnwrap);
            (0, chai_1.expect)(instance.element.querySelector('div#unwrap-test')).to.equal(null);
            (0, chai_1.expect)(document.querySelector('div#unwrap-test')).to.be.instanceof(HTMLElement);
        });
        it('removes element from DOM', function () {
            (0, chai_1.expect)(document.getElementById('container')).to.not.equal(null);
            instance.unwrap(elementToUnwrap);
            (0, chai_1.expect)(document.getElementById('container')).to.equal(null);
        });
    });
    describe('addLoadingState', function () {
        beforeEach(function () {
            instance.removeLoadingState();
        });
        it('adds loading state class', function () {
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.loadingState)).to.equal(false);
            instance.addLoadingState();
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.loadingState)).to.equal(true);
        });
        it('sets aria-busy attribute to true', function () {
            (0, chai_1.expect)(instance.element.getAttribute('aria-busy')).to.equal(null);
            instance.addLoadingState();
            (0, chai_1.expect)(instance.element.getAttribute('aria-busy')).to.equal('true');
        });
        it('sets isLoading flag to false', function () {
            (0, chai_1.expect)(instance.isLoading).to.equal(false);
            instance.addLoadingState();
            (0, chai_1.expect)(instance.isLoading).to.equal(true);
        });
    });
    describe('removeLoadingState', function () {
        beforeEach(function () {
            instance.addLoadingState();
        });
        it('removes loading state class', function () {
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.loadingState)).to.equal(true);
            instance.removeLoadingState();
            (0, chai_1.expect)(instance.element.classList.contains(defaults_1.DEFAULT_CLASSNAMES.loadingState)).to.equal(false);
        });
        it('removes aria-busy attribute', function () {
            (0, chai_1.expect)(instance.element.getAttribute('aria-busy')).to.equal('true');
            instance.removeLoadingState();
            (0, chai_1.expect)(instance.element.getAttribute('aria-busy')).to.equal(null);
        });
        it('sets isLoading flag to true', function () {
            (0, chai_1.expect)(instance.isLoading).to.equal(true);
            instance.removeLoadingState();
            (0, chai_1.expect)(instance.isLoading).to.equal(false);
        });
    });
});
//# sourceMappingURL=container.test.js.map