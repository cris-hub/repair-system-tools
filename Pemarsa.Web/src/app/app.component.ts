import { Component, ViewChild } from '@angular/core';
import { MatSidenav} from '@angular/material'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  openMenu: boolean;
  constructor(router: Router) {
    router.navigate(['home']);
    this.openMenu = false;
  }
  title = 'MTA Platform';
  @ViewChild('sidenav') sidenav: MatSidenav;
  events = [];

  close(reason: string) {
    this.sidenav.close();
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

}
