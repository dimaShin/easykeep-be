import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {RouterModule} from "@angular/router";

export const authRoutesConfig = [
  {
    path: '',
    component: AuthComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full'
      }
    ]
  }
];

export default RouterModule.forChild(authRoutesConfig);
