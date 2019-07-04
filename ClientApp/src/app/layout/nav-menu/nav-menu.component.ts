import {Component, HostListener} from '@angular/core';
import {ImageService} from "../../services/image/image.service";
import {Global} from "../../global";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user/user.service";


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})



export class NavMenuComponent {

  public brand = Global.url + 'image/GetById?ContentType=brand&fileName=kaffeesatt.png';
  isExpanded = false;
  public currentWindowWidth: number = window.innerWidth;
  constructor(public imageService: ImageService, private http: HttpClient,  public userService: UserService){}
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

  public emailFormControl = new FormControl('',[
    Validators.required
  ]);
  public passwordFormControl = new FormControl('',[
    Validators.required,
    Validators.minLength(4)
  ]);

  public loginFormGroup = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl
  });

  public login(){
    this.userService.login(this.loginFormGroup).subscribe(value => {
      console.log(value);
      }
    );
  }
  public logout(){
    this.userService.logout();
  }
}


