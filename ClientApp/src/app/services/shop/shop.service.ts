import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {Shop} from "../../interfaces/entity/Shop";
import {Params} from "@angular/router";
import {Global} from "../../global";










const headers = new HttpHeaders().set('Content-Type', 'application/json');



@Injectable({
  providedIn: 'root'
})
export class ShopService {



  constructor(private http: HttpClient) {
  }


  getShops(): Observable<Shop[]>{
    return this.http.get<Shop[]>(Global.url + 'coffeeshop/all');
  }


  getShop(id): Observable<Shop>{
    return this.http.get<Shop>(Global.url + 'coffeeshop/' + id, {headers:headers});
  }

  getShopWithParams(queryParams: Params): Observable<Shop>{
    console.log(queryParams);
    console.log('https://localhost:5001/api/coffeeshop/params?' + queryParams.toString());
    return this.http.get<Shop>(Global.url + 'coffeeshop/params?' , {params: queryParams,headers: headers});
  }
}



