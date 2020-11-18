export class BillingPoco {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    email: string;

    static getSomeRandomAddress() {

        const RandExp = require('randexp');
        var regexFormat = /([a-z]\w{0,10})/;

        var temporalBillingAdress = new BillingPoco();
        temporalBillingAdress.name = new RandExp(regexFormat).gen();
        temporalBillingAdress.address = new RandExp(regexFormat).gen();
        temporalBillingAdress.postalCode = new RandExp(regexFormat).gen();
        temporalBillingAdress.city = new RandExp(regexFormat).gen();
        temporalBillingAdress.email = new RandExp(regexFormat).gen() + '@mailinator.com';

        return temporalBillingAdress;
    }

}