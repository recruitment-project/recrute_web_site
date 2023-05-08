import { Router } from "express";
const router = Router();
import multer from 'multer';
import { createCanvas, registerFont } from "canvas";
import path from "path";

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import {resetMail} from '../controllers/resetmailer.js'
import Auth, { localVariables } from '../middleware/auth.js';
import * as contactController from '../controllers/contactController.js';
import * as OffreController from'../controllers/offre.controller.js';
import offreModel, { OffreSchema } from "../model/offre.model.js";
import * as FormationController from '../controllers/formationController.js';
import Offres from "../model/offre.model.js";
import * as PostuleController from '../controllers/postuleController.js';
import * as ImageController from "../controllers/imageController.js";
/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app
//
router.route('/resetMail').post(resetMail); //send the email
//
router.route('/contact').post(contactController.contact); //contact
//
//router.route('/stepper').post(offreController.AddOffre); //offre
/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password

/** send email contact */
router.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    contactController.sendMail(user, info => {
      console.log(`The mail has beed send and the id is ${info.messageId}`);
      res.send(info);
    });
  });
// delete offre
router.delete("/deleteuser/:id",async(req,res)=>{
  try {
      const {id} = req.params;

      const deletuser = await Offres.findByIdAndDelete({_id:id})
      console.log(deletuser);
      res.status(201).json(deletuser);

  } catch (error) {
      res.status(422).json(error);
  }
})
// update offre data

router.patch("/updateoffre/:id",async(req,res)=>{
  try {
      const {id} = req.params;

      const updateoffre = await offreModel.findByIdAndUpdate(req.params.id,req.body,{
          new:true,
          runValidators: true

      });

      console.log(updateoffre);
      res.status(201).json(updateoffre);

  } catch (error) {
      res.status(422).json(error);
  }
})
// register user

router.post("/addoffre",async(req,res)=>{
  // console.log(req.body);
  const {Entreprisname,Offrename,ITdomain,City,MiniDescription,DescriptionDetail,fullName} = req.body;

  if(!Entreprisname || !Offrename || !ITdomain || !City || !MiniDescription || !DescriptionDetail|| !fullName ){
      res.status(422).json("plz fill the data");
  }

  try {
      
      const preuser = await offreModel.findOne({MiniDescription:MiniDescription});
      console.log(preuser);

      if(preuser){
          res.status(422).json("this is desc is already present");
      }else{
          const addoffre = new offreModel({
            Entreprisname,Offrename,ITdomain,City,MiniDescription,DescriptionDetail,fullName
          });

          await addoffre.save();
          res.status(201).json(addoffre);
          console.log(addoffre);
      }

  } catch (error) {
      res.status(422).json(error);
  }
})


// get offredata

router.get("/getdata",async(req,res)=>{
  try {
      const offredata = await offreModel.find().populate('user_cre');
      res.status(201).json(offredata)
      console.log(offredata);
  } catch (error) {
      res.status(422).json(error);
  }
})

router.get("/getdata/:userId",async(req,res)=>{
  const Id=req.params.userId
  const user=await User.findById(Id).populate('offre_cree')
  console.log(user);
  res.status(200).json(user.offre_cree)

})




// get individual offre

router.get("/getoffre/:id",async(req,res)=>{
  try {
      console.log(req.params);
      const {id} = req.params;

      const offreindividual = await offreModel.findById({_id:id});
      console.log(offreindividual);
      res.status(201).json(offreindividual)

  } catch (error) {
      res.status(422).json(error);
  }
})  
/**offre methods */
router.route('/offre').get(OffreController.getOffre);
router.route('/offre/:id').get(OffreController.getOffreById);
router.route('/offreByUser/:userId').get(OffreController.getOffreByUser);
router.route('/saveoffre').post(OffreController.saveOffre);
router.route('/offre/:id').patch(OffreController.updateOffre);
router.route('/offre/:id').delete(OffreController.deleteOffre);


/**Formation methods */
router.route('/formations').post(FormationController.getFormations);
router.route('/formation/:id').get(FormationController.getFormationById);
router.route('/formationByUser/:userId').get(FormationController.getFormationByUser);
router.route('/saveFormation').post(FormationController.saveFormation);
router.route('/formation/:id').put(FormationController.updateFormation);
router.route('/formation/:id').delete(FormationController.deleteFormation);
/**Postule methods */
router.route('/postules').post(PostuleController.getPostules);
router.route('/postule/:id').get(PostuleController.getPostuleById);
router.route('/addPostule').post(PostuleController.Addpostule);
router.route('/questionsByOffre/:id').get(OffreController.getQuestionByOffre);
router.route('/ajoutScore/:id').put(PostuleController.ajoutScore);


/***participation formation  ***/
router.route('/saveFormationParticipant').post(FormationController.SaveparticipationFormation);
router.route('/getUser/:id').get(FormationController.getUser);

// Set up storage for uploaded files
// router.route('/convert').post(ImageController.conversion);
/** conversion image* */

// router.route('/convert').post(ImageController.conversion);
export default router;

