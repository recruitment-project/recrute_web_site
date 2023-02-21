import React ,{ useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';


export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

 const [showForm, setShowForm] = useState(true);
  const contact = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post("http://localhost:8080/api/contact", {
        name,
        email,
        subject,
        message,
      });
      
     
      toast.success('Your message has been sent successfully!');
      setShowForm(false);
      await axios.post("http://localhost:8080/api/sendmail", {
        name,
        email,
        subject,
        message,
      });
      
   
    
    
    } catch (error) {
      toast.error(error.message)
    }
  };
 
  
  return (
 
     <section className=" container mx-auto flex justify-center mt-2  mb-2">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
  <div className=" flex justify-center items-center  bg-white rounded-xl ">
    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
    
  
    <div className="xl:ml-20 xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0" >
    <div className="flex flex-row items-center justify-center mb-4 mt-5">
        <p className=" text-3xl font-bold">Contact Us</p>
         
        </div>
    {showForm && (
      <form onSubmit={contact} >
       
        
      

       
        <div className=" flex justify-center mb-3">
        
          <input
            type="text"
            className="border-4 border-gray-100 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg hover:border-gray-200 focus:outline-none"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            required
          />
        </div>
        <div className=" flex justify-center mb-3">
          <input
            type="email"
            className="border-4 border-gray-100 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg hover:border-gray-200 focus:outline-none"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          
            
            required
          />
        </div>

       
        <div className=" flex justify-center mb-6">
          <input
            type="text"
            className="border-4 border-gray-100 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg hover:border-gray-200 focus:outline-none"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            name="subject"
            required
            
          />
        </div>
        <div className=" flex justify-center mb-6">
          <textarea
          cols='30'
          rows='5'
            className="border-4 border-gray-100 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg hover:border-gray-200 focus:outline-none"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            required
          />
        </div>
        <div className=" flex justify-center text-center lg:text-left">
          <button
           type='submit'
            className=" border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center"
          >
            Send Message
          </button>
        
        </div>
         
      </form>
     )}
    </div>
    
      <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
      <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76G5SR0wvkCj9n884J1NErsiSL84jycgNPA&usqp=CAU"
          className="photoContact"
          alt="Sample image"
          
        />
      <Card sx={{ minWidth: 450 }} className="cardconatct">
      <CardContent>
       
        <CardActions disableSpacing>
        <IconButton aria-label="share">
          <RoomIcon />
        </IconButton>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        29 rue Abou 1082 Tunis Tunisie
        </Typography>
       
        </CardActions>
        <CardActions disableSpacing>
        <IconButton aria-label="share">
          <AlternateEmailIcon />
        </IconButton>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        werecruit277@gmail.com
        </Typography>
        </CardActions>
        <CardActions disableSpacing>
        <IconButton aria-label="share">
          <PhoneIcon />
        </IconButton>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
         (+216)79 49 36 84
        </Typography>
        </CardActions>
        
      </CardContent>
      
    </Card>
    
      </div>
    </div>
  </div>
</section>
   
 
  
  )
}
