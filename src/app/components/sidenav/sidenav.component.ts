import { Component } from '@angular/core';
import { slideInLeftAnimation } from '../../animations/animations';


@Component({
  selector: 'my-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [slideInLeftAnimation]
})
export class SidenavComponent {
  public openNavbar = false;
  public showCompanies = false;
  constructor() {}
}
