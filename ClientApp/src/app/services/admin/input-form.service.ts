import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Global} from "../../global";
import {Observable} from "rxjs";
import {BusStation} from "../../interfaces/entity/BusStation";
import {Poi} from "../../interfaces/entity/Poi";
import {CoffeeDrink} from "../../interfaces/entity/CoffeeDrink";
import {Blend} from "../../interfaces/entity/Blend";
import {Bean} from "../../interfaces/entity/Bean";
import {EquipmentCategory} from "../../interfaces/entity/EquipmentCategory";










const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class InputFormService {



  constructor(private http: HttpClient) {
  }


  public postContent(jsonInput : JSON){
    console.log(jsonInput);
    this.http.post(('https://localhost:5001/api/coffeeshop/insert'), jsonInput, {headers:headers}).subscribe(value =>{
        console.log(value);
    } )
  }


  getBusStation(): Observable<BusStation[]>{
    return this.http.get<BusStation[]>(Global.url + 'busstation/all', {headers:headers});
  }

  getPois(): Observable<Poi[]>{
    return this.http.get<Poi[]>(Global.url + 'poi/all');
  }

  getCoffeeDrinks(): Observable<CoffeeDrink[]>{
    return this.http.get<CoffeeDrink[]>(Global.url + 'coffeeDrink/all', {headers:headers})
  }

  getBlends(): Observable<Blend[]>{
    return this.http.get<Blend[]>(Global.url + 'blend/all', {headers:headers})
  }

  getBeans(): Observable<Bean[]>{
    return this.http.get<Bean[]>(Global.url + 'bean/all', {headers:headers})
  }

  getEquipmentCategories(): Observable<EquipmentCategory[]>{
    return this.http.get<EquipmentCategory[]>(Global.url + 'equipmentcategory/all', {headers:headers})
  }

}
