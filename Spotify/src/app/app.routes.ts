import { Routes } from '@angular/router';
import { CallbackComponent } from './core/components/callback/callback.component';
import { LoginComponent } from './core/components/login/login.component';
import { ProfileComponent } from './core/components/profile/profile.component';
import { HomeComponent } from './core/components/home/home.component';
import { ArtistsComponent } from './core/components/artists/artists.component';
import { ChartsComponent } from './core/components/charts/charts.component';
import { TracksComponent } from './core/components/tracks/tracks.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'callback', component: CallbackComponent },
    { path: 'login', component: LoginComponent},
    {path: 'charts',
    component: ChartsComponent,
    children: [
        { path: 'artists', component: ArtistsComponent },
        { path: 'tracks', component: TracksComponent },
        { path: '', redirectTo: 'artists', pathMatch: 'full' }
    ]
    },
];
