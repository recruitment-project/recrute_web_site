import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import {resetMail} from '../controllers/resetmailer.js'
import Auth, { localVariables } from '../middleware/auth.js';
import * as contactController from '../controllers/contactController.js';
import * as offreController from'../controllers/offre.controller.js';
import offreModel, { OffreSchema } from "../model/offre.model.js";

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
router.route('/stepper').post(offreController.AddOffre); //offre
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
router.delete("/deleteoffre/:id",async(req,res)=>{
  try {
      const {id} = req.params;

      const deleteoffre = await offreModel.findByIdAndDelete({_id:id})
      console.log(deleteoffre);
      res.status(201).json(deleteoffre);

  } catch (error) {
      res.status(422).json(error);
  }
})
// update offre data

router.patch("/updateoffre/:id",async(req,res)=>{
  try {
      const {id} = req.params;

      const updateoffre = await offreModel.findByIdAndUpdate(_id,req.body,{
          new:true
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
  const {Entreprisname,Offrename,ITdomain,City,MiniDescription,DescriptionDetail} = req.body;

  if(!Entreprisname || !Offrename || !ITdomain || !City || !MiniDescription || !DescriptionDetail ){
      res.status(422).json("plz fill the data");
  }

  try {
      
      const preuser = await offreModel.findOne({MiniDescription:MiniDescription});
      console.log(preuser);

      if(preuser){
          res.status(422).json("this is desc is already present");
      }else{
          const addoffre = new offreModel({
            Entreprisname,Offrename,ITdomain,City,MiniDescription,DescriptionDetail
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
      const offredata = await offreModel.find();
      res.status(201).json(offredata)
      console.log(offredata);
  } catch (error) {
      res.status(422).json(error);
  }
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

export default router;