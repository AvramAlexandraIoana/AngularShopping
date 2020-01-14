import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Product } from '../models/product';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private db: AngularFireDatabase, private http: HttpClient) {
  }
    
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
  getNumberOfFavorite(url: string) {
    var count = 0;
    this.http
    .get(url)
    .pipe(
      map(responseData => {
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key) && responseData[key].isFavorite) {
            count += 1;
            // productArray.push({ ...responseData[key], id: key });
          }
        }
        return count;
      })
    )
    .subscribe(count => {
      // ...
      console.log(count);
      return count;
    });
    console.log(count);

    return count;
}

 
  delete(url : string) {
    return this.http
      .delete(url, {
        observe: 'events',
        responseType: 'text'
      })
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }

  update(key: string, value: any, dbPath: string): Promise<void> {
    return this.db.list(dbPath).update(key, value);
  }
  deleteOneRow(key : string, dbPath: string): Promise<void> {
    console.log(key);
    return this.db.list(dbPath).remove(key);
  }

  
}
