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
var choices_1 = __importStar(require("./choices"));
describe('reducers/choices', function () {
    it('should return same state when no action matches', function () {
        (0, chai_1.expect)((0, choices_1.default)(choices_1.defaultState, {})).to.equal(choices_1.defaultState);
    });
    describe('when choices do not exist', function () {
        describe('ADD_CHOICE', function () {
            var value = 'test';
            var label = 'test';
            var id = 1;
            var groupId = 1;
            var disabled = false;
            var elementId = 1;
            var customProperties = { test: true };
            var placeholder = true;
            describe('passing expected values', function () {
                it('adds choice', function () {
                    var expectedResponse = [
                        {
                            value: value,
                            label: label,
                            id: id,
                            groupId: groupId,
                            disabled: disabled,
                            elementId: elementId,
                            customProperties: customProperties,
                            placeholder: placeholder,
                            selected: false,
                            active: true,
                            score: 9999,
                        },
                    ];
                    var actualResponse = (0, choices_1.default)(undefined, {
                        type: 'ADD_CHOICE',
                        value: value,
                        label: label,
                        id: id,
                        groupId: groupId,
                        disabled: disabled,
                        elementId: elementId,
                        customProperties: customProperties,
                        placeholder: placeholder,
                    });
                    (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
                });
            });
            describe('fallback values', function () {
                describe('passing no label', function () {
                    it('adds choice using value as label', function () {
                        var expectedResponse = [
                            {
                                value: value,
                                label: value,
                                id: id,
                                groupId: groupId,
                                disabled: disabled,
                                elementId: elementId,
                                customProperties: customProperties,
                                placeholder: placeholder,
                                selected: false,
                                active: true,
                                score: 9999,
                            },
                        ];
                        var actualResponse = (0, choices_1.default)(undefined, {
                            type: 'ADD_CHOICE',
                            value: value,
                            label: undefined,
                            id: id,
                            groupId: groupId,
                            disabled: disabled,
                            elementId: elementId,
                            customProperties: customProperties,
                            placeholder: placeholder,
                        });
                        (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
                    });
                });
                describe('passing no placeholder value', function () {
                    it('adds choice with placeholder set to false', function () {
                        var expectedResponse = [
                            {
                                value: value,
                                label: value,
                                id: id,
                                groupId: groupId,
                                disabled: disabled,
                                elementId: elementId,
                                customProperties: customProperties,
                                placeholder: false,
                                selected: false,
                                active: true,
                                score: 9999,
                            },
                        ];
                        var actualResponse = (0, choices_1.default)(undefined, {
                            type: 'ADD_CHOICE',
                            value: value,
                            label: undefined,
                            id: id,
                            groupId: groupId,
                            disabled: disabled,
                            elementId: elementId,
                            customProperties: customProperties,
                            placeholder: undefined,
                        });
                        (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
                    });
                });
            });
        });
    });
    describe('when choices exist', function () {
        var state;
        beforeEach(function () {
            state = [
                {
                    id: 1,
                    elementId: 'choices-test-1',
                    groupId: -1,
                    value: 'Choice 1',
                    label: 'Choice 1',
                    disabled: false,
                    selected: false,
                    active: false,
                    score: 9999,
                    customProperties: null,
                    placeholder: false,
                },
                {
                    id: 2,
                    elementId: 'choices-test-2',
                    groupId: -1,
                    value: 'Choice 2',
                    label: 'Choice 2',
                    disabled: false,
                    selected: true,
                    active: false,
                    score: 9999,
                    customProperties: null,
                    placeholder: false,
                },
            ];
        });
        describe('FILTER_CHOICES', function () {
            it('sets active flag based on whether choice is in passed results', function () {
                var id = 1;
                var score = 10;
                var active = true;
                var expectedResponse = __assign(__assign({}, state[0]), { active: active, score: score });
                var actualResponse = (0, choices_1.default)(state, {
                    type: 'FILTER_CHOICES',
                    results: [
                        {
                            item: { id: id },
                            score: score,
                        },
                    ],
                }).find(function (choice) { return choice.id === id; });
                (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
            });
        });
        describe('ACTIVATE_CHOICES', function () {
            it('sets active flag to passed value', function () {
                var clonedState = state.slice(0);
                var expectedResponse = [
                    __assign(__assign({}, state[0]), { active: true }),
                    __assign(__assign({}, state[1]), { active: true }),
                ];
                var actualResponse = (0, choices_1.default)(clonedState, {
                    type: 'ACTIVATE_CHOICES',
                    active: true,
                });
                (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
            });
        });
        describe('CLEAR_CHOICES', function () {
            it('restores to defaultState', function () {
                var clonedState = state.slice(0);
                var expectedResponse = choices_1.defaultState;
                var actualResponse = (0, choices_1.default)(clonedState, {
                    type: 'CLEAR_CHOICES',
                });
                (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
            });
        });
        describe('ADD_ITEM', function () {
            describe('when action has a choice id', function () {
                it('disables choice corresponding with id', function () {
                    var id = 2;
                    var clonedState = state.slice(0);
                    var expectedResponse = [
                        __assign({}, state[0]),
                        __assign(__assign({}, state[1]), { selected: true }),
                    ];
                    var actualResponse = (0, choices_1.default)(clonedState, {
                        type: 'ADD_ITEM',
                        choiceId: id,
                    });
                    (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
                });
            });
            describe('when action has no choice id', function () {
                it('returns state', function () {
                    var clonedState = state.slice(0);
                    var actualResponse = (0, choices_1.default)(clonedState, {
                        type: 'ADD_ITEM',
                        choiceId: undefined,
                    });
                    (0, chai_1.expect)(actualResponse).to.equal(clonedState);
                });
            });
        });
        describe('REMOVE_ITEM', function () {
            it('selects choice by passed id', function () {
                var id = 2;
                var clonedState = state.slice(0);
                var expectedResponse = [
                    __assign({}, state[0]),
                    __assign(__assign({}, state[1]), { selected: false }),
                ];
                var actualResponse = (0, choices_1.default)(clonedState, {
                    type: 'REMOVE_ITEM',
                    choiceId: id,
                });
                (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
            });
            describe('passing no id', function () {
                it('returns state', function () {
                    var clonedState = state.slice(0);
                    var actualResponse = (0, choices_1.default)(clonedState, {
                        type: 'REMOVE_ITEM',
                        choiceId: undefined,
                    });
                    (0, chai_1.expect)(actualResponse).to.equal(clonedState);
                });
            });
        });
    });
});
//# sourceMappingURL=choices.test.js.map