import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare let gtag:Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Covid19';
  constructor(private router:Router)
  {
    router.events.subscribe((y: NavigationEnd) => {
      if(y instanceof NavigationEnd){
        gtag('config','UA-162970116-1',{'page_path' : y.url});
      }
    })
  }
}
