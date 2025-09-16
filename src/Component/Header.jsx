
import { NavLink } from "react-router-dom"
import { useEffect, useState } from 'react';
export default function Header() {
    const [isDark, setIsDark] = useState(() => {

      const darkMode = localStorage.getItem('darkMode');
      return darkMode ? JSON.parse(darkMode) : false; 
   
  });
    

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDark);
      localStorage.setItem('darkMode', JSON.stringify(isDark));
        
    }, [isDark]);

    function toggleMode() {
        setIsDark(prev => !prev);
    }

    return (
        <header className='header'>

            <div className='nav'>
               <NavLink className='navLink' to='/' >Home</NavLink > 
               <NavLink className='navLink' to='/favorites'>Favorites</NavLink>
               </div>
          
                 <button onClick={toggleMode}  className='modeButton'>
                {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
        </header>
    );
}
