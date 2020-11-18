import { ProductPage } from "../pageObjects/ProductPage";
import { ProductsList } from "../pageObjects/ProductsList";
import { CheckoutPage } from "../pageObjects/CheckoutPage";
import { CheckoutLoginPage } from "../pageObjects/CheckoutLoginPage";
import { BillingAddressPage } from "../pageObjects/BillingAddressPage";
import { PaymentMethodsPage } from "../pageObjects/PaymentMethodsPage"
import { ConfirmOrderPage } from "../pageObjects/ConfirmOrderPage"
import { ShippingMethodsPage } from "../pageObjects/ShippingMethodsPage";

import { ProductPoco } from "../pocos/ProductPoco";
import { PurchaseDetails } from "../pocos/PurchaseDetails";
import { PaymentPoco } from "../pocos/PaymentPoco";
import { BillingPoco } from "../pocos/BillingPoco";
import { ShippingMethodPoco } from "../pocos/ShippingMethodPoco";


const snipCartEndpoint = Cypress.env('snipCartEndpoint');

context(`Cart scenarios`, () => {

    describe(`select items from cart`, () => {

        before(function () {
            cy.server();
        })

        it(`select items from cart`, () => {

            var productData = ProductPoco.getBowTieProduct();

            var purchaseDetailsData = PurchaseDetails.getSomePurchaseDetails()
            var itemOptionChosenData = purchaseDetailsData.typeChosen;

            var billingAddressData = BillingPoco.getSomeRandomAddress();
            var paymentData = PaymentPoco.getPaymentExample()
            var shippingChoiceData = ShippingMethodPoco.getWorldwideShippingMethod()

            cy.visit(snipCartEndpoint);

            var productListPage = new ProductsList();
            var productPage = productListPage.clickOnItem(productData._name)

            var checkoutPage = productPage.assertOptions(productData._options)
                .selectProduct(productData._options[itemOptionChosenData].name)
                .assertProductImageShowing(productData.getImageOption(itemOptionChosenData))
                .assertColorCheckoutButton(productData._color)
                .assertPriceName(productData._options[itemOptionChosenData].price)
                .clickOnBuyButton();

            var checkoutLoginPage = checkoutPage.increaseUnitsToPurchase(productData._name, purchaseDetailsData.quantity, productData._options[itemOptionChosenData].price)
                .assertTotalAmountPerProduct(productData._name, purchaseDetailsData.quantity, productData._options[itemOptionChosenData].price)
                .assertRemoveButtonStyle(productData._name)
                .clickOnNextButton()
                .assertGuestCheckoutContainerAppears()
                .assertLoginContainerAppears()
                .assertNewAccountContainerAppears()
                .assertPageUrlFormat();


            var billingAddressPage = checkoutLoginPage.assertTotalAmountPerProduct(productData._name, purchaseDetailsData.quantity, productData._options[itemOptionChosenData].price)
                .clickOnCheckout();

            var shippingMethodsPage = billingAddressPage.typeRequiredBillingInfo(billingAddressData);
            var paymentMethodsPage = shippingMethodsPage.selectWorldWideMethod(shippingChoiceData);

            var confirmOrderPage = paymentMethodsPage.addPaymentDetails(paymentData);
            confirmOrderPage.assertBillingDetailsAppear(billingAddressData)
                .assertPaymentDetailsAppear(paymentData)
                .submitOrder()
                .assertOrderNumberAppears()
                .assertDataOnConfirmationPage(shippingChoiceData, productData, purchaseDetailsData)
                .closeConfirmPage();

        });

        it(`verify product profile`, () => {

            var productPoco = ProductPoco.getDryMartiniProduct();
            var itemOption = 1;

            cy.visit(snipCartEndpoint);

            var productList = new ProductsList();
            var productPage = productList.clickOnItem(productPoco._name)

            productPage.assertOptions(productPoco._options)
                .selectProduct(productPoco._options[itemOption].name)
                .assertProductImageShowing(productPoco.getImageOption(itemOption))
                .assertColorCheckoutButton(productPoco._color)
                .assertPriceName(productPoco._options[itemOption].price)
                .assertPageUrlFormat(snipCartEndpoint, productPoco.getUrlNameFormat());
        });
    });
});