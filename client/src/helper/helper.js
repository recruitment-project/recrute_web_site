import axios from 'axios';
import jwt_decode from 'jwt-decode';
import toast from 'react-hot-toast'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;




/** Make API Requests */


/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/** register user function */
export async function registerUser(credentials){
    try {
        const { data : { msg }, status } = await axios.post(`/api/register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
        
    }
}

/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});
        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Votre code OTP de récupération de mot de passe  est ${code}.`;
            await axios.post('/api/resetMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}


export async function ajoutoffre(credentials){
    try {
        const { data  } = await axios.post(`/api/saveOffre`, credentials);
        return Promise.resolve(data)
    } catch (error) {
        
        return Promise.reject({ error :"could't ajout offre"})
        
        
    }
}

export async function updateOffre(data){
    try {
        const { res  } = await axios.put(`/api/offre/${data._id}`, data);

        

        return Promise.resolve(res)
    } catch (error) {
        
        return Promise.reject({ error :"could't update offre"})
        
        
    }
}
export async function getOffre(id){
    try {
        const { data  } = await axios.get(`/api/offre/${id}`);
        console.log(data)

        

        return (data)
    } catch (error) {
        
        return { error : "offre...!"}
        
        
    }
}

/** validate formation */
export async function OffreValidation(values){
    const error = {}
    if(!values.Entreprisname){
        error.title = toast.error('Entreprisname Required...!');
    }else if(!values.Offrename){
        error.title = toast.error('Offrename Required...!');
    }else if(!values.ITdomain){
        error.title = toast.error('ITdomain to start Required...!');
    }else if(!values.City){
        error.title = toast.error('City Required...!');
    }else if(!values.MiniDescription){
        error.title = toast.error('MiniDescription Required...!');
    }else if(!values.DescriptionDetail){
        error.title = toast.error('DescriptionDetail Required...!');
    }


    return error;
}





export async  function getAllFormations(setFormations) {
    axios
      .post(`/api/formations`)
      .then((res) => {
        if (res.data === "ERROR") {
        } else {
         
            setFormations(res.data.Formation);
            console.log(res.data.Formation)
        }
      });
  }