import {Injectable, ɵQueryValueType} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Global} from "../../global";
import {Observable} from "rxjs";
import {BusStation} from "../../interfaces/entity/BusStation";
import {Poi} from "../../interfaces/entity/Poi";
import {CoffeeDrink} from "../../interfaces/entity/CoffeeDrink";
import {Blend} from "../../interfaces/entity/Blend";
import {Bean} from "../../interfaces/entity/Bean";
import {EquipmentCategory} from "../../interfaces/entity/EquipmentCategory";
import {Shop} from "../../interfaces/entity/Shop";
import {User} from "../../interfaces/entity/User";
import {FormGroup} from "@angular/forms";
import {Company} from "../../interfaces/entity/Company";










const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class InputFormService {


  constructor(private http: HttpClient) {
  }


  public postContentShop(jsonInput : JSON) : Observable<HttpResponse<any>>{
    jsonInput = this.filterUndefinedAndEmptyStrings(jsonInput);
    return this.http.post((Global.url + 'coffeeshop/insert'), jsonInput, {headers: headers, observe:"response"})
  }

  public postContentEquipment(jsonInput : JSON){
    jsonInput = this.filterUndefinedAndEmptyStrings(jsonInput);
    return this.http.post((Global.url + 'equipmentcategory/insert'),jsonInput, {headers: headers, observe:"response"})
  }

  public postUser(jsonInput:JSON){
    jsonInput = this.filterUndefinedAndEmptyStrings(jsonInput);
    return this.http.post(Global.url + '/insert', jsonInput, {headers:headers, observe:"response"});
  }

  public postContentArticle(jsonInput:JSON){
    jsonInput = this.filterUndefinedAndEmptyStrings(jsonInput);
    return this.http.post(Global.url + '/insert', jsonInput, {headers:headers, observe:"response"});
  }

  public postContentEvent(jsonInput:JSON){
    jsonInput = this.filterUndefinedAndEmptyStrings(jsonInput);
    return this.http.post((Global.url + 'event/insert'), jsonInput, {headers:headers, observe:"response"});
  }

  public postContent(jsonInput:JSON, selectedContent:string){
    jsonInput = this.filterUndefinedAndEmptyStrings(jsonInput);
    switch (selectedContent) {
      case 'Blend':
        return this.http.post(Global.url + 'blend/insert', jsonInput, {headers: headers, observe:'response'});
      case 'Bean':
        return this.http.post(Global.url + 'bean/insert', jsonInput, {headers: headers, observe:'response'});
      case 'Firmen':
        return this.http.post(Global.url + 'manufacturer/insert', jsonInput, {headers: headers, observe:'response'});
      case 'CoffeeDrink':
        return this.http.post(Global.url + 'coffeedrink/insert', jsonInput, {headers: headers, observe:'response'});
      case 'Equipment-category':
        return this.http.post(Global.url + 'equipmentcategory/insert', jsonInput, {headers: headers, observe:'response'});
      case 'BusStation':
        return this.http.post(Global.url + 'busstation/insert', jsonInput, {headers: headers, observe:'response'});
      case 'Poi':
        return this.http.post(Global.url + 'poi/insert', jsonInput, {headers: headers, observe:'response'});
    }
  }

  public deleteBean(queryParams:HttpParams){
    return this.http.delete(Global.url + 'bean/delete', {headers:headers,params:queryParams})
  }
  public deleteBlend(queryParams:HttpParams){
    return this.http.delete(Global.url + 'blend/delete', {headers:headers,params:queryParams})
  }
  public deletePoi(queryParams:HttpParams){
    return this.http.delete(Global.url + 'poi/delete', {headers:headers,params:queryParams})
  }
  public deleteCoffeeDrink(queryParams:HttpParams){
    return this.http.delete(Global.url + 'coffeedrink/delete', {headers:headers,params:queryParams})
  }
  public deleteBusStation(queryParams:HttpParams){
    return this.http.delete(Global.url + 'busStation/delete', {headers:headers,params:queryParams})
  }
  public deleteEquipmentCategory(queryParams:HttpParams){
    return this.http.delete(Global.url + 'equipmentCategory/delete', {headers:headers,params:queryParams})
  }
  public deleteCompanyName(queryParams:HttpParams){
    return this.http.delete(Global.url + 'companyName/delete',{headers:headers,params:queryParams})
  }

  public updateShop(jsonInput:JSON){
    return this.http.patch(Global.url + 'coffeeshop/update', jsonInput,{headers:headers})
  }

  public updateBean(jsonInput:JSON){
    return this.http.patch(Global.url + 'bean/pupdate', jsonInput,{headers:headers})
  }

  public updateBlend(jsonInput:JSON){
    return this.http.patch(Global.url + 'blend/pupdate', jsonInput,{headers:headers})
  }
  public updatePoi(jsonInput:JSON){
    return this.http.patch(Global.url + 'poi/pupdate', jsonInput,{headers:headers})
  }
  public updateCoffeeDrink(jsonInput:JSON){
    return this.http.patch(Global.url + 'coffeedrink/pupdate', jsonInput,{headers:headers})
  }
  public updateBusStation(jsonInput:JSON){
    return this.http.patch(Global.url + 'busStation/pupdate', jsonInput,{headers:headers})
  }
  public updateEquipmentCategory(jsonInput:JSON){
    return this.http.patch(Global.url + 'equipmentCategory/pupdate', jsonInput,{headers:headers})
  }

  public updateCompanyName(jsonInput:JSON){
    return this.http.patch(Global.url + 'companyName/pupdate',jsonInput,{headers:headers})
  }

  getCompany(company:Company): Observable<Company>{
    let queryparams = new HttpParams().set('name',company.name);
    return this.http.get<Blend>(Global.url + 'blend/getbyid?', {headers: headers, params:queryparams})
  }

  getBlend(blend:Blend): Observable<Blend>{
    let queryparams = new HttpParams().set('name',blend.name);
    return this.http.get<Blend>(Global.url + 'blend/getbyid?', {headers: headers, params:queryparams})
  }

  getBean(bean:Bean): Observable<Bean>{
    let queryparams = new HttpParams().set('name',bean.name).append('provenance',bean.provenance)
    return this.http.get<Bean>(Global.url + 'bean/getbyid?', {headers: headers, params:queryparams})
  }

  getPoi(poi:Poi): Observable<Poi>{
    let queryparams = new HttpParams().set('name',poi.name).append('address.streetName',poi.address.streetName)
    .append('address.streetNumber', poi.address.streetNumber.toString()).append('address.town',poi.address.town)
    .append('address.postalCode', poi.address.postalCode.toString()).append('address.country',poi.address.country);
    return this.http.get<Poi>(Global.url + 'poi/getbyid?', {headers: headers, params:queryparams})
  }

  getCoffeeDrink(coffeeDrink: CoffeeDrink): Observable<CoffeeDrink>{
    let queryparams = new HttpParams().set('name',coffeeDrink.name);
    return this.http.get<CoffeeDrink>(Global.url + 'coffeeDrink/getbyid?', {headers:headers, params:queryparams})
  }

  getBusStation(busStation: BusStation): Observable<BusStation>{
    let queryparams = new HttpParams().set('name',busStation.name).append('line',busStation.line.toString());
    return this.http.get<BusStation>(Global.url + 'busstation/getbyid?', {headers:headers, params:queryparams});
  }

  getEquipmentCategory(equipmentCategory: EquipmentCategory) : Observable<EquipmentCategory>{
    let queryparams = new HttpParams().set('name',equipmentCategory.name);
    return this.http.get<EquipmentCategory>(Global.url + 'equipmentCategory/getbyid?', {headers:headers, params:queryparams});
  }

  getUser(user:User){
    let queryparams = new HttpParams().set('email',user.email);
    return this.http.get<User>(Global.url + 'user/getbyid?', {headers:headers, params:queryparams});
  }

  getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(Global.url + 'company/all', {headers:headers});
  }

  getBusStations(): Observable<BusStation[]>{
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

  public filterUndefinedAndEmptyStrings(jsonInput : JSON): JSON{
    Object.keys(jsonInput).forEach(key => {
      if(key == 'address'){
        let address = jsonInput[key];
        Object.keys(address).forEach(key =>{
          if(address[key] == ""){
            delete address[key];
          }
        })
      }
      if(Array.isArray(jsonInput[key])){
        let inputArray = <Array<any>> jsonInput[key];
        if(inputArray.length == 0){
          delete  jsonInput[key];
        }
      }
      if(jsonInput[key] === undefined || jsonInput[key] == ""){
        delete jsonInput[key]
      }
    });
    return jsonInput;
  }

  public fillOutOpenCloseTime(shop:Shop, openCloseFormGroup:FormGroup){
  for(let i=0; i < shop.openingTimes.length; i++){
  switch (shop.openingTimes[i].weekday) {
  case 'monday':
  openCloseFormGroup.get('mondayOpen').setValue(shop.openingTimes[i].open.substr(0,5));
  openCloseFormGroup.get('mondayClose').setValue(shop.openingTimes[i].close.substr(0,5));
  break;
  case 'tuesday':
  openCloseFormGroup.get('tuesdayOpen').setValue(shop.openingTimes[i].open.substr(0,5));
  openCloseFormGroup.get('tuesdayClose').setValue(shop.openingTimes[i].close.substr(0,5));
  break;
  case 'wednesday':
  openCloseFormGroup.get('wednesdayOpen').setValue(shop.openingTimes[i].open.substr(0,5));
  openCloseFormGroup.get('wednesdayClose').setValue(shop.openingTimes[i].close.substr(0,5));
  break;
  case 'thursday':
  openCloseFormGroup.get('thursdayOpen').setValue(shop.openingTimes[i].open.substr(0,5));
  openCloseFormGroup.get('thursdayClose').setValue(shop.openingTimes[i].close.substr(0,5));
  break;
  case 'friday':
  openCloseFormGroup.get('fridayOpen').setValue(shop.openingTimes[i].open.substr(0,5));
  openCloseFormGroup.get('fridayClose').setValue(shop.openingTimes[i].close.substr(0,5));
  break;
  case 'saturday':
  openCloseFormGroup.get('saturdayOpen').setValue(shop.openingTimes[i].open.substr(0,5));
  openCloseFormGroup.get('saturdayClose').setValue(shop.openingTimes[i].close.substr(0,5));
  break;
  case 'sunday':
  openCloseFormGroup.get('sundayOpen').setValue(shop.openingTimes[i].open.substr(0,5));
  openCloseFormGroup.get('sundayClose').setValue(shop.openingTimes[i].close.substr(0,5));
  break;
}
}
  }

  public deleteContentShop(id :any){
    let queryparams = new HttpParams().set('id',id);
    return this.http.delete(Global.url + 'coffeeshop/delete?',{headers:headers, params:queryparams, observe:"response"})
  }

  public deleteContentEvent(id:any){
    let queryparams = new HttpParams().set('id',id);
    return this.http.delete(Global.url + 'event/delete?',{headers:headers, params:queryparams, observe:"response"})
  }

  public deleteContentUser(eMail:string){
    let queryparams = new HttpParams().set('email',eMail);
    return this.http.delete(Global.url + 'user/delete?',{headers:headers, params:queryparams, observe:"response"})
  }
}
