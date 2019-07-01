import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class RouteService {

  constructor() { }

  buildHttpParams(jsonOfSearch : JSON) : HttpParams{
      let params = new HttpParams();
      console.log(jsonOfSearch);
      Object.keys(jsonOfSearch).forEach(key =>
      {
        if((jsonOfSearch[key] != "" && jsonOfSearch[key] != null) || jsonOfSearch[key])
        {
          if(Array.isArray(jsonOfSearch[key]))
          {
            let json = <Array<string>> jsonOfSearch[key];
            params = this.buildHttpParamsWithArray(key,json);
          }else{
            params = params.append(key,jsonOfSearch[key]);
          }
        }
      });
      console.log('Juti Boottawong' + params);
      return params;
  }

  buildHttpParamsWithArray(key: string, jsonOfArray: Array<string>):HttpParams{
    let params = new HttpParams();
    for(let i = 0; i<jsonOfArray.length; i++){
      params = params.append(key,jsonOfArray[i])
    }
    return params
  }

}
