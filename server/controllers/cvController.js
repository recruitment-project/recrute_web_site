import CV from "../model/cv.model.js";
import User from "../model/User.model.js";
export const getCVById = async (req, res) => {
    try {
       
        const cv = await CV.findOne({user:req.params.id});
        res.send(cv);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveCV = async (req, res) => {
    
    try { const user=await User.findById(req.body.user)
        
        const cv=await CV.findOne({user:req.body.user})
        if(cv){
            
            res.status(400).json({error:"CV est déja crée"})
        }else{
            
       //create cv
        const newcv=req.body
        delete newcv.user
        const cv = new CV(newcv);
        cv.user=user
        const insertedcv = await cv.save();
        // user.cv=cv;
        // user.save()
        res.status(201).json(insertedcv);
    } 
}catch (error) {
        res.status(400).json({message: error.message});
       
    }
}
export const updateCV = async (req, res) => {
   
    try {
        const updatedcv = await CV.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedcv);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}