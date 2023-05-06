import React , { useContext, useState,useEffect} from 'react'
import StepNavigation from './formulaire';
import Header from '../../layout/header';
import { useNavigate  } from 'react-router-dom';
import { Quiz } from '@mui/icons-material';
import { StepperContext } from './formulaire'; 
import SidebarRecruteur from '../../layout/sidebarRecruteur';
import { useParams } from 'react-router';
import { adddata } from './contextProvider'; 
  import { updatedata } from './contextProvider';

export default function StepperModif(){


    const {updata, setUPdata} = useContext(updatedata)

    

    const [inpval, setINP] = useState({
        Entreprisname:"",
        Offrename:"",
        ITdomain:"",
        City:"",
        MiniDescription:"",
        DescriptionDetail:"",Competance:"",
        Temp:"",
        questions: [{
        question: '',
        options0: '',
        options1: '',
        options2: '',
        correctAnswer: '',
      }]
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`http://localhost:8080/api/getoffre/${id}`, {
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
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateoffre = async(e)=>{
        e.preventDefault();

        const { Entreprisname, Offrename,ITdomain,City, MiniDescription, DescriptionDetail,Competance,Temp
        } = inpval;

        const res2 = await fetch(`http://localhost:8080/api/updateoffre/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                Entreprisname, Offrename,ITdomain,City, MiniDescription, DescriptionDetail,Competance,Temp
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
          
            alert("fill the data");
        }else{
            navigate("/recruteur/mesOffre")
            setUPdata(data2);
        }

    }





  const navigate = useNavigate();
  const displayStep=(step)=>{
    switch (step){
      case 1:
        return(<div  >
             
          <div class="mb-3 mt-12 ">
          
              <input type="text" className='formcontrol' value={inpval.Entreprisname} onChange={setdata} placeholder="nom de l'entreprise" name="Entreprisname"/>
          </div>
          <div class="mb-3 mt-12">

              <input type="text" className="formcontrol"  placeholder="nom de l'offre" name="Offrename"  onChange={setdata} value={inpval.Offrename}/>
          </div>
          
          </div>);
        case 2:
          return(           
            
                  <div >
                    <div class="mb-3 mt-12">

<input type="text" className="formcontrol"  placeholder="temp plein" name="Temp"   value={inpval.Temp} onChange={setdata}/>
</div>
<div class="mb-3 mt-12">
      
          <input type="text" className="formcontrol"  placeholder=" domaine de l'offre"  onChange={setdata}
                   name="ITdomain" value={inpval.ITdomain} />
      </div>
      <div class="mb-3 mt-12">
          <input type="text" className="formcontrol" placeholder=" Address"  onChange={setdata}
                   name="City" value={inpval.City} />
      </div>
                   
                    
                    </div>);
                    case 3:return(
                        <div>

<div class="mb-3 mt-12">
                        <input type="text" className="formcontrol" placeholder=" Competance"   value={inpval.Competance} onChange={setdata} name="Competance" />
                    </div>
                    <div class="mb-3 mt-12">
        
                    <input type="text" className="formcontrol" placeholder=" petite d'escription"  onChange={setdata}
                           name="MiniDescription" value={inpval.MiniDescription} />
                </div>
                <div class="mb-3 mt-12">

                    {/* <input type="text" className="form-control " placeholder="description détaillée" oninput="this.className = ''"
                            name="address"/> */}
                            <textarea id="story" name="DescriptionDetail" value={inpval.DescriptionDetail} className="formcontrol " placeholder="description détaillée" 
         onChange={setdata}  rows="5" cols="33"></textarea>
                </div>
                        </div>
                    );
                    case 4:return(
                        <div>             <div  className='nb'>Note well: It is not possible to change the content of the quiz  </div></div>);
                        case 5:return(
                            <div>             <div  className='nb'>Note well: It is not possible to change the content of the quiz  </div></div>);
                                  
                                          
    }
  }
  const labelArray = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']
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
      <button className="btn2" disabled={currentStep === 1} onClick={() => updateStep(currentStep - 1)}> Previous Step</button>
      <button className="btn2" disabled={currentStep === labelArray.length} onClick={() => updateStep(currentStep+1)}>Next Step</button>
      <button className="btn1" disabled={currentStep < 5 }    onClick={ updateoffre} >finall</button>
    </div>
    </div> 
    </div>
   </div></>
    ); 
}
  