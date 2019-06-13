import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {Test} from "../../content/shop/shop-list/shop-list.component";
import {Shop} from "../../interfaces/entity/Shop";



const url="https://localhost:5001/api/";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private shops : Observable<Test[]>;
  private shop  : Observable<Test>;

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Test[]>{
    return this.shops = this.http.get<Test[]>(url + 'test/all');
  }

  getShops(){
    return this.shops;
  }
}



