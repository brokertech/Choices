/*! choices.js v10.1.0 | © 2022 Josh Johnson | https://github.com/jshjohnson/Choices#readme */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Choices"] = factory();
	else
		root["Choices"] = factory();
})(window, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 282:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clearChoices = exports.activateChoices = exports.filterChoices = exports.addChoice = void 0;

var constants_1 = __webpack_require__(883);

var addChoice = function addChoice(_a) {
  var value = _a.value,
      label = _a.label,
      id = _a.id,
      groupId = _a.groupId,
      disabled = _a.disabled,
      elementId = _a.elementId,
      customProperties = _a.customProperties,
      placeholder = _a.placeholder,
      keyCode = _a.keyCode;
  return {
    type: constants_1.ACTION_TYPES.ADD_CHOICE,
    value: value,
    label: label,
    id: id,
    groupId: groupId,
    disabled: disabled,
    elementId: elementId,
    customProperties: customProperties,
    placeholder: placeholder,
    keyCode: keyCode
  };
};

exports.addChoice = addChoice;

var filterChoices = function filterChoices(results) {
  return {
    type: constants_1.ACTION_TYPES.FILTER_CHOICES,
    results: results
  };
};

exports.filterChoices = filterChoices;

var activateChoices = function activateChoices(active) {
  if (active === void 0) {
    active = true;
  }

  return {
    type: constants_1.ACTION_TYPES.ACTIVATE_CHOICES,
    active: active
  };
};

exports.activateChoices = activateChoices;

var clearChoices = function clearChoices() {
  return {
    type: constants_1.ACTION_TYPES.CLEAR_CHOICES
  };
};

exports.clearChoices = clearChoices;

/***/ }),

/***/ 783:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.addGroup = void 0;

var constants_1 = __webpack_require__(883);

var addGroup = function addGroup(_a) {
  var value = _a.value,
      id = _a.id,
      active = _a.active,
      disabled = _a.disabled;
  return {
    type: constants_1.ACTION_TYPES.ADD_GROUP,
    value: value,
    id: id,
    active: active,
    disabled: disabled
  };
};

exports.addGroup = addGroup;

/***/ }),

/***/ 464:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.highlightItem = exports.removeItem = exports.addItem = void 0;

var constants_1 = __webpack_require__(883);

var addItem = function addItem(_a) {
  var value = _a.value,
      label = _a.label,
      id = _a.id,
      choiceId = _a.choiceId,
      groupId = _a.groupId,
      customProperties = _a.customProperties,
      placeholder = _a.placeholder,
      keyCode = _a.keyCode;
  return {
    type: constants_1.ACTION_TYPES.ADD_ITEM,
    value: value,
    label: label,
    id: id,
    choiceId: choiceId,
    groupId: groupId,
    customProperties: customProperties,
    placeholder: placeholder,
    keyCode: keyCode
  };
};

exports.addItem = addItem;

var removeItem = function removeItem(id, choiceId) {
  return {
    type: constants_1.ACTION_TYPES.REMOVE_ITEM,
    id: id,
    choiceId: choiceId
  };
};

exports.removeItem = removeItem;

var highlightItem = function highlightItem(id, highlighted) {
  return {
    type: constants_1.ACTION_TYPES.HIGHLIGHT_ITEM,
    id: id,
    highlighted: highlighted
  };
};

exports.highlightItem = highlightItem;

/***/ }),

/***/ 137:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.setIsLoading = exports.resetTo = exports.clearAll = void 0;

var constants_1 = __webpack_require__(883);

var clearAll = function clearAll() {
  return {
    type: constants_1.ACTION_TYPES.CLEAR_ALL
  };
};

exports.clearAll = clearAll;

var resetTo = function resetTo(state) {
  return {
    type: constants_1.ACTION_TYPES.RESET_TO,
    state: state
  };
};

exports.resetTo = resetTo;

var setIsLoading = function setIsLoading(isLoading) {
  return {
    type: constants_1.ACTION_TYPES.SET_IS_LOADING,
    isLoading: isLoading
  };
};

exports.setIsLoading = setIsLoading;

/***/ }),

/***/ 373:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var deepmerge_1 = __importDefault(__webpack_require__(996));
/* eslint-disable @typescript-eslint/no-explicit-any */


var fuse_1 = __importDefault(__webpack_require__(70));

var choices_1 = __webpack_require__(282);

var groups_1 = __webpack_require__(783);

var items_1 = __webpack_require__(464);

var misc_1 = __webpack_require__(137);

var components_1 = __webpack_require__(520);

var constants_1 = __webpack_require__(883);

var defaults_1 = __webpack_require__(789);

var utils_1 = __webpack_require__(799);

var reducers_1 = __webpack_require__(655);

var store_1 = __importDefault(__webpack_require__(744));

var templates_1 = __importDefault(__webpack_require__(686));
/** @see {@link http://browserhacks.com/#hack-acea075d0ac6954f275a70023906050c} */


var IS_IE11 = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
var USER_DEFAULTS = {};
/**
 * Choices
 * @author Josh Johnson<josh@joshuajohnson.co.uk>
 */

var Choices =
/** @class */
function () {
  function Choices(element, userConfig) {
    var _this = this;

    if (element === void 0) {
      element = '[data-choice]';
    }

    if (userConfig === void 0) {
      userConfig = {};
    }

    if (userConfig.allowHTML === undefined) {
      console.warn('Deprecation warning: allowHTML will default to false in a future release. To render HTML in Choices, you will need to set it to true. Setting allowHTML will suppress this message.');
    }

    this.config = deepmerge_1.default.all([defaults_1.DEFAULT_CONFIG, Choices.defaults.options, userConfig], // When merging array configs, replace with a copy of the userConfig array,
    // instead of concatenating with the default array
    {
      arrayMerge: function arrayMerge(_, sourceArray) {
        return __spreadArray([], sourceArray, true);
      }
    });
    var invalidConfigOptions = (0, utils_1.diff)(this.config, defaults_1.DEFAULT_CONFIG);

    if (invalidConfigOptions.length) {
      console.warn('Unknown config option(s) passed', invalidConfigOptions.join(', '));
    }

    var passedElement = typeof element === 'string' ? document.querySelector(element) : element;

    if (!(passedElement instanceof HTMLInputElement || passedElement instanceof HTMLSelectElement)) {
      throw TypeError('Expected one of the following types text|select-one|select-multiple');
    }

    this._isTextElement = passedElement.type === constants_1.TEXT_TYPE;
    this._isSelectOneElement = passedElement.type === constants_1.SELECT_ONE_TYPE;
    this._isSelectMultipleElement = passedElement.type === constants_1.SELECT_MULTIPLE_TYPE;
    this._isSelectElement = this._isSelectOneElement || this._isSelectMultipleElement;
    this.config.searchEnabled = this._isSelectMultipleElement || this.config.searchEnabled;

    if (!['auto', 'always'].includes("".concat(this.config.renderSelectedChoices))) {
      this.config.renderSelectedChoices = 'auto';
    }

    if (userConfig.addItemFilter && typeof userConfig.addItemFilter !== 'function') {
      var re = userConfig.addItemFilter instanceof RegExp ? userConfig.addItemFilter : new RegExp(userConfig.addItemFilter);
      this.config.addItemFilter = re.test.bind(re);
    }

    if (this._isTextElement) {
      this.passedElement = new components_1.WrappedInput({
        element: passedElement,
        classNames: this.config.classNames,
        delimiter: this.config.delimiter
      });
    } else {
      this.passedElement = new components_1.WrappedSelect({
        element: passedElement,
        classNames: this.config.classNames,
        template: function template(data) {
          return _this._templates.option(data);
        }
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
      itemChoice: 'item-choice'
    };

    if (this._isSelectElement) {
      // Assign preset groups from passed element
      this._presetGroups = this.passedElement.optionGroups; // Assign preset options from passed element

      this._presetOptions = this.passedElement.options;
    } // Assign preset choices from passed object


    this._presetChoices = this.config.choices; // Assign preset items from passed object first

    this._presetItems = this.config.items; // Add any values passed from attribute

    if (this.passedElement.value && this._isTextElement) {
      var splitValues = this.passedElement.value.split(this.config.delimiter);
      this._presetItems = this._presetItems.concat(splitValues);
    } // Create array of choices from option elements


    if (this.passedElement.options) {
      this.passedElement.options.forEach(function (option) {
        _this._presetChoices.push({
          value: option.value,
          label: option.innerHTML,
          selected: !!option.selected,
          disabled: option.disabled || option.parentNode.disabled,
          placeholder: option.value === '' || option.hasAttribute('placeholder'),
          customProperties: option.dataset['custom-properties']
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
    this._onDeleteKey = this._onDeleteKey.bind(this); // If element has already been initialised with Choices, fail silently

    if (this.passedElement.isActive) {
      if (!this.config.silent) {
        console.warn('Trying to initialise Choices on element already initialised', {
          element: element
        });
      }

      this.initialised = true;
      return;
    } // Let's go


    this.init();
  }

  Object.defineProperty(Choices, "defaults", {
    get: function get() {
      return Object.preventExtensions({
        get options() {
          return USER_DEFAULTS;
        },

        get templates() {
          return templates_1.default;
        }

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

    var shouldDisable = !this.config.addItems || this.passedElement.element.hasAttribute('disabled');

    if (shouldDisable) {
      this.disable();
    }

    this.initialised = true;
    var callbackOnInit = this.config.callbackOnInit; // Run callback if it is a function

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
    if (runEvent === void 0) {
      runEvent = true;
    }

    if (!item || !item.id) {
      return this;
    }

    var id = item.id,
        _a = item.groupId,
        groupId = _a === void 0 ? -1 : _a,
        _b = item.value,
        value = _b === void 0 ? '' : _b,
        _c = item.label,
        label = _c === void 0 ? '' : _c;
    var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;

    this._store.dispatch((0, items_1.highlightItem)(id, true));

    if (runEvent) {
      this.passedElement.triggerEvent(constants_1.EVENTS.highlightItem, {
        id: id,
        value: value,
        label: label,
        groupValue: group && group.value ? group.value : null
      });
    }

    return this;
  };

  Choices.prototype.unhighlightItem = function (item) {
    if (!item || !item.id) {
      return this;
    }

    var id = item.id,
        _a = item.groupId,
        groupId = _a === void 0 ? -1 : _a,
        _b = item.value,
        value = _b === void 0 ? '' : _b,
        _c = item.label,
        label = _c === void 0 ? '' : _c;
    var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;

    this._store.dispatch((0, items_1.highlightItem)(id, false));

    this.passedElement.triggerEvent(constants_1.EVENTS.highlightItem, {
      id: id,
      value: value,
      label: label,
      groupValue: group && group.value ? group.value : null
    });
    return this;
  };

  Choices.prototype.highlightAll = function () {
    var _this = this;

    this._store.items.forEach(function (item) {
      return _this.highlightItem(item);
    });

    return this;
  };

  Choices.prototype.unhighlightAll = function () {
    var _this = this;

    this._store.items.forEach(function (item) {
      return _this.unhighlightItem(item);
    });

    return this;
  };

  Choices.prototype.removeActiveItemsByValue = function (value) {
    var _this = this;

    this._store.activeItems.filter(function (item) {
      return item.value === value;
    }).forEach(function (item) {
      return _this._removeItem(item);
    });

    return this;
  };

  Choices.prototype.removeActiveItems = function (excludedId) {
    var _this = this;

    this._store.activeItems.filter(function (_a) {
      var id = _a.id;
      return id !== excludedId;
    }).forEach(function (item) {
      return _this._removeItem(item);
    });

    return this;
  };

  Choices.prototype.removeHighlightedItems = function (runEvent) {
    var _this = this;

    if (runEvent === void 0) {
      runEvent = false;
    }

    this._store.highlightedActiveItems.forEach(function (item) {
      _this._removeItem(item); // If this action was performed by the user
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
    if (valueOnly === void 0) {
      valueOnly = false;
    }

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

    items.forEach(function (value) {
      return _this._setChoiceOrItem(value);
    });
    return this;
  };

  Choices.prototype.setChoiceByValue = function (value) {
    var _this = this;

    if (!this.initialised || this._isTextElement) {
      return this;
    } // If only one value has been passed, convert to array


    var choiceValue = Array.isArray(value) ? value : [value]; // Loop through each value and

    choiceValue.forEach(function (val) {
      return _this._findAndSelectChoiceByValue(val);
    });
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

    if (choicesArrayOrFetcher === void 0) {
      choicesArrayOrFetcher = [];
    }

    if (value === void 0) {
      value = 'value';
    }

    if (label === void 0) {
      label = 'label';
    }

    if (replaceChoices === void 0) {
      replaceChoices = false;
    }

    if (!this.initialised) {
      throw new ReferenceError("setChoices was called on a non-initialized instance of Choices");
    }

    if (!this._isSelectElement) {
      throw new TypeError("setChoices can't be used with INPUT based Choices");
    }

    if (typeof value !== 'string' || !value) {
      throw new TypeError("value parameter must be a name of 'value' field in passed objects");
    } // Clear choices if needed


    if (replaceChoices) {
      this.clearChoices();
    }

    if (typeof choicesArrayOrFetcher === 'function') {
      // it's a choices fetcher function
      var fetcher_1 = choicesArrayOrFetcher(this);

      if (typeof Promise === 'function' && fetcher_1 instanceof Promise) {
        // that's a promise
        // eslint-disable-next-line no-promise-executor-return
        return new Promise(function (resolve) {
          return requestAnimationFrame(resolve);
        }).then(function () {
          return _this._handleLoadingState(true);
        }).then(function () {
          return fetcher_1;
        }).then(function (data) {
          return _this.setChoices(data, value, label, replaceChoices);
        }).catch(function (err) {
          if (!_this.config.silent) {
            console.error(err);
          }
        }).then(function () {
          return _this._handleLoadingState(false);
        }).then(function () {
          return _this;
        });
      } // function returned something else than promise, let's check if it's an array of choices


      if (!Array.isArray(fetcher_1)) {
        throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: ".concat(typeof fetcher_1));
      } // recursion with results, it's sync and choices were cleared already


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
          labelKey: label
        });
      } else {
        var choice = groupOrChoice;

        _this._addChoice({
          value: choice[value],
          label: choice[label],
          isSelected: !!choice.selected,
          isDisabled: !!choice.disabled,
          placeholder: !!choice.placeholder,
          customProperties: choice.customProperties
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
    var stateChanged = this._currentState.choices !== this._prevState.choices || this._currentState.groups !== this._prevState.groups || this._currentState.items !== this._prevState.items;
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

    var _a = this._store,
        activeGroups = _a.activeGroups,
        activeChoices = _a.activeChoices;
    var choiceListFragment = document.createDocumentFragment();
    this.choiceList.clear();

    if (this.config.resetScrollPosition) {
      requestAnimationFrame(function () {
        return _this.choiceList.scrollToTop();
      });
    } // If we have grouped options


    if (activeGroups.length >= 1 && !this._isSearching) {
      // If we have a placeholder choice along with groups
      var activePlaceholders = activeChoices.filter(function (activeChoice) {
        return activeChoice.placeholder === true && activeChoice.groupId === -1;
      });

      if (activePlaceholders.length >= 1) {
        choiceListFragment = this._createChoicesFragment(activePlaceholders, choiceListFragment);
      }

      choiceListFragment = this._createGroupsFragment(activeGroups, activeChoices, choiceListFragment);
    } else if (activeChoices.length >= 1) {
      choiceListFragment = this._createChoicesFragment(activeChoices, choiceListFragment);
    } // If we have choices to show


    if (choiceListFragment.childNodes && choiceListFragment.childNodes.length > 0) {
      var activeItems = this._store.activeItems;

      var canAddItem = this._canAddItem(activeItems, this.input.value); // ...and we can select them


      if (canAddItem.response) {
        // ...append them and highlight the first choice
        this.choiceList.append(choiceListFragment);

        this._highlightChoice();
      } else {
        var notice = this._getTemplate('notice', canAddItem.notice);

        this.choiceList.append(notice);
      }
    } else {
      // Otherwise show a notice
      var dropdownItem = void 0;
      var notice = void 0;

      if (this._isSearching) {
        notice = typeof this.config.noResultsText === 'function' ? this.config.noResultsText() : this.config.noResultsText;
        dropdownItem = this._getTemplate('notice', notice, 'no-results');
      } else {
        notice = typeof this.config.noChoicesText === 'function' ? this.config.noChoicesText() : this.config.noChoicesText;
        dropdownItem = this._getTemplate('notice', notice, 'no-choices');
      }

      this.choiceList.append(dropdownItem);
    }
  };

  Choices.prototype._renderItems = function () {
    var activeItems = this._store.activeItems || [];
    this.itemList.clear(); // Create a fragment to store our list items
    // (so we don't have to update the DOM for each item)

    var itemListFragment = this._createItemsFragment(activeItems); // If we have items to add, append them


    if (itemListFragment.childNodes) {
      this.itemList.append(itemListFragment);
    }
  };

  Choices.prototype._createGroupsFragment = function (groups, choices, fragment) {
    var _this = this;

    if (fragment === void 0) {
      fragment = document.createDocumentFragment();
    }

    var getGroupChoices = function getGroupChoices(group) {
      return choices.filter(function (choice) {
        if (_this._isSelectOneElement) {
          return choice.groupId === group.id;
        }

        return choice.groupId === group.id && (_this.config.renderSelectedChoices === 'always' || !choice.selected);
      });
    }; // If sorting is enabled, filter groups


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

    if (fragment === void 0) {
      fragment = document.createDocumentFragment();
    }

    if (withinGroup === void 0) {
      withinGroup = false;
    } // Create a fragment to store our list items (so we don't have to update the DOM for each item)


    var _a = this.config,
        renderSelectedChoices = _a.renderSelectedChoices,
        searchResultLimit = _a.searchResultLimit,
        renderChoiceLimit = _a.renderChoiceLimit;
    var filter = this._isSearching ? utils_1.sortByScore : this.config.sorter;

    var appendChoice = function appendChoice(choice) {
      var shouldRender = renderSelectedChoices === 'auto' ? _this._isSelectOneElement || !choice.selected : true;

      if (shouldRender) {
        var dropdownItem = _this._getTemplate('choice', choice, _this.config.itemSelectText);

        fragment.appendChild(dropdownItem);
      }
    };

    var rendererableChoices = choices;

    if (renderSelectedChoices === 'auto' && !this._isSelectOneElement) {
      rendererableChoices = choices.filter(function (choice) {
        return !choice.selected;
      });
    } // Split array into placeholders and "normal" choices


    var _b = rendererableChoices.reduce(function (acc, choice) {
      if (choice.placeholder) {
        acc.placeholderChoices.push(choice);
      } else {
        acc.normalChoices.push(choice);
      }

      return acc;
    }, {
      placeholderChoices: [],
      normalChoices: []
    }),
        placeholderChoices = _b.placeholderChoices,
        normalChoices = _b.normalChoices; // If sorting is enabled or the user is searching, filter choices


    if (this.config.shouldSort || this._isSearching) {
      normalChoices.sort(filter);
    }

    var choiceLimit = rendererableChoices.length; // Prepend placeholeder

    var sortedChoices = this._isSelectOneElement ? __spreadArray(__spreadArray([], placeholderChoices, true), normalChoices, true) : normalChoices;

    if (this._isSearching) {
      choiceLimit = searchResultLimit;
    } else if (renderChoiceLimit && renderChoiceLimit > 0 && !withinGroup) {
      choiceLimit = renderChoiceLimit;
    } // Add each choice to dropdown within range


    for (var i = 0; i < choiceLimit; i += 1) {
      if (sortedChoices[i]) {
        appendChoice(sortedChoices[i]);
      }
    }

    return fragment;
  };

  Choices.prototype._createItemsFragment = function (items, fragment) {
    var _this = this;

    if (fragment === void 0) {
      fragment = document.createDocumentFragment();
    } // Create fragment to add elements to


    var _a = this.config,
        shouldSortItems = _a.shouldSortItems,
        sorter = _a.sorter,
        removeItemButton = _a.removeItemButton; // If sorting is enabled, filter items

    if (shouldSortItems && !this._isSelectOneElement) {
      items.sort(sorter);
    }

    if (this._isTextElement) {
      // Update the value of the hidden input
      this.passedElement.value = items.map(function (_a) {
        var value = _a.value;
        return value;
      }).join(this.config.delimiter);
    } else {
      // Update the options of the hidden input
      this.passedElement.options = items;
    }

    var addItemToFragment = function addItemToFragment(item) {
      // Create new list element
      var listItem = _this._getTemplate('item', item, removeItemButton); // Append it to list


      fragment.appendChild(listItem);
    }; // Add each list item to list


    items.forEach(addItemToFragment);
    return fragment;
  };

  Choices.prototype._triggerChange = function (value) {
    if (value === undefined || value === null) {
      return;
    }

    this.passedElement.triggerEvent(constants_1.EVENTS.change, {
      value: value
    });
  };

  Choices.prototype._selectPlaceholderChoice = function (placeholderChoice) {
    this._addItem({
      value: placeholderChoice.value,
      label: placeholderChoice.label,
      choiceId: placeholderChoice.id,
      groupId: placeholderChoice.groupId,
      placeholder: placeholderChoice.placeholder
    });

    this._triggerChange(placeholderChoice.value);
  };

  Choices.prototype._handleButtonAction = function (activeItems, element) {
    if (!activeItems || !element || !this.config.removeItems || !this.config.removeItemButton) {
      return;
    }

    var itemId = element.parentNode && element.parentNode.dataset.id;
    var itemToRemove = itemId && activeItems.find(function (item) {
      return item.id === parseInt(itemId, 10);
    });

    if (!itemToRemove) {
      return;
    } // Remove item associated with button


    this._removeItem(itemToRemove);

    this._triggerChange(itemToRemove.value);

    if (this._isSelectOneElement && this._store.placeholderChoice) {
      this._selectPlaceholderChoice(this._store.placeholderChoice);
    }
  };

  Choices.prototype._handleItemAction = function (activeItems, element, hasShiftKey) {
    var _this = this;

    if (hasShiftKey === void 0) {
      hasShiftKey = false;
    }

    if (!activeItems || !element || !this.config.removeItems || this._isSelectOneElement) {
      return;
    }

    var passedId = element.dataset.id; // We only want to select one item with a click
    // so we deselect any items that aren't the target
    // unless shift is being pressed

    activeItems.forEach(function (item) {
      if (item.id === parseInt("".concat(passedId), 10) && !item.highlighted) {
        _this.highlightItem(item);
      } else if (!hasShiftKey && item.highlighted) {
        _this.unhighlightItem(item);
      }
    }); // Focus input as without focus, a user cannot do anything with a
    // highlighted item

    this.input.focus();
  };

  Choices.prototype._handleChoiceAction = function (activeItems, element) {
    if (!activeItems || !element) {
      return;
    } // If we are clicking on an option


    var id = element.dataset.id;

    var choice = id && this._store.getChoiceById(id);

    if (!choice) {
      return;
    }

    var passedKeyCode = activeItems[0] && activeItems[0].keyCode ? activeItems[0].keyCode : undefined;
    var hasActiveDropdown = this.dropdown.isActive; // Update choice keyCode

    choice.keyCode = passedKeyCode;
    this.passedElement.triggerEvent(constants_1.EVENTS.choice, {
      choice: choice
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
          keyCode: choice.keyCode
        });

        this._triggerChange(choice.value);
      }
    }

    this.clearInput(); // We want to close the dropdown if we are dealing with a single select box

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
    var hasHighlightedItems = activeItems.some(function (item) {
      return item.highlighted;
    }); // If editing the last item is allowed and there are not other selected items,
    // we can edit the item value. Otherwise if we can remove items, remove all selected items

    if (this.config.editItems && !hasHighlightedItems && lastItem) {
      this.input.value = lastItem.value;
      this.input.setWidth();

      this._removeItem(lastItem);

      this._triggerChange(lastItem.value);
    } else {
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
    if (setLoading === void 0) {
      setLoading = true;
    }

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
        } else {
          placeholderItem.innerHTML = this.config.loadingText;
        }
      } else {
        this.input.placeholder = this.config.loadingText;
      }
    } else {
      this.enable();
      this.containerOuter.removeLoadingState();

      if (this._isSelectOneElement) {
        if (placeholderItem) {
          placeholderItem.innerHTML = this._placeholderValue || '';
        }
      } else {
        this.input.placeholder = this._placeholderValue || '';
      }
    }
  };

  Choices.prototype._handleSearch = function (value) {
    if (!this.input.isFocussed) {
      return;
    }

    var choices = this._store.choices;
    var _a = this.config,
        searchFloor = _a.searchFloor,
        searchChoices = _a.searchChoices;
    var hasUnactiveChoices = choices.some(function (option) {
      return !option.active;
    }); // Check that we have a value to search and the input was an alphanumeric character

    if (value !== null && typeof value !== 'undefined' && value.length >= searchFloor) {
      var resultCount = searchChoices ? this._searchChoices(value) : 0; // Trigger search event

      this.passedElement.triggerEvent(constants_1.EVENTS.search, {
        value: value,
        resultCount: resultCount
      });
    } else if (hasUnactiveChoices) {
      // Otherwise reset choices to active
      this._isSearching = false;

      this._store.dispatch((0, choices_1.activateChoices)(true));
    }
  };

  Choices.prototype._canAddItem = function (activeItems, value) {
    var canAddItem = true;
    var notice = typeof this.config.addItemText === 'function' ? this.config.addItemText(value) : this.config.addItemText;

    if (!this._isSelectOneElement) {
      var isDuplicateValue = (0, utils_1.existsInArray)(activeItems, value);

      if (this.config.maxItemCount > 0 && this.config.maxItemCount <= activeItems.length) {
        // If there is a max entry limit and we have reached that limit
        // don't update
        canAddItem = false;
        notice = typeof this.config.maxItemText === 'function' ? this.config.maxItemText(this.config.maxItemCount) : this.config.maxItemText;
      }

      if (!this.config.duplicateItemsAllowed && isDuplicateValue && canAddItem) {
        canAddItem = false;
        notice = typeof this.config.uniqueItemText === 'function' ? this.config.uniqueItemText(value) : this.config.uniqueItemText;
      }

      if (this._isTextElement && this.config.addItems && canAddItem && typeof this.config.addItemFilter === 'function' && !this.config.addItemFilter(value)) {
        canAddItem = false;
        notice = typeof this.config.customAddItemText === 'function' ? this.config.customAddItemText(value) : this.config.customAddItemText;
      }
    }

    return {
      response: canAddItem,
      notice: notice
    };
  };

  Choices.prototype._searchChoices = function (value) {
    var newValue = typeof value === 'string' ? value.trim() : value;
    var currentValue = typeof this._currentValue === 'string' ? this._currentValue.trim() : this._currentValue;

    if (newValue.length < 1 && newValue === "".concat(currentValue, " ")) {
      return 0;
    } // If new value matches the desired length and is not the same as the current value with a space


    var haystack = this._store.searchableChoices;
    var needle = newValue;
    var options = Object.assign(this.config.fuseOptions, {
      keys: __spreadArray([], this.config.searchFields, true),
      includeMatches: true
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
    var documentElement = document.documentElement; // capture events - can cancel event processing or propagation

    documentElement.addEventListener('touchend', this._onTouchEnd, true);
    this.containerOuter.element.addEventListener('keydown', this._onKeyDown, true);
    this.containerOuter.element.addEventListener('mousedown', this._onMouseDown, true); // passive events - doesn't call `preventDefault` or `stopPropagation`

    documentElement.addEventListener('click', this._onClick, {
      passive: true
    });
    documentElement.addEventListener('touchmove', this._onTouchMove, {
      passive: true
    });
    this.dropdown.element.addEventListener('mouseover', this._onMouseOver, {
      passive: true
    });

    if (this._isSelectOneElement) {
      this.containerOuter.element.addEventListener('focus', this._onFocus, {
        passive: true
      });
      this.containerOuter.element.addEventListener('blur', this._onBlur, {
        passive: true
      });
    }

    this.input.element.addEventListener('keyup', this._onKeyUp, {
      passive: true
    });
    this.input.element.addEventListener('focus', this._onFocus, {
      passive: true
    });
    this.input.element.addEventListener('blur', this._onBlur, {
      passive: true
    });

    if (this.input.element.form) {
      this.input.element.form.addEventListener('reset', this._onFormReset, {
        passive: true
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
    var BACK_KEY = constants_1.KEY_CODES.BACK_KEY,
        DELETE_KEY = constants_1.KEY_CODES.DELETE_KEY,
        ENTER_KEY = constants_1.KEY_CODES.ENTER_KEY,
        A_KEY = constants_1.KEY_CODES.A_KEY,
        ESC_KEY = constants_1.KEY_CODES.ESC_KEY,
        UP_KEY = constants_1.KEY_CODES.UP_KEY,
        DOWN_KEY = constants_1.KEY_CODES.DOWN_KEY,
        PAGE_UP_KEY = constants_1.KEY_CODES.PAGE_UP_KEY,
        PAGE_DOWN_KEY = constants_1.KEY_CODES.PAGE_DOWN_KEY;

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
    var target = _a.target,
        keyCode = _a.keyCode;
    var value = this.input.value;
    var activeItems = this._store.activeItems;

    var canAddItem = this._canAddItem(activeItems, value);

    var backKey = constants_1.KEY_CODES.BACK_KEY,
        deleteKey = constants_1.KEY_CODES.DELETE_KEY; // We are typing into a text input and have a value, we want to show a dropdown
    // notice. Otherwise hide the dropdown

    if (this._isTextElement) {
      var canShowDropdownNotice = canAddItem.notice && value;

      if (canShowDropdownNotice) {
        var dropdownItem = this._getTemplate('notice', canAddItem.notice);

        this.dropdown.element.innerHTML = dropdownItem.outerHTML;
        this.showDropdown(true);
      } else {
        this.hideDropdown(true);
      }
    } else {
      var wasRemovalKeyCode = keyCode === backKey || keyCode === deleteKey;
      var userHasRemovedValue = wasRemovalKeyCode && target && !target.value;
      var canReactivateChoices = !this._isTextElement && this._isSearching;
      var canSearch = this._canSearch && canAddItem.response;

      if (userHasRemovedValue && canReactivateChoices) {
        this._isSearching = false;

        this._store.dispatch((0, choices_1.activateChoices)(true));
      } else if (canSearch) {
        this._handleSearch(this.input.rawValue);
      }
    }

    this._canSearch = this.config.searchEnabled;
  };

  Choices.prototype._onSelectKey = function (event, hasItems) {
    var ctrlKey = event.ctrlKey,
        metaKey = event.metaKey;
    var hasCtrlDownKeyPressed = ctrlKey || metaKey; // If CTRL + A or CMD + A have been pressed and there are items to select

    if (hasCtrlDownKeyPressed && hasItems) {
      this._canSearch = false;
      var shouldHightlightAll = this.config.removeItems && !this.input.value && this.input.element === document.activeElement;

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

        this._addItem({
          value: value
        });

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
    } else if (this._isSelectOneElement) {
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
    var keyCode = event.keyCode,
        metaKey = event.metaKey;
    var downKey = constants_1.KEY_CODES.DOWN_KEY,
        pageUpKey = constants_1.KEY_CODES.PAGE_UP_KEY,
        pageDownKey = constants_1.KEY_CODES.PAGE_DOWN_KEY; // If up or down key is pressed, traverse through options

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
        } else {
          nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
        }
      } else {
        var currentEl = this.dropdown.element.querySelector(".".concat(this.config.classNames.highlightedState));

        if (currentEl) {
          nextEl = (0, utils_1.getAdjacentEl)(currentEl, selectableChoiceIdentifier, directionInt);
        } else {
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
      } // Prevent default to maintain cursor position whilst
      // traversing dropdown options


      event.preventDefault();
    }
  };

  Choices.prototype._onDeleteKey = function (event, activeItems, hasFocusedInput) {
    var target = event.target; // If backspace or delete key is pressed and the input has no value

    if (!this._isSelectOneElement && !target.value && hasFocusedInput) {
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
      var containerWasExactTarget = target === this.containerOuter.element || target === this.containerInner.element;

      if (containerWasExactTarget) {
        if (this._isTextElement) {
          this.input.focus();
        } else if (this._isSelectMultipleElement) {
          this.showDropdown();
        }
      } // Prevents focus event firing


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
    } // If we have our mouse down on the scrollbar and are on IE11...


    if (IS_IE11 && this.choiceList.element.contains(target)) {
      // check if click was on a scrollbar area
      var firstChoice = this.choiceList.element.firstElementChild;
      var isOnScrollbar = this._direction === 'ltr' ? event.offsetX >= firstChoice.offsetWidth : event.offsetX < firstChoice.offsetLeft;
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
      } else if ('item' in dataset) {
        this._handleItemAction(activeItems, item, hasShiftKey);
      } else if ('choice' in dataset) {
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
        } else {
          this.showDropdown();
          this.containerOuter.focus();
        }
      } else if (this._isSelectOneElement && target !== this.input.element && !this.dropdown.element.contains(target)) {
        this.hideDropdown();
      }
    } else {
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

    var focusActions = (_b = {}, _b[constants_1.TEXT_TYPE] = function () {
      if (target === _this.input.element) {
        _this.containerOuter.addFocusState();
      }
    }, _b[constants_1.SELECT_ONE_TYPE] = function () {
      _this.containerOuter.addFocusState();

      if (target === _this.input.element) {
        _this.showDropdown(true);
      }
    }, _b[constants_1.SELECT_MULTIPLE_TYPE] = function () {
      if (target === _this.input.element) {
        _this.showDropdown(true); // If element is a select box, the focused element is the container and the dropdown
        // isn't already open, focus and show dropdown


        _this.containerOuter.addFocusState();
      }
    }, _b);
    focusActions[this.passedElement.element.type]();
  };

  Choices.prototype._onBlur = function (_a) {
    var _b;

    var _this = this;

    var target = _a.target;
    var blurWasWithinContainer = target && this.containerOuter.element.contains(target);

    if (blurWasWithinContainer && !this._isScrollingOnIe) {
      var activeItems = this._store.activeItems;
      var hasHighlightedItems_1 = activeItems.some(function (item) {
        return item.highlighted;
      });
      var blurActions = (_b = {}, _b[constants_1.TEXT_TYPE] = function () {
        if (target === _this.input.element) {
          _this.containerOuter.removeFocusState();

          if (hasHighlightedItems_1) {
            _this.unhighlightAll();
          }

          _this.hideDropdown(true);
        }
      }, _b[constants_1.SELECT_ONE_TYPE] = function () {
        _this.containerOuter.removeFocusState();

        if (target === _this.input.element || target === _this.containerOuter.element && !_this._canSearch) {
          _this.hideDropdown(true);
        }
      }, _b[constants_1.SELECT_MULTIPLE_TYPE] = function () {
        if (target === _this.input.element) {
          _this.containerOuter.removeFocusState();

          _this.hideDropdown(true);

          if (hasHighlightedItems_1) {
            _this.unhighlightAll();
          }
        }
      }, _b);
      blurActions[this.passedElement.element.type]();
    } else {
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

    if (el === void 0) {
      el = null;
    }

    var choices = Array.from(this.dropdown.element.querySelectorAll('[data-choice-selectable]'));

    if (!choices.length) {
      return;
    }

    var passedEl = el;
    var highlightedChoices = Array.from(this.dropdown.element.querySelectorAll(".".concat(this.config.classNames.highlightedState))); // Remove any highlighted choices

    highlightedChoices.forEach(function (choice) {
      choice.classList.remove(_this.config.classNames.highlightedState);
      choice.setAttribute('aria-selected', 'false');
    });

    if (passedEl) {
      this._highlightPosition = choices.indexOf(passedEl);
    } else {
      // Highlight choice based on last known highlight location
      if (choices.length > this._highlightPosition) {
        // If we have an option to highlight
        passedEl = choices[this._highlightPosition];
      } else {
        // Otherwise highlight the option before
        passedEl = choices[choices.length - 1];
      }

      if (!passedEl) {
        passedEl = choices[0];
      }
    }

    passedEl.classList.add(this.config.classNames.highlightedState);
    passedEl.setAttribute('aria-selected', 'true');
    this.passedElement.triggerEvent(constants_1.EVENTS.highlightChoice, {
      el: passedEl
    });

    if (this.dropdown.isActive) {
      // IE11 ignores aria-label and blocks virtual keyboard
      // if aria-activedescendant is set without a dropdown
      this.input.setActiveDescendant(passedEl.id);
      this.containerOuter.setActiveDescendant(passedEl.id);
    }
  };

  Choices.prototype._addItem = function (_a) {
    var value = _a.value,
        _b = _a.label,
        label = _b === void 0 ? null : _b,
        _c = _a.choiceId,
        choiceId = _c === void 0 ? -1 : _c,
        _d = _a.groupId,
        groupId = _d === void 0 ? -1 : _d,
        _e = _a.customProperties,
        customProperties = _e === void 0 ? {} : _e,
        _f = _a.placeholder,
        placeholder = _f === void 0 ? false : _f,
        _g = _a.keyCode,
        keyCode = _g === void 0 ? -1 : _g;
    var passedValue = typeof value === 'string' ? value.trim() : value;
    var items = this._store.items;
    var passedLabel = label || passedValue;
    var passedOptionId = choiceId || -1;
    var group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
    var id = items ? items.length + 1 : 1; // If a prepended value has been passed, prepend it

    if (this.config.prependValue) {
      passedValue = this.config.prependValue + passedValue.toString();
    } // If an appended value has been passed, append it


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
      keyCode: keyCode
    }));

    if (this._isSelectOneElement) {
      this.removeActiveItems(id);
    } // Trigger change event


    this.passedElement.triggerEvent(constants_1.EVENTS.addItem, {
      id: id,
      value: passedValue,
      label: passedLabel,
      customProperties: customProperties,
      groupValue: group && group.value ? group.value : null,
      keyCode: keyCode
    });
  };

  Choices.prototype._removeItem = function (item) {
    var id = item.id,
        value = item.value,
        label = item.label,
        customProperties = item.customProperties,
        choiceId = item.choiceId,
        groupId = item.groupId;
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
      groupValue: group && group.value ? group.value : null
    });
  };

  Choices.prototype._addChoice = function (_a) {
    var value = _a.value,
        _b = _a.label,
        label = _b === void 0 ? null : _b,
        _c = _a.isSelected,
        isSelected = _c === void 0 ? false : _c,
        _d = _a.isDisabled,
        isDisabled = _d === void 0 ? false : _d,
        _e = _a.groupId,
        groupId = _e === void 0 ? -1 : _e,
        _f = _a.customProperties,
        customProperties = _f === void 0 ? {} : _f,
        _g = _a.placeholder,
        placeholder = _g === void 0 ? false : _g,
        _h = _a.keyCode,
        keyCode = _h === void 0 ? -1 : _h;

    if (typeof value === 'undefined' || value === null) {
      return;
    } // Generate unique id


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
      keyCode: keyCode
    }));

    if (isSelected) {
      this._addItem({
        value: value,
        label: choiceLabel,
        choiceId: choiceId,
        customProperties: customProperties,
        placeholder: placeholder,
        keyCode: keyCode
      });
    }
  };

  Choices.prototype._addGroup = function (_a) {
    var _this = this;

    var group = _a.group,
        id = _a.id,
        _b = _a.valueKey,
        valueKey = _b === void 0 ? 'value' : _b,
        _c = _a.labelKey,
        labelKey = _c === void 0 ? 'label' : _c;
    var groupChoices = (0, utils_1.isType)('Object', group) ? group.choices : Array.from(group.getElementsByTagName('OPTION'));
    var groupId = id || Math.floor(new Date().valueOf() * Math.random());
    var isDisabled = group.disabled ? group.disabled : false;

    if (groupChoices) {
      this._store.dispatch((0, groups_1.addGroup)({
        value: group.label,
        id: groupId,
        active: true,
        disabled: isDisabled
      }));

      var addGroupChoices = function addGroupChoices(choice) {
        var isOptDisabled = choice.disabled || choice.parentNode && choice.parentNode.disabled;

        _this._addChoice({
          value: choice[valueKey],
          label: (0, utils_1.isType)('Object', choice) ? choice[labelKey] : choice.innerHTML,
          isSelected: choice.selected,
          isDisabled: isOptDisabled,
          groupId: groupId,
          customProperties: choice.customProperties,
          placeholder: choice.placeholder
        });
      };

      groupChoices.forEach(addGroupChoices);
    } else {
      this._store.dispatch((0, groups_1.addGroup)({
        value: group.label,
        id: group.id,
        active: false,
        disabled: group.disabled
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

    if (callbackOnCreateTemplates && typeof callbackOnCreateTemplates === 'function') {
      userTemplates = callbackOnCreateTemplates.call(this, utils_1.strToEl);
    }

    this._templates = (0, deepmerge_1.default)(templates_1.default, userTemplates);
  };

  Choices.prototype._createElements = function () {
    this.containerOuter = new components_1.Container({
      element: this._getTemplate('containerOuter', this._direction, this._isSelectElement, this._isSelectOneElement, this.config.searchEnabled, this.passedElement.element.type, this.config.labelId),
      classNames: this.config.classNames,
      type: this.passedElement.element.type,
      position: this.config.position
    });
    this.containerInner = new components_1.Container({
      element: this._getTemplate('containerInner'),
      classNames: this.config.classNames,
      type: this.passedElement.element.type,
      position: this.config.position
    });
    this.input = new components_1.Input({
      element: this._getTemplate('input', this._placeholderValue),
      classNames: this.config.classNames,
      type: this.passedElement.element.type,
      preventPaste: !this.config.paste
    });
    this.choiceList = new components_1.List({
      element: this._getTemplate('choiceList', this._isSelectOneElement)
    });
    this.itemList = new components_1.List({
      element: this._getTemplate('itemList', this._isSelectOneElement)
    });
    this.dropdown = new components_1.Dropdown({
      element: this._getTemplate('dropdown'),
      classNames: this.config.classNames,
      type: this.passedElement.element.type
    });
  };

  Choices.prototype._createStructure = function () {
    // Hide original element
    this.passedElement.conceal(); // Wrap input in container preserving DOM ordering

    this.containerInner.wrap(this.passedElement.element); // Wrapper inner container with outer container

    this.containerOuter.wrap(this.containerInner.element);

    if (this._isSelectOneElement) {
      this.input.placeholder = this.config.searchPlaceholderValue || '';
    } else if (this._placeholderValue) {
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
    } else if (this.config.searchEnabled) {
      this.dropdown.element.insertBefore(this.input.element, this.dropdown.element.firstChild);
    }

    if (this._isSelectElement) {
      this._highlightPosition = 0;
      this._isSearching = false;

      this._startLoading();

      if (this._presetGroups.length) {
        this._addPredefinedGroups(this._presetGroups);
      } else {
        this._addPredefinedChoices(this._presetChoices);
      }

      this._stopLoading();
    }

    if (this._isTextElement) {
      this._addPredefinedItems(this._presetItems);
    }
  };

  Choices.prototype._addPredefinedGroups = function (groups) {
    var _this = this; // If we have a placeholder option


    var placeholderChoice = this.passedElement.placeholderOption;

    if (placeholderChoice && placeholderChoice.parentNode && placeholderChoice.parentNode.tagName === 'SELECT') {
      this._addChoice({
        value: placeholderChoice.value,
        label: placeholderChoice.innerHTML,
        isSelected: placeholderChoice.selected,
        isDisabled: placeholderChoice.disabled,
        placeholder: true
      });
    }

    groups.forEach(function (group) {
      return _this._addGroup({
        group: group,
        id: group.id || null
      });
    });
  };

  Choices.prototype._addPredefinedChoices = function (choices) {
    var _this = this; // If sorting is enabled or the user is searching, filter choices


    if (this.config.shouldSort) {
      choices.sort(this.config.sorter);
    }

    var hasSelectedChoice = choices.some(function (choice) {
      return choice.selected;
    });
    var firstEnabledChoiceIndex = choices.findIndex(function (choice) {
      return choice.disabled === undefined || !choice.disabled;
    });
    choices.forEach(function (choice, index) {
      var _a = choice.value,
          value = _a === void 0 ? '' : _a,
          label = choice.label,
          customProperties = choice.customProperties,
          placeholder = choice.placeholder;

      if (_this._isSelectElement) {
        // If the choice is actually a group
        if (choice.choices) {
          _this._addGroup({
            group: choice,
            id: choice.id || null
          });
        } else {
          /**
           * If there is a selected choice already or the choice is not the first in
           * the array, add each choice normally.
           *
           * Otherwise we pre-select the first enabled choice in the array ("select-one" only)
           */
          var shouldPreselect = _this._isSelectOneElement && !hasSelectedChoice && index === firstEnabledChoiceIndex;
          var isSelected = shouldPreselect ? true : choice.selected;
          var isDisabled = choice.disabled;

          _this._addChoice({
            value: value,
            label: label,
            isSelected: !!isSelected,
            isDisabled: !!isDisabled,
            placeholder: !!placeholder,
            customProperties: customProperties
          });
        }
      } else {
        _this._addChoice({
          value: value,
          label: label,
          isSelected: !!choice.selected,
          isDisabled: !!choice.disabled,
          placeholder: !!choice.placeholder,
          customProperties: customProperties
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
          placeholder: item.placeholder
        });
      }

      if (typeof item === 'string') {
        _this._addItem({
          value: item
        });
      }
    });
  };

  Choices.prototype._setChoiceOrItem = function (item) {
    var _this = this;

    var itemType = (0, utils_1.getType)(item).toLowerCase();
    var handleType = {
      object: function object() {
        if (!item.value) {
          return;
        } // If we are dealing with a select input, we need to create an option first
        // that is then selected. For text inputs we can just add items normally.


        if (!_this._isTextElement) {
          _this._addChoice({
            value: item.value,
            label: item.label,
            isSelected: true,
            isDisabled: false,
            customProperties: item.customProperties,
            placeholder: item.placeholder
          });
        } else {
          _this._addItem({
            value: item.value,
            label: item.label,
            choiceId: item.id,
            customProperties: item.customProperties,
            placeholder: item.placeholder
          });
        }
      },
      string: function string() {
        if (!_this._isTextElement) {
          _this._addChoice({
            value: item,
            label: item,
            isSelected: true,
            isDisabled: false
          });
        } else {
          _this._addItem({
            value: item
          });
        }
      }
    };
    handleType[itemType]();
  };

  Choices.prototype._findAndSelectChoiceByValue = function (value) {
    var _this = this;

    var choices = this._store.choices; // Check 'value' property exists and the choice isn't already selected

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
        keyCode: foundChoice.keyCode
      });
    }
  };

  Choices.prototype._generatePlaceholderValue = function () {
    if (this._isSelectElement && this.passedElement.placeholderOption) {
      var placeholderOption = this.passedElement.placeholderOption;
      return placeholderOption ? placeholderOption.text : null;
    }

    var _a = this.config,
        placeholder = _a.placeholder,
        placeholderValue = _a.placeholderValue;
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
}();

exports["default"] = Choices;

/***/ }),

/***/ 613:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var utils_1 = __webpack_require__(799);

var constants_1 = __webpack_require__(883);

var Container =
/** @class */
function () {
  function Container(_a) {
    var element = _a.element,
        type = _a.type,
        classNames = _a.classNames,
        position = _a.position;
    this.element = element;
    this.classNames = classNames;
    this.type = type;
    this.position = position;
    this.isOpen = false;
    this.isFlipped = false;
    this.isFocussed = false;
    this.isDisabled = false;
    this.isLoading = false;
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  Container.prototype.addEventListeners = function () {
    this.element.addEventListener('focus', this._onFocus);
    this.element.addEventListener('blur', this._onBlur);
  };

  Container.prototype.removeEventListeners = function () {
    this.element.removeEventListener('focus', this._onFocus);
    this.element.removeEventListener('blur', this._onBlur);
  };
  /**
   * Determine whether container should be flipped based on passed
   * dropdown position
   */


  Container.prototype.shouldFlip = function (dropdownPos) {
    if (typeof dropdownPos !== 'number') {
      return false;
    } // If flip is enabled and the dropdown bottom position is
    // greater than the window height flip the dropdown.


    var shouldFlip = false;

    if (this.position === 'auto') {
      shouldFlip = !window.matchMedia("(min-height: ".concat(dropdownPos + 1, "px)")).matches;
    } else if (this.position === 'top') {
      shouldFlip = true;
    }

    return shouldFlip;
  };

  Container.prototype.setActiveDescendant = function (activeDescendantID) {
    this.element.setAttribute('aria-activedescendant', activeDescendantID);
  };

  Container.prototype.removeActiveDescendant = function () {
    this.element.removeAttribute('aria-activedescendant');
  };

  Container.prototype.open = function (dropdownPos) {
    this.element.classList.add(this.classNames.openState);
    this.element.setAttribute('aria-expanded', 'true');
    this.isOpen = true;

    if (this.shouldFlip(dropdownPos)) {
      this.element.classList.add(this.classNames.flippedState);
      this.isFlipped = true;
    }
  };

  Container.prototype.close = function () {
    this.element.classList.remove(this.classNames.openState);
    this.element.setAttribute('aria-expanded', 'false');
    this.removeActiveDescendant();
    this.isOpen = false; // A dropdown flips if it does not have space within the page

    if (this.isFlipped) {
      this.element.classList.remove(this.classNames.flippedState);
      this.isFlipped = false;
    }
  };

  Container.prototype.focus = function () {
    if (!this.isFocussed) {
      this.element.focus();
    }
  };

  Container.prototype.addFocusState = function () {
    this.element.classList.add(this.classNames.focusState);
  };

  Container.prototype.removeFocusState = function () {
    this.element.classList.remove(this.classNames.focusState);
  };

  Container.prototype.enable = function () {
    this.element.classList.remove(this.classNames.disabledState);
    this.element.removeAttribute('aria-disabled');

    if (this.type === constants_1.SELECT_ONE_TYPE) {
      this.element.setAttribute('tabindex', '0');
    }

    this.isDisabled = false;
  };

  Container.prototype.disable = function () {
    this.element.classList.add(this.classNames.disabledState);
    this.element.setAttribute('aria-disabled', 'true');

    if (this.type === constants_1.SELECT_ONE_TYPE) {
      this.element.setAttribute('tabindex', '-1');
    }

    this.isDisabled = true;
  };

  Container.prototype.wrap = function (element) {
    (0, utils_1.wrap)(element, this.element);
  };

  Container.prototype.unwrap = function (element) {
    if (this.element.parentNode) {
      // Move passed element outside this element
      this.element.parentNode.insertBefore(element, this.element); // Remove this element

      this.element.parentNode.removeChild(this.element);
    }
  };

  Container.prototype.addLoadingState = function () {
    this.element.classList.add(this.classNames.loadingState);
    this.element.setAttribute('aria-busy', 'true');
    this.isLoading = true;
  };

  Container.prototype.removeLoadingState = function () {
    this.element.classList.remove(this.classNames.loadingState);
    this.element.removeAttribute('aria-busy');
    this.isLoading = false;
  };

  Container.prototype._onFocus = function () {
    this.isFocussed = true;
  };

  Container.prototype._onBlur = function () {
    this.isFocussed = false;
  };

  return Container;
}();

exports["default"] = Container;

/***/ }),

/***/ 217:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var Dropdown =
/** @class */
function () {
  function Dropdown(_a) {
    var element = _a.element,
        type = _a.type,
        classNames = _a.classNames;
    this.element = element;
    this.classNames = classNames;
    this.type = type;
    this.isActive = false;
  }

  Object.defineProperty(Dropdown.prototype, "distanceFromTopWindow", {
    /**
     * Bottom position of dropdown in viewport coordinates
     */
    get: function get() {
      return this.element.getBoundingClientRect().bottom;
    },
    enumerable: false,
    configurable: true
  });

  Dropdown.prototype.getChild = function (selector) {
    return this.element.querySelector(selector);
  };
  /**
   * Show dropdown to user by adding active state class
   */


  Dropdown.prototype.show = function () {
    this.element.classList.add(this.classNames.activeState);
    this.element.setAttribute('aria-expanded', 'true');
    this.isActive = true;
    return this;
  };
  /**
   * Hide dropdown from user
   */


  Dropdown.prototype.hide = function () {
    this.element.classList.remove(this.classNames.activeState);
    this.element.setAttribute('aria-expanded', 'false');
    this.isActive = false;
    return this;
  };

  return Dropdown;
}();

exports["default"] = Dropdown;

/***/ }),

/***/ 520:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.WrappedSelect = exports.WrappedInput = exports.List = exports.Input = exports.Container = exports.Dropdown = void 0;

var dropdown_1 = __importDefault(__webpack_require__(217));

exports.Dropdown = dropdown_1.default;

var container_1 = __importDefault(__webpack_require__(613));

exports.Container = container_1.default;

var input_1 = __importDefault(__webpack_require__(11));

exports.Input = input_1.default;

var list_1 = __importDefault(__webpack_require__(624));

exports.List = list_1.default;

var wrapped_input_1 = __importDefault(__webpack_require__(541));

exports.WrappedInput = wrapped_input_1.default;

var wrapped_select_1 = __importDefault(__webpack_require__(982));

exports.WrappedSelect = wrapped_select_1.default;

/***/ }),

/***/ 11:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var utils_1 = __webpack_require__(799);

var constants_1 = __webpack_require__(883);

var Input =
/** @class */
function () {
  function Input(_a) {
    var element = _a.element,
        type = _a.type,
        classNames = _a.classNames,
        preventPaste = _a.preventPaste;
    this.element = element;
    this.type = type;
    this.classNames = classNames;
    this.preventPaste = preventPaste;
    this.isFocussed = this.element.isEqualNode(document.activeElement);
    this.isDisabled = element.disabled;
    this._onPaste = this._onPaste.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  Object.defineProperty(Input.prototype, "placeholder", {
    set: function set(placeholder) {
      this.element.placeholder = placeholder;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Input.prototype, "value", {
    get: function get() {
      return (0, utils_1.sanitise)(this.element.value);
    },
    set: function set(value) {
      this.element.value = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Input.prototype, "rawValue", {
    get: function get() {
      return this.element.value;
    },
    enumerable: false,
    configurable: true
  });

  Input.prototype.addEventListeners = function () {
    this.element.addEventListener('paste', this._onPaste);
    this.element.addEventListener('input', this._onInput, {
      passive: true
    });
    this.element.addEventListener('focus', this._onFocus, {
      passive: true
    });
    this.element.addEventListener('blur', this._onBlur, {
      passive: true
    });
  };

  Input.prototype.removeEventListeners = function () {
    this.element.removeEventListener('input', this._onInput);
    this.element.removeEventListener('paste', this._onPaste);
    this.element.removeEventListener('focus', this._onFocus);
    this.element.removeEventListener('blur', this._onBlur);
  };

  Input.prototype.enable = function () {
    this.element.removeAttribute('disabled');
    this.isDisabled = false;
  };

  Input.prototype.disable = function () {
    this.element.setAttribute('disabled', '');
    this.isDisabled = true;
  };

  Input.prototype.focus = function () {
    if (!this.isFocussed) {
      this.element.focus();
    }
  };

  Input.prototype.blur = function () {
    if (this.isFocussed) {
      this.element.blur();
    }
  };

  Input.prototype.clear = function (setWidth) {
    if (setWidth === void 0) {
      setWidth = true;
    }

    if (this.element.value) {
      this.element.value = '';
    }

    if (setWidth) {
      this.setWidth();
    }

    return this;
  };
  /**
   * Set the correct input width based on placeholder
   * value or input value
   */


  Input.prototype.setWidth = function () {
    // Resize input to contents or placeholder
    var _a = this.element,
        style = _a.style,
        value = _a.value,
        placeholder = _a.placeholder;
    style.minWidth = "".concat(placeholder.length + 1, "ch");
    style.width = "".concat(value.length + 1, "ch");
  };

  Input.prototype.setActiveDescendant = function (activeDescendantID) {
    this.element.setAttribute('aria-activedescendant', activeDescendantID);
  };

  Input.prototype.removeActiveDescendant = function () {
    this.element.removeAttribute('aria-activedescendant');
  };

  Input.prototype._onInput = function () {
    if (this.type !== constants_1.SELECT_ONE_TYPE) {
      this.setWidth();
    }
  };

  Input.prototype._onPaste = function (event) {
    if (this.preventPaste) {
      event.preventDefault();
    }
  };

  Input.prototype._onFocus = function () {
    this.isFocussed = true;
  };

  Input.prototype._onBlur = function () {
    this.isFocussed = false;
  };

  return Input;
}();

exports["default"] = Input;

/***/ }),

/***/ 624:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__(883);

var List =
/** @class */
function () {
  function List(_a) {
    var element = _a.element;
    this.element = element;
    this.scrollPos = this.element.scrollTop;
    this.height = this.element.offsetHeight;
  }

  List.prototype.clear = function () {
    this.element.innerHTML = '';
  };

  List.prototype.append = function (node) {
    this.element.appendChild(node);
  };

  List.prototype.getChild = function (selector) {
    return this.element.querySelector(selector);
  };

  List.prototype.hasChildren = function () {
    return this.element.hasChildNodes();
  };

  List.prototype.scrollToTop = function () {
    this.element.scrollTop = 0;
  };

  List.prototype.scrollToChildElement = function (element, direction) {
    var _this = this;

    if (!element) {
      return;
    }

    var listHeight = this.element.offsetHeight; // Scroll position of dropdown

    var listScrollPosition = this.element.scrollTop + listHeight;
    var elementHeight = element.offsetHeight; // Distance from bottom of element to top of parent

    var elementPos = element.offsetTop + elementHeight; // Difference between the element and scroll position

    var destination = direction > 0 ? this.element.scrollTop + elementPos - listScrollPosition : element.offsetTop;
    requestAnimationFrame(function () {
      _this._animateScroll(destination, direction);
    });
  };

  List.prototype._scrollDown = function (scrollPos, strength, destination) {
    var easing = (destination - scrollPos) / strength;
    var distance = easing > 1 ? easing : 1;
    this.element.scrollTop = scrollPos + distance;
  };

  List.prototype._scrollUp = function (scrollPos, strength, destination) {
    var easing = (scrollPos - destination) / strength;
    var distance = easing > 1 ? easing : 1;
    this.element.scrollTop = scrollPos - distance;
  };

  List.prototype._animateScroll = function (destination, direction) {
    var _this = this;

    var strength = constants_1.SCROLLING_SPEED;
    var choiceListScrollTop = this.element.scrollTop;
    var continueAnimation = false;

    if (direction > 0) {
      this._scrollDown(choiceListScrollTop, strength, destination);

      if (choiceListScrollTop < destination) {
        continueAnimation = true;
      }
    } else {
      this._scrollUp(choiceListScrollTop, strength, destination);

      if (choiceListScrollTop > destination) {
        continueAnimation = true;
      }
    }

    if (continueAnimation) {
      requestAnimationFrame(function () {
        _this._animateScroll(destination, direction);
      });
    }
  };

  return List;
}();

exports["default"] = List;

/***/ }),

/***/ 730:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var utils_1 = __webpack_require__(799);

var WrappedElement =
/** @class */
function () {
  function WrappedElement(_a) {
    var element = _a.element,
        classNames = _a.classNames;
    this.element = element;
    this.classNames = classNames;

    if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLSelectElement)) {
      throw new TypeError('Invalid element passed');
    }

    this.isDisabled = false;
  }

  Object.defineProperty(WrappedElement.prototype, "isActive", {
    get: function get() {
      return this.element.dataset.choice === 'active';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WrappedElement.prototype, "dir", {
    get: function get() {
      return this.element.dir;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WrappedElement.prototype, "value", {
    get: function get() {
      return this.element.value;
    },
    set: function set(value) {
      // you must define setter here otherwise it will be readonly property
      this.element.value = value;
    },
    enumerable: false,
    configurable: true
  });

  WrappedElement.prototype.conceal = function () {
    // Hide passed input
    this.element.classList.add(this.classNames.input);
    this.element.hidden = true; // Remove element from tab index

    this.element.tabIndex = -1; // Backup original styles if any

    var origStyle = this.element.getAttribute('style');

    if (origStyle) {
      this.element.setAttribute('data-choice-orig-style', origStyle);
    }

    this.element.setAttribute('data-choice', 'active');
  };

  WrappedElement.prototype.reveal = function () {
    // Reinstate passed element
    this.element.classList.remove(this.classNames.input);
    this.element.hidden = false;
    this.element.removeAttribute('tabindex'); // Recover original styles if any

    var origStyle = this.element.getAttribute('data-choice-orig-style');

    if (origStyle) {
      this.element.removeAttribute('data-choice-orig-style');
      this.element.setAttribute('style', origStyle);
    } else {
      this.element.removeAttribute('style');
    }

    this.element.removeAttribute('data-choice'); // Re-assign values - this is weird, I know
    // @todo Figure out why we need to do this

    this.element.value = this.element.value; // eslint-disable-line no-self-assign
  };

  WrappedElement.prototype.enable = function () {
    this.element.removeAttribute('disabled');
    this.element.disabled = false;
    this.isDisabled = false;
  };

  WrappedElement.prototype.disable = function () {
    this.element.setAttribute('disabled', '');
    this.element.disabled = true;
    this.isDisabled = true;
  };

  WrappedElement.prototype.triggerEvent = function (eventType, data) {
    (0, utils_1.dispatchEvent)(this.element, eventType, data);
  };

  return WrappedElement;
}();

exports["default"] = WrappedElement;

/***/ }),

/***/ 541:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var wrapped_element_1 = __importDefault(__webpack_require__(730));

var WrappedInput =
/** @class */
function (_super) {
  __extends(WrappedInput, _super);

  function WrappedInput(_a) {
    var element = _a.element,
        classNames = _a.classNames,
        delimiter = _a.delimiter;

    var _this = _super.call(this, {
      element: element,
      classNames: classNames
    }) || this;

    _this.delimiter = delimiter;
    return _this;
  }

  Object.defineProperty(WrappedInput.prototype, "value", {
    get: function get() {
      return this.element.value;
    },
    set: function set(value) {
      this.element.setAttribute('value', value);
      this.element.value = value;
    },
    enumerable: false,
    configurable: true
  });
  return WrappedInput;
}(wrapped_element_1.default);

exports["default"] = WrappedInput;

/***/ }),

/***/ 982:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var wrapped_element_1 = __importDefault(__webpack_require__(730));

var WrappedSelect =
/** @class */
function (_super) {
  __extends(WrappedSelect, _super);

  function WrappedSelect(_a) {
    var element = _a.element,
        classNames = _a.classNames,
        template = _a.template;

    var _this = _super.call(this, {
      element: element,
      classNames: classNames
    }) || this;

    _this.template = template;
    return _this;
  }

  Object.defineProperty(WrappedSelect.prototype, "placeholderOption", {
    get: function get() {
      return this.element.querySelector('option[value=""]') || // Backward compatibility layer for the non-standard placeholder attribute supported in older versions.
      this.element.querySelector('option[placeholder]');
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WrappedSelect.prototype, "optionGroups", {
    get: function get() {
      return Array.from(this.element.getElementsByTagName('OPTGROUP'));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WrappedSelect.prototype, "options", {
    get: function get() {
      return Array.from(this.element.options);
    },
    set: function set(options) {
      var _this = this;

      var fragment = document.createDocumentFragment();

      var addOptionToFragment = function addOptionToFragment(data) {
        // Create a standard select option
        var option = _this.template(data); // Append it to fragment


        fragment.appendChild(option);
      }; // Add each list item to list


      options.forEach(function (optionData) {
        return addOptionToFragment(optionData);
      });
      this.appendDocFragment(fragment);
    },
    enumerable: false,
    configurable: true
  });

  WrappedSelect.prototype.appendDocFragment = function (fragment) {
    this.element.innerHTML = '';
    this.element.appendChild(fragment);
  };

  return WrappedSelect;
}(wrapped_element_1.default);

exports["default"] = WrappedSelect;

/***/ }),

/***/ 883:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SCROLLING_SPEED = exports.SELECT_MULTIPLE_TYPE = exports.SELECT_ONE_TYPE = exports.TEXT_TYPE = exports.KEY_CODES = exports.ACTION_TYPES = exports.EVENTS = void 0;
exports.EVENTS = {
  showDropdown: 'showDropdown',
  hideDropdown: 'hideDropdown',
  change: 'change',
  choice: 'choice',
  search: 'search',
  addItem: 'addItem',
  removeItem: 'removeItem',
  highlightItem: 'highlightItem',
  highlightChoice: 'highlightChoice',
  unhighlightItem: 'unhighlightItem'
};
exports.ACTION_TYPES = {
  ADD_CHOICE: 'ADD_CHOICE',
  FILTER_CHOICES: 'FILTER_CHOICES',
  ACTIVATE_CHOICES: 'ACTIVATE_CHOICES',
  CLEAR_CHOICES: 'CLEAR_CHOICES',
  ADD_GROUP: 'ADD_GROUP',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  HIGHLIGHT_ITEM: 'HIGHLIGHT_ITEM',
  CLEAR_ALL: 'CLEAR_ALL',
  RESET_TO: 'RESET_TO',
  SET_IS_LOADING: 'SET_IS_LOADING'
};
exports.KEY_CODES = {
  BACK_KEY: 46,
  DELETE_KEY: 8,
  ENTER_KEY: 13,
  A_KEY: 65,
  ESC_KEY: 27,
  UP_KEY: 38,
  DOWN_KEY: 40,
  PAGE_UP_KEY: 33,
  PAGE_DOWN_KEY: 34
};
exports.TEXT_TYPE = 'text';
exports.SELECT_ONE_TYPE = 'select-one';
exports.SELECT_MULTIPLE_TYPE = 'select-multiple';
exports.SCROLLING_SPEED = 4;

/***/ }),

/***/ 789:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DEFAULT_CONFIG = exports.DEFAULT_CLASSNAMES = void 0;

var utils_1 = __webpack_require__(799);

exports.DEFAULT_CLASSNAMES = {
  containerOuter: 'choices',
  containerInner: 'choices__inner',
  input: 'choices__input',
  inputCloned: 'choices__input--cloned',
  list: 'choices__list',
  listItems: 'choices__list--multiple',
  listSingle: 'choices__list--single',
  listDropdown: 'choices__list--dropdown',
  item: 'choices__item',
  itemSelectable: 'choices__item--selectable',
  itemDisabled: 'choices__item--disabled',
  itemChoice: 'choices__item--choice',
  placeholder: 'choices__placeholder',
  group: 'choices__group',
  groupHeading: 'choices__heading',
  button: 'choices__button',
  activeState: 'is-active',
  focusState: 'is-focused',
  openState: 'is-open',
  disabledState: 'is-disabled',
  highlightedState: 'is-highlighted',
  selectedState: 'is-selected',
  flippedState: 'is-flipped',
  loadingState: 'is-loading',
  noResults: 'has-no-results',
  noChoices: 'has-no-choices'
};
exports.DEFAULT_CONFIG = {
  items: [],
  choices: [],
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  addItems: true,
  addItemFilter: null,
  removeItems: true,
  removeItemButton: false,
  editItems: false,
  allowHTML: true,
  duplicateItemsAllowed: true,
  delimiter: ',',
  paste: true,
  searchEnabled: true,
  searchChoices: true,
  searchFloor: 1,
  searchResultLimit: 4,
  searchFields: ['label', 'value'],
  position: 'auto',
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  sorter: utils_1.sortByAlpha,
  placeholder: true,
  placeholderValue: null,
  searchPlaceholderValue: null,
  prependValue: null,
  appendValue: null,
  renderSelectedChoices: 'auto',
  loadingText: 'Loading...',
  noResultsText: 'No results found',
  noChoicesText: 'No choices to choose from',
  itemSelectText: 'Press to select',
  uniqueItemText: 'Only unique values can be added',
  customAddItemText: 'Only values matching specific conditions can be added',
  addItemText: function addItemText(value) {
    return "Press Enter to add <b>\"".concat((0, utils_1.sanitise)(value), "\"</b>");
  },
  maxItemText: function maxItemText(maxItemCount) {
    return "Only ".concat(maxItemCount, " values can be added");
  },
  valueComparer: function valueComparer(value1, value2) {
    return value1 === value2;
  },
  fuseOptions: {
    includeScore: true
  },
  labelId: '',
  callbackOnInit: null,
  callbackOnCreateTemplates: null,
  classNames: exports.DEFAULT_CLASSNAMES
};

/***/ }),

/***/ 18:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 978:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 948:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 359:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 285:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 533:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 187:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(18), exports);

__exportStar(__webpack_require__(978), exports);

__exportStar(__webpack_require__(948), exports);

__exportStar(__webpack_require__(359), exports);

__exportStar(__webpack_require__(285), exports);

__exportStar(__webpack_require__(533), exports);

__exportStar(__webpack_require__(287), exports);

__exportStar(__webpack_require__(132), exports);

__exportStar(__webpack_require__(837), exports);

__exportStar(__webpack_require__(598), exports);

__exportStar(__webpack_require__(369), exports);

__exportStar(__webpack_require__(37), exports);

__exportStar(__webpack_require__(47), exports);

__exportStar(__webpack_require__(923), exports);

__exportStar(__webpack_require__(876), exports);

/***/ }),

/***/ 287:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 132:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 837:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 598:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 37:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 369:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 47:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 923:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 876:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 799:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.diff = exports.cloneObject = exports.existsInArray = exports.dispatchEvent = exports.sortByScore = exports.sortByAlpha = exports.strToEl = exports.sanitise = exports.isScrolledIntoView = exports.getAdjacentEl = exports.wrap = exports.isType = exports.getType = exports.generateId = exports.generateChars = exports.getRandomNumber = void 0;

var getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

exports.getRandomNumber = getRandomNumber;

var generateChars = function generateChars(length) {
  return Array.from({
    length: length
  }, function () {
    return (0, exports.getRandomNumber)(0, 36).toString(36);
  }).join('');
};

exports.generateChars = generateChars;

var generateId = function generateId(element, prefix) {
  var id = element.id || element.name && "".concat(element.name, "-").concat((0, exports.generateChars)(2)) || (0, exports.generateChars)(4);
  id = id.replace(/(:|\.|\[|\]|,)/g, '');
  id = "".concat(prefix, "-").concat(id);
  return id;
};

exports.generateId = generateId;

var getType = function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

exports.getType = getType;

var isType = function isType(type, obj) {
  return obj !== undefined && obj !== null && (0, exports.getType)(obj) === type;
};

exports.isType = isType;

var wrap = function wrap(element, wrapper) {
  if (wrapper === void 0) {
    wrapper = document.createElement('div');
  }

  if (element.parentNode) {
    if (element.nextSibling) {
      element.parentNode.insertBefore(wrapper, element.nextSibling);
    } else {
      element.parentNode.appendChild(wrapper);
    }
  }

  return wrapper.appendChild(element);
};

exports.wrap = wrap;

var getAdjacentEl = function getAdjacentEl(startEl, selector, direction) {
  if (direction === void 0) {
    direction = 1;
  }

  var prop = "".concat(direction > 0 ? 'next' : 'previous', "ElementSibling");
  var sibling = startEl[prop];

  while (sibling) {
    if (sibling.matches(selector)) {
      return sibling;
    }

    sibling = sibling[prop];
  }

  return sibling;
};

exports.getAdjacentEl = getAdjacentEl;

var isScrolledIntoView = function isScrolledIntoView(element, parent, direction) {
  if (direction === void 0) {
    direction = 1;
  }

  if (!element) {
    return false;
  }

  var isVisible;

  if (direction > 0) {
    // In view from bottom
    isVisible = parent.scrollTop + parent.offsetHeight >= element.offsetTop + element.offsetHeight;
  } else {
    // In view from top
    isVisible = element.offsetTop >= parent.scrollTop;
  }

  return isVisible;
};

exports.isScrolledIntoView = isScrolledIntoView;

var sanitise = function sanitise(value) {
  if (typeof value !== 'string') {
    return value;
  }

  return value.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};

exports.sanitise = sanitise;

exports.strToEl = function () {
  var tmpEl = document.createElement('div');
  return function (str) {
    var cleanedInput = str.trim();
    tmpEl.innerHTML = cleanedInput;
    var firldChild = tmpEl.children[0];

    while (tmpEl.firstChild) {
      tmpEl.removeChild(tmpEl.firstChild);
    }

    return firldChild;
  };
}();

var sortByAlpha = function sortByAlpha(_a, _b) {
  var value = _a.value,
      _c = _a.label,
      label = _c === void 0 ? value : _c;
  var value2 = _b.value,
      _d = _b.label,
      label2 = _d === void 0 ? value2 : _d;
  return label.localeCompare(label2, [], {
    sensitivity: 'base',
    ignorePunctuation: true,
    numeric: true
  });
};

exports.sortByAlpha = sortByAlpha;

var sortByScore = function sortByScore(a, b) {
  var _a = a.score,
      scoreA = _a === void 0 ? 0 : _a;
  var _b = b.score,
      scoreB = _b === void 0 ? 0 : _b;
  return scoreA - scoreB;
};

exports.sortByScore = sortByScore;

var dispatchEvent = function dispatchEvent(element, type, customArgs) {
  if (customArgs === void 0) {
    customArgs = null;
  }

  var event = new CustomEvent(type, {
    detail: customArgs,
    bubbles: true,
    cancelable: true
  });
  return element.dispatchEvent(event);
};

exports.dispatchEvent = dispatchEvent;

var existsInArray = function existsInArray(array, value, key) {
  if (key === void 0) {
    key = 'value';
  }

  return array.some(function (item) {
    if (typeof value === 'string') {
      return item[key] === value.trim();
    }

    return item[key] === value;
  });
};

exports.existsInArray = existsInArray;

var cloneObject = function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
};

exports.cloneObject = cloneObject;
/**
 * Returns an array of keys present on the first but missing on the second object
 */

var diff = function diff(a, b) {
  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();
  return aKeys.filter(function (i) {
    return bKeys.indexOf(i) < 0;
  });
};

exports.diff = diff;

/***/ }),

/***/ 273:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defaultState = void 0;
exports.defaultState = [];

function choices(state, action) {
  if (state === void 0) {
    state = exports.defaultState;
  }

  if (action === void 0) {
    action = {};
  }

  switch (action.type) {
    case 'ADD_CHOICE':
      {
        var addChoiceAction = action;
        var choice = {
          id: addChoiceAction.id,
          elementId: addChoiceAction.elementId,
          groupId: addChoiceAction.groupId,
          value: addChoiceAction.value,
          label: addChoiceAction.label || addChoiceAction.value,
          disabled: addChoiceAction.disabled || false,
          selected: false,
          active: true,
          score: 9999,
          customProperties: addChoiceAction.customProperties,
          placeholder: addChoiceAction.placeholder || false
        };
        /*
          A disabled choice appears in the choice dropdown but cannot be selected
          A selected choice has been added to the passed input's value (added as an item)
          An active choice appears within the choice dropdown
        */

        return __spreadArray(__spreadArray([], state, true), [choice], false);
      }

    case 'ADD_ITEM':
      {
        var addItemAction_1 = action; // When an item is added and it has an associated choice,
        // we want to disable it so it can't be chosen again

        if (addItemAction_1.choiceId > -1) {
          return state.map(function (obj) {
            var choice = obj;

            if (choice.id === parseInt("".concat(addItemAction_1.choiceId), 10)) {
              choice.selected = true;
            }

            return choice;
          });
        }

        return state;
      }

    case 'REMOVE_ITEM':
      {
        var removeItemAction_1 = action; // When an item is removed and it has an associated choice,
        // we want to re-enable it so it can be chosen again

        if (removeItemAction_1.choiceId && removeItemAction_1.choiceId > -1) {
          return state.map(function (obj) {
            var choice = obj;

            if (choice.id === parseInt("".concat(removeItemAction_1.choiceId), 10)) {
              choice.selected = false;
            }

            return choice;
          });
        }

        return state;
      }

    case 'FILTER_CHOICES':
      {
        var filterChoicesAction_1 = action;
        return state.map(function (obj) {
          var choice = obj; // Set active state based on whether choice is
          // within filtered results

          choice.active = filterChoicesAction_1.results.some(function (_a) {
            var item = _a.item,
                score = _a.score;

            if (item.id === choice.id) {
              choice.score = score;
              return true;
            }

            return false;
          });
          return choice;
        });
      }

    case 'ACTIVATE_CHOICES':
      {
        var activateChoicesAction_1 = action;
        return state.map(function (obj) {
          var choice = obj;
          choice.active = activateChoicesAction_1.active;
          return choice;
        });
      }

    case 'CLEAR_CHOICES':
      {
        return exports.defaultState;
      }

    default:
      {
        return state;
      }
  }
}

exports["default"] = choices;

/***/ }),

/***/ 871:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defaultState = void 0;
exports.defaultState = [];

function groups(state, action) {
  if (state === void 0) {
    state = exports.defaultState;
  }

  if (action === void 0) {
    action = {};
  }

  switch (action.type) {
    case 'ADD_GROUP':
      {
        var addGroupAction = action;
        return __spreadArray(__spreadArray([], state, true), [{
          id: addGroupAction.id,
          value: addGroupAction.value,
          active: addGroupAction.active,
          disabled: addGroupAction.disabled
        }], false);
      }

    case 'CLEAR_CHOICES':
      {
        return [];
      }

    default:
      {
        return state;
      }
  }
}

exports["default"] = groups;

/***/ }),

/***/ 655:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defaultState = void 0;

var redux_1 = __webpack_require__(857);

var items_1 = __importDefault(__webpack_require__(52));

var groups_1 = __importDefault(__webpack_require__(871));

var choices_1 = __importDefault(__webpack_require__(273));

var loading_1 = __importDefault(__webpack_require__(502));

var utils_1 = __webpack_require__(799);

exports.defaultState = {
  groups: [],
  items: [],
  choices: [],
  loading: false
};
var appReducer = (0, redux_1.combineReducers)({
  items: items_1.default,
  groups: groups_1.default,
  choices: choices_1.default,
  loading: loading_1.default
});

var rootReducer = function rootReducer(passedState, action) {
  var state = passedState; // If we are clearing all items, groups and options we reassign
  // state and then pass that state to our proper reducer. This isn't
  // mutating our actual state
  // See: http://stackoverflow.com/a/35641992

  if (action.type === 'CLEAR_ALL') {
    state = exports.defaultState;
  } else if (action.type === 'RESET_TO') {
    return (0, utils_1.cloneObject)(action.state);
  }

  return appReducer(state, action);
};

exports["default"] = rootReducer;

/***/ }),

/***/ 52:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defaultState = void 0;
exports.defaultState = [];

function items(state, action) {
  if (state === void 0) {
    state = exports.defaultState;
  }

  if (action === void 0) {
    action = {};
  }

  switch (action.type) {
    case 'ADD_ITEM':
      {
        var addItemAction = action; // Add object to items array

        var newState = __spreadArray(__spreadArray([], state, true), [{
          id: addItemAction.id,
          choiceId: addItemAction.choiceId,
          groupId: addItemAction.groupId,
          value: addItemAction.value,
          label: addItemAction.label,
          active: true,
          highlighted: false,
          customProperties: addItemAction.customProperties,
          placeholder: addItemAction.placeholder || false,
          keyCode: null
        }], false);

        return newState.map(function (obj) {
          var item = obj;
          item.highlighted = false;
          return item;
        });
      }

    case 'REMOVE_ITEM':
      {
        // Set item to inactive
        return state.map(function (obj) {
          var item = obj;

          if (item.id === action.id) {
            item.active = false;
          }

          return item;
        });
      }

    case 'HIGHLIGHT_ITEM':
      {
        var highlightItemAction_1 = action;
        return state.map(function (obj) {
          var item = obj;

          if (item.id === highlightItemAction_1.id) {
            item.highlighted = highlightItemAction_1.highlighted;
          }

          return item;
        });
      }

    default:
      {
        return state;
      }
  }
}

exports["default"] = items;

/***/ }),

/***/ 502:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defaultState = void 0;
exports.defaultState = false;

var general = function general(state, action) {
  if (state === void 0) {
    state = exports.defaultState;
  }

  if (action === void 0) {
    action = {};
  }

  switch (action.type) {
    case 'SET_IS_LOADING':
      {
        return action.isLoading;
      }

    default:
      {
        return state;
      }
  }
};

exports["default"] = general;

/***/ }),

/***/ 744:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/* eslint-disable @typescript-eslint/no-explicit-any */

var redux_1 = __webpack_require__(857);

var index_1 = __importDefault(__webpack_require__(655));

var Store =
/** @class */
function () {
  function Store() {
    this._store = (0, redux_1.createStore)(index_1.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  /**
   * Subscribe store to function call (wrapped Redux method)
   */


  Store.prototype.subscribe = function (onChange) {
    this._store.subscribe(onChange);
  };
  /**
   * Dispatch event to store (wrapped Redux method)
   */


  Store.prototype.dispatch = function (action) {
    this._store.dispatch(action);
  };

  Object.defineProperty(Store.prototype, "state", {
    /**
     * Get store object (wrapping Redux method)
     */
    get: function get() {
      return this._store.getState();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "items", {
    /**
     * Get items from store
     */
    get: function get() {
      return this.state.items;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "activeItems", {
    /**
     * Get active items from store
     */
    get: function get() {
      return this.items.filter(function (item) {
        return item.active === true;
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "highlightedActiveItems", {
    /**
     * Get highlighted items from store
     */
    get: function get() {
      return this.items.filter(function (item) {
        return item.active && item.highlighted;
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "choices", {
    /**
     * Get choices from store
     */
    get: function get() {
      return this.state.choices;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "activeChoices", {
    /**
     * Get active choices from store
     */
    get: function get() {
      return this.choices.filter(function (choice) {
        return choice.active === true;
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "selectableChoices", {
    /**
     * Get selectable choices from store
     */
    get: function get() {
      return this.choices.filter(function (choice) {
        return choice.disabled !== true;
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "searchableChoices", {
    /**
     * Get choices that can be searched (excluding placeholders)
     */
    get: function get() {
      return this.selectableChoices.filter(function (choice) {
        return choice.placeholder !== true;
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "placeholderChoice", {
    /**
     * Get placeholder choice from store
     */
    get: function get() {
      return __spreadArray([], this.choices, true).reverse().find(function (choice) {
        return choice.placeholder === true;
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "groups", {
    /**
     * Get groups from store
     */
    get: function get() {
      return this.state.groups;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Store.prototype, "activeGroups", {
    /**
     * Get active groups from store
     */
    get: function get() {
      var _a = this,
          groups = _a.groups,
          choices = _a.choices;

      return groups.filter(function (group) {
        var isActive = group.active === true && group.disabled === false;
        var hasActiveOptions = choices.some(function (choice) {
          return choice.active === true && choice.disabled === false;
        });
        return isActive && hasActiveOptions;
      }, []);
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Get loading state from store
   */

  Store.prototype.isLoading = function () {
    return this.state.loading;
  };
  /**
   * Get single choice by it's ID
   */


  Store.prototype.getChoiceById = function (id) {
    return this.activeChoices.find(function (choice) {
      return choice.id === parseInt(id, 10);
    });
  };
  /**
   * Get group by group id
   */


  Store.prototype.getGroupById = function (id) {
    return this.groups.find(function (group) {
      return group.id === id;
    });
  };

  return Store;
}();

exports["default"] = Store;

/***/ }),

/***/ 686:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

/**
 * Helpers to create HTML elements used by Choices
 * Can be overridden by providing `callbackOnCreateTemplates` option
 */

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var templates = {
  containerOuter: function containerOuter(_a, dir, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId) {
    var containerOuter = _a.classNames.containerOuter;
    var div = Object.assign(document.createElement('div'), {
      className: containerOuter
    });
    div.dataset.type = passedElementType;

    if (dir) {
      div.dir = dir;
    }

    if (isSelectOneElement) {
      div.tabIndex = 0;
    }

    if (isSelectElement) {
      div.setAttribute('role', searchEnabled ? 'combobox' : 'listbox');

      if (searchEnabled) {
        div.setAttribute('aria-autocomplete', 'list');
      }
    }

    div.setAttribute('aria-haspopup', 'true');
    div.setAttribute('aria-expanded', 'false');

    if (labelId) {
      div.setAttribute('aria-labelledby', labelId);
    }

    return div;
  },
  containerInner: function containerInner(_a) {
    var containerInner = _a.classNames.containerInner;
    return Object.assign(document.createElement('div'), {
      className: containerInner
    });
  },
  itemList: function itemList(_a, isSelectOneElement) {
    var _b = _a.classNames,
        list = _b.list,
        listSingle = _b.listSingle,
        listItems = _b.listItems;
    return Object.assign(document.createElement('div'), {
      className: "".concat(list, " ").concat(isSelectOneElement ? listSingle : listItems)
    });
  },
  placeholder: function placeholder(_a, value) {
    var _b;

    var allowHTML = _a.allowHTML,
        placeholder = _a.classNames.placeholder;
    return Object.assign(document.createElement('div'), (_b = {
      className: placeholder
    }, _b[allowHTML ? 'innerHTML' : 'innerText'] = value, _b));
  },
  item: function item(_a, _b, removeItemButton) {
    var _c, _d;

    var allowHTML = _a.allowHTML,
        _e = _a.classNames,
        item = _e.item,
        button = _e.button,
        highlightedState = _e.highlightedState,
        itemSelectable = _e.itemSelectable,
        placeholder = _e.placeholder;
    var id = _b.id,
        value = _b.value,
        label = _b.label,
        customProperties = _b.customProperties,
        active = _b.active,
        disabled = _b.disabled,
        highlighted = _b.highlighted,
        isPlaceholder = _b.placeholder;
    var div = Object.assign(document.createElement('div'), (_c = {
      className: item
    }, _c[allowHTML ? 'innerHTML' : 'innerText'] = label, _c));
    Object.assign(div.dataset, {
      item: '',
      id: id,
      value: value,
      customProperties: customProperties
    });

    if (active) {
      div.setAttribute('aria-selected', 'true');
    }

    if (disabled) {
      div.setAttribute('aria-disabled', 'true');
    }

    if (isPlaceholder) {
      div.classList.add(placeholder);
    }

    div.classList.add(highlighted ? highlightedState : itemSelectable);

    if (removeItemButton) {
      if (disabled) {
        div.classList.remove(itemSelectable);
      }

      div.dataset.deletable = '';
      /** @todo This MUST be localizable, not hardcoded! */

      var REMOVE_ITEM_TEXT = 'Remove item';
      var removeButton = Object.assign(document.createElement('button'), (_d = {
        type: 'button',
        className: button
      }, _d[allowHTML ? 'innerHTML' : 'innerText'] = REMOVE_ITEM_TEXT, _d));
      removeButton.setAttribute('aria-label', "".concat(REMOVE_ITEM_TEXT, ": '").concat(value, "'"));
      removeButton.dataset.button = '';
      div.appendChild(removeButton);
    }

    return div;
  },
  choiceList: function choiceList(_a, isSelectOneElement) {
    var list = _a.classNames.list;
    var div = Object.assign(document.createElement('div'), {
      className: list
    });

    if (!isSelectOneElement) {
      div.setAttribute('aria-multiselectable', 'true');
    }

    div.setAttribute('role', 'listbox');
    return div;
  },
  choiceGroup: function choiceGroup(_a, _b) {
    var _c;

    var allowHTML = _a.allowHTML,
        _d = _a.classNames,
        group = _d.group,
        groupHeading = _d.groupHeading,
        itemDisabled = _d.itemDisabled;
    var id = _b.id,
        value = _b.value,
        disabled = _b.disabled;
    var div = Object.assign(document.createElement('div'), {
      className: "".concat(group, " ").concat(disabled ? itemDisabled : '')
    });
    div.setAttribute('role', 'group');
    Object.assign(div.dataset, {
      group: '',
      id: id,
      value: value
    });

    if (disabled) {
      div.setAttribute('aria-disabled', 'true');
    }

    div.appendChild(Object.assign(document.createElement('div'), (_c = {
      className: groupHeading
    }, _c[allowHTML ? 'innerHTML' : 'innerText'] = value, _c)));
    return div;
  },
  choice: function choice(_a, _b, selectText) {
    var _c;

    var allowHTML = _a.allowHTML,
        _d = _a.classNames,
        item = _d.item,
        itemChoice = _d.itemChoice,
        itemSelectable = _d.itemSelectable,
        selectedState = _d.selectedState,
        itemDisabled = _d.itemDisabled,
        placeholder = _d.placeholder;
    var id = _b.id,
        value = _b.value,
        label = _b.label,
        groupId = _b.groupId,
        elementId = _b.elementId,
        isDisabled = _b.disabled,
        isSelected = _b.selected,
        isPlaceholder = _b.placeholder;
    var div = Object.assign(document.createElement('div'), (_c = {
      id: elementId
    }, _c[allowHTML ? 'innerHTML' : 'innerText'] = label, _c.className = "".concat(item, " ").concat(itemChoice), _c));

    if (isSelected) {
      div.classList.add(selectedState);
    }

    if (isPlaceholder) {
      div.classList.add(placeholder);
    }

    div.setAttribute('role', groupId && groupId > 0 ? 'treeitem' : 'option');
    Object.assign(div.dataset, {
      choice: '',
      id: id,
      value: value,
      selectText: selectText
    });

    if (isDisabled) {
      div.classList.add(itemDisabled);
      div.dataset.choiceDisabled = '';
      div.setAttribute('aria-disabled', 'true');
    } else {
      div.classList.add(itemSelectable);
      div.dataset.choiceSelectable = '';
    }

    return div;
  },
  input: function input(_a, placeholderValue) {
    var _b = _a.classNames,
        input = _b.input,
        inputCloned = _b.inputCloned;
    var inp = Object.assign(document.createElement('input'), {
      type: 'search',
      name: 'search_terms',
      className: "".concat(input, " ").concat(inputCloned),
      autocomplete: 'off',
      autocapitalize: 'off',
      spellcheck: false
    });
    inp.setAttribute('role', 'textbox');
    inp.setAttribute('aria-autocomplete', 'list');
    inp.setAttribute('aria-label', placeholderValue);
    return inp;
  },
  dropdown: function dropdown(_a) {
    var _b = _a.classNames,
        list = _b.list,
        listDropdown = _b.listDropdown;
    var div = document.createElement('div');
    div.classList.add(list, listDropdown);
    div.setAttribute('aria-expanded', 'false');
    return div;
  },
  notice: function notice(_a, innerText, type) {
    var _b;

    var allowHTML = _a.allowHTML,
        _c = _a.classNames,
        item = _c.item,
        itemChoice = _c.itemChoice,
        noResults = _c.noResults,
        noChoices = _c.noChoices;

    if (type === void 0) {
      type = '';
    }

    var classes = [item, itemChoice];

    if (type === 'no-choices') {
      classes.push(noChoices);
    } else if (type === 'no-results') {
      classes.push(noResults);
    }

    return Object.assign(document.createElement('div'), (_b = {}, _b[allowHTML ? 'innerHTML' : 'innerText'] = innerText, _b.className = classes.join(' '), _b));
  },
  option: function option(_a) {
    var label = _a.label,
        value = _a.value,
        customProperties = _a.customProperties,
        active = _a.active,
        disabled = _a.disabled;
    var opt = new Option(label, value, false, active);

    if (customProperties) {
      opt.dataset.customProperties = "".concat(customProperties);
    }

    opt.disabled = !!disabled;
    return opt;
  }
};
exports["default"] = templates;

/***/ }),

/***/ 996:
/***/ (function(module) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ 70:
/***/ (function(module) {

/**
 * Fuse.js v6.5.3 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2021 Kiro Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    Object.defineProperty(subClass, "prototype", {
      value: Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      }),
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function isArray(value) {
    return !Array.isArray ? getTag(value) === '[object Array]' : Array.isArray(value);
  } // Adapted from: https://github.com/lodash/lodash/blob/master/.internal/baseToString.js

  var INFINITY = 1 / 0;
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }
  function toString(value) {
    return value == null ? '' : baseToString(value);
  }
  function isString(value) {
    return typeof value === 'string';
  }
  function isNumber(value) {
    return typeof value === 'number';
  } // Adapted from: https://github.com/lodash/lodash/blob/master/isBoolean.js

  function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && getTag(value) == '[object Boolean]';
  }
  function isObject(value) {
    return _typeof(value) === 'object';
  } // Checks if `value` is object-like.

  function isObjectLike(value) {
    return isObject(value) && value !== null;
  }
  function isDefined(value) {
    return value !== undefined && value !== null;
  }
  function isBlank(value) {
    return !value.trim().length;
  } // Gets the `toStringTag` of `value`.
  // Adapted from: https://github.com/lodash/lodash/blob/master/.internal/getTag.js

  function getTag(value) {
    return value == null ? value === undefined ? '[object Undefined]' : '[object Null]' : Object.prototype.toString.call(value);
  }

  var EXTENDED_SEARCH_UNAVAILABLE = 'Extended search is not available';
  var INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
  var LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = function LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key) {
    return "Invalid value for key ".concat(key);
  };
  var PATTERN_LENGTH_TOO_LARGE = function PATTERN_LENGTH_TOO_LARGE(max) {
    return "Pattern length exceeds max of ".concat(max, ".");
  };
  var MISSING_KEY_PROPERTY = function MISSING_KEY_PROPERTY(name) {
    return "Missing ".concat(name, " property in key");
  };
  var INVALID_KEY_WEIGHT_VALUE = function INVALID_KEY_WEIGHT_VALUE(key) {
    return "Property 'weight' in key '".concat(key, "' must be a positive integer");
  };

  var hasOwn = Object.prototype.hasOwnProperty;

  var KeyStore = /*#__PURE__*/function () {
    function KeyStore(keys) {
      var _this = this;

      _classCallCheck(this, KeyStore);

      this._keys = [];
      this._keyMap = {};
      var totalWeight = 0;
      keys.forEach(function (key) {
        var obj = createKey(key);
        totalWeight += obj.weight;

        _this._keys.push(obj);

        _this._keyMap[obj.id] = obj;
        totalWeight += obj.weight;
      }); // Normalize weights so that their sum is equal to 1

      this._keys.forEach(function (key) {
        key.weight /= totalWeight;
      });
    }

    _createClass(KeyStore, [{
      key: "get",
      value: function get(keyId) {
        return this._keyMap[keyId];
      }
    }, {
      key: "keys",
      value: function keys() {
        return this._keys;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return JSON.stringify(this._keys);
      }
    }]);

    return KeyStore;
  }();
  function createKey(key) {
    var path = null;
    var id = null;
    var src = null;
    var weight = 1;

    if (isString(key) || isArray(key)) {
      src = key;
      path = createKeyPath(key);
      id = createKeyId(key);
    } else {
      if (!hasOwn.call(key, 'name')) {
        throw new Error(MISSING_KEY_PROPERTY('name'));
      }

      var name = key.name;
      src = name;

      if (hasOwn.call(key, 'weight')) {
        weight = key.weight;

        if (weight <= 0) {
          throw new Error(INVALID_KEY_WEIGHT_VALUE(name));
        }
      }

      path = createKeyPath(name);
      id = createKeyId(name);
    }

    return {
      path: path,
      id: id,
      weight: weight,
      src: src
    };
  }
  function createKeyPath(key) {
    return isArray(key) ? key : key.split('.');
  }
  function createKeyId(key) {
    return isArray(key) ? key.join('.') : key;
  }

  function get(obj, path) {
    var list = [];
    var arr = false;

    var deepGet = function deepGet(obj, path, index) {
      if (!isDefined(obj)) {
        return;
      }

      if (!path[index]) {
        // If there's no path left, we've arrived at the object we care about.
        list.push(obj);
      } else {
        var key = path[index];
        var value = obj[key];

        if (!isDefined(value)) {
          return;
        } // If we're at the last value in the path, and if it's a string/number/bool,
        // add it to the list


        if (index === path.length - 1 && (isString(value) || isNumber(value) || isBoolean(value))) {
          list.push(toString(value));
        } else if (isArray(value)) {
          arr = true; // Search each item in the array.

          for (var i = 0, len = value.length; i < len; i += 1) {
            deepGet(value[i], path, index + 1);
          }
        } else if (path.length) {
          // An object. Recurse further.
          deepGet(value, path, index + 1);
        }
      }
    }; // Backwards compatibility (since path used to be a string)


    deepGet(obj, isString(path) ? path.split('.') : path, 0);
    return arr ? list : list[0];
  }

  var MatchOptions = {
    // Whether the matches should be included in the result set. When `true`, each record in the result
    // set will include the indices of the matched characters.
    // These can consequently be used for highlighting purposes.
    includeMatches: false,
    // When `true`, the matching function will continue to the end of a search pattern even if
    // a perfect match has already been located in the string.
    findAllMatches: false,
    // Minimum number of characters that must be matched before a result is considered a match
    minMatchCharLength: 1
  };
  var BasicOptions = {
    // When `true`, the algorithm continues searching to the end of the input even if a perfect
    // match is found before the end of the same input.
    isCaseSensitive: false,
    // When true, the matching function will continue to the end of a search pattern even if
    includeScore: false,
    // List of properties that will be searched. This also supports nested properties.
    keys: [],
    // Whether to sort the result list, by score
    shouldSort: true,
    // Default sort function: sort by ascending score, ascending index
    sortFn: function sortFn(a, b) {
      return a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1;
    }
  };
  var FuzzyOptions = {
    // Approximately where in the text is the pattern expected to be found?
    location: 0,
    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
    // (of both letters and location), a threshold of '1.0' would match anything.
    threshold: 0.6,
    // Determines how close the match must be to the fuzzy location (specified above).
    // An exact letter match which is 'distance' characters away from the fuzzy location
    // would score as a complete mismatch. A distance of '0' requires the match be at
    // the exact location specified, a threshold of '1000' would require a perfect match
    // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
    distance: 100
  };
  var AdvancedOptions = {
    // When `true`, it enables the use of unix-like search commands
    useExtendedSearch: false,
    // The get function to use when fetching an object's properties.
    // The default will search nested paths *ie foo.bar.baz*
    getFn: get,
    // When `true`, search will ignore `location` and `distance`, so it won't matter
    // where in the string the pattern appears.
    // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
    ignoreLocation: false,
    // When `true`, the calculation for the relevance score (used for sorting) will
    // ignore the field-length norm.
    // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
    ignoreFieldNorm: false,
    // The weight to determine how much field length norm effects scoring.
    fieldNormWeight: 1
  };
  var Config = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, BasicOptions), MatchOptions), FuzzyOptions), AdvancedOptions);

  var SPACE = /[^ ]+/g; // Field-length norm: the shorter the field, the higher the weight.
  // Set to 3 decimals to reduce index size.

  function norm() {
    var weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var mantissa = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var cache = new Map();
    var m = Math.pow(10, mantissa);
    return {
      get: function get(value) {
        var numTokens = value.match(SPACE).length;

        if (cache.has(numTokens)) {
          return cache.get(numTokens);
        } // Default function is 1/sqrt(x), weight makes that variable


        var norm = 1 / Math.pow(numTokens, 0.5 * weight); // In place of `toFixed(mantissa)`, for faster computation

        var n = parseFloat(Math.round(norm * m) / m);
        cache.set(numTokens, n);
        return n;
      },
      clear: function clear() {
        cache.clear();
      }
    };
  }

  var FuseIndex = /*#__PURE__*/function () {
    function FuseIndex() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$getFn = _ref.getFn,
          getFn = _ref$getFn === void 0 ? Config.getFn : _ref$getFn,
          _ref$fieldNormWeight = _ref.fieldNormWeight,
          fieldNormWeight = _ref$fieldNormWeight === void 0 ? Config.fieldNormWeight : _ref$fieldNormWeight;

      _classCallCheck(this, FuseIndex);

      this.norm = norm(fieldNormWeight, 3);
      this.getFn = getFn;
      this.isCreated = false;
      this.setIndexRecords();
    }

    _createClass(FuseIndex, [{
      key: "setSources",
      value: function setSources() {
        var docs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        this.docs = docs;
      }
    }, {
      key: "setIndexRecords",
      value: function setIndexRecords() {
        var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        this.records = records;
      }
    }, {
      key: "setKeys",
      value: function setKeys() {
        var _this = this;

        var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        this.keys = keys;
        this._keysMap = {};
        keys.forEach(function (key, idx) {
          _this._keysMap[key.id] = idx;
        });
      }
    }, {
      key: "create",
      value: function create() {
        var _this2 = this;

        if (this.isCreated || !this.docs.length) {
          return;
        }

        this.isCreated = true; // List is Array<String>

        if (isString(this.docs[0])) {
          this.docs.forEach(function (doc, docIndex) {
            _this2._addString(doc, docIndex);
          });
        } else {
          // List is Array<Object>
          this.docs.forEach(function (doc, docIndex) {
            _this2._addObject(doc, docIndex);
          });
        }

        this.norm.clear();
      } // Adds a doc to the end of the index

    }, {
      key: "add",
      value: function add(doc) {
        var idx = this.size();

        if (isString(doc)) {
          this._addString(doc, idx);
        } else {
          this._addObject(doc, idx);
        }
      } // Removes the doc at the specified index of the index

    }, {
      key: "removeAt",
      value: function removeAt(idx) {
        this.records.splice(idx, 1); // Change ref index of every subsquent doc

        for (var i = idx, len = this.size(); i < len; i += 1) {
          this.records[i].i -= 1;
        }
      }
    }, {
      key: "getValueForItemAtKeyId",
      value: function getValueForItemAtKeyId(item, keyId) {
        return item[this._keysMap[keyId]];
      }
    }, {
      key: "size",
      value: function size() {
        return this.records.length;
      }
    }, {
      key: "_addString",
      value: function _addString(doc, docIndex) {
        if (!isDefined(doc) || isBlank(doc)) {
          return;
        }

        var record = {
          v: doc,
          i: docIndex,
          n: this.norm.get(doc)
        };
        this.records.push(record);
      }
    }, {
      key: "_addObject",
      value: function _addObject(doc, docIndex) {
        var _this3 = this;

        var record = {
          i: docIndex,
          $: {}
        }; // Iterate over every key (i.e, path), and fetch the value at that key

        this.keys.forEach(function (key, keyIndex) {
          // console.log(key)
          var value = _this3.getFn(doc, key.path);

          if (!isDefined(value)) {
            return;
          }

          if (isArray(value)) {
            (function () {
              var subRecords = [];
              var stack = [{
                nestedArrIndex: -1,
                value: value
              }];

              while (stack.length) {
                var _stack$pop = stack.pop(),
                    nestedArrIndex = _stack$pop.nestedArrIndex,
                    _value = _stack$pop.value;

                if (!isDefined(_value)) {
                  continue;
                }

                if (isString(_value) && !isBlank(_value)) {
                  var subRecord = {
                    v: _value,
                    i: nestedArrIndex,
                    n: _this3.norm.get(_value)
                  };
                  subRecords.push(subRecord);
                } else if (isArray(_value)) {
                  _value.forEach(function (item, k) {
                    stack.push({
                      nestedArrIndex: k,
                      value: item
                    });
                  });
                } else ;
              }

              record.$[keyIndex] = subRecords;
            })();
          } else if (!isBlank(value)) {
            var subRecord = {
              v: value,
              n: _this3.norm.get(value)
            };
            record.$[keyIndex] = subRecord;
          }
        });
        this.records.push(record);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          keys: this.keys,
          records: this.records
        };
      }
    }]);

    return FuseIndex;
  }();
  function createIndex(keys, docs) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref2$getFn = _ref2.getFn,
        getFn = _ref2$getFn === void 0 ? Config.getFn : _ref2$getFn,
        _ref2$fieldNormWeight = _ref2.fieldNormWeight,
        fieldNormWeight = _ref2$fieldNormWeight === void 0 ? Config.fieldNormWeight : _ref2$fieldNormWeight;

    var myIndex = new FuseIndex({
      getFn: getFn,
      fieldNormWeight: fieldNormWeight
    });
    myIndex.setKeys(keys.map(createKey));
    myIndex.setSources(docs);
    myIndex.create();
    return myIndex;
  }
  function parseIndex(data) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref3$getFn = _ref3.getFn,
        getFn = _ref3$getFn === void 0 ? Config.getFn : _ref3$getFn,
        _ref3$fieldNormWeight = _ref3.fieldNormWeight,
        fieldNormWeight = _ref3$fieldNormWeight === void 0 ? Config.fieldNormWeight : _ref3$fieldNormWeight;

    var keys = data.keys,
        records = data.records;
    var myIndex = new FuseIndex({
      getFn: getFn,
      fieldNormWeight: fieldNormWeight
    });
    myIndex.setKeys(keys);
    myIndex.setIndexRecords(records);
    return myIndex;
  }

  function computeScore$1(pattern) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$errors = _ref.errors,
        errors = _ref$errors === void 0 ? 0 : _ref$errors,
        _ref$currentLocation = _ref.currentLocation,
        currentLocation = _ref$currentLocation === void 0 ? 0 : _ref$currentLocation,
        _ref$expectedLocation = _ref.expectedLocation,
        expectedLocation = _ref$expectedLocation === void 0 ? 0 : _ref$expectedLocation,
        _ref$distance = _ref.distance,
        distance = _ref$distance === void 0 ? Config.distance : _ref$distance,
        _ref$ignoreLocation = _ref.ignoreLocation,
        ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;

    var accuracy = errors / pattern.length;

    if (ignoreLocation) {
      return accuracy;
    }

    var proximity = Math.abs(expectedLocation - currentLocation);

    if (!distance) {
      // Dodge divide by zero error.
      return proximity ? 1.0 : accuracy;
    }

    return accuracy + proximity / distance;
  }

  function convertMaskToIndices() {
    var matchmask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var minMatchCharLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Config.minMatchCharLength;
    var indices = [];
    var start = -1;
    var end = -1;
    var i = 0;

    for (var len = matchmask.length; i < len; i += 1) {
      var match = matchmask[i];

      if (match && start === -1) {
        start = i;
      } else if (!match && start !== -1) {
        end = i - 1;

        if (end - start + 1 >= minMatchCharLength) {
          indices.push([start, end]);
        }

        start = -1;
      }
    } // (i-1 - start) + 1 => i - start


    if (matchmask[i - 1] && i - start >= minMatchCharLength) {
      indices.push([start, i - 1]);
    }

    return indices;
  }

  // Machine word size
  var MAX_BITS = 32;

  function search(text, pattern, patternAlphabet) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref$location = _ref.location,
        location = _ref$location === void 0 ? Config.location : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === void 0 ? Config.distance : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng,
        _ref$includeMatches = _ref.includeMatches,
        includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches,
        _ref$ignoreLocation = _ref.ignoreLocation,
        ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;

    if (pattern.length > MAX_BITS) {
      throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS));
    }

    var patternLen = pattern.length; // Set starting location at beginning text and initialize the alphabet.

    var textLen = text.length; // Handle the case when location > text.length

    var expectedLocation = Math.max(0, Math.min(location, textLen)); // Highest score beyond which we give up.

    var currentThreshold = threshold; // Is there a nearby exact match? (speedup)

    var bestLocation = expectedLocation; // Performance: only computer matches when the minMatchCharLength > 1
    // OR if `includeMatches` is true.

    var computeMatches = minMatchCharLength > 1 || includeMatches; // A mask of the matches, used for building the indices

    var matchMask = computeMatches ? Array(textLen) : [];
    var index; // Get all exact matches, here for speed up

    while ((index = text.indexOf(pattern, bestLocation)) > -1) {
      var score = computeScore$1(pattern, {
        currentLocation: index,
        expectedLocation: expectedLocation,
        distance: distance,
        ignoreLocation: ignoreLocation
      });
      currentThreshold = Math.min(score, currentThreshold);
      bestLocation = index + patternLen;

      if (computeMatches) {
        var i = 0;

        while (i < patternLen) {
          matchMask[index + i] = 1;
          i += 1;
        }
      }
    } // Reset the best location


    bestLocation = -1;
    var lastBitArr = [];
    var finalScore = 1;
    var binMax = patternLen + textLen;
    var mask = 1 << patternLen - 1;

    for (var _i = 0; _i < patternLen; _i += 1) {
      // Scan for the best match; each iteration allows for one more error.
      // Run a binary search to determine how far from the match location we can stray
      // at this error level.
      var binMin = 0;
      var binMid = binMax;

      while (binMin < binMid) {
        var _score2 = computeScore$1(pattern, {
          errors: _i,
          currentLocation: expectedLocation + binMid,
          expectedLocation: expectedLocation,
          distance: distance,
          ignoreLocation: ignoreLocation
        });

        if (_score2 <= currentThreshold) {
          binMin = binMid;
        } else {
          binMax = binMid;
        }

        binMid = Math.floor((binMax - binMin) / 2 + binMin);
      } // Use the result from this iteration as the maximum for the next.


      binMax = binMid;
      var start = Math.max(1, expectedLocation - binMid + 1);
      var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen; // Initialize the bit array

      var bitArr = Array(finish + 2);
      bitArr[finish + 1] = (1 << _i) - 1;

      for (var j = finish; j >= start; j -= 1) {
        var currentLocation = j - 1;
        var charMatch = patternAlphabet[text.charAt(currentLocation)];

        if (computeMatches) {
          // Speed up: quick bool to int conversion (i.e, `charMatch ? 1 : 0`)
          matchMask[currentLocation] = +!!charMatch;
        } // First pass: exact match


        bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch; // Subsequent passes: fuzzy match

        if (_i) {
          bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
        }

        if (bitArr[j] & mask) {
          finalScore = computeScore$1(pattern, {
            errors: _i,
            currentLocation: currentLocation,
            expectedLocation: expectedLocation,
            distance: distance,
            ignoreLocation: ignoreLocation
          }); // This match will almost certainly be better than any existing match.
          // But check anyway.

          if (finalScore <= currentThreshold) {
            // Indeed it is
            currentThreshold = finalScore;
            bestLocation = currentLocation; // Already passed `loc`, downhill from here on in.

            if (bestLocation <= expectedLocation) {
              break;
            } // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.


            start = Math.max(1, 2 * expectedLocation - bestLocation);
          }
        }
      } // No hope for a (better) match at greater error levels.


      var _score = computeScore$1(pattern, {
        errors: _i + 1,
        currentLocation: expectedLocation,
        expectedLocation: expectedLocation,
        distance: distance,
        ignoreLocation: ignoreLocation
      });

      if (_score > currentThreshold) {
        break;
      }

      lastBitArr = bitArr;
    }

    var result = {
      isMatch: bestLocation >= 0,
      // Count exact matches (those with a score of 0) to be "almost" exact
      score: Math.max(0.001, finalScore)
    };

    if (computeMatches) {
      var indices = convertMaskToIndices(matchMask, minMatchCharLength);

      if (!indices.length) {
        result.isMatch = false;
      } else if (includeMatches) {
        result.indices = indices;
      }
    }

    return result;
  }

  function createPatternAlphabet(pattern) {
    var mask = {};

    for (var i = 0, len = pattern.length; i < len; i += 1) {
      var _char = pattern.charAt(i);

      mask[_char] = (mask[_char] || 0) | 1 << len - i - 1;
    }

    return mask;
  }

  var BitapSearch = /*#__PURE__*/function () {
    function BitapSearch(pattern) {
      var _this = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$location = _ref.location,
          location = _ref$location === void 0 ? Config.location : _ref$location,
          _ref$threshold = _ref.threshold,
          threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold,
          _ref$distance = _ref.distance,
          distance = _ref$distance === void 0 ? Config.distance : _ref$distance,
          _ref$includeMatches = _ref.includeMatches,
          includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches,
          _ref$findAllMatches = _ref.findAllMatches,
          findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches,
          _ref$minMatchCharLeng = _ref.minMatchCharLength,
          minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng,
          _ref$isCaseSensitive = _ref.isCaseSensitive,
          isCaseSensitive = _ref$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref$isCaseSensitive,
          _ref$ignoreLocation = _ref.ignoreLocation,
          ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;

      _classCallCheck(this, BitapSearch);

      this.options = {
        location: location,
        threshold: threshold,
        distance: distance,
        includeMatches: includeMatches,
        findAllMatches: findAllMatches,
        minMatchCharLength: minMatchCharLength,
        isCaseSensitive: isCaseSensitive,
        ignoreLocation: ignoreLocation
      };
      this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
      this.chunks = [];

      if (!this.pattern.length) {
        return;
      }

      var addChunk = function addChunk(pattern, startIndex) {
        _this.chunks.push({
          pattern: pattern,
          alphabet: createPatternAlphabet(pattern),
          startIndex: startIndex
        });
      };

      var len = this.pattern.length;

      if (len > MAX_BITS) {
        var i = 0;
        var remainder = len % MAX_BITS;
        var end = len - remainder;

        while (i < end) {
          addChunk(this.pattern.substr(i, MAX_BITS), i);
          i += MAX_BITS;
        }

        if (remainder) {
          var startIndex = len - MAX_BITS;
          addChunk(this.pattern.substr(startIndex), startIndex);
        }
      } else {
        addChunk(this.pattern, 0);
      }
    }

    _createClass(BitapSearch, [{
      key: "searchIn",
      value: function searchIn(text) {
        var _this$options = this.options,
            isCaseSensitive = _this$options.isCaseSensitive,
            includeMatches = _this$options.includeMatches;

        if (!isCaseSensitive) {
          text = text.toLowerCase();
        } // Exact match


        if (this.pattern === text) {
          var _result = {
            isMatch: true,
            score: 0
          };

          if (includeMatches) {
            _result.indices = [[0, text.length - 1]];
          }

          return _result;
        } // Otherwise, use Bitap algorithm


        var _this$options2 = this.options,
            location = _this$options2.location,
            distance = _this$options2.distance,
            threshold = _this$options2.threshold,
            findAllMatches = _this$options2.findAllMatches,
            minMatchCharLength = _this$options2.minMatchCharLength,
            ignoreLocation = _this$options2.ignoreLocation;
        var allIndices = [];
        var totalScore = 0;
        var hasMatches = false;
        this.chunks.forEach(function (_ref2) {
          var pattern = _ref2.pattern,
              alphabet = _ref2.alphabet,
              startIndex = _ref2.startIndex;

          var _search = search(text, pattern, alphabet, {
            location: location + startIndex,
            distance: distance,
            threshold: threshold,
            findAllMatches: findAllMatches,
            minMatchCharLength: minMatchCharLength,
            includeMatches: includeMatches,
            ignoreLocation: ignoreLocation
          }),
              isMatch = _search.isMatch,
              score = _search.score,
              indices = _search.indices;

          if (isMatch) {
            hasMatches = true;
          }

          totalScore += score;

          if (isMatch && indices) {
            allIndices = [].concat(_toConsumableArray(allIndices), _toConsumableArray(indices));
          }
        });
        var result = {
          isMatch: hasMatches,
          score: hasMatches ? totalScore / this.chunks.length : 1
        };

        if (hasMatches && includeMatches) {
          result.indices = allIndices;
        }

        return result;
      }
    }]);

    return BitapSearch;
  }();

  var BaseMatch = /*#__PURE__*/function () {
    function BaseMatch(pattern) {
      _classCallCheck(this, BaseMatch);

      this.pattern = pattern;
    }

    _createClass(BaseMatch, [{
      key: "search",
      value: function
        /*text*/
      search() {}
    }], [{
      key: "isMultiMatch",
      value: function isMultiMatch(pattern) {
        return getMatch(pattern, this.multiRegex);
      }
    }, {
      key: "isSingleMatch",
      value: function isSingleMatch(pattern) {
        return getMatch(pattern, this.singleRegex);
      }
    }]);

    return BaseMatch;
  }();

  function getMatch(pattern, exp) {
    var matches = pattern.match(exp);
    return matches ? matches[1] : null;
  }

  var ExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(ExactMatch, _BaseMatch);

    var _super = _createSuper(ExactMatch);

    function ExactMatch(pattern) {
      _classCallCheck(this, ExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(ExactMatch, [{
      key: "search",
      value: function search(text) {
        var isMatch = text === this.pattern;
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, this.pattern.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^="(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^=(.*)$/;
      }
    }]);

    return ExactMatch;
  }(BaseMatch);

  var InverseExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(InverseExactMatch, _BaseMatch);

    var _super = _createSuper(InverseExactMatch);

    function InverseExactMatch(pattern) {
      _classCallCheck(this, InverseExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(InverseExactMatch, [{
      key: "search",
      value: function search(text) {
        var index = text.indexOf(this.pattern);
        var isMatch = index === -1;
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, text.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'inverse-exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^!"(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^!(.*)$/;
      }
    }]);

    return InverseExactMatch;
  }(BaseMatch);

  var PrefixExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(PrefixExactMatch, _BaseMatch);

    var _super = _createSuper(PrefixExactMatch);

    function PrefixExactMatch(pattern) {
      _classCallCheck(this, PrefixExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(PrefixExactMatch, [{
      key: "search",
      value: function search(text) {
        var isMatch = text.startsWith(this.pattern);
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, this.pattern.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'prefix-exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^\^"(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^\^(.*)$/;
      }
    }]);

    return PrefixExactMatch;
  }(BaseMatch);

  var InversePrefixExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(InversePrefixExactMatch, _BaseMatch);

    var _super = _createSuper(InversePrefixExactMatch);

    function InversePrefixExactMatch(pattern) {
      _classCallCheck(this, InversePrefixExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(InversePrefixExactMatch, [{
      key: "search",
      value: function search(text) {
        var isMatch = !text.startsWith(this.pattern);
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, text.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'inverse-prefix-exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^!\^"(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^!\^(.*)$/;
      }
    }]);

    return InversePrefixExactMatch;
  }(BaseMatch);

  var SuffixExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(SuffixExactMatch, _BaseMatch);

    var _super = _createSuper(SuffixExactMatch);

    function SuffixExactMatch(pattern) {
      _classCallCheck(this, SuffixExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(SuffixExactMatch, [{
      key: "search",
      value: function search(text) {
        var isMatch = text.endsWith(this.pattern);
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [text.length - this.pattern.length, text.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'suffix-exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^"(.*)"\$$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^(.*)\$$/;
      }
    }]);

    return SuffixExactMatch;
  }(BaseMatch);

  var InverseSuffixExactMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(InverseSuffixExactMatch, _BaseMatch);

    var _super = _createSuper(InverseSuffixExactMatch);

    function InverseSuffixExactMatch(pattern) {
      _classCallCheck(this, InverseSuffixExactMatch);

      return _super.call(this, pattern);
    }

    _createClass(InverseSuffixExactMatch, [{
      key: "search",
      value: function search(text) {
        var isMatch = !text.endsWith(this.pattern);
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, text.length - 1]
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'inverse-suffix-exact';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^!"(.*)"\$$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^!(.*)\$$/;
      }
    }]);

    return InverseSuffixExactMatch;
  }(BaseMatch);

  var FuzzyMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(FuzzyMatch, _BaseMatch);

    var _super = _createSuper(FuzzyMatch);

    function FuzzyMatch(pattern) {
      var _this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$location = _ref.location,
          location = _ref$location === void 0 ? Config.location : _ref$location,
          _ref$threshold = _ref.threshold,
          threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold,
          _ref$distance = _ref.distance,
          distance = _ref$distance === void 0 ? Config.distance : _ref$distance,
          _ref$includeMatches = _ref.includeMatches,
          includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches,
          _ref$findAllMatches = _ref.findAllMatches,
          findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches,
          _ref$minMatchCharLeng = _ref.minMatchCharLength,
          minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng,
          _ref$isCaseSensitive = _ref.isCaseSensitive,
          isCaseSensitive = _ref$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref$isCaseSensitive,
          _ref$ignoreLocation = _ref.ignoreLocation,
          ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;

      _classCallCheck(this, FuzzyMatch);

      _this = _super.call(this, pattern);
      _this._bitapSearch = new BitapSearch(pattern, {
        location: location,
        threshold: threshold,
        distance: distance,
        includeMatches: includeMatches,
        findAllMatches: findAllMatches,
        minMatchCharLength: minMatchCharLength,
        isCaseSensitive: isCaseSensitive,
        ignoreLocation: ignoreLocation
      });
      return _this;
    }

    _createClass(FuzzyMatch, [{
      key: "search",
      value: function search(text) {
        return this._bitapSearch.searchIn(text);
      }
    }], [{
      key: "type",
      get: function get() {
        return 'fuzzy';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^"(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^(.*)$/;
      }
    }]);

    return FuzzyMatch;
  }(BaseMatch);

  var IncludeMatch = /*#__PURE__*/function (_BaseMatch) {
    _inherits(IncludeMatch, _BaseMatch);

    var _super = _createSuper(IncludeMatch);

    function IncludeMatch(pattern) {
      _classCallCheck(this, IncludeMatch);

      return _super.call(this, pattern);
    }

    _createClass(IncludeMatch, [{
      key: "search",
      value: function search(text) {
        var location = 0;
        var index;
        var indices = [];
        var patternLen = this.pattern.length; // Get all exact matches

        while ((index = text.indexOf(this.pattern, location)) > -1) {
          location = index + patternLen;
          indices.push([index, location - 1]);
        }

        var isMatch = !!indices.length;
        return {
          isMatch: isMatch,
          score: isMatch ? 0 : 1,
          indices: indices
        };
      }
    }], [{
      key: "type",
      get: function get() {
        return 'include';
      }
    }, {
      key: "multiRegex",
      get: function get() {
        return /^'"(.*)"$/;
      }
    }, {
      key: "singleRegex",
      get: function get() {
        return /^'(.*)$/;
      }
    }]);

    return IncludeMatch;
  }(BaseMatch);

  var searchers = [ExactMatch, IncludeMatch, PrefixExactMatch, InversePrefixExactMatch, InverseSuffixExactMatch, SuffixExactMatch, InverseExactMatch, FuzzyMatch];
  var searchersLen = searchers.length; // Regex to split by spaces, but keep anything in quotes together

  var SPACE_RE = / +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/;
  var OR_TOKEN = '|'; // Return a 2D array representation of the query, for simpler parsing.
  // Example:
  // "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]

  function parseQuery(pattern) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return pattern.split(OR_TOKEN).map(function (item) {
      var query = item.trim().split(SPACE_RE).filter(function (item) {
        return item && !!item.trim();
      });
      var results = [];

      for (var i = 0, len = query.length; i < len; i += 1) {
        var queryItem = query[i]; // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)

        var found = false;
        var idx = -1;

        while (!found && ++idx < searchersLen) {
          var searcher = searchers[idx];
          var token = searcher.isMultiMatch(queryItem);

          if (token) {
            results.push(new searcher(token, options));
            found = true;
          }
        }

        if (found) {
          continue;
        } // 2. Handle single query matches (i.e, once that are *not* quoted)


        idx = -1;

        while (++idx < searchersLen) {
          var _searcher = searchers[idx];

          var _token = _searcher.isSingleMatch(queryItem);

          if (_token) {
            results.push(new _searcher(_token, options));
            break;
          }
        }
      }

      return results;
    });
  }

  // to a singl match

  var MultiMatchSet = new Set([FuzzyMatch.type, IncludeMatch.type]);
  /**
   * Command-like searching
   * ======================
   *
   * Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
   * search in a given text.
   *
   * Search syntax:
   *
   * | Token       | Match type                 | Description                            |
   * | ----------- | -------------------------- | -------------------------------------- |
   * | `jscript`   | fuzzy-match                | Items that fuzzy match `jscript`       |
   * | `=scheme`   | exact-match                | Items that are `scheme`                |
   * | `'python`   | include-match              | Items that include `python`            |
   * | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
   * | `^java`     | prefix-exact-match         | Items that start with `java`           |
   * | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
   * | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
   * | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
   *
   * A single pipe character acts as an OR operator. For example, the following
   * query matches entries that start with `core` and end with either`go`, `rb`,
   * or`py`.
   *
   * ```
   * ^core go$ | rb$ | py$
   * ```
   */

  var ExtendedSearch = /*#__PURE__*/function () {
    function ExtendedSearch(pattern) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$isCaseSensitive = _ref.isCaseSensitive,
          isCaseSensitive = _ref$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref$isCaseSensitive,
          _ref$includeMatches = _ref.includeMatches,
          includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches,
          _ref$minMatchCharLeng = _ref.minMatchCharLength,
          minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng,
          _ref$ignoreLocation = _ref.ignoreLocation,
          ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation,
          _ref$findAllMatches = _ref.findAllMatches,
          findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches,
          _ref$location = _ref.location,
          location = _ref$location === void 0 ? Config.location : _ref$location,
          _ref$threshold = _ref.threshold,
          threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold,
          _ref$distance = _ref.distance,
          distance = _ref$distance === void 0 ? Config.distance : _ref$distance;

      _classCallCheck(this, ExtendedSearch);

      this.query = null;
      this.options = {
        isCaseSensitive: isCaseSensitive,
        includeMatches: includeMatches,
        minMatchCharLength: minMatchCharLength,
        findAllMatches: findAllMatches,
        ignoreLocation: ignoreLocation,
        location: location,
        threshold: threshold,
        distance: distance
      };
      this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
      this.query = parseQuery(this.pattern, this.options);
    }

    _createClass(ExtendedSearch, [{
      key: "searchIn",
      value: function searchIn(text) {
        var query = this.query;

        if (!query) {
          return {
            isMatch: false,
            score: 1
          };
        }

        var _this$options = this.options,
            includeMatches = _this$options.includeMatches,
            isCaseSensitive = _this$options.isCaseSensitive;
        text = isCaseSensitive ? text : text.toLowerCase();
        var numMatches = 0;
        var allIndices = [];
        var totalScore = 0; // ORs

        for (var i = 0, qLen = query.length; i < qLen; i += 1) {
          var searchers = query[i]; // Reset indices

          allIndices.length = 0;
          numMatches = 0; // ANDs

          for (var j = 0, pLen = searchers.length; j < pLen; j += 1) {
            var searcher = searchers[j];

            var _searcher$search = searcher.search(text),
                isMatch = _searcher$search.isMatch,
                indices = _searcher$search.indices,
                score = _searcher$search.score;

            if (isMatch) {
              numMatches += 1;
              totalScore += score;

              if (includeMatches) {
                var type = searcher.constructor.type;

                if (MultiMatchSet.has(type)) {
                  allIndices = [].concat(_toConsumableArray(allIndices), _toConsumableArray(indices));
                } else {
                  allIndices.push(indices);
                }
              }
            } else {
              totalScore = 0;
              numMatches = 0;
              allIndices.length = 0;
              break;
            }
          } // OR condition, so if TRUE, return


          if (numMatches) {
            var result = {
              isMatch: true,
              score: totalScore / numMatches
            };

            if (includeMatches) {
              result.indices = allIndices;
            }

            return result;
          }
        } // Nothing was matched


        return {
          isMatch: false,
          score: 1
        };
      }
    }], [{
      key: "condition",
      value: function condition(_, options) {
        return options.useExtendedSearch;
      }
    }]);

    return ExtendedSearch;
  }();

  var registeredSearchers = [];
  function register() {
    registeredSearchers.push.apply(registeredSearchers, arguments);
  }
  function createSearcher(pattern, options) {
    for (var i = 0, len = registeredSearchers.length; i < len; i += 1) {
      var searcherClass = registeredSearchers[i];

      if (searcherClass.condition(pattern, options)) {
        return new searcherClass(pattern, options);
      }
    }

    return new BitapSearch(pattern, options);
  }

  var LogicalOperator = {
    AND: '$and',
    OR: '$or'
  };
  var KeyType = {
    PATH: '$path',
    PATTERN: '$val'
  };

  var isExpression = function isExpression(query) {
    return !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
  };

  var isPath = function isPath(query) {
    return !!query[KeyType.PATH];
  };

  var isLeaf = function isLeaf(query) {
    return !isArray(query) && isObject(query) && !isExpression(query);
  };

  var convertToExplicit = function convertToExplicit(query) {
    return _defineProperty({}, LogicalOperator.AND, Object.keys(query).map(function (key) {
      return _defineProperty({}, key, query[key]);
    }));
  }; // When `auto` is `true`, the parse function will infer and initialize and add
  // the appropriate `Searcher` instance


  function parse(query, options) {
    var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref3$auto = _ref3.auto,
        auto = _ref3$auto === void 0 ? true : _ref3$auto;

    var next = function next(query) {
      var keys = Object.keys(query);
      var isQueryPath = isPath(query);

      if (!isQueryPath && keys.length > 1 && !isExpression(query)) {
        return next(convertToExplicit(query));
      }

      if (isLeaf(query)) {
        var key = isQueryPath ? query[KeyType.PATH] : keys[0];
        var pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];

        if (!isString(pattern)) {
          throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
        }

        var obj = {
          keyId: createKeyId(key),
          pattern: pattern
        };

        if (auto) {
          obj.searcher = createSearcher(pattern, options);
        }

        return obj;
      }

      var node = {
        children: [],
        operator: keys[0]
      };
      keys.forEach(function (key) {
        var value = query[key];

        if (isArray(value)) {
          value.forEach(function (item) {
            node.children.push(next(item));
          });
        }
      });
      return node;
    };

    if (!isExpression(query)) {
      query = convertToExplicit(query);
    }

    return next(query);
  }

  function computeScore(results, _ref) {
    var _ref$ignoreFieldNorm = _ref.ignoreFieldNorm,
        ignoreFieldNorm = _ref$ignoreFieldNorm === void 0 ? Config.ignoreFieldNorm : _ref$ignoreFieldNorm;
    results.forEach(function (result) {
      var totalScore = 1;
      result.matches.forEach(function (_ref2) {
        var key = _ref2.key,
            norm = _ref2.norm,
            score = _ref2.score;
        var weight = key ? key.weight : null;
        totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm));
      });
      result.score = totalScore;
    });
  }

  function transformMatches(result, data) {
    var matches = result.matches;
    data.matches = [];

    if (!isDefined(matches)) {
      return;
    }

    matches.forEach(function (match) {
      if (!isDefined(match.indices) || !match.indices.length) {
        return;
      }

      var indices = match.indices,
          value = match.value;
      var obj = {
        indices: indices,
        value: value
      };

      if (match.key) {
        obj.key = match.key.src;
      }

      if (match.idx > -1) {
        obj.refIndex = match.idx;
      }

      data.matches.push(obj);
    });
  }

  function transformScore(result, data) {
    data.score = result.score;
  }

  function format(results, docs) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$includeMatches = _ref.includeMatches,
        includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches,
        _ref$includeScore = _ref.includeScore,
        includeScore = _ref$includeScore === void 0 ? Config.includeScore : _ref$includeScore;

    var transformers = [];
    if (includeMatches) transformers.push(transformMatches);
    if (includeScore) transformers.push(transformScore);
    return results.map(function (result) {
      var idx = result.idx;
      var data = {
        item: docs[idx],
        refIndex: idx
      };

      if (transformers.length) {
        transformers.forEach(function (transformer) {
          transformer(result, data);
        });
      }

      return data;
    });
  }

  var Fuse$1 = /*#__PURE__*/function () {
    function Fuse(docs) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var index = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck(this, Fuse);

      this.options = _objectSpread2(_objectSpread2({}, Config), options);

      if (this.options.useExtendedSearch && !true) {}

      this._keyStore = new KeyStore(this.options.keys);
      this.setCollection(docs, index);
    }

    _createClass(Fuse, [{
      key: "setCollection",
      value: function setCollection(docs, index) {
        this._docs = docs;

        if (index && !(index instanceof FuseIndex)) {
          throw new Error(INCORRECT_INDEX_TYPE);
        }

        this._myIndex = index || createIndex(this.options.keys, this._docs, {
          getFn: this.options.getFn,
          fieldNormWeight: this.options.fieldNormWeight
        });
      }
    }, {
      key: "add",
      value: function add(doc) {
        if (!isDefined(doc)) {
          return;
        }

        this._docs.push(doc);

        this._myIndex.add(doc);
      }
    }, {
      key: "remove",
      value: function remove() {
        var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function
          /* doc, idx */
        () {
          return false;
        };
        var results = [];

        for (var i = 0, len = this._docs.length; i < len; i += 1) {
          var doc = this._docs[i];

          if (predicate(doc, i)) {
            this.removeAt(i);
            i -= 1;
            len -= 1;
            results.push(doc);
          }
        }

        return results;
      }
    }, {
      key: "removeAt",
      value: function removeAt(idx) {
        this._docs.splice(idx, 1);

        this._myIndex.removeAt(idx);
      }
    }, {
      key: "getIndex",
      value: function getIndex() {
        return this._myIndex;
      }
    }, {
      key: "search",
      value: function search(query) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$limit = _ref.limit,
            limit = _ref$limit === void 0 ? -1 : _ref$limit;

        var _this$options = this.options,
            includeMatches = _this$options.includeMatches,
            includeScore = _this$options.includeScore,
            shouldSort = _this$options.shouldSort,
            sortFn = _this$options.sortFn,
            ignoreFieldNorm = _this$options.ignoreFieldNorm;
        var results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
        computeScore(results, {
          ignoreFieldNorm: ignoreFieldNorm
        });

        if (shouldSort) {
          results.sort(sortFn);
        }

        if (isNumber(limit) && limit > -1) {
          results = results.slice(0, limit);
        }

        return format(results, this._docs, {
          includeMatches: includeMatches,
          includeScore: includeScore
        });
      }
    }, {
      key: "_searchStringList",
      value: function _searchStringList(query) {
        var searcher = createSearcher(query, this.options);
        var records = this._myIndex.records;
        var results = []; // Iterate over every string in the index

        records.forEach(function (_ref2) {
          var text = _ref2.v,
              idx = _ref2.i,
              norm = _ref2.n;

          if (!isDefined(text)) {
            return;
          }

          var _searcher$searchIn = searcher.searchIn(text),
              isMatch = _searcher$searchIn.isMatch,
              score = _searcher$searchIn.score,
              indices = _searcher$searchIn.indices;

          if (isMatch) {
            results.push({
              item: text,
              idx: idx,
              matches: [{
                score: score,
                value: text,
                norm: norm,
                indices: indices
              }]
            });
          }
        });
        return results;
      }
    }, {
      key: "_searchLogical",
      value: function _searchLogical(query) {
        var _this = this;

        var expression = parse(query, this.options);

        var evaluate = function evaluate(node, item, idx) {
          if (!node.children) {
            var keyId = node.keyId,
                searcher = node.searcher;

            var matches = _this._findMatches({
              key: _this._keyStore.get(keyId),
              value: _this._myIndex.getValueForItemAtKeyId(item, keyId),
              searcher: searcher
            });

            if (matches && matches.length) {
              return [{
                idx: idx,
                item: item,
                matches: matches
              }];
            }

            return [];
          }

          var res = [];

          for (var i = 0, len = node.children.length; i < len; i += 1) {
            var child = node.children[i];
            var result = evaluate(child, item, idx);

            if (result.length) {
              res.push.apply(res, _toConsumableArray(result));
            } else if (node.operator === LogicalOperator.AND) {
              return [];
            }
          }

          return res;
        };

        var records = this._myIndex.records;
        var resultMap = {};
        var results = [];
        records.forEach(function (_ref3) {
          var item = _ref3.$,
              idx = _ref3.i;

          if (isDefined(item)) {
            var expResults = evaluate(expression, item, idx);

            if (expResults.length) {
              // Dedupe when adding
              if (!resultMap[idx]) {
                resultMap[idx] = {
                  idx: idx,
                  item: item,
                  matches: []
                };
                results.push(resultMap[idx]);
              }

              expResults.forEach(function (_ref4) {
                var _resultMap$idx$matche;

                var matches = _ref4.matches;

                (_resultMap$idx$matche = resultMap[idx].matches).push.apply(_resultMap$idx$matche, _toConsumableArray(matches));
              });
            }
          }
        });
        return results;
      }
    }, {
      key: "_searchObjectList",
      value: function _searchObjectList(query) {
        var _this2 = this;

        var searcher = createSearcher(query, this.options);
        var _this$_myIndex = this._myIndex,
            keys = _this$_myIndex.keys,
            records = _this$_myIndex.records;
        var results = []; // List is Array<Object>

        records.forEach(function (_ref5) {
          var item = _ref5.$,
              idx = _ref5.i;

          if (!isDefined(item)) {
            return;
          }

          var matches = []; // Iterate over every key (i.e, path), and fetch the value at that key

          keys.forEach(function (key, keyIndex) {
            matches.push.apply(matches, _toConsumableArray(_this2._findMatches({
              key: key,
              value: item[keyIndex],
              searcher: searcher
            })));
          });

          if (matches.length) {
            results.push({
              idx: idx,
              item: item,
              matches: matches
            });
          }
        });
        return results;
      }
    }, {
      key: "_findMatches",
      value: function _findMatches(_ref6) {
        var key = _ref6.key,
            value = _ref6.value,
            searcher = _ref6.searcher;

        if (!isDefined(value)) {
          return [];
        }

        var matches = [];

        if (isArray(value)) {
          value.forEach(function (_ref7) {
            var text = _ref7.v,
                idx = _ref7.i,
                norm = _ref7.n;

            if (!isDefined(text)) {
              return;
            }

            var _searcher$searchIn2 = searcher.searchIn(text),
                isMatch = _searcher$searchIn2.isMatch,
                score = _searcher$searchIn2.score,
                indices = _searcher$searchIn2.indices;

            if (isMatch) {
              matches.push({
                score: score,
                key: key,
                value: text,
                idx: idx,
                norm: norm,
                indices: indices
              });
            }
          });
        } else {
          var text = value.v,
              norm = value.n;

          var _searcher$searchIn3 = searcher.searchIn(text),
              isMatch = _searcher$searchIn3.isMatch,
              score = _searcher$searchIn3.score,
              indices = _searcher$searchIn3.indices;

          if (isMatch) {
            matches.push({
              score: score,
              key: key,
              value: text,
              norm: norm,
              indices: indices
            });
          }
        }

        return matches;
      }
    }]);

    return Fuse;
  }();

  Fuse$1.version = '6.5.3';
  Fuse$1.createIndex = createIndex;
  Fuse$1.parseIndex = parseIndex;
  Fuse$1.config = Config;

  {
    Fuse$1.parseQuery = parse;
  }

  {
    register(ExtendedSearch);
  }

  var Fuse = Fuse$1;

  return Fuse;

}));


/***/ }),

/***/ 857:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "__DO_NOT_USE__ActionTypes": function() { return /* binding */ ActionTypes; },
  "applyMiddleware": function() { return /* binding */ applyMiddleware; },
  "bindActionCreators": function() { return /* binding */ bindActionCreators; },
  "combineReducers": function() { return /* binding */ combineReducers; },
  "compose": function() { return /* binding */ compose; },
  "createStore": function() { return /* binding */ createStore; }
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}
;// CONCATENATED MODULE: ./node_modules/redux/es/redux.js


/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = (function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
})();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }

  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);

  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other


  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}

function kindOf(val) {
  var typeOfVal = typeof val;

  if (false) {}

  return typeOfVal;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error( true ? formatProdErrorMessage(0) : 0);
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(1) : 0);
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error( true ? formatProdErrorMessage(2) : 0);
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(3) : 0);
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error( true ? formatProdErrorMessage(4) : 0);
    }

    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(5) : 0);
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error( true ? formatProdErrorMessage(6) : 0);
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error( true ? formatProdErrorMessage(7) : 0);
    }

    if (typeof action.type === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(8) : 0);
    }

    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(9) : 0);
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(10) : 0);
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error( true ? formatProdErrorMessage(11) : 0);
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(12) : 0);
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(13) : 0);
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (false) {}

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (false) {}

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (false) { var warningMessage; }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error( true ? formatProdErrorMessage(14) : 0);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error( true ? formatProdErrorMessage(16) : 0);
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error( true ? formatProdErrorMessage(15) : 0);
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2(_objectSpread2({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (false) {}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/* harmony import */ var _scripts_choices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(373);
/* harmony import */ var _scripts_choices__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scripts_choices__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(187);
/* harmony import */ var _scripts_interfaces__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scripts_interfaces__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scripts_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(883);
/* harmony import */ var _scripts_defaults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(789);
/* harmony import */ var _scripts_templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(686);







/* harmony default export */ __webpack_exports__["default"] = ((_scripts_choices__WEBPACK_IMPORTED_MODULE_0___default()));

}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});