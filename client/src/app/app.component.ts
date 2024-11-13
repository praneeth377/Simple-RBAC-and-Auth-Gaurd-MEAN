import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

  constructor(private route: Router) {}
  displayMenu: boolean = false;

  ngDoCheck(): void {
      if (this.route.url === '/home' || this.route.url === '/admin') {
        this.displayMenu = true;
      } else {
        this.displayMenu = false;
      }
  }
}
