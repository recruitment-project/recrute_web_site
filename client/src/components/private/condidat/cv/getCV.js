import axios from "axios";
import { useEffect, useState } from "react";

import useFetch from '../../../../hooks/fetch.hook';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** custom hook */
export default function useFetch1(id){
  
  const [cv, setCV] = useState({
  })

  

  useEffect(() => { 
    loadCV();
  }, []);

  const loadCV = async () => {
    
    
    const result = await axios.get(
      `http://localhost:8080/api/CV/${id}`
    );
    setCV(result.data);
  };
  
    return [cv, setCV];
}