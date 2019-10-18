import React, { useState,useEffect } from 'react';
import './books.css';
import { ViewBooks } from './ListOfBooks';
import axios from 'axios';





export const SearchABook=(props) =>{
  const[cards,setCards]=useState();

  useEffect(() => {
    axios.get(`http://localhost:8080/auditList`,{
      params:{
        searchParameter:{...props.location.query}
      }
    })
    .then(res => {
      setCards(res.data);
    })
  }, []);
 

  return (
    <ViewBooks cards={cards}>

    </ViewBooks>
  );
    }
