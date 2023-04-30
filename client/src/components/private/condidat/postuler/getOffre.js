import axios from "axios";
import { useEffect, useState } from "react";


axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** custom hook */
export default function useFetch(id){
   
  const [offre, setOffre] = useState({
    Entreprisname :"",
        Offrename: "",
        ITdomain: "",
        Temp: "",
        City: "",
        MiniDescription: "",
       Competance:"",
        DescriptionDetail: "",
       
  });

  

  useEffect(() => {
    loadOffre();
  }, []);

  const loadOffre = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/offre/${id}`
    );
    setOffre(result.data);
  };
  
    return [offre, setOffre];
}