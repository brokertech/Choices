"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var loading_1 = __importStar(require("./loading"));
describe('reducers/loading', function () {
    it('should return same state when no action matches', function () {
        (0, chai_1.expect)((0, loading_1.default)(loading_1.defaultState, {})).to.equal(loading_1.defaultState);
    });
    describe('SET_IS_LOADING', function () {
        it('sets loading state', function () {
            var expectedState = true;
            var actualState = (0, loading_1.default)(undefined, {
                type: 'SET_IS_LOADING',
                isLoading: true,
            });
            (0, chai_1.expect)(expectedState).to.eql(actualState);
        });
    });
});
//# sourceMappingURL=loading.test.js.map