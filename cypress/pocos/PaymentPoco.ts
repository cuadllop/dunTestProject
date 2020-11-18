export class PaymentPoco
{
    name : string;
    cardNumber: string;
    cvc: string;
    expirationMonth: string;
    experationYear: string;

    static getPaymentExample()
    {
        //IMPORTANT
        //It looks like it does not accept any other credit card number than the one already populated
        //Not using the credit card number generation, otherwise fails
        const RandExp = require('randexp');
        var regexFormat = /^4242[0-9]{12}(?:[0-9]{3})?$/;
        var creditCardNumber  = new RandExp(regexFormat).gen();

        var jsonInfo = {
            "name": 'Bow Ties',
            "cardNumber": '4242424242424242',
            "cvc": "232",
            "expirationMonth":'January',
            "experationYear":'2022'
        };

        return Object.assign(new PaymentPoco(), jsonInfo);
    }
}
