import React ,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import { registerUser } from '../../helper/helper'
import avatar from '../../assets/avatar.png'


import styles from '../../styles/Username.module.css';

export default function Register() {

  const navigate = useNavigate()
  const [file, setFile] = useState()
  const formik = useFormik({
    initialValues : {
      email: 'doyol56239@cnogs.com',
      username: 'example123',
      password : 'admin@123',
      accountType:'candidat'
    },
    validate : registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || ''})
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'please check your email to login...',
        success : <b>Register Successfully...!</b>,
        error : <b>Could not Register.</b>,
      });

      registerPromise.then(function(){ 
        navigate('/')
      });
      

      
    }
    
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <section className=" container mx-auto flex justify-center mt-2  mb-2">
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
      <div className="xl:ml-20 xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row items-center justify-center mb-4 mt-5">
            <p className=" text-3xl font-bold">Sign up with</p>
           
          </div>
          <div className='flex justify-center '>
          <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
            >
            
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                />
              </svg>
            </button>
          </div>
          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p className="text-center font-semibold mx-4 mb-0">Or</p>
          </div>

          <div className='profile flex justify-center py-4'>
                 <label htmlFor="profile" >
                  <img src={file || avatar} className={styles.profile_img} alt="avatar"/>
                </label>

                <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>
          <div className=" flex justify-center mb-3">
            <input
              type="text"
              className="border-4 border-gray-100 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg hover:border-gray-200 focus:outline-none"
              placeholder="Email address"
              {...formik.getFieldProps('email')}
              required
            />
          </div>
          <div className=" flex justify-center mb-3">
            <input
              type="text"
              className="border-4 border-gray-100 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg hover:border-gray-200 focus:outline-none"
              placeholder="Username"
              {...formik.getFieldProps('username')}
              required
            />
          </div>

         
          <div className=" flex justify-center mb-6">
            <input
              type="password"
              className="border-4 border-gray-100 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg hover:border-gray-200 focus:outline-none"
              placeholder="Password"
              {...formik.getFieldProps('password')}
              required
            />
          </div>
          <div className="flex justify-center mb-6">
            <div className='mr-5' >Vous êtes un(e): &nbsp;&nbsp;</div>
            
            <label>
                <input
                  type="radio"
                  {...formik.getFieldProps('accountType')}
                  value="recruteur"
                />
                Recruteur
              </label>
           
             <label>
            <input
              type="radio"
              {...formik.getFieldProps('accountType')}
              value="candidat"
            />
            Candidat
          </label>
        </div>
          <div className=" flex justify-center text-center lg:text-left">
            <button
             type='submit'
              className=" border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center"
            >
              Register
            </button>
            
          </div>
          <div className="flex justify-center py-4">
                <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login Now</Link></span>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
  )
}