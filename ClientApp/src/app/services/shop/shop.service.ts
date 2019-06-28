import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {Shop} from "../../interfaces/entity/Shop";
import {Params, Router} from "@angular/router";
import {Global} from "../../global";
import {RouteService} from "../routing/route.service";
import {Poi} from "../../interfaces/entity/Poi";
import {BusStation} from "../../interfaces/entity/BusStation";
import {CoffeeDrink} from "../../interfaces/entity/CoffeeDrink";
import {EquipmentCategory} from "../../interfaces/entity/EquipmentCategory";
import {Blend} from "../../interfaces/entity/Blend";
import {Bean} from "../../interfaces/entity/Bean";










const headers = new HttpHeaders().set('Content-Type', 'application/json');



@Injectable({
  providedIn: 'root'
})
export class ShopService {

  shops : Shop[];
  pois : Poi[];
  blends: Blend[];
  beans: Bean[];
  coffeeDrinks: CoffeeDrink[];
  equipmentCategory: EquipmentCategory[];

  busStations : BusStation[];

  constructor(private http: HttpClient, private routeService: RouteService, private router:Router) {
  }


  getShops(): Observable<Shop[]>{
    return this.http.get<Shop[]>(Global.url + 'coffeeshop/allPreview');
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

  sortByNameDesc(){
    this.shops = this.shops.sort(function(a,b){
      let aShopName = a.name.toLowerCase();
      let bShopName = b.name.toLowerCase();
      if(aShopName < bShopName){
        return -1;
      }
    });
  }

  sortByRatingDesc(){
    this.shops = this.shops.sort(function(a,b){
      return b.averageTotalRating - a.averageTotalRating ;
    });
  }

  sortbyPriceDesc(){
    this.shops = this.shops.sort(function(a,b){
      if(b.priceClass.length > a.priceClass.length){
        return -1;
      }
    })
  }

  sortAscBy():void{
    this.shops.reverse();
  }

  sortDescBy():void{
    this.shops.reverse()
  }

}



