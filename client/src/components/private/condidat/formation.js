import React, {useState, useEffect} from 'react';
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
import Box from '@mui/material/Box';
import {FcSearch} from "react-icons/fc";
import SidebarCandidat from '../../layout/sidebarCondidat';
import styles from "../../../styles/formations.module.css";
import axios from "axios";
import Header from '../../layout/header';
import swal from 'sweetalert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import useFetch from '../../../hooks/fetch.hook';
const PAGE_SIZE = 2;
export default function Formation() {
  const [{apiData}] = useFetch();
  const [formationsList, setFormations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formation, setFormation] = useState({});
  const [basicActive, setBasicActive] = useState('formateur');
  const [participer, setParticiper] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalIsOpen, setIsOpen] =useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [chaima, setChaima] = useState("");
  const totalPages = Math.ceil(formationsList.length / PAGE_SIZE);
  function getAllFormations() {
    axios
      .post(`http://localhost:8080/api/formations`)
      .then((res) => {
        if (res.data === "ERROR") {
          console.log("error !");
        } else {
          setFormations(res.data); 
        }
      });
    }
  function postuler(id) {
    axios
      .post(`http://localhost:8080/api/saveFormationParticipant`, { formation_participee:id,participant: apiData?._id})
     
      .then((res) => {
        if (res.data === "ERROR") {
          console.log("error !");
        } else {
          setChaima(res.data);
        }
      });
  }
  useEffect(() => {
    getAllFormations();
  }, []);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredImages = formationsList.filter((image) =>
  image.title.toLowerCase().includes(searchQuery.toLowerCase())
);
const handleClick = (page) => {
  setCurrentPage(page);
};
const getDisplayedItems = () => {
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return formationsList.slice(start, end);
};

const handleClose = () => {
  setOpen(false);
};
const handleOpen = () => {
  setOpen(true);
  setTimeout(() => {
    setOpen(false);
  }, 1000);
};
const handleBasicClick = (value) => {
  if (value === basicActive) return;
  setBasicActive(value);
}

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

console.log(chaima)
function openParticiper(id){
  setParticiper(false);
  postuler(id);
  setTimeout(() => {
    setParticiper(true);
    swal({
      title: "Voulez-vous vraiment participer à cette formation ? ",
      icon: "warning",
      buttons: {
        cancel: 'Non',
        confirm: 'Oui',
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete){
      if ( chaima === "repeated" ){
        swal("vous avez postulé à cette formation", {
          icon: "warning",
       })}
      else  {
        swal("Excellent! vous êtes enregistré à participer dans cette formation, nous allons vous appeler plus tôt", {
          icon: "success",
        });
      } 
      }})
      
 }, 1000);
}

function closeModal() {
  setIsOpen(false);
  document.body.style.overflow = 'auto';
}
  return (
    <>
    <div className='displ flex'>
      <div>
          <SidebarCandidat/>
      </div>

      <div style={{width:"100%", height:"2rem"}}>
        <Header  />
      </div>

      <div style={{width: "50%",position: "absolute",left: "27%",height: "3rem",margin: "1rem", top:"10%"}}>
          <label><FcSearch  style={{position:"absolute", fontSize:"20px", top:"33%", left:"2%"}} /><input type="text" placeholder='Rechercher votre formation . . . ' onChange={handleSearch}
           style={{borderRadius: "10px",paddingLeft: "58px",height: "50px",width: "47.5rem"}}
           className={styles.inputSearch}
          /></label>
      </div>
      
      <div className="flex" id="card">
      
                {getDisplayedItems().filter((image) =>
                    image.title.toLowerCase().includes(searchQuery.toLowerCase()),
                   
                  ).map((image, index) => (
                  <div className={styles.leftSide} style={{height:"380px"}} key={index} >
                    <img src={image.image } style={{height:"9rem", width:"100%", marginBottom:"15px"}}/>
                    <p className={styles.title}>{image.title}</p>
                    <p>{image.description.slice(0,130)} . . . </p>
                   
                    <div className="flex" >
                        <button type="submit" className={styles.btn} onClick={()=>{handleOpen(),openParticiper(image._id),setFormation(image)}}>
                              Participer
                        </button>
                       
                        <Backdrop
                          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                          open={open}
                          onClick={handleClose}
                        >
                          <CircularProgress color="inherit" />
                        
                        </Backdrop>
                        <button className={styles.btnMore}  onClick={()=>{openModal(),setFormation(image)}}>
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
            <nav className={styles.pages}  >
              <MDBPagination className="flex" >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                 <MDBPaginationItem className={styles.items}>
                  <MDBPaginationLink href='#' key={page}  onClick={() => handleClick(page)}>{page}</MDBPaginationLink>
                </MDBPaginationItem> 
                ))}             
              </MDBPagination>
            </nav>
      </div>
    </div>
          </>  
   
  );
}

