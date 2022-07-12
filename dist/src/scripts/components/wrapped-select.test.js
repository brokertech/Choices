"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = require("sinon");
var wrapped_element_1 = __importDefault(require("./wrapped-element"));
var wrapped_select_1 = __importDefault(require("./wrapped-select"));
var templates_1 = __importDefault(require("../templates"));
var defaults_1 = require("../defaults");
describe('components/wrappedSelect', function () {
    var instance;
    var element;
    beforeEach(function () {
        element = document.createElement('select');
        element.id = 'target';
        for (var i = 0; i <= 4; i++) {
            var option = document.createElement('option');
            if (i === 0) {
                option.value = '';
                option.innerHTML = 'Placeholder label';
            }
            else {
                option.value = "Value ".concat(i);
                option.innerHTML = "Label ".concat(i);
            }
            if (i === 1) {
                option.setAttribute('placeholder', '');
            }
            element.appendChild(option);
        }
        document.body.appendChild(element);
        instance = new wrapped_select_1.default({
            element: document.getElementById('target'),
            classNames: defaults_1.DEFAULT_CLASSNAMES,
            template: (0, sinon_1.spy)(templates_1.default.option),
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
            beforeEach(function () {
                (0, sinon_1.stub)(wrapped_element_1.default.prototype, method);
            });
            afterEach(function () {
                wrapped_element_1.default.prototype[method].restore();
            });
            describe(method, function () {
                it("calls super.".concat(method), function () {
                    (0, chai_1.expect)(wrapped_element_1.default.prototype[method].called).to.equal(false);
                    instance[method]();
                    (0, chai_1.expect)(wrapped_element_1.default.prototype[method].called).to.equal(true);
                });
            });
        });
    });
    describe('placeholderOption getter', function () {
        it('returns option element with empty value attribute', function () {
            (0, chai_1.expect)(instance.placeholderOption).to.be.instanceOf(HTMLOptionElement);
            (0, chai_1.expect)(instance.placeholderOption.value).to.equal('');
        });
        it('returns option element with placeholder attribute as fallback', function () {
            instance.element.removeChild(instance.element.firstChild);
            (0, chai_1.expect)(instance.placeholderOption).to.be.instanceOf(HTMLOptionElement);
            (0, chai_1.expect)(instance.placeholderOption.value).to.equal('Value 1');
        });
    });
    describe('options getter', function () {
        it('returns all option elements', function () {
            var options = instance.options;
            (0, chai_1.expect)(options).to.be.an('array');
            options.forEach(function (option) {
                (0, chai_1.expect)(option).to.be.instanceOf(HTMLOptionElement);
            });
        });
    });
    describe('optionGroups getter', function () {
        it('returns an array of all option groups', function () {
            for (var i = 1; i <= 3; i++) {
                var group = document.createElement('optgroup');
                instance.element.appendChild(group);
            }
            var optionGroups = instance.optionGroups;
            (0, chai_1.expect)(optionGroups.length).to.equal(3);
            optionGroups.forEach(function (option) {
                (0, chai_1.expect)(option).to.be.instanceOf(HTMLOptGroupElement);
            });
        });
    });
    describe('options setter', function () {
        var appendDocFragmentStub;
        var options = [
            {
                value: '1',
                label: 'Test 1',
                selected: false,
                disabled: true,
            },
            {
                value: '2',
                label: 'Test 2',
                selected: true,
                disabled: false,
            },
        ];
        beforeEach(function () {
            appendDocFragmentStub = (0, sinon_1.stub)();
            instance.appendDocFragment = appendDocFragmentStub;
        });
        afterEach(function () {
            instance.appendDocFragment.reset();
        });
        it('creates an option element for each passed object, adds it to a fragment and calls appendDocFragment with created fragment', function () {
            (0, chai_1.expect)(appendDocFragmentStub.called).to.equal(false);
            instance.options = options;
            (0, chai_1.expect)(appendDocFragmentStub.called).to.equal(true);
            var fragment = appendDocFragmentStub.firstCall.args[0];
            var selectElement = document.createElement('select');
            selectElement.appendChild(fragment);
            (0, chai_1.expect)(fragment).to.be.instanceOf(DocumentFragment);
            (0, chai_1.expect)(instance.template.callCount).to.equal(2);
            (0, chai_1.expect)(selectElement.options.length).to.equal(2);
            (0, chai_1.expect)(selectElement.options[0].value).to.equal(options[0].value);
            (0, chai_1.expect)(selectElement.options[1].value).to.equal(options[1].value);
        });
    });
    describe('appendDocFragment', function () {
        it('empties contents of element', function () {
            (0, chai_1.expect)(instance.element.getElementsByTagName('option').length).to.equal(5);
            instance.appendDocFragment(document.createDocumentFragment());
            (0, chai_1.expect)(instance.element.getElementsByTagName('option').length).to.equal(0);
        });
        it('appends passed fragment to element', function () {
            var fragment = document.createDocumentFragment();
            var elementToAppend = document.createElement('div');
            elementToAppend.id = 'fragment-target';
            fragment.appendChild(elementToAppend);
            (0, chai_1.expect)(instance.element.querySelector('#fragment-target')).to.equal(null);
            instance.appendDocFragment(fragment);
            (0, chai_1.expect)(instance.element.querySelector('#fragment-target')).to.eql(elementToAppend);
        });
    });
});
//# sourceMappingURL=wrapped-select.test.js.map