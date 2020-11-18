import { ProductPage } from "./ProductPage";

export class ProductsList
{
    /**
     * Opens the page of a product
     * @param {string} productName the name of the product
     */
    public clickOnItem(productName : string) {
        cy.contains(productName)
            .click();

        return new ProductPage();
    }
}
