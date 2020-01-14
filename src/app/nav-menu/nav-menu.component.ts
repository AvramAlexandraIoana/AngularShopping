import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MainService } from '../services/main.service';
import { ProductListComponent } from '../product/product-list/product-list.component';

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

  
  constructor(private router: Router, private list: ProductListComponent) { 
    this.isExpanded = false;
  }

  ngOnInit() {
    this.navbarCartCount = 10;
    this.navbarFavProdCount = 10;
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
  }

  
}
