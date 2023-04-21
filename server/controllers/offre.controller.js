import Offres from "../model/offre.model.js";
import User from "../model/User.model.js";
export const getOffre = async (req, res) => {
    try {
        const offre = await Offres.find();
        res.json(offre);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
export const getOffreById = async (req, res) => {
    try {
        const offre = await Offres.findById(req.params.id);
        res.json(offre);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export const getOffreByUser=async(req,res)=>{
    const Id=req.params.userId
    const user = await User.findById(Id).populate('offre_cree')
    res.status(200).json(user.offre_cree)

}
export const saveOffre = async (req, res) => {
    
    try { const user=await User.findById(req.body.user_cre)
        
        const offre=await Offres.findOne({MiniDescription:req.body.MiniDescription})
        if(offre){
            
            res.status(400).json({error:"offre est existe"})
        }else{
            
       //create offre
        const newoffre=req.body
        delete newoffre.user_cre
        const offre = new Offres(newoffre);
        offre.user_cre=user
        const insertedoffre = await offre.save();
        //add offre to user
        user.offre_cree.push(offre._id)
        user.save()
        res.status(201).json(insertedoffre);
    } 
}catch (error) {
        res.status(400).json({message: error.message});
       
    }
}
export const updateOffre = async (req, res) => {
   
    try {
        const updatedoffre = await Offres.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedoffre);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const deleteOffre = async (req, res) => {
    try {const Id=req.params.id
        const offre=await Offres.findById(Id)
        if(!offre){
            return res.status(400).json({error:"offre don't existe"})
        }
        const Iduser_cre=offre.user_cre
        const user_cre=await User.findById(Iduser_cre)
        
        await offre.remove()
        user_cre.offre_cree.pull(offre)
        user_cre.save()
        
        res.status(200).json({success:true})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
export const getQuestionByOffre = async (req, res) => {
    try {
        const offre = await Offres.findById(req.params.id);
        res.json(offre.questions);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}