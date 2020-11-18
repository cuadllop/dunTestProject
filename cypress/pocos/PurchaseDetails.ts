export class PurchaseDetails 
{
    quantity : Int16Array;
    typeChosen: Int16Array;

    static getSomePurchaseDetails()
    {
        var purchaseDetails = new PurchaseDetails();
        purchaseDetails.quantity = 5;
        purchaseDetails.typeChosen = 1;

        return purchaseDetails;
    }
}