"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearChoices = exports.activateChoices = exports.filterChoices = exports.addChoice = void 0;
var constants_1 = require("../constants");
var addChoice = function (_a) {
    var value = _a.value, label = _a.label, id = _a.id, groupId = _a.groupId, disabled = _a.disabled, elementId = _a.elementId, customProperties = _a.customProperties, placeholder = _a.placeholder, keyCode = _a.keyCode;
    return ({
        type: constants_1.ACTION_TYPES.ADD_CHOICE,
        value: value,
        label: label,
        id: id,
        groupId: groupId,
        disabled: disabled,
        elementId: elementId,
        customProperties: customProperties,
        placeholder: placeholder,
        keyCode: keyCode,
    });
};
exports.addChoice = addChoice;
var filterChoices = function (results) { return ({
    type: constants_1.ACTION_TYPES.FILTER_CHOICES,
    results: results,
}); };
exports.filterChoices = filterChoices;
var activateChoices = function (active) {
    if (active === void 0) { active = true; }
    return ({
        type: constants_1.ACTION_TYPES.ACTIVATE_CHOICES,
        active: active,
    });
};
exports.activateChoices = activateChoices;
var clearChoices = function () { return ({
    type: constants_1.ACTION_TYPES.CLEAR_CHOICES,
}); };
exports.clearChoices = clearChoices;
//# sourceMappingURL=choices.js.map