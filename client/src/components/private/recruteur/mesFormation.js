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
  console.log(user)
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
                                  <MDBListGroupItem action active={basicActive === 'participant'} noBorders className='px-3'>
                                    <MDBTabsItem  className={styles.tabItem}>
                                      <MDBTabsLink onClick={() => handleBasicClick('participant')} style={{color:"brown"}}>Participants</MDBTabsLink>
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
                                  {formation.duree} mois
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
                                <MDBTabsPane eventKey = "tab-6" show={basicActive === 'participant'} style={{ marginTop:"3rem", fontSize:"18px"}}>
                                  
                                     <table style={{border:"1px solid gray", width:"100%",borderRadius:"15px"}}>
                                      <thead style={{border:"1px solid gray"}}>
                                        <tr>
                                          <th style={{border:"1px solid gray", width:"30%", padding:"5px"}}>Nom</th>
                                          <th style={{border:"1px solid gray", width:"30%", padding:"5px"}}>Email</th>
                                          <th style={{border:"1px solid gray", width:"30%", padding:"5px"}}>Téléphone</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {user.map((users,index)=>{
                                          return (
                                            <>
                                            <tr style={{border:"1px solid gray"}}>
                                            <td style={{fontSize:"15px", color:"gray",border:"1px solid gray", padding:"5px"}}>{users.username}</td>
                                            <td style={{fontSize:"15px", color:"gray",border:"1px solid gray", padding:"5px"}}>{users.email}</td>
                                            <td style={{fontSize:"15px", color:"gray",border:"1px solid gray", padding:"5px"}}>{users.mobile}</td>
                                            </tr>
                                          
                                            </>
                                          )
                                        })}
                                  </tbody>
                                  </table>
                                </MDBTabsPane>
                              </MDBTabsContent>
                            </MDBCol>
                            
                          </MDBRow>
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
