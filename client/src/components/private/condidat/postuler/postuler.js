import React ,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
//import { registerValidation } from '../../helper/validate';
import convertToBase64 from '../../../../helper/convert';
import { ajoutPostule } from './helperPostuler'
import { PostuleValidation } from './helperPostuler'
import SidebarCandidat from '../../../layout/sidebarCondidat';

import Header from '../../../layout/header';
import { FaEnvelope, FaLock, FaReact, FaUser } from "react-icons/fa";

import styles from '../../../../styles/Username.module.css';
import uploadCV from '../../../../assets/uploadCV.png'
import useFetch from '../../../../hooks/fetch.hook';
import { useParams } from 'react-router';
import useFetchoffre from './getOffre';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function Postuler() {

  const navigate = useNavigate()
  const [file, setFile] = useState()
  const [{ isLoading, apiData, serverError }] = useFetch();
  const { id } = useParams("");
  const [offre, setOffre] = useFetchoffre(id);
  const formik = useFormik({
    initialValues : {
      username: apiData?.username ||'',
      email: apiData?.email || '',
      file:''
    },
    enableReinitialize: true,
    validate : PostuleValidation,
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit : async values => {
      values = await Object.assign({cv: file || ''},{user:apiData?._id},{offre:offre?._id})
      if(!file)
      {toast.error('Upload CV Required...!');}
      else{
        let registerPromise = ajoutPostule(values)
      
        toast.promise(registerPromise, {
          success:<b>Start Quiz</b>,
          error : <b>Vous avez déjà postulé à ce poste</b>,
        });
        registerPromise.then(function(){ 
          navigate(`/candidat/quiz/${id}`)
        });
      }
      
      
    }
    
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  
  }

  return (
    <div className='displ flex'>
     <div>
    <SidebarCandidat/>
     </div>
     <div className='layout'>
     <Header/>
    
      <Toaster position='top-center' reverseOrder={false}></Toaster>
  <div className=" flex justify-center items-center  bg-white rounded-xl ">
    <div
      className="flex bg-blue  xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div>
      <div className="xl:ml-20 xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
        <form >
          <div className="flex flex-row items-center justify-center mb-4 mt-9">
            <p className=" text-3xl font-bold">Postuler à {offre?.Offrename}</p>
           
          </div>
          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p className="text-center font-semi mx-5 mb-0"><FaReact/></p>
          </div>

         
          
          <div className=" relative flex  items-center mb-3 ml-20">
          <FaUser className={styles.iconsRegister} size="15" color="gray" />
            <input
              type="text"
              className={styles.inputUsername}
              placeholder="Username"
              {...formik.getFieldProps('username')}
              required
            /> 
          </div>

          <div className="flex relative  items-center mb-3 ml-20">
            <FaEnvelope className={styles.iconsRegister} size="15" color="gray" />
            <input
              type="text"
              className={styles.inputUsername}
              placeholder="Email address"
              {...formik.getFieldProps('email')}
              required
            />
          </div>
          <div className='labelcv justify-center py-4'>
            <p className=' font-bold'>Upload your CV:</p>
          <label htmlFor="cv" >
                  <img src={file|| uploadCV }  alt="CV"/>
                </label>

                <input onChange={onUpload} type="file" id='cv' name='cv' />
   
            </div>
             
          
        </form>
      </div>
     
    </div>
    
   
  </div>
  <div className=" flex justify-center text-center lg:text-left">
            <button
             type='submit'
              className="btngoquiz"
              onClick={formik.handleSubmit}
            >
              Go to quiz <IconButton aria-label="share">
          <ArrowForwardIcon />
        </IconButton>
            </button>
            
          </div>  
  </div>
  

</div>

</div>
  )
}