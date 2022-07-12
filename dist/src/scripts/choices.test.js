"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importStar(require("chai"));
var sinon_1 = require("sinon");
var sinon_chai_1 = __importDefault(require("sinon-chai"));
var choices_1 = __importDefault(require("./choices"));
var constants_1 = require("./constants");
var index_1 = require("./components/index");
var items_1 = require("./actions/items");
var templates_1 = __importDefault(require("./templates"));
var defaults_1 = require("./defaults");
chai_1.default.use(sinon_chai_1.default);
describe('choices', function () {
    var instance;
    var output;
    var passedElement;
    beforeEach(function () {
        passedElement = document.createElement('input');
        passedElement.type = 'text';
        passedElement.className = 'js-choices';
        document.body.appendChild(passedElement);
        instance = new choices_1.default(passedElement, { allowHTML: true });
    });
    afterEach(function () {
        output = null;
        instance = null;
    });
    describe('constructor', function () {
        describe('config', function () {
            describe('not passing config options', function () {
                it('uses the default config', function () {
                    document.body.innerHTML = "\n          <input data-choice type=\"text\" id=\"input-1\" />\n          ";
                    instance = new choices_1.default();
                    (0, chai_1.expect)(instance.config).to.eql(defaults_1.DEFAULT_CONFIG);
                });
            });
            describe('passing config options', function () {
                it('merges the passed config with the default config', function () {
                    document.body.innerHTML = "\n          <input data-choice type=\"text\" id=\"input-1\" />\n          ";
                    var config = {
                        allowHTML: true,
                        renderChoiceLimit: 5,
                    };
                    instance = new choices_1.default('[data-choice]', config);
                    (0, chai_1.expect)(instance.config).to.eql(__assign(__assign({}, defaults_1.DEFAULT_CONFIG), config));
                });
                describe('passing the searchEnabled config option with a value of false', function () {
                    describe('passing a select-multiple element', function () {
                        it('sets searchEnabled to true', function () {
                            document.body.innerHTML = "\n              <select data-choice multiple></select>\n              ";
                            instance = new choices_1.default('[data-choice]', {
                                allowHTML: true,
                                searchEnabled: false,
                            });
                            (0, chai_1.expect)(instance.config.searchEnabled).to.equal(true);
                        });
                    });
                });
                describe('passing the renderSelectedChoices config option with an unexpected value', function () {
                    it('sets renderSelectedChoices to "auto"', function () {
                        document.body.innerHTML = "\n            <select data-choice multiple></select>\n            ";
                        instance = new choices_1.default('[data-choice]', {
                            allowHTML: true,
                            renderSelectedChoices: 'test',
                        });
                        (0, chai_1.expect)(instance.config.renderSelectedChoices).to.equal('auto');
                    });
                });
            });
        });
        describe('not passing an element', function () {
            it('returns a Choices instance for the first element with a "data-choice" attribute', function () {
                document.body.innerHTML = "\n        <input data-choice type=\"text\" id=\"input-1\" />\n        <input data-choice type=\"text\" id=\"input-2\" />\n        <input data-choice type=\"text\" id=\"input-3\" />\n        ";
                var inputs = document.querySelectorAll('[data-choice]');
                (0, chai_1.expect)(inputs.length).to.equal(3);
                instance = new choices_1.default(undefined, { allowHTML: true });
                (0, chai_1.expect)(instance.passedElement.element.id).to.equal(inputs[0].id);
            });
            describe('when an element cannot be found in the DOM', function () {
                it('throws an error', function () {
                    document.body.innerHTML = "";
                    (0, chai_1.expect)(function () { return new choices_1.default(undefined, { allowHTML: true }); }).to.throw(TypeError, 'Expected one of the following types text|select-one|select-multiple');
                });
            });
        });
        describe('passing an element', function () {
            describe('passing an element that has not been initialised with Choices', function () {
                beforeEach(function () {
                    document.body.innerHTML = "\n          <input type=\"text\" id=\"input-1\" />\n          ";
                });
                it('sets the initialised flag to true', function () {
                    instance = new choices_1.default('#input-1', { allowHTML: true });
                    (0, chai_1.expect)(instance.initialised).to.equal(true);
                });
                it('intialises', function () {
                    var initSpy = (0, sinon_1.spy)();
                    // initialise with the same element
                    instance = new choices_1.default('#input-1', {
                        allowHTML: true,
                        silent: true,
                        callbackOnInit: initSpy,
                    });
                    (0, chai_1.expect)(initSpy.called).to.equal(true);
                });
            });
            describe('passing an element that has already be initialised with Choices', function () {
                beforeEach(function () {
                    document.body.innerHTML = "\n          <input type=\"text\" id=\"input-1\" />\n          ";
                    // initialise once
                    new choices_1.default('#input-1', { allowHTML: true, silent: true });
                });
                it('sets the initialised flag to true', function () {
                    // initialise with the same element
                    instance = new choices_1.default('#input-1', { allowHTML: true, silent: true });
                    (0, chai_1.expect)(instance.initialised).to.equal(true);
                });
                it('does not reinitialise', function () {
                    var initSpy = (0, sinon_1.spy)();
                    // initialise with the same element
                    instance = new choices_1.default('#input-1', {
                        allowHTML: true,
                        silent: true,
                        callbackOnInit: initSpy,
                    });
                    (0, chai_1.expect)(initSpy.called).to.equal(false);
                });
            });
            describe("passing an element as a DOMString", function () {
                describe('passing a input element type', function () {
                    it('sets the "passedElement" instance property as an instance of WrappedInput', function () {
                        document.body.innerHTML = "\n            <input data-choice type=\"text\" id=\"input-1\" />\n            ";
                        instance = new choices_1.default('[data-choice]', { allowHTML: true });
                        (0, chai_1.expect)(instance.passedElement).to.be.an.instanceOf(index_1.WrappedInput);
                    });
                });
                describe('passing a select element type', function () {
                    it('sets the "passedElement" instance property as an instance of WrappedSelect', function () {
                        document.body.innerHTML = "\n            <select data-choice id=\"select-1\"></select>\n            ";
                        instance = new choices_1.default('[data-choice]', { allowHTML: true });
                        (0, chai_1.expect)(instance.passedElement).to.be.an.instanceOf(index_1.WrappedSelect);
                    });
                });
            });
            describe("passing an element as a HTMLElement", function () {
                describe('passing a input element type', function () {
                    it('sets the "passedElement" instance property as an instance of WrappedInput', function () {
                        document.body.innerHTML = "\n            <input data-choice type=\"text\" id=\"input-1\" />\n            ";
                        instance = new choices_1.default('[data-choice]', { allowHTML: true });
                        (0, chai_1.expect)(instance.passedElement).to.be.an.instanceOf(index_1.WrappedInput);
                    });
                });
                describe('passing a select element type', function () {
                    it('sets the "passedElement" instance property as an instance of WrappedSelect', function () {
                        document.body.innerHTML = "\n            <select data-choice id=\"select-1\"></select>\n            ";
                        instance = new choices_1.default('[data-choice]', { allowHTML: true });
                        (0, chai_1.expect)(instance.passedElement).to.be.an.instanceOf(index_1.WrappedSelect);
                    });
                });
            });
            describe('passing an invalid element type', function () {
                it('throws an TypeError', function () {
                    document.body.innerHTML = "\n          <div data-choice id=\"div-1\"></div>\n          ";
                    (0, chai_1.expect)(function () { return new choices_1.default('[data-choice]', { allowHTML: true }); }).to.throw(TypeError, 'Expected one of the following types text|select-one|select-multiple');
                });
            });
        });
    });
    describe('public methods', function () {
        describe('init', function () {
            var callbackOnInitSpy = (0, sinon_1.spy)();
            beforeEach(function () {
                instance = new choices_1.default(passedElement, {
                    allowHTML: true,
                    callbackOnInit: callbackOnInitSpy,
                    silent: true,
                });
            });
            describe('when already initialised', function () {
                beforeEach(function () {
                    instance.initialised = true;
                    instance.init();
                });
                it("doesn't set initialise flag", function () {
                    (0, chai_1.expect)(instance.initialised).to.not.equal(false);
                });
            });
            describe('not already initialised', function () {
                var createTemplatesSpy;
                var createInputSpy;
                var storeSubscribeSpy;
                var renderSpy;
                var addEventListenersSpy;
                beforeEach(function () {
                    createTemplatesSpy = (0, sinon_1.spy)(instance, '_createTemplates');
                    createInputSpy = (0, sinon_1.spy)(instance, '_createStructure');
                    storeSubscribeSpy = (0, sinon_1.spy)(instance._store, 'subscribe');
                    renderSpy = (0, sinon_1.spy)(instance, '_render');
                    addEventListenersSpy = (0, sinon_1.spy)(instance, '_addEventListeners');
                    instance.initialised = false;
                    instance.init();
                });
                afterEach(function () {
                    createTemplatesSpy.restore();
                    createInputSpy.restore();
                    storeSubscribeSpy.restore();
                    renderSpy.restore();
                    addEventListenersSpy.restore();
                });
                it('sets initialise flag', function () {
                    (0, chai_1.expect)(instance.initialised).to.equal(true);
                });
                it('creates templates', function () {
                    (0, chai_1.expect)(createTemplatesSpy.called).to.equal(true);
                });
                it('creates input', function () {
                    (0, chai_1.expect)(createInputSpy.called).to.equal(true);
                });
                it('subscribes to store with render method', function () {
                    (0, chai_1.expect)(storeSubscribeSpy.called).to.equal(true);
                    (0, chai_1.expect)(storeSubscribeSpy.lastCall.args[0]).to.equal(instance._render);
                });
                it('fires initial render', function () {
                    (0, chai_1.expect)(renderSpy.called).to.equal(true);
                });
                it('adds event listeners', function () {
                    (0, chai_1.expect)(addEventListenersSpy.called).to.equal(true);
                });
                it('fires callback', function () {
                    (0, chai_1.expect)(callbackOnInitSpy.called).to.equal(true);
                });
            });
        });
        describe('destroy', function () {
            beforeEach(function () {
                passedElement = document.createElement('input');
                passedElement.type = 'text';
                passedElement.className = 'js-choices';
                document.body.appendChild(passedElement);
                instance = new choices_1.default(passedElement, { allowHTML: true });
            });
            describe('not already initialised', function () {
                beforeEach(function () {
                    instance.initialised = false;
                    instance.destroy();
                });
                it("doesn't set initialise flag", function () {
                    (0, chai_1.expect)(instance.initialised).to.not.equal(true);
                });
            });
            describe('when already initialised', function () {
                var removeEventListenersSpy;
                var passedElementRevealSpy;
                var containerOuterUnwrapSpy;
                var clearStoreSpy;
                beforeEach(function () {
                    removeEventListenersSpy = (0, sinon_1.spy)(instance, '_removeEventListeners');
                    passedElementRevealSpy = (0, sinon_1.spy)(instance.passedElement, 'reveal');
                    containerOuterUnwrapSpy = (0, sinon_1.spy)(instance.containerOuter, 'unwrap');
                    clearStoreSpy = (0, sinon_1.spy)(instance, 'clearStore');
                    instance.initialised = true;
                    instance.destroy();
                });
                afterEach(function () {
                    removeEventListenersSpy.restore();
                    passedElementRevealSpy.restore();
                    containerOuterUnwrapSpy.restore();
                    clearStoreSpy.restore();
                });
                it('removes event listeners', function () {
                    (0, chai_1.expect)(removeEventListenersSpy.called).to.equal(true);
                });
                it('reveals passed element', function () {
                    (0, chai_1.expect)(passedElementRevealSpy.called).to.equal(true);
                });
                it('reverts outer container', function () {
                    (0, chai_1.expect)(containerOuterUnwrapSpy.called).to.equal(true);
                    (0, chai_1.expect)(containerOuterUnwrapSpy.lastCall.args[0]).to.equal(instance.passedElement.element);
                });
                it('clears store', function () {
                    (0, chai_1.expect)(clearStoreSpy.called).to.equal(true);
                });
                it('restes templates config', function () {
                    (0, chai_1.expect)(instance._templates).to.deep.equal(templates_1.default);
                });
                it('resets initialise flag', function () {
                    (0, chai_1.expect)(instance.initialised).to.equal(false);
                });
            });
        });
        describe('enable', function () {
            var passedElementEnableSpy;
            var addEventListenersSpy;
            var containerOuterEnableSpy;
            var inputEnableSpy;
            beforeEach(function () {
                addEventListenersSpy = (0, sinon_1.spy)(instance, '_addEventListeners');
                passedElementEnableSpy = (0, sinon_1.spy)(instance.passedElement, 'enable');
                containerOuterEnableSpy = (0, sinon_1.spy)(instance.containerOuter, 'enable');
                inputEnableSpy = (0, sinon_1.spy)(instance.input, 'enable');
            });
            afterEach(function () {
                addEventListenersSpy.restore();
                passedElementEnableSpy.restore();
                containerOuterEnableSpy.restore();
                inputEnableSpy.restore();
            });
            describe('when already enabled', function () {
                beforeEach(function () {
                    instance.passedElement.isDisabled = false;
                    instance.containerOuter.isDisabled = false;
                    output = instance.enable();
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('returns early', function () {
                    (0, chai_1.expect)(passedElementEnableSpy.called).to.equal(false);
                    (0, chai_1.expect)(addEventListenersSpy.called).to.equal(false);
                    (0, chai_1.expect)(inputEnableSpy.called).to.equal(false);
                    (0, chai_1.expect)(containerOuterEnableSpy.called).to.equal(false);
                });
            });
            describe('when not already enabled', function () {
                beforeEach(function () {
                    instance.passedElement.isDisabled = true;
                    instance.containerOuter.isDisabled = true;
                    instance.enable();
                });
                it('adds event listeners', function () {
                    (0, chai_1.expect)(addEventListenersSpy.called).to.equal(true);
                });
                it('enables input', function () {
                    (0, chai_1.expect)(inputEnableSpy.called).to.equal(true);
                });
                it('enables containerOuter', function () {
                    (0, chai_1.expect)(containerOuterEnableSpy.called).to.equal(true);
                });
            });
        });
        describe('disable', function () {
            var removeEventListenersSpy;
            var passedElementDisableSpy;
            var containerOuterDisableSpy;
            var inputDisableSpy;
            beforeEach(function () {
                removeEventListenersSpy = (0, sinon_1.spy)(instance, '_removeEventListeners');
                passedElementDisableSpy = (0, sinon_1.spy)(instance.passedElement, 'disable');
                containerOuterDisableSpy = (0, sinon_1.spy)(instance.containerOuter, 'disable');
                inputDisableSpy = (0, sinon_1.spy)(instance.input, 'disable');
            });
            afterEach(function () {
                removeEventListenersSpy.restore();
                passedElementDisableSpy.restore();
                containerOuterDisableSpy.restore();
                inputDisableSpy.restore();
            });
            describe('when already disabled', function () {
                beforeEach(function () {
                    instance.passedElement.isDisabled = true;
                    instance.containerOuter.isDisabled = true;
                    output = instance.disable();
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('returns early', function () {
                    (0, chai_1.expect)(removeEventListenersSpy.called).to.equal(false);
                    (0, chai_1.expect)(passedElementDisableSpy.called).to.equal(false);
                    (0, chai_1.expect)(containerOuterDisableSpy.called).to.equal(false);
                    (0, chai_1.expect)(inputDisableSpy.called).to.equal(false);
                });
            });
            describe('when not already disabled', function () {
                beforeEach(function () {
                    instance.passedElement.isDisabled = false;
                    instance.containerOuter.isDisabled = false;
                    output = instance.disable();
                });
                it('removes event listeners', function () {
                    (0, chai_1.expect)(removeEventListenersSpy.called).to.equal(true);
                });
                it('disables input', function () {
                    (0, chai_1.expect)(inputDisableSpy.called).to.equal(true);
                });
                it('enables containerOuter', function () {
                    (0, chai_1.expect)(containerOuterDisableSpy.called).to.equal(true);
                });
            });
        });
        describe('showDropdown', function () {
            var containerOuterOpenSpy;
            var dropdownShowSpy;
            var inputFocusSpy;
            var passedElementTriggerEventStub;
            beforeEach(function () {
                containerOuterOpenSpy = (0, sinon_1.spy)(instance.containerOuter, 'open');
                dropdownShowSpy = (0, sinon_1.spy)(instance.dropdown, 'show');
                inputFocusSpy = (0, sinon_1.spy)(instance.input, 'focus');
                passedElementTriggerEventStub = (0, sinon_1.stub)();
                instance.passedElement.triggerEvent = passedElementTriggerEventStub;
            });
            afterEach(function () {
                containerOuterOpenSpy.restore();
                dropdownShowSpy.restore();
                inputFocusSpy.restore();
                instance.passedElement.triggerEvent.reset();
            });
            describe('dropdown active', function () {
                beforeEach(function () {
                    instance.dropdown.isActive = true;
                    output = instance.showDropdown();
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('returns early', function () {
                    (0, chai_1.expect)(containerOuterOpenSpy.called).to.equal(false);
                    (0, chai_1.expect)(dropdownShowSpy.called).to.equal(false);
                    (0, chai_1.expect)(inputFocusSpy.called).to.equal(false);
                    (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(false);
                });
            });
            describe('dropdown inactive', function () {
                beforeEach(function () {
                    instance.dropdown.isActive = false;
                    output = instance.showDropdown();
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('opens containerOuter', function (done) {
                    requestAnimationFrame(function () {
                        (0, chai_1.expect)(containerOuterOpenSpy.called).to.equal(true);
                        done();
                    });
                });
                it('shows dropdown with blurInput flag', function (done) {
                    requestAnimationFrame(function () {
                        (0, chai_1.expect)(dropdownShowSpy.called).to.equal(true);
                        done();
                    });
                });
                it('triggers event on passedElement', function (done) {
                    requestAnimationFrame(function () {
                        (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(true);
                        (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[0]).to.eql(constants_1.EVENTS.showDropdown);
                        (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[1]).to.eql({});
                        done();
                    });
                });
                describe('passing true focusInput flag with canSearch set to true', function () {
                    beforeEach(function () {
                        instance.dropdown.isActive = false;
                        instance._canSearch = true;
                        output = instance.showDropdown(true);
                    });
                    it('focuses input', function (done) {
                        requestAnimationFrame(function () {
                            (0, chai_1.expect)(inputFocusSpy.called).to.equal(true);
                            done();
                        });
                    });
                });
            });
        });
        describe('hideDropdown', function () {
            var containerOuterCloseSpy;
            var dropdownHideSpy;
            var inputBlurSpy;
            var inputRemoveActiveDescendantSpy;
            var passedElementTriggerEventStub;
            beforeEach(function () {
                containerOuterCloseSpy = (0, sinon_1.spy)(instance.containerOuter, 'close');
                dropdownHideSpy = (0, sinon_1.spy)(instance.dropdown, 'hide');
                inputBlurSpy = (0, sinon_1.spy)(instance.input, 'blur');
                inputRemoveActiveDescendantSpy = (0, sinon_1.spy)(instance.input, 'removeActiveDescendant');
                passedElementTriggerEventStub = (0, sinon_1.stub)();
                instance.passedElement.triggerEvent = passedElementTriggerEventStub;
            });
            afterEach(function () {
                containerOuterCloseSpy.restore();
                dropdownHideSpy.restore();
                inputBlurSpy.restore();
                inputRemoveActiveDescendantSpy.restore();
                instance.passedElement.triggerEvent.reset();
            });
            describe('dropdown inactive', function () {
                beforeEach(function () {
                    instance.dropdown.isActive = false;
                    output = instance.hideDropdown();
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('returns early', function () {
                    (0, chai_1.expect)(containerOuterCloseSpy.called).to.equal(false);
                    (0, chai_1.expect)(dropdownHideSpy.called).to.equal(false);
                    (0, chai_1.expect)(inputBlurSpy.called).to.equal(false);
                    (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(false);
                });
            });
            describe('dropdown active', function () {
                beforeEach(function () {
                    instance.dropdown.isActive = true;
                    output = instance.hideDropdown();
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('closes containerOuter', function (done) {
                    requestAnimationFrame(function () {
                        (0, chai_1.expect)(containerOuterCloseSpy.called).to.equal(true);
                        done();
                    });
                });
                it('hides dropdown with blurInput flag', function (done) {
                    requestAnimationFrame(function () {
                        (0, chai_1.expect)(dropdownHideSpy.called).to.equal(true);
                        done();
                    });
                });
                it('triggers event on passedElement', function (done) {
                    requestAnimationFrame(function () {
                        (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(true);
                        (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[0]).to.eql(constants_1.EVENTS.hideDropdown);
                        (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[1]).to.eql({});
                        done();
                    });
                });
                describe('passing true blurInput flag with canSearch set to true', function () {
                    beforeEach(function () {
                        instance.dropdown.isActive = true;
                        instance._canSearch = true;
                        output = instance.hideDropdown(true);
                    });
                    it('removes active descendants', function (done) {
                        requestAnimationFrame(function () {
                            (0, chai_1.expect)(inputRemoveActiveDescendantSpy.called).to.equal(true);
                            done();
                        });
                    });
                    it('blurs input', function (done) {
                        requestAnimationFrame(function () {
                            (0, chai_1.expect)(inputBlurSpy.called).to.equal(true);
                            done();
                        });
                    });
                });
            });
        });
        describe('highlightItem', function () {
            var passedElementTriggerEventStub;
            var storeDispatchSpy;
            var storeGetGroupByIdStub;
            var groupIdValue = 'Test';
            beforeEach(function () {
                passedElementTriggerEventStub = (0, sinon_1.stub)();
                storeGetGroupByIdStub = (0, sinon_1.stub)().returns({
                    value: groupIdValue,
                });
                storeDispatchSpy = (0, sinon_1.spy)(instance._store, 'dispatch');
                instance._store.getGroupById = storeGetGroupByIdStub;
                instance.passedElement.triggerEvent = passedElementTriggerEventStub;
            });
            afterEach(function () {
                storeDispatchSpy.restore();
                instance._store.getGroupById.reset();
                instance.passedElement.triggerEvent.reset();
            });
            describe('no item passed', function () {
                beforeEach(function () {
                    output = instance.highlightItem();
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('returns early', function () {
                    (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(false);
                    (0, chai_1.expect)(storeDispatchSpy.called).to.equal(false);
                    (0, chai_1.expect)(storeGetGroupByIdStub.called).to.equal(false);
                });
            });
            describe('item passed', function () {
                var item = {
                    id: 1234,
                    value: 'Test',
                    label: 'Test',
                };
                describe('passing truthy second paremeter', function () {
                    beforeEach(function () {
                        output = instance.highlightItem(item, true);
                    });
                    it('returns this', function () {
                        (0, chai_1.expect)(output).to.eql(instance);
                    });
                    it('dispatches highlightItem action with correct arguments', function () {
                        (0, chai_1.expect)(storeDispatchSpy.called).to.equal(true);
                        (0, chai_1.expect)(storeDispatchSpy.lastCall.args[0]).to.eql({
                            type: constants_1.ACTION_TYPES.HIGHLIGHT_ITEM,
                            id: item.id,
                            highlighted: true,
                        });
                    });
                    describe('item with negative groupId', function () {
                        beforeEach(function () {
                            item.groupId = -1;
                            output = instance.highlightItem(item);
                        });
                        it('triggers event with null groupValue', function () {
                            (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(true);
                            (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[0]).to.equal(constants_1.EVENTS.highlightItem);
                            (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[1]).to.eql({
                                id: item.id,
                                value: item.value,
                                label: item.label,
                                groupValue: null,
                            });
                        });
                    });
                    describe('item without groupId', function () {
                        beforeEach(function () {
                            item.groupId = 1;
                            output = instance.highlightItem(item);
                        });
                        it('triggers event with groupValue', function () {
                            (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(true);
                            (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[0]).to.equal(constants_1.EVENTS.highlightItem);
                            (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[1]).to.eql({
                                id: item.id,
                                value: item.value,
                                label: item.label,
                                groupValue: groupIdValue,
                            });
                        });
                    });
                });
                describe('passing falsey second paremeter', function () {
                    beforeEach(function () {
                        output = instance.highlightItem(item, false);
                    });
                    it("doesn't trigger event", function () {
                        (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(false);
                    });
                    it('returns this', function () {
                        (0, chai_1.expect)(output).to.eql(instance);
                    });
                });
            });
        });
        describe('unhighlightItem', function () {
            var passedElementTriggerEventStub;
            var storeDispatchSpy;
            var storeGetGroupByIdStub;
            var groupIdValue = 'Test';
            beforeEach(function () {
                passedElementTriggerEventStub = (0, sinon_1.stub)();
                storeGetGroupByIdStub = (0, sinon_1.stub)().returns({
                    value: groupIdValue,
                });
                storeDispatchSpy = (0, sinon_1.spy)(instance._store, 'dispatch');
                instance._store.getGroupById = storeGetGroupByIdStub;
                instance.passedElement.triggerEvent = passedElementTriggerEventStub;
            });
            afterEach(function () {
                storeDispatchSpy.restore();
                instance._store.getGroupById.reset();
                instance.passedElement.triggerEvent.reset();
            });
            describe('no item passed', function () {
                beforeEach(function () {
                    output = instance.unhighlightItem();
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('returns early', function () {
                    (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(false);
                    (0, chai_1.expect)(storeDispatchSpy.called).to.equal(false);
                    (0, chai_1.expect)(storeGetGroupByIdStub.called).to.equal(false);
                });
            });
            describe('item passed', function () {
                var item = {
                    id: 1234,
                    value: 'Test',
                    label: 'Test',
                };
                describe('passing truthy second paremeter', function () {
                    beforeEach(function () {
                        output = instance.unhighlightItem(item, true);
                    });
                    it('returns this', function () {
                        (0, chai_1.expect)(output).to.eql(instance);
                    });
                    it('dispatches highlightItem action with correct arguments', function () {
                        (0, chai_1.expect)(storeDispatchSpy.called).to.equal(true);
                        (0, chai_1.expect)(storeDispatchSpy.lastCall.args[0]).to.eql({
                            type: constants_1.ACTION_TYPES.HIGHLIGHT_ITEM,
                            id: item.id,
                            highlighted: false,
                        });
                    });
                    describe('item with negative groupId', function () {
                        beforeEach(function () {
                            item.groupId = -1;
                            output = instance.unhighlightItem(item);
                        });
                        it('triggers event with null groupValue', function () {
                            (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(true);
                            (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[0]).to.equal(constants_1.EVENTS.highlightItem);
                            (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[1]).to.eql({
                                id: item.id,
                                value: item.value,
                                label: item.label,
                                groupValue: null,
                            });
                        });
                    });
                    describe('item without groupId', function () {
                        beforeEach(function () {
                            item.groupId = 1;
                            output = instance.highlightItem(item);
                        });
                        it('triggers event with groupValue', function () {
                            (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(true);
                            (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[0]).to.equal(constants_1.EVENTS.highlightItem);
                            (0, chai_1.expect)(passedElementTriggerEventStub.lastCall.args[1]).to.eql({
                                id: item.id,
                                value: item.value,
                                label: item.label,
                                groupValue: groupIdValue,
                            });
                        });
                    });
                });
                describe('passing falsey second paremeter', function () {
                    beforeEach(function () {
                        output = instance.highlightItem(item, false);
                    });
                    it("doesn't trigger event", function () {
                        (0, chai_1.expect)(passedElementTriggerEventStub.called).to.equal(false);
                    });
                    it('returns this', function () {
                        (0, chai_1.expect)(output).to.eql(instance);
                    });
                });
            });
        });
        describe('highlightAll', function () {
            var storeGetItemsStub;
            var highlightItemStub;
            var items = [
                {
                    id: 1,
                    value: 'Test 1',
                },
                {
                    id: 2,
                    value: 'Test 2',
                },
            ];
            beforeEach(function () {
                storeGetItemsStub = (0, sinon_1.stub)(instance._store, 'items').get(function () { return items; });
                highlightItemStub = (0, sinon_1.stub)();
                instance.highlightItem = highlightItemStub;
                output = instance.highlightAll();
            });
            afterEach(function () {
                highlightItemStub.reset();
                storeGetItemsStub.reset();
            });
            it('returns this', function () {
                (0, chai_1.expect)(output).to.eql(instance);
            });
            it('highlights each item in store', function () {
                (0, chai_1.expect)(highlightItemStub.callCount).to.equal(items.length);
                (0, chai_1.expect)(highlightItemStub.firstCall.args[0]).to.equal(items[0]);
                (0, chai_1.expect)(highlightItemStub.lastCall.args[0]).to.equal(items[1]);
            });
        });
        describe('unhighlightAll', function () {
            var storeGetItemsStub;
            var unhighlightItemStub;
            var items = [
                {
                    id: 1,
                    value: 'Test 1',
                },
                {
                    id: 2,
                    value: 'Test 2',
                },
            ];
            beforeEach(function () {
                storeGetItemsStub = (0, sinon_1.stub)(instance._store, 'items').get(function () { return items; });
                unhighlightItemStub = (0, sinon_1.stub)();
                instance.unhighlightItem = unhighlightItemStub;
                output = instance.unhighlightAll();
            });
            afterEach(function () {
                instance.unhighlightItem.reset();
                storeGetItemsStub.reset();
            });
            it('returns this', function () {
                (0, chai_1.expect)(output).to.eql(instance);
            });
            it('unhighlights each item in store', function () {
                (0, chai_1.expect)(unhighlightItemStub.callCount).to.equal(items.length);
                (0, chai_1.expect)(unhighlightItemStub.firstCall.args[0]).to.equal(items[0]);
                (0, chai_1.expect)(unhighlightItemStub.lastCall.args[0]).to.equal(items[1]);
            });
        });
        describe('clearChoices', function () {
            var storeDispatchStub;
            beforeEach(function () {
                storeDispatchStub = (0, sinon_1.stub)();
                instance._store.dispatch = storeDispatchStub;
                output = instance.clearChoices();
            });
            afterEach(function () {
                instance._store.dispatch.reset();
            });
            it('returns this', function () {
                (0, chai_1.expect)(output).to.eql(instance);
            });
            it('dispatches clearChoices action', function () {
                (0, chai_1.expect)(storeDispatchStub.lastCall.args[0]).to.eql({
                    type: constants_1.ACTION_TYPES.CLEAR_CHOICES,
                });
            });
        });
        describe('clearStore', function () {
            var storeDispatchStub;
            beforeEach(function () {
                storeDispatchStub = (0, sinon_1.stub)();
                instance._store.dispatch = storeDispatchStub;
                output = instance.clearStore();
            });
            afterEach(function () {
                instance._store.dispatch.reset();
            });
            it('returns this', function () {
                (0, chai_1.expect)(output).to.eql(instance);
            });
            it('dispatches clearAll action', function () {
                (0, chai_1.expect)(storeDispatchStub.lastCall.args[0]).to.eql({
                    type: constants_1.ACTION_TYPES.CLEAR_ALL,
                });
            });
        });
        describe('clearInput', function () {
            var inputClearSpy;
            var storeDispatchStub;
            beforeEach(function () {
                inputClearSpy = (0, sinon_1.spy)(instance.input, 'clear');
                storeDispatchStub = (0, sinon_1.stub)();
                instance._store.dispatch = storeDispatchStub;
                output = instance.clearInput();
            });
            afterEach(function () {
                inputClearSpy.restore();
                instance._store.dispatch.reset();
            });
            it('returns this', function () {
                (0, chai_1.expect)(output).to.eql(instance);
            });
            describe('text element', function () {
                beforeEach(function () {
                    instance._isSelectOneElement = false;
                    instance._isTextElement = false;
                    output = instance.clearInput();
                });
                it('clears input with correct arguments', function () {
                    (0, chai_1.expect)(inputClearSpy.called).to.equal(true);
                    (0, chai_1.expect)(inputClearSpy.lastCall.args[0]).to.equal(true);
                });
            });
            describe('select element with search enabled', function () {
                beforeEach(function () {
                    instance._isSelectOneElement = true;
                    instance._isTextElement = false;
                    instance.config.searchEnabled = true;
                    output = instance.clearInput();
                });
                it('clears input with correct arguments', function () {
                    (0, chai_1.expect)(inputClearSpy.called).to.equal(true);
                    (0, chai_1.expect)(inputClearSpy.lastCall.args[0]).to.equal(false);
                });
                it('resets search flag', function () {
                    (0, chai_1.expect)(instance._isSearching).to.equal(false);
                });
                it('dispatches activateChoices action', function () {
                    (0, chai_1.expect)(storeDispatchStub.called).to.equal(true);
                    (0, chai_1.expect)(storeDispatchStub.lastCall.args[0]).to.eql({
                        type: constants_1.ACTION_TYPES.ACTIVATE_CHOICES,
                        active: true,
                    });
                });
            });
        });
        describe('setChoices with callback/Promise', function () {
            describe('not initialised', function () {
                beforeEach(function () {
                    instance.initialised = false;
                });
                it('should throw', function () {
                    (0, chai_1.expect)(function () { return instance.setChoices(null); }).Throw(ReferenceError);
                });
            });
            describe('text element', function () {
                beforeEach(function () {
                    instance._isSelectElement = false;
                });
                it('should throw', function () {
                    (0, chai_1.expect)(function () { return instance.setChoices(null); }).Throw(TypeError);
                });
            });
            describe('passing invalid function', function () {
                beforeEach(function () {
                    instance._isSelectElement = true;
                });
                it('should throw on non function', function () {
                    (0, chai_1.expect)(function () { return instance.setChoices(null); }).Throw(TypeError, /Promise/i);
                });
                it("should throw on function that doesn't return promise", function () {
                    (0, chai_1.expect)(function () { return instance.setChoices(function () { return 'boo'; }); }).to.throw(TypeError, /promise/i);
                });
            });
            describe('select element', function () {
                it('fetches and sets choices', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var choice, handleLoadingStateSpy, fetcherCalled, fetcher, promise, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                document.body.innerHTML = '<select id="test" />';
                                choice = new choices_1.default('#test', { allowHTML: true });
                                handleLoadingStateSpy = (0, sinon_1.spy)(choice, '_handleLoadingState');
                                fetcherCalled = false;
                                fetcher = function (inst) { return __awaiter(void 0, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                (0, chai_1.expect)(inst).to.eq(choice);
                                                fetcherCalled = true;
                                                // eslint-disable-next-line no-promise-executor-return
                                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 800); })];
                                            case 1:
                                                // eslint-disable-next-line no-promise-executor-return
                                                _a.sent();
                                                return [2 /*return*/, [
                                                        { label: 'l1', value: 'v1', customProperties: { prop1: true } },
                                                        { label: 'l2', value: 'v2', customProperties: { prop2: false } },
                                                    ]];
                                        }
                                    });
                                }); };
                                (0, chai_1.expect)(choice._store.choices.length).to.equal(0);
                                promise = choice.setChoices(fetcher);
                                (0, chai_1.expect)(fetcherCalled).to.be.true;
                                return [4 /*yield*/, promise];
                            case 1:
                                res = _a.sent();
                                (0, chai_1.expect)(res).to.equal(choice);
                                (0, chai_1.expect)(handleLoadingStateSpy.callCount).to.equal(2);
                                (0, chai_1.expect)(choice._store.choices[1].value).to.equal('v2');
                                (0, chai_1.expect)(choice._store.choices[1].label).to.equal('l2');
                                (0, chai_1.expect)(choice._store.choices[1].customProperties).to.deep.equal({
                                    prop2: false,
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('setValue', function () {
            var setChoiceOrItemStub;
            var values = [
                'Value 1',
                {
                    value: 'Value 2',
                },
            ];
            beforeEach(function () {
                setChoiceOrItemStub = (0, sinon_1.stub)();
                instance._setChoiceOrItem = setChoiceOrItemStub;
            });
            afterEach(function () {
                instance._setChoiceOrItem.reset();
            });
            describe('not already initialised', function () {
                beforeEach(function () {
                    instance.initialised = false;
                    output = instance.setValue(values);
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('returns early', function () {
                    (0, chai_1.expect)(setChoiceOrItemStub.called).to.equal(false);
                });
            });
            describe('when already initialised', function () {
                beforeEach(function () {
                    instance.initialised = true;
                    output = instance.setValue(values);
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('sets each value', function () {
                    (0, chai_1.expect)(setChoiceOrItemStub.callCount).to.equal(2);
                    (0, chai_1.expect)(setChoiceOrItemStub.firstCall.args[0]).to.equal(values[0]);
                    (0, chai_1.expect)(setChoiceOrItemStub.secondCall.args[0]).to.equal(values[1]);
                });
            });
        });
        describe('setChoiceByValue', function () {
            var findAndSelectChoiceByValueStub;
            beforeEach(function () {
                findAndSelectChoiceByValueStub = (0, sinon_1.stub)();
                instance._findAndSelectChoiceByValue = findAndSelectChoiceByValueStub;
            });
            afterEach(function () {
                instance._findAndSelectChoiceByValue.reset();
            });
            describe('not already initialised', function () {
                beforeEach(function () {
                    instance.initialised = false;
                    output = instance.setChoiceByValue([]);
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('returns early', function () {
                    (0, chai_1.expect)(findAndSelectChoiceByValueStub.called).to.equal(false);
                });
            });
            describe('when already initialised and not text element', function () {
                beforeEach(function () {
                    instance.initialised = true;
                    instance._isTextElement = false;
                });
                describe('passing a string value', function () {
                    var value = 'Test value';
                    beforeEach(function () {
                        output = instance.setChoiceByValue(value);
                    });
                    it('returns this', function () {
                        (0, chai_1.expect)(output).to.eql(instance);
                    });
                    it('sets each choice with same value', function () {
                        (0, chai_1.expect)(findAndSelectChoiceByValueStub.called).to.equal(true);
                        (0, chai_1.expect)(findAndSelectChoiceByValueStub.firstCall.args[0]).to.equal(value);
                    });
                });
                describe('passing an array of values', function () {
                    var values = ['Value 1', 'Value 2'];
                    beforeEach(function () {
                        output = instance.setChoiceByValue(values);
                    });
                    it('returns this', function () {
                        (0, chai_1.expect)(output).to.eql(instance);
                    });
                    it('sets each choice with same value', function () {
                        (0, chai_1.expect)(findAndSelectChoiceByValueStub.callCount).to.equal(2);
                        (0, chai_1.expect)(findAndSelectChoiceByValueStub.firstCall.args[0]).to.equal(values[0]);
                        (0, chai_1.expect)(findAndSelectChoiceByValueStub.secondCall.args[0]).to.equal(values[1]);
                    });
                });
            });
        });
        describe('getValue', function () {
            var activeItemsStub;
            var items = [
                {
                    id: '1',
                    value: 'Test value 1',
                },
                {
                    id: '2',
                    value: 'Test value 2',
                },
            ];
            beforeEach(function () {
                activeItemsStub = (0, sinon_1.stub)(instance._store, 'activeItems').get(function () { return items; });
            });
            afterEach(function () {
                activeItemsStub.reset();
            });
            describe('passing true valueOnly flag', function () {
                describe('select one input', function () {
                    beforeEach(function () {
                        instance._isSelectOneElement = true;
                        output = instance.getValue(true);
                    });
                    it('returns a single action value', function () {
                        (0, chai_1.expect)(output).to.equal(items[0].value);
                    });
                });
                describe('non select one input', function () {
                    beforeEach(function () {
                        instance._isSelectOneElement = false;
                        output = instance.getValue(true);
                    });
                    it('returns all active item values', function () {
                        (0, chai_1.expect)(output).to.eql(items.map(function (item) { return item.value; }));
                    });
                });
            });
            describe('passing false valueOnly flag', function () {
                describe('select one input', function () {
                    beforeEach(function () {
                        instance._isSelectOneElement = true;
                        output = instance.getValue(false);
                    });
                    it('returns a single active item', function () {
                        (0, chai_1.expect)(output).to.equal(items[0]);
                    });
                });
                describe('non select one input', function () {
                    beforeEach(function () {
                        instance._isSelectOneElement = false;
                        output = instance.getValue(false);
                    });
                    it('returns all active items', function () {
                        (0, chai_1.expect)(output).to.eql(items);
                    });
                });
            });
        });
        describe('removeActiveItemsByValue', function () {
            var activeItemsStub;
            var removeItemStub;
            var value = 'Removed';
            var items = [
                {
                    id: '1',
                    value: 'Not removed',
                },
                {
                    id: '2',
                    value: 'Removed',
                },
                {
                    id: '3',
                    value: 'Removed',
                },
            ];
            beforeEach(function () {
                removeItemStub = (0, sinon_1.stub)();
                activeItemsStub = (0, sinon_1.stub)(instance._store, 'activeItems').get(function () { return items; });
                instance._removeItem = removeItemStub;
                output = instance.removeActiveItemsByValue(value);
            });
            afterEach(function () {
                activeItemsStub.reset();
                instance._removeItem.reset();
            });
            it('removes each active item in store with matching value', function () {
                (0, chai_1.expect)(removeItemStub.callCount).to.equal(2);
                (0, chai_1.expect)(removeItemStub.firstCall.args[0]).to.equal(items[1]);
                (0, chai_1.expect)(removeItemStub.secondCall.args[0]).to.equal(items[2]);
            });
        });
        describe('removeActiveItems', function () {
            var activeItemsStub;
            var removeItemStub;
            var items = [
                {
                    id: '1',
                    value: 'Not removed',
                },
                {
                    id: '2',
                    value: 'Removed',
                },
                {
                    id: '3',
                    value: 'Removed',
                },
            ];
            beforeEach(function () {
                removeItemStub = (0, sinon_1.stub)();
                activeItemsStub = (0, sinon_1.stub)(instance._store, 'activeItems').get(function () { return items; });
                instance._removeItem = removeItemStub;
            });
            afterEach(function () {
                activeItemsStub.reset();
                instance._removeItem.reset();
            });
            describe('not passing id to exclude', function () {
                beforeEach(function () {
                    output = instance.removeActiveItems();
                });
                it('removes all active items in store', function () {
                    (0, chai_1.expect)(removeItemStub.callCount).to.equal(items.length);
                    (0, chai_1.expect)(removeItemStub.firstCall.args[0]).to.equal(items[0]);
                    (0, chai_1.expect)(removeItemStub.secondCall.args[0]).to.equal(items[1]);
                    (0, chai_1.expect)(removeItemStub.thirdCall.args[0]).to.equal(items[2]);
                });
            });
            describe('passing id to exclude', function () {
                var idToExclude = '2';
                beforeEach(function () {
                    output = instance.removeActiveItems(idToExclude);
                });
                it('removes all active items in store with id that does match excludedId', function () {
                    (0, chai_1.expect)(removeItemStub.callCount).to.equal(2);
                    (0, chai_1.expect)(removeItemStub.firstCall.args[0]).to.equal(items[0]);
                    (0, chai_1.expect)(removeItemStub.secondCall.args[0]).to.equal(items[2]);
                });
            });
        });
        describe('removeHighlightedItems', function () {
            var highlightedActiveItemsStub;
            var removeItemStub;
            var triggerChangeStub;
            var items = [
                {
                    id: 1,
                    value: 'Test 1',
                },
                {
                    id: 2,
                    value: 'Test 2',
                },
            ];
            beforeEach(function () {
                highlightedActiveItemsStub = (0, sinon_1.stub)(instance._store, 'highlightedActiveItems').get(function () { return items; });
                removeItemStub = (0, sinon_1.stub)();
                triggerChangeStub = (0, sinon_1.stub)();
                instance._removeItem = removeItemStub;
                instance._triggerChange = triggerChangeStub;
            });
            afterEach(function () {
                highlightedActiveItemsStub.reset();
                instance._removeItem.reset();
                instance._triggerChange.reset();
            });
            describe('runEvent parameter being passed', function () {
                beforeEach(function () {
                    output = instance.removeHighlightedItems();
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('removes each highlighted item in store', function () {
                    (0, chai_1.expect)(removeItemStub.callCount).to.equal(2);
                });
            });
            describe('runEvent parameter not being passed', function () {
                beforeEach(function () {
                    output = instance.removeHighlightedItems(true);
                });
                it('returns this', function () {
                    (0, chai_1.expect)(output).to.eql(instance);
                });
                it('triggers event with item value', function () {
                    (0, chai_1.expect)(triggerChangeStub.callCount).to.equal(2);
                    (0, chai_1.expect)(triggerChangeStub.firstCall.args[0]).to.equal(items[0].value);
                    (0, chai_1.expect)(triggerChangeStub.secondCall.args[0]).to.equal(items[1].value);
                });
            });
        });
        describe('setChoices', function () {
            var clearChoicesStub;
            var addGroupStub;
            var addChoiceStub;
            var containerOuterRemoveLoadingStateStub;
            var value = 'value';
            var label = 'label';
            var choices = [
                {
                    id: 1,
                    value: '1',
                    label: 'Test 1',
                    selected: false,
                    disabled: false,
                },
                {
                    id: 2,
                    value: '2',
                    label: 'Test 2',
                    selected: false,
                    disabled: true,
                },
            ];
            var groups = [
                __assign(__assign({}, choices[0]), { choices: choices }),
                choices[1],
            ];
            beforeEach(function () {
                clearChoicesStub = (0, sinon_1.stub)();
                addGroupStub = (0, sinon_1.stub)();
                addChoiceStub = (0, sinon_1.stub)();
                containerOuterRemoveLoadingStateStub = (0, sinon_1.stub)();
                instance.clearChoices = clearChoicesStub;
                instance._addGroup = addGroupStub;
                instance._addChoice = addChoiceStub;
                instance.containerOuter.removeLoadingState =
                    containerOuterRemoveLoadingStateStub;
            });
            afterEach(function () {
                instance.clearChoices.reset();
                instance._addGroup.reset();
                instance._addChoice.reset();
                instance.containerOuter.removeLoadingState.reset();
            });
            describe('when element is not select element', function () {
                beforeEach(function () {
                    instance._isSelectElement = false;
                });
                it('throws', function () {
                    (0, chai_1.expect)(function () {
                        return instance.setChoices(choices, value, label, false);
                    }).to.throw(TypeError, /input/i);
                });
            });
            describe('passing invalid arguments', function () {
                describe('passing no value', function () {
                    beforeEach(function () {
                        instance._isSelectElement = true;
                    });
                    it('throws', function () {
                        (0, chai_1.expect)(function () {
                            return instance.setChoices(choices, null, 'label', false);
                        }).to.throw(TypeError, /value/i);
                    });
                });
            });
            describe('passing valid arguments', function () {
                beforeEach(function () {
                    instance._isSelectElement = true;
                });
                it('removes loading state', function () {
                    instance.setChoices(choices, value, label, false);
                    (0, chai_1.expect)(containerOuterRemoveLoadingStateStub.called).to.equal(true);
                });
                describe('passing choices with children choices', function () {
                    it('adds groups', function () {
                        instance.setChoices(groups, value, label, false);
                        (0, chai_1.expect)(addGroupStub.callCount).to.equal(1);
                        (0, chai_1.expect)(addGroupStub.firstCall.args[0]).to.eql({
                            group: groups[0],
                            id: groups[0].id,
                            valueKey: value,
                            labelKey: label,
                        });
                    });
                });
                describe('passing choices without children choices', function () {
                    it('adds passed choices', function () {
                        instance.setChoices(choices, value, label, false);
                        (0, chai_1.expect)(addChoiceStub.callCount).to.equal(2);
                        addChoiceStub.getCalls().forEach(function (call, index) {
                            (0, chai_1.expect)(call.args[0]).to.eql({
                                value: choices[index][value],
                                label: choices[index][label],
                                isSelected: !!choices[index].selected,
                                isDisabled: !!choices[index].disabled,
                                customProperties: choices[index].customProperties,
                                placeholder: !!choices[index].placeholder,
                            });
                        });
                    });
                });
                describe('passing an empty array with a true replaceChoices flag', function () {
                    it('choices are cleared', function () {
                        instance._isSelectElement = true;
                        instance.setChoices([], value, label, true);
                        (0, chai_1.expect)(clearChoicesStub.called).to.equal(true);
                    });
                });
                describe('passing an empty array with a false replaceChoices flag', function () {
                    it('choices stay the same', function () {
                        instance._isSelectElement = true;
                        instance.setChoices([], value, label, false);
                        (0, chai_1.expect)(clearChoicesStub.called).to.equal(false);
                    });
                });
                describe('passing true replaceChoices flag', function () {
                    it('choices are cleared', function () {
                        instance.setChoices(choices, value, label, true);
                        (0, chai_1.expect)(clearChoicesStub.called).to.equal(true);
                    });
                });
                describe('passing false replaceChoices flag', function () {
                    it('choices are not cleared', function () {
                        instance.setChoices(choices, value, label, false);
                        (0, chai_1.expect)(clearChoicesStub.called).to.equal(false);
                    });
                });
            });
        });
    });
    describe('events', function () {
        describe('search', function () {
            var choices = [
                {
                    id: 1,
                    value: '1',
                    label: 'Test 1',
                    selected: false,
                    disabled: false,
                },
                {
                    id: 2,
                    value: '2',
                    label: 'Test 2',
                    selected: false,
                    disabled: false,
                },
            ];
            beforeEach(function () {
                document.body.innerHTML = "\n        <select data-choice multiple></select>\n        ";
                instance = new choices_1.default('[data-choice]', {
                    choices: choices,
                    allowHTML: false,
                    searchEnabled: true,
                });
            });
            it('details are passed', function (done) {
                var query = 'This is a <search> query & a "test" with characters that should not be sanitised.';
                instance.input.value = query;
                instance.input.focus();
                instance.passedElement.element.addEventListener('search', function (event) {
                    (0, chai_1.expect)(event.detail).to.eql({
                        value: query,
                        resultCount: 0,
                    });
                    done();
                }, { once: true });
                instance._onKeyUp({ target: null, keyCode: null });
            });
            it('uses Fuse options', function (done) {
                instance.input.value = 'test';
                instance.input.focus();
                instance.passedElement.element.addEventListener('search', function (event) {
                    (0, chai_1.expect)(event.detail.resultCount).to.eql(2);
                    instance.config.fuseOptions.isCaseSensitive = true;
                    instance.config.fuseOptions.minMatchCharLength = 4;
                    instance.passedElement.element.addEventListener('search', function (eventCaseSensitive) {
                        (0, chai_1.expect)(eventCaseSensitive.detail.resultCount).to.eql(0);
                        done();
                    }, { once: true });
                    instance._onKeyUp({ target: null, keyCode: null });
                }, { once: true });
                instance._onKeyUp({ target: null, keyCode: null });
            });
            it('is fired with a searchFloor of 0', function (done) {
                instance.config.searchFloor = 0;
                instance.input.value = '';
                instance.input.focus();
                instance.passedElement.element.addEventListener('search', function (event) {
                    (0, chai_1.expect)(event.detail).to.eql({
                        value: instance.input.value,
                        resultCount: 0,
                    });
                    done();
                });
                instance._onKeyUp({ target: null, keyCode: null });
            });
        });
    });
    describe('private methods', function () {
        describe('_createGroupsFragment', function () {
            var _createChoicesFragmentStub;
            var choices = [
                {
                    id: 1,
                    selected: true,
                    groupId: 1,
                    value: 'Choice 1',
                    label: 'Choice 1',
                },
                {
                    id: 2,
                    selected: false,
                    groupId: 2,
                    value: 'Choice 2',
                    label: 'Choice 2',
                },
                {
                    id: 3,
                    selected: false,
                    groupId: 1,
                    value: 'Choice 3',
                    label: 'Choice 3',
                },
            ];
            var groups = [
                {
                    id: 2,
                    value: 'Group 2',
                    active: true,
                    disabled: false,
                },
                {
                    id: 1,
                    value: 'Group 1',
                    active: true,
                    disabled: false,
                },
            ];
            beforeEach(function () {
                _createChoicesFragmentStub = (0, sinon_1.stub)();
                instance._createChoicesFragment = _createChoicesFragmentStub;
            });
            afterEach(function () {
                instance._createChoicesFragment.reset();
            });
            describe('returning a fragment of groups', function () {
                describe('passing fragment argument', function () {
                    it('updates fragment with groups', function () {
                        var fragment = document.createDocumentFragment();
                        var childElement = document.createElement('div');
                        fragment.appendChild(childElement);
                        output = instance._createGroupsFragment(groups, choices, fragment);
                        var elementToWrapFragment = document.createElement('div');
                        elementToWrapFragment.appendChild(output);
                        (0, chai_1.expect)(output).to.be.instanceOf(DocumentFragment);
                        (0, chai_1.expect)(elementToWrapFragment.children[0]).to.eql(childElement);
                        (0, chai_1.expect)(elementToWrapFragment.querySelectorAll('[data-group]').length).to.equal(2);
                    });
                });
                describe('not passing fragment argument', function () {
                    it('returns new groups fragment', function () {
                        output = instance._createGroupsFragment(groups, choices);
                        var elementToWrapFragment = document.createElement('div');
                        elementToWrapFragment.appendChild(output);
                        (0, chai_1.expect)(output).to.be.instanceOf(DocumentFragment);
                        (0, chai_1.expect)(elementToWrapFragment.querySelectorAll('[data-group]').length).to.equal(2);
                    });
                });
                describe('sorting groups', function () {
                    var sortFnStub;
                    beforeEach(function () {
                        sortFnStub = (0, sinon_1.stub)();
                        instance.config.sorter = sortFnStub;
                        instance.config.shouldSort = true;
                    });
                    afterEach(function () {
                        instance.config.sorter.reset();
                    });
                    it('sorts groups by config.sorter', function () {
                        (0, chai_1.expect)(sortFnStub.called).to.equal(false);
                        instance._createGroupsFragment(groups, choices);
                        (0, chai_1.expect)(sortFnStub.called).to.equal(true);
                    });
                });
                describe('not sorting groups', function () {
                    var sortFnStub;
                    beforeEach(function () {
                        sortFnStub = (0, sinon_1.stub)();
                        instance.config.sorter = sortFnStub;
                        instance.config.shouldSort = false;
                    });
                    afterEach(function () {
                        instance.config.sorter.reset();
                    });
                    it('does not sort groups', function () {
                        instance._createGroupsFragment(groups, choices);
                        (0, chai_1.expect)(sortFnStub.called).to.equal(false);
                    });
                });
                describe('select-one element', function () {
                    beforeEach(function () {
                        instance._isSelectOneElement = true;
                    });
                    it('calls _createChoicesFragment with choices that belong to each group', function () {
                        (0, chai_1.expect)(_createChoicesFragmentStub.called).to.equal(false);
                        instance._createGroupsFragment(groups, choices);
                        (0, chai_1.expect)(_createChoicesFragmentStub.called).to.equal(true);
                        (0, chai_1.expect)(_createChoicesFragmentStub.firstCall.args[0]).to.eql([
                            {
                                id: 1,
                                selected: true,
                                groupId: 1,
                                value: 'Choice 1',
                                label: 'Choice 1',
                            },
                            {
                                id: 3,
                                selected: false,
                                groupId: 1,
                                value: 'Choice 3',
                                label: 'Choice 3',
                            },
                        ]);
                        (0, chai_1.expect)(_createChoicesFragmentStub.secondCall.args[0]).to.eql([
                            {
                                id: 2,
                                selected: false,
                                groupId: 2,
                                value: 'Choice 2',
                                label: 'Choice 2',
                            },
                        ]);
                    });
                });
                describe('text/select-multiple element', function () {
                    describe('renderSelectedChoices set to "always"', function () {
                        beforeEach(function () {
                            instance._isSelectOneElement = false;
                            instance.config.renderSelectedChoices = 'always';
                        });
                        it('calls _createChoicesFragment with choices that belong to each group', function () {
                            (0, chai_1.expect)(_createChoicesFragmentStub.called).to.equal(false);
                            instance._createGroupsFragment(groups, choices);
                            (0, chai_1.expect)(_createChoicesFragmentStub.called).to.equal(true);
                            (0, chai_1.expect)(_createChoicesFragmentStub.firstCall.args[0]).to.eql([
                                {
                                    id: 1,
                                    selected: true,
                                    groupId: 1,
                                    value: 'Choice 1',
                                    label: 'Choice 1',
                                },
                                {
                                    id: 3,
                                    selected: false,
                                    groupId: 1,
                                    value: 'Choice 3',
                                    label: 'Choice 3',
                                },
                            ]);
                            (0, chai_1.expect)(_createChoicesFragmentStub.secondCall.args[0]).to.eql([
                                {
                                    id: 2,
                                    selected: false,
                                    groupId: 2,
                                    value: 'Choice 2',
                                    label: 'Choice 2',
                                },
                            ]);
                        });
                    });
                    describe('renderSelectedChoices not set to "always"', function () {
                        beforeEach(function () {
                            instance._isSelectOneElement = false;
                            instance.config.renderSelectedChoices = false;
                        });
                        it('calls _createChoicesFragment with choices that belong to each group that are not already selected', function () {
                            (0, chai_1.expect)(_createChoicesFragmentStub.called).to.equal(false);
                            instance._createGroupsFragment(groups, choices);
                            (0, chai_1.expect)(_createChoicesFragmentStub.called).to.equal(true);
                            (0, chai_1.expect)(_createChoicesFragmentStub.firstCall.args[0]).to.eql([
                                {
                                    id: 3,
                                    selected: false,
                                    groupId: 1,
                                    value: 'Choice 3',
                                    label: 'Choice 3',
                                },
                            ]);
                            (0, chai_1.expect)(_createChoicesFragmentStub.secondCall.args[0]).to.eql([
                                {
                                    id: 2,
                                    selected: false,
                                    groupId: 2,
                                    value: 'Choice 2',
                                    label: 'Choice 2',
                                },
                            ]);
                        });
                    });
                });
            });
        });
        describe('_generatePlaceholderValue', function () {
            describe('select element', function () {
                describe('when a placeholder option is defined', function () {
                    it('returns the text value of the placeholder option', function () {
                        var placeholderValue = 'I am a placeholder';
                        instance._isSelectElement = true;
                        instance.passedElement.placeholderOption = {
                            text: placeholderValue,
                        };
                        var value = instance._generatePlaceholderValue();
                        (0, chai_1.expect)(value).to.equal(placeholderValue);
                    });
                });
                describe('when a placeholder option is not defined', function () {
                    it('returns null', function () {
                        instance._isSelectElement = true;
                        instance.passedElement.placeholderOption = undefined;
                        var value = instance._generatePlaceholderValue();
                        (0, chai_1.expect)(value).to.equal(null);
                    });
                });
            });
            describe('text input', function () {
                describe('when the placeholder config option is set to true', function () {
                    describe('when the placeholderValue config option is defined', function () {
                        it('returns placeholderValue', function () {
                            var placeholderValue = 'I am a placeholder';
                            instance._isSelectElement = false;
                            instance.config.placeholder = true;
                            instance.config.placeholderValue = placeholderValue;
                            var value = instance._generatePlaceholderValue();
                            (0, chai_1.expect)(value).to.equal(placeholderValue);
                        });
                    });
                    describe('when the placeholderValue config option is not defined', function () {
                        describe('when the placeholder attribute is defined on the passed element', function () {
                            it('returns the value of the placeholder attribute', function () {
                                var placeholderValue = 'I am a placeholder';
                                instance._isSelectElement = false;
                                instance.config.placeholder = true;
                                instance.config.placeholderValue = undefined;
                                instance.passedElement.element = {
                                    dataset: {
                                        placeholder: placeholderValue,
                                    },
                                };
                                var value = instance._generatePlaceholderValue();
                                (0, chai_1.expect)(value).to.equal(placeholderValue);
                            });
                        });
                        describe('when the placeholder attribute is not defined on the passed element', function () {
                            it('returns null', function () {
                                instance._isSelectElement = false;
                                instance.config.placeholder = true;
                                instance.config.placeholderValue = undefined;
                                instance.passedElement.element = {
                                    dataset: {
                                        placeholder: undefined,
                                    },
                                };
                                var value = instance._generatePlaceholderValue();
                                (0, chai_1.expect)(value).to.equal(null);
                            });
                        });
                    });
                });
                describe('when the placeholder config option is set to false', function () {
                    it('returns null', function () {
                        instance._isSelectElement = false;
                        instance.config.placeholder = false;
                        var value = instance._generatePlaceholderValue();
                        (0, chai_1.expect)(value).to.equal(null);
                    });
                });
            });
        });
        describe('_getTemplate', function () {
            describe('when passing a template key', function () {
                it('returns the generated template for the given template key', function () {
                    var _a;
                    var templateKey = 'test';
                    var element = document.createElement('div');
                    var customArg = { test: true };
                    instance._templates = (_a = {},
                        _a[templateKey] = (0, sinon_1.stub)().returns(element),
                        _a);
                    output = instance._getTemplate(templateKey, customArg);
                    (0, chai_1.expect)(output).to.deep.equal(element);
                    (0, chai_1.expect)(instance._templates[templateKey]).to.have.been.calledOnceWith(instance.config, customArg);
                });
            });
        });
        describe('_onKeyDown', function () {
            var activeItems;
            var hasItems;
            var hasActiveDropdown;
            var hasFocussedInput;
            beforeEach(function () {
                instance.showDropdown = (0, sinon_1.stub)();
                instance._onSelectKey = (0, sinon_1.stub)();
                instance._onEnterKey = (0, sinon_1.stub)();
                instance._onEscapeKey = (0, sinon_1.stub)();
                instance._onDirectionKey = (0, sinon_1.stub)();
                instance._onDeleteKey = (0, sinon_1.stub)();
                (activeItems = instance._store.activeItems);
                hasItems = instance.itemList.hasChildren();
                hasActiveDropdown = instance.dropdown.isActive;
                hasFocussedInput = instance.input.isFocussed;
            });
            describe('direction key', function () {
                var keyCodes = [
                    constants_1.KEY_CODES.UP_KEY,
                    constants_1.KEY_CODES.DOWN_KEY,
                    constants_1.KEY_CODES.PAGE_UP_KEY,
                    constants_1.KEY_CODES.PAGE_DOWN_KEY,
                ];
                keyCodes.forEach(function (keyCode) {
                    it("calls _onDirectionKey with the expected arguments", function () {
                        var event = {
                            keyCode: keyCode,
                        };
                        instance._onKeyDown(event);
                        (0, chai_1.expect)(instance._onDirectionKey).to.have.been.calledWith(event, hasActiveDropdown);
                    });
                });
            });
            describe('select key', function () {
                it("calls _onSelectKey with the expected arguments", function () {
                    var event = {
                        keyCode: constants_1.KEY_CODES.A_KEY,
                    };
                    instance._onKeyDown(event);
                    (0, chai_1.expect)(instance._onSelectKey).to.have.been.calledWith(event, hasItems);
                });
            });
            describe('enter key', function () {
                it("calls _onEnterKey with the expected arguments", function () {
                    var event = {
                        keyCode: constants_1.KEY_CODES.ENTER_KEY,
                    };
                    instance._onKeyDown(event);
                    (0, chai_1.expect)(instance._onEnterKey).to.have.been.calledWith(event, activeItems, hasActiveDropdown);
                });
            });
            describe('delete key', function () {
                var keyCodes = [constants_1.KEY_CODES.DELETE_KEY, constants_1.KEY_CODES.BACK_KEY];
                keyCodes.forEach(function (keyCode) {
                    it("calls _onDeleteKey with the expected arguments", function () {
                        var event = {
                            keyCode: keyCode,
                        };
                        instance._onKeyDown(event);
                        (0, chai_1.expect)(instance._onDeleteKey).to.have.been.calledWith(event, activeItems, hasFocussedInput);
                    });
                });
            });
        });
        describe('_removeItem', function () {
            beforeEach(function () {
                instance._store.dispatch = (0, sinon_1.stub)();
            });
            afterEach(function () {
                instance._store.dispatch.reset();
            });
            describe('when given an item to remove', function () {
                var item = {
                    id: 1111,
                    value: 'test value',
                    label: 'test label',
                    choiceId: 2222,
                    groupId: 3333,
                    customProperties: {},
                };
                it('dispatches a REMOVE_ITEM action to the store', function () {
                    instance._removeItem(item);
                    (0, chai_1.expect)(instance._store.dispatch).to.have.been.calledWith((0, items_1.removeItem)(item.id, item.choiceId));
                });
                it('triggers a REMOVE_ITEM event on the passed element', function (done) {
                    passedElement.addEventListener('removeItem', function (event) {
                        (0, chai_1.expect)(event.detail).to.eql({
                            id: item.id,
                            value: item.value,
                            label: item.label,
                            customProperties: item.customProperties,
                            groupValue: null,
                        });
                        done();
                    }, false);
                    instance._removeItem(item);
                });
                describe('when the item belongs to a group', function () {
                    var group = {
                        id: 1,
                        value: 'testing',
                    };
                    var itemWithGroup = __assign(__assign({}, item), { groupId: group.id });
                    beforeEach(function () {
                        instance._store.getGroupById = (0, sinon_1.stub)();
                        instance._store.getGroupById.returns(group);
                    });
                    afterEach(function () {
                        instance._store.getGroupById.reset();
                    });
                    it("includes the group's value in the triggered event", function (done) {
                        passedElement.addEventListener('removeItem', function (event) {
                            (0, chai_1.expect)(event.detail).to.eql({
                                id: itemWithGroup.id,
                                value: itemWithGroup.value,
                                label: itemWithGroup.label,
                                customProperties: itemWithGroup.customProperties,
                                groupValue: group.value,
                            });
                            done();
                        }, false);
                        instance._removeItem(itemWithGroup);
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=choices.test.js.map