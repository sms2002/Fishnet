import './App.css';
import { BrowserRouter,Route,Routes }  from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup.js/Signup';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
