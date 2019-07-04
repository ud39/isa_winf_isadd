import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ShopService} from "../../../services/shop/shop.service";

import {Shop} from "../../../interfaces/entity/Shop";
import {switchMap} from "rxjs/operators";
import {TooltipPosition} from "@angular/material";


@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopDetailComponent implements OnInit {

  public priceDescription = "";
  public symbolColdFood = 'kaltes Essen';
  public symbolWarmFood = 'Warmes Essen';
  public symbolWlan = 'Wlan';
  public symbolChildFriendly = 'Kinderfreundlich';
  public symbolDisabledFriendly = 'Behindertengerecht';
  public symbolOutdoor = 'Outdoor';
  public symbolLatteArt = 'Latte Art';
  public symbolPetsFriendly = 'Haustierfreundlich';
  public symbolWorkStation = 'Arbeitsmöglichkeit';
  public symbolFranchise = 'Tante Emma';
  public position : TooltipPosition = 'above';
  public shop$: Shop;
  public priceClass: string;

  setPriceClass(range:string):void{
    switch (range) {
      case 'niedrig':
        this.priceClass = "€";
        this.priceDescription = "niedrig";
        break;
      case 'mittel':
        this.priceClass = "€€";
        this.priceDescription = "mittel";
        break;
      case 'hoch':
        this.priceClass = "€€€";
        this.priceDescription = "hoch";
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
    public route: ActivatedRoute,
    public router: Router,
    public service: ShopService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getShop(params.get('id')))
    ).subscribe((params:Shop)=> {
      this.shop$ = params;
      this.setPriceClass(this.shop$.priceClass);
      console.log(this.shop$);
    });
  }
}

