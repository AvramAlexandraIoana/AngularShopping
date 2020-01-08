import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any[];
  baseUrl: string;
  constructor(private service: MainService) { }

  ngOnInit() {
    console.log("Ioana");
    this.baseUrl = "https://shoppingcartangular-6b27c.firebaseio.com/products.json";
    this.products = this.getProducts();
    console.log(this.products);

  }

  getProducts()  {
    return this.service.get(this.baseUrl);
  }


}
