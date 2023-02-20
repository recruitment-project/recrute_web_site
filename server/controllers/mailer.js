import nodemailer from 'nodemailer';

import ENV from '../config.js';

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: ENV.GMAIL_USER,
            pass: ENV.GMAIL_PASSWORD,
        }
    });
    let details = {
        from : ENV.GMAIL_USER,
        to: userEmail,
        subject: "Bravo! Registration avec succés...",
        // text: "Suivez les instructions pour activer votre compte.",
        //   html:
        //     `<div ` +
        //     mailcss.background +
        //     `><h1>Anytime & Anywhere</h1>
        //               <div` +
        //     mailcss.body +
        //     `>
        //           <h3>Activer compte</h3>
        //           <hr/>
        //           <h4>félicitation ! vous êtes presque prêt à commencer, cliquez simplement sur le lien ci-dessous pour réinitialiser votre mot de passe
        //           <br/>
        //           <h4>
        //           <h5>` +
        //     ENV.APP_URL +
        //     `/ActivateAccount/` +
        //     userEmail +
        //     `/` +
        //     `</h5>
        //            </div>
        //           </div>`,
    };
    mailTransporter.sendMail(details, (err)=>{
        if(err){
            console.log("it has an error", err);
        }else {
            console.log("email has sent !")
        }
    })

}