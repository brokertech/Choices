"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = __importDefault(require("sinon"));
var store_1 = __importDefault(require("./store"));
describe('reducers/store', function () {
    var instance;
    var subscribeStub;
    var dispatchStub;
    var getStateStub;
    beforeEach(function () {
        instance = new store_1.default();
        subscribeStub = sinon_1.default.stub(instance._store, 'subscribe');
        dispatchStub = sinon_1.default.stub(instance._store, 'dispatch');
        getStateStub = sinon_1.default.stub(instance._store, 'getState');
    });
    afterEach(function () {
        subscribeStub.restore();
        dispatchStub.restore();
        getStateStub.restore();
    });
    describe('constructor', function () {
        it('creates redux store', function () {
            (0, chai_1.expect)(instance._store).to.contain.keys([
                'subscribe',
                'dispatch',
                'getState',
            ]);
        });
    });
    describe('subscribe', function () {
        it('wraps redux subscribe method', function () {
            var onChange = function () { };
            (0, chai_1.expect)(subscribeStub.callCount).to.equal(0);
            instance.subscribe(onChange);
            (0, chai_1.expect)(subscribeStub.callCount).to.equal(1);
            (0, chai_1.expect)(subscribeStub.firstCall.args[0]).to.equal(onChange);
        });
    });
    describe('dispatch', function () {
        it('wraps redux dispatch method', function () {
            var action = 'TEST_ACTION';
            (0, chai_1.expect)(dispatchStub.callCount).to.equal(0);
            instance.dispatch(action);
            (0, chai_1.expect)(dispatchStub.callCount).to.equal(1);
            (0, chai_1.expect)(dispatchStub.firstCall.args[0]).to.equal(action);
        });
    });
    describe('state getter', function () {
        it('returns state', function () {
            var state = { items: [] };
            getStateStub.returns(state);
            (0, chai_1.expect)(instance.state).to.equal(state);
        });
    });
    describe('store selectors', function () {
        var state;
        beforeEach(function () {
            state = {
                items: [
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
                        value: 'Item two',
                        label: 'Item two',
                        active: true,
                        highlighted: false,
                        customProperties: null,
                        placeholder: false,
                        keyCode: null,
                    },
                    {
                        id: 3,
                        choiceId: 3,
                        groupId: -1,
                        value: 'Item three',
                        label: 'Item three',
                        active: true,
                        highlighted: true,
                        customProperties: null,
                        placeholder: false,
                        keyCode: null,
                    },
                ],
                choices: [
                    {
                        id: 1,
                        elementId: 'choices-test-1',
                        groupId: -1,
                        value: 'Choice 1',
                        label: 'Choice 1',
                        disabled: false,
                        selected: false,
                        active: true,
                        score: 9999,
                        customProperties: null,
                        placeholder: false,
                        keyCode: null,
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
                        keyCode: null,
                    },
                ],
                groups: [
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
                ],
            };
            getStateStub.returns(state);
        });
        describe('items getter', function () {
            it('returns items', function () {
                var expectedResponse = state.items;
                (0, chai_1.expect)(instance.items).to.eql(expectedResponse);
            });
        });
        describe('activeItems getter', function () {
            it('returns items that are active', function () {
                var expectedResponse = state.items.filter(function (item) { return item.active; });
                (0, chai_1.expect)(instance.activeItems).to.eql(expectedResponse);
            });
        });
        describe('highlightedActiveItems getter', function () {
            it('returns items that are active and highlighted', function () {
                var expectedResponse = state.items.filter(function (item) { return item.highlighted && item.active; });
                (0, chai_1.expect)(instance.highlightedActiveItems).to.eql(expectedResponse);
            });
        });
        describe('choices getter', function () {
            it('returns choices', function () {
                var expectedResponse = state.choices;
                (0, chai_1.expect)(instance.choices).to.eql(expectedResponse);
            });
        });
        describe('activeChoices getter', function () {
            it('returns choices that are active', function () {
                var expectedResponse = state.choices.filter(function (choice) { return choice.active; });
                (0, chai_1.expect)(instance.activeChoices).to.eql(expectedResponse);
            });
        });
        describe('selectableChoices getter', function () {
            it('returns choices that are not disabled', function () {
                var expectedResponse = state.choices.filter(function (choice) { return !choice.disabled; });
                (0, chai_1.expect)(instance.selectableChoices).to.eql(expectedResponse);
            });
        });
        describe('searchableChoices getter', function () {
            it('returns choices that are not placeholders and are selectable', function () {
                var expectedResponse = state.choices.filter(function (choice) { return !choice.disabled && !choice.placeholder; });
                (0, chai_1.expect)(instance.searchableChoices).to.eql(expectedResponse);
            });
        });
        describe('getChoiceById', function () {
            describe('passing id', function () {
                it('returns active choice by passed id', function () {
                    var id = '1';
                    var expectedResponse = state.choices.find(function (choice) { return choice.id === parseInt(id, 10); });
                    var actualResponse = instance.getChoiceById(id);
                    (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
                });
            });
        });
        describe('placeholderChoice getter', function () {
            it('returns placeholder choice', function () {
                var expectedResponse = state.choices
                    .reverse()
                    .find(function (choice) { return choice.placeholder; });
                (0, chai_1.expect)(instance.getPlaceholderChoice).to.eql(expectedResponse);
            });
        });
        describe('groups getter', function () {
            it('returns groups', function () {
                var expectedResponse = state.groups;
                (0, chai_1.expect)(instance.groups).to.eql(expectedResponse);
            });
        });
        describe('activeGroups getter', function () {
            it('returns active groups', function () {
                var expectedResponse = state.groups.filter(function (group) { return group.active; });
                (0, chai_1.expect)(instance.activeGroups).to.eql(expectedResponse);
            });
        });
        describe('getGroupById', function () {
            it('returns group by id', function () {
                var id = 1;
                var expectedResponse = state.groups.find(function (group) { return group.id === id; });
                var actualResponse = instance.getGroupById(id);
                (0, chai_1.expect)(actualResponse).to.eql(expectedResponse);
            });
        });
    });
});
//# sourceMappingURL=store.test.js.map