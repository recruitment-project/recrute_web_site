import React, {useState, useEffect, useContext } from 'react';
import Header from '../../layout/header';
import SidebarRecruteur from '../../layout/sidebarRecruteur';
import { useNavigate  } from 'react-router-dom';
import useFetch from '../../../hooks/fetch.hook';
import convertToBase64 from '../../../helper/convert';
import { updateUser } from '../../../helper/helper';
import { useFormik } from 'formik';
import jwt_decode from 'jwt-decode';

   import { profileValidation } from '../../../helper/validate';
import axios from 'axios';
import { toast } from 'react-hot-toast';
function Recruter(props) {
  const [getoffredata, setOffredata] = useState([]);
  console.log(getoffredata);
  const [getuserdata, setuserdata] = useState([]);
  console.log(getuserdata);
  const [search,setSearch]=useState('');
  console.log(search);
      const [file, setFile] = useState();
      const [{ isLoading, apiData, serverError }] = useFetch();
    
    
  
     
      
 
        const getdata = async () => {

      const token = localStorage.getItem('token')
         if(!token) return Promise.reject("Cannot find Token");
        let decode = jwt_decode(token)
              const res = await fetch(`http://localhost:8080/api/osd/${decode?.userId}`, {
                  method: "GET",
                 headers: {
                                        "Content-Type": "application/json"
                  }
              });
            const data = await res.json();
              console.log(data);
              if (res.status === 422 || !data) {
                  console.log("error ");
            } else {
                setOffredata(data)
                  console.log("get data");
              }
        };
   console.log("offre=>",getoffredata)
        useEffect(() => {
            getdata();
        }, [])
    // const getdatauser = async () => {
    // const token = localStorage.getItem('token')
    // if(!token) return Promise.reject("Cannot find Token");
  //     let decode = jwt_decode(token)
  //          const res = await fetch(`http://localhost:8080/api/getalldata/${decode?.offreId}`, {
  //              method: "GET",
  //              headers: {
  //                  "Content-Type": "application/json"
  //              }
  //          });
  //          const data = await res.json();
  //          console.log(data);
  //          if (res.status === 422 || !data) {
  //              console.log("error ");
  //         } else {
  //          setuserdata(data)
  //              console.log("get data");
  //          }
  //    };
  // console.log("datauser=>",getuserdata )
  //    useEffect(() => {
  //      getdatauser();
  //    }, [])


     const navigate = useNavigate();
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
    <>
     
    <div className='displ flex'>
    <div>
   <SidebarRecruteur/>
    </div>
    <div className='layout'>
    <Header/>
    <div className='cardMesoffre'>
    
    <div className='row mx-2'>
   


  
    <>
    {
    getoffredata.map((offre, key) => {
            return (
    <div className='cardrecut mt-10 col-5' key={offre._id}>
      <div className='mt-2 mb-2  mt-2  font' >{offre._id}</div>
      {
    offre.user_participee.map((user, key) => {
            return (
      <div className='row border' key={user.username}>
      
        <div className='col-2  mt-2'>
        <img src={ user.profile|| file } alt="avatar" className='imgprofile'/>
        </div>
        <div className="col-3  mt-2">
        <div className='mx-3 col-5'>{user.username}</div>

        </div>
        <div className='col-2  mt-2'>{user.score}
        </div>
        <div className='col-4'>
          <div className='row'>
          <div className='col-5 mt-2 '>
            <button className=' accepter'>accepte</button>   
            </div>
            <div className='col-5 mx-2'>
            <button className=' btnsupprimer'>refuse</button> 
            </div>

    </div>
    </div>



    </div>)})
    }
    
    
    
    
    
    
    
    </div>)})}
</>












    </div>





    </div>
    </div>
    
    
    </div>

      

     
      
      
      
      
   </>   
     
  )
}

export default Recruter