import React from 'react'
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
import SidebarRecruteur from './components/layout/sidebarRecruteur';
import Register from './components/auth/Register';
import  { AuthorizeUser, ProtectRoute } from'././middleware/auth';
import PageNotFound from './components/PageNotFound';
import Reset from './components/auth/Reset';
import Username from './components/auth/Username';
import Dashbord from './components/private/condidat/Dashboard/Dashbord';
import SidebarCandidat from './components/layout/sidebarCondidat';
import DashbordR from './components/private/recruteur/dashbord';
import ProfileR from './components/auth/profileR';
import Contact from './components/contact/contact';
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
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
        element : <AuthorizeUser><Recovery></Recovery></AuthorizeUser>
    },
    {
        path : '/reset',
        element : <AuthorizeUser><Reset></Reset></AuthorizeUser>
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
        path : '/sidbar',
        element : <SidebarCandidat></SidebarCandidat>
    },
    {
        path : '/sidebar',
        element : <SidebarRecruteur></SidebarRecruteur>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])

export default function App() {
  return (
    <main>
       <RouterProvider router={router}></RouterProvider>
    </main>
  )
}