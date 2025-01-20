import { Routes } from '@angular/router';
import { CallbackComponent } from './core/components/callback/callback.component';


export const routes: Routes = [
    {path: '', component: CallbackComponent},
    {path: 'callback', component: CallbackComponent},
];
