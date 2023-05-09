import React ,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
//import { registerValidation } from '../../helper/validate';
import convertToBase64 from '../../../../helper/convert';
import { ajoutPostule } from './helperPostuler'
import { PostuleValidation } from './helperPostuler'
import SidebarCandidat from '../../../layout/sidebarCondidat';
import extend from '../../../../styles/Profile.module.css'
import Header from '../../../layout/header';
import { FaEnvelope, FaLock, FaReact, FaUser } from "react-icons/fa";

import styles from '../../../../styles/Username.module.css';
import CV from '../../../../assets/cv1.jpg'
import useFetch from '../../../../hooks/fetch.hook';
import { useParams } from 'react-router';
import useFetchoffre from './getOffre';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function Postuler() {

  const navigate = useNavigate()
  //const [file, setFile] = useState()
  const [{ isLoading, apiData, serverError }] = useFetch();
  const { id } = useParams("");
  const [offre, setOffre] = useFetchoffre(id);
  const formik = useFormik({
    initialValues : {
      lettreMotivation:''
    },
    enableReinitialize: true,
    validate : PostuleValidation,
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit : async values => {
      values = await Object.assign(values,{user:apiData?._id},{offre:offre?._id})
      
        let registerPromise = ajoutPostule(values)
      
        toast.promise(registerPromise, {
          success:<b>Start Quiz</b>,
          error : <b>Vous avez déjà postulé à ce poste</b>,
        });
        registerPromise.then(function(){ 
          navigate(`/candidat/quiz/${id}`)
        });
      
      
      
    }
    
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  
  }

  return (
  //   <div className='displ flex'>
  //    <div>
  //   <SidebarCandidat/>
  //    </div>
  //    <div className='layout'>
  //    <Header/>
    
  //     <Toaster position='top-center' reverseOrder={false}></Toaster>
  // <div className=" flex justify-center items-center  bg-white rounded-xl ">
  //   <div
  //     className="flex bg-blue  xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
  //   >
  //     <div>
  //     <div className="xl:ml-20 xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
  //       <form >
  //         <div className="flex flex-row items-center justify-center mb-4 mt-9">
            
  //           <p id='titlePostule' className=" text-3xl font-bold">Postuler à {offre?.Offrename}</p>
            
  //         </div>
          

         
          
          // <div className=" relative flex  items-center mb-3 ml-20">
          //   <input disabled
          //     type="text"
          //     className="champProfile mb-2"
          //     placeholder="Username"
          //     {...formik.getFieldProps('username')}
          //     required
          //   /> 
          // </div> 

          // <div className="flex relative  items-center mb-3 ml-20">
          //   <FaEnvelope className={styles.iconsRegister} size="15" color="gray" />
          //   <input
          //     type="text"
          //     className={styles.inputUsername}
          //     placeholder="Email address"
          //     {...formik.getFieldProps('email')}
          //     required
          //   />
          // </div> 
      //     <div className='labelcv justify-center py-4'>
      //     <div className="name flex w-3/4 gap-10"> 
       
      //   <textarea  className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Description' />
      // </div>
      //     <label htmlFor="cv" >
      //             <img src={file|| uploadCV }  alt="CV"/>
      //           </label>

      //           <input onChange={onUpload} type="file" id='cv' name='cv' />
   
      //       </div>
             
          
//         </form>
//       </div>
     
//     </div>
    
   
//   </div>
  // <div className=" flex justify-center text-center lg:text-left">
  //           <button
  //            type='submit'
  //             className="btngoquiz"
  //             onClick={formik.handleSubmit}
  //           >
  //             Go to quiz <IconButton aria-label="share">
  //         <ArrowForwardIcon />
  //       </IconButton>
  //           </button>
            
  //         </div>  
//   </div>
  

// </div>

// </div>
<div className='displ flex'>
    <div>
   <SidebarCandidat/>
    </div>
    <div className='layout'>
    <Header/>
   
    <div className='cardpostule'>
    
            <p id='titlePostule' className=" text-4xl font-bold">Postuler à {offre?.Offrename}</p>
           
      
    <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div>
      
    <div className='labelcv justify-center py-4'>
    <form >
    <div  className="textbox flex flex-col items-center gap-6">
        
    <div className="name flex w-3/4 gap-10">
        <textarea id="textareap" {...formik.getFieldProps('lettreMotivation')}  className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Lettre de Motivation' />
     
      
       <p className=' font-bold'>View your CV:</p>
            <img src={CV }  alt="CV" onClick={()=>navigate(`/candidat/cvUpdate/${apiData?._id}`)}/>
           
        </div>
      </div>
      </form >
            </div>
            <div className=" flex justify-center text-center lg:text-left">
            <button
             type='submit'
              className="btngoquiz"
              onClick={formik.handleSubmit}
            >
              Postuler<IconButton aria-label="share">
          <ArrowForwardIcon />
        </IconButton>
            </button>
            
          </div>  
    
      </div>
    </div>
    </div>
    </div>
  )
}