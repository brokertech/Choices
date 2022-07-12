describe('Choices - text element', function () {
    beforeEach(function () {
        cy.visit('/text', {
            onBeforeLoad: function (win) {
                cy.stub(win.console, 'warn').as('consoleWarn');
            },
        });
    });
    describe('scenarios', function () {
        var textInput = 'testing';
        describe('basic', function () {
            describe('adding items', function () {
                it('allows me to input items', function () {
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__input--cloned')
                        .type(textInput)
                        .type('{enter}');
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__list--multiple .choices__item')
                        .last()
                        .should(function ($el) {
                        expect($el).to.contain(textInput);
                    });
                });
                it('updates the value of the original input', function () {
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__input--cloned')
                        .type(textInput)
                        .type('{enter}');
                    cy.get('[data-test-hook=basic]')
                        .find('.choices__input[hidden]')
                        .should('have.value', textInput);
                });
                describe('inputting data', function () {
                    it('shows a dropdown prompt', function () {
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__input--cloned')
                            .type(textInput);
                        cy.get('[data-test-hook=basic]')
                            .find('.choices__list--dropdown')
                            .should('be.visible')
                            .should(function ($dropdown) {
                            var dropdownText = $dropdown.text().trim();
                            expect(dropdownText).to.equal("Press Enter to add \"".concat(textInput, "\""));
                        });
                    });
                });
            });
        });
        describe('editing items', function () {
            beforeEach(function () {
                for (var index = 0; index < 3; index++) {
                    cy.get('[data-test-hook=edit-items]')
                        .find('.choices__input--cloned')
                        .type(textInput)
                        .type('{enter}');
                }
            });
            describe('on back space', function () {
                it('allows me to change my entry', function () {
                    cy.get('[data-test-hook=edit-items]')
                        .find('.choices__input--cloned')
                        .type('{backspace}')
                        .type('-edited')
                        .type('{enter}');
                    cy.get('[data-test-hook=edit-items]')
                        .find('.choices__list--multiple .choices__item')
                        .last()
                        .should(function ($choice) {
                        expect($choice.data('value')).to.equal("".concat(textInput, "-edited"));
                    });
                });
            });
            describe('on cmd+a', function () {
                beforeEach(function () {
                    cy.get('[data-test-hook=edit-items]')
                        .find('.choices__input--cloned')
                        .type('{cmd}a');
                });
                it('highlights all items', function () {
                    cy.get('[data-test-hook=edit-items]')
                        .find('.choices__list--multiple .choices__item')
                        .each(function ($choice) {
                        expect($choice.hasClass('is-highlighted')).to.equal(true);
                    });
                });
                describe('on backspace', function () {
                    it('clears all inputted values', function () {
                        // two backspaces are needed as Cypress has an issue where
                        // it will also insert an 'a' character into the text input
                        cy.get('[data-test-hook=edit-items]')
                            .find('.choices__input--cloned')
                            .type('{backspace}{backspace}');
                        cy.get('[data-test-hook=edit-items]')
                            .find('.choices__list--multiple .choices__item')
                            .should('have.length', 0);
                    });
                });
            });
        });
        describe('remove button', function () {
            beforeEach(function () {
                cy.get('[data-test-hook=remove-button]')
                    .find('.choices__input--cloned')
                    .type("".concat(textInput))
                    .type('{enter}');
            });
            describe('on click', function () {
                it('removes respective choice', function () {
                    cy.get('[data-test-hook=remove-button]')
                        .find('.choices__list--multiple')
                        .children()
                        .should(function ($items) {
                        expect($items.length).to.equal(1);
                    });
                    cy.get('[data-test-hook=remove-button]')
                        .find('.choices__list--multiple .choices__item')
                        .last()
                        .find('.choices__button')
                        .focus()
                        .click();
                    cy.get('[data-test-hook=remove-button]')
                        .find('.choices__list--multiple .choices__item')
                        .should(function ($items) {
                        expect($items.length).to.equal(0);
                    });
                });
                it('updates the value of the original input', function () {
                    cy.get('[data-test-hook=remove-button]')
                        .find('.choices__list--multiple .choices__item')
                        .last()
                        .find('.choices__button')
                        .focus()
                        .click();
                    cy.get('[data-test-hook=remove-button]')
                        .find('.choices__input[hidden]')
                        .then(function ($input) {
                        expect($input.val()).to.not.contain(textInput);
                    });
                });
            });
        });
        describe('unique values only', function () {
            describe('unique values', function () {
                beforeEach(function () {
                    cy.get('[data-test-hook=unique-values]')
                        .find('.choices__input--cloned')
                        .type("".concat(textInput))
                        .type('{enter}')
                        .type("".concat(textInput))
                        .type('{enter}');
                });
                it('only allows me to input unique values', function () {
                    cy.get('[data-test-hook=unique-values]')
                        .find('.choices__list--multiple')
                        .first()
                        .children()
                        .should(function ($items) {
                        expect($items.length).to.equal(1);
                    });
                });
                describe('inputting a non-unique value', function () {
                    it('displays dropdown prompt', function () {
                        cy.get('[data-test-hook=unique-values]')
                            .find('.choices__list--dropdown')
                            .should('be.visible')
                            .should(function ($dropdown) {
                            var dropdownText = $dropdown.text().trim();
                            expect(dropdownText).to.equal('Only unique values can be added');
                        });
                    });
                });
            });
        });
        describe('input limit', function () {
            var inputLimit = 5;
            beforeEach(function () {
                for (var index = 0; index < inputLimit + 1; index++) {
                    cy.get('[data-test-hook=input-limit]')
                        .find('.choices__input--cloned')
                        .type("".concat(textInput, " + ").concat(index))
                        .type('{enter}');
                }
            });
            it('does not let me input more than 5 choices', function () {
                cy.get('[data-test-hook=input-limit]')
                    .find('.choices__list--multiple')
                    .first()
                    .children()
                    .should(function ($items) {
                    expect($items.length).to.equal(inputLimit);
                });
            });
            describe('reaching input limit', function () {
                it('displays dropdown prompt', function () {
                    cy.get('[data-test-hook=input-limit]')
                        .find('.choices__list--dropdown')
                        .should('be.visible')
                        .should(function ($dropdown) {
                        var dropdownText = $dropdown.text().trim();
                        expect(dropdownText).to.equal("Only ".concat(inputLimit, " values can be added"));
                    });
                });
            });
        });
        describe('add item filter', function () {
            describe('inputting a value that satisfies the filter', function () {
                var input = 'joe@bloggs.com';
                it('allows me to add choice', function () {
                    cy.get('[data-test-hook=add-item-filter]')
                        .find('.choices__input--cloned')
                        .type(input)
                        .type('{enter}');
                    cy.get('[data-test-hook=add-item-filter]')
                        .find('.choices__list--multiple .choices__item')
                        .last()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal(input);
                    });
                });
            });
            describe('inputting a value that does not satisfy the regex', function () {
                it('displays dropdown prompt', function () {
                    cy.get('[data-test-hook=add-item-filter]')
                        .find('.choices__input--cloned')
                        .type("this is not an email address")
                        .type('{enter}');
                    cy.get('[data-test-hook=add-item-filter]')
                        .find('.choices__list--dropdown')
                        .should('be.visible')
                        .should(function ($dropdown) {
                        var dropdownText = $dropdown.text().trim();
                        expect(dropdownText).to.equal('Only values matching specific conditions can be added');
                    });
                });
            });
        });
        describe('prepend/append', function () {
            beforeEach(function () {
                cy.get('[data-test-hook=prepend-append]')
                    .find('.choices__input--cloned')
                    .type(textInput)
                    .type('{enter}');
            });
            it('prepends and appends value to inputted value', function () {
                cy.get('[data-test-hook=prepend-append]')
                    .find('.choices__list--multiple .choices__item')
                    .last()
                    .should(function ($choice) {
                    expect($choice.data('value')).to.equal("before-".concat(textInput, "-after"));
                });
            });
            it('displays just the inputted value to the user', function () {
                cy.get('[data-test-hook=prepend-append]')
                    .find('.choices__list--multiple .choices__item')
                    .last()
                    .should(function ($choice) {
                    expect($choice.text()).to.not.contain("before-".concat(textInput, "-after"));
                    expect($choice.text()).to.contain(textInput);
                });
            });
        });
        describe('adding items disabled', function () {
            it('does not allow me to input data', function () {
                cy.get('[data-test-hook=adding-items-disabled]')
                    .find('.choices__input--cloned')
                    .should('be.disabled');
            });
        });
        describe('disabled via attribute', function () {
            it('does not allow me to input data', function () {
                cy.get('[data-test-hook=disabled-via-attr]')
                    .find('.choices__input--cloned')
                    .should('be.disabled');
            });
        });
        describe('pre-populated choices', function () {
            it('pre-populates choices', function () {
                cy.get('[data-test-hook=prepopulated]')
                    .find('.choices__list--multiple .choices__item')
                    .should(function ($choices) {
                    expect($choices.length).to.equal(2);
                });
                cy.get('[data-test-hook=prepopulated]')
                    .find('.choices__list--multiple .choices__item')
                    .first()
                    .should(function ($choice) {
                    expect($choice.text().trim()).to.equal('Josh Johnson');
                });
                cy.get('[data-test-hook=prepopulated]')
                    .find('.choices__list--multiple .choices__item')
                    .last()
                    .should(function ($choice) {
                    expect($choice.text().trim()).to.equal('Joe Bloggs');
                });
            });
        });
        describe('placeholder', function () {
            /*
              {
                placeholder: true,
                placeholderValue: 'I am a placeholder',
              }
            */
            describe('when no value has been inputted', function () {
                it('displays a placeholder', function () {
                    cy.get('[data-test-hook=placeholder]')
                        .find('.choices__input--cloned')
                        .should('have.attr', 'placeholder', 'I am a placeholder');
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
                        .find('.choices__list--multiple .choices__item')
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('Mason Rogers');
                    });
                });
            });
            describe('set to true', function () {
                it('does not show html as text', function () {
                    cy.get('[data-test-hook=allowhtml-true]')
                        .find('.choices__list--multiple .choices__item')
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('Mason Rogers');
                    });
                });
            });
            describe('set to false', function () {
                it('shows html as text', function () {
                    cy.get('[data-test-hook=allowhtml-false]')
                        .find('.choices__list--multiple .choices__item')
                        .first()
                        .should(function ($choice) {
                        expect($choice.text().trim()).to.equal('<b>Mason Rogers</b>');
                    });
                });
            });
        });
        describe('within form', function () {
            describe('inputting item', function () {
                describe('on enter key', function () {
                    it('does not submit form', function () {
                        cy.get('[data-test-hook=within-form] form').then(function ($form) {
                            $form.submit(function () {
                                // this will fail the test if the form submits
                                throw new Error('Form submitted');
                            });
                        });
                        cy.get('[data-test-hook=within-form]')
                            .find('.choices__input--cloned')
                            .type(textInput)
                            .type('{enter}');
                        cy.get('[data-test-hook=within-form]')
                            .find('.choices__list--multiple .choices__item')
                            .last()
                            .should(function ($el) {
                            expect($el).to.contain(textInput);
                        });
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=text.spec.js.map