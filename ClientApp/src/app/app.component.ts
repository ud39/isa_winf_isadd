import {Component} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import {Global} from "./global";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Global],
})
export class AppComponent {




  private showNavigation: boolean = false;
  private urlSearchPath: string = "/shop";
  constructor(private router: Router, private globals: Global) {
  }

  static onElementFocusRemove(e){
    if (document.activeElement instanceof HTMLElement && document.activeElement.tagName.toLowerCase() == 'button')
    { document.activeElement.blur();}
  }

  private checkUrlCheckBox(urlPath:NavigationStart){
    let currentUrl = urlPath['url'];
    let urlMap = this.globals.urlName;
    console.log(urlMap);
    return urlMap.get('home') == currentUrl
           || urlMap.get('shop') ==  currentUrl
           || urlMap.get('wikiEquipment') == currentUrl
           || urlMap.get('coffee') == currentUrl

  }

  ngOnInit() {
    if (document.addEventListener)
      document.addEventListener("focus", AppComponent.onElementFocusRemove, true);
    // on route change to '/login', set the variable showNavigation to false
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if(this.checkUrlCheckBox((event)))
        {
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
