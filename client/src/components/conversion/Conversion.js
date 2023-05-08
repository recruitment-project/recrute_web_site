import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../../styles/conversion.module.css";
import images from "../../assets/images/CVV.png";
import useFetch from '../../hooks/fetch.hook';
import {useAuthStore} from '../../store/store';
function Conversion() {
const [state, setState] = useState(false);
const [texte, setTexte] = useState("");
const  [url, setUrl] = useState("");
const { username } = useAuthStore(state => state.auth)
const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
console.log(apiData?.username)

  
  return (
    <div>
        <input type="text"  onChange={ (e) => {
            setTexte(e.target.value)
        }}/>
        
    <button type="submit" onClick={() => setState(!state)}> Enregistrer</button>
    {state ? <>
    <img src ={images} style={{height:"580px", marginLeft:"40%"}}/>
    <h1 className={styles.text}></h1>
        </> : null}
  </div>
  )
}

export default Conversion
