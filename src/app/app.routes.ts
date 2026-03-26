import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  {
    path: 'accueil',
    loadComponent: () => import('./pages/accueil/accueil').then(m => m.AccueilPage)
  },
  {
    path: 'mesures',
    loadComponent: () => import('./pages/mesures/mesures').then(m => m.MesuresPage)
  },
  {
    path: 'cent-jours',
    loadComponent: () => import('./pages/cent-jours/cent-jours').then(m => m.CentJoursPage)
  },
  {
    path: 'timeline',
    loadComponent: () => import('./pages/timeline/timeline').then(m => m.TimelinePage)
  },
  {
    path: 'projets',
    loadComponent: () => import('./pages/projets/projets').then(m => m.ProjetsPage)
  },
  {
    path: 'gouvernance',
    loadComponent: () => import('./pages/gouvernance/gouvernance').then(m => m.GouvernancePage)
  },
  {
    path: 'pouvoir-achat',
    loadComponent: () => import('./pages/pouvoir-achat/pouvoir-achat').then(m => m.PouvoirAchatPage)
  },
  {
    path: 'glossaire',
    loadComponent: () => import('./pages/glossaire/glossaire').then(m => m.GlossairePage)
  },
  {
    path: 'outils',
    loadComponent: () => import('./pages/outils/outils').then(m => m.OutilsPage)
  },
];
