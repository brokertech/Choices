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
var groups_1 = __importStar(require("./groups"));
describe('reducers/groups', function () {
    it('should return same state when no action matches', function () {
        (0, chai_1.expect)((0, groups_1.default)(groups_1.defaultState, {})).to.equal(groups_1.defaultState);
    });
    describe('when groups do not exist', function () {
        describe('ADD_GROUP', function () {
            it('adds group', function () {
                var id = 1;
                var value = 'Group one';
                var active = true;
                var disabled = false;
                var expectedResponse = [
                    {
                        id: id,
                        value: value,
                        active: active,
                        disabled: disabled,
                    },
                ];
                var actualResponse = (0, groups_1.default)(undefined, {
                    type: 'ADD_GROUP',
                    id: id,
                    value: value,
                    active: active,
                    disabled: disabled,
                });
                (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
            });
        });
    });
    describe('when groups exist', function () {
        var state;
        beforeEach(function () {
            state = [
                {
                    id: 1,
                    value: 'Group one',
                    active: true,
                    disabled: false,
                },
                {
                    id: 2,
                    value: 'Group two',
                    active: true,
                    disabled: false,
                },
            ];
        });
        describe('CLEAR_CHOICES', function () {
            it('restores to defaultState', function () {
                var clonedState = state.slice(0);
                var expectedResponse = groups_1.defaultState;
                var actualResponse = (0, groups_1.default)(clonedState, {
                    type: 'CLEAR_CHOICES',
                });
                (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
            });
        });
    });
});
//# sourceMappingURL=groups.test.js.map