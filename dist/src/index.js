"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templates = void 0;
var choices_1 = __importDefault(require("./scripts/choices"));
__exportStar(require("./scripts/interfaces"), exports);
__exportStar(require("./scripts/constants"), exports);
__exportStar(require("./scripts/defaults"), exports);
var templates_1 = require("./scripts/templates");
Object.defineProperty(exports, "templates", { enumerable: true, get: function () { return __importDefault(templates_1).default; } });
exports.default = choices_1.default;
//# sourceMappingURL=index.js.map