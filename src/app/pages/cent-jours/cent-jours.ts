import { Component } from '@angular/core';

const CENT_JOURS = [
  { jour: 'J1',   action: 'Installation du maire et adoption de la charte éthique des élus en conseil municipal' },
  { jour: 'J7',   action: 'Commande de l\'audit financier externe (mesure 208)' },
  { jour: 'J15',  action: 'Publication des critères d\'attribution des logements sociaux (mesure 13)' },
  { jour: 'J30',  action: 'PSE en ligne : les 213 mesures visibles avec statut, responsable, dates (mesure 1)' },
  { jour: 'J30',  action: 'Lancement de la consultation citoyenne : « C\'est quoi une mesure réussie pour vous ? » — les habitants contribuent à la Definition of Done de chaque mesure (mesure 5)' },
  { jour: 'J30',  action: 'Budget pédagogique publié sur le site de la ville (mesure 3)' },
  { jour: 'J30',  action: 'Premières patrouilles de proximité déployées (mesure 31)' },
  { jour: 'J45',  action: 'Lancement de la mutuelle communale — appel à candidatures (mesure 47)' },
  { jour: 'J45',  action: 'Clauses d\'insertion intégrées dans les premiers marchés publics (mesure 121)' },
  { jour: 'J60',  action: 'Dispositif Imagin\'R (remboursement transports mineurs) opérationnel (mesure 131)' },
  { jour: 'J60',  action: 'Cellule habitat indigne activée (mesure 22)' },
  { jour: 'J75',  action: 'Audit campus trilingue lancé — comité de pilotage installé (mesure 88)' },
  { jour: 'J90',  action: 'Guichet unique du logement ouvert (mesure 15)' },
  { jour: 'J90',  action: 'Guichet social unique opérationnel (mesure 75)' },
  { jour: 'J100', action: 'Premier tableau d\'affichage low-tech en mairie (suivi des 213 mesures + budget résumé)' },
];

@Component({
  selector: 'app-cent-jours',
  templateUrl: './cent-jours.html',
  styleUrl: './cent-jours.scss'
})
export class CentJoursPage {
  protected readonly centJours = CENT_JOURS;
}
