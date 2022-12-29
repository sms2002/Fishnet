import './App.css';
import { BrowserRouter,Route,Routes }  from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup.js/Signup';
import CardDisplay from './pages/carddisplay';
import Userlanding from './pages/userlanding/userlanding';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/carddisplay' element={<CardDisplay />} />
          <Route path='/userlanding' element={<Userlanding/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
