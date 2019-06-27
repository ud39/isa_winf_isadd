import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {Shop} from "../../interfaces/entity/Shop";
import {NavigationExtras, Params, Route, Router} from "@angular/router";
import {Global} from "../../global";
import {RouteService} from "../routing/route.service";










const headers = new HttpHeaders().set('Content-Type', 'application/json');



@Injectable({
  providedIn: 'root'
})
export class ShopService {

  shops : Shop[];

  constructor(private http: HttpClient, private routeService: RouteService, private router:Router) {
  }


  getShops(): Observable<Shop[]>{
    return this.http.get<Shop[]>(Global.url + 'coffeeshop/all');
  }


  getShop(id): Observable<Shop>{
    return this.http.get<Shop>(Global.url + 'coffeeshop/' + id, {headers:headers});
  }

  getShopWithParams(queryParams: Params): Observable<Shop[]>{
    console.log(queryParams);
    console.log('https://localhost:5001/api/coffeeshop/params?' + queryParams.toString());
    return this.http.get<Shop[]>(Global.url + 'coffeeshop/params?' , {params: queryParams,headers: headers});
  }

  navigateTo(jsonOfSearch){
    let params = this.routeService.buildHttpParams(jsonOfSearch);
    console.log(this.getShopWithParams(params).subscribe(next => {
      this.shops = next;
    }));
  }
}



