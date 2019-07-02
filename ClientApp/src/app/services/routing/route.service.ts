import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class RouteService {

  constructor() { }

  buildHttpParams(jsonOfSearch : JSON) : HttpParams{
      let params = new HttpParams();
      Object.keys(jsonOfSearch).forEach(key =>
      {
        if((jsonOfSearch[key] != "" && jsonOfSearch[key] != null) || jsonOfSearch[key])
        {
          if(Array.isArray(jsonOfSearch[key]))
          {
            let json = <Array<string>> jsonOfSearch[key];
            params = this.buildHttpParamsWithArray(params,key,json);
          }else{
            params = params.append(key,jsonOfSearch[key]);
          }
        }
      });
      return params;
  }

  buildHttpParamsWithArray(params : HttpParams, key: string, jsonOfArray: Array<string>):HttpParams{
    for(let i = 0; i<jsonOfArray.length; i++){
      params = params.append(key,jsonOfArray[i])
    }
    return params
  }

}
