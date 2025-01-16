import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { InscriptionComponent } from './identification/inscription/inscription.component';
import { ConnexionComponent } from './identification/connexion/connexion.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { NgModule } from '@angular/core';
import { ConditionUtilisationComponent } from './condition-utilisation/condition-utilisation.component';
import { FormulaireClientComponent } from './formulaire/formulaire-client/formulaire-client.component';
import { ModificationClientComponent } from './formulaire/modification-client/modification-client.component';
import { AuthGuard } from './identification/auth.guard';

export const routes: Routes = [

    { path: "", component: AccueilComponent, pathMatch: 'full' },
    { path: "accueil", component: AccueilComponent, pathMatch: 'full' },
    { path: "inscription", component: InscriptionComponent, pathMatch: 'full' },
    { path: "connexion", component: ConnexionComponent, pathMatch: 'full' },

    // Routes protégées par AuthGuard
    { path: "utilisateurs", component: UtilisateursComponent, canActivate: [AuthGuard] },
    { path: "produits", component: ProduitsComponent, canActivate: [AuthGuard] },
    { path: "commandes", component: CommandesComponent, canActivate: [AuthGuard] },
    { path: "clients", component: ClientsComponent, canActivate: [AuthGuard] },
    { path: "nouveau-client", component: FormulaireClientComponent, canActivate: [AuthGuard] },
    { path: "modification-client/:id", component: ModificationClientComponent, canActivate: [AuthGuard] },
    { path: "condition-utilisation", component: ConditionUtilisationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }