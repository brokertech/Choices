"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultState = void 0;
var redux_1 = require("redux");
var items_1 = __importDefault(require("./items"));
var groups_1 = __importDefault(require("./groups"));
var choices_1 = __importDefault(require("./choices"));
var loading_1 = __importDefault(require("./loading"));
var utils_1 = require("../lib/utils");
exports.defaultState = {
    groups: [],
    items: [],
    choices: [],
    loading: false,
};
var appReducer = (0, redux_1.combineReducers)({
    items: items_1.default,
    groups: groups_1.default,
    choices: choices_1.default,
    loading: loading_1.default,
});
var rootReducer = function (passedState, action) {
    var state = passedState;
    // If we are clearing all items, groups and options we reassign
    // state and then pass that state to our proper reducer. This isn't
    // mutating our actual state
    // See: http://stackoverflow.com/a/35641992
    if (action.type === 'CLEAR_ALL') {
        state = exports.defaultState;
    }
    else if (action.type === 'RESET_TO') {
        return (0, utils_1.cloneObject)(action.state);
    }
    return appReducer(state, action);
};
exports.default = rootReducer;
//# sourceMappingURL=index.js.map