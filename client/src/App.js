import './App.scss';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DarkModeToggle from "react-dark-mode-toggle";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import EditProfile from './components/EditProfile/EditProfile';
import Footer from './components/Footer/Footer';
import Success from './components/Success/Success';


function App() {;

  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <BrowserRouter>
      <div className={isDarkMode ? 'dark-mode App' : 'App'}>
      <Routes>
        <Route path='/' element={<SignUp isDarkMode={isDarkMode}/>} />
        <Route path='/login' element={<Login isDarkMode={isDarkMode}/>} />  
        <Route exact path='/profile/:id' element={<Profile isDarkMode={isDarkMode}/>} />  
        <Route path='/profile/edit/:id' element={<EditProfile isDarkMode={isDarkMode}/>} />  
        <Route path='/success' element={<Success isDarkMode={isDarkMode}/>}/>
      </Routes>
        <Footer/>
        <DarkModeToggle
        className='dark-mode__toggle'
        onChange={setIsDarkMode}
        checked={isDarkMode}
        size={40}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
