import './App.scss';
import { useState } from 'react';
import DarkModeToggle from "react-dark-mode-toggle";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';


function App() {;

  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className={isDarkMode ? 'dark-mode App' : 'App'}>
      <DarkModeToggle
      className='dark-mode__toggle'
      onChange={setIsDarkMode}
      checked={isDarkMode}
      size={40}
    />
      {/* <Login isDarkMode={isDarkMode}/> */}
      {/* <SignUp/> */}
      <Profile isDarkMode={isDarkMode}/>
      
    </div>
  );
}

export default App;
