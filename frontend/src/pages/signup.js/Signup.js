import React, { useState } from 'react'
import axios from'axios';

import './signup.css';

const baseurl = 'http://127.0.0.1:8000'
const Signup = () => {

    const [logdata,setData] = useState({
        username:'',
        email:'',
        firstname:'',
        lastname:'',
        password:''
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

    async function signup(){
        try {
            await axios.post(`${baseurl}/auth/create/user`,{
                username:logdata.username,
                email:logdata.email,
                firstname:logdata.firstname,
                lastname:logdata.lastname,
                password:logdata.password
            }).then((response)=>{
                if(response.data.status==200){
                    window.location.href = '/signin'
                }
                else{
                    console.log(response.data)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <div className="login-signup l-attop" id="signup">
  <div className="login-signup-title">
    SIGN UP
  </div>
  <div className="login-signup-content">
    <div className="input-name">
      <h2>Username</h2>


    </div>
    <input type="text" onChange={addData} name="username" value={logdata.username} className="field-input" />
    <div className="input-name input-margin">
      <h2>E-Mail</h2>

    </div>
    <input type="text" onChange={addData} name="email" value={logdata.email} className="field-input" />

    <div className="input-name input-margin">
      <h2>First Name</h2>

    </div>
    <input type="text" onChange={addData} name="firstname" value={logdata.firstname} className="field-input" />

    <div className="input-name input-margin">
      <h2>Last Name</h2>

    </div>
    <input type="text" onChange={addData} name="lastname" value={logdata.lastname} className="field-input" />

    <div className="input-name input-margin">
      <h2>Password</h2>

    </div>
    <input type="text" onChange={addData} name="password" value={logdata.password} className="field-input" />

    <button className="submit-btn" onClick={()=>{
        console.log('signup')
        signup()}}>
              Enter
            </button>


  </div>
</div>
    </div>
  )
}

export default Signup
