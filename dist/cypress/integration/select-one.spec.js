describe('Choices - select one', function () {
    beforeEach(function () {
        cy.visit('/select-one', {
            onBeforeLoad: function (win) {
                cy.stub(win.console, 'warn').as('consoleWarn');
            },
        });
    });
    describe('scenarios', function () {
        describe('basic', function () {
            describe('focusing on container', function () {
                describe('pressing enter key', function () {
                    it('toggles the dropdown', function () {
                        cy.get('[data-test-hook=basic]')
                            .find('.choices')
                            .focus()
                            .type('{enter}');
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__list--dropdown')
                            .should('be.visible');
                        cy.get('[data-test-hook=basic]')
                            .find('.choices')
                            .focus()
                            .type('{enter}');
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__list--dropdown')
                            .should('not.be.visible');
                    });
                });
                describe('pressing an alpha-numeric key', function () {
                    it('opens the dropdown and the input value', function () {
                        var inputValue = 'test';
                        cy.get('[data-test-hook=basic]')
                            .find('.choices')
                            .focus()
                            .type(inputValue);
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__list--dropdown')
                            .should('be.visible');
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__input--cloned')
                            .should('have.value', inputValue);
                    });
                });
            });
            describe('selecting choices', function () {
                beforeEach(function () {
                    // open dropdown
                    cy.get('[data-test-hook=basic]').find('.choices').click();
                });
                var selectedChoiceText = 'Choice 1';
                it('allows selecting choices from dropdown', function () {
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .click();
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__list--single .choices__item')
                        .last()
                        .should(function ($item) {
                        expect($item).to.contain(selectedChoiceText);
                    });
                });
                it('does not remove selected choice from dropdown list', function () {
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .click();
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .should(function ($item) {
                        expect($item).to.contain(selectedChoiceText);
                    });
                });
            });
            describe('searching choices', function () {
                beforeEach(function () {
                    // open dropdown
                    cy.get('[data-test-hook=basic]').find('.choices').click();
                });
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
              }
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
            describe('remove button', function () {
                describe('on click', function () {
                    var removedChoiceText;
                    beforeEach(function () {
                        cy.get('[data-test-hook=remove-button]')
                            .find('.choices__list--single .choices__item')
                            .last()
                            .then(function ($choice) {
                            removedChoiceText = $choice.text().trim();
                        })
                            .click();
                        cy.get('[data-test-hook=remove-button]')
                            .find('.choices__list--single .choices__item')
                            .last()
                            .find('.choices__button')
                            .focus()
                            .click();
                    });
                    it('removes selected choice', function () {
                        cy.get('[data-test-hook=remove-button]')
                            .find('.choices__list--single')
                            .children()
                            .should('have.length', 0);
                    });
                    it('updates the value of the original input', function () {
                        cy.get('[data-test-hook=remove-button]')
                            .find('.choices__input[hidden]')
                            .should(function ($select) {
                            var val = $select.val() || [];
                            expect(val).to.not.contain(removedChoiceText);
                        });
                    });
                });
            });
        });
        describe('disabled choice', function () {
            describe('selecting a disabled choice', function () {
                var selectedChoiceText;
                beforeEach(function () {
                    cy.get('[data-test-hook=disabled-choice]').click();
                    cy.get('[data-test-hook=disabled-choice]')
                        .find('.choices__list--dropdown .choices__item--disabled')
                        .then(function ($choice) {
                        selectedChoiceText = $choice.text().trim();
                    })
                        .click();
                });
                it('does not change selected choice', function () {
                    cy.get('[data-test-hook=prepend-append]')
                        .find('.choices__list--single .choices__item')
                        .last()
                        .should(function ($choice) {
                        expect($choice.text()).to.not.contain(selectedChoiceText);
                    });
                });
                it('closes the dropdown list', function () {
                    cy.get('[data-test-hook=disabled-choice]')
                        .find('.choices__list--dropdown')
                        .should('not.be.visible');
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
                        .click();
                    cy.get('[data-test-hook=add-items-disabled]')
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
                    cy.get('[data-test-hook=disabled-via-attr]').find('.choices').click();
                    cy.get('[data-test-hook=disabled-via-attr]')
                        .find('.choices__list--dropdown')
                        .should('not.have.class', 'is-active');
                });
            });
        });
        describe('prepend/append', function () {
            /*
              {
                prependValue: 'before-',
                appendValue: '-after',
              };
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
                    .find('.choices__list--single .choices__item')
                    .last()
                    .should(function ($choice) {
                    expect($choice.data('value')).to.equal("before-".concat(selectedChoiceText, "-after"));
                });
            });
            it('displays just the inputted value to the user', function () {
                cy.get('[data-test-hook=prepend-append]')
                    .find('.choices__list--single .choices__item')
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
                renderChoiceLimit: 1
              }
            */
            it('only displays given number of choices in the dropdown', function () {
                cy.get('[data-test-hook=render-choice-limit]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .should('have.length', 1);
            });
        });
        describe('search disabled', function () {
            /*
              {
                searchEnabled: false
              }
            */
            var selectedChoiceText = 'Choice 3';
            beforeEach(function () {
                cy.get('[data-test-hook=search-disabled]').find('.choices').click();
            });
            it('does not display a search input', function () {
                cy.get('[data-test-hook=search-disabled]')
                    .find('.choices__input--cloned')
                    .should('not.exist');
            });
            it('allows selecting choices from dropdown', function () {
                cy.get('[data-test-hook=search-disabled]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .last()
                    .click();
                cy.get('[data-test-hook=search-disabled]')
                    .find('.choices__list--single .choices__item')
                    .last()
                    .should(function ($item) {
                    expect($item).to.contain(selectedChoiceText);
                });
            });
        });
        describe('search floor', function () {
            /*
              {
                searchFloor: 10,
              };
            */
            describe('on input', function () {
                beforeEach(function () {
                    cy.get('[data-test-hook=search-floor]')
                        .find('.choices__input--cloned')
                        .focus();
                });
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
            describe('when no choice has been selected', function () {
                it('displays a placeholder', function () {
                    cy.get('[data-test-hook=placeholder-via-option-value]')
                        .find('.choices__list--single')
                        .children()
                        .first()
                        .should('have.class', 'choices__placeholder')
                        .and(function ($placeholder) {
                        expect($placeholder).to.contain('I am a placeholder');
                    });
                });
            });
            describe('when a choice has been selected', function () {
                it('does not display a placeholder', function () {
                    cy.get('[data-test-hook=placeholder-via-option-value]')
                        .find('.choices__input--cloned')
                        .focus();
                    cy.get('[data-test-hook=placeholder-via-option-value]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .click();
                    cy.get('[data-test-hook=placeholder-via-option-value]')
                        .find('.choices__input--cloned')
                        .should('not.have.value', 'I am a placeholder');
                });
            });
            describe('when choice list is open', function () {
                it('displays the placeholder choice first', function () {
                    cy.get('[data-test-hook=placeholder-via-option-value]')
                        .find('.choices__input--cloned')
                        .focus();
                    cy.get('[data-test-hook=placeholder-via-option-value]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .should('have.class', 'choices__placeholder')
                        .should('have.text', 'I am a placeholder');
                });
            });
        });
        describe('placeholder via option attribute', function () {
            describe('when no choice has been selected', function () {
                it('displays a placeholder', function () {
                    cy.get('[data-test-hook=placeholder-via-option-attr]')
                        .find('.choices__list--single')
                        .children()
                        .first()
                        .should('have.class', 'choices__placeholder')
                        .and(function ($placeholder) {
                        expect($placeholder).to.contain('I am a placeholder');
                    });
                });
            });
            describe('when a choice has been selected', function () {
                it('does not display a placeholder', function () {
                    cy.get('[data-test-hook=placeholder-via-option-attr]')
                        .find('.choices__input--cloned')
                        .focus();
                    cy.get('[data-test-hook=placeholder-via-option-attr]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .click();
                    cy.get('[data-test-hook=placeholder-via-option-attr]')
                        .find('.choices__input--cloned')
                        .should('not.have.value', 'I am a placeholder');
                });
            });
            describe('when choice list is open', function () {
                it('displays the placeholder choice first', function () {
                    cy.get('[data-test-hook=placeholder-via-option-attr]')
                        .find('.choices__input--cloned')
                        .focus();
                    cy.get('[data-test-hook=placeholder-via-option-attr]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .should('have.class', 'choices__placeholder')
                        .should('have.text', 'I am a placeholder');
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
                        .find('.choices__list--single')
                        .children()
                        .should('have.length', 1)
                        .first()
                        .should('have.class', 'choices__placeholder')
                        .and(function ($placeholder) {
                        expect($placeholder).to.contain('Loading...');
                    });
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
                            .should('have.length', 51) // 50 choices + 1 placeholder choice
                            .each(function ($choice, index) {
                            if (index === 0) {
                                expect($choice.text().trim()).to.equal('I am a placeholder');
                            }
                            else {
                                expect($choice.text().trim()).to.equal("Label ".concat(index));
                                expect($choice.data('value')).to.equal("Value ".concat(index));
                            }
                        });
                    });
                });
            });
        });
        describe('scrolling dropdown', function () {
            var choicesCount;
            beforeEach(function () {
                cy.get('[data-test-hook=scrolling-dropdown]')
                    .find('.choices__list--dropdown .choices__list .choices__item')
                    .then(function ($choices) {
                    choicesCount = $choices.length;
                });
                cy.get('[data-test-hook=scrolling-dropdown]').find('.choices').click();
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
                    cy.get('[data-test-hook=scrolling-dropdown]')
                        .find('.choices__list--dropdown .choices__list .is-highlighted')
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal("Choice ".concat(index + 1));
                    });
                    cy.get('[data-test-hook=scrolling-dropdown]')
                        .find('.choices__input--cloned')
                        .type('{downarrow}');
                };
                for (var index = 0; index < choicesCount; index++) {
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
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal("Choice ".concat(index));
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
        describe('parent/child', function () {
            describe('selecting "Parent choice 2"', function () {
                it('enables the child Choices instance', function () {
                    cy.get('[data-test-hook=parent-child]')
                        .find('.choices')
                        .eq(1)
                        .should('have.class', 'is-disabled');
                    cy.get('[data-test-hook=parent-child]')
                        .find('.choices')
                        .eq(0)
                        .click();
                    cy.get('[data-test-hook=parent-child]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .eq(1)
                        .click();
                    cy.get('[data-test-hook=parent-child]')
                        .find('.choices')
                        .eq(1)
                        .should('not.have.class', 'is-disabled');
                });
            });
            describe('changing selection from "Parent choice 2" to something else', function () {
                it('disables the child Choices instance', function () {
                    // open parent instance and select second choice
                    cy.get('[data-test-hook=parent-child]')
                        .find('.choices')
                        .eq(0)
                        .click()
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .eq(1)
                        .click();
                    cy.get('[data-test-hook=parent-child]')
                        .find('.choices')
                        .eq(1)
                        .should('not.have.class', 'is-disabled');
                    // open parent instance and select third choice
                    cy.get('[data-test-hook=parent-child]')
                        .find('.choices')
                        .eq(0)
                        .click()
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .eq(2)
                        .click();
                    cy.get('[data-test-hook=parent-child]')
                        .find('.choices')
                        .eq(1)
                        .should('have.class', 'is-disabled');
                });
            });
        });
        describe('custom properties', function () {
            beforeEach(function () {
                cy.get('[data-test-hook=custom-properties]').find('.choices').click();
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
                    it('does not submit form', function () {
                        cy.get('[data-test-hook=within-form] form').then(function ($form) {
                            $form.submit(function () {
                                // this will fail the test if the form submits
                                throw new Error('Form submitted');
                            });
                        });
                        cy.get('[data-test-hook=within-form]')
                            .find('.choices')
                            .click()
                            .find('.choices__input--cloned')
                            .type('{enter}');
                        cy.get('[data-test-hook=within-form]').find('.choices').click();
                        cy.get('[data-test-hook=within-form]')
                            .find('.choices__list--single .choices__item')
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
                    .find('.choices__list--single .choices__item')
                    .last()
                    .should(function ($choice) {
                    expect($choice.text().trim()).to.equal(dynamicallySelectedChoiceValue);
                });
            });
            it('does not remove choice from dropdown list', function () {
                cy.get('[data-test-hook=set-choice-by-value]')
                    .find('.choices__list--dropdown .choices__list')
                    .then(function ($choicesList) {
                    expect($choicesList).to.contain(dynamicallySelectedChoiceValue);
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
            beforeEach(function () {
                cy.get('[data-test-hook=search-by-label]').find('.choices').click();
            });
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
        describe('disabling first choice via options', function () {
            beforeEach(function () {
                cy.get('[data-test-hook=disabled-first-choice-via-options]')
                    .find('.choices')
                    .click();
            });
            var disabledValue;
            it('disables the first choice', function () {
                cy.get('[data-test-hook=disabled-first-choice-via-options]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .first()
                    .should('have.class', 'choices__item--disabled')
                    .then(function ($choice) {
                    disabledValue = $choice.val();
                });
            });
            it('selects the first enabled choice', function () {
                cy.get('[data-test-hook=disabled-first-choice-via-options]')
                    .find('.choices__input[hidden]')
                    .then(function ($option) {
                    expect($option.text().trim()).to.not.equal(disabledValue);
                });
                cy.get('[data-test-hook=disabled-first-choice-via-options]')
                    .find('.choices__item.choices__item--selectable')
                    .first()
                    .should(function ($choice) {
                    expect($choice.text().trim()).to.not.equal(disabledValue);
                });
            });
        });
        describe('allow html', function () {
            describe('is undefined', function () {
                it('logs a deprecation warning', function () {
                    cy.get('@consoleWarn').should('be.calledOnceWithExactly', 'Deprecation warning: allowHTML will default to false in a future release. To render HTML in Choices, you will need to set it to true. Setting allowHTML will suppress this message.');
                });
                it('does not show html as text', function () {
                    cy.get('[data-test-hook=allowhtml-undefined]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('Choice 1');
                    });
                });
            });
            describe('set to true', function () {
                it('does not show html as text', function () {
                    cy.get('[data-test-hook=allowhtml-true]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('Choice 1');
                    });
                });
            });
            describe('set to false', function () {
                it('shows html as text', function () {
                    cy.get('[data-test-hook=allowhtml-false]')
                        .find('.choices__list--dropdown .choices__list')
                        .children()
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('<b>Choice 1</b>');
                    });
                });
            });
        });
        describe('re-initialising a choices instance', function () {
            it('preserves the choices list', function () {
                cy.get('[data-test-hook=new-destroy-init]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .should('have.length', 3);
                cy.get('[data-test-hook=new-destroy-init]')
                    .find('button.destroy')
                    .click();
                cy.get('[data-test-hook=new-destroy-init]').find('button.init').click();
                cy.get('[data-test-hook=new-destroy-init]')
                    .find('.choices__list--dropdown .choices__list')
                    .children()
                    .should('have.length', 3);
            });
        });
        describe('destroying the choices instance', function () {
            it('preserves the original select element', function () {
                cy.get('[data-test-hook=new-destroy-init]')
                    .find('button.destroy')
                    .click();
                cy.get('[data-test-hook=new-destroy-init]')
                    .find('select')
                    .children()
                    .should('have.length', 3);
            });
        });
    });
});
//# sourceMappingURL=select-one.spec.js.map