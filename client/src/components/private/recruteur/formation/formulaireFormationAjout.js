import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../../../../hooks/fetch.hook';
import extend from '../../../../styles/Profile.module.css'
import image from '../../../../assets/imagedefault.png';
import styles from '../../../../styles/Username.module.css';
import convertToBase64 from '../../../../helper/convert';
import { ajoutFormation } from './helperFormation';
import { FormationValidation } from './helperFormation';
import SidebarRecruteur from '../../../layout/sidebarRecruteur.js';
import Header from '../../../layout/header.js';
function FormationFormAjout() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues : {
      title : '',
      description:'',
      date_start:  '',
      price: '',
      address : '',
      domaine : '',
      duree :  '',
      formator:'',
      
      
    },
     
     enableReinitialize: true,
    validate : FormationValidation,
     validateOnBlur: false,
     validateOnChange: false,
     onSubmit : async values => {
       values = await Object.assign(values, { image : file || ''},{user_cree:apiData?._id})
      
       let AjoutPromise = ajoutFormation(values);
       
       toast.promise(AjoutPromise, {
         loading: 'Loading...',
         success : <b>add Successfully...!</b>,
         error: <b>Could not add!</b>
       });
       AjoutPromise.then(function(){ 
        setTimeout(()=>navigate('/recruteur/mesformation'),100) 
      });
     }
   })

   
   //   /** formik doensn't support file upload so we need to create this handler */
   const onUpload = async e => {
     const base64 = await convertToBase64(e.target.files[0]);
     setFile(base64);
   }
   const [currentStep, updateCurrentStep] = useState(1);
   function updateStep(step) {
    updateCurrentStep(step);
    
  }
  let content;
  if (currentStep === 1) {
    content = (
      <div id="contentFormation" className='name w-3/4 gap-10'>
        <div className="name flex w-3/4 gap-10">
            <input  required {...formik.getFieldProps('title')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Title' />
             
            <input  required {...formik.getFieldProps('duree')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='durée' />
     
            </div>
            <div className="name flex w-3/4 gap-10" id='divsub'>
            
              <input required {...formik.getFieldProps('date_start')}  className={`${styles.textbox} ${extend.textbox}`} type="date" placeholder='Date to start' />
              <select required {...formik.getFieldProps('domaine')} className={`${styles.textbox} ${extend.textbox}`}>
            <option selected disabled  value="" >Domaine</option>
            <option value="INFORMATIQUE">INFORMATIQUE</option>
            <option value="SCIENCES">SCIENCES</option>
            <option value=" ÉLECTRONIQUE"> ÉLECTRONIQUE</option>
            <option value="SANTÉ">SANTÉ</option>
            <option value=" AGRICULTURE"> AGRICULTURE</option>
            <option value="ARTS">ARTS</option>
            <option value="COMMUNICATION">COMMUNICATION</option>
            <option value=" LETTRES"> LETTRES</option>
            <option value="BANQUE">BANQUE</option>
            <option value="ASSURANCES ET RH">ASSURANCES ET RH</option>
            <option value="COMMERCEET GESTION">COMMERCEET GESTION</option>
            <option value="ENSEIGNEMENT ET RECHERCHE">ENSEIGNEMENT ET RECHERCHE</option>
            <option value="TOURISMEET "> TOURISMEET</option>
            <option value="MODEET BEAUTÉ">MODEET BEAUTÉ</option>
            <option value="BTP">BTP</option>
            <option value=" AUTRES DOMAINES"> AUTRE DOMAINES</option>
          </select>
            </div>

      </div>
    );
  } else if (currentStep === 2) {
    content = (
      <div id="contentFormation" className="name w-3/4 gap-10">
        
        <div className="name flex w-3/4 gap-10">
              <input {...formik.getFieldProps('price')} className={`${styles.textbox} ${extend.textbox}`} type="number" placeholder='Price' />
              <input {...formik.getFieldProps('formator')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Formator' />
            </div>
            <div className="name flex w-3/4 gap-10" id='divsub'>
            <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' />
             
      </div>
      </div>
    );
  } else {
    content = (
      <div className="name flex w-3/4 gap-10"> 
       <label htmlFor="image"  className=''>
          <img src={file || image} alt="avatar" className='img-circle'/>
          <input onChange={onUpload} type="file" id='image' name='image' />
        </label> 
        <textarea {...formik.getFieldProps('description')} className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Description' />
      </div>
    );
    
  }
  return (
    <div className='displ flex'>
    <div>
   <SidebarRecruteur/>
    </div>
    <div className='layout'>
    <Header/>
   
    <div className='cardformation'>
    <div className="cardTitle">
            <p id='textF' className=" text-3xl font-bold">Add Formation</p>
           
      </div>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div>
    
    
    
      <form className='py-1 mt-12' onSubmit={formik.handleSubmit}>
        <div  className="textbox flex flex-col items-center gap-6">
       
            {content}
        
            
             
        
          </div> 
          
      
      </form>
       
      {currentStep!== 1 && (
        
      <button className="buttonback" disabled={currentStep === 1} onClick={() => updateStep(currentStep - 1)}> Back </button>
   
      )}
      {currentStep===1 &&(
       
       <button className="buttonNext" disabled={currentStep === 3} onClick={() => updateStep(currentStep + 1)}>Next</button>
     
       )}
      {currentStep===2 &&(
       
      <button className="buttonNext2" disabled={currentStep === 3} onClick={() => updateStep(currentStep + 1)}>Next</button>
    
      )}
      {currentStep!==3 &&(
        
        <button className="buttonsubmit" onClick={formik.handleSubmit} type='submit' >Add Formation</button>
      
        )}
      {currentStep===3 &&(
        
      <button className="buttonsubmit2" onClick={formik.handleSubmit} type='submit' >Add Formation</button>
    
      )}
    </div>
    
    </div>
    </div>
    </div>
  )
}

export default FormationFormAjout