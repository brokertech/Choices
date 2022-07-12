"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightItem = exports.removeItem = exports.addItem = void 0;
var constants_1 = require("../constants");
var addItem = function (_a) {
    var value = _a.value, label = _a.label, id = _a.id, choiceId = _a.choiceId, groupId = _a.groupId, customProperties = _a.customProperties, placeholder = _a.placeholder, keyCode = _a.keyCode;
    return ({
        type: constants_1.ACTION_TYPES.ADD_ITEM,
        value: value,
        label: label,
        id: id,
        choiceId: choiceId,
        groupId: groupId,
        customProperties: customProperties,
        placeholder: placeholder,
        keyCode: keyCode,
    });
};
exports.addItem = addItem;
var removeItem = function (id, choiceId) { return ({
    type: constants_1.ACTION_TYPES.REMOVE_ITEM,
    id: id,
    choiceId: choiceId,
}); };
exports.removeItem = removeItem;
var highlightItem = function (id, highlighted) { return ({
    type: constants_1.ACTION_TYPES.HIGHLIGHT_ITEM,
    id: id,
    highlighted: highlighted,
}); };
exports.highlightItem = highlightItem;
//# sourceMappingURL=items.js.map