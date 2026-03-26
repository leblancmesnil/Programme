export interface Profil {
  nom: string;
  description: string;
  mesures: string;
}

export interface MesurePhare {
  id: number;
  titre: string;
  chapitre: string;
}

export interface Mesure {
  id: number;
  titre: string;
  priorite: 'A' | 'B' | 'C';
}

export interface Chapitre {
  id: number;
  titre: string;
  icone: string;
  couleur: string;
  mesuresRange: string;
  vision: string;
  objectifs: string[];
  mesures: Mesure[];
  miseEnOeuvre: string;
}

export interface GrandProjet {
  titre: string;
  icone: string;
  description: string;
  composantes: string[];
  impacts: string;
}

export interface TimelineItem {
  annee: string;
  livrables: string;
}

export interface CentJoursItem {
  jour: string;
  action: string;
}

export interface GlossaireItem {
  sigle: string;
  signification: string;
}

export interface ProgrammeMeta {
  titre: string;
  sousTitre: string;
  datePublication: string;
  version: string;
}

// ── Per-page data interfaces ──

export interface AccueilData {
  meta: ProgrammeMeta;
  vision: string;
  piliers: string[];
  profils: Profil[];
  mesuresPhares: MesurePhare[];
  preuvesMethode: string[];
}

export interface MesuresData {
  chapitres: Chapitre[];
}

export interface TimelineData {
  timeline: TimelineItem[];
}

export interface CentJoursData {
  centJours: CentJoursItem[];
}

export interface ProjetsData {
  grandsProjets: GrandProjet[];
}

export interface GlossaireData {
  glossaire: GlossaireItem[];
}
