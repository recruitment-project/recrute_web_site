import Contact from "../model/contact.model.js";
import nodemailer from "nodemailer";
import ENV from '../config.js'
export const contact = async (req, res) => {
   
   try {const contactExist=await Contact.findOne({email:req.body.email})
   if(contactExist){
       contactExist.message.push(req.body.message)
       
       const insertedmessage = await contactExist.save();
       res.status(201).json(insertedmessage);
   }else{
         const contact = new Contact(req.body);

       const insertedcontact = await contact.save(); 
       res.status(201).json(insertedcontact);
   }} catch (error) {
       res.status(400).json({message: error.message});
   }
}
export const sendMail = async (user, callback) =>{
    debugger
    // create reusable transporter object using the default SMTP transport
    try{  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {

        user: ENV.GMAIL_USER,
        pass: ENV.GMAIL_PASSWORD,
        user: "werecruit277@gmail.com",
        pass: 'psyfnwwapjxgqpux'
      }
    });
  
    let mailOptions = {
      from: user.email, // sender address

      to: ENV.GMAIL_PASSWORD, // list of receivers
      to: "werecruit277@gmail.com", // list of receivers
      subject: "New message from site we-recruit", // Subject line
      html: `From : </strong>${user.name} </strong> <br><br>
      Email : </strong>${user.email} </strong> <br><br>
      Subject : </strong>${user.subject} </strong> <br><br>
      Message : </strong>${user.message} </strong> <br><br>`
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  
    callback(info);
}catch(err){
    callback(err)
    
        // res.status(400).json({error:"erreur d'envoi l'email"})
  }
  }
