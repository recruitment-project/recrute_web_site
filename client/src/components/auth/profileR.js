import React, { useState } from 'react'
import avatar from '../../assets/avatar.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import useFetch from '../../hooks/fetch.hook';
import { updateUser } from '../../helper/helper'
import { useNavigate } from 'react-router-dom'
import SidebarRecruteur from '../layout/sidebarRecruteur';
import styles from '../../styles/Username.module.css';
import extend from '../../styles/Profile.module.css'
import Header from '../layout/header';
import Card from 'react-bootstrap/Card';

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
      address : apiData?.address || ''
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
   //if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return(
    <div className='displ'>
    <div>  <SidebarRecruteur/></div>
    <div>
       <Header/>
       <div  className='flex'>
    <Card className='cardModif cards'>
    <div>
    <div className='ml-20 mt-12'>General information</div>
      <form className='py-1 mt-12' onSubmit={formik.handleSubmit}>
        <div className="textbox flex flex-col items-center gap-6">
            <div className="name flex w-3/4 gap-10">
            <input   {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' />
              <input {...formik.getFieldProps('lastName')}  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName' />
            </div>

            <div className="name flex w-3/4 gap-10">
              <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
              <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
            </div>
              <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Address' />
              <button className={styles.btn}  type='submit'>Update</button>   
          </div> 
      </form>

    </div>
    </Card>
    <Card className='cardprofile cards '>
    <div className='flex justify-center items-center'>
        <label htmlFor="profile"  className=''>
          <img src={ apiData?.profile || file ||avatar} alt="avatar" className='img-circle'/>
          <input onChange={onUpload} type="file" id='profile' name='profile' />
        </label> 
      </div>
    </Card>

  </div>
</div>
</div>
 );} 