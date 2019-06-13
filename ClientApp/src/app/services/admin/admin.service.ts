import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public progress: number;
  public message: string;
  public filename: string;


  constructor(private http: HttpClient) { }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files){
      formData.append(file.name, file);
      this.filename = file.name;
    }

    const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = event.body.toString();
        if(this.message === "Upload Successful."){

        }
      }
    });
  }

  show(){

    return "./Upload/"+this.filename
  }


  takeImage(){
    this.http.post("https://localhost:5001/Image/SetImageType", JSON.stringify({key: "AAAAAAAAaaaaaaaAAAAAA"}), httpOptions)
  }



}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

