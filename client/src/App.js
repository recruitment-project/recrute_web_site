import React from 'react'
<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Username from './components/auth/Username';
import Password from './components/auth/Password';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import Recovery from './components/auth/Recovery';
import Reset from './components/auth/Reset';
import PageNotFound from './components/PageNotFound';
import Dashboard from './components/Dashboard/Dashbord';
import Contact from './components/contact/contact';

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** root routes */
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
        element : <AuthorizeUser><Profile /></AuthorizeUser>
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
        element : <AuthorizeUser><Dashboard></Dashboard></AuthorizeUser>
    },
    {
        path : '/contact',
        element : <Contact></Contact>
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
=======
//import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
// import Username from './components/auth/Username';
// import Password from './components/auth/Password';
// import Register from './components/auth/Register';
// import Profile from './components/auth/Profile';
// import Recovery from './components/auth/Recovery';
// import Reset from './components/auth/Reset';
// import PageNotFound from './components/PageNotFound';
// import Dashboard from './components/Dashboard/Dashbord';

// /** auth middleware */
// import { AuthorizeUser, ProtectRoute } from './middleware/auth'
import CondidatRouting from './components/routing/condidatRouting';
import PublicRouting from './components/routing/publicRouting';
import RecruteurRouting from './components/routing/recruteurRouting';
// /** root routes */
//  const router = createBrowserRouter([
//      {
//          path : '/',
//          element : <PublicRouting></PublicRouting>
//      }])

//     {
//         path : '/register',
//         element : <Register></Register>
//     },
//     {
//         path : '/password',
//         element : <ProtectRoute><Password /></ProtectRoute>
//     },
//     {
//         path : '/profile',
//         element : <AuthorizeUser><Profile /></AuthorizeUser>
//     },
//     {
//         path : '/recovery',
//         element : <AuthorizeUser><Recovery></Recovery></AuthorizeUser>
//     },
//     {
//         path : '/reset',
//         element : <AuthorizeUser><Reset></Reset></AuthorizeUser>
//     },
//     {
//         path : '/dashboard',
//         element : <Dashboard></Dashboard>
//     },
//     {
//         path : '*',
//         element : <PageNotFound></PageNotFound>
//     },
// ])



import { BrowserRouter, createBrowserRouter, RouterProvider ,Route,Routes} from 'react-router-dom';


/** import all components */
import Formation from '../src/components/private/condidat/formation';
import Offre from '../src/components/private/condidat/offre';
import MesOffre from '../src/components/private/recruteur/mesOffre';
import Profile from './components/auth/Profile';
// /** auth middleware */
 //import { AuthorizeUser } from '../components/middleware/auth';
import Dashbord from '../src/components/private/condidat/Dashboard/Dashbord';

const USER_TYPES={
  PUBLIC: 'public user',
  NORMAL_USER:'Normal user',
  Admin_USER:'Admin user'
}
const CURRENT_USER_TYPS =USER_TYPES.PUBLIC
export default function App() {
  if(

      CURRENT_USER_TYPS=== USER_TYPES.NORMAL_USER
  ) {
  return <CondidatRouting/>;}
  else if (CURRENT_USER_TYPS === USER_TYPES.Admin_USER){
      return <RecruteurRouting/>
  }
  else {
    return (
      <PublicRouting/>
    )
  }
>>>>>>> 1b80af36ae2277984052fece04ef15b2757a3d67
}