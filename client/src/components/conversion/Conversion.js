import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../../styles/conversion.module.css";
import images from "../../assets/images/CVV.png";
import  styless from "../../styles/conversion.module.css";
import useFetch from '../../hooks/fetch.hook';
import {useAuthStore} from '../../store/store';
import Modal from 'react-modal';
function Conversion() {
const [state, setState] = useState(false);
const [texte, setTexte] = useState("");
const  [url, setUrl] = useState("");
const { username } = useAuthStore(state => state.auth)
const [{ isLoading, apiData, serverError }] = useFetch()
const [cvs, setCV] = React.useState([]);
const [modalIsOpen, setIsOpen] = React.useState(false);
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    overflowY: "scroll",
    height: "35rem"
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
};
function getCV() {
  axios
    .get(`http://localhost:8080/api/CV/${apiData?._id}`)
    .then((res) => {
      if (res.data === "ERROR") {
        console.log("error !");
      } else {
        setCV(res.data); 
       
      }
    });
  }

function closeModal() {
  setIsOpen(false);
  document.body.style.overflow = 'auto';
}


  return (
    <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          style={customStyles}
                        >
                          <img src ={images} style={{width:"100%", height: "100%"}}/>
                          
                        
                              <h1 className={styless.h1}>{apiData?.nom}   &nbsp;{apiData?.prenom}</h1>
                              <h2 className={styless.mission}>{cvs.mission}</h2>
                              <img src={apiData.profile} style={{position:"absolute", left:"70%",top:"5%", width:"130px", borderRadius:"50%", height:"130px"}} />
                              <h2 className={styless.profile}>{cvs.profile}</h2>
                              <h2 className={styless.gmail}>{cvs.gmail}</h2>
                              <h2 className={styless.phone}>{cvs.telephone}</h2>
                              <h2 className={styless.linkedin}>{cvs.linkedin}</h2>
                              <h2 className={styless.adress}>{cvs.adress}</h2>
                              <h2 className={styless.langue}>{cvs.langue}</h2>
                              <div className={styless.competence}>
                              {cvs.competences && cvs.competences.length > 0 ? (
                                      cvs.competences.map((user, index) => (
                                        <p key={index}>
                                          {user.competence}: ({user.nb_experience} ans)
                                        </p>
                                      ))
                                    ) : (
                                      null
                                    )}
                                  </div>
                                
                              
                              <div className={styless.experience}>{cvs.experience.map((user)=>{
                                  return ( <><li><b>{user.nom_post}</b> à <b>{user.nom_entreprice}  :</b></li> <br/>  {user.date_debutExp} jusqu'à {user.date_finExp} <br/>
                                    {user.descriptionExp}  </>)   
                              })} </div>
                              <div className={styless.formation}>{cvs.formation.map((user)=>{
                                  return (<>
                                  <li><b>{user.titleForm} à {user.nom_ecole}:</b></li><br/>
                                  {user.date_debutForm} jusqu'à  {user.date_finForm} <br/>
                                    
                                    {user.descriptionForm}</>)
                              })} </div>
                            
                                <button  
                                className={styless.img}>Valider</button>
                                
                                <a href="/candidat/cv"><button onClick={()=>{closeModal()}} 
                                className={styless.img1}>Modifier</button></a>
                      </Modal>
  )
}

export default Conversion
