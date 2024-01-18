import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

//models
import { navBarModel } from '../../Models/nav_bar_model';

@Component({
  selector: 'pgpt-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  @Input() landingPageContainer: boolean = false;
  @Input() navBarElements: navBarModel = {
    signUp: false,
    login: false,
  };
  hamburrgerClicked: boolean = false;

  handleHamburgerClick(): void {
    this.hamburrgerClicked = !this.hamburrgerClicked;
  }
}
