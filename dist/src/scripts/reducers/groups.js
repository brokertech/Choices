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
function groups(state, action) {
    if (state === void 0) { state = exports.defaultState; }
    if (action === void 0) { action = {}; }
    switch (action.type) {
        case 'ADD_GROUP': {
            var addGroupAction = action;
            return __spreadArray(__spreadArray([], state, true), [
                {
                    id: addGroupAction.id,
                    value: addGroupAction.value,
                    active: addGroupAction.active,
                    disabled: addGroupAction.disabled,
                },
            ], false);
        }
        case 'CLEAR_CHOICES': {
            return [];
        }
        default: {
            return state;
        }
    }
}
exports.default = groups;
//# sourceMappingURL=groups.js.map