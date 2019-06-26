import {Injectable, SecurityContext} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Global} from "../../global";


@Injectable({
  providedIn: 'root'
})

export class AdminService {
  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  public progress: number;
  public message: string;

  //radiobutton
  public galleryNumber = "1";


  //paths
  public shop_front_path = Global.url + '/image/GetById?fileName=front/';
  public shop_gallery_path = Global.url + '/image/GetById?fileName=gallery/';
  public shop_preview_path = Global.url + '/image/GetById?fileName=preview/';



  //image path variables
  public gallery_1_Filename: string;
  public gallery_2_Filename: string;
  public gallery_3_Filename: string;
  public gallery_4_Filename: string;
  public front_Filename: string;
  public preview_Filename: string;

  public gallery_1: SafeUrl;
  public gallery_2: SafeUrl;
  public gallery_3: SafeUrl;
  public gallery_4: SafeUrl;
  public previewImage: SafeUrl;
  public frontImage: SafeUrl;


  private selectedFile: File;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log("FILE NAME::"+this.selectedFile.name)
  }


  onUpload(fromWhere) {
    console.log(":::::::::::::::"+fromWhere);

    //set meta data
    const uploadData = new FormData();
    uploadData.append('fromWhere', fromWhere);
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

    this.http.post(Global.url + '/image', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if(event.type === HttpEventType.Response) {
          console.log("IMAGE::" + event.body.toString());

          if (fromWhere == "gallery") {
            switch (this.galleryNumber) {
              case "1":
                this.gallery_1_Filename = event.body.toString();
                this.gallery_1 = this.sanitize(this.shop_gallery_path + this.gallery_1_Filename);
                break;
              case "2":
                this.gallery_2_Filename = event.body.toString();
                this.gallery_2 = this.sanitize(this.shop_gallery_path + this.gallery_2_Filename);
                break;
              case "3":
                this.gallery_3_Filename = event.body.toString();
                this.gallery_3 = this.sanitize(this.shop_gallery_path + this.gallery_3_Filename);
                break;
              default:
                this.gallery_4_Filename = event.body.toString();
                this.gallery_4 = this.sanitize(this.shop_gallery_path + this.gallery_4_Filename);
                break;
            }
          }
          else if (fromWhere == "preview") {
            this.preview_Filename = event.body.toString();
            this.previewImage = this.sanitize(this.shop_preview_path  + this.preview_Filename);
          }
          else if(fromWhere == "front"){
            this.front_Filename = event.body.toString();
            this.frontImage = this.sanitize(this.shop_front_path  + this.front_Filename);
          }
        }

        else {console.log(event)}
      });
  }


  deleteImage(fromWhere) {
    var name: string;

    if(fromWhere.match("gallery")) {
      switch (this.galleryNumber) {
        case "1":
          console.log("In::" + 1);
          name = this.gallery_1_Filename;
          this.gallery_1 = '';
          this.gallery_1_Filename ='';
          break;
        case "2":
          console.log("In::" + 2);
          name = this.gallery_2_Filename;
          this.gallery_2 = '';
          this.gallery_3_Filename ='';
          break;
        case "3":
          name = this.gallery_3_Filename;
          this.gallery_3 = '';
          this.gallery_3_Filename ='';
          break;
        case "4":
          name = this.gallery_4_Filename;
          this.gallery_4 = '';
          this.gallery_4_Filename ='';
          break;
      }
    }
    else if(fromWhere.match("preview")){
      name = this.preview_Filename;
      this.previewImage ='';
      this.preview_Filename ='';
    }
    else if(fromWhere.match("front")){
      name = this.front_Filename;
      this.frontImage ='';
      this.front_Filename =''
    }

    console.log("Lösche::"+name +", from: " +fromWhere);
    console.log(":::::->"+'https://localhost:5001/api/image/delete?fileName='+name+'&contentType='+ fromWhere);
    this.http.delete(Global.url + 'image/delete?fileName='+name+'&contentType='+ fromWhere,   {
      reportProgress: false,}).subscribe(value =>{

        console.log("value::" +value);
      },error1 => console.log("ERROR:"+error1)

    );



  }





  bypass(url: string): SafeUrl {
    if(!url) return null;
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  sanitize(url: string): SafeUrl {
    if(!url) return null;
    return this.domSanitizer.sanitize(SecurityContext.URL, url);
  }












}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

