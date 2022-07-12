"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var constants_1 = require("./constants");
var defaults_1 = require("./defaults");
describe('constants', function () {
    describe('type checks', function () {
        describe('DEFAULT_CLASSNAMES', function () {
            it('exports as an object with expected keys', function () {
                (0, chai_1.expect)(defaults_1.DEFAULT_CLASSNAMES).to.be.an('object');
                (0, chai_1.expect)(Object.keys(defaults_1.DEFAULT_CLASSNAMES)).to.eql([
                    'containerOuter',
                    'containerInner',
                    'input',
                    'inputCloned',
                    'list',
                    'listItems',
                    'listSingle',
                    'listDropdown',
                    'item',
                    'itemSelectable',
                    'itemDisabled',
                    'itemChoice',
                    'placeholder',
                    'group',
                    'groupHeading',
                    'button',
                    'activeState',
                    'focusState',
                    'openState',
                    'disabledState',
                    'highlightedState',
                    'selectedState',
                    'flippedState',
                    'loadingState',
                    'noResults',
                    'noChoices',
                ]);
            });
        });
        describe('DEFAULT_CONFIG', function () {
            it('exports as an object', function () {
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG).to.be.an('object');
            });
            it('has expected config options', function () {
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.items).to.be.an('array');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.choices).to.be.an('array');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.silent).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.renderChoiceLimit).to.be.a('number');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.maxItemCount).to.be.a('number');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.addItems).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.addItemFilter).to.equal(null);
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.removeItems).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.removeItemButton).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.editItems).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.allowHTML).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.duplicateItemsAllowed).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.delimiter).to.be.a('string');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.paste).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.searchEnabled).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.searchChoices).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.searchFloor).to.be.a('number');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.searchResultLimit).to.be.a('number');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.searchFields).to.be.an('array');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.position).to.be.a('string');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.shouldSort).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.shouldSortItems).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.placeholder).to.be.a('boolean');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.placeholderValue).to.equal(null);
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.searchPlaceholderValue).to.equal(null);
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.prependValue).to.equal(null);
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.appendValue).to.equal(null);
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.renderSelectedChoices).to.be.a('string');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.loadingText).to.be.a('string');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.noResultsText).to.be.a('string');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.noChoicesText).to.be.a('string');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.itemSelectText).to.be.a('string');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.uniqueItemText).to.be.a('string');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.customAddItemText).to.be.a('string');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.addItemText).to.be.a('function');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.maxItemText).to.be.a('function');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.fuseOptions).to.be.an('object');
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.callbackOnInit).to.equal(null);
                (0, chai_1.expect)(defaults_1.DEFAULT_CONFIG.callbackOnCreateTemplates).to.equal(null);
            });
        });
        describe('EVENTS', function () {
            it('exports as an object with expected keys', function () {
                (0, chai_1.expect)(constants_1.EVENTS).to.be.an('object');
                (0, chai_1.expect)(Object.keys(constants_1.EVENTS)).to.eql([
                    'showDropdown',
                    'hideDropdown',
                    'change',
                    'choice',
                    'search',
                    'addItem',
                    'removeItem',
                    'highlightItem',
                    'highlightChoice',
                    'unhighlightItem',
                ]);
            });
        });
        describe('ACTION_TYPES', function () {
            it('exports as an object with expected keys', function () {
                (0, chai_1.expect)(constants_1.ACTION_TYPES).to.be.an('object');
                (0, chai_1.expect)(Object.keys(constants_1.ACTION_TYPES)).to.eql([
                    'ADD_CHOICE',
                    'FILTER_CHOICES',
                    'ACTIVATE_CHOICES',
                    'CLEAR_CHOICES',
                    'ADD_GROUP',
                    'ADD_ITEM',
                    'REMOVE_ITEM',
                    'HIGHLIGHT_ITEM',
                    'CLEAR_ALL',
                    'RESET_TO',
                    'SET_IS_LOADING',
                ]);
            });
        });
        describe('KEY_CODES', function () {
            it('exports as an object with expected keys', function () {
                (0, chai_1.expect)(constants_1.KEY_CODES).to.be.an('object');
                (0, chai_1.expect)(Object.keys(constants_1.KEY_CODES)).to.eql([
                    'BACK_KEY',
                    'DELETE_KEY',
                    'ENTER_KEY',
                    'A_KEY',
                    'ESC_KEY',
                    'UP_KEY',
                    'DOWN_KEY',
                    'PAGE_UP_KEY',
                    'PAGE_DOWN_KEY',
                ]);
            });
            it('exports each value as a number', function () {
                Object.keys(constants_1.KEY_CODES).forEach(function (key) {
                    (0, chai_1.expect)(constants_1.KEY_CODES[key]).to.be.a('number');
                });
            });
        });
        describe('SCROLLING_SPEED', function () {
            it('exports as an number', function () {
                (0, chai_1.expect)(constants_1.SCROLLING_SPEED).to.be.a('number');
            });
        });
    });
});
//# sourceMappingURL=constants.test.js.map