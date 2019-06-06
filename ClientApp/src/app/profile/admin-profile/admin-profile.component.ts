import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProfileComponent implements OnInit {
  value ='';


  constructor() {
  }

  ngOnInit() {

  }

}
