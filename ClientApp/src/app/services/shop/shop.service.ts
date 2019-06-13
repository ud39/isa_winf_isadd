import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
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

  private shops : Observable<Shop[]>;

  constructor(private http: HttpClient) {
  }

  getShops(): Observable<Shop[]>{
    return this.shops = this.http.get<Shop[]>('https://localhost:5001/api/coffeeshop/all', httpOptions);
  }

  getShop(){
    return this.shops;
  }
}

export interface Test {
}



