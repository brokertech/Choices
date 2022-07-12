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
/* eslint-disable @typescript-eslint/no-explicit-any */
var redux_1 = require("redux");
var index_1 = __importDefault(require("../reducers/index"));
var Store = /** @class */ (function () {
    function Store() {
        this._store = (0, redux_1.createStore)(index_1.default, window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__());
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
        get: function () {
            return this._store.getState();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "items", {
        /**
         * Get items from store
         */
        get: function () {
            return this.state.items;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "activeItems", {
        /**
         * Get active items from store
         */
        get: function () {
            return this.items.filter(function (item) { return item.active === true; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "highlightedActiveItems", {
        /**
         * Get highlighted items from store
         */
        get: function () {
            return this.items.filter(function (item) { return item.active && item.highlighted; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "choices", {
        /**
         * Get choices from store
         */
        get: function () {
            return this.state.choices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "activeChoices", {
        /**
         * Get active choices from store
         */
        get: function () {
            return this.choices.filter(function (choice) { return choice.active === true; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "selectableChoices", {
        /**
         * Get selectable choices from store
         */
        get: function () {
            return this.choices.filter(function (choice) { return choice.disabled !== true; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "searchableChoices", {
        /**
         * Get choices that can be searched (excluding placeholders)
         */
        get: function () {
            return this.selectableChoices.filter(function (choice) { return choice.placeholder !== true; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "placeholderChoice", {
        /**
         * Get placeholder choice from store
         */
        get: function () {
            return __spreadArray([], this.choices, true).reverse()
                .find(function (choice) { return choice.placeholder === true; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "groups", {
        /**
         * Get groups from store
         */
        get: function () {
            return this.state.groups;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "activeGroups", {
        /**
         * Get active groups from store
         */
        get: function () {
            var _a = this, groups = _a.groups, choices = _a.choices;
            return groups.filter(function (group) {
                var isActive = group.active === true && group.disabled === false;
                var hasActiveOptions = choices.some(function (choice) { return choice.active === true && choice.disabled === false; });
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
        return this.activeChoices.find(function (choice) { return choice.id === parseInt(id, 10); });
    };
    /**
     * Get group by group id
     */
    Store.prototype.getGroupById = function (id) {
        return this.groups.find(function (group) { return group.id === id; });
    };
    return Store;
}());
exports.default = Store;
//# sourceMappingURL=store.js.map