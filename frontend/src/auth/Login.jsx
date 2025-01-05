import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Spinner, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useUserStore } from '../storage/users';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
     const [newUser, setNewUser]= useState({
        email:"",
        password:""
    });
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const {logInUser} = useUserStore()
    const {login} = useAuth()
    const handleLogIn = async () => {
        setLoading(true)
        const {success, message} = await logInUser(newUser, login)
        setLoading(false)
        if(!success){
                toast({
                    title:"Error",
                    description: message,
                    status:"error",
                    duration:5000,
                    isClosable: true
                });
               
            }else{
                toast({
                    title:"Log In Success",
                    description: message,
                    status:"success",
                    duration:5000,
                    isClosable: true
                })
                 setNewUser({ 
                    name:"",
                    email:"",
                    password:"",
                    confirmPassword:""
                });
            }
    }
  return (
      <Container maxW={"container.md"}>
          <VStack spacing={8}>
              <Heading as={"h1"} textAlign={"center"} size={"2x1"} mb={8}>
                  Log In
              </Heading>
              <Box
                  w={"full"}
                  bg={useColorModeValue("white", "gray.800")}
                  p={6}
                  rounded={"lg"}
                  shadow={"md"}
              >
                 <VStack spacing={4} align="stretch">
    <FormControl isRequired>
      <FormLabel>Email Address</FormLabel>
      <Input
          type="email" 
          value={newUser.email} 
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
      />
    </FormControl>
  
    <FormControl isRequired>
      <FormLabel>Password</FormLabel>
      <Input 
          type="password" 
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
      />
    </FormControl>
      <Button colorScheme="blue" w="full"  onClick={handleLogIn}>
          {loading ? <Spinner size={"sm"} color='black'/> : "Log In"}
      </Button>
    
  </VStack>
  
              </Box>
          </VStack>
      </Container>
    )
}

export default Login