import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShopService} from "../../../services/shop/shop.service";
import {Shop} from "../../../interfaces/entity/Shop";
import {ActivatedRoute} from "@angular/router";





@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopListComponent implements OnInit {

  public shops : Shop[];

  constructor(private service: ShopService, private route: ActivatedRoute)
  {
  }

  ngOnInit() {
   this.service.getShops().subscribe(result => {
      this.shops = result;
      console.log(result);
   }, error => console.error(error));
   this.route.queryParams.subscribe(params => {
     console.log(params);
   })
  }

  ngAfterViewInit(){
  }
}
