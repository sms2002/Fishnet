import React from 'react'
import './navbar.css';

const Navbar = () => {

  if (localStorage.getItem('token')) {
    return (

      <div className="nav">
        <header>
          <div className='flex-nav'>
            <h1 className='nav-text'>FISHNET</h1>
            <div className='button_flex'>
            <button className="button style_1"onClick={() => { window.location.href = '/predict'; }}>Predict</button>
            <button class="button style_1"  onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>
              Logout
            </button>
            </div>
          </div>
        </header>
      </div>
    )
  }

  else {
    return (

      // <div className="black-overlay-container">
      //   <div className="container">
      //     <nav className="navbar">
      //       <div className="navbar-container">
      //         <div className="navbar-item navbar-platform">
      //           <div className="navbar-link active"></div>
      //         </div>


      //         <div className="navbar-item navbar-signin">
      //           <a href='/signin'><div className="navbar-link">Sign in</div></a>
      //         </div>

      //         <div className="navbar-item navbar-button">
      //           <button className="sign-up-button" onClick={() => { window.location.href = '/signup'; }}>Sign up free</button>
      //         </div>
      //       </div>
      //     </nav>


      //   </div>
      // </div>
      <>
      <div className="nav">
        <header>
          <div className='flex-nav'>
            <h1 className='nav-text'>FISHNET</h1>
            <div className='button_flex'>
            <button className="button style_1"onClick={() => { window.location.href = '/signin'; }}>SignIn</button>
            <button className="button style_1" onClick={() => { window.location.href = '/signup'; }}>SignUp </button>
            </div>
          </div>
        </header>
      </div>
      </>

    )
  }

}

export default Navbar
