import { Component, Injector } from '@angular/core';
import { RouterEvent, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'source';
  navigationInterceptor(event: RouterEvent){
    console.log(event);
    if (event instanceof NavigationStart) {
      document.getElementById('theNavigationScript').remove();
    }
    if (event instanceof NavigationEnd) {
      let script = document.createElement('script');
      script.id = 'theNavigationScript'
      script.type = 'text/javascript';
      script.src = '/assets/js/theme.js';
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }
}
