import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Global} from "../../global";


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AboutUsComponent implements OnInit {

  public brand = Global.url + 'image/GetById?ContentType=brand&fileName=kaffeesatt.png';
  constructor() { }

  ngOnInit() {
  }

}
