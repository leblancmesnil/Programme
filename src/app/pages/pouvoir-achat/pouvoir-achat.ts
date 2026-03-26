import { Component } from '@angular/core';

const POUVOIR_ACHAT = [
  { poste: 'Loyer / crédit immobilier', levier: 'Réduction des charges par la rénovation ; stabilité fiscale ; négociation de crédits avantageux avec les banques locales (domiciliation en échange)', mesures: '17, 21' },
  { poste: 'Charges (gaz, électricité, eau)', levier: 'Rénovation énergétique ; incitation à une consommation sobre ; trajets intra-ville en transport ou à pied', mesures: '21, 77, 188' },
  { poste: 'Entretien logement', levier: 'Audit énergétique gratuit des pavillons ; mobilisation des bailleurs et syndicats ; récupération des logements vacants via une agence sociale', mesures: '18, 21, 22' },
  { poste: 'Alimentation', levier: 'Achats groupés via le service cantine (prix en dessous du marché, sans grande distribution) ; promotion d\'une alimentation saine', mesures: '78, 90, 189' },
  { poste: 'Restauration / cantine', levier: 'Cantine gratuite pour les plus vulnérables ; food court à la Molette ; stands de restauration aux festivals', mesures: '90, 148, 155' },
  { poste: 'Carburant', levier: 'Cartographie des prix à la pompe sur le site de la ville ; mise en avant des stations les plus attractives', mesures: '138' },
  { poste: 'Voiture', levier: 'Ville accessible sans voiture ; dispositif de voitures partagées par quartier (sous-location entre voisins)', mesures: '135, 141' },
  { poste: 'Transports en commun', levier: 'Objectif : un passe Navigo annuel pour chaque habitant (Améthyste, carte jeune, Imagin\'R…) ; coups de pouce financiers ; incitation à valider systématiquement', mesures: '131, 132, 133' },
  { poste: 'Assurance / mutuelle', levier: 'Négociation de tarifs de groupe par un service municipal dédié ; contrats standardisés pour les Blanc-Mesnilois', mesures: '47' },
  { poste: 'Services financiers', levier: 'Éducation financière dès le plus jeune âge ; partenariat avec des courtiers ; page « investissement » dans le mensuel municipal', mesures: '201' },
  { poste: 'Habillement', levier: 'Tenues scolaires simples, résistantes, achats groupés par la ville ; sensibilisation à l\'investissement plutôt qu\'aux marques', mesures: '97' },
  { poste: 'Équipement / meubles', levier: 'Espaces d\'échange et de revente au sein des quartiers ; économie circulaire locale', mesures: '187' },
  { poste: 'Vacances / loisirs', levier: 'Activités culturelles et sportives abondantes ; cinéma en plein air gratuit à l\'arène ; abonnements cinéma pour les jeunes', mesures: '148, 149, 152, 159' },
  { poste: 'Bénévolat / vie communautaire', levier: 'Contribution citoyenne via bénévolat ; vie communautaire par quartier ; événements fédérateurs (arène, place de l\'Eau, Tilleuls)', mesures: '144, 158' },
];

const CADRE_COMPETENCES = [
  { levier: 'Commande publique', direct: 'Cantine scolaire (qualité, tarifs, achats groupés) · Marchés publics avec clauses sociales', partenaires: '—', impossible: 'Fixer les prix alimentaires du marché' },
  { levier: 'Négociation collective', direct: 'Mutuelle communale · Contrats groupe assurance', partenaires: 'Courtiers immobiliers, banques · Opérateurs énergie', impossible: 'Imposer des tarifs aux entreprises privées' },
  { levier: 'Mise en relation', direct: 'Plateforme d\'échange local (meubles, vêtements) · Cartographie carburant', partenaires: 'Partenariat grande distribution · Centrale d\'achat inter-communale', impossible: 'Se substituer aux acteurs commerciaux' },
  { levier: 'Information / incitation', direct: 'Éducation financière · Sensibilisation alimentation saine · Tenues scolaires', partenaires: 'Associations de consommateurs · ADIL (logement)', impossible: 'Réguler les prix hors compétence communale' },
  { levier: 'Aménagement', direct: 'Transports gratuits mineurs · Navettes · Zones piétonnes', partenaires: 'Île-de-France Mobilités · RATP/SNCF', impossible: 'Modifier la politique tarifaire ÎdFM' },
];

@Component({
  selector: 'app-pouvoir-achat',
  templateUrl: './pouvoir-achat.html',
  styleUrl: './pouvoir-achat.scss',
})
export class PouvoirAchatPage {
  protected readonly pouvoirAchat      = POUVOIR_ACHAT;
  protected readonly cadreCompetences  = CADRE_COMPETENCES;
}
