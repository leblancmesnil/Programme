import { Component } from '@angular/core';

const GLOSSAIRE = [
  { sigle: 'PSE',    signification: 'Plateforme de Suivi des Engagements' },
  { sigle: 'ENQ',    signification: 'Espaces Numériques de Quartier' },
  { sigle: 'PTB',    signification: 'Portail de Transparence Budgétaire et des Marchés Publics' },
  { sigle: 'PIPC',   signification: 'Plateforme d\'Interpellation et de Participation Citoyenne' },
  { sigle: 'RGPI',   signification: 'Registre des Grands Projets et Investissements' },
  { sigle: 'SEAD',   signification: 'Système d\'Évaluation et d\'Aide à la Décision' },
  { sigle: 'PCS',    signification: 'Plan Communal de Sauvegarde' },
  { sigle: 'PCC',    signification: 'Poste de Commandement Communal' },
  { sigle: 'RCSC',   signification: 'Réserve Communale de Sécurité Civile' },
  { sigle: 'DICRIM', signification: 'Document d\'Information Communal sur les Risques Majeurs' },
  { sigle: 'CCAS',   signification: 'Centre Communal d\'Action Sociale' },
  { sigle: 'PLU',    signification: 'Plan Local d\'Urbanisme' },
  { sigle: 'MAM',    signification: 'Maison d\'Assistantes Maternelles' },
  { sigle: 'ESS',    signification: 'Économie Sociale et Solidaire' },
  { sigle: 'CIA',    signification: 'Complément Indemnitaire Annuel' },
  { sigle: 'TEOM',   signification: 'Taxe d\'Enlèvement des Ordures Ménagères' },
  { sigle: 'ZAC',    signification: 'Zone d\'Aménagement Concerté' },
  { sigle: 'OIM',    signification: 'Opération d\'Intérêt Métropolitain' },
];

const BUDGET_INDICATIF = [
  { poste: 'Outils numériques de gouvernance (PSE, ENQ, PTB, PIPC, RGPI, SEAD)', estimation: '500 k€ – 1,5 M€', sources: 'Autofinancement, subventions ANCT (France Numérique Ensemble), partenariats tech', mesures: '1, 3, 5, 201, 203' },
  { poste: 'Rénovation énergétique (logements + écoles)', estimation: '5 – 15 M€', sources: 'ANRU (NPNRU), ADEME (MaPrimeRénov\' collectif), certificats d\'économie d\'énergie, emprunts bonifiés, DSIL', mesures: '21, 87' },
  { poste: 'Maison de santé + cabinets de proximité', estimation: '2 – 5 M€', sources: 'ARS (contrats locaux de santé), DETR, autofinancement', mesures: '44, 47' },
  { poste: 'Sécurité (police municipale, éclairage, vidéoprotection)', estimation: '2 – 4 M€', sources: 'FIPD, autofinancement, dotations État', mesures: '30, 34' },
  { poste: 'Maison de l\'Emploi + incubateur', estimation: '1 – 3 M€', sources: 'Région IDF, FSE+, autofinancement, sponsors privés', mesures: '116' },
  { poste: 'Plan vélo + mobilités douces', estimation: '2 – 5 M€', sources: 'Île-de-France Mobilités, Plan Vélo national (fonds mobilités actives), autofinancement', mesures: '131, 135' },
  { poste: 'ZAC de la Molette (parc, arène, commerces)', estimation: '20 – 50 M€', sources: 'OIM Métropole, aménageur, promoteurs, État, Région IDF', mesures: '29, 148' },
  { poste: 'Campus trilingue', estimation: '10 – 25 M€', sources: 'OIM, État, Région IDF, partenaires éducatifs, mécénat', mesures: '88' },
  { poste: 'Végétalisation + adaptation climatique', estimation: '1 – 3 M€', sources: 'Agences de l\'eau (Seine-Saint-Denis), ADEME, autofinancement', mesures: '179' },
  { poste: 'Actions sociales, culturelles, sportives (fonctionnement annuel)', estimation: '2 – 5 M€/an', sources: 'Budget municipal, subventions CAF/CNAF, conventions DDCS', mesures: '74, 148, 152' },
];

const ANALYSE_RISQUES = [
  { risque: 'Perte des financements OIM campus trilingue', impact: 'Critique', probabilite: 'Moyenne', attenuation: 'Audit immédiat (mois 0), dialogue Métropole/Région, scénario B de reprise.' },
  { risque: 'Retards du Grand Paris Express', impact: 'Modéré', probabilite: 'Moyenne', attenuation: 'Adaptation du calendrier d\'urbanisation autour des gares ; navettes municipales en attendant.' },
  { risque: 'Capacité RH insuffisante en mairie', impact: 'Élevé', probabilite: 'Moyenne', attenuation: 'Audit des compétences dès le mois 1, recrutements ciblés, formation continue (mesure 11).' },
  { risque: 'Contentieux juridiques (régulation commerciale, PLU)', impact: 'Modéré', probabilite: 'Faible', attenuation: 'Validation juridique systématique avant délibération, recours au référé préventif.' },
  { risque: 'Surcoût des grands projets', impact: 'Élevé', probabilite: 'Moyenne', attenuation: 'Marge budgétaire 10-15 %, clauses contractuelles de performance, révision périodique.' },
  { risque: 'Faible participation citoyenne aux outils numériques', impact: 'Modéré', probabilite: 'Moyenne', attenuation: 'Accès multicanal (présentiel + numérique), animation par les maisons de quartier.' },
  { risque: 'Opposition politique au projet', impact: 'Modéré', probabilite: 'Moyenne', attenuation: 'Transparence totale (PSE, bilans publics), concertation continue, résultats mesurables.' },
  { risque: 'Déficits budgétaires hérités', impact: 'Élevé', probabilite: 'Inconnue', attenuation: 'Audit financier immédiat (mesure 208), priorisation des investissements, recherche de financements externes.' },
];

const INDICATEURS_TYPES = [
  'Taux d\'accès aux soins par quartier',
  'Taux d\'emploi local sur marchés publics',
  'Nombre de logements rénovés',
  'Usages PSE / ENQ (visites, contributions)',
  'Taux de vacance commerciale',
  'Bilan sécurité par quartier',
  'Taux de participation aux budgets participatifs',
  'Surface végétalisée ajoutée',
  'Nombre d\'entreprises créées via l\'incubateur',
  'Taux de maîtrise lecture/écriture en fin de CP',
];

const DOCUMENTS_REFERENCE = [
  'Rapports d\'audit (début et mi-mandat)',
  'Cahier des charges ZAC de la Molette',
  'Conventions associatives pluriannuelles',
  'Bilans annuels thématiques (15 bilans par an)',
  'Plan Communal de Sauvegarde',
  'DICRIM',
  'Charte éthique des élus',
  'Charte des promoteurs',
  'Charte de transparence administrative',
];

@Component({
  selector: 'app-glossaire',
  templateUrl: './glossaire.html',
  styleUrl: './glossaire.scss'
})
export class GlossairePage {
  protected readonly glossaire          = GLOSSAIRE;
  protected readonly budgetIndicatif    = BUDGET_INDICATIF;
  protected readonly analyseRisques     = ANALYSE_RISQUES;
  protected readonly indicateursTypes   = INDICATEURS_TYPES;
  protected readonly documentsReference = DOCUMENTS_REFERENCE;

  protected budgetOuvert = false;
  protected risquesOuverts = false;
}
