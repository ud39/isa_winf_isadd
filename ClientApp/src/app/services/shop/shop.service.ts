import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {Test} from "../../content/shop/shop-list/shop-list.component";



const url="https://localhost:5001/api/test"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ShopService {



  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Test[]>{
    return this.http.get<Test[]>(url + '/all');
  }

  addPosts(): Observable<Test>{
    return this.http.post<Test>(url + '/add',JSON.stringify(test), httpOptions)
  }
}

let test: Test = {
  keystring: "s",
  id: 2,
  name: 'Miku',
  random: 'stuff'
};
