import { Component } from '@angular/core';

const TIMELINE = [
  {
    annee: 'Année 1',
    livrables: 'PSE en ligne · Budget pédagogique publié · Audit financier · Charte éthique adoptée · Premières patrouilles · Guichet unique logement · Mutuelle communale · Imagin\'R opérationnel · PCS adopté · Plan de végétalisation · Premier budget participatif',
  },
  {
    annee: 'Année 2',
    livrables: 'Ouverture Maison de l\'Emploi (coworking, incubateur) · Premières maisons de santé · Pistes cyclables prioritaires · ZAC : phase conception lancée · Campus trilingue : poursuite chantier (scénario A) ou relance des marchés (scénario B) · Conventions pluriannuelles associations · Festival culturel 1ère édition · Conseil municipal des jeunes actif',
  },
  {
    annee: 'Année 3',
    livrables: 'Travaux ZAC (parc, arène) · Campus trilingue : ouverture rentrée 2028 (scénario A) ou construction en cours (scénario B) · Montée en charge dispositifs d\'insertion · Bilans intermédiaires · Navettes municipales déployées · Plan « Savoir nager » opérationnel · Ferme pédagogique ouverte · Réserve communale de sécurité civile opérationnelle',
  },
  {
    annee: 'Année 4',
    livrables: 'Livraison premiers équipements ZAC · Inauguration campus trilingue (phase 1) · Maison des Associations des Tilleuls · Extension végétalisation et îlots de fraîcheur · Évaluation mi-mandat publique · Audit financier mi-mandat',
  },
  {
    annee: 'Année 5',
    livrables: 'Finalisation grands projets · Livraison équipements restants campus trilingue · Rapport de fin de mandat · Transmission des bilans · Pérennisation des dispositifs',
  },
];

const FRISE_ANNEE_1 = [
  {
    trimestre: 'Trimestre 1 — Mois 0–3',
    actions: [
      'Charte éthique adoptée (J1)',
      'Audit financier commandé (J7)',
      'Critères logement publiés (J15)',
      'PSE en ligne — 213 mesures visibles (J30)',
      'PTB publié — budget pédagogique (J30)',
      'Premières patrouilles de proximité (J30)',
      'Clauses d\'insertion activées (J45)',
      'Imagin\'R opérationnel (J60)',
      'Cellule habitat indigne activée (J60)',
      'Audit campus trilingue lancé (J75)',
    ],
  },
  {
    trimestre: 'Trimestre 2 — Mois 3–6',
    actions: [
      'Guichet unique logement ouvert',
      'Guichet social unique ouvert',
      'Mutuelle communale lancée',
      'Diagnostic éclairage public livré',
      'Locaux maison de santé identifiés',
      'Plan végétalisation adopté',
      'Observatoire municipal de la santé créé',
      'Formation agents médiation',
      'PIPC + RGPI en ligne (vague 2)',
      'Plan rénovation écoles — diagnostic lancé',
    ],
  },
  {
    trimestre: 'Trimestre 3 — Mois 6–9',
    actions: [
      'Audit immobilier dégradé livré',
      'PCS adopté en conseil municipal',
      'PCC opérationnel',
      'DICRIM distribué à chaque foyer',
      'Premières plantations lansées',
      'Premiers trottoirs rénovés',
      'Conseil municipal des jeunes installé',
      'Accompagnement 16-25 ans lancé',
      'Plan vélo — diagnostic terminé',
    ],
  },
  {
    trimestre: 'Trimestre 4 — Mois 9–12',
    actions: [
      'Premiers chantiers rénovation scolaire',
      'Effectif police municipale cible atteint',
      'Abords scolaires 100 % sécurisés',
      'Programme Ambassadeurs — 1ère cohorte lancée',
      '1er budget participatif voté par les habitants',
      'Audit début mandat publié intégralement',
      'Bilan annuel de sécurité publié',
      'ENQ + SEAD en ligne (vague 3)',
      'Premières rénovations énergétiques',
    ],
  },
];

const CAMPUS_TRILINGUE = {
  contexte: 'Le campus trilingue (français, anglais, chinois) s\'inscrit dans une Opération d\'Intérêt Métropolitain (OIM) lancée sous le mandat précédent. Le projet était financé et programmé pour une ouverture à la rentrée 2028. Le changement de majorité municipale impose un état des lieux immédiat. Le projet veillera à préserver le soutien opérationnel et financier du groupement actuellement en charge du dossier.',
  prioritesMois03: [
    'Audit de l\'existant — Réaliser un état des lieux complet : avancement des études, engagements contractuels, marchés signés, autorisations obtenues.',
    'Vérification des financements — Confirmer la pérennité des sources de financement (État, Région, Métropole du Grand Paris, partenaires privés). Identifier les financements conditionnés au maintien du projet.',
    'Décision Go/No-Go — Sur la base de l\'audit, confirmer la poursuite du projet tel quel, l\'adapter ou le réorienter. Rapport d\'audit livré à mois 3 ; décision formelle à mois 4.',
  ],
  scenarioA: {
    titre: 'Scénario A — Continuité',
    condition: 'Financements confirmés, projet suffisamment avancé',
    actions: [
      'Maintenir l\'objectif rentrée 2028.',
      'Reprendre le pilotage avec un comité de suivi mensuel.',
      'Adapter le programme pédagogique si nécessaire.',
    ],
  },
  scenarioB: {
    titre: 'Scénario B — Reprise',
    condition: 'Financements à resécuriser après le changement de majorité',
    phases: [
      { phase: 'Audit et resécurisation', periode: 'Mois 0–6', actions: 'État des lieux, renégociation des financements, programme technique actualisé, concertation locale.' },
      { phase: 'Autorisations et marchés', periode: 'Mois 6–18', actions: 'Obtention/renouvellement des autorisations, préparation du site, lancement des marchés (recours partiel à la préfabrication).' },
      { phase: 'Construction', periode: 'Mois 18–28', actions: 'Gros œuvre, second œuvre, équipements techniques — phasage contrôlé.' },
      { phase: 'Finitions', periode: 'Mois 28–33', actions: 'Équipements pédagogiques, raccordements, contrôles techniques.' },
      { phase: 'Ouverture', periode: 'Mois 33–36', actions: 'Tests pédagogiques, recrutement et formation des équipes, réception et ouverture progressive.' },
    ],
    risques: 'Perte de financements métropolitains · Délais d\'autorisation · Découvertes techniques sur site.',
    attenuation: 'Dialogue immédiat avec la Métropole et la Région · Phasage des marchés · Clauses contractuelles de performance · Marge budgétaire pour aléas.',
  },
  recommandation: 'Engager l\'audit dès le mois 0, viser le scénario A (rentrée 2028), et basculer sur le scénario B (36 mois de reprise) uniquement si l\'audit révèle des blocages.',
};

const INDICATEURS_SUIVI = [
  { domaine: 'Gouvernance', indicateurs: 'Nombre de mesures livrées / en cours / bloquées sur la PSE ; taux de participation aux ENQ', cible: '≥ 80 % des mesures livrées ou en cours ; ≥ 30 % habitants connectés aux ENQ' },
  { domaine: 'Logement', indicateurs: 'Nombre de logements rénovés ; délai moyen de traitement au guichet unique ; taux de vacance', cible: '200+ logements rénovés ; délai < 15 jours ; vacance en baisse' },
  { domaine: 'Sécurité', indicateurs: 'Nombre d\'incivilités signalées/traitées ; taux de présence terrain ; bilan annuel', cible: 'Incivilités traitées/signalées ≥ 80 % ; présence terrain doublée' },
  { domaine: 'Santé', indicateurs: 'Taux d\'accès aux soins par quartier ; délai moyen de rendez-vous ; adhérents mutuelle', cible: 'Délai moyen < 48h ; ≥ 2 000 adhérents mutuelle' },
  { domaine: 'Égalité', indicateurs: 'Nombre de signalements traités ; victimes accompagnées ; bilan annuel', cible: '100 % signalements traités < 30 jours' },
  { domaine: 'Solidarité', indicateurs: 'Taux de non-recours aux aides ; familles suivies par le CCAS', cible: 'Non-recours réduit de 30 %' },
  { domaine: 'Éducation', indicateurs: 'Taux de maîtrise lecture/écriture fin CP ; taux de décrochage ; satisfaction périscolaire', cible: '≥ 90 % maîtrise lecture fin CP ; décrochage en baisse' },
  { domaine: 'Jeunesse', indicateurs: 'Jeunes accompagnés 16-25 ans ; taux d\'insertion à 12 mois', cible: '≥ 500 jeunes/an ; insertion ≥ 60 %' },
  { domaine: 'Emploi', indicateurs: 'Entreprises créées via incubateur ; taux emploi local marchés ; vacance commerciale', cible: '50+ entreprises créées ; emploi local ≥ 15 % ; vacance en baisse' },
  { domaine: 'Mobilité', indicateurs: 'Km pistes cyclables créées ; trottoirs rénovés ; fréquentation navettes', cible: '10+ km pistes cyclables ; 50 % trottoirs prioritaires rénovés' },
  { domaine: 'Culture / Sport', indicateurs: 'Associations conventionnées ; Pass\'Sport distribués ; fréquentation festival', cible: '≥ 100 conventions ; ≥ 3 000 Pass distribués' },
  { domaine: 'Seniors', indicateurs: 'Seniors isolés repérés/suivis ; accessibilité des bâtiments', cible: '100 % bâtiments municipaux accessibles' },
  { domaine: 'Écologie', indicateurs: 'Surface végétalisée ; volume déchets/habitant ; indice de propreté', cible: '+5 000 m² végétalisés ; déchets/hab en baisse' },
  { domaine: 'Risques', indicateurs: 'PCS testé (oui/non) ; volontaires RCSC ; délai activation PCC', cible: 'PCS testé annuellement ; ≥ 50 volontaires ; PCC < 2h' },
  { domaine: 'Finances', indicateurs: 'Participation budgets participatifs ; résultat audits ; financements externes', cible: 'Participation ≥ 10 % habitants ; comptes sains en fin de mandat' },
  { domaine: 'Pouvoir d\'achat', indicateurs: 'Foyers en achats groupés ; économies réalisées ; couverture Navigo', cible: '≥ 1 000 foyers en achats groupés ; couverture Navigo ≥ 80 % mineurs' },
];

const MARQUEURS_CREDIBILITE = 'Audit financier publié, PSE consultable, premiers guichets ouverts, patrouilles visibles, PCS opérationnel, campus trilingue — décision formelle prise.';

const PHASES_DETAIL = [
  {
    phase: 'Phase 1 — Socle de confiance',
    periode: 'Mois 0 à 12',
    objectif: 'Poser les fondations de la confiance, lancer les diagnostics, ouvrir les guichets et les outils de transparence.',
    domaines: [
      { domaine: 'Gouvernance et transparence', mesures: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11', actions: 'Lancer la PSE, programmer les bilans annuels, publier le budget pédagogique ; adopter la charte éthique ; activer PIPC (droit d\'interpellation) ; PTB (marchés publics en ligne) ; constituer le comité citoyen des grands projets ; publier le plan d\'investissement ; lancer la formation des élus et cadres.' },
      { domaine: 'Logement et urbanisme', mesures: '13, 14, 15, 16, 18, 19, 22, 23, 24, 25', actions: 'Publier les critères d\'attribution, installer la commission renforcée, ouvrir le guichet unique avec suivi personnalisé ; lancer les audits du parc dégradé et des constructions massives ; activer la cellule habitat indigne, préparer le relogement d\'urgence, actualiser le plan grand froid ; rédiger la charte des promoteurs.' },
      { domaine: 'Sécurité et prévention', mesures: '30, 31, 32, 33, 34, 35, 38', actions: 'Recruter et renforcer la police municipale ; déployer les premières patrouilles de proximité ; former les agents à la médiation ; formaliser la coordination avec la police nationale ; lancer le diagnostic éclairage ; sécuriser les abords scolaires ; élaborer le plan contre les violences faites aux femmes.' },
      { domaine: 'Santé', mesures: '44, 45, 47, 51, 56, 58', actions: 'Identifier les locaux pour la maison de santé ; lancer le plan d\'attractivité médicale ; négocier et lancer la mutuelle communale ; démarrer la prévention santé ; déployer l\'information sur l\'offre de soins ; créer l\'observatoire municipal de la santé.' },
      { domaine: 'Égalité et protection', mesures: '59, 60, 63, 67', actions: 'Adopter le plan pour l\'égalité femmes-hommes ; activer la cellule contre les violences ; lancer la formation des agents municipaux ; créer l\'observatoire local des discriminations.' },
      { domaine: 'Solidarité et action sociale', mesures: '74, 75, 76, 78, 81', actions: 'Renforcer le CCAS ; ouvrir le guichet social unique ; réviser la tarification sociale ; renforcer l\'aide alimentaire ; structurer le soutien aux aidants.' },
      { domaine: 'Éducation', mesures: '87, 89, 90', actions: 'Lancer le diagnostic et le plan de rénovation des écoles ; auditer l\'équipement numérique ; améliorer la restauration scolaire (cahier des charges qualité).' },
      { domaine: 'Jeunesse', mesures: '103, 104', actions: 'Installer le conseil municipal des jeunes ; démarrer l\'accompagnement 16-25 ans.' },
      { domaine: 'Emploi', mesures: '116, 120, 121', actions: 'Préparer l\'ouverture de la Maison de l\'Emploi ; lancer la plateforme locale de recrutement ; intégrer les clauses d\'insertion dans les premiers marchés publics.' },
      { domaine: 'Mobilité', mesures: '131, 132, 140', actions: 'Rembourser Imagin\'R pour les mineurs ; activer l\'aide à la mobilité ; lancer la rénovation des trottoirs les plus dégradés.' },
      { domaine: 'Culture, sport et associations', mesures: '144, 145', actions: 'Renforcer la Maison des Associations ; simplifier les procédures de subventions.' },
      { domaine: 'Seniors et handicap', mesures: '162, 169', actions: 'Ouvrir la Maison des Seniors ; nommer le référent municipal handicap.' },
      { domaine: 'Écologie', mesures: '179, 186', actions: 'Lancer le plan de végétalisation ; organiser les premières opérations de mobilisation citoyenne pour la propreté.' },
      { domaine: 'Risques et résilience', mesures: '194, 195, 196, 200', actions: 'Rédiger le PCS ; créer le PCC ; actualiser les plans canicule/grand froid ; rédiger et distribuer le DICRIM.' },
      { domaine: 'Démocratie et finances', mesures: '201, 202, 203, 208, 210', actions: 'Lancer les budgets participatifs ; doter les conseils de quartier de moyens ; déployer la plateforme numérique ; commander l\'audit financier ; adopter la charte de transparence administrative.' },
    ],
  },
  {
    phase: 'Phase 2 — Déploiement',
    periode: 'Mois 12 à 30',
    objectif: 'Ouvrir les équipements majeurs, monter en charge les dispositifs, lancer les premiers grands projets.',
    domaines: [
      { domaine: 'Gouvernance', mesures: '9, 11, 12', actions: 'Réunir le comité citoyen sur les grands projets en cours ; poursuivre la formation (2ᵉ cycle) ; préparer l\'évaluation indépendante de mi-mandat.' },
      { domaine: 'Logement et urbanisme', mesures: '17, 20, 21, 26, 27, 28, 29', actions: 'Régulation du marché locatif ; plan ascenseurs/parties communes ; rénovation énergétique ; conseil des syndicats ; révision PLU ; accompagner les stations Grand Paris Express ; dynamiser les places urbaines.' },
      { domaine: 'Sécurité', mesures: '36, 37, 39, 40, 41, 42, 43', actions: 'Réseau de médiateurs de quartier ; point d\'écoute ; lutte contre incivilités (parkings, halls) ; programmes de prévention décrochage/délinquance et conduites à risque ; premier bilan annuel de sécurité.' },
      { domaine: 'Santé', mesures: '44, 46, 48, 49, 50, 52, 53, 54, 55, 57', actions: 'Ouvrir la maison de santé ; cabinets de proximité ; accueil jeunes professionnels ; partenariats hôpitaux/universités ; dépistage mobile ; santé mentale ; parcours maladies chroniques ; addictions ; télémédecine ; soutien aidants.' },
      { domaine: 'Égalité', mesures: '61, 62, 64, 65, 66, 68, 69, 70, 71, 72', actions: 'Parcours victimes ; lieux d\'accueil sécurisés ; dispositifs anti-harcèlement scolaire/cyber ; prévention discriminations emploi/logement ; campagnes de sensibilisation ; espaces de parole.' },
      { domaine: 'Solidarité', mesures: '77, 79, 80, 82, 83, 84', actions: 'Plan précarité énergétique ; soutien familles monoparentales ; lutte contre l\'isolement ; accès aux services ; plan « Enfance et familles » ; solidarité de proximité (canicule/grand froid).' },
      { domaine: 'Éducation', mesures: '86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99', actions: 'Premières MAM ; chantiers rénovation scolaire ; avancer le dossier campus trilingue ; équipement numérique ; accompagnement de proximité ; périscolaire renforcé ; centres de loisirs le samedi ; anti-décrochage ; La Barre-de-Monts ; parentalité ; prévention inégalités ; lecture/culture ; participation des élèves.' },
      { domaine: 'Jeunesse', mesures: '101, 102, 105–114', actions: 'Programme Les Ambassadeurs + mentorat ; espaces jeunesse ; projets portés par les jeunes ; accès logement/mobilité ; prévention ruptures ; engagement citoyen ; volontariat ; entrepreneuriat jeune ; discriminations à l\'insertion ; droits des jeunes.' },
      { domaine: 'Emploi', mesures: '116–130', actions: 'Maison de l\'Emploi avec coworking et incubateur ; fonds de création ; reconversions ; concours entreprise ; vacance commerciale ; animation commerciale ; achats responsables ; ESS ; apprentissage ; forums ; observatoire emploi.' },
      { domaine: 'Mobilité', mesures: '133–142', actions: 'Négociation Île-de-France Mobilités ; sécurisation arrêts ; plan vélo (pistes cyclables, stationnements, aide à l\'achat) ; plan de circulation ; stationnement intelligent ; navettes municipales ; accessibilité universelle.' },
      { domaine: 'Culture, sport et associations', mesures: '146–160', actions: 'Conventions pluriannuelles ; fonds d\'innovation associative ; programmation culturelle ; festival ; pratiques amateurs ; Bibliobus 2.0 ; Pass\'Sport & Culture ; Savoir nager ; équipements sportifs ; tarification sociale ; bus de mobilité ; sport-santé ; bénévolat ; Blanc-Mesnil Plage ; épiceries solidaires.' },
      { domaine: 'Seniors et handicap', mesures: '163–175', actions: 'Activités seniors ; liens intergénérationnels ; anti-isolement ; maintien à domicile ; accessibilité bâtiments ; Ville inclusive ; accès prioritaire ; aidants ; habitat adapté ; projets intergénérationnels ; fracture numérique ; participation seniors.' },
      { domaine: 'Écologie', mesures: '177, 178, 180–190, 192, 193', actions: 'Jardins partagés ; jardiniers urbains ; espaces verts ; écoles écoresponsables ; ferme pédagogique ; sensibilisation ; nuisances ; gestion de l\'eau ; économie circulaire ; adaptation climatique ; circuits courts ; observatoire environnement ; bien-être et protection animale.' },
      { domaine: 'Risques', mesures: '197, 198, 199', actions: 'Recruter la réserve communale ; plan de continuité des services publics ; former élus et agents à la gestion de crise.' },
      { domaine: 'Démocratie et finances', mesures: '204, 205, 206, 207, 209', actions: 'Consultations citoyennes ; maîtrise des dépenses ; recherche financements externes ; investissement utile ; suppression des gaspillages.' },
    ],
  },
  {
    phase: 'Phase 3 — Montée en puissance et évaluation',
    periode: 'Mois 30 à 60',
    objectif: 'Livrer les grands projets, évaluer les résultats, ajuster et pérenniser les dispositifs.',
    domaines: [
      { domaine: 'Évaluation transversale', mesures: '12, 43, 73, 85, 100, 115, 130, 143, 161, 176, 191, 211, 213', actions: 'Évaluation indépendante à mi-mandat ; bilans annuels thématiques (sécurité, égalité, action sociale, éducation, jeunesse, emploi, mobilités, culture/sport, seniors/handicap, écologie) ; évaluation permanente des politiques ; rapport de fin de mandat.' },
      { domaine: 'Livraison grands projets', mesures: '29, 88, 116–119, 144, 148, 149', actions: 'ZAC de la Molette (parc, arène, campus) · Quartier des Tilleuls (rénovation, Maison des Associations) · Maison de l\'Emploi (plein régime) · Plan santé (maisons de santé opérationnelles, télémédecine).' },
      { domaine: 'Pérennisation', mesures: '208, 212, toutes', actions: 'Audit financier de mi-mandat ; ajuster la prime CIA ; passer les dispositifs pilotes en mode permanent ; transmettre les bilans au prochain mandat.' },
    ],
  },
];

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss'
})
export class TimelinePage {
  protected readonly timeline          = TIMELINE;
  protected readonly friseAnnee1       = FRISE_ANNEE_1;
  protected readonly marqueursCred     = MARQUEURS_CREDIBILITE;
  protected readonly phasesDetail      = PHASES_DETAIL;
  protected readonly campusTrilingue   = CAMPUS_TRILINGUE;
  protected readonly indicateursSuivi  = INDICATEURS_SUIVI;

  protected friseOuverte = false;
  protected phasesOuvertes = false;
  protected campusOuvert = false;
  protected indicateursOuverts = false;
}
