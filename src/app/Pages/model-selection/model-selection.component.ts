import { Component } from '@angular/core';

//models
import { navBarModel } from '../../Models/nav_bar_model';

//components
import { NavBarComponent } from '../../Components/nav-bar/nav-bar.component';

@Component({
  selector: 'pgpt-model-selection',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './model-selection.component.html',
  styleUrl: './model-selection.component.css',
})
export class ModelSelectionComponent {
  navBarElements: navBarModel = {
    signUp: false,
    login: true,
  };
}
