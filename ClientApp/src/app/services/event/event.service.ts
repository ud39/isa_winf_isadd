import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../../interfaces/entity/Event";
import {Global} from "../../global";

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(Global.url + 'event/all');
  }


  getEvent(id): Observable<Event>{
    return this.http.get<Event>(Global.url + 'event/' + id, {headers:headers});
  }

}

