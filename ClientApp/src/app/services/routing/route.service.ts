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
          params = params.append(key,jsonOfSearch[key])
        }
      });
      return params;
  }
  
}
