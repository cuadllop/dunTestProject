import { ShippingMethodsPage } from "../pageObjects/ShippingMethodsPage";

export class ShippingMethodPoco {
    name: string;
    title: string;
    titleLocator: string;
    priceLocator: string;
    sendingFee: Float32Array;
    tsgFee: Float32Array;

    static getWorldwideShippingMethod() {
        var jsonProduct = {
            "name": 'WorldWideMethod',
            "title": 'Worldwide',
            "titleLocator": '.snip-worldwide > :nth-child(1) > .snip-product--selectable-item > .snip-product__name',
            "priceLocator": "cy.get('.snip - worldwide > .snip - table__cell--right')",
            "sendingFee": 20,
            "tsgFee": 0.078,
        };

        return Object.assign(new ShippingMethodPoco(), jsonProduct);

    }


}