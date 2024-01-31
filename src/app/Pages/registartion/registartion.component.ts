import { Component, OnInit } from "@angular/core";
import { Location, NgIf } from "@angular/common";
import { Router } from "@angular/router";

//models
import { navBarModel } from "../../Models/nav_bar_model";

//components
import { NavBarComponent } from "../../Components/nav-bar/nav-bar.component";
import { InputFieldComponent } from "../../Components/input-field/input-field.component";

@Component({
  selector: "pgpt-registartion",
  standalone: true,
  imports: [NavBarComponent, InputFieldComponent, NgIf],
  templateUrl: "./registartion.component.html",
  styleUrl: "./registartion.component.css",
})
export class RegistartionComponent implements OnInit {
  navBarElements: navBarModel = {
    signUp: false,
    login: true,
  };
  openAIModelSelected: boolean = false;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    const state: any = this.location.getState();
    this.openAIModelSelected = state.openAI;
    console.log(this.openAIModelSelected);
  }
}
