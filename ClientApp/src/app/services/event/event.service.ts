import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../../interfaces/entity/Event";

@Injectable({
  providedIn: 'root'
})

export class EventService {




  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>('https://localhost:5001/api/event/all');
  }


  getEvent(id): Observable<Event>{
    return this.http.get<Event>('https://localhost:5001/api/event/' + id, {headers:headers});
  }

}
const headers = new HttpHeaders().set('Content-Type', 'application/json');
