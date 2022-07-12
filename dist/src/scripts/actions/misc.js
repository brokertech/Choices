"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIsLoading = exports.resetTo = exports.clearAll = void 0;
var constants_1 = require("../constants");
var clearAll = function () { return ({
    type: constants_1.ACTION_TYPES.CLEAR_ALL,
}); };
exports.clearAll = clearAll;
var resetTo = function (state) { return ({
    type: constants_1.ACTION_TYPES.RESET_TO,
    state: state,
}); };
exports.resetTo = resetTo;
var setIsLoading = function (isLoading) { return ({
    type: constants_1.ACTION_TYPES.SET_IS_LOADING,
    isLoading: isLoading,
}); };
exports.setIsLoading = setIsLoading;
//# sourceMappingURL=misc.js.map