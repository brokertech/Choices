"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGroup = void 0;
var constants_1 = require("../constants");
var addGroup = function (_a) {
    var value = _a.value, id = _a.id, active = _a.active, disabled = _a.disabled;
    return ({
        type: constants_1.ACTION_TYPES.ADD_GROUP,
        value: value,
        id: id,
        active: active,
        disabled: disabled,
    });
};
exports.addGroup = addGroup;
//# sourceMappingURL=groups.js.map