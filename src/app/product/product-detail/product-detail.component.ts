import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MainService } from 'src/app/services/main.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StickyDirection } from '@angular/cdk/table';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: object;
  id: number;
  baseUrl: string;

  constructor(private service: MainService, private route: ActivatedRoute, private toastrService: ToastrService) { }

  ngOnInit() {
    this.baseUrl = "https://shoppingcartangular-6b27c.firebaseio.com/products.json";
    this.id = +(this.route.snapshot.paramMap.get('id'));
    this.product = this.service.getById(this.baseUrl, this.id);

    console.log("ioana");
    console.log(this.id);
    console.log(this.product);


  }

  getProducts()  {
    return this.service.get(this.baseUrl);
  }

}
