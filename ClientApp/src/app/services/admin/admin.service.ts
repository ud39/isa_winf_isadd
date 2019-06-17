import {Injectable, SecurityContext} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


@Injectable({
  providedIn: 'root'
})

export class AdminService {
  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  public progress: number;
  public message: string;


  //paths
  public shop_image_path = 'https://localhost:5001/api/upload/GetById?file_name=shop/';
  public shop_gallery_path = 'https://localhost:5001/api/upload/GetById?file_name=gallerie/';
  public shop_preview_path = 'https://localhost:5001/api/upload/GetById?file_name=preview/';



  //image path variables
  public shopImae: SafeUrl;
  public gallery_1: SafeUrl;
  public gallery_2: SafeUrl;
  public gallery_3: SafeUrl;
  public gallery_4: SafeUrl;
  public preview: SafeUrl;
  public galleryNumber = "1";




  private selectedFile: File;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    console.log("FILE NAME::"+this.selectedFile.name)
  }


  onUpload(fromWhere) {
    console.log(":::::::::::::::"+fromWhere);

    //set meta data
    const uploadData = new FormData();
    uploadData.append('galleryNumber', this.galleryNumber.toString())
    uploadData.append('fromWhere', fromWhere);
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

    this.http.post('https://localhost:5001/api/upload', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if(event.type === HttpEventType.Response) {
          console.log("IMAGE::" +event.body.toString());

          switch(this.galleryNumber) {
            case "1":
              this.gallery_1 = this.sanitize(this.shop_gallery_path +event.body.toString());
              break;
            case "2":
              this.gallery_2 = this.sanitize(this.shop_gallery_path +event.body.toString());
              break;
            case "3":
              this.gallery_3 = this.sanitize(this.shop_gallery_path +event.body.toString());
              break;
            default:
              this.gallery_4 = this.sanitize(this.shop_gallery_path +event.body.toString());
              break;
          }
        }
        else {console.log(event)}
      });
  }


  deleteImage() {


    console.log("NUMBER:::::::->"+this.galleryNumber);
    switch(this.galleryNumber) {
      case "1":
        console.log("this.gallery_1::"+this.gallery_1);
        //this.http.delete("https://localhost:5001/api/upload?file_name=" +this.gallery_1);
        this.http.delete('https://localhost:5001/api/upload/delete', httpOptions);
        console.log("this.gallery_1::"+this.gallery_1);

        this.gallery_1 = '';
        break;
      case "2":
        this.http.delete("https://localhost:5001/api/upload?file_name=" +this.gallery_2);
        this.gallery_2 = '';
        break;
      case "3":
        this.http.delete("https://localhost:5001/api/upload?file_name=" +this.gallery_3);
        this.gallery_3 = '';
        break;
      case "4":
        this.http.delete("https://localhost:5001/api/upload?file_name=" +this.gallery_4);
        this.gallery_4 = '';
        break;
    }

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

