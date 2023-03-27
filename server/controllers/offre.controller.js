

import ENV from '../config.js';
import Offres, { OffreSchema } from '../model/offre.model.js';


/** POST: http://localhost:8080/api/stepper 
 * @param: {
    Entreprisname:"jumia",
    Offrename:"developpeur",
    ITdomain:"informatique",
    City:"tunisi",
    MiniDescription:"aa a a a a a a a a a a a a a a a a a a",
    DescriptionDetail:"aaaaaaaa aaaaaa zzzzzz zzzzzzzzzz zzzzee eeeeeee eeeeeee rrrrrrr rrrrrrrr ttttt ttt tt y yyyyyy y y",
}
*/
export async function AddOffre(req,res){
   const {Entreprisname, Offrename,ITdomain,City, MiniDescription, DescriptionDetail }=req.body;
   if(!Entreprisname|| !Offrename||!ITdomain||!City||   !MiniDescription|| !DescriptionDetail ){
    res.status(404).send("plz fill the data");
   }
   
    try{
     const addoffre=new Offres({
         Entreprisname, Offrename,ITdomain,City, MiniDescription, DescriptionDetail
     });
     await addoffre.save();
     res.status(201).json()
     console.log(addoffre);
     }
    catch(error){
     res.status(404).send(error)
     }
  }

