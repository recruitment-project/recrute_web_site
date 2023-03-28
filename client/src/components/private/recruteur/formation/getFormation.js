import axios from "axios";
import { useEffect, useState } from "react";


axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** custom hook */
export default function useFetch(id){
   
  const [formation, setFormation] = useState({
    title : "",
      description:'',
      date_start:  '',
      price: '',
      address : '',
      domaine : '',
      duree :  '',
      formator:'',
      
  });

  

  useEffect(() => {
    loadFormation();
  }, []);

  const loadFormation = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/formation/${id}`
    );
    setFormation(result.data);
  };
  
    return [formation, setFormation];
}