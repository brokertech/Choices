"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var list_1 = __importDefault(require("./list"));
describe('components/list', function () {
    var instance;
    var choicesElement;
    beforeEach(function () {
        choicesElement = document.createElement('div');
        instance = new list_1.default({
            element: choicesElement,
        });
    });
    afterEach(function () {
        document.body.innerHTML = '';
        instance = null;
    });
    describe('constructor', function () {
        it('assigns choices element to class', function () {
            (0, chai_1.expect)(instance.element).to.eql(choicesElement);
        });
        it('sets the height of the element', function () {
            (0, chai_1.expect)(instance.height).to.eql(choicesElement.scrollTop);
        });
    });
    describe('clear', function () {
        it("clears element's inner HTML", function () {
            var innerHTML = 'test';
            instance.element.innerHTML = innerHTML;
            (0, chai_1.expect)(instance.element.innerHTML).to.equal(innerHTML);
            instance.clear();
            (0, chai_1.expect)(instance.element.innerHTML).to.equal('');
        });
    });
    describe('append', function () {
        it('appends passed node to element', function () {
            var elementToAppend = document.createElement('span');
            var childClass = 'test-element';
            elementToAppend.classList.add(childClass);
            (0, chai_1.expect)(instance.element.querySelector(".".concat(childClass))).to.equal(null);
            instance.append(elementToAppend);
            (0, chai_1.expect)(instance.element.querySelector(".".concat(childClass))).to.equal(elementToAppend);
        });
    });
    describe('getChild', function () {
        var childElement;
        var childClass = 'test-element';
        beforeEach(function () {
            childElement = document.createElement('span');
            childElement.classList.add(childClass);
            instance.element.appendChild(childElement);
        });
        it('returns child element', function () {
            var expectedResponse = childElement;
            var actualResponse = instance.getChild(".".concat(childClass));
            (0, chai_1.expect)(expectedResponse).to.eql(actualResponse);
        });
    });
    describe('hasChildren', function () {
        describe('when list has children', function () {
            it('returns true', function () {
                var childElement = document.createElement('span');
                instance.element.appendChild(childElement);
                var response = instance.hasChildren();
                (0, chai_1.expect)(response).to.equal(true);
            });
        });
        describe('when list does not have children', function () {
            it('returns false', function () {
                instance.element.innerHTML = '';
                var response = instance.hasChildren();
                (0, chai_1.expect)(response).to.equal(false);
            });
        });
    });
    describe('scrollToTop', function () {
        it("sets the position's scroll position to 0", function () {
            instance.element.scrollTop = 10;
            instance.scrollToTop();
            (0, chai_1.expect)(instance.element.scrollTop).to.equal(0);
        });
    });
});
//# sourceMappingURL=list.test.js.map