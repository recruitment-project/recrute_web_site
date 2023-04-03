import React, { useState } from 'react';

// importing material UI components

import {IoMdNotifications} from "react-icons/io";
import Card from 'react-bootstrap/Card';
import avatar from '../../assets/avatar.png';
import { useHistory,useNavigate , NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { profileValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import useFetch from '../../hooks/fetch.hook';
import { updateUser } from '../../helper/helper';

export default function Header() {
	
const [file, setFile] = useState();
const [{ isLoading, apiData, serverError }] = useFetch();
const navigate = useNavigate()
const formik = useFormik({
  initialValues : {
	firstName : apiData?.firstName || '',
	lastName: apiData?.lastName || '',
	username : apiData?.username || '',
  },
   
   enableReinitialize: true,
   validate : profileValidation,
   validateOnBlur: false,
   validateOnChange: false,
   onSubmit : async values => {
	 values = await Object.assign(values, { profile : file || apiData?.profile || ''})
	 let updatePromise = updateUser(values);

	

   }
 })
 
 if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
 if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

return (
	<div className='hide flex shadow cardshider'>
	{/* <Card.Header >  */}
	<div className='hid flex' >

        <div className='pro flex'>
        
           
           <div className='position flex mt-3'> 
		     <img src={ apiData?.profile || file ||avatar} alt="avatar" className='imgHed'/>
	       </div>

	   <div className='mt-3'>
		<input  disabled {...formik.getFieldProps('username')}  className="champProfile"  type="text" placeholder='username' /> </div>
		</div>
         
          
	  <div className='position flex'>
		  <div className='pro flex'>
		  <span class="badges badge-pill">1</span><IoMdNotifications /></div>
		  </div>
	</div>
	{/* </Card.Header> */}
  </div>
  

);
}


