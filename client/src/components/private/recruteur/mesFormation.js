import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import SidebarRecruteur from '../../layout/sidebarRecruteur';
import {
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
  import Modal from 'react-modal';
  import Header from '../../layout/header';

import {FcSearch} from "react-icons/fc";
import styles from "../../../styles/formations.module.css";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import jwt_decode from 'jwt-decode';
const PAGE_SIZE = 2;




export default function MesFormation() {
  const navigate = useNavigate()
  const [formationsList, setFormations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formation, setFormation] = useState({});
  const [basicActive, setBasicActive] = useState('formateur');
  const [user , setUser] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(formationsList.length / PAGE_SIZE);
  const handleClick = (page) => {
    setCurrentPage(page);
  };
  const getDisplayedItems = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return formationsList.slice(start, end);
  };


  
  function getAllFormations() {
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    axios
      .get(`http://localhost:8080/api/formationByUser/${decode?.userId}`)
      .then((res) => {
        if (res.data === "ERROR") {
          console.log("error !");
        } else {
          setFormations(res.data); 
        }
      });
  }
  function getUser(id) {
   
    axios
      .get(`http://localhost:8080/api/getUser/${id}`)
      .then((res) => {
        if (res.data === "ERROR") {
          console.log(res.data);
        } else {
          setUser(res.data);
          console.log(res.data)
        }
      });
  }
  const onDelite= async (id)=>{
    if( window.confirm("are you sure that you wanted to delete that formation record")){
      const  res= await axios.delete(`http://localhost:8080/api/formation/${id}`);
        //const response= await axios.delete(`http://localhost:8080/api/offre/${id}`
       // );
        if (res.status===200){
            toast.success("deleted");
            getAllFormations();
        }
    }
}


  useEffect(() => {
 
    getAllFormations();
    // getUser()
  }, []);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  
const handleBasicClick = (value) => {
  if (value === basicActive) return;
  setBasicActive(value);
}
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
function openModal() {
  setIsOpen(true);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  setIsOpen(false);
  document.body.style.overflow = 'auto';
}
  return (
    <>
    <div className='displ flex'>
      <div>
      <SidebarRecruteur/>
      </div>
     
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      
      <div style={{width:"100%", height:"2rem"}}>
        <Header  />
      </div>

      <div style={{width: "50%",position: "absolute",left: "27%",height: "3rem",margin: "1rem", top:"10%"}}>
          <label><FcSearch  style={{position:"absolute", fontSize:"20px", top:"33%", left:"2%"}} /><input type="text" placeholder='Rechercher votre formation . . . ' onChange={handleSearch}
           style={{borderRadius: "10px",paddingLeft: "58px",height: "50px",width: "47.5rem"}}
           className={styles.inputSearch}
          /></label>
      </div>
      <button className={styles.btnajout} onClick={()=>navigate('/recruteur/formation/ajout')}> Ajout</button>
      </div>
      <div className="flex " id="card" style={{marginTop:"-1%"}}>
      
                {getDisplayedItems().filter((image) =>
                    image.title.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((image, index) => (
                  <div style={{ height:"390px"}} className={styles.leftSide} key={index}>
                    <img src={image.image } className={ styles.image}/>
                    <p className={styles.title}>{image.title}</p>
                    <p>{image.description.slice(0,65)} . . . </p>
                    <div className="flex">
                    <NavLink to={`/recruteur/formation/update/${image._id}`}> 
                    <button type='submit'className={styles.btnmodif} >
                    Edit</button>
                    </NavLink>
                        <button className={styles.btn} onClick={() => onDelite(image._id)}>
                        Delete
                        </button>
                        <button className={styles.btnMore}  onClick={()=>{openModal(),setFormation(image), getUser(image._id)}}>
                          read more
                        </button>
                    </div> 
                    <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          style={customStyles}
                        >
                          <h2 className={styles.title1}>{formation.title}</h2><br/><br/>
                          <div className={styles.imageBox}>
                          <img src={formation.image} style={{width:"500px", height: "200px"}}/>
                          </div>    
                          <hr /><br/>
                         <div className="flex">
                         <h3 style={{color:"rgb(95,158,160)", fontWeight:"bold" }}>Formateur:</h3> &nbsp;&nbsp;   
                          <span style={{color:"black"}}>{formation.formator}</span>
                          <h3 style={{color:"rgb(95,158,160)", fontWeight:"bold", marginLeft:"28.5%"}}>Date de début: </h3> &nbsp;&nbsp;
                          <span>{formation.date_start}</span> 
                         </div>
                         <br/>
                         <div className='flex'>
                            <h3 style={{color:"rgb(95,158,160)", fontWeight:"bold"}}>Durée: </h3> &nbsp;&nbsp;    
                            <span>{formation.duree}</span>
                            <h3 style={{color:"rgb(95,158,160)", fontWeight:"bold", marginLeft:"30%"}}>Price: </h3> &nbsp;&nbsp;
                            <span>{formation.price}</span>
                          </div>
                          <br/>
                          <h3 style={{color:"rgb(95,158,160)", fontWeight:"bold"}}>Addresse: &nbsp;&nbsp; <span style={{color:"black", fontWeight:"normal"}}>{formation.address}</span></h3>  
                                  <br/>
                                  <hr style={{marginBottom:"3%"}} />
                          <h3 style={{color:"rgb(95,158,160)", fontWeight:"bold"}}>Description: </h3>   <br/>       
                          <span>{formation.description}</span> <br/><br/>
                          <button onClick={closeModal} style={{background:"orangered", padding: "15px" , color:"white", borderRadius:"8px", float:"right", width:"150px"}}>close</button>
                        </Modal>
        
                  </div>
                 
            ))} 
            <nav className={styles.pages} >
              <MDBPagination className="flex" >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                 <MDBPaginationItem className={styles.items}>
                  <MDBPaginationLink href='#' key={page}  onClick={() => handleClick(page)}>{page}</MDBPaginationLink>
                </MDBPaginationItem> 
                ))}             
              </MDBPagination>
            </nav>
            </div>
           
      

    </>
  );
}
