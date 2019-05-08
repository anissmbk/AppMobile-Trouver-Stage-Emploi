export class DiscussionModel{

  publiee_le: string;
  id_ensaiste: string;
  nbr_like:number;
  nbr_comment:number;
  sujet_text:string;
  z_commentaires:{
    id_ensaiste:string;
    commentaire_text:string;
  }[];
  constructor(){
    this.nbr_comment=0;
    this.nbr_like=0;
    this.sujet_text='';
    this.id_ensaiste='';
    this.publiee_le='';
    this.z_commentaires=[{
      id_ensaiste:'',
      commentaire_text:''
    }];
  }
}
