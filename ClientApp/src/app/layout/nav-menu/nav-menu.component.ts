import {Component, HostListener, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ImageService} from "../../services/image/image.service";
import {MatMenuTrigger} from "@angular/material";
import {Global} from "../../global";


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})



export class NavMenuComponent {
  @ViewChild('menuWikiTrigger') menuWikiTrigger : MatMenuTrigger;

  closeMenuAndRemoveFocus(){
    this.menuWikiTrigger.closeMenu();
  }
  public brand = Global.url + 'image/GetById?ContentType=brand&fileName=kaffeesatt.png';
  isExpanded = false;
  public currentWindowWidth: number = window.innerWidth;
  constructor(public imageService: ImageService){}
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth
  }

  displayDropDown:boolean = true;

  dropdown() {
    let dropdown = document.getElementById('login-dropdown-content');
    if (this.displayDropDown){
    dropdown.classList.add('login-dropdown-content-permanent');
    this.displayDropDown = !this.displayDropDown;
    }else{
    dropdown.classList.remove('login-dropdown-content-permanent');
    this.displayDropDown = !this.displayDropDown;
    }
  }


}


