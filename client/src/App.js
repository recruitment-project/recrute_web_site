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
import Details from './components/private/recruteur/detail';
import DashbordR from './components/private/recruteur/dashbord';
import ProfileR from './components/auth/profileR';
import Contact from './components/contact/contact';
import Conversion from "../src/components/conversion/Conversion";

// import Home from './components/home/home';
import Stepper from './components/private/recruteur/stepper';
import StepperModif from './components/private/recruteur/StepperModif';
import AjoutFormation from './components/private/recruteur/formation/formulaireFormationAjout';
import UpdateFormation from './components/private/recruteur/formation/formulaireFormationUpdate';
import MesFormation from './components/private/recruteur/mesFormation';
import Pc1 from './components/pages_conseil/page_conseil';
import P1 from './components/pages_conseil/page1';
import P2 from './components/pages_conseil/page2';
import P3 from './components/pages_conseil/page3';
import P4 from './components/pages_conseil/page4';
import P5 from './components/pages_conseil/page5';
import P6 from './components/pages_conseil/page6';
import P7 from './components/pages_conseil/page7';
import P8 from './components/pages_conseil/page8';
import P9 from './components/pages_conseil/page9';
import Detailsc from './components/private/condidat/details';
import Detailsoffre from './components/private/recruteur/detailsoffre';
import Postuler from './components/private/condidat/postuler/postuler';
import Quiz from './components/private/condidat/postuler/quiz';
import CV from './components/private/condidat/cv/cv';
import CVupdate from './components/private/condidat/cv/CVupdate';
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    
    {
        path :'/conversion',
        element : <Conversion></Conversion>
    },
   
    // {
    //     path : 'home',
    //     element : <Home></Home>
    // },
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
        path : '/recruteur/stepper',
        element : <Stepper></Stepper>
    },
    {
        path : '/recruteur/detailsOffre/:id',
        element : <Detailsoffre></Detailsoffre>
    },
    {
        path : '/recruteur/stepper/:id',
        element : <StepperModif></StepperModif>
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
        path : '/recruteur/Details/:id',
        element : <Details></Details>
    },
    {
        path : '/candidat/Details/:id',
        element : <Detailsc></Detailsc>
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
        path : '/recruteur/mesformation',
        element : <MesFormation></MesFormation>
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
        path : '/recruteur/formation/ajout',
        element : <AjoutFormation></AjoutFormation>
    },
    {
        path : '/recruteur/formation/update/:id',
        element : <UpdateFormation></UpdateFormation>
    },
    {
        path : '/candidat/postuler/:id',
        element : <Postuler></Postuler>
    },
    {
        path : '/candidat/quiz/:id',
        element : <Quiz></Quiz>
    },
    {
        path : '/candidat/cv',
        element : <CV></CV>
    },
    {
        path : '/candidat/cvUpdate/:id',
        element : <CVupdate></CVupdate>
    },
  
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
    {
        path : '/page_conseil',
        element : <Pc1></Pc1>
    },

    {
        path : '/page1',
        element : <P1></P1>
    },
    
    {
        path : '/page2',
        element : <P2></P2>
    },
    {
        path : '/page3',
        element : <P3></P3>
    },
    {
        path : '/page4',
        element : <P4></P4>
    },
    {
        path : '/page5',
        element : <P5></P5>
    },
    {
        path : '/page6',
        element : <P6></P6>
    },
    {
        path : '/page7',
        element : <P7></P7>
    },
    {
        path : '/page8',
        element : <P8></P8>
    },
    {
        path : '/page9',
        element : <P9></P9>
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