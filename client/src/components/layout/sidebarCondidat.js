import React, { children , useState } from 'react';
import {FaTh,FaBars,FaUserAlt,FaShoppingBag,FaThList,} from "react-icons/fa";
import {AiFillHome} from "react-icons/ai";
import {TbLogout,TbCertificate} from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';

 function SidebarCandidat ( {children}){
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
            path:"/candidat/dashboard",
            name:"Dashbord",
            icon:<AiFillHome/>
        },
        {
            path:"/candidat/offre",
            name:"Offre",
            icon:<FaShoppingBag/>
        },
        {
            path:"/candidat/formation",
            name:"Formation",
            icon:<TbCertificate/>
        }
        ,
      
        {
            path:"/candidat/profile",
            name:"Profile",
            icon:<FaUserAlt/>
        }
       
       
    ];
    return (
        <div className='container flex px-0'>
             
            <div style={{width:isOpen ? "250px" : "50px"}} className='sidebar'>
                <div className='top-section flex'>
                    <h1 style={{display:isOpen? "block" : "none"}} className='logo'><img src={logo} /></h1>
                    <div  style={{marginLeft:isOpen? "60px" :"0px"}} className='bars flex'>
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
                   
                    <NavLink to="/" className='link flex ' activeclassName="active" >
                        <div className='icon'><TbLogout/></div>
                        <div style={{display:isOpen? "block" : "none"}} className='link_text' onClick={()=>userLogout()}>logout</div>
                    </NavLink>
                </div>

            </div>
          
         
        </div>
    )
}
export default SidebarCandidat