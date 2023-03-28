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
 
   import { profileValidation } from '../../../helper/validate';
   
 function MesOffre() {

    const [file, setFile] = useState();
    const [{ isLoading, apiData, serverError }] = useFetch();
  
  const [getoffredata, setOffredata] = useState([]);
  console.log(getoffredata);

  const { udata, setUdata } = useContext(adddata);

  const {updata, setUPdata} = useContext(updatedata);

  const {dltdata, setDLTdata} = useContext(deldata);

  const getdata = async () => {

      const res = await fetch(`http://localhost:8080/api/offreByUser/${userId}`, {
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
  }

  useEffect(() => {
      getdata();
  }, [])


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
    <div className='cardMesoffre '>
      <div className='flex flexajou'>
        <input type="text" placeholder='shearch' className='mx-12 mt-3' />
        <button type='submit' className=' ajou'  onClick={()=>navigate('/recruteur/stepper')}>Ajouter</button>
        </div>
        {
                                getoffredata.map((element, id) => {
                                    return (
                                        <>
    <div className='cardoffre'>

 <div className='flex'>
    <div className='flex m-3'>
      
      <div className=''><img src={ apiData?.profile || file ||avatar} alt="avatar" className='imgprofile'/></div>
      <div className='mx-3'>{element.fullName}</div>
    </div>
    <div className='mt-3'>
    <Badge bg="secondary mx-2" className='secondary'>{element.ITdomain}</Badge>
    <Badge bg="secondary mx-2"className='secondary'>{element.City}</Badge>
</div>
</div>
<div className='mx-5'>{element.Entreprisname}</div>
<div className='bold mx-3'>{element.Offrename}</div>
<div className='mx-3'>{element.ITdomain}</div>
<div className='flex  justify-content-end'>
 <NavLink to={`/recruteur/Details/${element._id}`}>  <button type='submit' className='btn2 ' onClick={()=>navigate('/recruteur/Details')}>Details</button></NavLink>
  <NavLink to={`/recruteur/stepper/${element._id}`}> <button type='submit'className='btn1 '  onClick={()=>navigate('/recruteur/stepper')}>Modifier</button></NavLink>
  <button type='submit'className='btnsupprimer'onClick={() => deleteoffre(element._id)} >Supprimer</button>



</div> 


                                        

    </div>
    </>
                                    )
                                })
                            }
      
      </div>
      </div>
     </div>
     </div></>
   )
 }

 export default MesOffre



 