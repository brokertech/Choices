"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    unhighlightItem: 'unhighlightItem',
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
    SET_IS_LOADING: 'SET_IS_LOADING',
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
    PAGE_DOWN_KEY: 34,
};
exports.TEXT_TYPE = 'text';
exports.SELECT_ONE_TYPE = 'select-one';
exports.SELECT_MULTIPLE_TYPE = 'select-multiple';
exports.SCROLLING_SPEED = 4;
//# sourceMappingURL=constants.js.map