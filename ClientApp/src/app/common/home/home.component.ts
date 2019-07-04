import {Component, ViewEncapsulation} from '@angular/core';
import {ShopService} from "../../services/shop/shop.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  constructor(public service: ShopService)
  {
  }

  ngOnInit() {
    this.service.getShops().subscribe(result => {
      this.service.shops = result;
    }, error => console.error(error));
  }
}
