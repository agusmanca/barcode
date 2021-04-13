import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from './db';

@Injectable({
  providedIn: 'root'
})
export class DbService {

    private productList: Product[] = [];

    constructor(private http: HttpClient) { 
        this.setProductList();
    }

    setProductList(): Promise<void> {
        return new Promise((resolve) => {
            this.http.get('/assets/db.json').subscribe((param: Product[]) => {
                this.productList = param;                  
            });
        })
    }

    getProductList(): Product[] {
        return this.productList;
    }

    updateProdList(param: Product) {
        let prodIdx = this.productList.indexOf(param);

        if(!Object.is(this.productList, param)){
            this.productList[prodIdx] = param;
        }
    }
}
