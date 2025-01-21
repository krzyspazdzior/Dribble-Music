import { Routes } from '@angular/router';
import { CallbackComponent } from './core/components/callback/callback.component';
import { LoginComponent } from './core/components/login/login.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', component: LoginComponent},
    { path: 'callback', component: CallbackComponent },
    {path: 'login', component: LoginComponent},
];
