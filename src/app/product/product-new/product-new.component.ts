import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from 'src/app/shared/image.service';
import { MainService } from 'src/app/services/main.service';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styles: []
})
export class ProductNewComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  productForm : FormGroup;
  baseUrl: string;

 

  constructor(private formBuilder: FormBuilder, private storage: AngularFireStorage, private service: MainService) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      price: ['', [Validators.required]],
      productQuantity: ['',[Validators.required]],
      productSeller: ['', [Validators.required]],
      productAdded: moment(),
      isFavorite: false,
      isAddedToCard: false
    });
    this.baseUrl = "https://shoppingcartangular-6b27c.firebaseio.com/products.json";
    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc =  './assets/images/CL0070655ML.jpg';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.productForm.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['productAdded'] = moment();
            formValue['imageUrl'] = url;
            console.log(formValue);
            this.service.post(this.baseUrl,formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  get formControls() {
    return this.productForm['controls'];
  }
  get f() { return this.productForm.controls; }


  resetForm() {
    this.productForm.reset();
    this.productForm.setValue({
      name: '',
      description: '',
      imageUrl: '',
      category: 'Dress',
      price: '',
      productQuantity: '',
      productSeller: '',
      productAdded: moment(),
      isFavorite: false,
      isAddedToCard: false
    });
    this.imgSrc = './assets/images/CL0070655ML.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

}
