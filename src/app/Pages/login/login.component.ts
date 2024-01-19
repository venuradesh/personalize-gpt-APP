import { Component } from '@angular/core';

//models
import { navBarModel } from '../../Models/nav_bar_model';

//components
import { NavBarComponent } from '../../Components/nav-bar/nav-bar.component';
import { InputFieldComponent } from '../../Components/input-field/input-field.component';

@Component({
  selector: 'pgpt-login',
  standalone: true,
  imports: [NavBarComponent, InputFieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  navBarElements: navBarModel = {
    signUp: true,
    login: false,
  };
}
