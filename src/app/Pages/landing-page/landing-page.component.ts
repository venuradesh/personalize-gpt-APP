import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

///models
import { navBarModel } from "../../Models/nav_bar_model";

//components
import { NavBarComponent } from "../../Components/nav-bar/nav-bar.component";

@Component({
  selector: "pgpt-landing-page",
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: "./landing-page.component.html",
  styleUrl: "./landing-page.component.css",
})
export class LandingPageComponent {
  navBarElements: navBarModel = {
    signUp: true,
    login: true,
  };

  constructor(private router: Router) {}

  handleGetStart(): void {
    this.router.navigate(["/model-selection"]);
  }
}
