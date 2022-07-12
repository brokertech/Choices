"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.diff = exports.cloneObject = exports.existsInArray = exports.dispatchEvent = exports.sortByScore = exports.sortByAlpha = exports.strToEl = exports.sanitise = exports.isScrolledIntoView = exports.getAdjacentEl = exports.wrap = exports.isType = exports.getType = exports.generateId = exports.generateChars = exports.getRandomNumber = void 0;
var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};
exports.getRandomNumber = getRandomNumber;
var generateChars = function (length) {
    return Array.from({ length: length }, function () { return (0, exports.getRandomNumber)(0, 36).toString(36); }).join('');
};
exports.generateChars = generateChars;
var generateId = function (element, prefix) {
    var id = element.id ||
        (element.name && "".concat(element.name, "-").concat((0, exports.generateChars)(2))) ||
        (0, exports.generateChars)(4);
    id = id.replace(/(:|\.|\[|\]|,)/g, '');
    id = "".concat(prefix, "-").concat(id);
    return id;
};
exports.generateId = generateId;
var getType = function (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
};
exports.getType = getType;
var isType = function (type, obj) {
    return obj !== undefined && obj !== null && (0, exports.getType)(obj) === type;
};
exports.isType = isType;
var wrap = function (element, wrapper) {
    if (wrapper === void 0) { wrapper = document.createElement('div'); }
    if (element.parentNode) {
        if (element.nextSibling) {
            element.parentNode.insertBefore(wrapper, element.nextSibling);
        }
        else {
            element.parentNode.appendChild(wrapper);
        }
    }
    return wrapper.appendChild(element);
};
exports.wrap = wrap;
var getAdjacentEl = function (startEl, selector, direction) {
    if (direction === void 0) { direction = 1; }
    var prop = "".concat(direction > 0 ? 'next' : 'previous', "ElementSibling");
    var sibling = startEl[prop];
    while (sibling) {
        if (sibling.matches(selector)) {
            return sibling;
        }
        sibling = sibling[prop];
    }
    return sibling;
};
exports.getAdjacentEl = getAdjacentEl;
var isScrolledIntoView = function (element, parent, direction) {
    if (direction === void 0) { direction = 1; }
    if (!element) {
        return false;
    }
    var isVisible;
    if (direction > 0) {
        // In view from bottom
        isVisible =
            parent.scrollTop + parent.offsetHeight >=
                element.offsetTop + element.offsetHeight;
    }
    else {
        // In view from top
        isVisible = element.offsetTop >= parent.scrollTop;
    }
    return isVisible;
};
exports.isScrolledIntoView = isScrolledIntoView;
var sanitise = function (value) {
    if (typeof value !== 'string') {
        return value;
    }
    return value
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;')
        .replace(/"/g, '&quot;');
};
exports.sanitise = sanitise;
exports.strToEl = (function () {
    var tmpEl = document.createElement('div');
    return function (str) {
        var cleanedInput = str.trim();
        tmpEl.innerHTML = cleanedInput;
        var firldChild = tmpEl.children[0];
        while (tmpEl.firstChild) {
            tmpEl.removeChild(tmpEl.firstChild);
        }
        return firldChild;
    };
})();
var sortByAlpha = function (_a, _b) {
    var value = _a.value, _c = _a.label, label = _c === void 0 ? value : _c;
    var value2 = _b.value, _d = _b.label, label2 = _d === void 0 ? value2 : _d;
    return label.localeCompare(label2, [], {
        sensitivity: 'base',
        ignorePunctuation: true,
        numeric: true,
    });
};
exports.sortByAlpha = sortByAlpha;
var sortByScore = function (a, b) {
    var _a = a.score, scoreA = _a === void 0 ? 0 : _a;
    var _b = b.score, scoreB = _b === void 0 ? 0 : _b;
    return scoreA - scoreB;
};
exports.sortByScore = sortByScore;
var dispatchEvent = function (element, type, customArgs) {
    if (customArgs === void 0) { customArgs = null; }
    var event = new CustomEvent(type, {
        detail: customArgs,
        bubbles: true,
        cancelable: true,
    });
    return element.dispatchEvent(event);
};
exports.dispatchEvent = dispatchEvent;
var existsInArray = function (array, value, key) {
    if (key === void 0) { key = 'value'; }
    return array.some(function (item) {
        if (typeof value === 'string') {
            return item[key] === value.trim();
        }
        return item[key] === value;
    });
};
exports.existsInArray = existsInArray;
var cloneObject = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
exports.cloneObject = cloneObject;
/**
 * Returns an array of keys present on the first but missing on the second object
 */
var diff = function (a, b) {
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    return aKeys.filter(function (i) { return bKeys.indexOf(i) < 0; });
};
exports.diff = diff;
//# sourceMappingURL=utils.js.map