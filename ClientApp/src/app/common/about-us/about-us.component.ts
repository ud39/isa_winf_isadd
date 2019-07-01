import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ImageService} from "../../services/image/image.service";


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AboutUsComponent implements OnInit {

  public brand:any;
  constructor(public imageBrandService: ImageService) { }

  ngOnInit() {
    this.imageBrandService.getBrandImage().subscribe(value => {
      this.imageBrandService.setBrandImage(value).then(data => this.brand = data );
    })
  }

}
