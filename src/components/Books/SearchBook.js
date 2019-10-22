import React, { useState,useEffect } from 'react';
import './style/books.css';
import { ViewBooks } from './ListOfBooks';
import axios from 'axios';

export const SearchABook=(props) =>{
  const[cards,setCards]=useState();

  useEffect(() => {
    axios.get(`http://localhost:8080/findThisBook`,{
      params:{
        searchParameter:RegExp('(?<=query=).*$').exec(window.location.href)[0].replace(/%20/g, " ")
      }
    })
    .then(res => {
      setCards(res.data);
    })
  }, []);
 

  return (
    <ViewBooks cards={cards} /> 
  );
    }
