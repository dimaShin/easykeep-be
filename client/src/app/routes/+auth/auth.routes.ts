import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

export const routesConfig = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }/*,
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      }*/
    ]
  }
];
