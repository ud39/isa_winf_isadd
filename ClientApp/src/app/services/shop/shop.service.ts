import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {Observable} from "rxjs";
import {Shop} from "../../interfaces/entity/Shop";
import {HttpParamsOptions} from "@angular/common/http/src/params";





const url="https://localhost:5001/api/";
let x = { name: "Coffee_shop_Name3" , country: "Deutschland"};
const headers = new HttpHeaders().set('Content-Type', 'application/json');
const myObject: any = { name: "Coffee_shop_Name3"};
const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
const options = { params: new HttpParams(httpParams), headers: headers };
const test = {params: x, headers: headers};
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  public shops : Observable<Shop[]>;

  constructor(private http: HttpClient) {
  }

  getShops(): Observable<Shop[]>{
    return this.shops = this.http.get<Shop[]>('https://localhost:5001/api/coffeeshop/all', options);
  }

  getShop(): Observable<Shop>{
    return this.http.get<Shop>('https://localhost:5001/api/coffeeshop/getById', options);
  }
}


