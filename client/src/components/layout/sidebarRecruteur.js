import React, { children , useState } from 'react';
import {FaTh,FaBars,FaUserAlt,FaShoppingBag,FaThList} from "react-icons/fa";
import {TbLogout,TbCertificate} from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import {AiFillHome} from "react-icons/ai";
import {GiPaintBrush} from "react-icons/gi";
//import styles from '../styles/Username.module.css';
 function SidebarRecruteur ( {children}){
    const [isOpen, setIsOpen]=useState(false);
    const toggle=()=>setIsOpen(!isOpen);
    const menuItem=[
        {
            path:"/dashbord",
            name:"Dashbord",
            icon:<AiFillHome/>
        },
        {
            path:"/offre",
            name:"Offre",
            icon:<FaShoppingBag/>
        },
        {
            path:"/recruteur/mesoffre",
            name:"Mes offre",
            icon:<FaThList/>
        },
      
        {
            path:"/formation",
            name:"Formation",
            icon:<TbCertificate/>
        }
        ,
        {
            path:"/recruteur/profile",
            name:"Recruter",
            icon:<GiPaintBrush/>
        },
        {
            path:"/recruteur/recruter",
            name:"Profile",
            icon:<FaUserAlt/>
        }
       
       
    ];
    return (
        <div className='container'>
             
            <div style={{width:isOpen ? "250px" : "50px"}} className='sidebar'>
                <div className='top-section'>
                    <h1 style={{display:isOpen? "block" : "none"}} className='logo'>Logo</h1>
                    <div  style={{marginLeft:isOpen? "50px" :"0px"}} className='bars'>
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item, index)=>(
                        <NavLink to={item.path} key={index} className='link' activeclassName="active">
                            <div className='icon'>{item.icon}</div>
                            <div style={{display:isOpen? "block" : "none"}} className='link_text'>{item.name}</div>
                        </NavLink>
                    ))
                }
                <div className='Logout'>
                   
                    <NavLink to="/password" className='link ' activeclassName="active" >
                        <div className='icon'><TbLogout/></div>
                        <div style={{display:isOpen? "block" : "none"}} className='link_text'>logout</div>
                    </NavLink>
                </div>

            </div>
            <main>{children}</main> 
         
        </div>
    )
}
export default SidebarRecruteur