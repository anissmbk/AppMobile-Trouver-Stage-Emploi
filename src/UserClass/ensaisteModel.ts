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
  competence: string;
  evaluation: string;
  zdebut : string;
  zecole : string;
  zfin : string;
  zz_annonce_enregistre:{
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
    this.photo='';
    this.formation='';
    this.experience='';
    this.competence='';
    this.evaluation='';
    this.zdebut='';
    this.zecole='';
    this.zfin='';
    this.zz_annonce_enregistre= [];
    this.zz_entreprise_enregistree= [];
  }
}
