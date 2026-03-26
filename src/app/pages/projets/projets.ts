import { Component } from '@angular/core';

const PROJETS = [
  {
    titre: 'ZAC de la Molette — Parc culturel, éducatif et économique',
    icone: '🏗️',
    citation: 'La ZAC de la Molette doit devenir le lieu où l\'on apprend, où l\'on se rencontre, où l\'on célèbre les cultures, et où le Blanc-Mesnil rayonne bien au-delà de ses frontières.',
    description: 'Réorienter la ZAC en grand pôle piéton, culturel, éducatif et économique — un lieu de destination, pas un programme immobilier. Le foncier doit servir l\'activité, la culture et la rencontre, et non la densification résidentielle. L\'objectif est d\'attirer des visiteurs extérieurs qui dépensent dans les commerces et les restaurants locaux — un « Vallée Village avec la culture en plus ».',
    composantes: [
      {
        titre: 'Campus trilingue — vitrine éducative internationale',
        detail: 'Langues : français, anglais, chinois. Accès gratuit pour les meilleurs élèves (mérite), priorité aux Blanc-Mesnilois ; tarification pour les élèves extérieurs contribuant au financement. Le campus s\'inscrit dans une OIM (Opération d\'Intérêt Métropolitain) lancée sous le mandat précédent, avec un objectif d\'ouverture à la rentrée 2028.',
      },
      {
        titre: 'Grand parc central',
        detail: 'Cœur du projet : lieu de détente, de rencontre, espace culturel vivant. Peu d\'habitation sur la zone — le foncier sert la respiration urbaine.',
      },
      {
        titre: 'Arène à ciel ouvert',
        detail: 'Scène permanente en dur au milieu du parc, entourée de stands de restauration. Programmation hebdomadaire : chaque samedi, un pays à l\'honneur — danses, musiques, représentations, gastronomie, artisanat. Les associations communautaires (indienne, portugaise, maghrébine, sénégalaise…) organisent et animent leur journée. Cinéma en plein air, concerts, événements culturels tout au long de l\'année.',
      },
      {
        titre: 'Zone commerciale et restauration',
        detail: 'Restaurants, cafés, commerces attractifs, concepts différenciants. Food court avec une offre de restauration diversifiée et de qualité. Complémentarité avec le Leclerc existant à proximité : les visiteurs profitent de l\'arène, puis font leurs courses sur place.',
      },
      {
        titre: 'Outlet — destination shopping et culture',
        detail: 'Attirer une clientèle extérieure, créer un flux touristique local, dynamiser l\'économie. Priorité à l\'emploi des jeunes de la ville pour les postes créés. Positionnement : une destination shopping et culture combinées.',
      },
      {
        titre: 'Zone 100 % piétonne',
        detail: 'Accès via transports en commun, mobilités douces, cheminements sécurisés.',
      },
    ],
    impacts: [
      'Éducation et excellence',
      'Culture et vivre-ensemble — ouverture interculturelle chaque semaine',
      'Attractivité métropolitaine — un lieu de destination qui fait venir les visiteurs extérieurs',
      'Emploi local — priorité aux jeunes de la ville',
      'Fierté d\'appartenance',
      'Jeunesse valorisée — acteurs de la programmation culturelle, pas spectateurs',
      'Image positive du Blanc-Mesnil',
      'Dynamisme associatif — les associations sont le moteur du projet',
      'Maîtrise de la densité — développer l\'activité sans construire de logements supplémentaires',
    ],
  },
  {
    titre: 'Quartier des Tilleuls — Rénovation culturelle et sociale',
    icone: '🏘️',
    citation: '',
    description: 'La rénovation des Tilleuls s\'inscrit dans la continuité de la ZAC de la Molette. Culture partout, pour tous. La dynamique : grands événements et rayonnement métropolitain à la Molette / création locale et vie associative aux Tilleuls.',
    composantes: [
      {
        titre: 'Programmation de proximité',
        detail: 'Spectacles locaux (théâtre, musique, danse, arts de rue), initiatives associatives, projets impliquant les jeunes.',
      },
      {
        titre: 'Maison des Associations',
        detail: 'Lieu de ressources, espace de répétition/création/transmission, point d\'ancrage citoyen et intergénérationnel.',
      },
      {
        titre: 'Dynamisation sans exclusion',
        detail: 'Le nouveau métro renforce la connexion ; la rénovation améliore le cadre de vie sans exclure ni déplacer les habitants actuels.',
      },
      {
        titre: 'Maintien des habitants — mesures anti-exclusion',
        detail: 'Rénovation prioritaire des logements existants avec aides ciblées pour les ménages en place. Rez-de-chaussée dédiés aux commerces et services, étages conservés pour l\'habitat. Protection des locataires en place (clauses de non-expulsion, relogement encadré si nécessaire). Priorité d\'accès aux logements rénovés pour les habitants du quartier. Incitations pour les activités culturelles et petites entreprises locales autour du centre.',
      },
      {
        titre: 'Équipements du quotidien',
        detail: 'Halte-garderie, épicerie sociale, services municipaux de proximité pour renforcer l\'attractivité résidentielle. Phasage des travaux pour limiter les déplacements forcés.',
      },
    ],
    impacts: [
      'Cadre de vie amélioré pour les habitants',
      'Vie associative renforcée',
      'Mixité sociale préservée',
      'Connexion renforcée via le nouveau métro',
      'Tissu résidentiel consolidé sans exclusion',
    ],
  },
  {
    titre: 'Maison de l\'Emploi et de l\'Entrepreneuriat',
    icone: '💼',
    citation: '',
    description: 'Implantée à proximité immédiate de la zone d\'activité du Coudray, pour faciliter les partenariats entre entreprises locales et dispositifs d\'insertion. Lieu central, sélectif et ambitieux : accompagnement ciblé des profils capables de créer leur activité.',
    composantes: [
      {
        titre: 'Accompagnement ciblé',
        detail: 'Sélection et suivi individualisé des profils entrepreneurs. Orientation vers les dispositifs de financement régionaux et nationaux.',
      },
      {
        titre: 'Espace de coworking',
        detail: 'Espaces de travail partagés accessibles aux entrepreneurs locaux, indépendants, en reconversion.',
      },
      {
        titre: 'Incubateur de startups et projets locaux',
        detail: 'Accompagnement 360° : de l\'idée à la création. Sessions de formation, mentorat par des entrepreneurs expérimentés, mise en réseau.',
      },
      {
        titre: 'Fonds municipal d\'amorçage',
        detail: 'Soutien financier initial pour les projets viables, cofinancé avec la Région Île-de-France et le FSE+.',
      },
      {
        titre: 'Partenaires de haut niveau',
        detail: 'Recherche active de sponsors privés et partenaires institutionnels. Forums emploi/entrepreneuriat annuels.',
      },
    ],
    impacts: [
      'Création d\'entreprises locales',
      'Emploi local et insertion professionnelle',
      'Dynamisme économique du territoire',
      'Réduction de la vacance commerciale',
      'Attractivité de la zone du Coudray',
    ],
  },
  {
    titre: 'Plan santé de proximité',
    icone: '🏥',
    citation: '',
    description: 'Un réseau complet de soins accessibles dans tous les quartiers. L\'accès aux soins est un droit fondamental — la ville agit pour combler les déserts médicaux et rendre les soins accessibles financièrement.',
    composantes: [
      {
        titre: 'Maison de santé pluridisciplinaire 360',
        detail: 'Médecins, infirmiers, psychologues, sages-femmes, kinésithérapeutes. Locaux identifiés mois 6, ouverture mois 18. Délai moyen rendez-vous < 48h.',
      },
      {
        titre: 'Cabinets médicaux de proximité',
        detail: 'Déploiement dans les quartiers les plus sous-dotés. Plan d\'attractivité : locaux adaptés, aide à l\'installation, accueil des jeunes professionnels de santé.',
      },
      {
        titre: 'Mutuelle communale',
        detail: 'Contrat groupe négocié avec un organisme mutualiste pour les habitants modestes sans couverture complémentaire suffisante. Objectif : ≥ 2 000 adhérents. Ouverte aux adhésions mois 6.',
      },
      {
        titre: 'Centres de dépistage mobiles',
        detail: 'Campagnes de dépistage (cancer, diabète, hypertension) et de vaccination dans les quartiers. Partenariats ARS et hôpitaux.',
      },
      {
        titre: 'Plan d\'attractivité médicale',
        detail: 'Partenariats durables avec les hôpitaux et universités. Accueil structuré des jeunes professionnels de santé (logement, conditions d\'exercice). Télémédecine comme complément encadré, jamais un substitut.',
      },
    ],
    impacts: [
      'Accès aux soins amélioré dans tous les quartiers',
      'Prévention renforcée',
      'Attractivité médicale du territoire',
      'Couverture santé élargie pour les habitants modestes',
      'Réduction des inégalités de santé',
    ],
  },
];

@Component({
  selector: 'app-projets',
  templateUrl: './projets.html',
  styleUrl: './projets.scss'
})
export class ProjetsPage {
  protected readonly projets = PROJETS;
  protected projetOuvert: number | null = null;

  toggleProjet(idx: number): void {
    this.projetOuvert = this.projetOuvert === idx ? null : idx;
  }
}
