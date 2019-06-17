import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopService} from "../../../services/shop/shop.service";
import {Shop} from "../../../interfaces/entity/Shop";
import {Router} from "@angular/router";


@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopListComponent implements OnInit {

  public shops : Shop[];

  constructor(private http :HttpClient, private service: ShopService, private router: Router)
  {
  }

  navigateToShopDetail(shopName, country, town, postal_code, street, street_number){
    this.router.navigate(['/shop', 'single'],
      {queryParams: {name: "'" + shopName.toString() + "'", 'address.country': "'" + country.toString() + "'", 'address.town': "'" + town.toString() + "'", 'address.postal_code': postal_code,
      'address.street_name': "'" + street.toString() + "'", 'address.street_number': street_number}}
      )
  }

  ngOnInit() {
   this.service.getShops().subscribe(result => {
      this.shops = result;
      console.log(result);
   }, error => console.error(error));
  }
}
