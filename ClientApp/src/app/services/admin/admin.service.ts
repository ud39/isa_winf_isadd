import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public progress: number;
  public message: string;
  public filename: string;
  public uploadedImage = "png.png"

  constructor(private http: HttpClient) { }

  upload(files) {
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB:"+files.length);

    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files){
      formData.append(file.name, file);
      this.filename = file.name;
    };

    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"+this.filename);

    const uploadReq = new HttpRequest('POST', `https://localhost:5001/api/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = event.body.toString();

        console.log(this.message);
          console.log("./Upload/"+this.filename);
          this.uploadedImage =  this.filename;

      }
    });
  }



  //new
  selectedFile: File;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    console.log("FILE NAME::"+this.selectedFile.name)
  }


  onUpload(fromWhere) {
    console.log(":::::::::::::::"+fromWhere);
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append('fromWhere', fromWhere);
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

    this.http.post('https://localhost:5001/api/upload', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });
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

