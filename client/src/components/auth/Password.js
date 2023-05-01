import React , { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../../assets/avatar.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../../helper/validate'
import useFetch from '../../hooks/fetch.hook';
import { useAuthStore } from '../../store/store'
import { verifyPassword } from '../../helper/helper'
import styles from '../../styles/Username.module.css';
import {AiFillEye, AiFillEyeInvisible,AiFillLock} from "react-icons/ai";
export default function Password() {

  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
  const [show, setShow] = useState(false)
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
      
    },

  })
  const handleShow =()=>{
    setShow(!show)
  }
  if(isLoading) return <h1 className='text-2xl text-center font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <section className={styles.container} style={{width:"70rem" , marginLeft:"10%", borderRadius:"15px"}}>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
  <div className=" flex justify-center items-center  bg-white rounded-xl mt-16" style={{width:"70rem"}}>
    <div
      className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"

      style={{width:"70rem"}}
    >
      <div
        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0"
        style={{width:"30rem", height:"25rem"}}
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full"
          alt="Sample image"
          style={{width:"100%", height:"100%",marginLeft:"20%"}}
        />
      </div>
      <div className="xl:ml-20 xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-8 mt-12 ">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row items-center justify-center mb-4 mt-5">
            <p className=" text-3xl font-bold">Hello {apiData?.firstName || apiData?.username}</p>
          </div>
          <div className="textbox  relative flex flex-col items-center gap-6 mb-3">
            Enter your password
          </div>
            <div className="  relative  flex justify-center text-center lg:text-left gap-6 mb-3">
        
                  <label>
                  <label  onClick={handleShow}>{show? <AiFillEye className={styles.iconsPassword} size="25" color="gray"/> : <AiFillEyeInvisible className={styles.iconsPassword} size="25" color="gray"/>}</label>
                  <input {...formik.getFieldProps('password')}
                  className="border-4 border-gray-100 px-5 py-4 rounded-xl w-2/2 shadow-sm text-lg hover:border-gray-200 focus:outline-none"
                  style={{width:"25rem"}}
                  required type={show?"text" : "password"} placeholder='Password' />
                 
                  </label>
                 
            </div>
            <div className=" flex justify-center text-center lg:text-left ml-12">
            <button
             type='submit'
             className=" border bg-indigo-500 w-2/3 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center mr-10"
             style={{width:"25rem"}}
            >
              Sign In
            </button>
            
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