import { Box, Button, Container, FormControl,  FormLabel, Heading, Input, Spinner, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useUserStore } from '../storage/users';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
    const [newUser, setNewUser]= useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    const toast = useToast();
    const [loading, setLoading] = useState(false)
    const {createUser} = useUserStore()
    const {login} = useAuth()
    const handleAddUser = async() =>{
        if (!newUser.name || !newUser.email || !newUser.password || !newUser.confirmPassword){
            toast({
                title:"Invalid",
                description:"Please fill up the required fields",
                status:"error",
                isClosable: true
            })
        }
        else if (newUser.password !== newUser.confirmPassword){
              toast({
                title:"Incorrect Password",
                description:"Passwords do not match",
                status:"error",
                isClosable: true
            })
        }
        else{
            setLoading(true)
            const {success, message} = await createUser({name: newUser.name, email:newUser.email, password:newUser.password}, login)
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
                    title:"Registration Successful",
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
    }
  return (
    <Container maxW={"container.md"}>
        <VStack spacing={8}>
            <Heading as={"h1"} textAlign={"center"} size={"2x1"} mb={8}>
                Register
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
    <FormLabel>Name</FormLabel>
    <Input 
        type="name" 
        value={newUser.name} 
        onChange={(e)=> setNewUser({ ...newUser, name: e.target.value})} 
    />
  </FormControl>

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

   <FormControl isRequired>
    <FormLabel>Confirm Password</FormLabel>
    <Input 
        type="password" 
        value={newUser.confirmPassword}
        onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
    />
  </FormControl>
    <Button colorScheme="blue" w="full" onClick={handleAddUser}>
         {loading ? <Spinner size={"sm"} color='black'/> : "Register"}
    </Button>
  
</VStack>

            </Box>
        </VStack>
    </Container>
  )
}

export default Register