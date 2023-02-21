import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Password from '../auth/Password';

import Profile from '../auth/Profile';

import Recovery from '../auth/Recovery';
import SidebarRecruteur from '../layout/sidebarRecruteur';
import Register from '../auth/Register';
import  { AuthorizeUser, ProtectRoute } from'../../middleware/auth';
import PageNotFound from'../../components/PageNotFound';
import Reset from '../auth/Reset';
import Username from '../auth/Username';
import Dashbord from '../private/condidat/Dashboard/Dashbord';
import SidebarCandidat from '../layout/sidebarCondidat';
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
        path : '/profile',
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
        path : '/dashboard',
        element : <Dashbord></Dashbord>
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