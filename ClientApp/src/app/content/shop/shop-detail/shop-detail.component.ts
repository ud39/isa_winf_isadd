import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ShopService} from "../../../services/shop/shop.service";

import {Shop} from "../../../interfaces/entity/Shop";
import {switchMap} from "rxjs/operators";
import {TooltipPosition} from "@angular/material";
import {ParamsInheritanceStrategy} from "@angular/router/src/router_state";

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopDetailComponent implements OnInit {

  private symbolWlan = 'stuff';
  private symbolChildFriendly = 'stuff';
  private symbolDisabledFriendly = 'stuff';
  private symbolOutdoor = 'stuff';
  private symbolLatteArt = 'stuff';
  private symbolPetsFriendly = 'stuff';
  private symbolWorkStation = 'stuff';
  private symbolFairTrade = 'stuff';
  private symbolFranchise = 'stuff';
  private symbolVegan = 'stuff';
  private position : TooltipPosition = 'above';
  private shop$: Shop;
  private priceClass: string;
  selectedId: string;

  setPriceClass(range:string):void{
    switch (range) {
      case 'niedrig':
        this.priceClass = "€";
        break;
      case 'mittel':
        this.priceClass = "€€";
        break;
      case 'hoch':
        this.priceClass = "€€€";
        break;
    }
  }


  public slideIndex = 1;
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  public showSlides(slideIndex);


  showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides") as  HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block";
    dots[this.slideIndex-1].className += " active";
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getShop(params.get('id')))
    ).subscribe(params => {
      this.shop$ = params;
      this.setPriceClass(this.shop$.priceClass);
    });
  }
}

