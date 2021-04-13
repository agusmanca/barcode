import { identifierModuleUrl } from "@angular/compiler"

export interface Product {
    id: number;
    name: string;
    type: string;
    price: number;
    bar_code: string;
    stock: number;
}

export interface ProductSelected {
    id: number;
    name: string;
    type: string;
    price: number;
    bar_code: string;
    quantitySelected: number;
}