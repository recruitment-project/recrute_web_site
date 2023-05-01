import React ,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../../helper/validate';
import {useAuthStore} from '../../store/store'
import { FaReact, FaUser } from 'react-icons/fa';
import "../../styles/Username.module.css";
export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);


  const formik = useFormik({
    initialValues : {
      username : 'example123'
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })
  
  return (
    <section className="container">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
  <div className=" flex justify-center items-center  bg-white rounded-xl mt-8" style={{width:"70rem", marginLeft:"5%", height:"35rem"}}>
    <div
      className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 w-full"
      style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px"}}
    >
      <div
        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0"
        style={{width:"30rem", height:"20rem"}}
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img"
          style={{width:"100%", height:"100%"}}
          alt="Sample image"
          
        />
      </div>
      <div className=" flex xl:ml-20 xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-8 mt-12 " style={{justifyContent:"center", alignItems:"center"}}>
        <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row items-center justify-center mb-4 mt-9">
            <p className=" text-3xl font-bold">Sign up with</p>
        </div>
          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p className="text-center font-semi mx-5 mb-0"><FaReact/></p>
          </div>
          <div className=" relative  flex justify-center text-center lg:text-left mb-3">
          <label> <FaUser className='absolute pl-4 pointer-events-none mt-4 ' size="40" color="gray" />
            <input
              type="text"
              className="border-4 border-gray-100 px-5 py-4 rounded-xl w-2/2 shadow-sm text-lg hover:border-gray-200 focus:outline-none"
              placeholder="Username"
              {...formik.getFieldProps('username')}
              style={{width:"25rem"}}
              required
            />
            </label> 
            </div>
          <div className=" flex justify-center text-center lg:text-left ml-12">
            <button
             type='submit'
              className=" border bg-indigo-500 w-2/3 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center mr-10"
              style={{width:"25rem"}}
            >
              Login
            </button>
            
          </div>
          <div className="flex justify-center py-4 mr-10">
                <span className='text-gray-500'>Not a member? <Link className='text-red-500' to="/register">Register Now</Link></span>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}