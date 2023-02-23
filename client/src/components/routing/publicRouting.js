import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Password from '../auth/Password';

import Profile from '../auth/Profile';
import Offre from '../private/condidat/offre';
import OffreR from '../private/recruteur/offre';
import MesOffre from '../private/recruteur/mesOffre'; 
import Formation from '../private/condidat/formation';
import FormationR from '../private/recruteur/formation';
import Recruter from '../private/recruteur/recruter';
import Recovery from '../auth/Recovery';
import SidebarRecruteur from '../layout/sidebarRecruteur';
import Register from '../auth/Register';
import  { AuthorizeUser, ProtectRoute } from'../../middleware/auth';
import PageNotFound from'../../components/PageNotFound';
import Reset from '../auth/Reset';
import Username from '../auth/Username';
import Dashbord from '../private/condidat/Dashboard/Dashbord';
import SidebarCandidat from '../layout/sidebarCondidat';
import DashbordR from '../private/recruteur/dashbord';
import ProfileR from '../auth/profileR';
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

export default function PublicRouting() {
  return (
    <main>
       <RouterProvider router={router}></RouterProvider>
    </main>
  )
}