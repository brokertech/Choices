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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var templates_1 = __importDefault(require("./templates"));
var utils_1 = require("./lib/utils");
var defaults_1 = require("./defaults");
/**
 * @param {HTMLElement} element1
 * @param {HTMLElement} element2
 */
function expectEqualElements(element1, element2) {
    (0, chai_1.expect)(element1.tagName).to.equal(element2.tagName);
    (0, chai_1.expect)(element1.attributes.length).to.equal(element2.attributes.length);
    (0, chai_1.expect)(Object.keys(element1.dataset)).to.have.members(Object.keys(element2.dataset));
    (0, chai_1.expect)(element1.classList).to.include(element2.classList);
    // compare attributes values
    for (var _i = 0, _a = Object.values(element1.attributes); _i < _a.length; _i++) {
        var attribute = _a[_i];
        (0, chai_1.expect)(element1.getAttribute(attribute)).to.equal(element2.getAttribute(attribute));
    }
}
function createOptionsWithPartialClasses(classNames, options) {
    if (options === void 0) { options = {}; }
    return __assign(__assign(__assign({}, defaults_1.DEFAULT_CONFIG), options), { classNames: __assign(__assign({}, defaults_1.DEFAULT_CLASSNAMES), classNames) });
}
describe('templates', function () {
    describe('containerOuter', function () {
        var options = createOptionsWithPartialClasses({
            containerOuter: 'class-1',
        });
        var direction = 'rtl';
        describe('select element', function () {
            describe('search enabled', function () {
                it('returns expected html', function () {
                    var isSelectElement = true;
                    var isSelectOneElement = false;
                    var searchEnabled = true;
                    var passedElementType = 'select-multiple';
                    var labelId = '';
                    var expectedOutput = (0, utils_1.strToEl)("\n            <div\n              class=\"".concat(options.classNames.containerOuter, "\"\n              data-type=\"").concat(passedElementType, "\"\n              role=\"combobox\"\n              aria-autocomplete=\"list\"\n              aria-haspopup=\"true\"\n              aria-expanded=\"false\"\n              dir=\"").concat(direction, "\"\n              >\n            </div>\n          "));
                    var actualOutput = templates_1.default.containerOuter(options, direction, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId);
                    expectEqualElements(actualOutput, expectedOutput);
                });
            });
            describe('with label id for a11y', function () {
                it('returns expected html', function () {
                    var isSelectElement = true;
                    var isSelectOneElement = true;
                    var searchEnabled = false;
                    var passedElementType = 'select-one';
                    var labelId = 'testLabelId';
                    var expectedOutput = (0, utils_1.strToEl)("\n            <div\n              class=\"".concat(options.classNames.containerOuter, "\"\n              data-type=\"").concat(passedElementType, "\"\n              role=\"listbox\"\n              tabindex=\"0\"\n              aria-haspopup=\"true\"\n              aria-expanded=\"false\"\n              aria-labelledby=\"").concat(labelId, "\"\n              dir=\"").concat(direction, "\"\n              >\n            </div>\n          "));
                    var actualOutput = templates_1.default.containerOuter(options, direction, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId);
                    expectEqualElements(actualOutput, expectedOutput);
                });
            });
            describe('search disabled', function () {
                it('returns expected html', function () {
                    var isSelectElement = true;
                    var isSelectOneElement = false;
                    var searchEnabled = false;
                    var passedElementType = 'select-multiple';
                    var labelId = '';
                    var expectedOutput = (0, utils_1.strToEl)("\n            <div\n              class=\"".concat(options.classNames.containerOuter, "\"\n              data-type=\"").concat(passedElementType, "\"\n              role=\"listbox\"\n              aria-haspopup=\"true\"\n              aria-expanded=\"false\"\n              dir=\"").concat(direction, "\"\n              >\n            </div>\n          "));
                    var actualOutput = templates_1.default.containerOuter(options, direction, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId);
                    expectEqualElements(actualOutput, expectedOutput);
                });
            });
            describe('select one element', function () {
                it('returns expected html', function () {
                    var isSelectElement = true;
                    var isSelectOneElement = true;
                    var searchEnabled = false;
                    var passedElementType = 'select-one';
                    var labelId = '';
                    var expectedOutput = (0, utils_1.strToEl)("\n            <div\n              class=\"".concat(options.classNames.containerOuter, "\"\n              data-type=\"").concat(passedElementType, "\"\n              role=\"listbox\"\n              tabindex=\"0\"\n              aria-haspopup=\"true\"\n              aria-expanded=\"false\"\n              dir=\"").concat(direction, "\"\n              >\n            </div>\n          "));
                    var actualOutput = templates_1.default.containerOuter(options, direction, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId);
                    expectEqualElements(actualOutput, expectedOutput);
                });
            });
        });
        describe('non select element', function () {
            it('returns expected html', function () {
                var isSelectElement = false;
                var isSelectOneElement = false;
                var searchEnabled = false;
                var passedElementType = 'text';
                var labelId = '';
                var expectedOutput = (0, utils_1.strToEl)("\n          <div\n            class=\"".concat(options.classNames.containerOuter, "\"\n            data-type=\"").concat(passedElementType, "\"\n            aria-haspopup=\"true\"\n            aria-expanded=\"false\"\n            dir=\"").concat(direction, "\"\n            >\n          </div>\n        "));
                var actualOutput = templates_1.default.containerOuter(options, direction, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
    });
    describe('containerInner', function () {
        it('returns expected html', function () {
            var innerOptions = createOptionsWithPartialClasses({
                containerInner: 'class-1',
            });
            var expectedOutput = (0, utils_1.strToEl)("<div class=\"".concat(innerOptions.classNames.containerInner, "\"></div>"));
            var actualOutput = templates_1.default.containerInner(innerOptions);
            expectEqualElements(actualOutput, expectedOutput);
        });
    });
    describe('itemList', function () {
        var itemOptions = createOptionsWithPartialClasses({
            list: 'class-1',
            listSingle: 'class-2',
            listItems: 'class-3',
        });
        describe('select one element', function () {
            it('returns expected html', function () {
                var expectedOutput = (0, utils_1.strToEl)("<div class=\"".concat(itemOptions.classNames.list, " ").concat(itemOptions.classNames.listSingle, "\"></div>"));
                var actualOutput = templates_1.default.itemList(itemOptions, true);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
        describe('non select one element', function () {
            it('returns expected html', function () {
                var expectedOutput = (0, utils_1.strToEl)("<div class=\"".concat(itemOptions.classNames.list, " ").concat(itemOptions.classNames.listItems, "\"></div>"));
                var actualOutput = templates_1.default.itemList(itemOptions, false);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
    });
    describe('placeholder', function () {
        it('returns expected html', function () {
            var placeholderOptions = createOptionsWithPartialClasses({
                placeholder: 'class-1',
            });
            var value = 'test';
            var expectedOutput = (0, utils_1.strToEl)("\n        <div class=\"".concat(placeholderOptions.classNames.placeholder, "\">").concat(value, "</div>"));
            var actualOutput = templates_1.default.placeholder(placeholderOptions, value);
            expectEqualElements(actualOutput, expectedOutput);
        });
    });
    describe('choiceList', function () {
        var choiceListOptions = createOptionsWithPartialClasses({
            list: 'class-1',
        });
        describe('select one element', function () {
            it('returns expected html', function () {
                var expectedOutput = (0, utils_1.strToEl)("\n          <div\n            class=\"".concat(choiceListOptions.classNames.list, "\"\n            role=\"listbox\"\n            >\n          </div>\n        "));
                var actualOutput = templates_1.default.choiceList(choiceListOptions, true);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
        describe('non select one element', function () {
            it('returns expected html', function () {
                var expectedOutput = (0, utils_1.strToEl)("\n          <div\n            class=\"".concat(choiceListOptions.classNames.list, "\"\n            role=\"listbox\"\n            aria-multiselectable=\"true\"\n            >\n          </div>\n        "));
                var actualOutput = templates_1.default.choiceList(choiceListOptions, false);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
    });
    describe('choiceGroup', function () {
        var groupOptions = createOptionsWithPartialClasses({
            group: 'class-1',
            groupHeading: 'class-2',
            itemDisabled: 'class-3',
        });
        var data;
        beforeEach(function () {
            data = {
                id: 1,
                value: 'test',
                disabled: false,
            };
        });
        describe('enabled state', function () {
            it('returns expected html', function () {
                var expectedOutput = (0, utils_1.strToEl)("\n          <div\n          class=\"".concat(groupOptions.classNames.group, "\"\n            data-group\n            data-id=\"").concat(data.id, "\"\n            data-value=\"").concat(data.value, "\"\n            role=\"group\"\n            >\n            <div class=\"").concat(groupOptions.classNames.groupHeading, "\">").concat(data.value, "</div>\n          </div>\n        "));
                var actualOutput = templates_1.default.choiceGroup(groupOptions, data);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
        describe('disabled state', function () {
            beforeEach(function () {
                data = __assign(__assign({}, data), { disabled: true });
            });
            it('returns expected html', function () {
                var expectedOutput = (0, utils_1.strToEl)("\n          <div\n            class=\"".concat(groupOptions.classNames.group, " ").concat(groupOptions.classNames.itemDisabled, "\"\n            data-group\n            data-id=\"").concat(data.id, "\"\n            data-value=\"").concat(data.value, "\"\n            role=\"group\"\n            aria-disabled=\"true\"\n            >\n            <div class=\"").concat(groupOptions.classNames.groupHeading, "\">").concat(data.value, "</div>\n          </div>\n        "));
                var actualOutput = templates_1.default.choiceGroup(groupOptions, data);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
    });
    describe('choice', function () {
        var choiceOptions = createOptionsWithPartialClasses({
            item: 'class-1',
            itemChoice: 'class-2',
            itemDisabled: 'class-3',
            itemSelectable: 'class-4',
            placeholder: 'class-5',
            selectedState: 'class-6',
        });
        var itemSelectText = 'test 6';
        var data;
        beforeEach(function () {
            data = {
                id: 1,
                groupId: -1,
                disabled: false,
                elementId: 'test',
                label: 'test',
                value: 'test',
                selected: false,
            };
        });
        describe('enabled state', function () {
            it('returns expected html', function () {
                var expectedOutput = (0, utils_1.strToEl)("\n          <div\n            class=\"".concat(choiceOptions.classNames.item, " ").concat(choiceOptions.classNames.itemChoice, " ").concat(choiceOptions.classNames.itemSelectable, "\"\n            data-select-text=\"").concat(itemSelectText, "\"\n            data-choice\n            data-id=\"").concat(data.id, "\"\n            data-value=\"").concat(data.value, "\"\n            data-choice-selectable\n            id=\"").concat(data.elementId, "\"\n            role=\"option\"\n            >\n            ").concat(data.label, "\n          </div>\n        "));
                var actualOutput = templates_1.default.choice(choiceOptions, data, itemSelectText);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
        describe('disabled state', function () {
            beforeEach(function () {
                data = __assign(__assign({}, data), { disabled: true });
            });
            it('returns expected html', function () {
                var expectedOutput = (0, utils_1.strToEl)("\n          <div\n            class=\"".concat(choiceOptions.classNames.item, " ").concat(choiceOptions.classNames.itemChoice, " ").concat(choiceOptions.classNames.itemDisabled, "\"\n            data-select-text=\"").concat(itemSelectText, "\"\n            data-choice\n            data-id=\"").concat(data.id, "\"\n            data-value=\"").concat(data.value, "\"\n            data-choice-disabled\n            aria-disabled=\"true\"\n            id=\"").concat(data.elementId, "\"\n            role=\"option\"\n            >\n            ").concat(data.label, "\n          </div>\n        "));
                var actualOutput = templates_1.default.choice(choiceOptions, data, itemSelectText);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
        describe('selected state', function () {
            beforeEach(function () {
                data = __assign(__assign({}, data), { selected: true });
            });
            it('returns expected html', function () {
                var expectedOutput = (0, utils_1.strToEl)("\n          <div\n            class=\"".concat(choiceOptions.classNames.item, " ").concat(choiceOptions.classNames.itemChoice, " ").concat(choiceOptions.classNames.selectedState, " ").concat(choiceOptions.classNames.itemSelectable, "\"\n            data-select-text=\"").concat(itemSelectText, "\"\n            data-choice\n            data-id=\"").concat(data.id, "\"\n            data-value=\"").concat(data.value, "\"\n            data-choice-selectable\n            id=\"").concat(data.elementId, "\"\n            role=\"option\"\n            >\n            ").concat(data.label, "\n          </div>\n        "));
                var actualOutput = templates_1.default.choice(choiceOptions, data, itemSelectText);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
        describe('placeholder', function () {
            beforeEach(function () {
                data = __assign(__assign({}, data), { placeholder: true });
            });
            it('returns expected html', function () {
                var expectedOutput = (0, utils_1.strToEl)("\n          <div\n            class=\"".concat(choiceOptions.classNames.item, " ").concat(choiceOptions.classNames.itemChoice, " ").concat(choiceOptions.classNames.placeholder, " ").concat(choiceOptions.classNames.itemSelectable, "\"\n            data-select-text=\"").concat(itemSelectText, "\"\n            data-choice\n            data-id=\"").concat(data.id, "\"\n            data-value=\"").concat(data.value, "\"\n            data-choice-selectable\n            id=\"").concat(data.elementId, "\"\n            role=\"option\"\n            >\n            ").concat(data.label, "\n          </div>\n        "));
                var actualOutput = templates_1.default.choice(choiceOptions, data, itemSelectText);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
        describe('child of group', function () {
            beforeEach(function () {
                data = __assign(__assign({}, data), { groupId: 1 });
            });
            it('returns expected html', function () {
                var expectedOutput = (0, utils_1.strToEl)("\n          <div\n            class=\"".concat(choiceOptions.classNames.item, " ").concat(choiceOptions.classNames.itemChoice, " ").concat(choiceOptions.classNames.itemSelectable, "\"\n            data-select-text=\"").concat(itemSelectText, "\"\n            data-choice\n            data-id=\"").concat(data.id, "\"\n            data-value=\"").concat(data.value, "\"\n            data-choice-selectable\n            id=\"").concat(data.elementId, "\"\n            role=\"treeitem\"\n            >\n            ").concat(data.label, "\n          </div>\n        "));
                var actualOutput = templates_1.default.choice(choiceOptions, data, itemSelectText);
                expectEqualElements(actualOutput, expectedOutput);
            });
        });
    });
    describe('input', function () {
        var inputOptions = createOptionsWithPartialClasses({
            input: 'class-1',
            inputCloned: 'class-2',
        });
        it('returns expected html', function () {
            /*
              Following attributes are not supported by JSDOM, so, can't compare
                autocapitalize="off"
                spellcheck="false"
            */
            var expectedOutput = (0, utils_1.strToEl)("\n        <input\n          type=\"search\"\n          name=\"search_terms\"\n          class=\"".concat(inputOptions.classNames.input, " ").concat(inputOptions.classNames.inputCloned, "\"\n          autocomplete=\"off\"\n          role=\"textbox\"\n          aria-autocomplete=\"list\"\n          aria-label=\"test placeholder\"\n        >\n      "));
            var actualOutput = templates_1.default.input(inputOptions, 'test placeholder');
            expectEqualElements(actualOutput, expectedOutput);
        });
    });
    describe('dropdown', function () {
        var dropdownOptions = createOptionsWithPartialClasses({
            list: 'class-1',
            listDropdown: 'class-2',
        });
        it('returns expected html', function () {
            var expectedOutput = (0, utils_1.strToEl)("<div class=\"".concat(dropdownOptions.classNames.list, " ").concat(dropdownOptions.classNames.listDropdown, "\" aria-expanded=\"false\"></div>"));
            var actualOutput = templates_1.default.dropdown(dropdownOptions);
            expectEqualElements(actualOutput, expectedOutput);
        });
    });
    describe('notice', function () {
        var noticeOptions = createOptionsWithPartialClasses({
            item: 'class-1',
            itemChoice: 'class-2',
            noResults: 'class-3',
            noChoices: 'class-4',
        });
        var label = 'test';
        it('returns expected html', function () {
            var expectedOutput = (0, utils_1.strToEl)("\n        <div class=\"".concat(noticeOptions.classNames.item, " ").concat(noticeOptions.classNames.itemChoice, "\">\n          ").concat(label, "\n        </div>\n      "));
            var actualOutput = templates_1.default.notice(noticeOptions, label);
            expectEqualElements(actualOutput, expectedOutput);
        });
        describe('passing a notice type', function () {
            describe('no results', function () {
                it('adds no results classname', function () {
                    var expectedOutput = (0, utils_1.strToEl)("\n            <div class=\"".concat(noticeOptions.classNames.item, " ").concat(noticeOptions.classNames.itemChoice, " ").concat(noticeOptions.classNames.noResults, "\">\n              ").concat(label, "\n            </div>\n          "));
                    var actualOutput = templates_1.default.notice(noticeOptions, label, 'no-results');
                    expectEqualElements(actualOutput, expectedOutput);
                });
            });
            describe('no choices', function () {
                it('adds no choices classname', function () {
                    var expectedOutput = (0, utils_1.strToEl)("\n            <div class=\"".concat(noticeOptions.classNames.item, " ").concat(noticeOptions.classNames.itemChoice, " ").concat(noticeOptions.classNames.noChoices, "\">\n              ").concat(label, "\n            </div>\n          "));
                    var actualOutput = templates_1.default.notice(noticeOptions, label, 'no-choices');
                    expectEqualElements(actualOutput, expectedOutput);
                });
            });
        });
    });
    describe('option', function () {
        var data;
        beforeEach(function () {
            data = {
                disabled: false,
                selected: false,
                value: 'test value',
                label: 'test label',
            };
        });
        it('returns expected html', function () {
            var expectedOutput = (0, utils_1.strToEl)("<option value=\"".concat(data.value, "\" ").concat(data.selected ? 'selected' : '', " ").concat(data.disabled ? 'disabled' : '', ">").concat(data.label, "</option>"));
            var actualOutput = templates_1.default.option(data);
            expectEqualElements(actualOutput, expectedOutput);
        });
        describe('when selected', function () {
            beforeEach(function () {
                data = __assign(__assign({}, data), { active: true });
            });
            it('sets selected attr to true', function () {
                var output = templates_1.default.option(data);
                (0, chai_1.expect)(output.selected).to.equal(true);
            });
        });
        describe('when disabled', function () {
            beforeEach(function () {
                data = __assign(__assign({}, data), { disabled: true });
            });
            it('sets disabled attr to true', function () {
                var output = templates_1.default.option(data);
                (0, chai_1.expect)(output.disabled).to.equal(true);
            });
        });
    });
});
//# sourceMappingURL=templates.test.js.map