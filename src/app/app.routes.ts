import { Routes } from '@angular/router';

//pages
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { ModelSelectionComponent } from './Pages/model-selection/model-selection.component';
import { RegistartionComponent } from './Pages/registartion/registartion.component';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'model-selection',
    component: ModelSelectionComponent,
    pathMatch: 'full',
  },
  {
    path: 'registration',
    component: RegistartionComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
];
