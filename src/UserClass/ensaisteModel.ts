export class EnsaisteModel{
  firstName:string;
  lastName: string;
  date_naissance: string;
  email: string;
  city: string;
  phone: string;
  photo: string;
  formation: string;
  experience: string;
  zz_recommandations:{
    id_entreprise:string;
    recommandation_text:string;
  }[];
  zz_notifications_recommandations:{
    id_entreprise:string;
    recommandation_text:string;
  }[];
  zz_annonce_stage_enregistre:{
    id:string;
  }[];
  zz_annonce_emploi_enregistre:{
    id:string;
  }[];
  zz_entreprise_enregistree:{
    id:string;
  }[];
  constructor (){
    this.firstName='';
    this.lastName='';
    this.date_naissance='';
    this.email='';
    this.city='';
    this.phone='';
    this.photo='../../assets/imgs/ensaiste.jpg';
    this.formation='';
    this.experience='';
    this.zz_annonce_stage_enregistre= [];
    this.zz_annonce_emploi_enregistre= [];
    this.zz_entreprise_enregistree= [];
    this.zz_recommandations= [];
    this.zz_notifications_recommandations= [];
  }
}
