import React,{useState, useEffect, useContext } from 'react';
import Header from '../../layout/header';
import SidebarRecruteur from '../../layout/sidebarRecruteur';
import Badge from 'react-bootstrap/Badge';
import { useNavigate  } from 'react-router-dom';
import { adddata, deldata } from './contextProvider'; 
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
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
 function MesOffre() {
const [search,setSearch]=useState('');
console.log(search);
    const [file, setFile] = useState();
    const [{ isLoading, apiData, serverError }] = useFetch();
  
  const [getoffredata, setOffredata] = useState([]);
  console.log(getoffredata);

  const { udata, setUdata } = useContext(adddata);

  const {updata, setUPdata} = useContext(updatedata);

  const {dltdata, setDLTdata} = useContext(deldata);

   const getdata = async () => {
//  const res = await axios.get(`http://localhost:8080/api/getdata`);
//  const data = await res.json();
//  if (res.status===422){
//      x=setOffredata(res.getoffredata);
//      console.log(x);
//      console.log("error ");
//  }
 const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
         const res = await fetch(`http://localhost:8080/api/offreByUser/${decode?.userId}`, {
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

const onDelite= async (id)=>{
    if( window.confirm("are you sure that you wanted to delete that offre record")){
      const  res= await axios.delete(`http://localhost:8080/api/offre/${id}`);
        //const response= await axios.delete(`http://localhost:8080/api/offre/${id}`
       // );
        if (res.status===200){
            toast.success("deleted");
            getdata();
        }
    }
}
   const deleteoffre = async (id) => {

     const res2 = await fetch(`http://localhost:8080/api/deleteoffre/${id}`, {
         method: "DELETE",
         headers: {
             "Content-Type": "application/json"
         }
     });

     const deletedata = await res2.json();
     console.log(deletedata);

     if (res2.status === 422 || !deletedata) {
         console.log("error");
     } else {
         console.log("offre deleted");
         x=setDLTdata(deletedata)
         console.log(x);
         getdata();
     }

 }
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
    {
        udata ?
            <>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{udata.Offrename}</strong>  added succesfully!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </> : ""
    }
    {
        updata ?
            <>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{updata.Offrename}</strong>  updated succesfully!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </> : ""
    }
  
    {
        dltdata ?
            <>
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{dltdata.Offrename}</strong>  deleted succesfully!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </> : ""
    }
     <div className='displ flex'>
     <div>
    <SidebarRecruteur/>
     </div>
     <div className='layout'>
     <Header/>
     <div  className='flex c'>
    <div className='cardMesoffre  '>
      <div className='flex flexajou'>
        <input type="text" placeholder='shearch' className='mx-4 mt-3 formcontrolinput' onChange={(e)=>setSearch(e.target.value)} />
        <button type='submit' className='  ajou'  onClick={()=>navigate('/recruteur/stepper')}>Ajouter</button>
        </div>
        <div className='row'>
    {
       
        getoffredata.filter((element)=>{
            return search.toLowerCase()===""?element:element.ITdomain.toLowerCase().includes(search);
        }).map((element, id) => {
            return (
    
     
    <div className='cardoffre col-5 ' key={element.id}>

 <div className='flex'>
    <div className='flex m-3'>
      
      <div className=''><img src={ apiData?.profile || file } alt="avatar" className='imgprofile'/></div>
      <div className='mx-3'>{apiData?.firstName}</div>
    </div>
    <div className='mt-3'>
    <Badge bg="secondary mx-2" className='secondary pt-2'>{element.ITdomain}</Badge>
    <Badge bg="secondary mx-2"className='secondary pt-2'>{element.City}</Badge>
</div>
</div>
<div className='mx-3'>{element.Entreprisname}</div>
<div className='bold mx-3'>{element.Offrename}</div>
<div className='mx-3'>{element.ITdomain}</div>
<div className='mx-3 over'>{element.MiniDescription.slice(0,200)}...</div>
<div className='flex  justify-content-end mb-3'>
 <NavLink to={`/recruteur/Details/${element._id}`}>  <button type='submit' className='btn2 ' onClick={()=>navigate('/recruteur/Details')}>Details</button></NavLink>
  <NavLink to={`/recruteur/stepper/${element._id}`}> <button type='submit'className='btn1 '  onClick={()=>navigate('/recruteur/stepper')}>Modifier</button></NavLink>
  <button className='btnsupprimer'onClick={() => onDelite(element._id)} >Supprimer</button>
</div> 
    </div>
    
 )
})
}</div>
      
      </div>
      </div>
     </div>
     </div></>
   )
 }

 export default MesOffre



 