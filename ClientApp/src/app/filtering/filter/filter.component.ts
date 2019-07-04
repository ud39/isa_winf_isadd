import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShopService} from "../../services/shop/shop.service";

import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {

  constructor(public shopService: ShopService, public route: Router) { }

  sortOptions  = [
    {viewValue:'Rating Aufsteigend', value: 'rating asc'},
    {viewValue:'Rating Absteigend', value: 'rating desc'},
    {viewValue:'Name Aufsteigend', value: 'name asc'},
    {viewValue:'Name Absteigend', value: 'name desc'},
    {viewValue:'Preis Aufsteigend', value: 'price asc'},
    {viewValue:'Preis Absteigend', value: 'price desc'}
  ];


  sortShops(selectedProperty : string):void{
    switch (selectedProperty)
    {
     case 'rating desc':
        this.shopService.sortByRatingDesc();
        break;
     case 'rating asc':
        this.shopService.sortByRatingAsc();
        break;
      case 'name desc':
        this.shopService.sortByNameDesc();
        break;
      case 'name asc':
        this.shopService.sortbyNameAsc();
        break;
    }
  }

  ngOnInit() {
  }

}
