import { Routes } from '@angular/router';
import { HomepageComponent } from '../homepage/homepage.component';
import { DoctordashboardComponent } from '../doctordashboard/doctordashboard.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ClientdashboardComponent } from '../clientdashboard/clientdashboard.component';
import { authGuard } from '../auth-guard/auth.guard';

export const routes: Routes = [
    {path: "home", component: HomepageComponent},
    {path: "login", component: LoginComponent},
    {path: "login/client", component: LoginComponent},
    {path: "login/doctor", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "doctordashboard", component: DoctordashboardComponent, canActivate:[authGuard]},
    {path: "clientdashboard", component: ClientdashboardComponent, canActivate:[authGuard]},
    {path: "", component: HomepageComponent},
    {path: "**", component: HomepageComponent}
];
