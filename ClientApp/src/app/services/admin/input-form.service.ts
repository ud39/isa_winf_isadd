import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Global} from "../../global";










const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};



@Injectable({
  providedIn: 'root'
})
export class InputFormService {



  constructor(private http: HttpClient, private global: Global) {
  }


  public postContent(jsonInput : JSON){
    this.http.post(('https://localhost:5001/api/coffeeshop/insert'), jsonInput, httpOptions).subscribe(value =>{
        console.log(value);
    } )
  }
}
