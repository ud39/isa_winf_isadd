import {Component, HostListener, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ImageService} from "../../services/image/image.service";
import {MatMenuTrigger} from "@angular/material";


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
  private brand: any;
  isExpanded = false;
  public currentWindowWidth: number = window.innerWidth;
  constructor(private imageService: ImageService){}
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth
  }

  collapse() {
    this.isExpanded = false;

  }

  toggle() {
    this.isExpanded = !this.isExpanded;
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

  ngOnInit(){
    this.imageService.getBrandImage().subscribe(value => {
      this.imageService.setBrandImage(value).then(data => this.brand = data );
    })
  }

}


