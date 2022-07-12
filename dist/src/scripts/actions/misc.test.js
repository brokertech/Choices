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
var actions = __importStar(require("./misc"));
describe('actions/misc', function () {
    describe('clearAll action', function () {
        it('returns CLEAR_ALL action', function () {
            var expectedAction = {
                type: 'CLEAR_ALL',
            };
            (0, chai_1.expect)(actions.clearAll()).to.eql(expectedAction);
        });
    });
    describe('resetTo action', function () {
        it('returns RESET_TO action', function () {
            var state = {
                choices: [],
                items: [],
                groups: [],
                loading: false,
            };
            var expectedAction = {
                type: 'RESET_TO',
                state: state,
            };
            (0, chai_1.expect)(actions.resetTo(state)).to.eql(expectedAction);
        });
    });
    describe('setIsLoading action', function () {
        describe('setting loading state to true', function () {
            it('returns expected action', function () {
                var expectedAction = {
                    type: 'SET_IS_LOADING',
                    isLoading: true,
                };
                (0, chai_1.expect)(actions.setIsLoading(true)).to.eql(expectedAction);
            });
        });
        describe('setting loading state to false', function () {
            it('returns expected action', function () {
                var expectedAction = {
                    type: 'SET_IS_LOADING',
                    isLoading: false,
                };
                (0, chai_1.expect)(actions.setIsLoading(false)).to.eql(expectedAction);
            });
        });
    });
});
//# sourceMappingURL=misc.test.js.map