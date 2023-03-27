import React ,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import { registerUser } from '../../helper/helper'
import avatar from '../../assets/avatar.png'
import { FaEnvelope, FaLock, FaReact, FaUser } from "react-icons/fa";
import { SiReactos} from "react-icons"
import styles from '../../styles/Username.module.css';
import register from '../../assets/register.jpg'

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
      className="flex bg-blue  xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div
        className="grow-0  shrink-1 md:shrink-0 basis-auto xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 "
      >
        <img
          src={register}
          className="w-full "
          alt="Sample image"
        />
      </div>
      <div className="xl:ml-20 xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row items-center justify-center mb-4 mt-9">
            <p className=" text-3xl font-bold">Sign up with</p>
           
          </div>
          <div
            className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p className="text-center font-semi mx-5 mb-0"><FaReact/></p>
          </div>

          <div className='profile flex justify-center py-4'>
                 <label htmlFor="profile" >
                  <img src={file || avatar} className={styles.profile_img} alt="avatar"/>
                </label>

                <input onChange={onUpload} type="file" id='profile' name='profile' />
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

         
          <div className=" relative flex  items-center ml-20 mb-6">
             <FaLock className={styles.iconsRegister} size="15" color="gray" />
            <input
              type="password"
              className={styles.inputUsername}
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
           &nbsp;&nbsp;&nbsp;

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
              className=" border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center ml-2"
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