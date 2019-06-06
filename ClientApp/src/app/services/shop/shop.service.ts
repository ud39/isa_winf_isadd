import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {Customer} from "../../content/shop/shop-list/shop-list.component";




@Injectable({
  providedIn: 'root'
})
export class ShopService {



  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Customer[]>{
    return this.http.get<Customer[]>('https://localhost:5001/api/customer');
  }
}

