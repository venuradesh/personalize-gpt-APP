import { Component, OnInit } from "@angular/core";
import { Location, NgIf } from "@angular/common";
import { Router } from "@angular/router";

//models
import { navBarModel } from "../../Models/nav_bar_model";
import User from "../../Models/user_model";

//services
import { UserServiceService } from "../../Services/user-service.service";

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
  userData: User = {
    openai_key: null,
    first_name: "",
    last_name: "",
    dob: "",
    designation: "",
    description: "",
    email: "",
    personality: "",
    password: "",
    org_name: "",
  };
  error: string = "";

  constructor(private router: Router, private location: Location, private userService: UserServiceService) {}

  ngOnInit(): void {
    const state: any = this.location.getState();
    this.openAIModelSelected = state.openAI;
  }

  handleOpenAIApiKey(event: any): void {
    this.userData.openai_key = event;
  }

  handleFirstName(event: any): void {
    this.userData.first_name = event;
  }

  handleLastName(event: any): void {
    this.userData.last_name = event;
  }

  handleDob(event: any): void {
    this.userData.dob = event;
  }

  handleDesignation(event: any): void {
    this.userData.designation = event;
  }

  handleOrganizationValue(event: any): void {
    this.userData.org_name = event;
  }

  handleEmail(event: any): void {
    this.userData.email = event;
  }

  handledDescription(event: any): void {
    this.userData.description = event;
  }

  handlePersonality(event: any): void {
    this.userData.personality = event;
  }

  handlePassword(event: any): void {
    this.userData.password = event;
  }

  onSubmitClick(): void {
    if (
      this.userData.first_name &&
      this.userData.last_name &&
      this.userData.dob &&
      this.userData.designation &&
      this.userData.org_name &&
      this.userData.email &&
      this.userData.description &&
      this.userData.personality &&
      this.userData.password
    ) {
      if (this.openAIModelSelected && !this.userData.openai_key) {
        this.error = "Please paste your OPENAI API Key here";
        return;
      } else {
        const regExEmail = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        if (!regExEmail.test(this.userData.email)) {
          this.error = "Please add a valid email";
          return;
        }
        this.userService.user_signup(this.userData, this.openAIModelSelected ? "openai" : "llama2").subscribe({
          next: (val) => {
            this.router.navigate(["/login"]);
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    } else {
      this.error = "Please fill all the fields.";
    }
  }
}
