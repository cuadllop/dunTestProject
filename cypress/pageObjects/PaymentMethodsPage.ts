import { PaymentPoco } from './../pocos/PaymentPoco'
import { ConfirmOrderPage } from './ConfirmOrderPage';

export class PaymentMethodsPage {

    /**
    * Assert world wide method and its price appears
    * @param paymentPoco the details for payment
    */
   addPaymentDetails(paymentPoco: PaymentPoco) {

        cy.get('#snip-ownerName')
            .clear()
            .type(paymentPoco.name);

        cy.get('#snip-number')
            .clear()
            .type(paymentPoco.cardNumber);

        cy.get('#snip-cvc')
            .clear()
            .type(paymentPoco.cvc);

        cy.get('#snip-expirationMonth')
            .select(paymentPoco.expirationMonth);

        cy.get('#snip-expirationYear')
            .type(paymentPoco.experationYear);

        cy.get('#snipcart-paymentmethod-pay')
            .click()

        return new ConfirmOrderPage();
    }
}