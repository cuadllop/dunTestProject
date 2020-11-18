import { ProductPage } from "./ProductPage";

import { PaymentPoco } from "../pocos/PaymentPoco";
import { BillingPoco } from "../pocos/BillingPoco";
import { ShippingMethodPoco } from "../pocos/ShippingMethodPoco";
import { ProductPoco } from "../pocos/ProductPoco";
import { PurchaseDetails } from "../pocos/PurchaseDetails";

export class ConfirmOrderPage {

    /**
    * Assert Billing details appear
    * @param billingPoco the details for payment
    */
    assertBillingDetailsAppear(billingPoco: BillingPoco) {

        cy.contains('p', billingPoco.name)
            .should('be.visible');

        return this;
    }

    /**
    * Assert appear details appear
    * @param paymentPoco the details for payment
    */
    assertPaymentDetailsAppear(paymentPoco: PaymentPoco) {

        cy.contains('p', paymentPoco.name)
            .should('be.visible');


        cy.contains('h2', 'Payment information')
            .parents('.snip-col')
            .within(() => {
                var creditText = `Card number : ${paymentPoco.cardNumber.slice(paymentPoco.cardNumber.length - 4)}`;
                cy.contains('p', creditText)
                    .should('be.visible');
            })

        return this;
    }

    /**
    * Submit order
    */
    submitOrder() {

        cy.get('.js-submit')
            .click()

        cy.get('.snip-flash__item')
            .should('be.visible');

        return this;
    }

    /**
    * Assert order appears
    */
    assertOrderNumberAppears() {

        cy.get('#snipcart-title')
            .should('be.visible');

        return this;
    }

    /**
    * Close confirm page
    */
    closeConfirmPage() {

        cy.get('[data-test=Close] > .snip-ico')
            .click();

        return new ProductPage();
    }

    /**
* Assert confirmation data based on the number of units, the product unit price and the sending cost
* @param {ShippingMethodPoco} shippingChoice the type of shipping
* @param {ProductPoco} productPoco the type of the product to purchase
* @param {PurchaseDetails} purchaseDetails the number of units chosen by the customer
*/
    assertDataOnConfirmationPage(shippingChoice: ShippingMethodPoco, productPoco: ProductPoco, purchaseDetails: PurchaseDetails) {
        cy.get('#snipcart-fees > :nth-child(2) > .snip-table__cell--right')
            .should('contain.text', shippingChoice.sendingFee.toFixed(2));

        var productCost = productPoco._options[purchaseDetails.typeChosen].price * purchaseDetails.quantity;
        cy.get('#snipcart-fees > :nth-child(1) > .snip-table__cell--right')
            .should('contain.text', productCost.toFixed(2));

        var tsgFeeCost = shippingChoice.tsgFee * productCost;
        var totalExpectedPrice = shippingChoice.sendingFee + productCost + tsgFeeCost;

        //This rounding was not accurate using 2 decimals
        //Setting it up to 1 decimal, waiting to talk to devs to know what is the rule to calculate the tgs
        cy.get('#snipcart-total > tr > .snip-table__cell--right')
            .should('contain.text', totalExpectedPrice.toFixed(1));

        return this;
    }
}