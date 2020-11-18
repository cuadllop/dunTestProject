import { CheckoutLoginPage } from './CheckoutLoginPage';
import { CheckoutFooterComponent } from './components/CheckoutFooterComponent'

export class CheckoutPage {
    /**
     * Increase the quantity of units for the product to purchase
     * @param {string} productName the name of the product to increase the quantity
      * @param {Float32Array} unitPrice price per unit
     */
    public increaseUnitsToPurchase(productName: string, quantity: Int16Array, unitPrice) {

        var temportalQty = unitPrice;

        cy.contains('h2', productName)
            .should('be.visible')
            .parentsUntil('#snipcart-items-list')
            .within(() => {
                for (let i = 1; i < quantity; i++) {
                    cy.get('.snip-quantity-trigger__btn--add')
                        .click()

                    temportalQty += unitPrice;
                    cy.get('.snip-table__cell--highlight > span')
                        .should('contain.text', `${temportalQty}`)
                }
            })

        return this;
    }

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
 * Assert remove button style
* @param {string} productName the name of the product to increase the quantity
 */
    public assertRemoveButtonStyle(productName) {
        cy.contains('h2', productName)
            .parentsUntil('#snipcart-items-list')
            .within(() => {
                // The color of that remove button is that one, in hexadecimal is #f10
                cy.get('.snip-product__remove')
                    .should('have.css', 'color', 'rgb(255, 17, 0)');
            })

        return this;
    }


    /**
 * Click on next button
 */
    public clickOnNextButton() {
        CheckoutFooterComponent.clickOnNextButton();

        return new CheckoutLoginPage();
    }

}