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
function choices(state, action) {
    if (state === void 0) { state = exports.defaultState; }
    if (action === void 0) { action = {}; }
    switch (action.type) {
        case 'ADD_CHOICE': {
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
                placeholder: addChoiceAction.placeholder || false,
            };
            /*
              A disabled choice appears in the choice dropdown but cannot be selected
              A selected choice has been added to the passed input's value (added as an item)
              An active choice appears within the choice dropdown
            */
            return __spreadArray(__spreadArray([], state, true), [choice], false);
        }
        case 'ADD_ITEM': {
            var addItemAction_1 = action;
            // When an item is added and it has an associated choice,
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
        case 'REMOVE_ITEM': {
            var removeItemAction_1 = action;
            // When an item is removed and it has an associated choice,
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
        case 'FILTER_CHOICES': {
            var filterChoicesAction_1 = action;
            return state.map(function (obj) {
                var choice = obj;
                // Set active state based on whether choice is
                // within filtered results
                choice.active = filterChoicesAction_1.results.some(function (_a) {
                    var item = _a.item, score = _a.score;
                    if (item.id === choice.id) {
                        choice.score = score;
                        return true;
                    }
                    return false;
                });
                return choice;
            });
        }
        case 'ACTIVATE_CHOICES': {
            var activateChoicesAction_1 = action;
            return state.map(function (obj) {
                var choice = obj;
                choice.active = activateChoicesAction_1.active;
                return choice;
            });
        }
        case 'CLEAR_CHOICES': {
            return exports.defaultState;
        }
        default: {
            return state;
        }
    }
}
exports.default = choices;
//# sourceMappingURL=choices.js.map