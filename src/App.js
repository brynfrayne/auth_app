import './App.scss';
import { useState } from 'react';
import DarkModeToggle from "react-dark-mode-toggle";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';


function App() {;

  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className={isDarkMode ? 'dark-mode app' : 'app'}>
      <DarkModeToggle
      onChange={setIsDarkMode}
      checked={isDarkMode}
      size={80}
    />
      <Login/>
      {/* <SignUp/> */}
      
    </div>
  );
}

export default App;
