export class AnnonceStageModel{
  titre:string;
  ville: string;
  contexte_mission: string;
  type_stage: string;
  remuneration: string;
  categorie: string;
  duree_stage: string;
  a_partir_de: string;
  publiee_le: string;
  stagiaire_demande: string;
  id_entreprise: string;
  profil_recherche: string;
  z_commentaires:{
    id_commentaire:string;
    id_ensaiste:string;
    commentaire_text:string;
    disponibilite:string;
  }[];


  constructor() {
    this.titre = '';
    this.ville = '';
    this.contexte_mission = '';
    this.type_stage = '';
    this.remuneration = '';
    this.categorie = '';
    this.duree_stage = '';
    this.a_partir_de = '';
    this.publiee_le = '';
    this.stagiaire_demande = '';
    this.id_entreprise = '';
    this.profil_recherche = '';
    this.z_commentaires = [{
      id_commentaire:'',
      id_ensaiste:'',
      commentaire_text:'',
      disponibilite:''
    }];
  }
}
