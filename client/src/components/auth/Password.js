import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../../assets/avatar.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../../helper/validate'
import useFetch from '../../hooks/fetch.hook';
import { useAuthStore } from '../../store/store'
import { verifyPassword } from '../../helper/helper'
import styles from '../../styles/Username.module.css';

export default function Password() {

  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues : {
      password : 'admin@123'
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let loginPromise = verifyPassword({ username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        if (apiData?.accountType === "recruteur") {
          navigate("/recruteur/dashboard");
        } else if (apiData?.accountType === "candidat") {
          navigate("/candidat/dashboard");
        }
      })
      
    }
  })

  if(isLoading) return <h1 className='text-2xl text-center font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <section className=" container mx-auto flex justify-center mt-9">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
  <div className=" flex justify-center items-center  bg-white rounded-xl mt-16">
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
      <div className="xl:ml-20 xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-8 mt-12 ">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row items-center justify-center mb-4 mt-5">
            <p className=" text-3xl font-bold">Hello {apiData?.firstName || apiData?.username}</p>
           
          </div>
          <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} className="border-4 border-gray-100 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg hover:border-gray-200 focus:outline-none" type="text" placeholder='Password' />
                  <button className={styles.btn} type='submit'>Sign In</button>
          </div>
          <div className="text-center py-4">
                <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
           </div>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}