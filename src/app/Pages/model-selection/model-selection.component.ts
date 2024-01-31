import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

//models
import { navBarModel } from "../../Models/nav_bar_model";

//components
import { NavBarComponent } from "../../Components/nav-bar/nav-bar.component";

@Component({
  selector: "pgpt-model-selection",
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: "./model-selection.component.html",
  styleUrl: "./model-selection.component.css",
})
export class ModelSelectionComponent implements OnInit {
  navBarElements: navBarModel = {
    signUp: false,
    login: true,
  };
  modelSelected = {
    llama2: false,
    openAI: false,
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.modelSelected = {
      llama2: false,
      openAI: false,
    };
  }

  handleOpenAIClick(): void {
    this.modelSelected.openAI = true;
    this.router.navigate(["registration"], { state: this.modelSelected });
  }

  handleLLAMA2Click(): void {
    this.modelSelected.llama2 = true;
    this.router.navigate(["registration"], { state: this.modelSelected });
  }
}
