import { OptionsPoco } from "./OptionsPoco"

export class ProductPoco {
    _name: string;
    _options: Array<OptionsPoco>;
    _color: string;

    constructor() {
    }

    getImageOption(position: Int16Array) {
        return this._options[position].imageSrcLink;
    }

    getUrlNameFormat(position: Int16Array) {
        return this._name.toLowerCase().replace(" ","-");
    }   

    static getBowTieProduct() {
        var jsonProduct = {
            "_name": 'Bow Ties',
            "_color": 'rgb(33, 33, 33)',
            "_options": [
                {"name": 'Blue Red', "price": 7, "imageSrcLink": "/static/blue-red-1afa4782a66a6562030782eb1dabda93.jpg"},
                {"name": 'White Gray', "price": 7, "imageSrcLink": "/static/white-gray-5160a1a58bf56cc27ce8f15df6d124a4.jpg"},
                {"name": 'White Blue', "price": 7, "imageSrcLink": "/static/white-blue-0f4624a37601be391c99f2d7c1e2bd5a.jpg"}
            ]
        };

        return Object.assign(new ProductPoco(), jsonProduct);
    }

    static getDryMartiniProduct() {
        var jsonProduct = {
            "_name": 'Dry Martini',
            "_color": 'rgb(33, 33, 33)',
            "_options": [
                {"name": 'Classic', "price": 8.5, "imageSrcLink": "/static/dry-martini-26f53ee4a63d7eb1464228d2380f3a48.jpg"},
                {"name": 'Large', "price": 8.5, "imageSrcLink": "/static/dry-martini-26f53ee4a63d7eb1464228d2380f3a48.jpg"},
                {"name": 'Gatsby-esque', "price": 8.5, "imageSrcLink": "/static/dry-martini-26f53ee4a63d7eb1464228d2380f3a48.jpg"}
            ]
        };

        return Object.assign(new ProductPoco(), jsonProduct);

    }
}