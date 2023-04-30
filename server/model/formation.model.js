import mongoose from 'mongoose';

export const formationSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String},
        domaine: { type: String, required: true },
        duree: { type: String, required: true },
        price: { type: Number},
        date_start: { type: String, required: true },
        formator:{type:String},
        address: { type: String},
        image:{type:String},
        user_cree:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        participant:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        }],
        
},

);

const Formation = mongoose.model('Formation', formationSchema);
export default Formation;
