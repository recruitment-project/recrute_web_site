import Link from 'next/link';
import React, { useState } from 'react';
import logo from '../../assets/logoBlack.png'

const Header = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   // handle sidebar show
   const [show, setShow] = useState(false);
   // handle close
   const handleClose = () => setShow(false);
   // handle sidebar show
   const handleShow = () => setShow(true);
   const handleLogout = () => {
      // Perform logout logic
      setIsLoggedIn(false);
    };
   return (
      <>
         <header>
            <div  id="header-sticky">
               <div >
                  <div className="row align-items-center">
                     <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4 col-6">
                        <div className="logoo">
                           <Link href="/home">
                              
                                 <img src={logo} alt="logo" />

                           </Link>
                        </div>
                     </div>
                     <div className="col-xxl-8 col-xl-8 col-lg-8 d-none d-lg-block">
                        <div className="mainn-menu">
                           <nav id="mobile-menu">
                              <ul>
                                 <li >
                                    <Link href="#" legacyBehavior>Home</Link>
                                   
                                 </li>
                                 
                                
    
                                 <li >
                                    <Link href="#Services" >Services</Link>     
                                 </li>
                                 <li><Link href="/contact" >Contact</Link></li>
                                 <li><Link href="" >Tips</Link></li>
                                 <li><Link href="#About">About</Link></li>
                              </ul>
                           </nav>
                        </div>
                     </div>
                     <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-8 col-6">
                        <div className="header__action d-flex align-items-center justify-content-end">
                        <div className="header__login d-none d-sm-block">
      {isLoggedIn ? (
        <a style={{ cursor: 'pointer' }} className='d-flex align-items-center' onClick={handleLogout}>
          <i className="fal fa-sign-out-alt"></i> Log Out
        </a>
      ) : (
        <Link href="/" >
          
            <i className="far fa-unlock"></i> Log In 
         </Link>
      )}
    </div>
                           <div className="header__register d-none d-sm-block">
                              <Link href="/register" >
                                 
                                    <i className="far fa-envelope" aria-hidden="true"></i> Register
                           
                              </Link>
                           </div>
                          
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>


        
      </>
   );
};

export default Header;