import { Component, OnInit, Injectable } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'  // <- ADD THIS
})

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  filterProduct : Product[];
  baseUrl: string;
  brands = ["Stradivarius", "Bershka", "Zara"];
  dbPath: string;
  constructor(private service: MainService,  private toastr: ToastrService) { }

  ngOnInit() {
    this.dbPath = '/products';
    this.baseUrl = "https://shoppingcartangular-6b27c.firebaseio.com/products.json";
    this.products = this.getProducts();
    this.filterProduct = this.getProducts();
    console.log(this.filterProduct);
    this.numberOfFavorites();


  }

  getProducts()  {
    return this.service.get(this.baseUrl);
  }

  removeProduct(key: string, index: number) {
    this.service.deleteOneRow(key, this.dbPath)
                .catch(err => console.log(err));
    this.products.splice(index, 1);
    this.toastr.success('Product is deleted');

  }

  removeAllProduct() {
    this.service.delete(this.baseUrl).subscribe(() => {
      this.products = [];
      this.toastr.success('All products was deleted!');
    });

  }

  addFavourite(key: string, index: number) {
    this.service
      .update(key, { isFavorite: true }, this.dbPath)
      .catch(err => console.log(err));
    this.products[index].isFavorite = true;
    console.log(this.products);
  }
  

	addToCart(key: string, index: number) {
    this.service
      .update(key, { isAddedToCard: true }, this.dbPath)
      .catch(err => console.log(err));
    this.products[index].isAddedToCard = true;
    console.log(this.products);
  }
  
  filterProducts(filterVal: string) {
    console.log(filterVal);
    if (filterVal != "0") {
      this.products = this.filterProduct.filter((item) => item.productSeller == filterVal);
    } else {
      this.products = this.getProducts();
    }
  }

  numberOfFavorites() {
    console.log("Ioana");
    console.log(this.filterProduct.filter((item) => item.productSeller == 'Zara'));
    return this.filterProduct.filter((item) => item.isFavorite == false);
  }

}