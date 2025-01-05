import React from "react";
import { Navigate, Route,  Routes} from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./contexts/AuthContext";

function App (){
  const {isAuthenticated} = useAuth();
  return (
    <Box height={"100vh"} width={"100vw"}overflow={"hidden"} bg={useColorModeValue("white", "gray.900")}>
      <Navbar/>
      <Routes>
        <Route path='/' element={!isAuthenticated ? <Navigate to="/login"/>:<Navigate to="/dashboard"/>}/>
        <Route path='/login' element={!isAuthenticated ? <Login/>:<Navigate to="/dashboard"/>}/>
        <Route path='/dashboard' element={isAuthenticated ? <Dashboard/>:<Navigate to="/login"/>}/>
        <Route path='/register' element={isAuthenticated ? <Navigate to="/dashboard"/>:<Register/>}/>
      </Routes>
    </Box>
     
  );
}

export default App;