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
let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: ENV.GMAIL_USER,
        pass: ENV.GMAIL_PASSWORD,
    }
});
export const resetMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;
    
    let mailcss = {
        background: `
        style="
        background: linear-gradient(90deg, rgba(171,74,230,1) 0%, rgba(160,20,103,1) 49%);
        border-radius: 5px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        color: white;"`,
        body: `
        style="background: white;
        border-radius: 5px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        color: black;"`,
        button: `
        style="background:linear-gradient(90deg, rgba(171,74,230,1) 0%, rgba(160,20,103,1) 49%);
        padding: 15px;
        border: none;
        boder-radius: 15px;
        color: white; `
      };
    let details = {
        from : ENV.GMAIL_USER,
        to: userEmail,
        subject: "Recupération de mot de passe",
        text: "Suivez les instructions pour activer votre compte.",
          html:
            `<div ` +
            mailcss.background +
            `><h1>WE_RECRUIT</h1>
                      <div` +
            mailcss.body +
            `>
                  <h3>Recupérer votre mot de passe</h3>
                  <hr/>
                  <h4>`+ text +`
                  <br/>
                  <h4>
             ` +
            `</h5>
                   </div>
                  </div>`,
    };
    mailTransporter.sendMail(details, (err)=>{
        if(err){
            console.log("it has an error", err);
        }else {
            console.log("email has sent !")
        }
    })

}