import { Button, Container, Flex, HStack, Image, Text, useBreakpointValue, useColorMode, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { useAuth } from '../contexts/AuthContext'
import { useChatStore } from '../storage/chats'
import { LuLogOut } from "react-icons/lu";

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

    const buttonContent = useBreakpointValue({
        base: <LuLogOut/>, // Icon for smaller screens
        sm: <Text>Log Out</Text>,
        md: <Text>Log Out</Text>,     // Text for medium and larger screens
    });

    return (
        <Container maxW={"full"} px={4} mb={{base:"2",sm:"3", md:"4", lg:"4"}} >
            <Flex 
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base:"column",
                    sm:"row"
                }}
            >
                <Link to={"/"}>
                <HStack paddingTop={1.5}>
<Image boxSize={{base:'80px', sm:"85px", md:"95px", lg:"100px"}} src="logo.png"/>
                <VStack spacing={-0.5} marginBottom={0.5}>
            
    <Text 
        fontSize={{ base: "40", sm:"45", md:"50", lg:"55"
         }}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
        marginBottom={-2.5}
    >
        Labubu
    </Text>
    <Text
        marginTop={-1}
        fontSize={{ sm: "17", base:"15", md:"20", lg:"22" }}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
        textAlign={"center"}
    >
       Ang iyong Love Guru
    </Text>
</VStack>
</HStack>
</Link>

               
                <HStack marginTop={{base:"1.5"}}spacing={2} alignItems={"center"}>
                    {isAuthenticated ? <></>:<Link to = {buttonLink}>
                        <Button size={{base:"sm",sm:"sm", md:"md", lg:"lg"}}>
                            {buttonText}
                        </Button>
                    </Link>}
                    <Button onClick={toggleColorMode} size={{base: "sm",sm:"sm", md:"md", lg:"lg"}}>
                        {colorMode === "light" ? <IoMoon />: <LuSun />}
                    </Button>
                    {!isAuthenticated ? <></>:<Button onClick={handleLogout} size={{base:"sm", sm:"sm", md:"md", lg:"lg"}}>{buttonContent}</Button>}
                </HStack>

            </Flex>
        </Container>
    );
}

export default Navbar