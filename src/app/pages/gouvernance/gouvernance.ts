import { Component } from '@angular/core';

const OUTILS_NUMERIQUES = [
  {
    sigle: 'PSE', nom: 'Plateforme de Suivi des Engagements', vague: 1,
    fonction: 'Tableau Kanban public de chaque mesure (statut, responsable, dates, Definition of Done).',
    detail: 'Dès la mise en ligne, une consultation est lancée : « C\'est quoi une mesure réussie pour vous ? ». Chaque Blanc-Mesnilois peut proposer ses critères de réussite. L\'objectif est d\'avoir la Definition of Done de chaque mesure co-construite avec les habitants avant la rentrée scolaire. Ce retour citoyen pilote les priorités que prend la ville après les 100 premiers jours.',
  },
  {
    sigle: 'PTB', nom: 'Portail de Transparence Budgétaire', vague: 1,
    fonction: 'Budget simplifié + détaillé, marchés publics, visualisations.',
    detail: 'Les habitants commentent et proposent des optimisations. Publication du budget en version pédagogique accessible à tous.',
  },
  {
    sigle: 'PIPC', nom: 'Plateforme d\'Interpellation Citoyenne', vague: 2,
    fonction: 'Dépôt, qualification, réponse publique aux interpellations.',
    detail: 'Circuit : expression → qualification → réponse → suivi. Chaque interpellation reçoit une réponse publique dans un délai défini.',
  },
  {
    sigle: 'RGPI', nom: 'Registre des Grands Projets et Investissements', vague: 2,
    fonction: 'Avancement, coûts, bénéfices, espace de contribution citoyenne pour chaque grand projet.',
    detail: 'Page projet par projet : calendrier, budget, avancement des travaux, espace de contribution citoyenne.',
  },
  {
    sigle: 'ENQ', nom: 'Espaces Numériques de Quartier', vague: 3,
    fonction: 'Un espace par quartier relié à la PSE (signalements, entraide, services entre voisins, boîte à idées).',
    detail: 'Covoiturage local · Petits travaux entre voisins (prix à l\'heure) · Aide aux devoirs et aide informatique · Vigilance de quartier · Boîte à idées avec vote pour/contre. Règle fondamentale : zone de solidarité, pas de publicité commerciale. 21 quartiers ENQ couvrant tout le territoire.',
  },
  {
    sigle: 'SEAD', nom: 'Système d\'Évaluation et d\'Aide à la Décision', vague: 3,
    fonction: 'Tableaux de bord agrégés, IA, audits externes, vote de confiance annuel.',
    detail: 'Indicateurs de suivi publiés, évaluation permanente des politiques, aide à la décision pour les élus. Objectif : 30 % des habitants connectés à M18.',
  },
];

const VAGUES_MVP = [
  {
    vague: 1, periode: 'Mois 0–3', outils: 'PSE + PTB',
    perimetre: 'Page web simple : liste des 213 mesures avec statut (à faire / en cours / livré) + budget simplifié PDF interactif + liste des marchés publics.',
    lowTech: 'Tableaux d\'affichage en mairie et maisons de quartier (statut des mesures, budget résumé sur 2 pages).',
  },
  {
    vague: 2, periode: 'Mois 3–9', outils: 'PIPC + RGPI',
    perimetre: 'Formulaire d\'interpellation en ligne avec circuit de réponse publique · Page projet par projet (avancement, coûts, contributions citoyennes).',
    lowTech: 'Registre papier d\'interpellation en mairie + permanence téléphonique dédiée.',
  },
  {
    vague: 3, periode: 'Mois 9–18', outils: 'ENQ + SEAD',
    perimetre: 'Espaces de quartier (forum modéré, signalements géolocalisés, services entre voisins, boîte à idées avec vote pour/contre) · Tableaux de bord agrégés, indicateurs, audits externes.',
    lowTech: 'Bulletins trimestriels distribués dans les boîtes aux lettres ; réunions de quartier avec présentation des indicateurs.',
  },
];

const GOUVERNANCE_OUTILS = [
  { question: 'Qui développe ?', reponse: 'Association locale de jeunes développeurs encadrée par un prestataire référent (contrat de maintenance). Open source — le code est réutilisable par d\'autres communes.' },
  { question: 'Qui maintient ?', reponse: 'La ville (DSI / prestataire) pour l\'hébergement et la sécurité ; l\'association pour les évolutions fonctionnelles.' },
  { question: 'Cybersécurité', reponse: 'Hébergement souverain (SecNumCloud ou équivalent) · Audit de sécurité annuel · Plan de réponse aux incidents.' },
  { question: 'RGPD', reponse: 'DPO désigné · Registre des traitements · Consentement explicite pour les ENQ · Droit de suppression garanti.' },
  { question: 'Adoption', reponse: 'Accompagnement humain dans les maisons de quartier · Tutoriels vidéo · Objectif : 30 % des habitants connectés à M18.' },
  { question: 'Budget', reponse: '500 k€ – 1,5 M€ sur le mandat (ANCT + autofinancement + partenaires tech).' },
];

const PRINCIPES_TRANSVERSAUX = [
  { num: 1, titre: 'Évaluation et indicateurs mesurables', detail: 'Chaque mesure est dotée d\'une Definition of Done et d\'indicateurs de suivi publiés sur la PSE.' },
  { num: 2, titre: 'Concertation continue', detail: 'Conseils de quartier, ENQ et PIPC alimentent en continu les ajustements.' },
  { num: 3, titre: 'Incitation avant sanction', detail: 'En matière d\'écologie, de propreté et de civisme, la pédagogie précède la sanction.' },
  { num: 4, titre: 'Clauses d\'insertion systématiques', detail: 'Tous les marchés publics intègrent des objectifs d\'emploi local.' },
  { num: 5, titre: 'Accessibilité universelle', detail: 'Chaque action, outil et lieu prend en compte les personnes en situation de handicap, les seniors, les familles et les personnes éloignées du numérique.' },
  { num: 6, titre: 'Budget maîtrisé', detail: 'Le mandat doit s\'achever avec des comptes sains et un budget de fonctionnement réduit par rapport à l\'existant.' },
];

@Component({
  selector: 'app-gouvernance',
  templateUrl: './gouvernance.html',
  styleUrl: './gouvernance.scss',
})
export class GouvernancePage {
  protected readonly outilsNumeriques      = OUTILS_NUMERIQUES;
  protected readonly vaguesMvp             = VAGUES_MVP;
  protected readonly gouvernanceOutils     = GOUVERNANCE_OUTILS;
  protected readonly principesTransversaux = PRINCIPES_TRANSVERSAUX;

  protected outilOuvert: string | null = null;
  toggleOutil(sigle: string): void {
    this.outilOuvert = this.outilOuvert === sigle ? null : sigle;
  }
}
