import { Injectable } from '@angular/core';
import {RouteService} from "../routing/route.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Global} from "../../global";
import {Params, Router} from "@angular/router";
import {EquipmentCategory} from "../../interfaces/entity/EquipmentCategory";

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  public equipmentsCategories : EquipmentCategory[];

  constructor(private routeService : RouteService, private httpClient : HttpClient, private router:Router) { }

  getEquipmentCategory(): Observable<EquipmentCategory[]>{
    return this.httpClient.get<EquipmentCategory[]>(Global.url + 'bean/all');
  }
  getEquipments(queryParams : Params): Observable<EquipmentCategory>{
    return this.httpClient.get<EquipmentCategory>(Global.url + "bean", {params: queryParams, headers: headers});
  }

  getEquipmentsWithParams(queryParams : Params): Observable<EquipmentCategory[]>{
    return this.httpClient.get<EquipmentCategory[]>(Global.url + "bean", {params: queryParams, headers: headers});
  }

  navigateTo(jsonOfSearch : JSON):void{
    console.log('Equipment' + jsonOfSearch);
    let params = this.routeService.buildHttpParams(jsonOfSearch);
    console.log(this.getEquipmentsWithParams(params).subscribe(next => {
      this.equipmentsCategories = next;
    }));
  }
}
