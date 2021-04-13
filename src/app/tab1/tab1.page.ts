import { Component } from '@angular/core';
import { Product } from '../DB/db';
import { DbService } from '../DB/db.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    public productList: Product[];

    constructor(private service: DbService) {       
        this.productList = this.service.getProductList();
    }

    public getProductList(): Product[] {
        this.productList = this.service.getProductList();
        return this.productList;
    }

}
