import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor(private http: HttpClient) { }

  post(url : string, data : any) {
    this.http
        .post(
          url,
          data
        )
        .subscribe(responseData => {
          console.log(responseData);
        });
  }
  get(url: string) : any[]{
    const postsArray = [];

    this.http
    .get(url)
    .pipe(
      map(responseData => {
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      })
    )
    .subscribe(posts => {
      // ...
      console.log(posts);
      return posts;
    });

    return postsArray;
  }

  getById(url: string, id: number) {
      const productArray = [];
      var count = 0;
      this.http
      .get(url)
      .pipe(
        map(responseData => {
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key) && count == id) {
              console.log(key);
              productArray.push({ ...responseData[key], id: key });
            }
            count += 1;
          }
          return productArray;
        })
      )
      .subscribe(product => {
        // ...
        console.log(product);
        return product;
      });
      console.log(productArray);

      return productArray;
  }

  
}
