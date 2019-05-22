import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  showNavigation: boolean = false;

  constructor(private router: Router) {
    // on route change to '/login', set the variable showNavigation to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/registration' || event['url'] == '/login') {
          this.showNavigation = false;
        } else {
          // console.log("NU")
          this.showNavigation = true;
        }
      }
    });
  }

  onElementFocusRemove(e){
    if (document.activeElement instanceof HTMLElement) { document.activeElement.blur();}

  }
  ngOnInit() {
    if (document.addEventListener)
      document.addEventListener("focus", this.onElementFocusRemove, true);
  }

}
