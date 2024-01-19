import { Component } from '@angular/core';

//models
import { navBarModel } from '../../Models/nav_bar_model';

//components
import { NavBarComponent } from '../../Components/nav-bar/nav-bar.component';
import { InputFieldComponent } from '../../Components/input-field/input-field.component';

@Component({
  selector: 'pgpt-registartion',
  standalone: true,
  imports: [NavBarComponent, InputFieldComponent],
  templateUrl: './registartion.component.html',
  styleUrl: './registartion.component.css',
})
export class RegistartionComponent {
  navBarElements: navBarModel = {
    signUp: false,
    login: true,
  };
}
