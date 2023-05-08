import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    accountType: { type: String, required: false },
    firstName: { type: String},
    lastName: { type: String},
    mobile : { type : Number},
    address: { type: String},
    job: { type: String},
    EntrepriseName: { type: String},
    profile: { type: String},
    offre_cree:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offres"}],
    formation_participee:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Formation"
    }],
    formation_cree:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Formation"
    }],

    offre_participee:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Postule"
    }],
    
});

// const User =  mongoose.model('User', UsersSchema);
// export default User;
export default mongoose.model.Users || mongoose.model('User', UserSchema);
