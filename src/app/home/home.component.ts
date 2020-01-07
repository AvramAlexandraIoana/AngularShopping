import { Component, OnInit } from '@angular/core';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private navbar : NavMenuComponent) { }

  ngOnInit() {
    
  }

}
