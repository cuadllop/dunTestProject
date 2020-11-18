import { PaymentMethodsPage } from './PaymentMethodsPage'
import { ShippingMethodsPage } from './ShippingMethodsPage';
import { CheckoutFooterComponent } from './components/CheckoutFooterComponent'

import { BillingPoco } from './../pocos/BillingPoco';

export class BillingAddressPage {

    /**
* Type the billing address
* @param billingPoco
*/
    typeRequiredBillingInfo(billingPoco: BillingPoco) {
        cy.get('#snip-name')
            .type(billingPoco.name);

        cy.get('#snip-address1')
            .type(billingPoco.address);

        cy.get('#snip-postalCode')
            .type(billingPoco.postalCode);

        cy.get('#snip-city')
            .type(billingPoco.city);

        cy.get('#snip-email')
            .type(billingPoco.email);

        CheckoutFooterComponent.clickOnNextButtonById();

        return new ShippingMethodsPage();
    }
}