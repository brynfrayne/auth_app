import axios from 'axios'
import React, { useEffect } from 'react'
import Header from '../Header/Header'

export default function Success() {
const getUser = () => {
    axios.get('http://localhost:8000/social', { withCredentials: true })
        .then(res => {
            console.log(res.data)
        })
}
useEffect(()=> {
    getUser();
}, []);

  return (
    <div>
       <Header/>
       <h1>You made it!</h1> 
    </div>
  )
}
