import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../../interfaces/entity/Event";
import {Global} from "../../global";
import {NavigationExtras, Params, Router} from "@angular/router";
import {RouteService} from "../routing/route.service";


const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})

export class EventService {

  public events : Event[];
  constructor(private http: HttpClient, private routeService:RouteService) {
  }

  getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(Global.url + 'event/all');
  }


  getEvent(id): Observable<Event>{
    return this.http.get<Event>(Global.url + 'event/getbyid?id=' + id, {headers:headers});
  }

  getEventWithParams(queryParams : Params):Observable<Event[]>{
    return this.http.get<Event[]>(Global.url + 'event/params?' , {params: queryParams,headers: headers});
  }
  navigateTo(jsonOfSearch : JSON):void{
    let params = this.routeService.buildHttpParams(jsonOfSearch);
    this.getEventWithParams(params).subscribe(next => {
      this.events = next;
    });
  }

}

