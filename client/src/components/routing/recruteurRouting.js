import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider ,Route,Routes} from 'react-router-dom';


/** import all components */
import Formation from '../private/condidat/formation';
import Offre from '../private/condidat/offre';
import MesOffre from '../private/recruteur/mesOffre';
import Profile from '../auth/Profile';
// /** auth middleware */
 //import { AuthorizeUser } from '../components/middleware/auth';
import Dashbord from '../private/condidat/Dashboard/Dashbord';
import SidebarRecruteur from '../layout/sidebarRecruteur';
export default function RecruteurRouting() {
  return (
 
    <BrowserRouter>
  
       <SidebarRecruteur>
    <Routes>
    <Route path="/dashbord" element={<Dashbord/>}/>
    <Route path="/offre" element={<Offre/>}/>
    <Route path="/mesoffre" element={<MesOffre/>}/>
        <Route path="/formation" element={<Formation/>}/>
       
      
        <Route path="/profile" element={<Profile />}/>
        <Route path='/recruter' element={<ProfileRecruteur />}/>
   
    </Routes>    
    </SidebarRecruteur>
    </BrowserRouter>
  )
}