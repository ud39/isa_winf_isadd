import {Component, HostListener} from '@angular/core';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  brand = "./Upload/kaffeesatt.png";
  isExpanded = false;
  public currentWindowWidth: number = window.innerWidth;

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
}


