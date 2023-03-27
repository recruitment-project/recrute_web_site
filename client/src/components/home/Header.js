import Link from 'next/link';
import React, { useState } from 'react';

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
                        <div className="logo">
                           <Link href="/">
                              
                                 <img src="assetslogo/logo.png" alt="logo" />

                           </Link>
                        </div>
                     </div>
                     <div className="col-xxl-8 col-xl-8 col-lg-8 d-none d-lg-block">
                        <div className="main-menu">
                           <nav id="mobile-menu">
                              <ul>
                                 <li >
                                    <Link href="#" legacyBehavior>Home</Link>
                                   
                                 </li>
                                 <li >
                                    <Link href="#" > 
                                       Jobs
                                    </Link> 
                                 </li>
                                 <li><Link href="">About</Link></li>
    
                                 <li >
                                    <Link href="#" >Services</Link>     
                                 </li>
                                 <li><Link href="/contact" >Contact</Link></li>
                                 <li><Link href="" >Conseil</Link></li>
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
        <Link href="/register" >
          
            <i className="far fa-unlock"></i> Log In 
         </Link>
      )}
    </div>
                           <div className="header__cart d-none d-sm-block">
                              <Link href="/" legacyBehavior>
                                 <a className="cart-toggle-bttn">
                                    <i className="fa-light fa-envelope"></i> Register
                                    
                                 </a>
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