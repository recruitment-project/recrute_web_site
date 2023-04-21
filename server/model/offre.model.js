import mongoose from 'mongoose';
export const OffreSchema = new mongoose.Schema(
    {
        Entreprisname : { type: String, required: true },
        Offrename: { type: String, required: true },
        ITdomain: { type: String, required: true },
        Temp: { type: String, required: true },
        City: { type: String, required: true },
        MiniDescription: { type: String, required: true },
       Competance:{ type: String, required: true },
        DescriptionDetail: { type: String, required: true },
        user_cre:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        questions: [{
            question: { type: String, required: true },
            options0: { type: String, required: true },
            options1: { type: String, required: true },
            options2: { type: String, required: true },
            correctAnswer: { type: String, required: true },
          }],
        
},{
    timestamps:true
}
);
const Offres = mongoose.model('Offres', OffreSchema);
export default Offres;
