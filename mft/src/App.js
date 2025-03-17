import logo from './logo.svg';
import './App.css';
import Home from './Routes/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import AboutUs from './Routes/AboutUs';
import Admindash from './Routes/Admindash';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/aboutus" element={<AboutUs/>}/>
      <Route path="/admindash" element={<Admindash/>}/>
      </Routes>
    </div>
  );
}

export default App;
