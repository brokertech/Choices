describe('Choices - select multiple', function () {
    beforeEach(function () {
        cy.visit('/select-multiple', {
            onBeforeLoad: function (win) {
                cy.stub(win.console, 'warn').as('consoleWarn');
            },
        });
    });
    describe('scenarios', function () {
        describe('basic setup', function () {
            beforeEach(function () {
                cy.get('[data-test-hook=basic]')
                    .find('.choices__input--cloned')
                    .focus();
            });
            describe('focusing on text input', function () {
                it('displays a dropdown of choices', function () {
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__list--dropdown')
                        .should('be.visible');
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .should('have.length', 4)
                        .each(function ($choice, index) {
                        expect($choice.text().trim()).to.equal("Choice ".concat(index + 1));
                    });
                });
                describe('pressing escape', function () {
                    beforeEach(function () {
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__input--cloned')
                            .type('{esc}');
                    });
                    it('closes the dropdown', function () {
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__list--dropdown')
                            .should('not.be.visible');
                    });
                    describe('typing more into the input', function () {
                        it('re-opens the dropdown', function () {
                            cy.get('[data-test-hook=basic]')
                                .find('.choices__input--cloned')
                                .type('test');
                            cy.get('[data-test-hook=basic]')
                                .find('.choices__list--dropdown')
                                .should('be.visible');
                        });
                    });
                });
            });
            describe('selecting choices', function () {
                describe('selecting a single choice', function () {
                    var selectedChoiceText;
                    beforeEach(function () {
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__list--dropdown .choices__list')
                            .children()
                            .first()
                            .then(function ($choice) {
                            selectedChoiceText = $choice.text().trim();
                        })
                            .click();
                    });
                    it('allows selecting choices from dropdown', function () {
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__list--multiple .choices__item')
                            .last()
                            .should(function ($item) {
                            expect($item).to.contain(selectedChoiceText);
                        });
                    });
                    it('updates the value of the original input', function () {
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__input[hidden]')
                            .should(function ($select) {
                            expect($select.val()).to.contain(selectedChoiceText);
                        });
                    });
                    it('removes selected choice from dropdown list', function () {
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__list--dropdown .choices__list')
                            .children()
                            .each(function ($choice) {
                            expect($choice.text().trim()).to.not.equal(selectedChoiceText);
                        });
                    });
                });
                describe('selecting all available choices', function () {
                    beforeEach(function () {
                        for (var index = 0; index <= 4; index++) {
                            cy.get('[data-test-hook=basic]')
                                .find('.choices__input--cloned')
                                .focus();
                            cy.get('[data-test-hook=basic]')
                                .find('.choices__list--dropdown .choices__list')
                                .children()
                                .first()
                                .click();
                        }
                    });
                    it('displays "no choices to choose" prompt', function () {
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__list--dropdown')
                            .should('be.visible')
                            .should(function ($dropdown) {
                            var dropdownText = $dropdown.text().trim();
                            expect(dropdownText).to.equal('No choices to choose from');
                        });
                    });
                });
            });
            describe('removing choices', function () {
                var removedChoiceText;
                beforeEach(function () {
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .last()
                        .then(function ($choice) {
                        removedChoiceText = $choice.text().trim();
                    })
                        .click();
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__input--cloned')
                        .type('{backspace}');
                });
                describe('on backspace', function () {
                    it('removes last choice', function () {
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__list--multiple')
                            .children()
                            .should('have.length', 0);
                    });
                    it('updates the value of the original input', function () {
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__input[hidden]')
                            .should(function ($select) {
                            var val = $select.val() || [];
                            expect(val).to.not.contain(removedChoiceText);
                        });
                    });
                });
            });
            describe('searching choices', function () {
                describe('on input', function () {
                    describe('searching by label', function () {
                        it('displays choices filtered by inputted value', function () {
                            cy.get('[data-test-hook=basic]')
                                .find('.choices__input--cloned')
                                .type('item 2');
                            cy.get('[data-test-hook=basic]')
                                .find('.choices__list--dropdown .choices__list')
                                .children()
                                .first()
                                .should(function ($choice) {
                                expect($choice.text().trim()).to.equal('Choice 2');
                            });
                        });
                    });
                    describe('searching by value', function () {
                        it('displays choices filtered by inputted value', function () {
                            cy.get('[data-test-hook=basic]')
                                .find('.choices__input--cloned')
                                .type('find me');
                            cy.get('[data-test-hook=basic]')
                                .find('.choices__list--dropdown .choices__list')
                                .children()
                                .first()
                                .should(function ($choice) {
                                expect($choice.text().trim()).to.equal('Choice 3');
                            });
                        });
                    });
                    describe('no results found', function () {
                        it('displays "no results found" prompt', function () {
                            cy.get('[data-test-hook=basic]')
                                .find('.choices__input--cloned')
                                .type('faergge');
                            cy.get('[data-test-hook=basic]')
                                .find('.choices__list--dropdown')
                                .should('be.visible')
                                .should(function ($dropdown) {
                                var dropdownText = $dropdown.text().trim();
                                expect(dropdownText).to.equal('No results found');
                            });
                        });
                    });
                });
            });
            describe('disabling', function () {
                describe('on disable', function () {
                    it('disables the search input', function () {
                        cy.get('[data-test-hook=basic]')
                            .find('button.disable')
                            .focus()
                            .click();
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__input--cloned')
                            .should('be.disabled');
                    });
                });
            });
            describe('enabling', function () {
                describe('on enable', function () {
                    it('enables the search input', function () {
                        cy.get('[data-test-hook=basic]')
                            .find('button.enable')
                            .focus()
                            .click();
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__input--cloned')
                            .should('not.be.disabled');
                    });
                });
            });
        });
        describe('remove button', function () {
            /*
              {
                removeItemButton: true,
              };
            */
            beforeEach(function () {
                cy.get('[data-test-hook=remove-button]')
                    .find('.choices__input--cloned')
                    .focus();
                cy.get('[data-test-hook=remove-button]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .last()
                    .click();
            });
            describe('on click', function () {
                it('removes respective choice', function () {
                    cy.get('[data-test-hook=remove-button]')
                        .find('.choices__list--multiple .choices__item')
                        .last()
                        .find('.choices__button')
                        .focus()
                        .click();
                    cy.get('[data-test-hook=remove-button]')
                        .find('.choices__list--multiple')
                        .children()
                        .should('have.length', 0);
                });
            });
        });
        describe('disabled choice', function () {
            describe('selecting a disabled choice', function () {
                beforeEach(function () {
                    cy.get('[data-test-hook=disabled-choice]')
                        .find('.choices__input--cloned')
                        .focus();
                    cy.get('[data-test-hook=disabled-choice]')
                        .find('.choices__list--dropdown .choices__item--disabled')
                        .click();
                });
                it('does not select choice', function () {
                    cy.get('[data-test-hook=disabled-choice]')
                        .find('.choices__list--multiple .choices__item')
                        .should('have.length', 0);
                });
                it('keeps choice dropdown open', function () {
                    cy.get('[data-test-hook=disabled-choice]')
                        .find('.choices__list--dropdown')
                        .should('be.visible');
                });
            });
        });
        describe('adding items disabled', function () {
            /*
              {
                addItems: false,
              }
            */
            it('disables the search input', function () {
                cy.get('[data-test-hook=add-items-disabled]')
                    .find('.choices__input--cloned')
                    .should('be.disabled');
            });
            describe('on click', function () {
                it('does not open choice dropdown', function () {
                    cy.get('[data-test-hook=add-items-disabled]')
                        .find('.choices')
                        .click()
                        .find('.choices__list--dropdown')
                        .should('not.have.class', 'is-active');
                });
            });
        });
        describe('disabled via attribute', function () {
            it('disables the search input', function () {
                cy.get('[data-test-hook=disabled-via-attr]')
                    .find('.choices__input--cloned')
                    .should('be.disabled');
            });
            describe('on click', function () {
                it('does not open choice dropdown', function () {
                    cy.get('[data-test-hook=disabled-via-attr]')
                        .find('.choices')
                        .click()
                        .find('.choices__list--dropdown')
                        .should('not.have.class', 'is-active');
                });
            });
        });
        describe('selection limit', function () {
            /*
                {
                  maxItemCount: 5,
                }
              */
            var selectionLimit = 5;
            beforeEach(function () {
                for (var index = 0; index < selectionLimit; index++) {
                    cy.get('[data-test-hook=selection-limit]')
                        .find('.choices__input--cloned')
                        .focus();
                    cy.get('[data-test-hook=selection-limit]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .click();
                }
            });
            it('displays "limit reached" prompt', function () {
                cy.get('[data-test-hook=selection-limit]')
                    .find('.choices__list--dropdown')
                    .should('be.visible')
                    .should(function ($dropdown) {
                    var dropdownText = $dropdown.text().trim();
                    expect(dropdownText).to.equal("Only ".concat(selectionLimit, " values can be added"));
                });
            });
        });
        describe('prepend/append', function () {
            /*
              {
                prependValue: 'before-',
                appendValue: '-after',
              }
            */
            var selectedChoiceText;
            beforeEach(function () {
                cy.get('[data-test-hook=prepend-append]')
                    .find('.choices__input--cloned')
                    .focus();
                cy.get('[data-test-hook=prepend-append]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .last()
                    .then(function ($choice) {
                    selectedChoiceText = $choice.text().trim();
                })
                    .click();
            });
            it('prepends and appends value to inputted value', function () {
                cy.get('[data-test-hook=prepend-append]')
                    .find('.choices__list--multiple .choices__item')
                    .last()
                    .should(function ($choice) {
                    expect($choice.data('value')).to.equal("before-".concat(selectedChoiceText, "-after"));
                });
            });
            it('displays just the inputted value to the user', function () {
                cy.get('[data-test-hook=prepend-append]')
                    .find('.choices__list--multiple .choices__item')
                    .last()
                    .should(function ($choice) {
                    expect($choice.text()).to.not.contain("before-".concat(selectedChoiceText, "-after"));
                    expect($choice.text()).to.contain(selectedChoiceText);
                });
            });
        });
        describe('render choice limit', function () {
            /*
              {
                renderChoiceLimit: 1,
              }
            */
            it('only displays given number of choices in the dropdown', function () {
                cy.get('[data-test-hook=render-choice-limit]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .should('have.length', 1);
            });
        });
        describe('search floor', function () {
            /*
              {
                searchFloor: 10,
              }
            */
            describe('on input', function () {
                describe('search floor not reached', function () {
                    it('displays choices not filtered by inputted value', function () {
                        var searchTerm = 'item 2';
                        cy.get('[data-test-hook=search-floor]')
                            .find('.choices__input--cloned')
                            .type(searchTerm);
                        cy.get('[data-test-hook=search-floor]')
                            .find('.choices__list--dropdown .choices__list')
                            .children()
                            .first()
                            .should(function ($choice) {
                            expect($choice.text().trim()).to.not.contain(searchTerm);
                        });
                    });
                });
                describe('search floor reached', function () {
                    it('displays choices filtered by inputted value', function () {
                        var searchTerm = 'Choice 2';
                        cy.get('[data-test-hook=search-floor]')
                            .find('.choices__input--cloned')
                            .type(searchTerm);
                        cy.get('[data-test-hook=search-floor]')
                            .find('.choices__list--dropdown .choices__list')
                            .children()
                            .first()
                            .should(function ($choice) {
                            expect($choice.text().trim()).to.contain(searchTerm);
                        });
                    });
                });
            });
        });
        describe('placeholder via empty option value', function () {
            describe('when no value has been inputted', function () {
                it('displays a placeholder', function () {
                    cy.get('[data-test-hook=placeholder-via-option-value]')
                        .find('.choices__input--cloned')
                        .should('have.attr', 'placeholder', 'I am a placeholder');
                });
            });
            describe('when a value has been inputted', function () {
                it('does not display a placeholder', function () {
                    cy.get('[data-test-hook=placeholder-via-option-value]')
                        .find('.choices__input--cloned')
                        .type('test')
                        .should('not.have.value', 'I am a placeholder');
                });
            });
        });
        describe('placeholder via option attribute', function () {
            describe('when no value has been inputted', function () {
                it('displays a placeholder', function () {
                    cy.get('[data-test-hook=placeholder-via-option-attr]')
                        .find('.choices__input--cloned')
                        .should('have.attr', 'placeholder', 'I am a placeholder');
                });
            });
            describe('when a value has been inputted', function () {
                it('does not display a placeholder', function () {
                    cy.get('[data-test-hook=placeholder-via-option-attr]')
                        .find('.choices__input--cloned')
                        .type('test')
                        .should('not.have.value', 'I am a placeholder');
                });
            });
        });
        describe('remote data', function () {
            beforeEach(function () {
                cy.reload(true);
            });
            describe('when loading data', function () {
                it('shows a loading message as a placeholder', function () {
                    cy.get('[data-test-hook=remote-data]')
                        .find('.choices__input--cloned')
                        .should('have.attr', 'placeholder', 'Loading...');
                });
                describe('on click', function () {
                    it('does not open choice dropdown', function () {
                        cy.get('[data-test-hook=remote-data]')
                            .find('.choices')
                            .click()
                            .find('.choices__list--dropdown')
                            .should('not.have.class', 'is-active');
                    });
                });
            });
            describe('when data has loaded', function () {
                describe('opening the dropdown', function () {
                    it('displays the loaded data', function () {
                        cy.wait(1000);
                        cy.get('[data-test-hook=remote-data]')
                            .find('.choices__list--dropdown .choices__list')
                            .children()
                            .should('have.length', 50)
                            .each(function ($choice, index) {
                            expect($choice.text().trim()).to.equal("Label ".concat(index + 1));
                            expect($choice.data('value')).to.equal("Value ".concat(index + 1));
                        });
                    });
                });
            });
        });
        describe('dropdown scrolling', function () {
            var choicesCount;
            beforeEach(function () {
                cy.get('[data-test-hook=scrolling-dropdown]')
                    .find('.choices__list--dropdown .choices__list .choices__item')
                    .then(function ($choices) {
                    choicesCount = $choices.length;
                });
                cy.get('[data-test-hook=scrolling-dropdown]')
                    .find('.choices__input--cloned')
                    .focus();
            });
            it('highlights first choice on dropdown open', function () {
                cy.get('[data-test-hook=scrolling-dropdown]')
                    .find('.choices__list--dropdown .choices__list .is-highlighted')
                    .should(function ($choice) {
                    expect($choice.text().trim()).to.equal('Choice 1');
                });
            });
            it('scrolls to next choice on down arrow', function () {
                var _loop_1 = function (index) {
                    cy.wait(100);
                    cy.get('[data-test-hook=scrolling-dropdown]')
                        .find('.choices__list--dropdown .choices__list .is-highlighted')
                        .invoke('text')
                        .then(function (text) {
                        expect(text.trim()).to.equal("Choice ".concat(index));
                    });
                    cy.get('[data-test-hook=scrolling-dropdown]')
                        .find('.choices__input--cloned')
                        .type('{downarrow}');
                };
                for (var index = 1; index <= choicesCount; index++) {
                    _loop_1(index);
                }
            });
            it('scrolls up to previous choice on up arrow', function () {
                // scroll to last choice
                for (var index = 0; index < choicesCount; index++) {
                    cy.get('[data-test-hook=scrolling-dropdown]')
                        .find('.choices__input--cloned')
                        .type('{downarrow}');
                }
                var _loop_2 = function (index) {
                    cy.wait(100); // allow for dropdown animation to finish
                    cy.get('[data-test-hook=scrolling-dropdown]')
                        .find('.choices__list--dropdown .choices__list .is-highlighted')
                        .invoke('text')
                        .then(function (text) {
                        expect(text.trim()).to.equal("Choice ".concat(index));
                    });
                    cy.get('[data-test-hook=scrolling-dropdown]')
                        .find('.choices__input--cloned')
                        .type('{uparrow}');
                };
                // scroll up to first choice
                for (var index = choicesCount; index > 0; index--) {
                    _loop_2(index);
                }
            });
        });
        describe('choice groups', function () {
            var choicesInGroup = 3;
            var groupValue;
            beforeEach(function () {
                cy.get('[data-test-hook=groups]')
                    .find('.choices__list--dropdown .choices__list .choices__group')
                    .first()
                    .then(function ($group) {
                    groupValue = $group.text().trim();
                });
            });
            describe('selecting all choices in group', function () {
                it('removes group from dropdown', function () {
                    for (var index = 0; index < choicesInGroup; index++) {
                        cy.get('[data-test-hook=groups]')
                            .find('.choices__input--cloned')
                            .focus();
                        cy.get('[data-test-hook=groups]')
                            .find('.choices__list--dropdown .choices__list .choices__item')
                            .first()
                            .click();
                    }
                    cy.get('[data-test-hook=groups]')
                        .find('.choices__list--dropdown .choices__list .choices__group')
                        .first()
                        .should(function ($group) {
                        expect($group.text().trim()).to.not.equal(groupValue);
                    });
                });
            });
            describe('deselecting all choices in group', function () {
                beforeEach(function () {
                    for (var index = 0; index < choicesInGroup; index++) {
                        cy.get('[data-test-hook=groups]')
                            .find('.choices__input--cloned')
                            .focus();
                        cy.get('[data-test-hook=groups]')
                            .find('.choices__list--dropdown .choices__list .choices__item')
                            .first()
                            .click();
                    }
                });
                it('shows group in dropdown', function () {
                    for (var index = 0; index < choicesInGroup; index++) {
                        cy.get('[data-test-hook=groups]')
                            .find('.choices__input--cloned')
                            .focus()
                            .type('{backspace}');
                    }
                    cy.get('[data-test-hook=groups]')
                        .find('.choices__list--dropdown .choices__list .choices__group')
                        .first()
                        .should(function ($group) {
                        expect($group.text().trim()).to.equal(groupValue);
                    });
                });
            });
        });
        describe('custom properties', function () {
            beforeEach(function () {
                cy.get('[data-test-hook=custom-properties]')
                    .find('.choices__input--cloned')
                    .focus();
            });
            describe('on input', function () {
                it('filters choices based on custom property', function () {
                    var data = [
                        {
                            country: 'Germany',
                            city: 'Berlin',
                        },
                        {
                            country: 'United Kingdom',
                            city: 'London',
                        },
                        {
                            country: 'Portugal',
                            city: 'Lisbon',
                        },
                    ];
                    data.forEach(function (_a) {
                        var country = _a.country, city = _a.city;
                        cy.get('[data-test-hook=custom-properties]')
                            .find('.choices__input--cloned')
                            .type(country);
                        cy.get('[data-test-hook=custom-properties]')
                            .find('.choices__list--dropdown .choices__list')
                            .children()
                            .first()
                            .should(function ($choice) {
                            expect($choice.text().trim()).to.equal(city);
                        });
                        cy.get('[data-test-hook=custom-properties]')
                            .find('.choices__input--cloned')
                            .type('{selectall}{del}');
                    });
                });
            });
        });
        describe('non-string values', function () {
            beforeEach(function () {
                cy.get('[data-test-hook=non-string-values]').find('.choices').click();
            });
            it('displays expected amount of choices in dropdown', function () {
                cy.get('[data-test-hook=non-string-values]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .should('have.length', 4);
            });
            it('allows selecting choices from dropdown', function () {
                var $selectedChoice;
                cy.get('[data-test-hook=non-string-values]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .first()
                    .then(function ($choice) {
                    $selectedChoice = $choice;
                })
                    .click();
                cy.get('[data-test-hook=non-string-values]')
                    .find('.choices__list--single .choices__item')
                    .last()
                    .should(function ($item) {
                    expect($item.text().trim()).to.equal($selectedChoice.text().trim());
                });
            });
        });
        describe('within form', function () {
            describe('selecting choice', function () {
                describe('on enter key', function () {
                    it('selects choice', function () {
                        cy.get('[data-test-hook=within-form] form').then(function ($form) {
                            $form.submit(function () {
                                // this will fail the test if the form submits
                                throw new Error('Form submitted');
                            });
                        });
                        cy.get('[data-test-hook=within-form]')
                            .find('.choices__input--cloned')
                            .click()
                            .type('{enter}');
                        cy.get('[data-test-hook=within-form]')
                            .find('.choices__list--multiple .choices__item')
                            .last()
                            .should(function ($item) {
                            expect($item).to.contain('Choice 1');
                        });
                    });
                });
            });
        });
        describe('dynamically setting choice by value', function () {
            var dynamicallySelectedChoiceValue = 'Choice 2';
            it('selects choice', function () {
                cy.get('[data-test-hook=set-choice-by-value]')
                    .find('.choices__list--multiple .choices__item')
                    .last()
                    .should(function ($choice) {
                    expect($choice.text().trim()).to.equal(dynamicallySelectedChoiceValue);
                });
            });
            it('removes choice from dropdown list', function () {
                cy.get('[data-test-hook=set-choice-by-value]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .each(function ($choice) {
                    expect($choice.text().trim()).to.not.equal(dynamicallySelectedChoiceValue);
                });
            });
            it('updates the value of the original input', function () {
                cy.get('[data-test-hook=set-choice-by-value]')
                    .find('.choices__input[hidden]')
                    .should(function ($select) {
                    var val = $select.val() || [];
                    expect(val).to.contain(dynamicallySelectedChoiceValue);
                });
            });
        });
        describe('searching by label only', function () {
            it('gets zero results when searching by value', function () {
                cy.get('[data-test-hook=search-by-label]')
                    .find('.choices__input--cloned')
                    .type('value1');
                cy.get('[data-test-hook=search-by-label]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .first()
                    .should(function ($choice) {
                    expect($choice.text().trim()).to.equal('No results found');
                });
            });
            it('gets a result when searching by label', function () {
                cy.get('[data-test-hook=search-by-label]')
                    .find('.choices__input--cloned')
                    .type('label1');
                cy.get('[data-test-hook=search-by-label]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .first()
                    .should(function ($choice) {
                    expect($choice.text().trim()).to.equal('label1');
                });
            });
        });
        describe('allow html', function () {
            describe('is undefined', function () {
                it('logs a deprecation warning', function () {
                    cy.get('@consoleWarn').should('be.calledOnceWithExactly', 'Deprecation warning: allowHTML will default to false in a future release. To render HTML in Choices, you will need to set it to true. Setting allowHTML will suppress this message.');
                });
                it('does not show as text when selected', function () {
                    cy.get('[data-test-hook=allowhtml-undefined]')
                        .find('.choices__list--multiple .choices__item')
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('Choice 1');
                    });
                });
                it('does not show html as text in dropdown', function () {
                    cy.get('[data-test-hook=allowhtml-undefined]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('Choice 2');
                    });
                });
            });
            describe('set to true', function () {
                it('does not show as text when selected', function () {
                    cy.get('[data-test-hook=allowhtml-true]')
                        .find('.choices__list--multiple .choices__item')
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('Choice 1');
                    });
                });
                it('does not show html as text in dropdown', function () {
                    cy.get('[data-test-hook=allowhtml-true]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('Choice 2');
                    });
                });
            });
            describe('set to false', function () {
                it('shows html as text when selected', function () {
                    cy.get('[data-test-hook=allowhtml-false]')
                        .find('.choices__list--multiple .choices__item')
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('<b>Choice 1</b>');
                    });
                });
                it('shows html as text', function () {
                    cy.get('[data-test-hook=allowhtml-false]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('<b>Choice 2</b>');
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=select-multiple.spec.js.map