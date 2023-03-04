import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import {resetMail} from '../controllers/resetmailer.js'
import Auth, { localVariables } from '../middleware/auth.js';
import * as contactController from '../controllers/contactController.js';


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

export default router;