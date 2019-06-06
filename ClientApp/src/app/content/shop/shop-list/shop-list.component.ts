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

  public customers : Customer[];

  constructor(private http :HttpClient, private service: ShopService)

  {
  }


  ngOnInit() {
   this.service.getPosts().subscribe(params =>
     this.customers = params)
  }




}

export interface Customer{
  id: number,
  name: string
  email: string,
  phone: string,
  address: string
}

