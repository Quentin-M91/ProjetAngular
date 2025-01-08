import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { InscriptionComponent } from './identification/inscription/inscription.component';
import { ConnexionComponent } from './identification/connexion/connexion.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { ClientsComponent } from './pages/clients/clients.component';

export const routes: Routes = [

    {path: "", component: AccueilComponent},
    {path: "accueil", component: AccueilComponent},
    {path: "inscription", component: InscriptionComponent},
    {path: "connexion", component: ConnexionComponent},
    {path: "utilisateurs", component: UtilisateursComponent},
    {path: "produits", component: ProduitsComponent},
    {path: "commandes", component: CommandesComponent},
    {path: "clients", component: ClientsComponent},
];
