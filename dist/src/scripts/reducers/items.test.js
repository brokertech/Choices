"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var items_1 = __importStar(require("./items"));
describe('reducers/items', function () {
    it('should return same state when no action matches', function () {
        (0, chai_1.expect)((0, items_1.default)(items_1.defaultState, {})).to.equal(items_1.defaultState);
    });
    describe('when items do not exist', function () {
        describe('ADD_ITEM', function () {
            var value = 'Item one';
            var label = 'Item one';
            var id = 1234;
            var choiceId = 5678;
            var groupId = 1;
            var customProperties = {
                property: 'value',
            };
            var placeholder = true;
            var keyCode = 10;
            describe('passing expected values', function () {
                var actualResponse;
                beforeEach(function () {
                    actualResponse = (0, items_1.default)(undefined, {
                        type: 'ADD_ITEM',
                        value: value,
                        label: label,
                        id: id,
                        choiceId: choiceId,
                        groupId: groupId,
                        customProperties: customProperties,
                        placeholder: placeholder,
                        keyCode: keyCode,
                    });
                });
                it('adds item', function () {
                    var expectedResponse = [
                        {
                            id: id,
                            choiceId: choiceId,
                            groupId: groupId,
                            value: value,
                            label: label,
                            active: true,
                            highlighted: false,
                            customProperties: customProperties,
                            placeholder: placeholder,
                            keyCode: null,
                        },
                    ];
                    (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
                });
                it('unhighlights all highlighted items', function () {
                    actualResponse.forEach(function (item) {
                        (0, chai_1.expect)(item.highlighted).to.equal(false);
                    });
                });
            });
            describe('fallback values', function () {
                describe('passing no placeholder value', function () {
                    it('adds item with placeholder set to false', function () {
                        var expectedResponse = [
                            {
                                id: id,
                                choiceId: choiceId,
                                groupId: groupId,
                                value: value,
                                label: label,
                                active: true,
                                highlighted: false,
                                customProperties: customProperties,
                                placeholder: false,
                                keyCode: null,
                            },
                        ];
                        var actualResponse = (0, items_1.default)(undefined, {
                            type: 'ADD_ITEM',
                            value: value,
                            label: label,
                            id: id,
                            choiceId: choiceId,
                            groupId: groupId,
                            customProperties: customProperties,
                            placeholder: undefined,
                            keyCode: keyCode,
                        });
                        (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
                    });
                });
            });
        });
    });
    describe('when items exist', function () {
        var state;
        beforeEach(function () {
            state = [
                {
                    id: 1,
                    choiceId: 1,
                    groupId: -1,
                    value: 'Item one',
                    label: 'Item one',
                    active: false,
                    highlighted: false,
                    customProperties: null,
                    placeholder: false,
                    keyCode: null,
                },
                {
                    id: 2,
                    choiceId: 2,
                    groupId: -1,
                    value: 'Item one',
                    label: 'Item one',
                    active: true,
                    highlighted: false,
                    customProperties: null,
                    placeholder: false,
                    keyCode: null,
                },
            ];
        });
        describe('REMOVE_ITEM', function () {
            it('sets an item to be inactive based on passed ID', function () {
                var clonedState = state.slice(0);
                var id = 2;
                var expectedResponse = [
                    __assign({}, state[0]),
                    __assign(__assign({}, state[1]), { active: false }),
                ];
                var actualResponse = (0, items_1.default)(clonedState, {
                    type: 'REMOVE_ITEM',
                    id: id,
                });
                (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
            });
        });
        describe('HIGHLIGHT_ITEM', function () {
            it('sets an item to be inactive based on passed ID', function () {
                var clonedState = state.slice(0);
                var id = 2;
                var expectedResponse = [
                    __assign({}, state[0]),
                    __assign(__assign({}, state[1]), { highlighted: true }),
                ];
                var actualResponse = (0, items_1.default)(clonedState, {
                    type: 'HIGHLIGHT_ITEM',
                    id: id,
                    highlighted: true,
                });
                (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
            });
        });
    });
});
//# sourceMappingURL=items.test.js.map