import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MainService } from '../services/main.service';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'  // <- ADD THIS
})

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded: boolean;
  navbarCartCount: number;
  navbarFavProdCount:  number;
  products: Product[];
  num : number;

  
  constructor(private router: Router) { 
    this.isExpanded = false;
    this.navbarCartCount = 0;
    this.navbarFavProdCount = 0;
    this.ngOnInit();

  }

  ngOnInit() {
    this.navbarCartCount = 10;
    console.log(this.navbarFavProdCount);
    console.log(this.navbarCartCount);
    this.navbarCartCount = this.navbarCartCount + this.navbarFavProdCount;
    console.log(this.navbarFavProdCount);

  }
  
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  showLogOut() {
    if (localStorage.getItem("currentUser")) {
      return true;
    } else {
      return false;
    }
  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(["login"]);

  }

  setNumberOfFavorites(num: number) {
    this.navbarFavProdCount = num;
    this.ngOnInit();
   }
  

  

  
}
