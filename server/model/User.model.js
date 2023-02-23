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
    profile: { type: String}
});

<<<<<<< HEAD
export default mongoose.model.Users || mongoose.model('User', UserSchema);
=======
export default mongoose.model.Users || mongoose.model('User', UserSchema);
>>>>>>> 1b80af36ae2277984052fece04ef15b2757a3d67
