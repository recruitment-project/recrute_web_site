import mongoose from 'mongoose';

export const postuleSchema = new mongoose.Schema(
    {
        cv:{type:String, required: true },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        offre:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Offre"
        },
        score:{type:String}
        
        
},

);

const Postule = mongoose.model('Postule', postuleSchema);
export default Postule;
