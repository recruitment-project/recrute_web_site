import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider ,Route,Routes} from 'react-router-dom';


/** import all components */
import Formation from '../private/condidat/formation';
import Offre from '../private/condidat/offre';

import Profile from '../auth/Profile';
// /** auth middleware */
 //import { AuthorizeUser } from '../components/middleware/auth';
import SidebarCandidat from '../../components/layout/sidebarCondidat';
import Dashbord from '../private/condidat/Dashboard/Dashbord';
export default function CondidatRouting() {
  return (
 
    <BrowserRouter>
  
        <SidebarCandidat>
       
    <Routes>
    <Route path="/dashbord" element={<Dashbord/>}/>
        <Route path="/formation" element={<Formation/>}/>
        
        <Route path="/offre" element={<Offre/>}/>
        <Route path="/condidat/profile" element={<Profile />}/>
   
    </Routes>    
    </SidebarCandidat>
    </BrowserRouter>
  )
}