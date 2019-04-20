export class AnnonceEmploiModel{
  titre:string;
  ville: string;
  contexte_mission: string;
  categorie: string;
  a_partir_de: string;
  publiee_le: string;//
  id_entreprise: string;//
  profil_recherche: string;
  poste_propose: string;
  type_contrat: string;
  niveau_experience: string;
  niveau_etude: string;
  langues_exigees: string;
  nbr_poste_proposes: string;
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
    this.poste_propose= '';
    this.type_contrat= '';
    this.categorie = '';
    this.niveau_etude= '';
    this.niveau_experience= '';
    this.a_partir_de = '';
    this.publiee_le = '';
    this.langues_exigees= '';
    this.id_entreprise = '';
    this.profil_recherche = '';
    this.nbr_poste_proposes= '';
    this.z_commentaires = [{
      id_commentaire:'',
      id_ensaiste:'',
      commentaire_text:'',
      disponibilite:''
    }];
  }
}
