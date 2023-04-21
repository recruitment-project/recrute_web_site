import axios from 'axios';
import toast from 'react-hot-toast'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function ajoutPostule(credentials){
    try {
        
        
            const { data  } = await axios.post(`/api/addPostule`, credentials)
        

        

        return Promise.resolve(data)
    } catch (error) {
        
        return Promise.reject({ error :"could't postule"})
        
        
    }
}

/** validate postule */
export async function PostuleValidation(values){
    const error = {}
    if(!values.username){
        error.title = toast.error('username Required...!');
    }else if(!values.email){
        error.title = toast.error('email Required...!');
    }

    return error;
}