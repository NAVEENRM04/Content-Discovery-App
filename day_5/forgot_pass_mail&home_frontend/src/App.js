// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login_Register/login';
import Forgot from './Forgot_password/forgot';
import Navbar from './Component/Navbar/Navbar';
import MainPage from './Component/Homepage/MainPage';
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';

function App() {
	return (
   
        <Router>
          <Routes>
          <Route path="/Login" element= {<><Login /></>}/>
          <Route path="/" element= {<><ChakraProvider> <ColorModeScript initialColorMode={theme.config.initialColorMode}/><Navbar /> <MainPage /></ChakraProvider></>}/>
          <Route path="/forgot" element= {<><Forgot /></>}/>
          {/* <Route path ="/home" element ={<><Profile/></>}/> */}
          </Routes>
        </Router>
        
  )
  }
  
export default App;