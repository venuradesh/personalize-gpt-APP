import { Routes } from '@angular/router';

//pages
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { ModelSelectionComponent } from './Pages/model-selection/model-selection.component';

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
];
