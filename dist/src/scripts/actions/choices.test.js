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
var actions = __importStar(require("./choices"));
describe('actions/choices', function () {
    describe('addChoice action', function () {
        it('returns ADD_CHOICE action', function () {
            var value = 'test';
            var label = 'test';
            var id = 1;
            var groupId = 1;
            var disabled = false;
            var elementId = 1;
            var customProperties = { test: true };
            var placeholder = true;
            var keyCode = 10;
            var expectedAction = {
                type: 'ADD_CHOICE',
                value: value,
                label: label,
                id: id,
                groupId: groupId,
                disabled: disabled,
                elementId: elementId,
                customProperties: customProperties,
                placeholder: placeholder,
                keyCode: keyCode,
            };
            (0, chai_1.expect)(actions.addChoice({
                value: value,
                label: label,
                id: id,
                groupId: groupId,
                disabled: disabled,
                elementId: elementId,
                customProperties: customProperties,
                placeholder: placeholder,
                keyCode: keyCode,
            })).to.eql(expectedAction);
        });
    });
    describe('filterChoices action', function () {
        it('returns FILTER_CHOICES action', function () {
            var results = Array(10);
            var expectedAction = {
                type: 'FILTER_CHOICES',
                results: results,
            };
            (0, chai_1.expect)(actions.filterChoices(results)).to.eql(expectedAction);
        });
    });
    describe('activateChoices action', function () {
        describe('not passing active parameter', function () {
            it('returns ACTIVATE_CHOICES action', function () {
                var expectedAction = {
                    type: 'ACTIVATE_CHOICES',
                    active: true,
                };
                (0, chai_1.expect)(actions.activateChoices()).to.eql(expectedAction);
            });
        });
        describe('passing active parameter', function () {
            it('returns ACTIVATE_CHOICES action', function () {
                var active = true;
                var expectedAction = {
                    type: 'ACTIVATE_CHOICES',
                    active: active,
                };
                (0, chai_1.expect)(actions.activateChoices(active)).to.eql(expectedAction);
            });
        });
    });
    describe('clearChoices action', function () {
        it('returns CLEAR_CHOICES action', function () {
            var expectedAction = {
                type: 'CLEAR_CHOICES',
            };
            (0, chai_1.expect)(actions.clearChoices()).to.eql(expectedAction);
        });
    });
});
//# sourceMappingURL=choices.test.js.map