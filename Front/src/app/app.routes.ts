import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { MainComponent } from './main/main.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AuthGuard, LoginGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: 'connexion', 
        component: ConnexionComponent,
        canActivate: [LoginGuard]
    },
    {
        path:'',
        component: MainComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'inscription',
        component: InscriptionComponent,
        canActivate: [LoginGuard]
    },

    {path: '**', redirectTo: 'connexion', pathMatch: 'full'}
];
