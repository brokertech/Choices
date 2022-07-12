"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-new-wrappers */
var chai_1 = require("chai");
var sinon_1 = require("sinon");
var utils_1 = require("./utils");
describe('utils', function () {
    describe('getRandomNumber', function () {
        it('returns random number between range', function () {
            for (var index = 0; index < 10; index++) {
                var output = (0, utils_1.getRandomNumber)(1, 10);
                (0, chai_1.expect)(output).to.be.a('number');
                (0, chai_1.expect)(output).to.be.within(1, 10);
            }
        });
    });
    describe('generateChars', function () {
        it('generates a string of random chars with given length', function () {
            var output = (0, utils_1.generateChars)(10);
            (0, chai_1.expect)(output).to.be.a('string');
            (0, chai_1.expect)(output).to.have.length(10);
        });
    });
    describe('generateId', function () {
        describe('when given element has id value', function () {
            it('generates a unique prefixed id based on given elements id', function () {
                var element = document.createElement('select');
                element.id = 'test-id';
                var prefix = 'test-prefix';
                var output = (0, utils_1.generateId)(element, prefix);
                (0, chai_1.expect)(output).to.equal("".concat(prefix, "-").concat(element.id));
            });
        });
        describe('when given element has no id value but name value', function () {
            it('generates a unique prefixed id based on given elements name plus 2 random characters', function () {
                var element = document.createElement('select');
                element.name = 'test-name';
                var prefix = 'test-prefix';
                var output = (0, utils_1.generateId)(element, prefix);
                var expectedOutput = "".concat(prefix, "-").concat(element.name, "-");
                (0, chai_1.expect)(output).to.contain(expectedOutput);
                (0, chai_1.expect)(output).to.have.length(expectedOutput.length + 2);
            });
        });
        describe('when given element has no id value and no name value', function () {
            it('generates a unique prefixed id based on 4 random characters', function () {
                var element = document.createElement('select');
                var prefix = 'test-prefix';
                var output = (0, utils_1.generateId)(element, prefix);
                var expectedOutput = "".concat(prefix, "-");
                (0, chai_1.expect)(output).to.contain(expectedOutput);
                (0, chai_1.expect)(output).to.have.length(expectedOutput.length + 4);
            });
        });
    });
    describe('getType', function () {
        it('returns type of given object', function () {
            (0, chai_1.expect)((0, utils_1.getType)({})).to.equal('Object');
            (0, chai_1.expect)((0, utils_1.getType)(1)).to.equal('Number');
            (0, chai_1.expect)((0, utils_1.getType)(true)).to.equal('Boolean');
            (0, chai_1.expect)((0, utils_1.getType)([])).to.equal('Array');
            (0, chai_1.expect)((0, utils_1.getType)(function () { })).to.equal('Function');
            (0, chai_1.expect)((0, utils_1.getType)(new Error())).to.equal('Error');
            (0, chai_1.expect)((0, utils_1.getType)(/''/g)).to.equal('RegExp');
            (0, chai_1.expect)((0, utils_1.getType)(new String())).to.equal('String'); // eslint-disable-line
            (0, chai_1.expect)((0, utils_1.getType)('')).to.equal('String');
        });
    });
    describe('isType', function () {
        it('checks with given object type equals given type', function () {
            (0, chai_1.expect)((0, utils_1.isType)('Object', {})).to.equal(true);
            (0, chai_1.expect)((0, utils_1.isType)('String', {})).to.equal(false);
        });
    });
    describe('sanitise', function () {
        describe('when passing a parameter that is not a string', function () {
            it('returns the passed argument', function () {
                var value = {
                    test: true,
                };
                var output = (0, utils_1.sanitise)(value);
                (0, chai_1.expect)(output).to.equal(value);
            });
        });
        describe('when passing a string', function () {
            it('strips HTML from value', function () {
                var value = '<script>somethingMalicious();</script>';
                var output = (0, utils_1.sanitise)(value);
                (0, chai_1.expect)(output).to.equal('&lt;script&gt;somethingMalicious();&lt;/script&gt;');
            });
        });
    });
    describe('sortByAlpha', function () {
        describe('sorting an array', function () {
            it('sorts by value alphabetically', function () {
                var values = [
                    { value: 'The Strokes' },
                    { value: 'Arctic Monkeys' },
                    { value: 'Oasis' },
                    { value: 'Tame Impala' },
                ];
                var output = values.sort(utils_1.sortByAlpha);
                (0, chai_1.expect)(output).to.eql([
                    { value: 'Arctic Monkeys' },
                    { value: 'Oasis' },
                    { value: 'Tame Impala' },
                    { value: 'The Strokes' },
                ]);
            });
            it('sorts by label alphabetically', function () {
                var values = [
                    { value: '0', label: 'The Strokes' },
                    { value: '0', label: 'Arctic Monkeys' },
                    { value: '0', label: 'Oasis' },
                    { value: '0', label: 'Tame Impala' },
                ];
                var output = values.sort(utils_1.sortByAlpha);
                (0, chai_1.expect)(output).to.eql([
                    { value: '0', label: 'Arctic Monkeys' },
                    { value: '0', label: 'Oasis' },
                    { value: '0', label: 'Tame Impala' },
                    { value: '0', label: 'The Strokes' },
                ]);
            });
        });
    });
    describe('sortByScore', function () {
        describe('sorting an array', function () {
            it('sorts by score ascending', function () {
                var values = [
                    { score: 10 },
                    { score: 3001 },
                    { score: 124 },
                    { score: 400 },
                ];
                var output = values.sort(utils_1.sortByScore);
                (0, chai_1.expect)(output).to.eql([
                    { score: 10 },
                    { score: 124 },
                    { score: 400 },
                    { score: 3001 },
                ]);
            });
        });
    });
    describe('dispatchEvent', function () {
        it('dispatches custom event of given type on given element', function () {
            var fakeElement = {
                dispatchEvent: (0, sinon_1.stub)(),
            };
            var eventType = 'addItem';
            var customArgs = {
                testing: true,
            };
            (0, utils_1.dispatchEvent)(fakeElement, eventType, customArgs);
            (0, chai_1.expect)(fakeElement.dispatchEvent.called).to.equal(true);
            var event = fakeElement.dispatchEvent.lastCall.args[0];
            (0, chai_1.expect)(event).to.be.instanceof(CustomEvent);
            (0, chai_1.expect)(event.bubbles).to.equal(true);
            (0, chai_1.expect)(event.cancelable).to.equal(true);
            (0, chai_1.expect)(event.detail).to.equal(customArgs);
        });
    });
    describe('existsInArray', function () {
        it('determines whether a value exists within given array', function () {
            var values = [
                { value: 'The Strokes' },
                { value: 'Arctic Monkeys' },
                { value: 'Oasis' },
                { value: 'Tame Impala' },
            ];
            (0, chai_1.expect)((0, utils_1.existsInArray)(values, 'Oasis', 'value')).to.equal(true);
            (0, chai_1.expect)((0, utils_1.existsInArray)(values, 'The Beatles', 'value')).to.equal(false);
        });
    });
    describe('cloneObject', function () {
        it('deeply clones a given object', function () {
            var object = {
                levelOne: {
                    id: 1,
                    levelTwo: {
                        id: 2,
                        levelThree: {
                            id: 3,
                            levelFour: {
                                id: 4,
                            },
                        },
                    },
                },
            };
            var output = (0, utils_1.cloneObject)(object);
            (0, chai_1.expect)(output).to.not.equal(object);
            (0, chai_1.expect)(output).to.eql(object);
        });
    });
    describe('diff', function () {
        it('returns an array of keys present on the first but missing on the second object', function () {
            var obj1 = {
                foo: 'bar',
                baz: 'foo',
            };
            var obj2 = {
                foo: 'bar',
            };
            var output = (0, utils_1.diff)(obj1, obj2);
            (0, chai_1.expect)(output).to.deep.equal(['baz']);
        });
    });
});
//# sourceMappingURL=utils.test.js.map