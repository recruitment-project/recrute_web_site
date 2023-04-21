import React from 'react'
import Card from 'react-bootstrap/Card';
import {IoMdNotifications} from "react-icons/io";
import{FaSearch} from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { useHistory,useNavigate , NavLink } from 'react-router-dom';
import SidebarRecruteur from '../../layout/sidebarRecruteur';
import Header from '../../layout/header';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'react-hot-toast';
function Detailsoffre() {

    const navigate = useNavigate();

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    


    const getdata = async () => {

        const res = await fetch(`http://localhost:8080/api/getoffre/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");
        }
    }
let date=new Date(getuserdata.updatedAt).toLocaleString();
let manth=new Date(getuserdata.updatedAt).getDate();
    useEffect(() => {
        getdata();
    }, [])


    const onDelite= async (id)=>{
        if( window.confirm("are you sure that you wanted to delete that offre record")){
          const  res= await axios.delete(`http://localhost:8080/api/offre/${id}`);
            //const response= await axios.delete(`http://localhost:8080/api/offre/${id}`
           // );
            if (res.status===200){
                toast.success("deleted");
                getdata();
                navigate('/recruteur/mesOffre');
            }
        }
    }
  return (
    <div className='displ flex'>
     <div>
    <SidebarRecruteur/>
     </div>
     <div className='layout'>
     <Header/>
     <div className='cardDetails '>
  
<div className='flex '>
  <div className='border-left'> 
  
  <div className='marg mt-6 colors'>{getuserdata.Entreprisname }</div>
  <div className='marg mt-6'>{getuserdata.Offrename}</div>
  <div className='marg mt-6 '>recrutement actif</div>
  <div className='marg mt-6 '>{date}</div>
  </div>
  <div className='f mt-12' >
 
  <div className='mx-3'> 
  {getuserdata.Offrename}
  </div>
  <div className='mx-3'> 
  {getuserdata.ITdomain}
  </div>
   <div className='mx-3'> 
  {getuserdata.City}
  </div>
  <div className='flex'>
    <div className='mx-3'>temp</div>
    <div className='mx-3'> 
     {getuserdata.Temp}
    </div>
  </div>
  <div className='flex'>
    <div className='mx-3'>competance</div>
 <div className=' mx-3'> 
  {getuserdata.Competance}
  </div>
  </div>
  <div className='flex'>
    <div className='mx-3'>a propo de l'offre</div>
   <div className='mx-3'> 
  {getuserdata.DescriptionDetail}
  </div>
  </div>
  </div>
</div>
       {/* <Card.Body className='text'>
       {offreJob.map((item, index)=>(
       <Card className='pub '>
      
       <Card.Body>
       <NavLink to="/profile"  activeclassName="active" >
        <div className='pro'>
        
            <img src={avatar} className="imgpub" alt="avatar" />
           <div className='position'>nom de profile</div>
           </div>
           </NavLink>
           
            <Card.Title className='mx-4'>{item.name}</Card.Title>
         <Card.Text className='mx-4'>
           <div>{item.description}</div>
         </Card.Text>
         <div className='groupbtn'>
         <Button variant="danger" className='btn1' type='submit' onClick={()=>navigate('/quize')}>Demande</Button>
         </div>
       </Card.Body>
      
     </Card>
    
     ))

 }
 <hr></hr>
       </Card.Body> */}
       
       <footer className='footer'> <div className='groupbtn'>
       <Button  className='btn2 px-2' type='submit' onClick={()=>navigate('/recruteur/offre')}>return</Button>
       
         <Button  className='btn3' type='submit'>postuler</Button>
         </div></footer>
     </div>
 
     </div>
   </div>
  );
}


export default Detailsoffre