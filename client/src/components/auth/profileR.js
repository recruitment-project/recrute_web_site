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
  return(
    <div className='displ'>
    <div>  <SidebarRecruteur/></div>
    <div>
       <Header/>
       <div  className='flex'>
    <Card className='cardModif cards'>
    <div>
<div className='ml-20 mt-12'>General information</div>
<form className='py-1 mt-12'>
        <div className="textbox flex flex-col items-center gap-6">
            <div className="name flex w-3/4 gap-10">
            <input  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' />
              <input  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName' />
            </div>

            <div className="name flex w-3/4 gap-10">
              <input  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
              <input  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
            </div>
              <input  className={`${styles.textbox} ${extend.textbox}`}  type="text" placeholder='Address' />
              <button className={styles.btn}  type='submit'>Update</button>   
          </div> 
      </form>

</div>
      </Card>
      <Card className='cardprofile cards'>
        
      <div>
      <label htmlFor="profile">
      <img src={ avatar} alt="avatar" />
      </label> 
        </div>
        <div className='mx-24 px-12 mt-6 borb'>nom de profile</div>
       <div className='mx-24 px-12 mt-6 borb'> developpeur</div>
       <div className='mx-24 px-12 mt-6 borb'> mail</div>
       <div className='mx-24 px-12 mt-6 borb'> mobile </div>
        </Card></div>
    </div>
    </div>
 );} 