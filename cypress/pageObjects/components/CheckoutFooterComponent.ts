export class CheckoutFooterComponent {

    /**
* Click on next button
*/
    static clickOnNextButton() {
        cy.get('.js-next')
            .click();
    }

    /**
* Click on next button by id (for those pages with have a different layout)
*/
    static clickOnNextButtonById() {
        cy.get('#snipcart-next')
            .click();
    }

}