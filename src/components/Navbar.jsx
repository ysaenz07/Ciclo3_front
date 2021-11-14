import React from 'react';
import ImagenLogo from './ImagenLogo';
//import TriggerDarkMode from './TriggerDarkMode';
import { useAuth0 } from '@auth0/auth0-react';

//import Particles from "react-particles-js"

const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <nav className='bg-gray-500'>
      <ul className='flex w-full justify-between my-3'>
        <li><ImagenLogo /></li>
        
        <li className='px-3'>
          <button
            onClick={() => loginWithRedirect()}
            className='bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'
          >
            Iniciar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
