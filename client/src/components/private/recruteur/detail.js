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
function Details() {
    const offreJob=[
        
        {
            name:"offre9",
            description:"Bonjour à tous  Nouvelle semaine, nouveaux besoins ! Nous sommes à la recherche d'un PMO/IT junior .Profil Recherché Bac+3 ou Bac + 5 (Gestion de Projet ) Bonjour à tous  Nouvelle semaine, nouveaux besoins ! Nous sommes à la recherche d'un PMO/IT junior .Profil Recherché Bac+3 ou Bac + 5 (Gestion de Projet ) Bonjour à tous  Nouvelle semaine, nouveaux besoins ! Nous sommes à la recherche d'un PMO/IT junior .Profil Recherché Bac+3 ou Bac + 5 (Gestion de Projet Bonjour à tous  Nouvelle semaine, nouveaux besoins ! Nous sommes à la recherche d'un PMO/IT junior .Profil Recherché Bac+3 ou Bac + 5 (Gestion de Proje Bonjour à tous  Nouvelle semaine, nouveaux besoins ! Nous sommes à la recherche d'un PMO/IT junior .Profil Recherché Bac+3 ou Bac + 5 (Gestion de Projet )"
           
        }

    ]
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

    useEffect(() => {
        getdata();
    }, [])

    const deleteoffre = async (id) => {

        const res2 = await fetch(`http://localhost:8080/api/deleteoffre/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("offre deleted");
            navigate('/recruteur/mesOffre');
        }

    }
  return (
    <div className='displ flex'>
     <div>
    <SidebarRecruteur/>
     </div>
     <div className='layout'>
     <Header/>
     <div className='cardMesoffre '>
  
<div className='flex '>
  <div className='border-left'> 
  <NavLink to="/profile"  activeclassName="active" >
  <div>image</div>
  <div className='marg mt-6'>nom de profile</div></NavLink>
  <div className='marg mt-6 colors'>{getuserdata.Offrename}</div>
  </div>
  <div className='detail'> 
  {getuserdata.DescriptionDetail}
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
       
       <Card.Footer> <div className='groupbtn'>
       <Button variant="secondary" className='btn2 px-2' type='submit' onClick={()=>navigate('/recruteur/mesOffre')}>return</Button>
         <Button  className='btn1' type='submit' onClick={()=>navigate('/recruteur/mesOffre')}>Modifier</Button>
         <Button  className='btn1' type='submit' onClick={() => deleteoffre(getuserdata._id)}>Supprimer</Button>
         </div></Card.Footer>
     </div>
 
     </div>
   </div>
  );
}


export default Details