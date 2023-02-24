import React, { useEffect ,useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../../helper/validate'
import { resetPassword } from '../../helper/helper'
import { useAuthStore } from '../../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../../hooks/fetch.hook'

import styles from '../../styles/Username.module.css';

export default function Reset() {

  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')

  const formik = useFormik({
    initialValues : {
      password : 'admin@123',
      confirm_pwd: 'admin@123'
    },
    validate : resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error : <b>Could not Reset!</b>
      });

      resetPromise.then(function(){ navigate('/password') })

    }
  })


  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    
    <section className=" container mx-auto flex justify-center mt-9">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
  <div className=" flex justify-center items-center  bg-white rounded-xl ">
    <div
      className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div
        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0"
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full"
          alt="Sample image"
        />
      </div>
      

<Toaster position='top-center' reverseOrder={false}></Toaster>

<div className="xl:ml-20 xl:w-6/12 lg:w-5/6 md:w-9/12 mb-12 md:mb-0">
      <div className="title flex flex-col items-center mt-12">
      <h4 className='text-4xl font-bold'>Modifier votre mot de passe</h4>
      <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
        Entrer un  nouveau mot de passe.
      </span>
    </div>

    <form className='py-20' onSubmit={formik.handleSubmit}>
        <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New Password' />
            <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder='Repeat Password' />
            <button className={styles.btn} type='submit'>Modifier</button>
        </div>

    </form>

  </div>
</div>
</div>

</section>
  )
}