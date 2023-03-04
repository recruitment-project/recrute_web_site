import React , {useState }from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Password from './components/auth/Password';
import Profile from './components/auth/Profile';
import Offre from './components/private/condidat/offre';
import OffreR from './components/private/recruteur/offre';
import MesOffre from './components/private/recruteur/mesOffre'; 
import Formation from './components/private/condidat/formation';
import FormationR from './components/private/recruteur/formation';
import Recruter from './components/private/recruteur/recruter';
import Recovery from './components/auth/Recovery';

import Register from './components/auth/Register';
import  { AuthorizeUser, ProtectRoute } from'././middleware/auth';
import PageNotFound from './components/PageNotFound';
import Reset from './components/auth/Reset';
import Username from './components/auth/Username';
import Dashbord from './components/private/condidat/Dashboard/Dashbord';

import DashbordR from './components/private/recruteur/dashbord';
import ProfileR from './components/auth/profileR';
import Contact from './components/contact/contact';
import Home from './components/home/home';
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/home',
        element : <Home></Home>
    },
   
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <Password />
    },
    {
        path : '/contact',
        element : <Contact></Contact>
    },
    {
        path : '/candidat/profile',
        element : <Profile></Profile>
    },
    {
        path : '/recruteur/profile',
        element : <ProfileR></ProfileR>
    },
    {
        path : '/candidat/profile',
        element : <Profile></Profile>
    },
    {
        path : '/recovery',
        element : <ProtectRoute><Recovery></Recovery></ProtectRoute>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '/recruteur/dashboard',
        element : <DashbordR></DashbordR>
    },
    {
        path : '/candidat/dashboard',
        element : <Dashbord></Dashbord>
    },
    {
        path : '/recruteur/offre',
        element : <OffreR></OffreR>
    },
    {
        path : '/candidat/offre',
        element : <Offre></Offre>
    },

    {
        path : '/recruteur/mesOffre',
        element : <MesOffre></MesOffre>
    },
   
    {
        path : '/recruteur/formation',
        element : <FormationR></FormationR>
    },
    {
        path : '/candidat/formation',
        element : <Formation></Formation>
    },
    {
        path : '/recruteur/recruter',
        element : <Recruter></Recruter>
    },
  
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])


export default function App() {
    const [isLoading, setLoading] = useState(true);

  // timer for spinner
  setTimeout(() => {
    setLoading(false);
  }, 1500);
  return (
    <main>
       <RouterProvider router={router}></RouterProvider>
      
    </main>
  )
}