import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShopService} from "../../services/shop/shop.service";

import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {

  public selectDescAscFormControl = new FormControl('',[]);
  public isSelected : boolean = true;
  constructor(public shopService: ShopService) { }

  sortOptions  = [
    {viewValue:'Rating', value: 'rating'},
    {viewValue:'Name', value: 'name'},
    {viewValue:'Preis', value: 'price'}
  ];

  sortDescAsc = [
    {viewValue: 'Aufsteigend', value:'desc'},
    {viewValue: 'Absteigend', value:'asc'}
  ];


  sortShops(selectedProperty : string):void{
    switch (selectedProperty)
    {
      case 'rating':
        this.shopService.sortByRatingDesc();
        this.isSelected = false;
        break;
      case 'name':
        this.shopService.sortByNameDesc();
        this.isSelected = false;
        break;
      case 'price':
        this.shopService.sortbyPriceDesc();
        this.isSelected = false;
        break;
    }
  }

  sortDesAsc(selectedProperty : string):void{
    switch (selectedProperty)
    {
      case 'desc':
        console.log('Absteigend Sortierung');
        this.shopService.sortDescBy();
        break;
      case 'asc':
        console.log('Aufsteigend Sortierung');
        this.shopService.sortAscBy();
        break;
    }
  }


  ngOnInit() {
  }

}
