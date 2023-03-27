import mongoose from 'mongoose';

export const OffreSchema = new mongoose.Schema(
    {
        UserName:{ type: String},
        fullName: { type: String},
        
        Entreprisname : { type: String, required: true },
        Offrename: { type: String, required: true },
        ITdomain: { type: String, required: true },
       
        City: { type: String, required: true },
        MiniDescription: { type: String, required: true },
       
        DescriptionDetail: { type: String, required: true },
        profile: { type: String}
},

);

const Offres = mongoose.model('Offres', OffreSchema);
export default mongoose.model.Offres || mongoose.model('Offres', OffreSchema);
