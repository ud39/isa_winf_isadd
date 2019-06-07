import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  getOnInput(){
    let input;
    if((<HTMLElement> event.target).classList.contains("delete")){
      input = <HTMLElement> document.getElementsByClassName("delete-account")[0];
    }
    else {
      input = <HTMLElement> document.getElementsByClassName("change-email")[0];
    }
    input.focus();
  };

  constructor() { }

  ngOnInit() {
  }

}
