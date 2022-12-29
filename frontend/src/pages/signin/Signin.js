import React, { useState } from 'react'
import axios from'axios';
import './signin.css'

const baseurl = 'http://127.0.0.1:8000'
const Signin = () => {
    

    const [logdata,setData] = useState({
        username:'',
        password:''
    });

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

    async function login(){
        try {
            await axios.post(`${baseurl}/auth/login/v1`,{
                username:logdata.username,
                password:logdata.password
            }).then((response)=>{
                if(response.status==200){
                    localStorage.setItem('token',response.data.token);
                    window.location.href='/'
                }
                console.log(response)
                
            })
        } catch (error) {
            console.log(error)
        }
    }





  return (
    
    <div>
    <div class="login-signup l-attop" id="signup">
  <div class="login-signup-title">
    LOG IN
  </div>
  <div class="login-signup-content">
    <div class="input-name">
      <h2>Username</h2>

    </div>
    <input type="text" name="username" onChange={addData} value={logdata.username} class="field-input" />
    <div class="input-name input-margin">
      <h2>Password</h2>

    </div>
    <input type="text" name="password" onChange={addData} value={logdata.password} class="field-input" />
    <div class="input-r">


    </div>
    <button class="submit-btn" onClick={()=>{
        login();
    }}>
          Enter
        </button>


  </div>
</div>
</div>
  )
}



export default Signin
