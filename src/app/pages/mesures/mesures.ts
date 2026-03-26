import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

const MATRICE_PRIORISATION = [
  { niveau: 'A', label: 'Impact immédiat', definition: 'Faisable rapidement, visible par les habitants, forte valeur symbolique ou structurante.', nombre: '~25 mesures', phase: '0–12 mois' },
  { niveau: 'B', label: 'Structurant', definition: 'Nécessite des dépendances (financements, partenaires, études), effet à moyen terme.', nombre: '~70 mesures', phase: '12–30 mois' },
  { niveau: 'C', label: 'Long terme / conditionnel', definition: 'Opportunités, projets complexes, effets différés.', nombre: '~118 mesures', phase: '30–60 mois' },
];

const PRINCIPE_ABC = 'La classification A/B/C est dynamique. Elle est révisée chaque trimestre par le comité de pilotage et publiée sur la PSE. Un glissement de B vers A est possible si une opportunité de financement se présente ; un glissement de A vers B est transparent et justifié publiquement.';

const FICHES_A: Record<number, { besoin: string; action: string; livrable: string; kpi: string; dependances: string; cout: string }> = {
  1:  { besoin: 'Les habitants n\'ont aucune visibilité sur l\'avancement des promesses de campagne.', action: 'Déployer un tableau Kanban public en ligne pour chacune des 213 mesures. Lancer une consultation : « C\'est quoi une mesure réussie pour vous ? » — co-construction de la Definition of Done avec les habitants.', livrable: 'Plateforme PSE opérationnelle — mois 3.', kpi: '100 % des mesures publiées à M3 ; ≥ 500 visites/mois à M6.', dependances: 'Hébergement, développement (vague 1 MVP numérique).', cout: 'Inclus dans le budget outils numériques.' },
  3:  { besoin: 'Le budget municipal est illisible pour les habitants.', action: 'Publier le budget en version pédagogique + marchés publics en open data.', livrable: 'PTB en ligne — mois 3.', kpi: 'Budget simplifié consulté ≥ 1 000 fois/an ; 100 % des marchés publiés.', dependances: 'Données comptables de la ville.', cout: 'Inclus dans le budget outils numériques.' },
  4:  { besoin: 'Restaurer la confiance dans l\'intégrité des élus.', action: 'Rédiger et faire voter une charte en conseil municipal.', livrable: 'Charte adoptée — mois 2.', kpi: 'Adoption unanime visée ; publication sur le site de la ville.', dependances: 'Aucune.', cout: 'Négligeable (rédaction interne).' },
  13: { besoin: 'Opacité perçue dans l\'attribution des logements sociaux.', action: 'Publier les critères de scoring et les statistiques d\'attribution.', livrable: 'Grille de critères publiée — mois 4.', kpi: 'Réclamations liées à l\'opacité réduites de 50 % en 12 mois.', dependances: 'Coordination bailleurs sociaux.', cout: 'Négligeable.' },
  15: { besoin: 'Parcours administratif fragmenté pour les demandeurs de logement.', action: 'Ouvrir un guichet unique physique + numérique avec référent et suivi personnalisé.', livrable: 'Guichet opérationnel — mois 6.', kpi: 'Délai moyen de traitement < 15 jours ; satisfaction usagers ≥ 70 %.', dependances: 'Locaux, recrutement référent.', cout: 'À définir après audit (fonctionnement annuel).' },
  18: { besoin: 'Absence d\'inventaire exhaustif de l\'état du parc immobilier.', action: 'Commander un audit technique et énergétique du parc dégradé.', livrable: 'Rapport d\'audit livré — mois 9.', kpi: '100 % des immeubles dégradés identifiés et cartographiés.', dependances: 'Prestataire externe, accès bailleurs.', cout: 'À définir après audit.' },
  21: { besoin: 'Charges élevées et passoires thermiques dans les logements.', action: 'Lancer un programme de rénovation (logements sociaux + pavillons). Audit énergétique gratuit des pavillons.', livrable: 'Premiers chantiers lancés — mois 12 ; 200 logements rénovés à M30.', kpi: 'Nombre de logements rénovés/an ; économies d\'énergie moyennes.', dependances: 'Audit (mesure 18), financements ANRU/ADEME.', cout: 'Financements externes majoritaires (ANRU, ADEME, CEE, emprunts bonifiés).' },
  22: { besoin: 'Logements indignes non repérés ni traités.', action: 'Créer une cellule dédiée (agents + juriste) coordonnée avec la préfecture.', livrable: 'Cellule opérationnelle — mois 4.', kpi: 'Nombre de signalements traités ; délai moyen d\'intervention < 30 jours.', dependances: 'Recrutement, coordination préfecture.', cout: 'À définir après audit (fonctionnement annuel).' },
  30: { besoin: 'Présence insuffisante de la police municipale sur le terrain.', action: 'Recruter des agents, déployer l\'îlotage par quartier, renforcer la visibilité quotidienne.', livrable: 'Effectif cible atteint — mois 12.', kpi: 'Heures de présence terrain/semaine ; taux de couverture des quartiers.', dependances: 'Recrutement, formation.', cout: 'À définir après audit (masse salariale + équipement).' },
  31: { besoin: 'Sentiment d\'insécurité dans certains quartiers.', action: 'Déployer des patrouilles visibles couplées à des médiateurs de quartier.', livrable: 'Premières patrouilles opérationnelles — mois 3.', kpi: 'Réduction du nombre d\'incivilités signalées ; satisfaction habitants (enquête annuelle).', dependances: 'Mesure 30 (effectifs police).', cout: 'Inclus dans mesure 30.' },
  34: { besoin: 'Zones sombres générant un sentiment d\'insécurité.', action: 'Diagnostic complet + plan de rénovation de l\'éclairage public.', livrable: 'Diagnostic — mois 6 ; premiers points noirs traités — mois 12.', kpi: 'Nombre de points noirs éliminés ; consommation énergétique éclairage (en baisse).', dependances: 'Diagnostic terrain, budget investissement.', cout: 'À définir après diagnostic.' },
  35: { besoin: 'Mise en danger des enfants aux heures d\'entrée et sortie des écoles.', action: 'Aménagements physiques (barrières, ralentisseurs) + présence d\'agents aux heures de pointe.', livrable: '100 % des écoles sécurisées — mois 12.', kpi: 'Zéro accident aux abords scolaires ; présence agents constatée aux horaires clés.', dependances: 'Diagnostic voirie, coordination Éducation nationale.', cout: 'À définir après diagnostic.' },
  44: { besoin: 'Difficulté d\'accès aux soins de premier recours dans tous les quartiers.', action: 'Identifier les locaux et constituer l\'équipe pluridisciplinaire (médecins, infirmiers, psychologues, sages-femmes…).', livrable: 'Locaux identifiés — mois 6 ; ouverture — mois 18.', kpi: 'Nombre de patients suivis ; délai moyen de rendez-vous < 48h.', dependances: 'ARS, professionnels de santé, locaux.', cout: 'À définir (investissement + fonctionnement, ARS).' },
  47: { besoin: 'Habitants modestes sans couverture complémentaire santé suffisante.', action: 'Négocier un contrat groupe avec un organisme mutualiste.', livrable: 'Mutuelle ouverte aux adhésions — mois 6.', kpi: 'Nombre d\'adhérents ; économies moyennes par ménage.', dependances: 'Négociation prestataire mutualiste.', cout: 'Pilotage municipal ; cotisations portées par les adhérents.' },
  74: { besoin: 'CCAS peu visible et difficilement accessible dans les quartiers.', action: 'Renforcer la présence dans les quartiers (permanences délocalisées, agents de terrain).', livrable: 'Permanences de proximité ouvertes — mois 6.', kpi: 'Nombre de personnes reçues/mois ; taux de non-recours en baisse.', dependances: 'Locaux, agents sociaux.', cout: 'À définir après audit (fonctionnement annuel).' },
  75: { besoin: 'Parcours administratif éclaté entre services (CCAS, CAF, Pôle emploi…).', action: 'Centraliser l\'orientation sociale en un point d\'entrée unique.', livrable: 'Guichet opérationnel — mois 6.', kpi: 'Délai d\'orientation < 5 jours ; satisfaction usagers ≥ 70 %.', dependances: 'Coordination CCAS, CAF, Pôle emploi.', cout: 'Inclus dans mesure 74.' },
  87: { besoin: 'Bâtiments scolaires vétustes et inadaptés aux apprentissages.', action: 'Diagnostic complet des écoles + plan pluriannuel de travaux.', livrable: 'Diagnostic livré — mois 6 ; premiers chantiers — mois 12.', kpi: 'Nombre d\'écoles rénovées/an ; satisfaction enseignants et parents.', dependances: 'Diagnostic technique, financements ANRU/DSIL.', cout: 'Investissement pluriannuel, financements externes.' },
  88: { besoin: 'Projet hérité à sécuriser : financements OIM à vérifier, calendrier à confirmer.', action: 'Audit immédiat de l\'existant + décision Go/No-Go + pilotage scénario A (rentrée 2028) ou B (36 mois de reprise).', livrable: 'Rapport d\'audit — mois 3 ; décision formelle — mois 4.', kpi: 'Audit livré dans les délais ; financements confirmés (oui/non).', dependances: 'Métropole du Grand Paris, Région IDF, État, groupement partenaire.', cout: 'Financements OIM, État, Région, partenaires éducatifs.' },
  101: { besoin: 'Les jeunes les plus engagés n\'ont pas de cadre de valorisation.', action: 'Sélectionner et accompagner une première cohorte de jeunes ambassadeurs (excellence, moralité, fibre sociale). Engagement en retour : service à la ville.', livrable: 'Première cohorte lancée — mois 9.', kpi: 'Nombre de jeunes sélectionnés ; taux de réalisation de leurs projets.', dependances: 'Sélection, partenaires associatifs.', cout: 'À définir.' },
  116: { besoin: 'Pas de lieu central d\'accompagnement à l\'emploi et à la création d\'entreprise.', action: 'Identifier un site (ZI du Coudray), aménager les locaux, recruter l\'équipe.', livrable: 'Ouverture — mois 15.', kpi: 'Nombre de porteurs de projet accompagnés ; taux de création à 12 mois.', dependances: 'Locaux, Région IDF, FSE+, sponsors privés.', cout: 'À définir (Région IDF, FSE+, autofinancement).' },
  121: { besoin: 'Les marchés publics ne profitent pas assez à l\'emploi local.', action: 'Intégrer des clauses d\'insertion dans tous les marchés publics > 100 k€.', livrable: 'Premières clauses intégrées — mois 3.', kpi: '% de marchés avec clauses ; nombre d\'heures d\'insertion réalisées.', dependances: 'Service marchés publics.', cout: 'Négligeable (ingénierie interne).' },
  131: { besoin: 'Coût du transport pèse lourdement sur les familles.', action: 'Mettre en place le remboursement de la carte Imagin\'R pour tous les mineurs.', livrable: 'Dispositif opérationnel — mois 3.', kpi: 'Nombre de bénéficiaires ; taux de couverture estimé.', dependances: 'Île-de-France Mobilités, budget municipal.', cout: 'À définir.' },
  140: { besoin: 'Trottoirs dangereux, plaintes récurrentes des habitants.', action: 'Diagnostic de voirie + plan de rénovation priorisé (abords écoles, quartiers seniors, PMR).', livrable: 'Premiers trottoirs rénovés — mois 9.', kpi: 'Mètres linéaires rénovés/an ; réclamations en baisse.', dependances: 'Diagnostic voirie, budget investissement.', cout: 'À définir après diagnostic.' },
  179: { besoin: 'Déficit de nature en ville et îlots de chaleur dans les quartiers.', action: 'Identifier les sites prioritaires et lancer les premières plantations.', livrable: 'Plan adopté — mois 6 ; premières plantations — mois 9.', kpi: 'm² végétalisés/an ; nombre d\'arbres plantés.', dependances: 'Services techniques, agences de l\'eau.', cout: 'À définir (agences de l\'eau, ADEME, autofinancement).' },
  194: { besoin: 'Obligation légale non remplie ; absence de préparation aux crises.', action: 'Rédiger le Plan Communal de Sauvegarde en alignement avec le dispositif ORSEC départemental.', livrable: 'PCS adopté en conseil municipal — mois 9.', kpi: 'PCS testé par exercice annuel (oui/non) ; délai d\'activation PCC < 2h.', dependances: 'Préfecture, SDIS 93, services municipaux.', cout: 'À définir.' },
  201: { besoin: 'Faible sentiment de prise en compte des habitants dans les décisions locales.', action: 'Allouer une enveloppe dédiée + déployer une plateforme de vote citoyen.', livrable: 'Premier budget participatif voté — mois 12.', kpi: 'Taux de participation ; nombre de projets réalisés.', dependances: 'Plateforme numérique (vague 1).', cout: 'Enveloppe projets à définir.' },
  208: { besoin: 'État réel des finances inconnues après le changement de majorité.', action: 'Commander un audit externe indépendant dès le mois 0.', livrable: 'Rapport d\'audit livré — mois 4 ; publié intégralement.', kpi: 'Rapport publié intégralement ; recommandations suivies à ≥ 80 %.', dependances: 'Cabinet d\'audit externe.', cout: 'À définir.' },
};

const CHAPITRES = [
  {
    id: 1, titre: 'Gouvernance, éthique et exemplarité', icone: '🏛️', couleur: '#1B4965',
    mesuresRange: '1 à 12',
    vision: 'L\'utopie devient crédible lorsqu\'elle est organisée, mesurée et assumée.',
    objectifs: [
      'Rendre l\'action municipale lisible et vérifiable',
      'Instaurer une culture de la responsabilité et de l\'évaluation',
      'Outiller la participation citoyenne sans la dévoyer',
      'Professionnaliser la gouvernance politique et administrative',
      'Répondre durablement à la défiance démocratique',
    ],
    mesures: [
      { id: 1,  titre: 'Suivi public des engagements',                 priorite: 'A' },
      { id: 2,  titre: 'Bilans annuels citoyens par quartier',          priorite: 'B' },
      { id: 3,  titre: 'Transparence budgétaire renforcée',             priorite: 'A' },
      { id: 4,  titre: 'Charte éthique des élus municipaux',            priorite: 'A' },
      { id: 5,  titre: 'Participation citoyenne permanente',            priorite: 'B' },
      { id: 6,  titre: 'Publication transparente des marchés publics',  priorite: 'B' },
      { id: 7,  titre: 'Droit d\'interpellation citoyenne',              priorite: 'B' },
      { id: 8,  titre: 'Conseils municipaux ouverts et compréhensibles',priorite: 'B' },
      { id: 9,  titre: 'Comité citoyen des grands projets',             priorite: 'B' },
      { id: 10, titre: 'Plan pluriannuel d\'investissement transparent', priorite: 'B' },
      { id: 11, titre: 'Formation continue des élus et des cadres',     priorite: 'B' },
      { id: 12, titre: 'Évaluation indépendante à mi-mandat',           priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    enqQuartiers: ['Montgolfier', 'Charles Floquet / Jacques Demolin', 'Place Mozart', 'Docteur Albert Calmette', 'Lavoisier / Pasteur', 'Aulnay / Gambetta', 'Stalingrad', 'Paul Vaillant Couturier', 'Mathilde Émilie', 'Les Quatre Tours', 'Jacques Decour', 'Lénine', 'Abbé Niort / Jean Moulin', 'Guynemer', 'Maurice Audin', 'Corot / Veuve Bouquin', 'Professeur Henri Wallon', 'Jean Duclos', 'Victor Hugo / Maurice Berteaux', 'Coudray Paris Nord', 'Molette'],
    miseEnOeuvre: 'PSE — Tableau Kanban public, co-construction de la Definition of Done avec les habitants. ENQ — 21 espaces de quartier : covoiturage local, petits travaux entre voisins, aide aux devoirs, vigilance de quartier, boîte à idées avec vote pour/contre. Développement open source par une association locale de jeunes, code réutilisable par toutes les communes. PTB — Budget simplifié + détaillé, marchés publics en open data. PIPC — Interpellations déposées, qualifiées, répondues publiquement. RGPI — Avancement, coûts, bénéfices par projet. SEAD — Tableaux de bord, IA, audits externes, vote de confiance annuel. Feuille de route : Phase 1 (PSE, PTB, conseils accessibles) · Phase 2 (PIPC, RGPI, ENQ) · Phase 3 (SEAD, évaluation hybride, ajustements continus).',
  },
  {
    id: 2, titre: 'Logement et urbanisme', icone: '🏠', couleur: '#5FA8D3',
    mesuresRange: '13 à 29',
    vision: 'Un logement dégradé coûte plus cher à la collectivité qu\'un logement bien entretenu. La contrainte mal conçue produit de la pénurie ; l\'incitation intelligente produit de la qualité.',
    objectifs: [
      'Rendre l\'accès au logement lisible, équitable et compréhensible',
      'Ne laisser personne de côté : ni locataire, ni propriétaire',
      'Réduire durablement les charges par la rénovation et l\'entretien',
      'Améliorer la qualité architecturale et urbaine',
      'Réguler le marché par l\'offre et la qualité',
      'Favoriser la mixité sociale et fonctionnelle',
      'Préparer la ville aux transformations urbaines (Grand Paris Express)',
    ],
    principes: ['Transparence', 'Responsabilité partagée', 'Incitation plutôt que contrainte', 'Qualité plutôt que quantité', 'Cohérence urbaine'],
    mesures: [
      { id: 13, titre: 'Transparence des attributions de logements',                          priorite: 'A' },
      { id: 14, titre: 'Commission municipale renforcée du logement',                         priorite: 'B' },
      { id: 15, titre: 'Guichet unique du logement',                                          priorite: 'A' },
      { id: 16, titre: 'Suivi personnalisé des dossiers',                                     priorite: 'B' },
      { id: 17, titre: 'Régulation du marché locatif',                                        priorite: 'B' },
      { id: 18, titre: 'Audit du parc immobilier dégradé',                                    priorite: 'A' },
      { id: 19, titre: 'Audit des constructions massives',                                    priorite: 'B' },
      { id: 20, titre: 'Plan prioritaire des ascenseurs et parties communes',                 priorite: 'B' },
      { id: 21, titre: 'Programme municipal de rénovation énergétique',                       priorite: 'A' },
      { id: 22, titre: 'Cellule de lutte contre l\'habitat indigne',                          priorite: 'A' },
      { id: 23, titre: 'Dispositif de relogement d\'urgence',                                 priorite: 'B' },
      { id: 24, titre: 'Plan grand froid',                                                    priorite: 'B' },
      { id: 25, titre: 'Charte municipale des promoteurs',                                    priorite: 'B' },
      { id: 26, titre: 'Conseil municipal des syndicats de copropriétaires',                  priorite: 'C' },
      { id: 27, titre: 'Révision concertée du Plan Local d\'Urbanisme',                       priorite: 'C' },
      { id: 28, titre: 'Accompagnement des nouvelles stations de métro (Grand Paris Express)',priorite: 'C' },
      { id: 29, titre: 'Dynamisation des places et espaces urbains',                         priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'Accès au logement — Guichet unique (physique + numérique) avec référent et suivi personnalisé, commission renforcée, publication du scoring d\'attribution. Régulation — Pas d\'encadrement rigide ; régulation par l\'offre : garantie locative, sécurisation des propriétaires, stabilité fiscale, rénovation pour réduire les charges. Logements vacants — Agence sociale municipale : remise en état, loyer garanti, mixité sociale. Rénovation — Audit du parc, programme énergétique (logements sociaux + pavillons), audit énergétique gratuit des pavillons, plan ascenseurs/parties communes. Lutte contre la dégradation — Cellule habitat indigne, relogement d\'urgence, plan grand froid. Urbanisme — Charte des promoteurs, révision concertée du PLU, intégration des syndicats de copropriétaires. Anticipation GPE — Deux nouvelles stations de métro en construction ; centralités autour des gares préparées dès maintenant.',
  },
  {
    id: 3, titre: 'Sécurité, prévention et tranquillité publique', icone: '🛡️', couleur: '#E63946',
    mesuresRange: '30 à 43',
    vision: 'Une ville sûre est une ville où chacun se sent membre d\'une même communauté, protégé par des adultes de confiance et responsabilisé dans ses actes.',
    objectifs: [
      'Présence humaine renforcée sur le terrain',
      'Prévention avant répression',
      'Protection totale des victimes',
      'Coordination permanente police municipale / nationale',
      'Transparence via bilans annuels de sécurité',
    ],
    principes: ['Présence humaine avant tout', 'Prévention avant répression', 'Responsabilité collective', 'Protection totale des victimes', 'Coordination permanente'],
    objectifsAssumes: 'Objectifs assumés : zéro incivilité tolérée, zéro drogue acceptée pour nos jeunes. L\'éradication totale est un horizon, pas un point de départ. Nous mesurons la trajectoire : réduction continue des incivilités signalées et traitées, présence terrain en hausse chaque trimestre.',
    mesures: [
      { id: 30, titre: 'Renforcement de la police municipale',                                     priorite: 'A' },
      { id: 31, titre: 'Déploiement des patrouilles de proximité',                                priorite: 'A' },
      { id: 32, titre: 'Formation renforcée à la médiation',                                      priorite: 'B' },
      { id: 33, titre: 'Coordination renforcée avec la police nationale',                         priorite: 'B' },
      { id: 34, titre: 'Plan municipal d\'éclairage public',                                       priorite: 'A' },
      { id: 35, titre: 'Sécurisation des abords scolaires',                                       priorite: 'A' },
      { id: 36, titre: 'Réseau de médiateurs de quartier',                                        priorite: 'B' },
      { id: 37, titre: 'Point municipal d\'écoute et d\'accompagnement',                           priorite: 'B' },
      { id: 38, titre: 'Plan local contre les violences faites aux femmes',                       priorite: 'B' },
      { id: 39, titre: 'Lutte contre les incivilités du quotidien – sécurisation des parkings',   priorite: 'C' },
      { id: 40, titre: 'Sécurisation des halls et parties communes',                              priorite: 'C' },
      { id: 41, titre: 'Prévention du décrochage et de la délinquance',                          priorite: 'C' },
      { id: 42, titre: 'Actions contre les conduites à risque',                                   priorite: 'C' },
      { id: 43, titre: 'Bilan annuel de sécurité',                                                priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'Sécurité de proximité — Police municipale renforcée (îlotage, visibilité quotidienne) couplée à des adultes référents (grands frères, éducateurs, médiateurs) dans l\'espace public. Projet de quartier — Créer un sentiment d\'appartenance fort ; habitants qui se connaissent, responsabilité partagée, fierté locale. Moins d\'anonymat = moins d\'incivilités. Tranquillité — Sécurisation des abords scolaires, halls, parkings, éclairage renforcé, aménagements apaisés. Responsabilisation — Travaux d\'intérêt général pour les jeunes (nettoyage, entretien, aide locale). Prévention jeunesse — Plan local de prévention de la délinquance, médiation anti-rixes, prévention des addictions dès le plus jeune âge. Protection victimes — Lutte renforcée contre les violences faites aux femmes : accueil, protection, orientation, suivi. Coordination — Police nationale + médiateurs + vidéoprotection encadrée, ciblée et évaluée. Transparence — Bilans annuels de sécurité partagés avec les habitants, ajustements continus.',
  },
  {
    id: 4, titre: 'Santé et accès aux soins', icone: '🏥', couleur: '#2A9D8F',
    mesuresRange: '44 à 58',
    vision: 'Une ville en bonne santé prend soin de ses habitants avant que la maladie ne s\'installe.',
    objectifs: [
      'Accès effectif aux soins dans tous les quartiers',
      'Attractivité pour les professionnels de santé',
      'Prévention active et continue',
      'Santé mentale comme priorité publique',
      'Accompagnement des maladies chroniques',
      'Lutte contre les addictions',
      'Soutien aux aidants familiaux',
    ],
    mesures: [
      { id: 44, titre: 'Maison de santé pluridisciplinaire 360',               priorite: 'A' },
      { id: 45, titre: 'Plan municipal d\'attractivité médicale',               priorite: 'B' },
      { id: 46, titre: 'Déploiement de cabinets de proximité',                 priorite: 'C' },
      { id: 47, titre: 'Mutuelle communale',                                    priorite: 'A' },
      { id: 48, titre: 'Accueil structuré des jeunes professionnels de santé', priorite: 'C' },
      { id: 49, titre: 'Partenariats durables avec les hôpitaux et universités',priorite: 'C' },
      { id: 50, titre: 'Déploiement de centres de dépistage mobiles',          priorite: 'C' },
      { id: 51, titre: 'Programme municipal de prévention santé',              priorite: 'B' },
      { id: 52, titre: 'Dispositif local de santé mentale',                    priorite: 'C' },
      { id: 53, titre: 'Parcours d\'accompagnement des maladies chroniques',   priorite: 'C' },
      { id: 54, titre: 'Plan local de lutte contre les addictions',            priorite: 'C' },
      { id: 55, titre: 'Développement encadré de la télémédecine',            priorite: 'C' },
      { id: 56, titre: 'Information claire et continue sur l\'offre de soins', priorite: 'B' },
      { id: 57, titre: 'Soutien structuré aux aidants familiaux',             priorite: 'C' },
      { id: 58, titre: 'Observatoire municipal de la santé',                   priorite: 'B' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'Offre de soins — Maison de santé pluridisciplinaire 360 (médecins, infirmiers, psychologues, sages-femmes) ; cabinets de proximité dans les quartiers ; plan d\'attractivité (locaux adaptés, aide à l\'installation) ; accueil des jeunes professionnels de santé. Accès financier — Mutuelle communale à tarifs négociés ; service municipal dédié pour négocier des contrats groupe assurance/mutuelle. Prévention — Centres de dépistage mobiles ; campagnes vaccination/dépistage ; programme de prévention santé ; sport et activité physique ; alimentation saine. Santé mentale — Dispositif municipal de repérage précoce et d\'orientation ; parcours maladies chroniques coordonné. Addictions — Plan local articulé avec la prévention jeunesse. Télémédecine — Complément encadré, jamais un substitut. Aidants — Reconnaissance officielle, information, prévention de l\'épuisement. Observatoire — Suivi des indicateurs de santé par quartier.',
  },
  {
    id: 5, titre: 'Égalité, lutte contre les discriminations et violences', icone: '⚖️', couleur: '#E9C46A',
    mesuresRange: '59 à 73',
    vision: 'L\'égalité repose sur l\'égalité des droits, des devoirs et du respect — et non sur une discrimination positive qui divise.',
    objectifs: [
      'Égalité femmes-hommes concrète',
      'Lutte contre le harcèlement scolaire et le cyber-harcèlement',
      'Prévention des discriminations',
      'Accompagnement global des victimes',
    ],
    mesures: [
      { id: 59, titre: 'Plan municipal pour l\'égalité femmes-hommes',                    priorite: 'B' },
      { id: 60, titre: 'Cellule municipale de lutte contre les violences faites aux femmes',priorite: 'B' },
      { id: 61, titre: 'Parcours d\'accompagnement global des victimes',                  priorite: 'C' },
      { id: 62, titre: 'Renforcement des lieux d\'accueil sécurisés',                     priorite: 'C' },
      { id: 63, titre: 'Formation des agents municipaux',                                  priorite: 'B' },
      { id: 64, titre: 'Dispositif municipal contre le harcèlement scolaire',             priorite: 'C' },
      { id: 65, titre: 'Lutte contre le cyber-harcèlement',                               priorite: 'C' },
      { id: 66, titre: 'Prévention des discriminations à l\'emploi et au logement',       priorite: 'C' },
      { id: 67, titre: 'Observatoire local des discriminations',                          priorite: 'B' },
      { id: 68, titre: 'Soutien renforcé aux associations spécialisées',                 priorite: 'C' },
      { id: 69, titre: 'Accès prioritaire au logement pour les victimes',                priorite: 'C' },
      { id: 70, titre: 'Campagnes municipales de sensibilisation',                        priorite: 'C' },
      { id: 71, titre: 'Espaces de parole pour les jeunes',                               priorite: 'C' },
      { id: 72, titre: 'Promotion de l\'égalité dans les équipements municipaux',         priorite: 'C' },
      { id: 73, titre: 'Bilan annuel égalité et protection',                              priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'Égalité femmes-hommes — Plan municipal : sensibilisation au respect mutuel, relations équilibrées. Cellule dédiée, parcours global d\'accompagnement, lieux d\'accueil sécurisés, accès prioritaire au logement pour les victimes. Formation systématique des agents municipaux. Harcèlement — Dispositif contre le harcèlement scolaire (quartier par quartier) · Lutte contre le cyber-harcèlement (sensibilisation parents, tolérance zéro). Discriminations — Sensibilisation contre le racisme, l\'antisémitisme, les discriminations religieuses, sociales et territoriales. Observatoire local · Conseils de quartier comme premiers lieux d\'alerte. Soutien — Associations spécialisées conventionnées, espaces de parole pour les jeunes, campagnes municipales. Bilan — Publication annuelle des résultats.',
  },
  {
    id: 6, titre: 'Solidarité, action sociale et famille', icone: '🤝', couleur: '#F4A261',
    mesuresRange: '74 à 85',
    vision: 'Une ville solidaire est une ville où personne n\'est invisible, où l\'aide est accessible sans humiliation.',
    objectifs: [
      'CCAS renforcé et de proximité',
      'Accès simplifié aux droits',
      'Soutien aux familles monoparentales',
      'Lutte contre l\'isolement',
      'Solidarité de proximité en cas de crise',
    ],
    mesures: [
      { id: 74, titre: 'CCAS renforcé et plus proche',                                    priorite: 'A' },
      { id: 75, titre: 'Guichet social unique et orientation rapide',                     priorite: 'A' },
      { id: 76, titre: 'Tarification sociale plus juste',                                 priorite: 'B' },
      { id: 77, titre: 'Plan municipal de lutte contre la précarité énergétique',         priorite: 'C' },
      { id: 78, titre: 'Accès renforcé à l\'aide alimentaire et aux droits',              priorite: 'B' },
      { id: 79, titre: 'Soutien aux familles monoparentales',                             priorite: 'C' },
      { id: 80, titre: 'Dispositif municipal de lutte contre l\'isolement',              priorite: 'C' },
      { id: 81, titre: 'Soutien aux aidants',                                             priorite: 'B' },
      { id: 82, titre: 'Accès facilité aux services pour les personnes en difficulté',   priorite: 'C' },
      { id: 83, titre: 'Plan municipal « Enfance et familles »',                          priorite: 'C' },
      { id: 84, titre: 'Solidarité de proximité en cas de crise',                         priorite: 'C' },
      { id: 85, titre: 'Bilan annuel de l\'action sociale',                               priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'CCAS renforcé — Présence dans les quartiers, accueil humain, guichet social unique, simplification de l\'accès aux droits. Pouvoir d\'achat — Tarification sociale ; aide alimentaire renforcée ; achats groupés hebdomadaires de produits essentiels via le service cantine (prix sous le marché, sans grande distribution, produits sains). Lutte contre le gaspillage alimentaire. Lutte contre la précarité énergétique. Familles — Soutien aux familles monoparentales · Plan « Enfance et familles » · Soutien à la parentalité. Lutte contre l\'isolement — Vie de quartier inclusive, entraide intergénérationnelle (jeunes aidant les personnes âgées). Aidants — Reconnaissance, information, prévention de l\'épuisement. Accès aux services — Navettes sur réservation, facilitation des démarches. Solidarité de proximité — Réseaux d\'alerte pour canicule/grand froid/urgences.',
  },
  {
    id: 7, titre: 'Enfance et éducation', icone: '📚', couleur: '#264653',
    mesuresRange: '86 à 100',
    vision: 'Chaque enfant doit maîtriser les savoirs fondamentaux le plus tôt possible, et chaque talent doit pouvoir atteindre l\'excellence.',
    objectifs: [
      'Maîtrise de la lecture, de l\'écriture et du calcul pour tous',
      'Lutte contre le décrochage scolaire dès le plus jeune âge',
      'Continuité éducative école / périscolaire / quartier',
      'Détection et accompagnement des potentiels vers l\'excellence',
      'Réduction des inégalités éducatives',
      'Respect mutuel élèves / familles / enseignants',
      'Environnement scolaire sain et structurant',
    ],
    mesures: [
      { id: 86,  titre: 'Maisons d\'assistantes maternelles (MAM)',    priorite: 'C' },
      { id: 87,  titre: 'Plan global de rénovation des écoles',         priorite: 'A' },
      { id: 88,  titre: 'Campus trilingue (audit + trajectoire)',       priorite: 'A' },
      { id: 89,  titre: 'Équipement numérique équitable',              priorite: 'B' },
      { id: 90,  titre: 'Restauration scolaire',                        priorite: 'B' },
      { id: 91,  titre: 'Accompagnement éducatif de proximité',        priorite: 'C' },
      { id: 92,  titre: 'Renforcement du périscolaire',                priorite: 'C' },
      { id: 93,  titre: 'Ouverture des centres de loisirs le samedi',  priorite: 'C' },
      { id: 94,  titre: 'Lutte contre le décrochage scolaire',         priorite: 'C' },
      { id: 95,  titre: 'Réouverture de « La Barre-de-Monts »',        priorite: 'C' },
      { id: 96,  titre: 'Soutien à la parentalité',                    priorite: 'C' },
      { id: 97,  titre: 'Prévention des inégalités éducatives',        priorite: 'C' },
      { id: 98,  titre: 'Promotion de la lecture et de la culture',    priorite: 'C' },
      { id: 99,  titre: 'Participation des élèves à la vie scolaire',  priorite: 'C' },
      { id: 100, titre: 'Bilan annuel éducatif',                       priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'MAM — Maisons d\'assistantes maternelles pour renforcer l\'offre petite enfance. Rénovation — Plan global : bâtiments sûrs, calmes, adaptés aux apprentissages. Équipement numérique équitable. Fondamentaux — Méthodes structurées (type Kumon) dès la maternelle : lecture, écriture, calcul. Objectif : tous les enfants savent lire, écrire et compter en fin de CP. Rattrapage via périscolaire et maisons de quartier. Continuité — À l\'entrée en 6ème : lecture fluide, raisonnement numérique, aisance avec les mots et la logique. Excellence — Détection des 5 % d\'élèves à fort potentiel : calcul mental, éloquence, débats, initiation finance/géopolitique. Tenue scolaire — Sensibiliser les élèves à investir plutôt qu\'à dépenser dans les marques. Achats groupés organisés par la ville (tenues simples, résistantes, peu coûteuses). Cantine — Qualité des repas améliorée, tarification adaptée, gratuite pour les plus vulnérables. Diversité et qualité, apprentissage de la bonne alimentation. Alliance éducative — Le respect des enseignants est indispensable. Parents et école sont co-éducateurs.',
  },
  {
    id: 8, titre: 'Jeunesse, insertion et émancipation', icone: '🚀', couleur: '#E76F51',
    mesuresRange: '101 à 115',
    vision: 'Aucun jeune ne doit être laissé sans perspective. Zéro jeune contraint à la délinquance faute d\'alternative.',
    objectifs: [
      'Programme d\'excellence « Les Ambassadeurs »',
      'Accompagnement personnalisé 16-25 ans',
      'Mentorat et insertion par l\'utilité locale',
      'Éducation financière dès le plus jeune âge',
      'Engagement citoyen et projets portés par les jeunes',
    ],
    mesures: [
      { id: 101, titre: 'Programme « Les Ambassadeurs »',                   priorite: 'A' },
      { id: 102, titre: 'Plan mentorat',                                     priorite: 'C' },
      { id: 103, titre: 'Conseil municipal des jeunes',                      priorite: 'B' },
      { id: 104, titre: 'Accompagnement individualisé des 16-25 ans',       priorite: 'B' },
      { id: 105, titre: 'Espaces jeunesse de proximité',                     priorite: 'C' },
      { id: 106, titre: 'Soutien aux projets portés par les jeunes',         priorite: 'C' },
      { id: 107, titre: 'Accès facilité au logement des jeunes',            priorite: 'C' },
      { id: 108, titre: 'Aide à la mobilité des jeunes',                     priorite: 'C' },
      { id: 109, titre: 'Prévention des ruptures de parcours',              priorite: 'C' },
      { id: 110, titre: 'Promotion de l\'engagement citoyen',               priorite: 'C' },
      { id: 111, titre: 'Développement du volontariat local',               priorite: 'C' },
      { id: 112, titre: 'Soutien à l\'entrepreneuriat jeune',               priorite: 'C' },
      { id: 113, titre: 'Lutte contre les discriminations à l\'insertion',  priorite: 'C' },
      { id: 114, titre: 'Information renforcée sur les droits des jeunes',  priorite: 'C' },
      { id: 115, titre: 'Bilan annuel jeunesse et insertion',               priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'Les Ambassadeurs — Programme d\'excellence et de transmission pour les jeunes les plus engagés. Critères de sélection : excellence, moralité, fibre sociale. Engagement en retour : service à la ville. Orientation et compétences — Accompagnement personnalisé 16-25 ans, sensibilisation à l\'IA, parcours d\'insertion par l\'utilité locale (électricité, bâtiment, vente, services municipaux). Mentorat — Suivi individualisé, accompagnement renforcé pour les profils prometteurs. Autonomie — Accès emploi, formation, alternance. Soutien logement, mobilité, démarches. Engagement citoyen — Conseil municipal des jeunes, projets de quartier, volontariat local. Éducation financière — Dès le plus jeune âge, apprendre à investir dans l\'éducation, les compétences et le patrimoine. Partenariats avec des courtiers. Page « investissement » dans le mensuel municipal. Prévention — Accompagnement des jeunes en rupture, coordination des acteurs, solutions concrètes.',
  },
  {
    id: 9, titre: 'Emploi, entrepreneuriat et commerce local', icone: '💼', couleur: '#606C38',
    mesuresRange: '116 à 130',
    vision: 'Créer de la valeur localement et permettre aux habitants de créer eux-mêmes leur emploi.',
    objectifs: [
      'Maison de l\'Emploi avec coworking et incubateur',
      'Clauses d\'insertion dans les marchés publics',
      'Lutte contre la vacance commerciale',
      'Soutien à l\'entrepreneuriat et à l\'ESS',
    ],
    mesures: [
      { id: 116, titre: 'Maison de l\'emploi et de l\'entrepreneuriat',     priorite: 'A' },
      { id: 117, titre: 'Salles municipales pour les entrepreneurs / coworking',priorite: 'C' },
      { id: 118, titre: 'Fonds municipal de soutien à la création',        priorite: 'C' },
      { id: 119, titre: 'Incubateur de projets locaux',                    priorite: 'C' },
      { id: 120, titre: 'Plateforme locale de recrutement',                priorite: 'B' },
      { id: 121, titre: 'Clauses d\'insertion dans les marchés publics',   priorite: 'A' },
      { id: 122, titre: 'Accompagnement des reconversions professionnelles',priorite: 'C' },
      { id: 123, titre: 'Concours de création d\'entreprise',              priorite: 'C' },
      { id: 124, titre: 'Lutte contre la vacance commerciale',             priorite: 'C' },
      { id: 125, titre: 'Animation commerciale territoriale',              priorite: 'C' },
      { id: 126, titre: 'Politique d\'achats responsables',                priorite: 'C' },
      { id: 127, titre: 'Soutien à l\'économie sociale et solidaire',      priorite: 'C' },
      { id: 128, titre: 'Développement de l\'apprentissage local',        priorite: 'C' },
      { id: 129, titre: 'Forums emploi et entrepreneuriat annuels',       priorite: 'C' },
      { id: 130, titre: 'Observatoire local de l\'emploi',                priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'Maison de l\'Emploi — Lieu central, sélectif et ambitieux : accompagnement ciblé, coworking, incubateur de startups, fonds municipal d\'amorçage. Sponsors et partenaires de haut niveau. Localisation : ZI du Coudray pour faciliter les partenariats avec les entreprises locales. Emploi local — Accompagnement individualisé, clauses d\'insertion dans tous les marchés publics > 100 k€, plateforme locale de recrutement, partenariats entreprises (stages, alternance, emplois). Commerce de proximité — Baux à loyers réduits sécurisés par la mairie, rénovation de locaux, animation commerciale. Objectif : commerces essentiels à moins de 10 min à pied. Entrepreneuriat — Concours de création d\'entreprise, reconversions professionnelles, ESS, forums annuels, développement de l\'apprentissage. Observatoire — Suivi de l\'emploi local et de la vacance commerciale.',
  },
  {
    id: 10, titre: 'Mobilités et transports', icone: '🚌', couleur: '#457B9D',
    mesuresRange: '131 à 143',
    vision: 'Une ville où l\'on peut se déplacer en sécurité, quel que soit son âge, son quartier ou son mode de transport.',
    objectifs: [
      'Gratuité des transports pour les mineurs',
      'Trottoirs praticables partout',
      'Plan vélo municipal',
      'Accessibilité universelle',
      'Navettes municipales de proximité',
    ],
    mesures: [
      { id: 131, titre: 'Gratuité des transports pour les mineurs (remboursement Imagin\'R)',priorite: 'A' },
      { id: 132, titre: 'Aide à la mobilité pour les publics fragiles',                    priorite: 'B' },
      { id: 133, titre: 'Négociation pour l\'amélioration de l\'offre de transport',       priorite: 'C' },
      { id: 134, titre: 'Sécurisation des arrêts et pôles d\'échange',                    priorite: 'C' },
      { id: 135, titre: 'Plan municipal vélo',                                             priorite: 'C' },
      { id: 136, titre: 'Stationnements vélos et trottinettes sécurisés',                 priorite: 'C' },
      { id: 137, titre: 'Aide à l\'achat de vélos et vélos électriques',                  priorite: 'C' },
      { id: 138, titre: 'Plan de circulation concerté',                                    priorite: 'C' },
      { id: 139, titre: 'Gestion intelligente du stationnement municipal',                priorite: 'C' },
      { id: 140, titre: 'Rénovation des trottoirs et des voiries dégradées',             priorite: 'A' },
      { id: 141, titre: 'Navettes municipales de proximité',                              priorite: 'C' },
      { id: 142, titre: 'Accessibilité universelle des transports',                       priorite: 'C' },
      { id: 143, titre: 'Bilan annuel des mobilités',                                     priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'Solidarité — Gratuité des transports pour les mineurs (remboursement Imagin\'R), aide à la mobilité pour les publics fragiles. Objectif : un passe Navigo annuel pour chaque habitant (Améthyste, carte jeune, Imagin\'R…) avec coups de pouce financiers ciblés. Sécurité — Trottoirs praticables partout, suppression des points noirs, sécurisation prioritaire des abords des écoles, sécurisation des arrêts et pôles d\'échange. Mobilités douces — Plan vélo (pistes continues, stationnements sécurisés, aide à l\'achat), marche et trottinette. Stationnement — Règles claires, zéro voiture sur les trottoirs. Voitures partagées — Dispositif de voitures collectives par quartier (sous-location entre voisins). Carburant — Cartographie en temps réel des prix à la pompe. Transports en commun — Négociation avec Île-de-France Mobilités, navettes municipales de proximité. Inciter à valider systématiquement pour adapter les lignes aux besoins réels. Nuisances — Zones piétonnes en centres de quartier et abords de parcs.',
  },
  {
    id: 11, titre: 'Culture, sport et vie associative', icone: '🎭', couleur: '#9B5DE5',
    mesuresRange: '144 à 161',
    vision: 'Placer les associations au cœur de la ville, faire de la culture et du sport des biens communs accessibles à tous.',
    objectifs: [
      'Maison des Associations renforcée',
      'Subventions simplifiées et transparentes',
      'Programmation culturelle de proximité',
      'Pass\'Sport & Culture',
      'Valorisation du bénévolat',
    ],
    mesures: [
      { id: 144, titre: 'Maison des associations renforcée',                                        priorite: 'B' },
      { id: 145, titre: 'Simplification et transparence des subventions',                           priorite: 'B' },
      { id: 146, titre: 'Conventions pluriannuelles de partenariat',                                priorite: 'C' },
      { id: 147, titre: 'Fonds municipal pour l\'innovation associative',                           priorite: 'C' },
      { id: 148, titre: 'Programmation culturelle de proximité',                                    priorite: 'C' },
      { id: 149, titre: 'Festival culturel et cinématographique',                                   priorite: 'C' },
      { id: 150, titre: 'Soutien aux pratiques artistiques amateurs',                              priorite: 'C' },
      { id: 151, titre: 'Plan de rénovation des équipements culturels – Bibliobus 2.0',            priorite: 'C' },
      { id: 152, titre: 'Plan municipal du sport et de la culture pour tous – Pass\'Sport & Culture',priorite: 'C' },
      { id: 153, titre: 'Plan « Savoir nager »',                                                    priorite: 'C' },
      { id: 154, titre: 'Rénovation, entretien et création d\'équipements sportifs',               priorite: 'C' },
      { id: 155, titre: 'Tarification sociale des activités sportives et culturelles',              priorite: 'C' },
      { id: 156, titre: 'Bus de la mobilité',                                                       priorite: 'C' },
      { id: 157, titre: 'Développement du sport-santé',                                             priorite: 'C' },
      { id: 158, titre: 'Valorisation du bénévolat',                                               priorite: 'C' },
      { id: 159, titre: 'Blanc-Mesnil Plage',                                                       priorite: 'C' },
      { id: 160, titre: 'Épiceries sociales et solidaires',                                        priorite: 'C' },
      { id: 161, titre: 'Bilan annuel culture, sport et vie associative',                          priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'Maison des Associations — Lieu central, accompagnement administratif/logistique, mise en réseau. Engagement associatif comme levier d\'inclusion. Financement — Subventions simplifiées et transparentes, conventions pluriannuelles, fonds d\'innovation associative. Accompagnement vers l\'autonomie financière. Culture — Programmation de proximité, soutien aux pratiques amateurs, rénovation des équipements (Bibliobus 2.0). Festival culturel et cinématographique annuel. Cinéma en plein air gratuit à l\'arène, abonnements cinéma négociés pour les jeunes. L\'activité culturelle doit devenir un standard. Sport — Pass\'Sport & Culture (tarification sociale), plan « Savoir nager », rénovation/création d\'équipements sportifs, sport-santé. Excellence sportive — Détection des talents, accompagnement renforcé (sportif + scolaire), engagement en retour (valeurs, transmission, mentorat). Bénévolat — Reconnaissance officielle, parcours citoyen pour les jeunes. Toute personne le pouvant contribue à la ville via le bénévolat (associations, vie de quartier). Animation — Blanc-Mesnil Plage, épiceries sociales et solidaires.',
  },
  {
    id: 12, titre: 'Seniors, handicap et intergénérationnel', icone: '👴', couleur: '#F15BB5',
    mesuresRange: '162 à 176',
    vision: 'Ne pas séparer les âges ni les fragilités, mais organiser la proximité, l\'autonomie et l\'entraide au cœur des quartiers.',
    objectifs: [
      'Maisons de quartier intergénérationnelles',
      'Lutte contre l\'isolement des seniors',
      'Maintien à domicile soutenu',
      'Plan « Ville inclusive » pour le handicap',
      'Fracture numérique comblée',
    ],
    mesures: [
      { id: 162, titre: 'Maison des seniors',                                                         priorite: 'B' },
      { id: 163, titre: 'Activités seniors accessibles et tarification adaptée',                     priorite: 'C' },
      { id: 164, titre: 'Renforcement des liens intergénérationnels',                                priorite: 'C' },
      { id: 165, titre: 'Programme municipal de lutte contre l\'isolement',                          priorite: 'C' },
      { id: 166, titre: 'Soutien au maintien à domicile',                                            priorite: 'C' },
      { id: 167, titre: 'Accessibilité renforcée des bâtiments municipaux',                         priorite: 'C' },
      { id: 168, titre: 'Plan « Ville inclusive » pour les personnes en situation de handicap',      priorite: 'C' },
      { id: 169, titre: 'Référent municipal handicap',                                               priorite: 'B' },
      { id: 170, titre: 'Accès prioritaire aux équipements et services',                            priorite: 'C' },
      { id: 171, titre: 'Soutien aux aidants de personnes dépendantes',                             priorite: 'C' },
      { id: 172, titre: 'Développement de l\'habitat adapté',                                        priorite: 'C' },
      { id: 173, titre: 'Projets intergénérationnels structurés',                                   priorite: 'C' },
      { id: 174, titre: 'Lutte contre la fracture numérique des seniors',                           priorite: 'C' },
      { id: 175, titre: 'Participation des seniors à la vie locale',                               priorite: 'C' },
      { id: 176, titre: 'Bilan annuel autonomie et inclusion',                                      priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'Maisons intergénérationnelles — Privilégiées aux structures exclusivement seniors. Activités partagées (culture, sport-santé, ateliers pratiques). Transmission de savoirs entre générations. Lutte contre l\'isolement — Navettes municipales sur réservation, services de livraison (courses, médicaments). Personne ne renonce par manque de mobilité. Maintien à domicile — Soutien renforcé, adaptation du logement, coordination services sociaux/médicaux. Ville inclusive — Plan municipal d\'accessibilité 100 % bâtiments municipaux, référent handicap, accès prioritaire aux équipements. Aidants — Reconnaissance, information, solutions de répit. Fracture numérique — Accompagnement humain en mairie, bibliothèque, maisons de quartier. Intergénérationnel — Projets communs de quartier, transmission de savoirs entre générations.',
  },
  {
    id: 13, titre: 'Écologie, cadre de vie et protection animale', icone: '🌿', couleur: '#00BBF9',
    mesuresRange: '177 à 193',
    vision: 'Faire de l\'écologie un projet de qualité de vie, fondé sur la propreté, la proximité, la responsabilité et le respect du vivant.',
    objectifs: [
      'Plan de végétalisation ambitieux',
      'Propreté par quartier avec objectifs mesurables',
      'Économie circulaire et circuits courts',
      'Adaptation climatique',
      'Protection animale intégrée',
    ],
    mesures: [
      { id: 177, titre: 'Développement des jardins partagés de quartier',  priorite: 'C' },
      { id: 178, titre: 'Soutien aux collectifs de jardiniers urbains',    priorite: 'C' },
      { id: 179, titre: 'Plan municipal de végétalisation',                priorite: 'A' },
      { id: 180, titre: 'Préservation des espaces verts existants',        priorite: 'C' },
      { id: 181, titre: 'Écoles et équipements écoresponsables',           priorite: 'C' },
      { id: 182, titre: 'Ferme pédagogique',                              priorite: 'C' },
      { id: 183, titre: 'Sensibilisation à la transition écologique',      priorite: 'C' },
      { id: 184, titre: 'Lutte contre les nuisances environnementales',    priorite: 'C' },
      { id: 185, titre: 'Gestion responsable de l\'eau',                   priorite: 'C' },
      { id: 186, titre: 'Mobilisation citoyenne pour la propreté',         priorite: 'B' },
      { id: 187, titre: 'Développement de l\'économie circulaire',        priorite: 'C' },
      { id: 188, titre: 'Plan municipal d\'adaptation climatique',         priorite: 'C' },
      { id: 189, titre: 'Promotion des circuits courts alimentaires',      priorite: 'C' },
      { id: 190, titre: 'Observatoire local de l\'environnement',         priorite: 'C' },
      { id: 191, titre: 'Bilan annuel écologique',                        priorite: 'C' },
      { id: 192, titre: 'Bien-être animal',                               priorite: 'C' },
      { id: 193, titre: 'Protection animale',                             priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'Végétalisation — Jardins partagés, soutien aux jardiniers urbains, plan de végétalisation, préservation des espaces verts, îlots de fraîcheur. Propreté — Objectifs par quartier, incitation financière collective (réduction de la TEOM conditionnée). Lutte contre les dépôts sauvages. Économie circulaire — Ateliers « apprendre à réparer », espaces d\'échange/dons/réemploi. Favoriser l\'échange et la revente de meubles et équipements dans les quartiers (brocantes de quartier, plateforme locale). Adaptation climatique — Désimperméabilisation, gestion de l\'eau, intégration systématique dans les projets urbains. Écoles et équipements écoresponsables. Ferme pédagogique. Mobilités actives — Incitation à la marche pour les trajets scolaires, priorité à la marche, au vélo et à la trottinette. Sensibilisation — Écogestes, circuits courts alimentaires. Observatoire — Suivi environnemental par quartier. Protection animale — Bien-être animal intégré, lutte contre l\'abandon et la maltraitance.',
  },
  {
    id: 14, titre: 'Prévention des risques, résilience et gestion de crise', icone: '⚠️', couleur: '#FEE440',
    mesuresRange: '194 à 200',
    vision: 'Une ville résiliente est une ville préparée, organisée et capable de protéger ses habitants sans improvisation.',
    objectifs: [
      'PCS actualisé et testé annuellement',
      'PCC activable en moins de 2h',
      'Réserve communale de citoyens volontaires',
      'Plans canicule et grand froid renforcés',
      'DICRIM distribué à chaque foyer',
    ],
    mesures: [
      { id: 194, titre: 'Création d\'un Plan Communal de Sauvegarde (PCS)',              priorite: 'A' },
      { id: 195, titre: 'Création d\'un Poste de Commandement Communal (PCC)',           priorite: 'B' },
      { id: 196, titre: 'Plan canicule et grand froid renforcé',                        priorite: 'B' },
      { id: 197, titre: 'Création d\'une Réserve Communale de Sécurité Civile (RCSC)', priorite: 'C' },
      { id: 198, titre: 'Plan de continuité des services publics',                      priorite: 'C' },
      { id: 199, titre: 'Formation des élus et agents à la gestion de crise',           priorite: 'C' },
      { id: 200, titre: 'Rédaction d\'un DICRIM',                                       priorite: 'B' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'PCS — Plan communal de sauvegarde actualisé (risques climatiques, sanitaires, industriels, sociaux), aligné sur le dispositif ORSEC départemental, interopérable avec les plans du SDIS 93 et de l\'État. Document vivant, testé régulièrement. PCC — Poste de commandement communal activable immédiatement, chaîne de décision claire. Exercice de déclenchement au moins une fois par an (objectif : activation < 2h). Réserve communale — Citoyens volontaires formés, exercices réguliers, RETEX systématique après chaque exercice ou crise réelle. Aléas climatiques — Plans canicule et grand froid renforcés, repérage des personnes vulnérables. Continuité — Plan de continuité des services publics essentiels (eau, aide sociale, sécurité, information). Alerte — DICRIM distribué à chaque foyer, mis à jour annuellement (cadre légal articles L. 125-2 et R. 125-11 du Code de l\'environnement) ; dispositifs d\'alerte rapide, notifications ciblées par quartier. Coordination — Convention avec SDIS 93 et préfecture. RETEX — Systématique après chaque crise, publiés, alimentent la mise à jour du PCS.',
  },
  {
    id: 15, titre: 'Démocratie locale, finances et transparence', icone: '🗳️', couleur: '#00F5D4',
    mesuresRange: '201 à 213',
    vision: 'La confiance publique se construit par la transparence, la participation et l\'évaluation, pas par les discours.',
    objectifs: [
      'Budgets participatifs avec enveloppe dédiée',
      'Conseils de quartier dotés de moyens réels',
      'Plateforme numérique de participation',
      'Audits financiers indépendants',
      'Rapport de fin de mandat public',
    ],
    mesures: [
      { id: 201, titre: 'Budgets participatifs renforcés',             priorite: 'A' },
      { id: 202, titre: 'Conseils de quartier dotés de moyens réels',  priorite: 'B' },
      { id: 203, titre: 'Plateforme numérique de participation',       priorite: 'B' },
      { id: 204, titre: 'Consultations citoyennes régulières',         priorite: 'C' },
      { id: 205, titre: 'Maîtrise durable des dépenses',               priorite: 'C' },
      { id: 206, titre: 'Recherche active de financements externes',   priorite: 'C' },
      { id: 207, titre: 'Priorité à l\'investissement utile',          priorite: 'C' },
      { id: 208, titre: 'Audit financier de début et mi-mandat',       priorite: 'A' },
      { id: 209, titre: 'Lutte contre le gaspillage public',           priorite: 'C' },
      { id: 210, titre: 'Charte de transparence administrative',       priorite: 'B' },
      { id: 211, titre: 'Évaluation permanente des politiques',        priorite: 'C' },
      { id: 212, titre: 'Prime CIA',                                   priorite: 'C' },
      { id: 213, titre: 'Rapport de fin de mandat public',             priorite: 'C' },
    ] as { id: number; titre: string; priorite: string }[],
    miseEnOeuvre: 'Budgets participatifs — Plateforme en ligne : dépôt, instruction, suivi, vote citoyen transparent. Conseils de quartier — Renforcés et dotés de moyens. Fonctionnement hybride (numérique + présentiel, réunions trimestrielles minimum). Plateforme citoyenne — Système d\'information démocratique central : participation, interpellations, budgets participatifs, suivi des engagements. Finances — Budget publié en version pédagogique, audits indépendants (début + mi-mandat), suivi des recommandations. Maîtrise des dépenses, recherche active de financements externes, priorité à l\'investissement utile. Évaluation — Suivi public et régulier, indicateurs accessibles, évaluation permanente des politiques publiques. Rapports — Rapport de mi-mandat et rapport de fin de mandat publics, détaillés et argumentés. Formation — Élus formés à la gestion financière, à la participation citoyenne et à l\'évaluation. Prime CIA — Mise en place de la prime de complément indemnitaire annuel.'
  },
];

@Component({
  selector: 'app-mesures',
  imports: [FormsModule],
  templateUrl: './mesures.html',
  styleUrl: './mesures.scss'
})
export class MesuresPage {
  protected searchText = '';
  protected chapitreOuvert: number | null = null;
  protected ficheOuverte: number | null = null;

  protected readonly allChapitres    = CHAPITRES;
  protected readonly matricePrio     = MATRICE_PRIORISATION;
  protected readonly principeAbc     = PRINCIPE_ABC;
  protected readonly filtreTexte     = signal('');
  protected readonly filtreChapitre  = signal<number | null>(null);
  protected readonly filtrePriorite  = signal<string | null>(null);

  protected readonly chapitresFiltres = computed(() => {
    const texte  = this.filtreTexte().toLowerCase();
    const chapId = this.filtreChapitre();
    const prio   = this.filtrePriorite();
    let chapitres = CHAPITRES;

    if (chapId) {
      chapitres = chapitres.filter(ch => ch.id === chapId);
    }

    if (texte || prio) {
      chapitres = chapitres
        .map(ch => ({
          ...ch,
          mesures: ch.mesures.filter(m => {
            const matchTexte = !texte || m.titre.toLowerCase().includes(texte) || m.id.toString().includes(texte);
            const matchPrio  = !prio  || m.priorite === prio;
            return matchTexte && matchPrio;
          })
        }))
        .filter(ch => ch.mesures.length > 0);
    }

    return chapitres;
  });

  toggleChapitre(id: number): void {
    this.chapitreOuvert = this.chapitreOuvert === id ? null : id;
    this.ficheOuverte = null;
  }

  toggleFiche(mesureId: number): void {
    this.ficheOuverte = this.ficheOuverte === mesureId ? null : mesureId;
  }

  getFiche(mesureId: number) {
    return FICHES_A[mesureId] ?? null;
  }

  onSearch(value: string): void {
    this.filtreTexte.set(value);
  }

  onFiltreChapitre(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.filtreChapitre.set(val ? Number(val) : null);
  }

  onFiltrePriorite(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.filtrePriorite.set(val || null);
  }

  resetFiltres(): void {
    this.searchText = '';
    this.filtreTexte.set('');
    this.filtreChapitre.set(null);
    this.filtrePriorite.set(null);
  }

  getPrioriteClass(p: string): string {
    return 'badge priorite-' + p.toLowerCase();
  }
}

