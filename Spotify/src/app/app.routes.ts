import { Routes } from '@angular/router';
import { CallbackComponent } from './core/components/callback/callback.component';
import { LoginComponent } from './core/components/login/login.component';
import { ProfileComponent } from './core/components/profile/profile.component';
import { HomeComponent } from './core/components/home/home.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'callback', component: CallbackComponent },
    { path: 'login', component: LoginComponent}
];
