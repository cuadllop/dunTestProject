import { PaymentMethodsPage } from './PaymentMethodsPage'
import { CheckoutFooterComponent } from './components/CheckoutFooterComponent'

import { ShippingMethodPoco } from './../pocos/ShippingMethodPoco'

export class ShippingMethodsPage {

    /**
* Assert world wide method and its price appears
*/
    assertWorldWideMethodAppears() {
        cy.get('.snip-worldwide > :nth-child(1) > .snip-product--selectable-item > .snip-product__name')
            .should('be.visible')

        cy.get('.snip-worldwide > .snip-table__cell--right')
            .should('be.visible');

        CheckoutFooterComponent.clickOnNextButton();

        return new PaymentMethodsPage();
    }

    /**
* Select world wide method
* @param {ShippingMethodPoco} shippingMethodPoco the shipping data to add
*/
    selectWorldWideMethod(shippingMethodPoco: ShippingMethodPoco) {
        cy.get('.snip-worldwide > :nth-child(1) > .snip-product--selectable-item > .snip-product__name')
            .click();

        cy.get('.snip-worldwide > .snip-table__cell--right')
            .should('contain', shippingMethodPoco.sendingFee);

        CheckoutFooterComponent.clickOnNextButtonById();

        return new PaymentMethodsPage();
    }
}