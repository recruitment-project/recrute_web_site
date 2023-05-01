import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from  '../../store/store'
import styles from '../../styles/Username.module.css';
import { generateOTP, verifyOTP } from '../../helper/helper.js';
import { useNavigate } from 'react-router-dom'
export default function Recovery() {

  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate()
console.log(OTP)
  useEffect(() => {
    generateOTP(username);
       toast.success("OTP envoyé à votre email");
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verifié avec succés!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Faux OTP! SVP réssayer !')
    }
  }

  // handler of resend OTP
  function resendOTP(){

    let sentPromise = generateOTP(username);


    sentPromise.then((OTP) => {
      
    });
    
  }

  return (
    <section className=" container mx-auto flex justify-center mt-9">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
  <div className=" flex justify-center items-center  bg-white rounded-xl ">
    <div
      className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
     <div
        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0"
        style={{width:"30rem", height:"20rem"}}
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img"
          style={{width:"100%", height:"100%"}}
          alt="Sample image"
          
        />
      </div>
      <div className=" flex xl:ml-20 xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-8  " style={{justifyContent:"center", alignItems:"center"}}>
      <form onSubmit={onSubmit}>

      <div className="flex flex-row items-center justify-center  mb-24 mt-9">
            <p className="text-3xl font-bold">Récupérer mot de passe</p>
      </div>
      {/* <div className="title flex flex-col items-center">
            <h4 className='text-4xl font-bold text-black '>Récupérer mot de passe</h4>
            <span className='py-4 text-xl w-2/3 text-center text-white'>
                Entrer OTP pour récupérer votre mot de passe.
            </span>
          </div> */}
          
         
               <div className="textbox flex flex-col items-center gap-6">
                   <div className="input text-center">
                     <span className='py-4 text-sm text-left text-red-600 mb-8 '>
                       Entrer 6 chiffres OTP envoyés à votre addresse email.
                     </span>
                     <input onChange={(e) => setOTP(e.target.value) } className="border-4 border-gray-100 px-5 py-4 rounded-xl w-2/2 shadow-sm text-lg hover:border-gray-200 focus:outline-none" type="text" placeholder='OTP' />
                   </div>

                   <div className=" flex justify-center text-center lg:text-left ml-12">
                    <button
                    type='submit'
                      className={styles.btn1}
                    >
                      Récupérer
                    </button>
                   </div>
               <div className="text-center py-4 ">
                 <span className='text-gray'>OTP pas réçu? <button onClick={resendOTP} className='py-8 text-red-600'>Réenvoyé</button></span>
               </div>
            </div>
           </form>
      </div>
    </div>
  </div>
</section>
  )
}