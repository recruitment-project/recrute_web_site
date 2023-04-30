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
import { useFormik } from 'formik';
import styles from "../../../styles/formations.module.css";
import axios from "axios";
import Header from '../../layout/header';
import swal from 'sweetalert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {SaveparticipationFormation } from '../../private/recruteur/formation/helperFormation';
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
  const totalPages = Math.ceil(formationsList.length / PAGE_SIZE);
  const [formations, setFormatiions] = useState();
  const [chaima,setChaima]=useState({});
  const [answer, setAnswer] = useState(null);
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
 
  function postuler() {
    axios
      .post(`http://localhost:8080/api/saveFormationParticipant`, { participant: apiData?._id,formation_participee:formations})
     
      .then((res) => {
        console.log(formation_participee,participant);
        if (res.data === "ERROR") {
          console.log("error !");
        } else {
          setChaima(res.data); 
        }
      });
  }
  useEffect(() => {
    getAllFormations();
    // postuler();
  }, []);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredImages = formationsList.filter((image) =>
  image.title.toLowerCase().includes(searchQuery.toLowerCase())
);


 const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
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
function openParticiper(id){
  setParticiper(false);
  setFormatiions(id);
  setTimeout(() => {
    setParticiper(true);
    swal({
      title: "Voulez-vous vraiment participer à cette formation ? ",
      // text: "Si vous cliquez sur `Oui`, un email vous sera envoyé  ",
      icon: "warning",
      buttons: {
        cancel: 'Non',
        confirm: 'Oui',
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Excellent! vous êtes enregistré à participer dans cette formation, nous allons vous appeler plus tart", {
          icon: "success",
        });
        setAnswer(true);
        postuler()
        // {formik.handleSubmit()}
      }else {
        setAnswer('non');
      } 
    });
 }, 1000);
}
function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={handleOpen}>Open Child Modal</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <button onClick={handleClose}>Close Child Modal</button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function closeModal() {
  setIsOpen(false);
  document.body.style.overflow = 'auto';
}
function closeModalParticiper() {
  setParticiper(false);
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
                  <div className={styles.leftSide} style={{height:"25rem"}} key={index} >
                    <img src={image.image } style={{height:"9rem", width:"100%", marginBottom:"15px"}}/>
                    <p className={styles.title}>{image.title}</p>
                    <p>{image.description.slice(0,130)} . . . </p>
                   
                    <div className="flex" >
                        <button type="submit" className={styles.btn} onClick={()=>{handleOpen(),openParticiper(image._id)}}>
                              Participer
                        </button>
                       
                        <Backdrop
                          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                          open={open}
                          onClick={handleClose}
                        >
                          <CircularProgress color="inherit" />
                        
                        </Backdrop>
                        {/* {participer ?
                         <form onSubmit={formik.handleSubmit} > */}
                        {/* <Modal
                            open={participer}
                            onClose={closeModalParticiper}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                          >
                            <Box sx={{ ...style, width: 400 }}>
                              <h2 id="parent-modal-title">Text in a modal</h2>
                              <p id="parent-modal-description">
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                              </p>
                              <ChildModal />
                            </Box>
                          </Modal> */}
                          {/* <button>Oui</button>
                          </form>
                           : null} */}
                        <button className={styles.btnMore}  onClick={()=>{openModal(),setFormation(image)}}>
                          read more
                        </button>
                    </div> 
                    
                        <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          style={customStyles}
                        >
                          <h2 style={{textAlign:"left", fontWeight:"700", color:"red"}}>{formation.title}</h2><br/>
                          <div className={styles.imageBox}>
                          <img src={formation.image} style={{width:"500px", height: "200px"}}/>
                          </div>
                          
                          <MDBRow >
                            <MDBCol size={4}>
                              <MDBListGroup >
                                <MDBTabs className={styles.tab}>
                                  <MDBListGroupItem action active={basicActive === 'formateur'} noBorders className='px-3'>
                                    <MDBTabsItem className={styles.tabItem} >
                                      <MDBTabsLink onClick={() => handleBasicClick('formateur')} style={{color:"purple"}}>Formateur</MDBTabsLink>
                                    </MDBTabsItem>
                                  </MDBListGroupItem>
                                  <MDBListGroupItem action active={basicActive === 'date de départ'} noBorders className='px-3'>
                                    <MDBTabsItem className={styles.tabItem}>
                                      <MDBTabsLink onClick={() => handleBasicClick('date de départ')} style={{color:"red"}}>Date de départ</MDBTabsLink>
                                    </MDBTabsItem>
                                  </MDBListGroupItem>
                                  <MDBListGroupItem action active={basicActive === 'durée'} noBorders className='px-3'>
                                    <MDBTabsItem className={styles.tabItem}>
                                      <MDBTabsLink onClick={() => handleBasicClick('durée')} style={{color:"blue"}}>Durée</MDBTabsLink>
                                    </MDBTabsItem>
                                  </MDBListGroupItem>
                                  <MDBListGroupItem action active={basicActive === 'prix'} noBorders className='px-3'>
                                    <MDBTabsItem  className={styles.tabItem}>
                                      <MDBTabsLink onClick={() => handleBasicClick('prix')} style={{color:"green"}}>Prix</MDBTabsLink>
                                    </MDBTabsItem>
                                  </MDBListGroupItem>
                                  <MDBListGroupItem action active={basicActive === 'addresse'} noBorders className='px-3'>
                                    <MDBTabsItem  className={styles.tabItem}>
                                      <MDBTabsLink onClick={() => handleBasicClick('addresse')} style={{color:"black"}}>Addresse</MDBTabsLink>
                                    </MDBTabsItem>
                                  </MDBListGroupItem>
                                  <MDBListGroupItem action active={basicActive === 'description'} noBorders className='px-3'>
                                    <MDBTabsItem  className={styles.tabItem}>
                                      <MDBTabsLink onClick={() => handleBasicClick('description')} style={{color:"brown"}}>Description</MDBTabsLink>
                                    </MDBTabsItem>
                                  </MDBListGroupItem>
                                </MDBTabs>
                              </MDBListGroup>
                            </MDBCol>
                            <MDBCol size={8}>
                              <MDBTabsContent defaultActiveKey="tab-2">
                                <MDBTabsPane eventKey = "tab-1" show={basicActive === 'formateur'} style={{ marginTop:"3rem" , fontSize:"18px"}}>
                                  {formation.formator}
                                </MDBTabsPane>
                                <MDBTabsPane eventKey = "tab-2" show={basicActive === 'date de départ'} style={{ marginTop:"3rem", fontSize:"18px"}}>
                                  {formation.date_start}
                                </MDBTabsPane>
                                <MDBTabsPane eventKey = "tab-3" show={basicActive === 'durée'} style={{ marginTop:"3rem", fontSize:"18px"}}>
                                  {formation.duree}
                                </MDBTabsPane>
                                <MDBTabsPane eventKey = "tab-4" show={basicActive === 'prix'} style={{ marginTop:"3rem", fontSize:"18px"}}>
                                  {formation.price} TND
                                </MDBTabsPane>
                                <MDBTabsPane eventKey = "tab-5" show={basicActive === 'addresse'} style={{ marginTop:"3rem", fontSize:"18px"}}>
                                  {formation.address}
                                </MDBTabsPane>
                                <MDBTabsPane eventKey = "tab-6" show={basicActive === 'description'} style={{ marginTop:"3rem", fontSize:"18px"}}>
                                  {formation.description}
                                </MDBTabsPane>
                              </MDBTabsContent>
                            </MDBCol>
                            
                          </MDBRow>
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

