import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router';
import  './Nutrientpage.css'
import axios from 'axios';


const Nutrientpage = () => {
    const [data,setData]=useState({})

    let {n} = useParams();
    useEffect(()=>{
        fetchData();
    },[])
    
    async function fetchData(){
        try {
            await axios.get(`https://www.fishwatch.gov/api/species/${n}`).then(response=>{
                console.log(response.data)
                setData(response.data[0])
            })
        } catch (error) {
            
        }
    }



  return (
    <div className='nutrient'>
        <h1>Nutrients of {n}</h1>
      <h3>Saturated Fatty Acid-{data["Saturated Fatty Acids, Total"]}</h3>
      <h3>Total Selenium-{data.Selenium}</h3>
      <h3>Serving Weight-{data["Serving Weight"]}</h3>
      <h3>Servings-{data.Servings}</h3>
      <h3>Sodium-{data.Sodium}</h3>
    </div>
  )
}

export default Nutrientpage 