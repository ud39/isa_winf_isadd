import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShopService} from "../../../services/shop/shop.service";
import {Location} from '@angular/common';
import {Shop} from "../../../interfaces/entity/Shop";




@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopDetailComponent implements OnInit {

  public shop$: Shop;
  selectedId: string;
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

  getBoolean(bool){
    return Boolean(bool);
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ShopService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = params.get('name');
      this.service.getShop().subscribe(value => {
      this.shop$ = value;
      console.log(this.shop$.childFriendly.valueOf());
      })
    });

  }
}

