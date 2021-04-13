import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { Product, ProductSelected } from '../DB/db';
import { DbService } from '../DB/db.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    private productList: Product[] = [];
    public selectedProductList: ProductSelected[] = [];

    constructor(private barcodeScanner: BarcodeScanner, private service: DbService) {        
        this.productList =this.service.getProductList();
    }

    scanCode(){
        console.log("Scan...");

        this.barcodeScanner.scan().then(barcodeData => {           
            let prodSelected = this.productList.find(p => p.bar_code === barcodeData.text);
          
            if(prodSelected){
              this.addProductToList(prodSelected); 
            }     
            
        }).catch(err => {
            console.log('El producto seleccionado no se encuentra disponible.', err);
        });
    }

    addProductToList(product: Product){

        let findProduct: ProductSelected = this.selectedProductList.find(p => p.id == product.id);

        if(findProduct){
            let idx = this.selectedProductList.indexOf(findProduct);
          
            findProduct.quantitySelected += 1;
            findProduct.price = findProduct.price * findProduct.quantitySelected;
            
            this.selectedProductList[idx] = findProduct;  
            
            this.updateOriginalProductList(product);

        } else {
            let findProduct: ProductSelected = {
                id: product.id,
                name: product.name,
                price: product.price,
                type: product.type,
                bar_code: product.bar_code,
                quantitySelected: 1
            }

            this.selectedProductList.push(findProduct);
            this.updateOriginalProductList(product);
        }
    }

    updateOriginalProductList(product: Product) {
        product.stock -= 1;        
        this.service.updateProdList(product);
    }
}
