"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var chai_1 = require("chai");
var _1 = __importDefault(require("."));
var groups_1 = __importDefault(require("./groups"));
var choices_1 = __importDefault(require("./choices"));
var items_1 = __importDefault(require("./items"));
var loading_1 = __importDefault(require("./loading"));
describe('reducers/rootReducer', function () {
    var store = (0, redux_1.createStore)(_1.default);
    it('returns expected reducers', function () {
        var state = store.getState();
        (0, chai_1.expect)(state.groups).to.equal((0, groups_1.default)(undefined, {}));
        (0, chai_1.expect)(state.choices).to.equal((0, choices_1.default)(undefined, {}));
        (0, chai_1.expect)(state.items).to.equal((0, items_1.default)(undefined, {}));
        (0, chai_1.expect)(state.loading).to.equal((0, loading_1.default)(undefined, {}));
    });
    describe('CLEAR_ALL', function () {
        it('resets state', function () {
            var output = (0, _1.default)({
                items: [1, 2, 3],
                groups: [1, 2, 3],
                choices: [1, 2, 3],
            }, {
                type: 'CLEAR_ALL',
            });
            (0, chai_1.expect)(output).to.eql({
                items: [],
                groups: [],
                choices: [],
                loading: false,
            });
        });
    });
    describe('RESET_TO', function () {
        it('replaces state with given state', function () {
            var output = (0, _1.default)({
                items: [1, 2, 3],
                groups: [1, 2, 3],
                choices: [1, 2, 3],
            }, {
                type: 'RESET_TO',
                state: {},
            });
            (0, chai_1.expect)(output).to.eql({});
        });
    });
});
//# sourceMappingURL=index.test.js.map