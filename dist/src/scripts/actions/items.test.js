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
var actions = __importStar(require("./items"));
describe('actions/items', function () {
    describe('addItem action', function () {
        it('returns ADD_ITEM action', function () {
            var value = 'test';
            var label = 'test';
            var id = 1;
            var choiceId = 1;
            var groupId = 1;
            var customProperties = { test: true };
            var placeholder = true;
            var keyCode = 10;
            var expectedAction = {
                type: 'ADD_ITEM',
                value: value,
                label: label,
                id: id,
                choiceId: choiceId,
                groupId: groupId,
                customProperties: customProperties,
                placeholder: placeholder,
                keyCode: keyCode,
            };
            (0, chai_1.expect)(actions.addItem({
                value: value,
                label: label,
                id: id,
                choiceId: choiceId,
                groupId: groupId,
                customProperties: customProperties,
                placeholder: placeholder,
                keyCode: keyCode,
            })).to.eql(expectedAction);
        });
    });
    describe('removeItem action', function () {
        it('returns REMOVE_ITEM action', function () {
            var id = 1;
            var choiceId = 1;
            var expectedAction = {
                type: 'REMOVE_ITEM',
                id: id,
                choiceId: choiceId,
            };
            (0, chai_1.expect)(actions.removeItem(id, choiceId)).to.eql(expectedAction);
        });
    });
    describe('highlightItem action', function () {
        it('returns HIGHLIGHT_ITEM action', function () {
            var id = 1;
            var highlighted = true;
            var expectedAction = {
                type: 'HIGHLIGHT_ITEM',
                id: id,
                highlighted: highlighted,
            };
            (0, chai_1.expect)(actions.highlightItem(id, highlighted)).to.eql(expectedAction);
        });
    });
});
//# sourceMappingURL=items.test.js.map