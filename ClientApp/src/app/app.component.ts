import {Component} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'app';

  showNavigation: boolean = false;
  urlSearchPath: string = "/shop";
  constructor(private router: Router) {
  }

  static onElementFocusRemove(e){
    if (document.activeElement instanceof HTMLElement && document.activeElement.tagName.toLowerCase() == 'button')
    { document.activeElement.blur();}

  }
  ngOnInit() {
    if (document.addEventListener)
      document.addEventListener("focus", AppComponent.onElementFocusRemove, true);
    // on route change to '/login', set the variable showNavigation to false
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if(event['url'] == '/shop' || event['url'] == '/equipment' || event['home'] == '/home') {
          this.showNavigation = true;
          this.urlSearchPath = event['url'];
        }else{
          this.showNavigation = false;
        }
      }else{

      }
    });
  }

}
