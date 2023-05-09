import axios from 'axios';
import toast from 'react-hot-toast'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function ajoutCV(credentials){
    try {
        const { data  } = await axios.post(`/api/saveCV`, credentials);
        return Promise.resolve(data)
    } catch (error) { 
        return Promise.reject({ error :"could't ajout cv"})      
    }
}
export async function getCV(id){
    try {
        const { data  } = await axios.get(`/api/CV/${id}`);
        

        return (data)
    } catch (error) {
        
        return { error : "cv not valide...!"}
        
        
    }
}
export async function updateCV(data){
    try {
        const { res  } = await axios.put(`/api/updateCV/${data._id}`, data);

        

        return Promise.resolve(res)
    } catch (error) {
        
        return Promise.reject({ error :"could't update cv"})
        
        
    }
}

export async function CVValidation(values){
    const error = {}
    if(!values.telephone){
        error.title = toast.error('Telephone Required...!');
    }else if(!values.mission){
        error.title = toast.error('Mission Required...!');
    }else if(!values.linkedin){
        error.title = toast.error('Linkedin Required...!');
    }else if(!values.adress){
        error.title = toast.error('adresse Required...!');
    }else if(!values.profile){
        error.title = toast.error('Profile Required...!');
    }else if(!values.langue){
        error.title = toast.error('Langue to start Required...!');
    }else if(!values.experience[0].date_debutExp){
        error.title = toast.error('date_debut Expérience Required...!');
    }else if(!values.experience[0].date_finExp){
        error.title = toast.error('date_fin Expérience Required...!');
    }else if(!values.experience[0].nom_post){
        error.title = toast.error('nom post Required...!');
    }else if(!values.experience[0].nom_entreprice){
        error.title = toast.error(' nom de entreprice Required...!');
    }else if(!values.experience[0].descriptionExp){
        error.title = toast.error('description de Expérience Required...!');
    }

    else if(!values.formation[0].date_debutForm){
        error.title = toast.error('date_debut Formation Required...!');
    }else if(!values.formation[0].date_finForm){
        error.title = toast.error('date_fin Formation Required...!');
    }else if(!values.formation[0].titleForm){
        error.title = toast.error('title de Formation Required...!');
    }else if(!values.formation[0].nom_ecole){
        error.title = toast.error(' nom de école Required...!');
    }else if(!values.formation[0].descriptionForm){
        error.title = toast.error('description de formation Required...!');
    }
    else if(!values.competences[0].competence){
        error.title = toast.error('Competence Required...!');
    }else if(!values.competences[0].nb_experience){
        error.title = toast.error('nb experience de competence Required...!');
    }
    return error;
}
