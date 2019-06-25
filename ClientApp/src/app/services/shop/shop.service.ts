import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {Shop} from "../../interfaces/entity/Shop";
import {Params} from "@angular/router";










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

  getShopsWithParams(queryParams:Params){

    return this.http
  }
}



