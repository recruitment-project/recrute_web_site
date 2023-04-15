import React,{useState, useEffect, useContext } from 'react';
import Header from '../../layout/header';
import SidebarRecruteur from '../../layout/sidebarRecruteur';
import Badge from 'react-bootstrap/Badge';
import { useNavigate  } from 'react-router-dom';

import { updatedata } from './contextProvider'; 
import { NavLink } from 'react-router-dom';
import useFetch from '../../../hooks/fetch.hook';
import convertToBase64 from '../../../helper/convert';
//const [search, setSearch] = useState('');

//console.log(search);
   //const navigate = useNavigate();
  
   import { updateUser } from '../../../helper/helper';
   import { useFormik } from 'formik';
   import jwt_decode from 'jwt-decode';
   import { profileValidation } from '../../../helper/validate';
import axios from 'axios';
import { toast } from 'react-hot-toast';

 function OffreR() {
const [search,setSearch]=useState('');
console.log(search);
    const [file, setFile] = useState();
    const [{ isLoading, apiData, serverError }] = useFetch();
  
  const [getoffredata, setOffredata] = useState([]);
  console.log(getoffredata);

  
   const getdata = async () => {

         const res = await fetch(`http://localhost:8080/api/getdata`, {
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
console.log("data=>",getoffredata)
   useEffect(() => {
       getdata();
   }, [])


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
     <div  className='flex c'>
    <div className='cardMesoffre '>
      <div className='flex flexajou'>
        <input type="text" placeholder='shearch' className='mx-4 mt-3 formcontrolinput' onChange={(e)=>setSearch(e.target.value)} />
        
        </div>
        <div className='row'>
    {

        getoffredata.filter((element)=>{
            return search.toLowerCase()===""?element:element.ITdomain.toLowerCase().includes(search);
        }).map((element, id) => {
            return (
    <>
    <div className='cardoffre col-5' key={element.id}>

 <div className='flex'>
    <div className='flex m-3'>
      
      <div className=''><img src={ element.user_cre.profile || file } alt="avatar" className='imgprofile'/></div>
      <div className='mx-3'>{element.user_cre.firstName}</div>
    </div>
    <div className='mt-3'>
    <Badge bg="secondary mx-2" className='secondary pt-2'>{element.ITdomain}</Badge>
    <Badge bg="secondary mx-2"className='secondary pt-2'>{element.City}</Badge>
</div>
</div>
<div className='mx-3'>{element.Entreprisname}</div>
<div className='bold mx-3'>{element.Offrename}</div>
<div className='mx-3'>{element.ITdomain}</div>
<div className='mx-3'>{element.MiniDescription.slice(0,200)}...</div>
<div className='flex  justify-content-end'>
 <NavLink to={`/recruteur/detailsOffre/${element._id}`}>  <button type='submit' className='btn2 ' onClick={()=>navigate('/recruteur/detailsOffre')}>Details</button></NavLink>
  <NavLink to={`/recruteur/postuler/${element._id}`}> <button type='submit'className='btn1 '  onClick={()=>navigate('/recruteur/postuler')}>postuler</button></NavLink>
  
</div> 
    </div>
    </>
 )
})
}</div>
      
      </div>
      </div>
     </div>
     </div></>
   )
 }

export default OffreR