"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var deepmerge_1 = __importDefault(require("deepmerge"));
/* eslint-disable @typescript-eslint/no-explicit-any */
var fuse_1 = __importDefault(require("fuse.js/dist/fuse"));
var choices_1 = require("./actions/choices");
var groups_1 = require("./actions/groups");
var items_1 = require("./actions/items");
var misc_1 = require("./actions/misc");
var components_1 = require("./components");
var constants_1 = require("./constants");
var defaults_1 = require("./defaults");
var utils_1 = require("./lib/utils");
var reducers_1 = require("./reducers");
var store_1 = __importDefault(require("./store/store"));
var templates_1 = __importDefault(require("./templates"));
/** @see {@link http://browserhacks.com/#hack-acea075d0ac6954f275a70023906050c} */
var IS_IE11 = '-ms-scroll-limit' in document.documentElement.style &&
    '-ms-ime-align' in document.documentElement.style;
var USER_DEFAULTS = {};
/**
 * Choices
 * @author Josh Johnson<josh@joshuajohnson.co.uk>
 */
var Choices = /** @class */ (function () {
    function Choices(element, userConfig) {
        var _this = this;
        if (element === void 0) { element = '[data-choice]'; }
        if (userConfig === void 0) { userConfig = {}; }
        if (userConfig.allowHTML === undefined) {
            console.warn('Deprecation warning: allowHTML will default to false in a future release. To render HTML in Choices, you will need to set it to true. Setting allowHTML will suppress this message.');
        }
        this.config = deepmerge_1.default.all([defaults_1.DEFAULT_CONFIG, Choices.defaults.options, userConfig], 
        // When merging array configs, replace with a copy of the userConfig array,
        // instead of concatenating with the default array
        { arrayMerge: function (_, sourceArray) { return __spreadArray([], sourceArray, true); } });
        var invalidConfigOptions = (0, utils_1.diff)(this.config, defaults_1.DEFAULT_CONFIG);
        if (invalidConfigOptions.length) {
            console.warn('Unknown config option(s) passed', invalidConfigOptions.join(', '));
        }
        var passedElement = typeof element === 'string' ? document.querySelector(element) : element;
        if (!(passedElement instanceof HTMLInputElement ||
            passedElement instanceof HTMLSelectElement)) {
            throw TypeError('Expected one of the following types text|select-one|select-multiple');
        }
        this._isTextElement = passedElement.type === constants_1.TEXT_TYPE;
        this._isSelectOneElement = passedElement.type === constants_1.SELECT_ONE_TYPE;
        this._isSelectMultipleElement = passedElement.type === constants_1.SELECT_MULTIPLE_TYPE;
        this._isSelectElement =
            this._isSelectOneElement || this._isSelectMultipleElement;
        this.config.searchEnabled =
            this._isSelectMultipleElement || this.config.searchEnabled;
        if (!['auto', 'always'].includes("".concat(this.config.renderSelectedChoices))) {
            this.config.renderSelectedChoices = 'auto';
        }
        if (userConfig.addItemFilter &&
            typeof userConfig.addItemFilter !== 'function') {
            var re = userConfig.addItemFilter instanceof RegExp
                ? userConfig.addItemFilter
                : new RegExp(userConfig.addItemFilter);
            this.config.addItemFilter = re.test.bind(re);
        }
        if (this._isTextElement) {
            this.passedElement = new components_1.WrappedInput({
                element: passedElement,
                classNames: this.config.classNames,
                delimiter: this.config.delimiter,
            });
        }
        else {
            this.passedElement = new components_1.WrappedSelect({
                element: passedElement,
                classNames: this.config.classNames,
                template: function (data) {
                    return _this._templates.option(data);
                },
            });
        }
        this.initialised = false;
        this._store = new store_1.default();
        this._initialState = reducers_1.defaultState;
        this._currentState = reducers_1.defaultState;
        this._prevState = reducers_1.defaultState;
        this._currentValue = '';
        this._canSearch = !!this.config.searchEnabled;
        this._isScrollingOnIe = false;
        this._highlightPosition = 0;
        this._wasTap = true;
        this._placeholderValue = this._generatePlaceholderValue();
        this._baseId = (0, utils_1.generateId)(this.passedElement.element, 'choices-');
        /**
         * setting direction in cases where it's explicitly set on passedElement
         * or when calculated direction is different from the document
         */
        this._direction = this.passedElement.dir;
        if (!this._direction) {
            var elementDirection = window.getComputedStyle(this.passedElement.element).direction;
            var documentDirection = window.getComputedStyle(document.documentElement).direction;
            if (elementDirection !== documentDirection) {
                this._direction = elementDirection;
            }
        }
        this._idNames = {
            itemChoice: 'item-choice',
        };
        if (this._isSelectElement) {
            // Assign preset groups from passed element
            this._presetGroups = this.passedElement.optionGroups;
            // Assign preset options from passed element
            this._presetOptions = this.passedElement.options;
        }
        // Assign preset choices from passed object
        this._presetChoices = this.config.choices;
        // Assign preset items from passed object first
        this._presetItems = this.config.items;
        // Add any values passed from attribute
        if (this.passedElement.value && this._isTextElement) {
            var splitValues = this.passedElement.value.split(this.config.delimiter);
            this._presetItems = this._presetItems.concat(splitValues);
        }
        // Create array of choices from option elements
        if (this.passedElement.options) {
            this.passedElement.options.forEach(function (option) {
                _this._presetChoices.push({
                    value: option.value,
                    label: option.innerHTML,
                    selected: !!option.selected,
                    disabled: option.disabled || option.parentNode.disabled,
                    placeholder: option.value === '' || option.hasAttribute('placeholder'),
                    customProperties: option.dataset['custom-properties'],
                });
            });
        }
        this._render = this._render.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseOver = this._onMouseOver.bind(this);
        this._onFormReset = this._onFormReset.bind(this);
        this._onSelectKey = this._onSelectKey.bind(this);
        this._onEnterKey = this._onEnterKey.bind(this);
        this._onEscapeKey = this._onEscapeKey.bind(this);
        this._onDirectionKey = this._onDirectionKey.bind(this);
        this._onDeleteKey = this._onDeleteKey.bind(this);
        // If element has already been initialised with Choices, fail silently
        if (this.passedElement.isActive) {
            if (!this.config.silent) {
                console.warn('Trying to initialise Choices on element already initialised', { element: element });
            }
            this.initialised = true;
            return;
        }
        // Let's go
        this.init();
    }
    Object.defineProperty(Choices, "defaults", {
        get: function () {
            return Object.preventExtensions({
                get options() {
                    return USER_DEFAULTS;
                },
                get templates() {
                    return templates_1.default;
                },
            });
        },
        enumerable: false,
        configurable: true
    });
    Choices.prototype.init = function () {
        if (this.initialised) {
            return;
        }
        this._createTemplates();
        this._createElements();
        this._createStructure();
        this._store.subscribe(this._render);
        this._render();
        this._addEventListeners();
        var shouldDisable = !this.config.addItems ||
            this.passedElement.element.hasAttribute('disabled');
        if (shouldDisable) {
            this.disable();
        }
        this.initialised = true;
        var callbackOnInit = this.config.callbackOnInit;
        // Run callback if it is a function
        if (callbackOnInit && typeof callbackOnInit === 'function') {
            callbackOnInit.call(this);
        }
    };
    Choices.prototype.destroy = function () {
        if (!this.initialised) {
            return;
        }
        this._removeEventListeners();
        this.passedElement.reveal();
        this.containerOuter.unwrap(this.passedElement.element);
        this.clearStore();
        if (this._isSelectElement) {
            this.passedElement.options = this._presetOptions;
        }
        this._templates = templates_1.default;
        this.initialised = false;
    };
    Choices.prototype.enable = function () {
        if (this.passedElement.isDisabled) {
            this.passedElement.enable();
        }
        if (this.containerOuter.isDisabled) {
            this._addEventListeners();
            this.input.enable();
            this.containerOuter.enable();
        }
        return this;
    };
    Choices.prototype.disable = function () {
        if (!this.passedElement.isDisabled) {
            this.passedElement.disable();
        }
        if (!this.containerOuter.isDisabled) {
            this._removeEventListeners();
            this.input.disable();
            this.containerOuter.disable();
        }
        return this;
    };
    Choices.prototype.highlightItem = function (item, runEvent) {
        if (runEvent === void 0) { runEvent = true; }
        if (!item || !item.id) {
            return this;
        }
        var id = item.id, _a = item.groupId, groupId = _a === void 0 ? -1 : _a, _b = item.value, value = _b === void 0 ? '' : _b, _c = item.label, label = _c === void 0 ? '' : _c;
        var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
        this._store.dispatch((0, items_1.highlightItem)(id, true));
        if (runEvent) {
            this.passedElement.triggerEvent(constants_1.EVENTS.highlightItem, {
                id: id,
                value: value,
                label: label,
                groupValue: group && group.value ? group.value : null,
            });
        }
        return this;
    };
    Choices.prototype.unhighlightItem = function (item) {
        if (!item || !item.id) {
            return this;
        }
        var id = item.id, _a = item.groupId, groupId = _a === void 0 ? -1 : _a, _b = item.value, value = _b === void 0 ? '' : _b, _c = item.label, label = _c === void 0 ? '' : _c;
        var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
        this._store.dispatch((0, items_1.highlightItem)(id, false));
        this.passedElement.triggerEvent(constants_1.EVENTS.highlightItem, {
            id: id,
            value: value,
            label: label,
            groupValue: group && group.value ? group.value : null,
        });
        return this;
    };
    Choices.prototype.highlightAll = function () {
        var _this = this;
        this._store.items.forEach(function (item) { return _this.highlightItem(item); });
        return this;
    };
    Choices.prototype.unhighlightAll = function () {
        var _this = this;
        this._store.items.forEach(function (item) { return _this.unhighlightItem(item); });
        return this;
    };
    Choices.prototype.removeActiveItemsByValue = function (value) {
        var _this = this;
        this._store.activeItems
            .filter(function (item) { return item.value === value; })
            .forEach(function (item) { return _this._removeItem(item); });
        return this;
    };
    Choices.prototype.removeActiveItems = function (excludedId) {
        var _this = this;
        this._store.activeItems
            .filter(function (_a) {
            var id = _a.id;
            return id !== excludedId;
        })
            .forEach(function (item) { return _this._removeItem(item); });
        return this;
    };
    Choices.prototype.removeHighlightedItems = function (runEvent) {
        var _this = this;
        if (runEvent === void 0) { runEvent = false; }
        this._store.highlightedActiveItems.forEach(function (item) {
            _this._removeItem(item);
            // If this action was performed by the user
            // trigger the event
            if (runEvent) {
                _this._triggerChange(item.value);
            }
        });
        return this;
    };
    Choices.prototype.showDropdown = function (preventInputFocus) {
        var _this = this;
        if (this.dropdown.isActive) {
            return this;
        }
        requestAnimationFrame(function () {
            _this.dropdown.show();
            _this.containerOuter.open(_this.dropdown.distanceFromTopWindow);
            if (!preventInputFocus && _this._canSearch) {
                _this.input.focus();
            }
            _this.passedElement.triggerEvent(constants_1.EVENTS.showDropdown, {});
        });
        return this;
    };
    Choices.prototype.hideDropdown = function (preventInputBlur) {
        var _this = this;
        if (!this.dropdown.isActive) {
            return this;
        }
        requestAnimationFrame(function () {
            _this.dropdown.hide();
            _this.containerOuter.close();
            if (!preventInputBlur && _this._canSearch) {
                _this.input.removeActiveDescendant();
                _this.input.blur();
            }
            _this.passedElement.triggerEvent(constants_1.EVENTS.hideDropdown, {});
        });
        return this;
    };
    Choices.prototype.getValue = function (valueOnly) {
        if (valueOnly === void 0) { valueOnly = false; }
        var values = this._store.activeItems.reduce(function (selectedItems, item) {
            var itemValue = valueOnly ? item.value : item;
            selectedItems.push(itemValue);
            return selectedItems;
        }, []);
        return this._isSelectOneElement ? values[0] : values;
    };
    Choices.prototype.setValue = function (items) {
        var _this = this;
        if (!this.initialised) {
            return this;
        }
        items.forEach(function (value) { return _this._setChoiceOrItem(value); });
        return this;
    };
    Choices.prototype.setChoiceByValue = function (value) {
        var _this = this;
        if (!this.initialised || this._isTextElement) {
            return this;
        }
        // If only one value has been passed, convert to array
        var choiceValue = Array.isArray(value) ? value : [value];
        // Loop through each value and
        choiceValue.forEach(function (val) { return _this._findAndSelectChoiceByValue(val); });
        return this;
    };
    /**
     * Set choices of select input via an array of objects (or function that returns array of object or promise of it),
     * a value field name and a label field name.
     * This behaves the same as passing items via the choices option but can be called after initialising Choices.
     * This can also be used to add groups of choices (see example 2); Optionally pass a true `replaceChoices` value to remove any existing choices.
     * Optionally pass a `customProperties` object to add additional data to your choices (useful when searching/filtering etc).
     *
     * **Input types affected:** select-one, select-multiple
     *
     * @example
     * ```js
     * const example = new Choices(element);
     *
     * example.setChoices([
     *   {value: 'One', label: 'Label One', disabled: true},
     *   {value: 'Two', label: 'Label Two', selected: true},
     *   {value: 'Three', label: 'Label Three'},
     * ], 'value', 'label', false);
     * ```
     *
     * @example
     * ```js
     * const example = new Choices(element);
     *
     * example.setChoices(async () => {
     *   try {
     *      const items = await fetch('/items');
     *      return items.json()
     *   } catch(err) {
     *      console.error(err)
     *   }
     * });
     * ```
     *
     * @example
     * ```js
     * const example = new Choices(element);
     *
     * example.setChoices([{
     *   label: 'Group one',
     *   id: 1,
     *   disabled: false,
     *   choices: [
     *     {value: 'Child One', label: 'Child One', selected: true},
     *     {value: 'Child Two', label: 'Child Two',  disabled: true},
     *     {value: 'Child Three', label: 'Child Three'},
     *   ]
     * },
     * {
     *   label: 'Group two',
     *   id: 2,
     *   disabled: false,
     *   choices: [
     *     {value: 'Child Four', label: 'Child Four', disabled: true},
     *     {value: 'Child Five', label: 'Child Five'},
     *     {value: 'Child Six', label: 'Child Six', customProperties: {
     *       description: 'Custom description about child six',
     *       random: 'Another random custom property'
     *     }},
     *   ]
     * }], 'value', 'label', false);
     * ```
     */
    Choices.prototype.setChoices = function (choicesArrayOrFetcher, value, label, replaceChoices) {
        var _this = this;
        if (choicesArrayOrFetcher === void 0) { choicesArrayOrFetcher = []; }
        if (value === void 0) { value = 'value'; }
        if (label === void 0) { label = 'label'; }
        if (replaceChoices === void 0) { replaceChoices = false; }
        if (!this.initialised) {
            throw new ReferenceError("setChoices was called on a non-initialized instance of Choices");
        }
        if (!this._isSelectElement) {
            throw new TypeError("setChoices can't be used with INPUT based Choices");
        }
        if (typeof value !== 'string' || !value) {
            throw new TypeError("value parameter must be a name of 'value' field in passed objects");
        }
        // Clear choices if needed
        if (replaceChoices) {
            this.clearChoices();
        }
        if (typeof choicesArrayOrFetcher === 'function') {
            // it's a choices fetcher function
            var fetcher_1 = choicesArrayOrFetcher(this);
            if (typeof Promise === 'function' && fetcher_1 instanceof Promise) {
                // that's a promise
                // eslint-disable-next-line no-promise-executor-return
                return new Promise(function (resolve) { return requestAnimationFrame(resolve); })
                    .then(function () { return _this._handleLoadingState(true); })
                    .then(function () { return fetcher_1; })
                    .then(function (data) {
                    return _this.setChoices(data, value, label, replaceChoices);
                })
                    .catch(function (err) {
                    if (!_this.config.silent) {
                        console.error(err);
                    }
                })
                    .then(function () { return _this._handleLoadingState(false); })
                    .then(function () { return _this; });
            }
            // function returned something else than promise, let's check if it's an array of choices
            if (!Array.isArray(fetcher_1)) {
                throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: ".concat(typeof fetcher_1));
            }
            // recursion with results, it's sync and choices were cleared already
            return this.setChoices(fetcher_1, value, label, false);
        }
        if (!Array.isArray(choicesArrayOrFetcher)) {
            throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
        }
        this.containerOuter.removeLoadingState();
        this._startLoading();
        choicesArrayOrFetcher.forEach(function (groupOrChoice) {
            if (groupOrChoice.choices) {
                _this._addGroup({
                    id: groupOrChoice.id ? parseInt("".concat(groupOrChoice.id), 10) : null,
                    group: groupOrChoice,
                    valueKey: value,
                    labelKey: label,
                });
            }
            else {
                var choice = groupOrChoice;
                _this._addChoice({
                    value: choice[value],
                    label: choice[label],
                    isSelected: !!choice.selected,
                    isDisabled: !!choice.disabled,
                    placeholder: !!choice.placeholder,
                    customProperties: choice.customProperties,
                });
            }
        });
        this._stopLoading();
        return this;
    };
    Choices.prototype.clearChoices = function () {
        this._store.dispatch((0, choices_1.clearChoices)());
        return this;
    };
    Choices.prototype.clearStore = function () {
        this._store.dispatch((0, misc_1.clearAll)());
        return this;
    };
    Choices.prototype.clearInput = function () {
        var shouldSetInputWidth = !this._isSelectOneElement;
        this.input.clear(shouldSetInputWidth);
        if (!this._isTextElement && this._canSearch) {
            this._isSearching = false;
            this._store.dispatch((0, choices_1.activateChoices)(true));
        }
        return this;
    };
    Choices.prototype._render = function () {
        if (this._store.isLoading()) {
            return;
        }
        this._currentState = this._store.state;
        var stateChanged = this._currentState.choices !== this._prevState.choices ||
            this._currentState.groups !== this._prevState.groups ||
            this._currentState.items !== this._prevState.items;
        var shouldRenderChoices = this._isSelectElement;
        var shouldRenderItems = this._currentState.items !== this._prevState.items;
        if (!stateChanged) {
            return;
        }
        if (shouldRenderChoices) {
            this._renderChoices();
        }
        if (shouldRenderItems) {
            this._renderItems();
        }
        this._prevState = this._currentState;
    };
    Choices.prototype._renderChoices = function () {
        var _this = this;
        var _a = this._store, activeGroups = _a.activeGroups, activeChoices = _a.activeChoices;
        var choiceListFragment = document.createDocumentFragment();
        this.choiceList.clear();
        if (this.config.resetScrollPosition) {
            requestAnimationFrame(function () { return _this.choiceList.scrollToTop(); });
        }
        // If we have grouped options
        if (activeGroups.length >= 1 && !this._isSearching) {
            // If we have a placeholder choice along with groups
            var activePlaceholders = activeChoices.filter(function (activeChoice) {
                return activeChoice.placeholder === true && activeChoice.groupId === -1;
            });
            if (activePlaceholders.length >= 1) {
                choiceListFragment = this._createChoicesFragment(activePlaceholders, choiceListFragment);
            }
            choiceListFragment = this._createGroupsFragment(activeGroups, activeChoices, choiceListFragment);
        }
        else if (activeChoices.length >= 1) {
            choiceListFragment = this._createChoicesFragment(activeChoices, choiceListFragment);
        }
        // If we have choices to show
        if (choiceListFragment.childNodes &&
            choiceListFragment.childNodes.length > 0) {
            var activeItems = this._store.activeItems;
            var canAddItem = this._canAddItem(activeItems, this.input.value);
            // ...and we can select them
            if (canAddItem.response) {
                // ...append them and highlight the first choice
                this.choiceList.append(choiceListFragment);
                this._highlightChoice();
            }
            else {
                var notice = this._getTemplate('notice', canAddItem.notice);
                this.choiceList.append(notice);
            }
        }
        else {
            // Otherwise show a notice
            var dropdownItem = void 0;
            var notice = void 0;
            if (this._isSearching) {
                notice =
                    typeof this.config.noResultsText === 'function'
                        ? this.config.noResultsText()
                        : this.config.noResultsText;
                dropdownItem = this._getTemplate('notice', notice, 'no-results');
            }
            else {
                notice =
                    typeof this.config.noChoicesText === 'function'
                        ? this.config.noChoicesText()
                        : this.config.noChoicesText;
                dropdownItem = this._getTemplate('notice', notice, 'no-choices');
            }
            this.choiceList.append(dropdownItem);
        }
    };
    Choices.prototype._renderItems = function () {
        var activeItems = this._store.activeItems || [];
        this.itemList.clear();
        // Create a fragment to store our list items
        // (so we don't have to update the DOM for each item)
        var itemListFragment = this._createItemsFragment(activeItems);
        // If we have items to add, append them
        if (itemListFragment.childNodes) {
            this.itemList.append(itemListFragment);
        }
    };
    Choices.prototype._createGroupsFragment = function (groups, choices, fragment) {
        var _this = this;
        if (fragment === void 0) { fragment = document.createDocumentFragment(); }
        var getGroupChoices = function (group) {
            return choices.filter(function (choice) {
                if (_this._isSelectOneElement) {
                    return choice.groupId === group.id;
                }
                return (choice.groupId === group.id &&
                    (_this.config.renderSelectedChoices === 'always' || !choice.selected));
            });
        };
        // If sorting is enabled, filter groups
        if (this.config.shouldSort) {
            groups.sort(this.config.sorter);
        }
        groups.forEach(function (group) {
            var groupChoices = getGroupChoices(group);
            if (groupChoices.length >= 1) {
                var dropdownGroup = _this._getTemplate('choiceGroup', group);
                fragment.appendChild(dropdownGroup);
                _this._createChoicesFragment(groupChoices, fragment, true);
            }
        });
        return fragment;
    };
    Choices.prototype._createChoicesFragment = function (choices, fragment, withinGroup) {
        var _this = this;
        if (fragment === void 0) { fragment = document.createDocumentFragment(); }
        if (withinGroup === void 0) { withinGroup = false; }
        // Create a fragment to store our list items (so we don't have to update the DOM for each item)
        var _a = this.config, renderSelectedChoices = _a.renderSelectedChoices, searchResultLimit = _a.searchResultLimit, renderChoiceLimit = _a.renderChoiceLimit;
        var filter = this._isSearching ? utils_1.sortByScore : this.config.sorter;
        var appendChoice = function (choice) {
            var shouldRender = renderSelectedChoices === 'auto'
                ? _this._isSelectOneElement || !choice.selected
                : true;
            if (shouldRender) {
                var dropdownItem = _this._getTemplate('choice', choice, _this.config.itemSelectText);
                fragment.appendChild(dropdownItem);
            }
        };
        var rendererableChoices = choices;
        if (renderSelectedChoices === 'auto' && !this._isSelectOneElement) {
            rendererableChoices = choices.filter(function (choice) { return !choice.selected; });
        }
        // Split array into placeholders and "normal" choices
        var _b = rendererableChoices.reduce(function (acc, choice) {
            if (choice.placeholder) {
                acc.placeholderChoices.push(choice);
            }
            else {
                acc.normalChoices.push(choice);
            }
            return acc;
        }, {
            placeholderChoices: [],
            normalChoices: [],
        }), placeholderChoices = _b.placeholderChoices, normalChoices = _b.normalChoices;
        // If sorting is enabled or the user is searching, filter choices
        if (this.config.shouldSort || this._isSearching) {
            normalChoices.sort(filter);
        }
        var choiceLimit = rendererableChoices.length;
        // Prepend placeholeder
        var sortedChoices = this._isSelectOneElement
            ? __spreadArray(__spreadArray([], placeholderChoices, true), normalChoices, true) : normalChoices;
        if (this._isSearching) {
            choiceLimit = searchResultLimit;
        }
        else if (renderChoiceLimit && renderChoiceLimit > 0 && !withinGroup) {
            choiceLimit = renderChoiceLimit;
        }
        // Add each choice to dropdown within range
        for (var i = 0; i < choiceLimit; i += 1) {
            if (sortedChoices[i]) {
                appendChoice(sortedChoices[i]);
            }
        }
        return fragment;
    };
    Choices.prototype._createItemsFragment = function (items, fragment) {
        var _this = this;
        if (fragment === void 0) { fragment = document.createDocumentFragment(); }
        // Create fragment to add elements to
        var _a = this.config, shouldSortItems = _a.shouldSortItems, sorter = _a.sorter, removeItemButton = _a.removeItemButton;
        // If sorting is enabled, filter items
        if (shouldSortItems && !this._isSelectOneElement) {
            items.sort(sorter);
        }
        if (this._isTextElement) {
            // Update the value of the hidden input
            this.passedElement.value = items
                .map(function (_a) {
                var value = _a.value;
                return value;
            })
                .join(this.config.delimiter);
        }
        else {
            // Update the options of the hidden input
            this.passedElement.options = items;
        }
        var addItemToFragment = function (item) {
            // Create new list element
            var listItem = _this._getTemplate('item', item, removeItemButton);
            // Append it to list
            fragment.appendChild(listItem);
        };
        // Add each list item to list
        items.forEach(addItemToFragment);
        return fragment;
    };
    Choices.prototype._triggerChange = function (value) {
        if (value === undefined || value === null) {
            return;
        }
        this.passedElement.triggerEvent(constants_1.EVENTS.change, {
            value: value,
        });
    };
    Choices.prototype._selectPlaceholderChoice = function (placeholderChoice) {
        this._addItem({
            value: placeholderChoice.value,
            label: placeholderChoice.label,
            choiceId: placeholderChoice.id,
            groupId: placeholderChoice.groupId,
            placeholder: placeholderChoice.placeholder,
        });
        this._triggerChange(placeholderChoice.value);
    };
    Choices.prototype._handleButtonAction = function (activeItems, element) {
        if (!activeItems ||
            !element ||
            !this.config.removeItems ||
            !this.config.removeItemButton) {
            return;
        }
        var itemId = element.parentNode && element.parentNode.dataset.id;
        var itemToRemove = itemId && activeItems.find(function (item) { return item.id === parseInt(itemId, 10); });
        if (!itemToRemove) {
            return;
        }
        // Remove item associated with button
        this._removeItem(itemToRemove);
        this._triggerChange(itemToRemove.value);
        if (this._isSelectOneElement && this._store.placeholderChoice) {
            this._selectPlaceholderChoice(this._store.placeholderChoice);
        }
    };
    Choices.prototype._handleItemAction = function (activeItems, element, hasShiftKey) {
        var _this = this;
        if (hasShiftKey === void 0) { hasShiftKey = false; }
        if (!activeItems ||
            !element ||
            !this.config.removeItems ||
            this._isSelectOneElement) {
            return;
        }
        var passedId = element.dataset.id;
        // We only want to select one item with a click
        // so we deselect any items that aren't the target
        // unless shift is being pressed
        activeItems.forEach(function (item) {
            if (item.id === parseInt("".concat(passedId), 10) && !item.highlighted) {
                _this.highlightItem(item);
            }
            else if (!hasShiftKey && item.highlighted) {
                _this.unhighlightItem(item);
            }
        });
        // Focus input as without focus, a user cannot do anything with a
        // highlighted item
        this.input.focus();
    };
    Choices.prototype._handleChoiceAction = function (activeItems, element) {
        if (!activeItems || !element) {
            return;
        }
        // If we are clicking on an option
        var id = element.dataset.id;
        var choice = id && this._store.getChoiceById(id);
        if (!choice) {
            return;
        }
        var passedKeyCode = activeItems[0] && activeItems[0].keyCode
            ? activeItems[0].keyCode
            : undefined;
        var hasActiveDropdown = this.dropdown.isActive;
        // Update choice keyCode
        choice.keyCode = passedKeyCode;
        this.passedElement.triggerEvent(constants_1.EVENTS.choice, {
            choice: choice,
        });
        if (!choice.selected && !choice.disabled) {
            var canAddItem = this._canAddItem(activeItems, choice.value);
            if (canAddItem.response) {
                this._addItem({
                    value: choice.value,
                    label: choice.label,
                    choiceId: choice.id,
                    groupId: choice.groupId,
                    customProperties: choice.customProperties,
                    placeholder: choice.placeholder,
                    keyCode: choice.keyCode,
                });
                this._triggerChange(choice.value);
            }
        }
        this.clearInput();
        // We want to close the dropdown if we are dealing with a single select box
        if (hasActiveDropdown && this._isSelectOneElement) {
            this.hideDropdown(true);
            this.containerOuter.focus();
        }
    };
    Choices.prototype._handleBackspace = function (activeItems) {
        if (!this.config.removeItems || !activeItems) {
            return;
        }
        var lastItem = activeItems[activeItems.length - 1];
        var hasHighlightedItems = activeItems.some(function (item) { return item.highlighted; });
        // If editing the last item is allowed and there are not other selected items,
        // we can edit the item value. Otherwise if we can remove items, remove all selected items
        if (this.config.editItems && !hasHighlightedItems && lastItem) {
            this.input.value = lastItem.value;
            this.input.setWidth();
            this._removeItem(lastItem);
            this._triggerChange(lastItem.value);
        }
        else {
            if (!hasHighlightedItems) {
                // Highlight last item if none already highlighted
                this.highlightItem(lastItem, false);
            }
            this.removeHighlightedItems(true);
        }
    };
    Choices.prototype._startLoading = function () {
        this._store.dispatch((0, misc_1.setIsLoading)(true));
    };
    Choices.prototype._stopLoading = function () {
        this._store.dispatch((0, misc_1.setIsLoading)(false));
    };
    Choices.prototype._handleLoadingState = function (setLoading) {
        if (setLoading === void 0) { setLoading = true; }
        var placeholderItem = this.itemList.getChild(".".concat(this.config.classNames.placeholder));
        if (setLoading) {
            this.disable();
            this.containerOuter.addLoadingState();
            if (this._isSelectOneElement) {
                if (!placeholderItem) {
                    placeholderItem = this._getTemplate('placeholder', this.config.loadingText);
                    if (placeholderItem) {
                        this.itemList.append(placeholderItem);
                    }
                }
                else {
                    placeholderItem.innerHTML = this.config.loadingText;
                }
            }
            else {
                this.input.placeholder = this.config.loadingText;
            }
        }
        else {
            this.enable();
            this.containerOuter.removeLoadingState();
            if (this._isSelectOneElement) {
                if (placeholderItem) {
                    placeholderItem.innerHTML = this._placeholderValue || '';
                }
            }
            else {
                this.input.placeholder = this._placeholderValue || '';
            }
        }
    };
    Choices.prototype._handleSearch = function (value) {
        if (!this.input.isFocussed) {
            return;
        }
        var choices = this._store.choices;
        var _a = this.config, searchFloor = _a.searchFloor, searchChoices = _a.searchChoices;
        var hasUnactiveChoices = choices.some(function (option) { return !option.active; });
        // Check that we have a value to search and the input was an alphanumeric character
        if (value !== null &&
            typeof value !== 'undefined' &&
            value.length >= searchFloor) {
            var resultCount = searchChoices ? this._searchChoices(value) : 0;
            // Trigger search event
            this.passedElement.triggerEvent(constants_1.EVENTS.search, {
                value: value,
                resultCount: resultCount,
            });
        }
        else if (hasUnactiveChoices) {
            // Otherwise reset choices to active
            this._isSearching = false;
            this._store.dispatch((0, choices_1.activateChoices)(true));
        }
    };
    Choices.prototype._canAddItem = function (activeItems, value) {
        var canAddItem = true;
        var notice = typeof this.config.addItemText === 'function'
            ? this.config.addItemText(value)
            : this.config.addItemText;
        if (!this._isSelectOneElement) {
            var isDuplicateValue = (0, utils_1.existsInArray)(activeItems, value);
            if (this.config.maxItemCount > 0 &&
                this.config.maxItemCount <= activeItems.length) {
                // If there is a max entry limit and we have reached that limit
                // don't update
                canAddItem = false;
                notice =
                    typeof this.config.maxItemText === 'function'
                        ? this.config.maxItemText(this.config.maxItemCount)
                        : this.config.maxItemText;
            }
            if (!this.config.duplicateItemsAllowed &&
                isDuplicateValue &&
                canAddItem) {
                canAddItem = false;
                notice =
                    typeof this.config.uniqueItemText === 'function'
                        ? this.config.uniqueItemText(value)
                        : this.config.uniqueItemText;
            }
            if (this._isTextElement &&
                this.config.addItems &&
                canAddItem &&
                typeof this.config.addItemFilter === 'function' &&
                !this.config.addItemFilter(value)) {
                canAddItem = false;
                notice =
                    typeof this.config.customAddItemText === 'function'
                        ? this.config.customAddItemText(value)
                        : this.config.customAddItemText;
            }
        }
        return {
            response: canAddItem,
            notice: notice,
        };
    };
    Choices.prototype._searchChoices = function (value) {
        var newValue = typeof value === 'string' ? value.trim() : value;
        var currentValue = typeof this._currentValue === 'string'
            ? this._currentValue.trim()
            : this._currentValue;
        if (newValue.length < 1 && newValue === "".concat(currentValue, " ")) {
            return 0;
        }
        // If new value matches the desired length and is not the same as the current value with a space
        var haystack = this._store.searchableChoices;
        var needle = newValue;
        var options = Object.assign(this.config.fuseOptions, {
            keys: __spreadArray([], this.config.searchFields, true),
            includeMatches: true,
        });
        var fuse = new fuse_1.default(haystack, options);
        var results = fuse.search(needle); // see https://github.com/krisk/Fuse/issues/303
        this._currentValue = newValue;
        this._highlightPosition = 0;
        this._isSearching = true;
        this._store.dispatch((0, choices_1.filterChoices)(results));
        return results.length;
    };
    Choices.prototype._addEventListeners = function () {
        var documentElement = document.documentElement;
        // capture events - can cancel event processing or propagation
        documentElement.addEventListener('touchend', this._onTouchEnd, true);
        this.containerOuter.element.addEventListener('keydown', this._onKeyDown, true);
        this.containerOuter.element.addEventListener('mousedown', this._onMouseDown, true);
        // passive events - doesn't call `preventDefault` or `stopPropagation`
        documentElement.addEventListener('click', this._onClick, { passive: true });
        documentElement.addEventListener('touchmove', this._onTouchMove, {
            passive: true,
        });
        this.dropdown.element.addEventListener('mouseover', this._onMouseOver, {
            passive: true,
        });
        if (this._isSelectOneElement) {
            this.containerOuter.element.addEventListener('focus', this._onFocus, {
                passive: true,
            });
            this.containerOuter.element.addEventListener('blur', this._onBlur, {
                passive: true,
            });
        }
        this.input.element.addEventListener('keyup', this._onKeyUp, {
            passive: true,
        });
        this.input.element.addEventListener('focus', this._onFocus, {
            passive: true,
        });
        this.input.element.addEventListener('blur', this._onBlur, {
            passive: true,
        });
        if (this.input.element.form) {
            this.input.element.form.addEventListener('reset', this._onFormReset, {
                passive: true,
            });
        }
        this.input.addEventListeners();
    };
    Choices.prototype._removeEventListeners = function () {
        var documentElement = document.documentElement;
        documentElement.removeEventListener('touchend', this._onTouchEnd, true);
        this.containerOuter.element.removeEventListener('keydown', this._onKeyDown, true);
        this.containerOuter.element.removeEventListener('mousedown', this._onMouseDown, true);
        documentElement.removeEventListener('click', this._onClick);
        documentElement.removeEventListener('touchmove', this._onTouchMove);
        this.dropdown.element.removeEventListener('mouseover', this._onMouseOver);
        if (this._isSelectOneElement) {
            this.containerOuter.element.removeEventListener('focus', this._onFocus);
            this.containerOuter.element.removeEventListener('blur', this._onBlur);
        }
        this.input.element.removeEventListener('keyup', this._onKeyUp);
        this.input.element.removeEventListener('focus', this._onFocus);
        this.input.element.removeEventListener('blur', this._onBlur);
        if (this.input.element.form) {
            this.input.element.form.removeEventListener('reset', this._onFormReset);
        }
        this.input.removeEventListeners();
    };
    Choices.prototype._onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var activeItems = this._store.activeItems;
        var hasFocusedInput = this.input.isFocussed;
        var hasActiveDropdown = this.dropdown.isActive;
        var hasItems = this.itemList.hasChildren();
        var keyString = String.fromCharCode(keyCode);
        var wasAlphaNumericChar = /[a-zA-Z0-9-_ ]/.test(keyString);
        var BACK_KEY = constants_1.KEY_CODES.BACK_KEY, DELETE_KEY = constants_1.KEY_CODES.DELETE_KEY, ENTER_KEY = constants_1.KEY_CODES.ENTER_KEY, A_KEY = constants_1.KEY_CODES.A_KEY, ESC_KEY = constants_1.KEY_CODES.ESC_KEY, UP_KEY = constants_1.KEY_CODES.UP_KEY, DOWN_KEY = constants_1.KEY_CODES.DOWN_KEY, PAGE_UP_KEY = constants_1.KEY_CODES.PAGE_UP_KEY, PAGE_DOWN_KEY = constants_1.KEY_CODES.PAGE_DOWN_KEY;
        if (!this._isTextElement && !hasActiveDropdown && wasAlphaNumericChar) {
            this.showDropdown();
            if (!this.input.isFocussed) {
                /*
                  We update the input value with the pressed key as
                  the input was not focussed at the time of key press
                  therefore does not have the value of the key.
                */
                this.input.value += keyString.toLowerCase();
            }
        }
        switch (keyCode) {
            case A_KEY:
                return this._onSelectKey(event, hasItems);
            case ENTER_KEY:
                return this._onEnterKey(event, activeItems, hasActiveDropdown);
            case ESC_KEY:
                return this._onEscapeKey(hasActiveDropdown);
            case UP_KEY:
            case PAGE_UP_KEY:
            case DOWN_KEY:
            case PAGE_DOWN_KEY:
                return this._onDirectionKey(event, hasActiveDropdown);
            case DELETE_KEY:
            case BACK_KEY:
                return this._onDeleteKey(event, activeItems, hasFocusedInput);
            default:
        }
    };
    Choices.prototype._onKeyUp = function (_a) {
        var target = _a.target, keyCode = _a.keyCode;
        var value = this.input.value;
        var activeItems = this._store.activeItems;
        var canAddItem = this._canAddItem(activeItems, value);
        var backKey = constants_1.KEY_CODES.BACK_KEY, deleteKey = constants_1.KEY_CODES.DELETE_KEY;
        // We are typing into a text input and have a value, we want to show a dropdown
        // notice. Otherwise hide the dropdown
        if (this._isTextElement) {
            var canShowDropdownNotice = canAddItem.notice && value;
            if (canShowDropdownNotice) {
                var dropdownItem = this._getTemplate('notice', canAddItem.notice);
                this.dropdown.element.innerHTML = dropdownItem.outerHTML;
                this.showDropdown(true);
            }
            else {
                this.hideDropdown(true);
            }
        }
        else {
            var wasRemovalKeyCode = keyCode === backKey || keyCode === deleteKey;
            var userHasRemovedValue = wasRemovalKeyCode && target && !target.value;
            var canReactivateChoices = !this._isTextElement && this._isSearching;
            var canSearch = this._canSearch && canAddItem.response;
            if (userHasRemovedValue && canReactivateChoices) {
                this._isSearching = false;
                this._store.dispatch((0, choices_1.activateChoices)(true));
            }
            else if (canSearch) {
                this._handleSearch(this.input.rawValue);
            }
        }
        this._canSearch = this.config.searchEnabled;
    };
    Choices.prototype._onSelectKey = function (event, hasItems) {
        var ctrlKey = event.ctrlKey, metaKey = event.metaKey;
        var hasCtrlDownKeyPressed = ctrlKey || metaKey;
        // If CTRL + A or CMD + A have been pressed and there are items to select
        if (hasCtrlDownKeyPressed && hasItems) {
            this._canSearch = false;
            var shouldHightlightAll = this.config.removeItems &&
                !this.input.value &&
                this.input.element === document.activeElement;
            if (shouldHightlightAll) {
                this.highlightAll();
            }
        }
    };
    Choices.prototype._onEnterKey = function (event, activeItems, hasActiveDropdown) {
        var target = event.target;
        var enterKey = constants_1.KEY_CODES.ENTER_KEY;
        var targetWasButton = target && target.hasAttribute('data-button');
        if (this._isTextElement && target && target.value) {
            var value = this.input.value;
            var canAddItem = this._canAddItem(activeItems, value);
            if (canAddItem.response) {
                this.hideDropdown(true);
                this._addItem({ value: value });
                this._triggerChange(value);
                this.clearInput();
            }
        }
        if (targetWasButton) {
            this._handleButtonAction(activeItems, target);
            event.preventDefault();
        }
        if (hasActiveDropdown) {
            var highlightedChoice = this.dropdown.getChild(".".concat(this.config.classNames.highlightedState));
            if (highlightedChoice) {
                // add enter keyCode value
                if (activeItems[0]) {
                    activeItems[0].keyCode = enterKey; // eslint-disable-line no-param-reassign
                }
                this._handleChoiceAction(activeItems, highlightedChoice);
            }
            event.preventDefault();
        }
        else if (this._isSelectOneElement) {
            this.showDropdown();
            event.preventDefault();
        }
    };
    Choices.prototype._onEscapeKey = function (hasActiveDropdown) {
        if (hasActiveDropdown) {
            this.hideDropdown(true);
            this.containerOuter.focus();
        }
    };
    Choices.prototype._onDirectionKey = function (event, hasActiveDropdown) {
        var keyCode = event.keyCode, metaKey = event.metaKey;
        var downKey = constants_1.KEY_CODES.DOWN_KEY, pageUpKey = constants_1.KEY_CODES.PAGE_UP_KEY, pageDownKey = constants_1.KEY_CODES.PAGE_DOWN_KEY;
        // If up or down key is pressed, traverse through options
        if (hasActiveDropdown || this._isSelectOneElement) {
            this.showDropdown();
            this._canSearch = false;
            var directionInt = keyCode === downKey || keyCode === pageDownKey ? 1 : -1;
            var skipKey = metaKey || keyCode === pageDownKey || keyCode === pageUpKey;
            var selectableChoiceIdentifier = '[data-choice-selectable]';
            var nextEl = void 0;
            if (skipKey) {
                if (directionInt > 0) {
                    nextEl = this.dropdown.element.querySelector("".concat(selectableChoiceIdentifier, ":last-of-type"));
                }
                else {
                    nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
                }
            }
            else {
                var currentEl = this.dropdown.element.querySelector(".".concat(this.config.classNames.highlightedState));
                if (currentEl) {
                    nextEl = (0, utils_1.getAdjacentEl)(currentEl, selectableChoiceIdentifier, directionInt);
                }
                else {
                    nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
                }
            }
            if (nextEl) {
                // We prevent default to stop the cursor moving
                // when pressing the arrow
                if (!(0, utils_1.isScrolledIntoView)(nextEl, this.choiceList.element, directionInt)) {
                    this.choiceList.scrollToChildElement(nextEl, directionInt);
                }
                this._highlightChoice(nextEl);
            }
            // Prevent default to maintain cursor position whilst
            // traversing dropdown options
            event.preventDefault();
        }
    };
    Choices.prototype._onDeleteKey = function (event, activeItems, hasFocusedInput) {
        var target = event.target;
        // If backspace or delete key is pressed and the input has no value
        if (!this._isSelectOneElement &&
            !target.value &&
            hasFocusedInput) {
            this._handleBackspace(activeItems);
            event.preventDefault();
        }
    };
    Choices.prototype._onTouchMove = function () {
        if (this._wasTap) {
            this._wasTap = false;
        }
    };
    Choices.prototype._onTouchEnd = function (event) {
        var target = (event || event.touches[0]).target;
        var touchWasWithinContainer = this._wasTap && this.containerOuter.element.contains(target);
        if (touchWasWithinContainer) {
            var containerWasExactTarget = target === this.containerOuter.element ||
                target === this.containerInner.element;
            if (containerWasExactTarget) {
                if (this._isTextElement) {
                    this.input.focus();
                }
                else if (this._isSelectMultipleElement) {
                    this.showDropdown();
                }
            }
            // Prevents focus event firing
            event.stopPropagation();
        }
        this._wasTap = true;
    };
    /**
     * Handles mousedown event in capture mode for containetOuter.element
     */
    Choices.prototype._onMouseDown = function (event) {
        var target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }
        // If we have our mouse down on the scrollbar and are on IE11...
        if (IS_IE11 && this.choiceList.element.contains(target)) {
            // check if click was on a scrollbar area
            var firstChoice = this.choiceList.element
                .firstElementChild;
            var isOnScrollbar = this._direction === 'ltr'
                ? event.offsetX >= firstChoice.offsetWidth
                : event.offsetX < firstChoice.offsetLeft;
            this._isScrollingOnIe = isOnScrollbar;
        }
        if (target === this.input.element) {
            return;
        }
        var item = target.closest('[data-button],[data-item],[data-choice]');
        if (item instanceof HTMLElement) {
            var hasShiftKey = event.shiftKey;
            var activeItems = this._store.activeItems;
            var dataset = item.dataset;
            if ('button' in dataset) {
                this._handleButtonAction(activeItems, item);
            }
            else if ('item' in dataset) {
                this._handleItemAction(activeItems, item, hasShiftKey);
            }
            else if ('choice' in dataset) {
                this._handleChoiceAction(activeItems, item);
            }
        }
        event.preventDefault();
    };
    /**
     * Handles mouseover event over this.dropdown
     * @param {MouseEvent} event
     */
    Choices.prototype._onMouseOver = function (_a) {
        var target = _a.target;
        if (target instanceof HTMLElement && 'choice' in target.dataset) {
            this._highlightChoice(target);
        }
    };
    Choices.prototype._onClick = function (_a) {
        var target = _a.target;
        var clickWasWithinContainer = this.containerOuter.element.contains(target);
        if (clickWasWithinContainer) {
            if (!this.dropdown.isActive && !this.containerOuter.isDisabled) {
                if (this._isTextElement) {
                    if (document.activeElement !== this.input.element) {
                        this.input.focus();
                    }
                }
                else {
                    this.showDropdown();
                    this.containerOuter.focus();
                }
            }
            else if (this._isSelectOneElement &&
                target !== this.input.element &&
                !this.dropdown.element.contains(target)) {
                this.hideDropdown();
            }
        }
        else {
            var hasHighlightedItems = this._store.highlightedActiveItems.length > 0;
            if (hasHighlightedItems) {
                this.unhighlightAll();
            }
            this.containerOuter.removeFocusState();
            this.hideDropdown(true);
        }
    };
    Choices.prototype._onFocus = function (_a) {
        var _b;
        var _this = this;
        var target = _a.target;
        var focusWasWithinContainer = target && this.containerOuter.element.contains(target);
        if (!focusWasWithinContainer) {
            return;
        }
        var focusActions = (_b = {},
            _b[constants_1.TEXT_TYPE] = function () {
                if (target === _this.input.element) {
                    _this.containerOuter.addFocusState();
                }
            },
            _b[constants_1.SELECT_ONE_TYPE] = function () {
                _this.containerOuter.addFocusState();
                if (target === _this.input.element) {
                    _this.showDropdown(true);
                }
            },
            _b[constants_1.SELECT_MULTIPLE_TYPE] = function () {
                if (target === _this.input.element) {
                    _this.showDropdown(true);
                    // If element is a select box, the focused element is the container and the dropdown
                    // isn't already open, focus and show dropdown
                    _this.containerOuter.addFocusState();
                }
            },
            _b);
        focusActions[this.passedElement.element.type]();
    };
    Choices.prototype._onBlur = function (_a) {
        var _b;
        var _this = this;
        var target = _a.target;
        var blurWasWithinContainer = target && this.containerOuter.element.contains(target);
        if (blurWasWithinContainer && !this._isScrollingOnIe) {
            var activeItems = this._store.activeItems;
            var hasHighlightedItems_1 = activeItems.some(function (item) { return item.highlighted; });
            var blurActions = (_b = {},
                _b[constants_1.TEXT_TYPE] = function () {
                    if (target === _this.input.element) {
                        _this.containerOuter.removeFocusState();
                        if (hasHighlightedItems_1) {
                            _this.unhighlightAll();
                        }
                        _this.hideDropdown(true);
                    }
                },
                _b[constants_1.SELECT_ONE_TYPE] = function () {
                    _this.containerOuter.removeFocusState();
                    if (target === _this.input.element ||
                        (target === _this.containerOuter.element && !_this._canSearch)) {
                        _this.hideDropdown(true);
                    }
                },
                _b[constants_1.SELECT_MULTIPLE_TYPE] = function () {
                    if (target === _this.input.element) {
                        _this.containerOuter.removeFocusState();
                        _this.hideDropdown(true);
                        if (hasHighlightedItems_1) {
                            _this.unhighlightAll();
                        }
                    }
                },
                _b);
            blurActions[this.passedElement.element.type]();
        }
        else {
            // On IE11, clicking the scollbar blurs our input and thus
            // closes the dropdown. To stop this, we refocus our input
            // if we know we are on IE *and* are scrolling.
            this._isScrollingOnIe = false;
            this.input.element.focus();
        }
    };
    Choices.prototype._onFormReset = function () {
        this._store.dispatch((0, misc_1.resetTo)(this._initialState));
    };
    Choices.prototype._highlightChoice = function (el) {
        var _this = this;
        if (el === void 0) { el = null; }
        var choices = Array.from(this.dropdown.element.querySelectorAll('[data-choice-selectable]'));
        if (!choices.length) {
            return;
        }
        var passedEl = el;
        var highlightedChoices = Array.from(this.dropdown.element.querySelectorAll(".".concat(this.config.classNames.highlightedState)));
        // Remove any highlighted choices
        highlightedChoices.forEach(function (choice) {
            choice.classList.remove(_this.config.classNames.highlightedState);
            choice.setAttribute('aria-selected', 'false');
        });
        if (passedEl) {
            this._highlightPosition = choices.indexOf(passedEl);
        }
        else {
            // Highlight choice based on last known highlight location
            if (choices.length > this._highlightPosition) {
                // If we have an option to highlight
                passedEl = choices[this._highlightPosition];
            }
            else {
                // Otherwise highlight the option before
                passedEl = choices[choices.length - 1];
            }
            if (!passedEl) {
                passedEl = choices[0];
            }
        }
        passedEl.classList.add(this.config.classNames.highlightedState);
        passedEl.setAttribute('aria-selected', 'true');
        this.passedElement.triggerEvent(constants_1.EVENTS.highlightChoice, { el: passedEl });
        if (this.dropdown.isActive) {
            // IE11 ignores aria-label and blocks virtual keyboard
            // if aria-activedescendant is set without a dropdown
            this.input.setActiveDescendant(passedEl.id);
            this.containerOuter.setActiveDescendant(passedEl.id);
        }
    };
    Choices.prototype._addItem = function (_a) {
        var value = _a.value, _b = _a.label, label = _b === void 0 ? null : _b, _c = _a.choiceId, choiceId = _c === void 0 ? -1 : _c, _d = _a.groupId, groupId = _d === void 0 ? -1 : _d, _e = _a.customProperties, customProperties = _e === void 0 ? {} : _e, _f = _a.placeholder, placeholder = _f === void 0 ? false : _f, _g = _a.keyCode, keyCode = _g === void 0 ? -1 : _g;
        var passedValue = typeof value === 'string' ? value.trim() : value;
        var items = this._store.items;
        var passedLabel = label || passedValue;
        var passedOptionId = choiceId || -1;
        var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
        var id = items ? items.length + 1 : 1;
        // If a prepended value has been passed, prepend it
        if (this.config.prependValue) {
            passedValue = this.config.prependValue + passedValue.toString();
        }
        // If an appended value has been passed, append it
        if (this.config.appendValue) {
            passedValue += this.config.appendValue.toString();
        }
        this._store.dispatch((0, items_1.addItem)({
            value: passedValue,
            label: passedLabel,
            id: id,
            choiceId: passedOptionId,
            groupId: groupId,
            customProperties: customProperties,
            placeholder: placeholder,
            keyCode: keyCode,
        }));
        if (this._isSelectOneElement) {
            this.removeActiveItems(id);
        }
        // Trigger change event
        this.passedElement.triggerEvent(constants_1.EVENTS.addItem, {
            id: id,
            value: passedValue,
            label: passedLabel,
            customProperties: customProperties,
            groupValue: group && group.value ? group.value : null,
            keyCode: keyCode,
        });
    };
    Choices.prototype._removeItem = function (item) {
        var id = item.id, value = item.value, label = item.label, customProperties = item.customProperties, choiceId = item.choiceId, groupId = item.groupId;
        var group = groupId && groupId >= 0 ? this._store.getGroupById(groupId) : null;
        if (!id || !choiceId) {
            return;
        }
        this._store.dispatch((0, items_1.removeItem)(id, choiceId));
        this.passedElement.triggerEvent(constants_1.EVENTS.removeItem, {
            id: id,
            value: value,
            label: label,
            customProperties: customProperties,
            groupValue: group && group.value ? group.value : null,
        });
    };
    Choices.prototype._addChoice = function (_a) {
        var value = _a.value, _b = _a.label, label = _b === void 0 ? null : _b, _c = _a.isSelected, isSelected = _c === void 0 ? false : _c, _d = _a.isDisabled, isDisabled = _d === void 0 ? false : _d, _e = _a.groupId, groupId = _e === void 0 ? -1 : _e, _f = _a.customProperties, customProperties = _f === void 0 ? {} : _f, _g = _a.placeholder, placeholder = _g === void 0 ? false : _g, _h = _a.keyCode, keyCode = _h === void 0 ? -1 : _h;
        if (typeof value === 'undefined' || value === null) {
            return;
        }
        // Generate unique id
        var choices = this._store.choices;
        var choiceLabel = label || value;
        var choiceId = choices ? choices.length + 1 : 1;
        var choiceElementId = "".concat(this._baseId, "-").concat(this._idNames.itemChoice, "-").concat(choiceId);
        this._store.dispatch((0, choices_1.addChoice)({
            id: choiceId,
            groupId: groupId,
            elementId: choiceElementId,
            value: value,
            label: choiceLabel,
            disabled: isDisabled,
            customProperties: customProperties,
            placeholder: placeholder,
            keyCode: keyCode,
        }));
        if (isSelected) {
            this._addItem({
                value: value,
                label: choiceLabel,
                choiceId: choiceId,
                customProperties: customProperties,
                placeholder: placeholder,
                keyCode: keyCode,
            });
        }
    };
    Choices.prototype._addGroup = function (_a) {
        var _this = this;
        var group = _a.group, id = _a.id, _b = _a.valueKey, valueKey = _b === void 0 ? 'value' : _b, _c = _a.labelKey, labelKey = _c === void 0 ? 'label' : _c;
        var groupChoices = (0, utils_1.isType)('Object', group)
            ? group.choices
            : Array.from(group.getElementsByTagName('OPTION'));
        var groupId = id || Math.floor(new Date().valueOf() * Math.random());
        var isDisabled = group.disabled ? group.disabled : false;
        if (groupChoices) {
            this._store.dispatch((0, groups_1.addGroup)({
                value: group.label,
                id: groupId,
                active: true,
                disabled: isDisabled,
            }));
            var addGroupChoices = function (choice) {
                var isOptDisabled = choice.disabled || (choice.parentNode && choice.parentNode.disabled);
                _this._addChoice({
                    value: choice[valueKey],
                    label: (0, utils_1.isType)('Object', choice) ? choice[labelKey] : choice.innerHTML,
                    isSelected: choice.selected,
                    isDisabled: isOptDisabled,
                    groupId: groupId,
                    customProperties: choice.customProperties,
                    placeholder: choice.placeholder,
                });
            };
            groupChoices.forEach(addGroupChoices);
        }
        else {
            this._store.dispatch((0, groups_1.addGroup)({
                value: group.label,
                id: group.id,
                active: false,
                disabled: group.disabled,
            }));
        }
    };
    Choices.prototype._getTemplate = function (template) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this._templates[template]).call.apply(_a, __spreadArray([this, this.config], args, false));
    };
    Choices.prototype._createTemplates = function () {
        var callbackOnCreateTemplates = this.config.callbackOnCreateTemplates;
        var userTemplates = {};
        if (callbackOnCreateTemplates &&
            typeof callbackOnCreateTemplates === 'function') {
            userTemplates = callbackOnCreateTemplates.call(this, utils_1.strToEl);
        }
        this._templates = (0, deepmerge_1.default)(templates_1.default, userTemplates);
    };
    Choices.prototype._createElements = function () {
        this.containerOuter = new components_1.Container({
            element: this._getTemplate('containerOuter', this._direction, this._isSelectElement, this._isSelectOneElement, this.config.searchEnabled, this.passedElement.element.type, this.config.labelId),
            classNames: this.config.classNames,
            type: this.passedElement.element.type,
            position: this.config.position,
        });
        this.containerInner = new components_1.Container({
            element: this._getTemplate('containerInner'),
            classNames: this.config.classNames,
            type: this.passedElement.element.type,
            position: this.config.position,
        });
        this.input = new components_1.Input({
            element: this._getTemplate('input', this._placeholderValue),
            classNames: this.config.classNames,
            type: this.passedElement.element.type,
            preventPaste: !this.config.paste,
        });
        this.choiceList = new components_1.List({
            element: this._getTemplate('choiceList', this._isSelectOneElement),
        });
        this.itemList = new components_1.List({
            element: this._getTemplate('itemList', this._isSelectOneElement),
        });
        this.dropdown = new components_1.Dropdown({
            element: this._getTemplate('dropdown'),
            classNames: this.config.classNames,
            type: this.passedElement.element.type,
        });
    };
    Choices.prototype._createStructure = function () {
        // Hide original element
        this.passedElement.conceal();
        // Wrap input in container preserving DOM ordering
        this.containerInner.wrap(this.passedElement.element);
        // Wrapper inner container with outer container
        this.containerOuter.wrap(this.containerInner.element);
        if (this._isSelectOneElement) {
            this.input.placeholder = this.config.searchPlaceholderValue || '';
        }
        else if (this._placeholderValue) {
            this.input.placeholder = this._placeholderValue;
            this.input.setWidth();
        }
        this.containerOuter.element.appendChild(this.containerInner.element);
        this.containerOuter.element.appendChild(this.dropdown.element);
        this.containerInner.element.appendChild(this.itemList.element);
        if (!this._isTextElement) {
            this.dropdown.element.appendChild(this.choiceList.element);
        }
        if (!this._isSelectOneElement) {
            this.containerInner.element.appendChild(this.input.element);
        }
        else if (this.config.searchEnabled) {
            this.dropdown.element.insertBefore(this.input.element, this.dropdown.element.firstChild);
        }
        if (this._isSelectElement) {
            this._highlightPosition = 0;
            this._isSearching = false;
            this._startLoading();
            if (this._presetGroups.length) {
                this._addPredefinedGroups(this._presetGroups);
            }
            else {
                this._addPredefinedChoices(this._presetChoices);
            }
            this._stopLoading();
        }
        if (this._isTextElement) {
            this._addPredefinedItems(this._presetItems);
        }
    };
    Choices.prototype._addPredefinedGroups = function (groups) {
        var _this = this;
        // If we have a placeholder option
        var placeholderChoice = this.passedElement
            .placeholderOption;
        if (placeholderChoice &&
            placeholderChoice.parentNode &&
            placeholderChoice.parentNode.tagName === 'SELECT') {
            this._addChoice({
                value: placeholderChoice.value,
                label: placeholderChoice.innerHTML,
                isSelected: placeholderChoice.selected,
                isDisabled: placeholderChoice.disabled,
                placeholder: true,
            });
        }
        groups.forEach(function (group) {
            return _this._addGroup({
                group: group,
                id: group.id || null,
            });
        });
    };
    Choices.prototype._addPredefinedChoices = function (choices) {
        var _this = this;
        // If sorting is enabled or the user is searching, filter choices
        if (this.config.shouldSort) {
            choices.sort(this.config.sorter);
        }
        var hasSelectedChoice = choices.some(function (choice) { return choice.selected; });
        var firstEnabledChoiceIndex = choices.findIndex(function (choice) { return choice.disabled === undefined || !choice.disabled; });
        choices.forEach(function (choice, index) {
            var _a = choice.value, value = _a === void 0 ? '' : _a, label = choice.label, customProperties = choice.customProperties, placeholder = choice.placeholder;
            if (_this._isSelectElement) {
                // If the choice is actually a group
                if (choice.choices) {
                    _this._addGroup({
                        group: choice,
                        id: choice.id || null,
                    });
                }
                else {
                    /**
                     * If there is a selected choice already or the choice is not the first in
                     * the array, add each choice normally.
                     *
                     * Otherwise we pre-select the first enabled choice in the array ("select-one" only)
                     */
                    var shouldPreselect = _this._isSelectOneElement &&
                        !hasSelectedChoice &&
                        index === firstEnabledChoiceIndex;
                    var isSelected = shouldPreselect ? true : choice.selected;
                    var isDisabled = choice.disabled;
                    _this._addChoice({
                        value: value,
                        label: label,
                        isSelected: !!isSelected,
                        isDisabled: !!isDisabled,
                        placeholder: !!placeholder,
                        customProperties: customProperties,
                    });
                }
            }
            else {
                _this._addChoice({
                    value: value,
                    label: label,
                    isSelected: !!choice.selected,
                    isDisabled: !!choice.disabled,
                    placeholder: !!choice.placeholder,
                    customProperties: customProperties,
                });
            }
        });
    };
    Choices.prototype._addPredefinedItems = function (items) {
        var _this = this;
        items.forEach(function (item) {
            if (typeof item === 'object' && item.value) {
                _this._addItem({
                    value: item.value,
                    label: item.label,
                    choiceId: item.id,
                    customProperties: item.customProperties,
                    placeholder: item.placeholder,
                });
            }
            if (typeof item === 'string') {
                _this._addItem({
                    value: item,
                });
            }
        });
    };
    Choices.prototype._setChoiceOrItem = function (item) {
        var _this = this;
        var itemType = (0, utils_1.getType)(item).toLowerCase();
        var handleType = {
            object: function () {
                if (!item.value) {
                    return;
                }
                // If we are dealing with a select input, we need to create an option first
                // that is then selected. For text inputs we can just add items normally.
                if (!_this._isTextElement) {
                    _this._addChoice({
                        value: item.value,
                        label: item.label,
                        isSelected: true,
                        isDisabled: false,
                        customProperties: item.customProperties,
                        placeholder: item.placeholder,
                    });
                }
                else {
                    _this._addItem({
                        value: item.value,
                        label: item.label,
                        choiceId: item.id,
                        customProperties: item.customProperties,
                        placeholder: item.placeholder,
                    });
                }
            },
            string: function () {
                if (!_this._isTextElement) {
                    _this._addChoice({
                        value: item,
                        label: item,
                        isSelected: true,
                        isDisabled: false,
                    });
                }
                else {
                    _this._addItem({
                        value: item,
                    });
                }
            },
        };
        handleType[itemType]();
    };
    Choices.prototype._findAndSelectChoiceByValue = function (value) {
        var _this = this;
        var choices = this._store.choices;
        // Check 'value' property exists and the choice isn't already selected
        var foundChoice = choices.find(function (choice) {
            return _this.config.valueComparer(choice.value, value);
        });
        if (foundChoice && !foundChoice.selected) {
            this._addItem({
                value: foundChoice.value,
                label: foundChoice.label,
                choiceId: foundChoice.id,
                groupId: foundChoice.groupId,
                customProperties: foundChoice.customProperties,
                placeholder: foundChoice.placeholder,
                keyCode: foundChoice.keyCode,
            });
        }
    };
    Choices.prototype._generatePlaceholderValue = function () {
        if (this._isSelectElement &&
            this.passedElement.placeholderOption) {
            var placeholderOption = this.passedElement.placeholderOption;
            return placeholderOption ? placeholderOption.text : null;
        }
        var _a = this.config, placeholder = _a.placeholder, placeholderValue = _a.placeholderValue;
        var dataset = this.passedElement.element.dataset;
        if (placeholder) {
            if (placeholderValue) {
                return placeholderValue;
            }
            if (dataset.placeholder) {
                return dataset.placeholder;
            }
        }
        return null;
    };
    return Choices;
}());
exports.default = Choices;
//# sourceMappingURL=choices.js.map