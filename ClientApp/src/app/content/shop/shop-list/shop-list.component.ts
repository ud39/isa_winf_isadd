import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopService} from "../../../services/shop/shop.service";


@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopListComponent implements OnInit {

  public customers : Test[];

  constructor(private http :HttpClient, private service: ShopService)

  {
  }


  ngOnInit() {
   this.service.getPosts().subscribe(params =>
     this.customers = params);
   this.service.addPosts().subscribe(result => {
     console.log(result);
   }, error => console.error(error));
  }




}

export interface Test{
  keystring: string,
  id: number,
  name: string
  random: string,
}

