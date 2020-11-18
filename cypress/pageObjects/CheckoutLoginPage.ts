import {BillingAddressPage} from './BillingAddressPage'

export class CheckoutLoginPage {
    /**
     * Assert total per product
    * @param {string} productName the name of the product to increase the quantity
     * @param {Int16Array} quantity units to buy
     * @param {Float32Array} unitPrice price per unit
     */
    public assertTotalAmountPerProduct(productName, quantity: Int16Array, unitPrice: Float32Array) {
        var total = quantity * unitPrice;

        cy.get('#snipcart-amount')
            .should('contain.text', `${total}`)

        return this;
    }

    /**
     * Assert guest checkout container appears
     */
    public assertGuestCheckoutContainerAppears() {
        //asserting hex color efe778
        cy.get('#snipcart-guest-checkout')
            .should('be.visible')
            .should('have.css', 'background-color', 'rgb(239, 231, 120)');

        
        return this;
    }

        /**
     * Click on Checkout color
     */
    public clickOnCheckout() {
        //asserting hex color efe778
        cy.get('#snipcart-guest-checkout')
            .click();

        return new BillingAddressPage();
    }

    /**
     * Assert guest checkout container appears
     */
    public assertLoginContainerAppears() {
        cy.get('#snipcart-login-submit')
            .should('be.visible');
        return this;
    }


    /**
 * Assert guest checkout container appears
 */
    public assertNewAccountContainerAppears() {
        cy.get('#snipcart-newaccount-submit')
            .should('be.visible');
        return this;
    }


        /**
* Assert the url format
*/
public assertPageUrlFormat() {

    cy.url().should('contain', `login`);

    return this;
}

}