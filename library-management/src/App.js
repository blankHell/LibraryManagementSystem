import './App.css';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import UserHome from './components/UserHome'
import AdminHome from './components/AdminHome'
import AddRemoveBooks from './components/AddRemoveBooks';

function App() {
  return (
    <div className="App" style={{ height: '100%' }}>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
          <Route path="/userhome" element={<UserHome/>}></Route>
          <Route path="/adminhome" element={<AdminHome/>}></Route>
          <Route path="/managebooks" element={<AddRemoveBooks/>}></Route>

          
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
