import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

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

  showTabContent(){
    var tabs = document.getElementsByClassName("tab-content");
    let i;
    let content = document.getElementsByClassName("shop_description") as HTMLCollectionOf<HTMLElement>;
    for(i=0; i< content.length;i++){
        content[i].classList.remove("description-active");
    }
    for(i=0; i< tabs.length;i++){
      tabs[i].classList.remove("tab-active");
    }
    (<HTMLElement> event.target).classList.add("tab-active");
    switch((<HTMLElement> event.target).innerText.trim())
    {
      case "Beschreibung":
        content[0].classList.add("description-active");
        break;
      case "Event":
        content[1].classList.add("description-active");
        break;
      case "Zubereitung":
        content[2].classList.add("description-active");
        break;
    }
  }


  constructor() { }

  ngOnInit() {
  }

}

