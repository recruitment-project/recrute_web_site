import React, { useState } from 'react'
import avatar from '../../assets/avatar.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import useFetch from '../../hooks/fetch.hook';
import { updateUser } from '../../helper/helper'
import { useNavigate } from 'react-router-dom';
import SidebarRecruteur from '../layout/sidebarRecruteur';
import styles from '../../styles/Username.module.css';
import extend from '../../styles/Profile.module.css'
import Header from '../layout/header';

export default function ProfileR() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || '',
      EntrepriseName : apiData?.EntrepriseName || '',
      job : apiData?.job || '',
      username : apiData?.username || '',
    },
     
     enableReinitialize: true,
     validate : profileValidation,
     validateOnBlur: false,
     validateOnChange: false,
     onSubmit : async values => {
       values = await Object.assign(values, { profile : file || apiData?.profile || ''})
       let updatePromise = updateUser(values);

       toast.promise(updatePromise, {
         loading: 'Updating...',
         success : <b>Update Successfully...!</b>,
         error: <b>Could not Update!</b>
       });

     }
   })
   //   /** formik doensn't support file upload so we need to create this handler */
   const onUpload = async e => {
     const base64 = await convertToBase64(e.target.files[0]);
     setFile(base64);
   }
   if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
   if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return(
    <div className='displ flex'>
    <div>  <SidebarRecruteur/></div>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className='layout'>
       <Header/>
       <div  className='flex '>
          <div className='cardModif '>
          <div>
          <div className='ml-20 mt-12 famly-layout'>General information</div>
            <form className='py-1 mt-12' onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                  <div className="name flex w-3/4 gap-10">
                  <input   {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' />
                    <input {...formik.getFieldProps('lastName')}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName' />
                  </div>
                  <div className="name flex w-3/4 gap-10">
                  <input   {...formik.getFieldProps('job')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='job' />
                    <input {...formik.getFieldProps('username')}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='username' />
                  </div>
                  <div className="name flex w-3/4 gap-10">
                    <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
                    <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
                  </div>
                  <input {...formik.getFieldProps('EntrepriseName')} className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='EntrepriseName' />
                    <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Address' />
                    <button className={styles.btn}  type='submit'>Update</button>   
                </div> 
            </form>

          </div>
    </div>

    <div className='cardprofile '  >
        <div className='flex justify-center items-center'>
        <label htmlFor="profile"  className=''>
          <img src={ apiData?.profile || file ||avatar} alt="avatar" className='img-circle'/>
          <input onChange={onUpload} type="file" id='profile' name='profile' />
        </label> 
      </div>
          <div className='mx-17 px-10 mt-6 borb' ><label className=' famly-layout'>Fullname</label> 
          <div className='flex'>
          <input  disabled {...formik.getFieldProps('firstName')}  className="champProfile w"  type="text" placeholder='fullname' />
          <input  disabled  {...formik.getFieldProps('lastName')} className="champProfile"  type="text" placeholder='fullname' /></div>
          </div>
         <div className='mx-17 px-10 mt-6 borb' >
          <label className='mb-2  famly-layout'>Username</label>
          <input  disabled {...formik.getFieldProps('username')}  className="champProfile"  type="text" placeholder='username' /> </div>
         <div className='mx-17 px-10 mt-6 borb'> 
         <label className='mb-2  famly-layout'>Job</label> <br></br>
         <input  disabled {...formik.getFieldProps('job')}  className="champProfile"  type="text" placeholder='job' /></div>
         <div className='mx-17 px-10 mt-6 borb'>
           <label className='mb-2 famly-layout'>E-mail</label><br></br>
           <input  disabled {...formik.getFieldProps('email')}  className="champProfile mb-2"  type="text" placeholder='email' /> </div>
        </div>
  </div>
</div>
</div>
 );} 