import React , { useContext, useState,useEffect} from 'react'
import StepNavigation from './formulaire';
import Header from '../../layout/header';
import { useNavigate  } from 'react-router-dom';
import { Quiz } from '@mui/icons-material';
import { StepperContext } from './formulaire'; 
import SidebarRecruteur from '../../layout/sidebarRecruteur';
import toast, { Toaster } from 'react-hot-toast';
  import { useFormik } from 'formik';
  import useFetch from '../../../hooks/fetch.hook';
  import convertToBase64 from '../../../helper/convert';
  import { ajoutoffre } from '../../../helper/helper';
  import { OffreValidation } from '../../../helper/helper';
export default function Stepper(){

  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
 // const navigate = useNavigate()
  const formik = useFormik({
    initialValues : {
      Entreprisname:"",
      Offrename:"",
      ITdomain:"",
      City:"",
      MiniDescription:"",
       DescriptionDetail:"",
       Competance:"",
       Temp:"",
       questions: [{
        question: '',
        options0: '',
        options1: '',
        options2: '',
        correctAnswer: '',
      }]
    },
     
     enableReinitialize: true,
    validate : OffreValidation,
     validateOnBlur: false,
     validateOnChange: false,
     onSubmit : async values => {
       values = await Object.assign(values, { image : file || ''},{user_cre:apiData?._id})
      
       let AjoutPromise = ajoutoffre(values);
       
       toast.promise(AjoutPromise, {
         loading: 'Loading...',
         success : <b>add Successfully...!</b>,
         error: <b>Could not add!</b>
       });
       AjoutPromise.then(function(){ 
        setTimeout( ()=>navigate("/recruteur/mesOffre"),100)
      });
     }
   })

     //   /** formik doensn't support file upload so we need to create this handler */
     const onUpload = async e => {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    }
//   const { udata, setUdata } = useContext(adddata);
//   const {updata, setUPdata} = useContext(updatedata);
//   const { id } = useParams("");
//   console.log(id);

//   const [inpval,setINP]=useState({
//     Entreprisname:"",
//     Offrename:"",
//     ITdomain:"",
//     City:"",
//     MiniDescription:"",
//     DescriptionDetail:"",
//   })
// const setdata = (e)=>{
//   console.log(e.target.value);
//   const {name, value}=e.target;
//   setINP((preval)=>{
//     return{
//       ...preval,
//       [name]:value
//     }
//   })
// }
// const addinpdata = async (e) => {
//   e.preventDefault();

//   const { Entreprisname, Offrename,ITdomain,City, MiniDescription, DescriptionDetail } = inpval;

//   const res = await fetch("http://localhost:8080/api/addoffre", {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         Entreprisname, Offrename,ITdomain,City, MiniDescription, DescriptionDetail
//       })
//   });
//   const data = await res.json();
//   console.log(data);

//   if (res.status === 422 || !data) {
//       console.log("error ");
//       alert("error");

//   } else {
//       navigate("/recruteur/mesOffre")
//       setUdata(data)
//       console.log("data added");

//   }
// }




// const getdata = async () => {

//   const res = await fetch(`http://localhost:8080/api/getuser/${id}`, {
//       method: "GET",
//       headers: {
//           "Content-Type": "application/json"
//       }
//   });

//   const data = await res.json();
//   console.log(data);

//   if (res.status === 422 || !data) {
//       console.log("error ");

//   } else {
//       setINP(data)
//       console.log("get data");

//   }
// }

// useEffect(() => {
//   getdata();
// }, []);


// const updateuser = async(e)=>{
//   e.preventDefault();

//   const {  Entreprisname, Offrename,ITdomain,City, MiniDescription, DescriptionDetail} = inpval;

//   const res2 = await fetch(`http://localhost:8080/api/updateuser/${id}`,{
//       method: "PATCH",
//       headers: {
//           "Content-Type": "application/json"
//       },
//       body:JSON.stringify({
//         Entreprisname, Offrename,ITdomain,City, MiniDescription, DescriptionDetail
//       })
//   });

//   const data2 = await res2.json();
//   console.log(data2);

//   if(res2.status === 422 || !data2){
//       alert("fill the data");
//   }else{
//     navigate("/recruteur/mesOffre")
//       setUPdata(data2);
//   }

// }







  const displayStep=(step)=>{
    switch (step){
      case 1:
        return(<div  >
             <div  className='nb'>Note well: It is not possible to change the content of the quiz  </div>   
          <div class="mb-3 mt-10 ">
          
              <input type="text" className='formcontrol'  required {...formik.getFieldProps('Entreprisname')} placeholder="nom de l'entreprise" name="Entreprisname"/>
          </div>
          <div class="mb-3 mt-10">

              <input type="text" className="formcontrol"  placeholder="nom de l'offre" name="Offrename"   required {...formik.getFieldProps('Offrename')}/>
          </div>
          <div class="mb-3 mt-10">

              <input type="text" className="formcontrol"  placeholder="temp plein" name="Temp"   required {...formik.getFieldProps('Temp')}/>
          </div>
          <div class="mb-3 mt-10">
                    
                        <input type="text" className="formcontrol"  placeholder=" domaine de l'offre"   required {...formik.getFieldProps('ITdomain')}
                                 name="ITdomain" />
                    </div>
                    <div class="mb-3 mt-10">
                        <input type="text" className="formcontrol" placeholder=" Address"   required {...formik.getFieldProps('City')}
                                 name="City" />
                    </div>
          </div>);
        case 2:
          return(           
            
                  <div >
                    
                    <div  className='nb'>Note well: It is not possible to change the content of the quiz  </div>
                    <div class="mb-3 mt-10">
                        <input type="text" className="formcontrol" placeholder=" Competance"   required {...formik.getFieldProps('Competance')}
                                 name="Competance" />
                    </div>
                    <div class="mb-3 mt-10">
        
                    <input type="text" className="formcontrol" placeholder=" petite d'escription"   required {...formik.getFieldProps('MiniDescription')}
                           name="MiniDescription"  />
                </div>
                <div class="mb-3 mt-10">

                    {/* <input type="text" className="form-control " placeholder="description détaillée" oninput="this.className = ''"
                            name="address"/> */}
                            <textarea id="story" name="DescriptionDetail" className="formcontrol " placeholder="description détaillée"  required {...formik.getFieldProps('DescriptionDetail')}
           rows="7" cols="33"></textarea>
                </div>
                    </div>);
           
                case 3:
                  return( <div >
                     <div  className='nb'>Note well: It is not possible to change the content of the quiz  </div>
                    <div class="mb-3 mt-10">
            
                        <input type="text" className="formcontrol" placeholder=" Q1"   required {...formik.getFieldProps(`questions[${0}].question`)}
                               name={`questions[${0}].question`}  />
                    </div>
                    <div class="mb-3 mt-10">
                    <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${0}].options0`)}
                               name={`questions[${0}].options0`}  />
                      
                    </div>
                    <div class="mb-3 mt-10">
                    <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${0}].options1`)}
                               name={`questions[${0}].options1`}  />
                      
                    </div>
                    <div class="mb-3 mt-10">
                    <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${0}].options2`)}
                               name={`questions[${0}].options2`}  />
                      
                    </div>
                    <div class="mb-3 mt-10">
                    <input type="text" className="formcontrol" placeholder=" correct op"   required {...formik.getFieldProps(`questions[${0}].correctAnswer`)}
                               name={`questions[${0}].correctAnswer`}  />
                      
                    </div>
                    </div>);
                    case 4:
                      return( <div >
                         <div  className='nb'>Note well: It is not possible to change the content of the quiz  </div>
                        <div class="mb-3 mt-10">
                
                            <input type="text" className="formcontrol" placeholder="Q2"   required {...formik.getFieldProps(`questions[${1}].question`)}
                                   name={`questions[${1}].question`}  />
                        </div>
                        <div class="mb-3 mt-10">
                        <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${1}].options0`)}
                                   name={`questions[${1}].options0`}  />
                          
                        </div>
                        <div class="mb-3 mt-10">
                        <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${1}].options1`)}
                                   name={`questions[${1}].options1`}  />
                          
                        </div>
                        <div class="mb-3 mt-10">
                        <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${1}].options2`)}
                                   name={`questions[${1}].options2`}  />
                          
                        </div>
                        <div class="mb-3 mt-10">
                        <input type="text" className="formcontrol" placeholder=" correct op"   required {...formik.getFieldProps(`questions[${1}].correctAnswer`)}
                                   name={`questions[${1}].correctAnswer`}  />
                          
                        </div>
                       </div>);
                       case 5:
                        return( <div >
                           <div  className='nb'>Note well: It is not possible to change the content of the quiz  </div>
                          <div class="mb-3 mt-10">
                  
                              <input type="text" className="formcontrol" placeholder=" Q3"   required {...formik.getFieldProps(`questions[${2}].question`)}
                                     name={`questions[${2}].question`}  />
                          </div>
                          <div class="mb-3 mt-10">
                          <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${2}].options0`)}
                                     name={`questions[${2}].options0`}  />
                            
                          </div>
                          <div class="mb-3 mt-10">
                          <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${2}].options1`)}
                                     name={`questions[${2}].options1`}  />
                            
                          </div>
                          <div class="mb-3 mt-10">
                          <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${2}].options2`)}
                                     name={`questions[${2}].options2`}  />
                            
                          </div>
                          <div class="mb-3 mt-10">
                          <input type="text" className="formcontrol" placeholder=" correct op"   required {...formik.getFieldProps(`questions[${2}].correctAnswer`)}
                                     name={`questions[${2}].correctAnswer`}  />
                            
                          </div>
                         </div>);  
                         case 6:
                          return( <div >
                             <div  className='nb'>Note well: It is not possible to change the content of the quiz  </div>
                            <div class="mb-3 mt-10">
                    
                                <input type="text" className="formcontrol" placeholder=" Q4"   required {...formik.getFieldProps(`questions[${3}].question`)}
                                       name={`questions[${3}].question`}  />
                            </div>
                            <div class="mb-3 mt-10">
                            <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${3}].options0`)}
                                       name={`questions[${3}].options0`}  />
                              
                            </div>
                            <div class="mb-3 mt-10">
                            <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${3}].options1`)}
                                       name={`questions[${3}].options1`}  />
                              
                            </div>
                            <div class="mb-3 mt-10">
                            <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${3}].options2`)}
                                       name={`questions[${3}].options2`}  />
                              
                            </div>
                            
                            <div class="mb-3 mt-10">
                            <input type="text" className="formcontrol" placeholder=" correct op"   required {...formik.getFieldProps(`questions[${3}].correctAnswer`)}
                                       name={`questions[${3}].correctAnswer`}  />
                              
                            </div>
                           </div>); 
                              case 7:
                                return( <div >
                                   <div className='nb'>Note well: It is not possible to change the content of the quiz  </div>
                                  <div class="mb-3 mt-10">
                          
                                      <input type="text" className="formcontrol" placeholder=" Q4"   required {...formik.getFieldProps(`questions[${4}].question`)}
                                             name={`questions[${4}].question`}  />
                                  </div>
                                  <div class="mb-3 mt-10">
                                  <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${4}].options0`)}
                                             name={`questions[${4}].options0`}  />
                                    
                                  </div>
                                  <div class="mb-3 mt-10">
                                  <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${4}].options1`)}
                                             name={`questions[${4}].options1`}  />
                                    
                                  </div>
                                  <div class="mb-3 mt-10">
                                  <input type="text" className="formcontrol" placeholder=" op1"   required {...formik.getFieldProps(`questions[${4}].options2`)}
                                             name={`questions[${4}].options2`}  />
                                    
                                  </div>
                                  
                                  <div class="mb-3 mt-10">
                                  <input type="text" className="formcontrol" placeholder=" correct op"   required {...formik.getFieldProps(`questions[${4}].correctAnswer`)}
                                             name={`questions[${4}].correctAnswer`}  />
                                    
                                  </div>
                                 </div>); 
    }
  }
  const labelArray = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7']
  const [currentStep, updateCurrentStep] = useState(1);
 
  const handleChange = input => e => {
    this.setState({ [input]: e.target.currentStep });
  }
  function updateStep(step) {
    updateCurrentStep(step);
  }
    return(
      <>
   
 
        <div className='displ flex'>
        <div>
       <SidebarRecruteur/>
        </div>
        <div className='layout'>
    <Header/>
    <div className='cardMesoffre '>
    <div className="App">
      <StepNavigation labelArray={labelArray} currentStep={currentStep} updateStep={updateStep}></StepNavigation>
      <div className='borderformul'>

      <form className="upe-mutistep-form " id="Upemultistepsform" action="" >

             <StepperContext.Provider value={{}}>
              {displayStep(currentStep)}</StepperContext.Provider>       
            </form>
      </div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <button className="btn2" disabled={currentStep === 1} onClick={() => updateStep(currentStep - 1)}> Previous Step</button>
      <button className="btn2" disabled={currentStep === labelArray.length} onClick={() => updateStep(currentStep+1)}>Next Step</button>
      <button type='submit' className="btn1" disabled={currentStep < 5 }    onClick={formik.handleSubmit}  >finall</button>
    </div>
    </div> 
    </div>
   </div></>
    ); 
}
  