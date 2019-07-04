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
  suppliesShop: Supplies[];
  constructor(private http: HttpClient, private routeService: RouteService, private router:Router, private inputFormService: InputFormService) {
  }


  getShops(): Observable<Shop[]>{
    return this.http.get<Shop[]>(Global.url + 'coffeeshop/>');
  }

  getSuppliesShops(queryParams:Params): Observable<Shop[]>{
    return this.http.get<Shop[]>(Global.url + 'coffeeshop/supplies?', {headers:headers,params:queryParams});
  }

  getShop(id): Observable<Shop>{
    return this.http.get<Shop>(Global.url + 'coffeeshop/getbyid?id=' + id, {headers:headers});
  }

  getShopWithParams(queryParams: Params): Observable<Shop[]>{
    console.log('https://localhost:5001/api/coffeeshop/params?' + queryParams.toString());
    return this.http.get<Shop[]>(Global.url + 'coffeeshop/params?' , {params: queryParams,headers: headers});
  }

  navigateTo(jsonOfSearch){
    let params = this.routeService.buildHttpParams(jsonOfSearch);
    console.log(this.getShopWithParams(params).subscribe(next => {
      this.shops = next;
    }));
  }

  searchSupplies(jsonOfSearch){
    let params = this.routeService.buildHttpParams(jsonOfSearch);
    console.log('https://localhost:5001/api/coffeeshop/supplies?' + params.toString());
    this.getSuppliesShops(params).subscribe(next => {
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

  sortbyPriceDesc(){
    this.shops = this.shops.sort(function(a,b){
      if(b.priceClass.length > a.priceClass.length){
        return -1;
      }
    })
  }

  sortByPriceAsc(){
    this.sortbyPriceDesc();
    this.shops.reverse();
  }

  sortAscBy():void{
    this.shops.reverse();
  }

  sortDescBy():void{
    this.shops.reverse()
  }

}



