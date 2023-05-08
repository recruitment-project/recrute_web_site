import mongoose from 'mongoose';

export const cvSchema = new mongoose.Schema(
    {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        telephone: { type: Number, required: true },
        mission: { type: String, required: true },
        gmail: { type: String, required: true},
        linkedin: { type: String, required: true },
        
        adress: { type: String, required: true},
        profile:{type:String, required: true},
        experience: [{
            date_debutExp: '',
            date_finExp: '',
            nom_post: '',
            nom_entreprice: '',
            descriptionExp: '',
          }],
          formation: [{
            date_debutForm: "",
            date_finForm: "",
            titleForm: "",
            nom_ecole: "",
            descriptionForm: "",
          }],
          competences: [{
            competence: "",
            nb_experience: "",
          }],
          langue:[],
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        
},

);

const CV = mongoose.model('CV', cvSchema);
export default CV;
