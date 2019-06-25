import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {Observable} from "rxjs";
import {Shop} from "../../interfaces/entity/Shop";
import {Params} from "@angular/router";
import {HttpParamsOptions} from "@angular/common/http/src/params";










const headers = new HttpHeaders().set('Content-Type', 'application/json');



@Injectable({
  providedIn: 'root'
})
export class ShopService {



  constructor(private http: HttpClient) {
  }


  getShops(): Observable<Shop[]>{
    return this.http.get<Shop[]>('https://localhost:5001/api/coffeeshop/all');
  }


  getShop(id): Observable<Shop>{
    return this.http.get<Shop>('https://localhost:5001/api/coffeeshop/' + id, {headers:headers});
  }

  getShopWithParams(queryParams: Params): Observable<Shop>{
    const httpParams: HttpParamsOptions = { fromObject: queryParams } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };
    console.log(new HttpParams(httpParams));
    console.log(options);
    return this.http.get<Shop>('https://localhost:5001/api/coffeeshop/params?', {params:queryParams, headers: headers});
  }
}



