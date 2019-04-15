export class EntrepriseModel{
  entrepriseName: string;
  secteurActivite: string;
  email: string;
  city: string;
  phone: string;
  photo: string;
  description: string;
  zz_candidats_enregistree:{
    id:string;
  }[];
  constructor (){
    this.entrepriseName='';
    this.secteurActivite='';
    this.email='';
    this.city='';
    this.phone='';
    this.photo='';
    this.description='';
    this.zz_candidats_enregistree= [];
  }
}
