import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";

//models
import { navBarModel } from "../../Models/nav_bar_model";

//services
import { UserServiceService } from "../../Services/user-service.service";

//components
import { NavBarComponent } from "../../Components/nav-bar/nav-bar.component";
import { InputFieldComponent } from "../../Components/input-field/input-field.component";

@Component({
  selector: "pgpt-login",
  standalone: true,
  imports: [NavBarComponent, InputFieldComponent, NgIf],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  navBarElements: navBarModel = {
    signUp: true,
    login: false,
  };
  error: string = "";
  loginData = {
    email: "",
    password: "",
  };

  constructor(private router: Router, private userSerice: UserServiceService) {}

  handlEmailValue(event: any): void {
    const regEx = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (!regEx.test(event)) {
      this.error = "Please enter a valid email";
    } else {
      this.error = "";
      this.loginData.email = event;
    }
  }

  handlePasswordValue(value: any): void {
    this.loginData.password = value;
  }

  onSubmitClick(): void {
    if (this.loginData.email && this.loginData.password) {
      this.userSerice.user_login(this.loginData.email, this.loginData.password).subscribe({
        next: (val) => {
          localStorage.setItem("user_id", val.body.user_id);
          localStorage.setItem("choosed_llm", val.body.choosed_llm);
          localStorage.setItem("first_name", val.body.first_name);
          localStorage.setItem("last_name", val.body.last_name);
          this.router.navigate(["/home"]);
        },
        error: (err) => {
          this.error = err.error.message;
        },
      });
    } else {
      this.error = "Please fill the fields.";
    }
  }

  onLinkClick() {
    this.router.navigate(["/model-selection"]);
  }
}
