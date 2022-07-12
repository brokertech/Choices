"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultState = void 0;
exports.defaultState = false;
var general = function (state, action) {
    if (state === void 0) { state = exports.defaultState; }
    if (action === void 0) { action = {}; }
    switch (action.type) {
        case 'SET_IS_LOADING': {
            return action.isLoading;
        }
        default: {
            return state;
        }
    }
};
exports.default = general;
//# sourceMappingURL=loading.js.map