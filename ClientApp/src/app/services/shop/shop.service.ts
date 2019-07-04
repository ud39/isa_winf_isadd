import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {Shop} from "../../interfaces/entity/Shop";
import {Params, Router} from "@angular/router";
import {Global} from "../../global";
import {RouteService} from "../routing/route.service";
import {InputFormService} from "../admin/input-form.service";
import {Supplies} from "../../interfaces/entity/Supplies";
import {NEXT} from "@angular/core/src/render3/interfaces/view";










const headers = new HttpHeaders().set('Content-Type', 'application/json');



@Injectable({
  providedIn: 'root'
})
export class ShopService {

  shops : Shop[];
  constructor(private http: HttpClient, private routeService: RouteService, private router:Router, private inputFormService: InputFormService) {
  }


  getShops(): Observable<Shop[]>{
    return this.http.get<Shop[]>(Global.url + 'coffeeshop/all');
  }

  getSuppliesShopsWithParams(queryParams:Params): Observable<Shop[]>{
    return this.http.get<Shop[]>(Global.url + 'coffeeshop/supplies?', {headers:headers,params:queryParams});
  }

  getSuppliesShops(): Observable<Shop[]>{
    return this.http.get<Shop[]>(Global.url + 'coffeeshop/supplies/all', {headers:headers});
  }

  getShop(id): Observable<Shop>{
    return this.http.get<Shop>(Global.url + 'coffeeshop/getbyid?id=' + id, {headers:headers});
  }

  getShopWithParams(queryParams: Params): Observable<Shop[]>{
    return this.http.get<Shop[]>(Global.url + 'coffeeshop/params?' , {params: queryParams,headers: headers});
  }

  navigateTo(jsonOfSearch){
    let params = this.routeService.buildHttpParams(jsonOfSearch);
    this.getShopWithParams(params).subscribe(next => {
      this.shops = next;
    });
  }

  searchSupplies(jsonOfSearch){
    let params = this.routeService.buildHttpParams(jsonOfSearch);
    this.getSuppliesShopsWithParams(params).subscribe(next => {
      this.shops  = next
    })
  }

  sortByNameDesc(){
    this.shops = this.shops.sort(function(a,b){
      let aShopName = a.name.toLowerCase();
      let bShopName = b.name.toLowerCase();
      if(aShopName < bShopName){
        return -1;
      }
    });
  }

  sortbyNameAsc(){
    this.sortByNameDesc();
    this.shops.reverse();
  }

  sortByRatingDesc(){
    this.shops = this.shops.sort(function(a,b){
      return b.averageTotalRating - a.averageTotalRating ;
    });
  }

  sortByRatingAsc(){
    this.sortByRatingDesc();
    this.shops.reverse();
  }

  sortAscBy():void{
    this.shops.reverse();
  }

  sortDescBy():void{
    this.shops.reverse()
  }

}



