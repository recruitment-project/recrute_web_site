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
    generateOTP(username).then((OTP)=>{
      if(OTP) return toast.success("OTP envoyé à votre email");
      return toast.error("Problème en génération de OTP")
     
     })
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

  //  toast.promise(sentPromise ,
  //     {
  //       loading: 'Sending...',
  //       success: <b>OTP has been send to your email!</b>,
  //       error: <b>Could not Send it!</b>,
  //     }
  //   );

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
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full"
          alt="Sample image"
        />
      </div>
      <div className="xl:ml-20 xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
      <div className="title flex flex-col items-center mt-12">
            <h4 className='text-4xl font-bold text-black '>Récupérer mot de passe</h4>
            <span className='py-4 text-xl w-2/3 text-center text-white'>
                Entrer OTP pour récupérer votre mot de passe.
            </span>
          </div>
          
           <form className='pt-20' onSubmit={onSubmit}>

               <div className="textbox flex flex-col items-center gap-6">

                   <div className="input text-center">
                     <span className='py-4 text-sm text-left text-gray'>
                       Entrer 6 chiffres OTP envoyés à votre addresse email.
                     </span>
                     <input onChange={(e) => setOTP(e.target.value) } className={styles.textbox} type="text" placeholder='OTP' />
                   </div>

                   <button className={styles.btn} type='submit'>Récupérer</button>
               </div>
               <div className="text-center py-4 mb-10">
                 <span className='text-gray'>OTP pas réçu? <button onClick={resendOTP} className='py-8 text-red-600'>Réenvoyé</button></span>
               </div>
           </form>
      </div>
    </div>
  </div>
</section>
  )
}