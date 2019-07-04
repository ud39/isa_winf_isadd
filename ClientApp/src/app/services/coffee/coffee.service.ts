import { Injectable } from '@angular/core';
import {RouteService} from "../routing/route.service";
import {Observable} from "rxjs";
import {Bean} from "../../interfaces/entity/Bean";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Global} from "../../global";
import {Blend} from "../../interfaces/entity/Blend";
import {NavigationExtras, Params, Router} from "@angular/router";

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  public beans: Bean[];
  public blends: Blend[];

  constructor(private routeService : RouteService, private httpClient : HttpClient, private router:Router) { }

  getCoffeeBeans(): Observable<Bean[]>{
    return this.httpClient.get<Bean[]>(Global.url + 'bean/all');
  }

  getCoffeeBlends(): Observable<Blend[]>{
    return this.httpClient.get<Blend[]>(Global.url + 'blend/all');
  }

  getCoffeeBean(queryParams : Params): Observable<Bean>{
    return this.httpClient.get<Bean>(Global.url + "bean", {params: queryParams, headers: headers});
  }

  getCoffeeBlend(queryParams: Params): Observable<Blend>{
    return this.httpClient.get<Blend>(Global.url + "blend", {params: queryParams, headers: headers});
  }

  getCoffeeBeanWithParams(queryParams : Params): Observable<Bean[]>{
    return this.httpClient.get<Bean[]>(Global.url + "bean", {params: queryParams, headers: headers});
  }

  getCoffeeBlendWithParams(queryParams: Params): Observable<Blend[]>{
    return this.httpClient.get<Blend[]>(Global.url + "blend", {params: queryParams, headers: headers});
  }
  navigateTo(jsonOfSearch){

    let params = this.routeService.buildHttpParams(jsonOfSearch);
    this.getCoffeeBeanWithParams(params).subscribe(next => {
      this.beans = next;
    });
    this.getCoffeeBlendWithParams(params).subscribe(next =>{
      this.blends = next;
    });
  }

}
