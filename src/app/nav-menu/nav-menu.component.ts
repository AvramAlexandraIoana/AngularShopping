import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

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

  
  constructor(private router: Router) { 
    this.isExpanded = false;
  }

  ngOnInit() {
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
