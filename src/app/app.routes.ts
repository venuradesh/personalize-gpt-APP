import { Routes } from "@angular/router";

//pages
import { LandingPageComponent } from "./Pages/landing-page/landing-page.component";

export const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
    pathMatch: "full",
  },
];
