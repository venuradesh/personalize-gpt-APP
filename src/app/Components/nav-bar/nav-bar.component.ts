import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

//models
import { navBarModel } from "../../Models/nav_bar_model";

@Component({
  selector: "pgpt-nav-bar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./nav-bar.component.html",
  styleUrl: "./nav-bar.component.css",
})
export class NavBarComponent {
  @Input() landingPageContainer: boolean = false;
  @Input() navBarElements: navBarModel = {
    signUp: false,
    login: false,
  };
  hamburrgerClicked: boolean = false;

  constructor(private router: Router) {}

  handleHamburgerClick(): void {
    this.hamburrgerClicked = !this.hamburrgerClicked;
  }

  handleSignUp(): void {
    this.router.navigate(["/model-selection"]);
  }

  handleLogin(): void {
    this.router.navigate(["/login"]);
  }
}
