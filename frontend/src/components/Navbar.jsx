import { Button, Container, Flex, HStack, Text, useColorMode, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { useAuth } from '../contexts/AuthContext'
import { useChatStore } from '../storage/chats'

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const location = useLocation();
    const isLoginPage = location.pathname === "/login" 
    const {isAuthenticated, logout} = useAuth();
    const {setChats, chats} = useChatStore();
    const buttonLink = isLoginPage ? "/register" : "/login";
    const buttonText = isLoginPage ? "Register" : "Log In"
    const handleLogout = async () => {
        await logout();  
        setChats([{
        "role":"assistant",
        "content":"Kumusta? (How are you?) I'm Labubu, your friendly love guru. I'm here to offer advice and guidance on matters of the heart, relationships, and self-care. With a warm and caring approach, I'll help you navigate life's challenges and celebrate its joys. Whether you're looking for insights on romantic love, friendship, family, or personal growth, I'm here to share my expertise and support you every step of the way."
    }]);
    };

    return (
        <Container maxW={"full"} px={4} mb={4} >
            <Flex 
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base:"column",
                    sm:"row"
                }}
            >
                <VStack spacing={-0.5}  >
    <Text 
        fontSize={{ sm: "50" }}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
        marginBottom={"-2.5"}
    >
        <Link to={"/"}>Labubu</Link>
    </Text>
    <Text
        fontSize={{ sm: "20" }}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
        textAlign={"center"}
    >
        <Link to={"/"}>Ang iyong Love Guru</Link>
    </Text>
</VStack>

               
                <HStack spacing={2} alignItems={"center"}>
                    {isAuthenticated ? <></>:<Link to = {buttonLink}>
                        <Button>
                            <Text>{buttonText}</Text>
                        </Button>
                    </Link>}
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon />: <LuSun size="20"/>}
                    </Button>
                    {!isAuthenticated ? <></>:<Button onClick={handleLogout}><Text>Log Out</Text></Button>}
                </HStack>

            </Flex>
        </Container>
    );
}

export default Navbar