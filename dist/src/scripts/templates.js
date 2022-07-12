"use strict";
/**
 * Helpers to create HTML elements used by Choices
 * Can be overridden by providing `callbackOnCreateTemplates` option
 */
Object.defineProperty(exports, "__esModule", { value: true });
var templates = {
    containerOuter: function (_a, dir, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId) {
        var containerOuter = _a.classNames.containerOuter;
        var div = Object.assign(document.createElement('div'), {
            className: containerOuter,
        });
        div.dataset.type = passedElementType;
        if (dir) {
            div.dir = dir;
        }
        if (isSelectOneElement) {
            div.tabIndex = 0;
        }
        if (isSelectElement) {
            div.setAttribute('role', searchEnabled ? 'combobox' : 'listbox');
            if (searchEnabled) {
                div.setAttribute('aria-autocomplete', 'list');
            }
        }
        div.setAttribute('aria-haspopup', 'true');
        div.setAttribute('aria-expanded', 'false');
        if (labelId) {
            div.setAttribute('aria-labelledby', labelId);
        }
        return div;
    },
    containerInner: function (_a) {
        var containerInner = _a.classNames.containerInner;
        return Object.assign(document.createElement('div'), {
            className: containerInner,
        });
    },
    itemList: function (_a, isSelectOneElement) {
        var _b = _a.classNames, list = _b.list, listSingle = _b.listSingle, listItems = _b.listItems;
        return Object.assign(document.createElement('div'), {
            className: "".concat(list, " ").concat(isSelectOneElement ? listSingle : listItems),
        });
    },
    placeholder: function (_a, value) {
        var _b;
        var allowHTML = _a.allowHTML, placeholder = _a.classNames.placeholder;
        return Object.assign(document.createElement('div'), (_b = {
                className: placeholder
            },
            _b[allowHTML ? 'innerHTML' : 'innerText'] = value,
            _b));
    },
    item: function (_a, _b, removeItemButton) {
        var _c, _d;
        var allowHTML = _a.allowHTML, _e = _a.classNames, item = _e.item, button = _e.button, highlightedState = _e.highlightedState, itemSelectable = _e.itemSelectable, placeholder = _e.placeholder;
        var id = _b.id, value = _b.value, label = _b.label, customProperties = _b.customProperties, active = _b.active, disabled = _b.disabled, highlighted = _b.highlighted, isPlaceholder = _b.placeholder;
        var div = Object.assign(document.createElement('div'), (_c = {
                className: item
            },
            _c[allowHTML ? 'innerHTML' : 'innerText'] = label,
            _c));
        Object.assign(div.dataset, {
            item: '',
            id: id,
            value: value,
            customProperties: customProperties,
        });
        if (active) {
            div.setAttribute('aria-selected', 'true');
        }
        if (disabled) {
            div.setAttribute('aria-disabled', 'true');
        }
        if (isPlaceholder) {
            div.classList.add(placeholder);
        }
        div.classList.add(highlighted ? highlightedState : itemSelectable);
        if (removeItemButton) {
            if (disabled) {
                div.classList.remove(itemSelectable);
            }
            div.dataset.deletable = '';
            /** @todo This MUST be localizable, not hardcoded! */
            var REMOVE_ITEM_TEXT = 'Remove item';
            var removeButton = Object.assign(document.createElement('button'), (_d = {
                    type: 'button',
                    className: button
                },
                _d[allowHTML ? 'innerHTML' : 'innerText'] = REMOVE_ITEM_TEXT,
                _d));
            removeButton.setAttribute('aria-label', "".concat(REMOVE_ITEM_TEXT, ": '").concat(value, "'"));
            removeButton.dataset.button = '';
            div.appendChild(removeButton);
        }
        return div;
    },
    choiceList: function (_a, isSelectOneElement) {
        var list = _a.classNames.list;
        var div = Object.assign(document.createElement('div'), {
            className: list,
        });
        if (!isSelectOneElement) {
            div.setAttribute('aria-multiselectable', 'true');
        }
        div.setAttribute('role', 'listbox');
        return div;
    },
    choiceGroup: function (_a, _b) {
        var _c;
        var allowHTML = _a.allowHTML, _d = _a.classNames, group = _d.group, groupHeading = _d.groupHeading, itemDisabled = _d.itemDisabled;
        var id = _b.id, value = _b.value, disabled = _b.disabled;
        var div = Object.assign(document.createElement('div'), {
            className: "".concat(group, " ").concat(disabled ? itemDisabled : ''),
        });
        div.setAttribute('role', 'group');
        Object.assign(div.dataset, {
            group: '',
            id: id,
            value: value,
        });
        if (disabled) {
            div.setAttribute('aria-disabled', 'true');
        }
        div.appendChild(Object.assign(document.createElement('div'), (_c = {
                className: groupHeading
            },
            _c[allowHTML ? 'innerHTML' : 'innerText'] = value,
            _c)));
        return div;
    },
    choice: function (_a, _b, selectText) {
        var _c;
        var allowHTML = _a.allowHTML, _d = _a.classNames, item = _d.item, itemChoice = _d.itemChoice, itemSelectable = _d.itemSelectable, selectedState = _d.selectedState, itemDisabled = _d.itemDisabled, placeholder = _d.placeholder;
        var id = _b.id, value = _b.value, label = _b.label, groupId = _b.groupId, elementId = _b.elementId, isDisabled = _b.disabled, isSelected = _b.selected, isPlaceholder = _b.placeholder;
        var div = Object.assign(document.createElement('div'), (_c = {
                id: elementId
            },
            _c[allowHTML ? 'innerHTML' : 'innerText'] = label,
            _c.className = "".concat(item, " ").concat(itemChoice),
            _c));
        if (isSelected) {
            div.classList.add(selectedState);
        }
        if (isPlaceholder) {
            div.classList.add(placeholder);
        }
        div.setAttribute('role', groupId && groupId > 0 ? 'treeitem' : 'option');
        Object.assign(div.dataset, {
            choice: '',
            id: id,
            value: value,
            selectText: selectText,
        });
        if (isDisabled) {
            div.classList.add(itemDisabled);
            div.dataset.choiceDisabled = '';
            div.setAttribute('aria-disabled', 'true');
        }
        else {
            div.classList.add(itemSelectable);
            div.dataset.choiceSelectable = '';
        }
        return div;
    },
    input: function (_a, placeholderValue) {
        var _b = _a.classNames, input = _b.input, inputCloned = _b.inputCloned;
        var inp = Object.assign(document.createElement('input'), {
            type: 'search',
            name: 'search_terms',
            className: "".concat(input, " ").concat(inputCloned),
            autocomplete: 'off',
            autocapitalize: 'off',
            spellcheck: false,
        });
        inp.setAttribute('role', 'textbox');
        inp.setAttribute('aria-autocomplete', 'list');
        inp.setAttribute('aria-label', placeholderValue);
        return inp;
    },
    dropdown: function (_a) {
        var _b = _a.classNames, list = _b.list, listDropdown = _b.listDropdown;
        var div = document.createElement('div');
        div.classList.add(list, listDropdown);
        div.setAttribute('aria-expanded', 'false');
        return div;
    },
    notice: function (_a, innerText, type) {
        var _b;
        var allowHTML = _a.allowHTML, _c = _a.classNames, item = _c.item, itemChoice = _c.itemChoice, noResults = _c.noResults, noChoices = _c.noChoices;
        if (type === void 0) { type = ''; }
        var classes = [item, itemChoice];
        if (type === 'no-choices') {
            classes.push(noChoices);
        }
        else if (type === 'no-results') {
            classes.push(noResults);
        }
        return Object.assign(document.createElement('div'), (_b = {},
            _b[allowHTML ? 'innerHTML' : 'innerText'] = innerText,
            _b.className = classes.join(' '),
            _b));
    },
    option: function (_a) {
        var label = _a.label, value = _a.value, customProperties = _a.customProperties, active = _a.active, disabled = _a.disabled;
        var opt = new Option(label, value, false, active);
        if (customProperties) {
            opt.dataset.customProperties = "".concat(customProperties);
        }
        opt.disabled = !!disabled;
        return opt;
    },
};
exports.default = templates;
//# sourceMappingURL=templates.js.map