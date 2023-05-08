import Postule from "../model/postule.model.js";
import Offre from "../model/offre.model.js";
import User from "../model/User.model.js";

export const getPostules = async (req, res) => {
    try {
        const PostuleList = await Postule.find();
        res.send(PostuleList);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
export const getPostuleById = async (req, res) => {
    try {
        const postule = await Postule.findById(req.params.id);
        res.json(postule);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export const Addpostule = async (req, res) => {
    
    try { 
        const user=await User.findById(req.body.user)
        const offre=await Offre.findById(req.body.offre)
        const Postuleuser=await Postule.findOne({user:req.body.user,offre:req.body.offre})
        
        if(Postuleuser){
            
            res.status(400).json({error:"Vous avez déjà postulé à ce poste"})
        }else{
            
       //create postule
        const newpostule=req.body
        delete newpostule.user
        delete newpostule.offre
        const postule = new Postule(newpostule);
        postule.user=user
        postule.offre=offre
        const insertedpostule = await postule.save();
        user.offre_participee.push(offre._id)
  user.save()
  offre.user_participee.push(user._id)
  offre.save()
        res.status(201).json(insertedpostule);
    } 
}catch (error) {
        res.status(400).json({message: error.message});
       
    }
}
export const ajoutScore = async (req, res) => {
   
    try {
        
        
        const Id=req.params.id
        const IDuser=req.body.idUser
        const postule=await Postule.findOne({offre:Id,user:IDuser})
        
        postule.score=req.body.score+"/"+req.body.questions.length
        
        
           // newtache.employee_realiser=employee
        
        
        const result=await Postule.findByIdAndUpdate(postule._id,postule)
        // employee.tache_realiser.push(result)
        // employee.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}