import React, { useState } from 'react'
import axios from'axios';

import './Predict.css';
import Family from '../Familydata/Family';



const baseurl = 'http://127.0.0.1:8000'
const Predict = () => {

    const [species,setSpecies] = useState({})

    const [logdata,setData] = useState({
        temp:'',
        ph:'',
        dh:''
    })

    const addData = (e)=>{
        // console.log(e.target);
        const {name,value} = e.target;
        setData(()=>{
            return{
                ...logdata,
                [name]:value
            }
                
        })
    }



    async function predictspecies(){
        try {
            await axios.post(`${baseurl}/predict`,{
                "temp": logdata.temp,
                "ph": logdata.ph,
                "dh": logdata.dh
            }).then(response=>{
                setSpecies(response.data)
                
            })
            console.log(species)
        } catch (error) {
            
        }
    }


    if(species.length==2){
        return(
            <Family 
                familyname={species[0]}
                cardvalue = {species[1]}
            />
        )
    }

  return (
    <div>
      <div className="login-signup l-attop" id="signup">
  <div className="login-signup-title">
    Predict Species
  </div>
  <div className="login-signup-content">
    <div className="input-name">
      <h2>Temperature</h2>


    </div>
    <input type="text" onChange={addData} name="temp" value={logdata.temp} className="field-input" />
    <div className="input-name input-margin">
      <h2>pH</h2>

    </div>
    <input type="text" onChange={addData} name="ph" value={logdata.ph} className="field-input" />

    <div className="input-name input-margin">
      <h2>dH</h2>

    </div>
    <input type="text" onChange={addData} name="dh" value={logdata.dh} className="field-input" />

    <button className="submit-btn" onClick={()=>{
        predictspecies()
        console.log(logdata)}}>
              Enter
            </button>


  </div>
</div>
    </div>
  )
}

export default Predict
