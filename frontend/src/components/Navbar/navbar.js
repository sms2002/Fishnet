import React from 'react'
import './navbar.css';

const Navbar = () => {

    if(localStorage.getItem('token')){
        return(
            <div class="black-overlay-container">
    <div class="container">
      <nav class="navbar">
        <div class="navbar-container">
          <div class="navbar-item navbar-platform">
            <div class="navbar-link active"></div>
          </div>


          <div class="navbar-item navbar-button">
            <button class="sign-up-button" onClick={()=>{localStorage.removeItem('token'); window.location.reload();}}>Logout</button>
          </div>
        </div>
      </nav>

        
    </div>
  </div>
        )
    }

    else{
        return (
        
            <div class="black-overlay-container">
              <div class="container">
                <nav class="navbar">
                  <div class="navbar-container">
                    <div class="navbar-item navbar-platform">
                      <div class="navbar-link active"></div>
                    </div>
          
          
                    <div class="navbar-item navbar-signin">
                      <a href='/signin'><div class="navbar-link">Sign in</div></a>
                    </div>
          
                    <div class="navbar-item navbar-button">
                      <button class="sign-up-button" onClick={()=>{window.location.href='/signup';}}>Sign up free</button>
                    </div>
                  </div>
                </nav>
          
                  
              </div>
            </div>
                
            )
    }
  
}

export default Navbar
