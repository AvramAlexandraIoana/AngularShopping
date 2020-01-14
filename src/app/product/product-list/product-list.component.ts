import { Component, OnInit, Injectable } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { NavMenuComponent } from 'src/app/nav-menu/nav-menu.component';

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
  navbarFavProdCount: number;
  
  constructor(private service: MainService,  private toastr: ToastrService, private menu: NavMenuComponent) { }

  ngOnInit() {
    this.navbarFavProdCount = 0;
    this.dbPath = '/products';
    this.baseUrl = "https://shoppingcartangular-6b27c.firebaseio.com/products.json";
    this.products = this.getProducts();
    this.filterProduct = this.getProducts();
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
    this.navbarFavProdCount += 1;
    this.menu.setNumberOfFavorites(this.navbarFavProdCount);

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

 

}