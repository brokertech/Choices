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
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultState = void 0;
exports.defaultState = [];
function items(state, action) {
    if (state === void 0) { state = exports.defaultState; }
    if (action === void 0) { action = {}; }
    switch (action.type) {
        case 'ADD_ITEM': {
            var addItemAction = action;
            // Add object to items array
            var newState = __spreadArray(__spreadArray([], state, true), [
                {
                    id: addItemAction.id,
                    choiceId: addItemAction.choiceId,
                    groupId: addItemAction.groupId,
                    value: addItemAction.value,
                    label: addItemAction.label,
                    active: true,
                    highlighted: false,
                    customProperties: addItemAction.customProperties,
                    placeholder: addItemAction.placeholder || false,
                    keyCode: null,
                },
            ], false);
            return newState.map(function (obj) {
                var item = obj;
                item.highlighted = false;
                return item;
            });
        }
        case 'REMOVE_ITEM': {
            // Set item to inactive
            return state.map(function (obj) {
                var item = obj;
                if (item.id === action.id) {
                    item.active = false;
                }
                return item;
            });
        }
        case 'HIGHLIGHT_ITEM': {
            var highlightItemAction_1 = action;
            return state.map(function (obj) {
                var item = obj;
                if (item.id === highlightItemAction_1.id) {
                    item.highlighted = highlightItemAction_1.highlighted;
                }
                return item;
            });
        }
        default: {
            return state;
        }
    }
}
exports.default = items;
//# sourceMappingURL=items.js.map