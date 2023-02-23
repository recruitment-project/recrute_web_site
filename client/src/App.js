import React from 'react'
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
import PublicRouting from './components/routing/publicRouting';

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

export default function App() {
    return (
      <PublicRouting/>
    )
}