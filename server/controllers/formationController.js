import Formation from "../model/formation.model.js";
import User from "../model/User.model.js";
export const getFormations = async (req, res) => {
    try {
        const formationsList = await Formation.find();
        res.send(formationsList);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
export const getFormationById = async (req, res) => {
    try {
        const formation = await Formation.findById(req.params.id);
        res.json(formation);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export const getFormationByUser=async(req,res)=>{
    const Id=req.params.userId
    const user=await User.findById(Id).populate('formation_cree')
    res.status(200).json(user.formation_cree, user.firstName,  user.lastName, user.profile)

}
export const saveFormation = async (req, res) => {
    
    try { const user=await User.findById(req.body.user_cree)
        
        const formation=await Formation.findOne({title:req.body.title})
        if(formation){
            
            res.status(400).json({error:"Formation est existe"})
        }else{
            
       //create formation
        const newformation=req.body
        delete newformation.user_cree
        const formation = new Formation(newformation);
        formation.user_cree=user
        const insertedformation = await formation.save();
        //add formation to user
        user.formation_cree.push(formation._id)
        user.save()
        res.status(201).json(insertedformation);
    } 
}catch (error) {
        res.status(400).json({message: error.message});
       
    }
}
export const SaveparticipationFormation = async (req,res) => {
    try{
        const user=await User.findById(req.body.participant);
        const formation = await Formation.findById(req.body.formation_participee);
        const exist=await User.findOne({formation_participee:req.body.formation_participee});
        const existF=await Formation.findOne({participant:req.body.participant})
        if(exist ){
            res.status(400).json({error:"formation est existé"})
        }else if(existF) {
            res.status(400).json({error:"utilisateur est existé"})
        }else {
            formation.participant.push(user._id);
            formation.save();
            user.formation_participee.push(formation._id);
            user.save();
            res.status(201).json(formation);
        }
        
    }catch(error){
        res.status(400).json(error);
    }
}
export const updateFormation = async (req, res) => {
   
    try {
        const updatedformation = await Formation.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedformation);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
export const getUser = async (req,res) => {
//    const names=[];
//    let comp=0;
//     for(let i=0; i<table.length; i++ ){
//          User.findById(table._id, (err, row) => {
//             if (row) {
//                 names[comp]= row.username;
//                 comp++;
//             } else {
//               res.send("ERROR");
//             }
//           });
//           res.send(names);
//     }
const id = req.params.id;
let names =[];
const formations = await Formation.findById(id);
const participants = formations.participant;
if(participants != null){
    for(let i=0; i<participants.length; i++){
        const user = await User.findById(participants[i]);
        if(user){
            names.push(user)
        }
    }
}
res.send(names)
}
export const deleteFormation = async (req, res) => {
    try {const Id=req.params.id
        const formation=await Formation.findById(Id)
        if(!formation){
            return res.status(400).json({error:"formation don't existe"})
        }
        const Iduser_cree=formation.user_cree
        const user_cree=await User.findById(Iduser_cree)
        
        await formation.remove()
        user_cree.formation_cree.pull(formation)
        user_cree.save()
        
        res.status(200).json({success:true})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


