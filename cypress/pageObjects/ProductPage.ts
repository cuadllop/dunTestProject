import { CheckoutPage } from "./CheckoutPage"

const buyButtonSelector = '#buyButton';
const selectLocator = 'select';

export class ProductPage {

    /**
     * Opens the page of a product
     * @param {string} productOption the name of the option product to choose
     */
    public selectProduct(productOption: string) {
        cy.get(selectLocator)
            .select(productOption);

        return this;
    }

    /**
     * Assert the options available of the product to choose from
     * @param {Array<string>} expectedOptions to assert}
     */
    public assertOptions(expectedOptions) {
        cy.get(selectLocator)
            .within(() => {
                for (let i = 0, len = expectedOptions.length; i < len; i++) {
                    cy.contains('option', expectedOptions[i].name)
                        .should('exist');
                }
            });

        return this;
    }

    /**
     * Assert the color of the checkout button
     *  @param {string} color the color to assert
     */
    public assertColorCheckoutButton(color) {
        cy.get(buyButtonSelector)
            .should('have.css', 'background-color', color);

        return this;
    }

    /**
     * Assert the price showing for the product
     * @param {string} price the price of the item to assert
     */
    public assertPriceName(price: string) {
        cy.get(buyButtonSelector)
            .should('have.text', `Buy for ${price}$`);

        return this;
    }


    /**
 * Click on the buy button to purchase the product
 */
    public clickOnBuyButton() {
        cy.get(buyButtonSelector)
            .scrollIntoView({ offset: { down: 150, left: 0 } });

        //Bad practice but required to make it work in headless mode
        //Running from cypress dashboard does not need this wait to work
        //However, for some reason the checkout page was not loading even tried several ways to wait for it.
        cy.wait(2000)

        cy.get(buyButtonSelector)
            .click({ force: true });

        return new CheckoutPage();
    }


    /**
* Assert the image showing
* @param option the option image to assert 
*/
    public assertProductImageShowing(option) {
        cy.get('img')
            .should('have.attr', 'src', option);

        return this;
    }

    /**
* Assert the options available of the product to choose from
*/
    public assertColorCheckoutButton() {
        cy.get(buyButtonSelector)
            .should('have.css', 'background-color', 'rgb(33, 33, 33)');

        return this;
    }

    /**
* Assert the url format
* @param {string} endpoint  the endpoint of the site
* @param {string} productName  the name to find in the url
*/
    public assertPageUrlFormat(endpoint, productName: string) {

        cy.url().should('contain', `${endpoint}${productName}`);

        return this;
    }


}