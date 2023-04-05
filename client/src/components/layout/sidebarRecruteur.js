import React, { children , useState } from 'react';
import {FaTh,FaBars,FaUserAlt,FaShoppingBag,FaThList} from "react-icons/fa";
import {TbLogout,TbCertificate} from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import {AiFillHome} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import {GiPaintBrush} from "react-icons/gi";
import logo from "../../assets/logo.png";
//import styles from '../styles/Username.module.css';
 function SidebarRecruteur ( {children}){
    const [isOpen, setIsOpen]=useState(false);
    const toggle=()=>setIsOpen(!isOpen);
    const navigate = useNavigate()

     // logout handler function
   function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }
    const menuItem=[
        {
            path:'/recruteur/dashboard',
            name:"Dashbord",
            icon:<AiFillHome/>
        },
        {
            path:"/recruteur/offre",
            name:"Offre",
            icon:<FaShoppingBag/>
        },
        {
            path:"/recruteur/mesoffre",
            name:"Mes offre",
            icon:<FaThList/>
        },
      
        {
            path:"/recruteur/formation",
            name:"Formation",
            icon:<TbCertificate/>
        }
        ,
        {
            path:"/recruteur/mesformation",
            name:"Mes formation",
            icon:<FaTh/>
        }
        ,
        {
            path:"/recruteur/recruter",
            name:"Recruter",
            icon:<GiPaintBrush/>
        },
        {
            path:"/recruteur/profile",
            name:"Profile",
            icon:<FaUserAlt/>
        }
       
       
    ];
    return (
        <div className='container px-0 flex'>
             
            <div style={{width:isOpen ? "250px" : "50px"}} className='sidebar'>
                <div className='top-section flex'>
                    <h1 style={{display:isOpen? "block" : "none"}} className='logo'><img src={logo} /></h1>
                    <div  style={{marginLeft:isOpen? "50px" :"0px"}} className='bars flex'>
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item, index)=>(
                        <NavLink to={item.path} key={index} className='link flex' activeclassName="active">
                            <div className='icon'>{item.icon}</div>
                            <div style={{display:isOpen? "block" : "none"}} className='link_text'>{item.name}</div>
                        </NavLink>
                    ))
                }
                <div className='Logout'>
                   
                    <NavLink to="/" className='link flex' activeclassName="active" >
                        <div className='icon'><TbLogout/></div>
                        <div style={{display:isOpen? "block" : "none"}} className='link_text' onClick={()=>userLogout()}>logout</div>
                    </NavLink>
                </div>

            </div>
           
         
        </div>
    )
}
export default SidebarRecruteur