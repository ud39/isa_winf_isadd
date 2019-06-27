import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Global} from "../../global";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient, private global : Global) { }



  readAsyncFile(image: Blob){
    return new Promise(((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener("load", () =>{
        resolve(reader.result)
      }, false);
      reader.onerror = reject;
      if(image){
        reader.readAsDataURL(image);
      }
    }))
  }

  async setBrandImage(image: Blob) {
    try{
      let brand = await this.readAsyncFile(image);
      return brand;
    }catch (e) {
      console.log(e);
    }
  }

  getBrandImage(): Observable<Blob> {
    return this.httpClient.get(Global.url + "image/GetById?ContentType=brand&fileName=kaffeesatt.png", { responseType: 'blob' });

  }
}

