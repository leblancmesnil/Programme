import { Component } from '@angular/core';

interface OutilService { titre: string; detail: string; }
interface OutilQuartier { n: number; nom: string; }
interface Outil {
  sigle: string;
  nom: string;
  vague: number;
  description: string;
  url: string | null;
  actif: boolean;
  icon?: string; // legacy emoji (optional)
  iconPath?: string; // path to svg icon in assets
  services?: OutilService[];
  regle?: string;
  quartiers?: OutilQuartier[];
}

const OUTILS: Outil[] = [
  {
    sigle: 'PSE',
    nom: 'Plateforme de Suivi des Engagements',
    vague: 1,
    description: 'Tableau Kanban public des 213 mesures — statut, responsable, dates, Definition of Done. Co-construite avec les habitants.',
    url: 'https://leblancmesnil.github.io/PSE/',
    actif: true,
    icon: '🧭',
    iconPath: 'assets/icons/pse.svg',
  },
  {
    sigle: 'PTB',
    nom: 'Portail de Transparence Budgétaire',
    vague: 1,
    description: 'Budget simplifié + détaillé, marchés publics en open data, visualisations accessibles à tous.',
    url: null,
    actif: false,
    icon: '💶',
    iconPath: 'assets/icons/ptb.svg',
  },
  {
    sigle: 'PIPC',
    nom: "Plateforme d'Interpellation et de Participation Citoyenne",
    vague: 2,
    description: "Dépôt, qualification et réponse publique aux interpellations citoyennes. Circuit : expression → qualification → réponse → suivi.",
    url: null,
    actif: false,
    icon: '📣',
    iconPath: 'assets/icons/pipc.svg',
  },
  {
    sigle: 'RGPI',
    nom: 'Registre des Grands Projets et Investissements',
    vague: 2,
    description: 'Avancement, coûts, bénéfices et espace de contribution citoyenne pour chaque grand projet structurant.',
    url: null,
    actif: false,
    icon: '🏗️',
    iconPath: 'assets/icons/rgpi.svg',
  },
  {
    sigle: 'ENQ',
    nom: 'Espaces Numériques de Quartier',
    vague: 3,
    description: 'Un espace numérique par quartier — mini-réseau de voisins relié à la PSE. Pas de publicité commerciale, modération garantissant un espace de confiance.',
    url: null,
    actif: false,
    icon: '🏘️',
    iconPath: 'assets/icons/enq.svg',
    services: [
      { titre: 'Covoiturage local', detail: 'Trajets prévisibles (école, travail, courses) via la plateforme du quartier, sans intermédiaire commercial.' },
      { titre: 'Petits travaux entre voisins', detail: 'Prix à l\'heure affichés — tondre, bricolage, déménagement, baby-sitting…' },
      { titre: 'Aide aux devoirs & informatique', detail: 'Mise en relation directe entre habitants.' },
      { titre: 'Vigilance de quartier', detail: 'Réseau solidaire de surveillance mutuelle, notamment pendant les vacances.' },
      { titre: 'Boîte à idées', detail: 'Proposer, discuter, voter pour/contre — les besoins réels remontent directement à l\'équipe municipale.' },
    ],
    regle: '⚠ Règle fondamentale : les ENQ sont un lieu d\'échange et de solidarité, pas un réseau social publicitaire. Toute publicité commerciale est interdite.',
    quartiers: [
      { n: 1,  nom: 'Montgolfier' },
      { n: 2,  nom: 'Charles Floquet / Jacques Demolin' },
      { n: 3,  nom: 'Place Mozart' },
      { n: 4,  nom: 'Docteur Albert Calmette' },
      { n: 5,  nom: 'Lavoisier / Pasteur' },
      { n: 6,  nom: 'Aulnay / Gambetta' },
      { n: 7,  nom: 'Stalingrad' },
      { n: 8,  nom: 'Paul Vaillant Couturier' },
      { n: 9,  nom: 'Mathilde Émilie' },
      { n: 10, nom: 'Les Quatre Tours' },
      { n: 11, nom: 'Jacques Decour' },
      { n: 12, nom: 'Lénine' },
      { n: 13, nom: 'Abbé Niort / Jean Moulin' },
      { n: 14, nom: 'Guynemer' },
      { n: 15, nom: 'Maurice Audin' },
      { n: 16, nom: 'Corot / Veuve Bouquin' },
      { n: 17, nom: 'Professeur Henri Wallon' },
      { n: 18, nom: 'Jean Duclos' },
      { n: 19, nom: 'Victor Hugo / Maurice Berteaux' },
      { n: 20, nom: 'Coudray Paris Nord' },
      { n: 21, nom: 'Molette' },
    ],
  },
  {
    sigle: 'SEAD',
    nom: "Système d'Évaluation et d'Aide à la Décision",
    vague: 3,
    description: 'Tableaux de bord agrégés, indicateurs de suivi, audits externes publiés, vote de confiance annuel.',
    url: null,
    actif: false,
    icon: '📊',
    iconPath: 'assets/icons/sead.svg',
  },
];

@Component({
  selector: 'app-outils',
  templateUrl: './outils.html',
  styleUrl: './outils.scss',
})
export class OutilsPage {
  protected readonly outils: Outil[] = OUTILS;
}
