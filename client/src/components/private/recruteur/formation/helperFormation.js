import axios from 'axios';
import toast from 'react-hot-toast'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function ajoutFormation(credentials){
    try {
        const { data  } = await axios.post(`/api/saveFormation`, credentials);
        return Promise.resolve(data)
    } catch (error) { 
        return Promise.reject({ error :"could't ajout formation"})      
    }
}
export async function updateFormation(data){
    try {
        const { res  } = await axios.put(`/api/formation/${data._id}`, data);

        

        return Promise.resolve(res)
    } catch (error) {
        
        return Promise.reject({ error :"could't ajout formation"})
        
        
    }
}
export async function getFormation(id){
    try {
        const { data  } = await axios.get(`/api/formation/${id}`);
        console.log(data)

        

        return (data)
    } catch (error) {
        
        return { error : "Password doesn't Match...!"}
        
        
    }
}
/** validate formation */
export async function FormationValidation(values){
    const error = {}
    if(!values.title){
        error.title = toast.error('Title Required...!');
    }else if(!values.duree){
        error.title = toast.error('Durée Required...!');
    }else if(!values.date_start){
        error.title = toast.error('Date to start Required...!');
    }else if(!values.domaine){
        error.title = toast.error('Domaine Required...!');
    }

    return error;
}
export async function SaveparticipationFormation(credentials){
    try{
        const {data} = await axios.post(`/api/SaveparticipationFormation`, credentials );
        return Promise.resolve(data)
    }catch (error){
        return Promise.reject({error: "couldn't add your informations"})
    }
}