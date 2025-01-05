import { Box, Button, Container, Flex, HStack, Text, Textarea, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import React, {  useEffect, useRef, useState } from "react";
import { useChatStore } from "../storage/chats";

const Dashboard = () => {
  const [input, setInput] = useState("");
  const { chats, setChats, sendMessage } = useChatStore();
  const toast = useToast()
  const chatBoxRef = useRef(null); //para sa autoscroll

  const handleSend = async () => {
    if (input.trim() === ""){
      toast({
        title:"Invalid Input",
        description: "Please fill empty fields",
        status:"error",
        duration:5000,
        isClosable: true
      })
      return
    };



    // Append the new message to the chat list
    const newMessage = { role: "user", content: input.trim() };
    const updatedChats = [...chats, newMessage];
    setChats(updatedChats);
    // Send the updated chats
    setInput("");
    const{success, message}= await sendMessage(updatedChats);
    if(!success){
      toast({
        title:"Error",
        description: message,
        status:"error",
        duration:5000,
        isClosable: true
      })
    }else{
      const responseMessage = {role:"assistant", content: message}
      const newUpdatedChats = [...updatedChats, responseMessage]
      setChats(newUpdatedChats)
      
    }

    
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if(input.trim()!=="") handleSend();
    } 
  };

   useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chats]); // Dependency on chats, this triggers when chats is updated

  return (
    <Container  maxW={"full"}  maxHeight="100vh" display="flex" flexDirection="column">
    <Box flex="1" overflowY="auto" p={4} marginBottom={"30vh"} ref={chatBoxRef}   sx={{
    "::-webkit-scrollbar": {
      width: "4px", // Set the width of the scrollbar
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "gray.500", // Set the color of the scrollbar thumb
      borderRadius: "10px", // Make it rounded
    },
    "::-webkit-scrollbar-track": {
      background: "transparent", // Make the track transparent
    },
    "scrollBehavior":"smooth"
  }}>
      {chats.map((message, index) => (
        <Flex
          key={index}
          justify={message.role === "user" ? "flex-end" : "flex-start"}
          mb={2}
        >
          <Box
            p={4}
            maxW="50%"
            bg={message.role === "user" ? "blue.500" : useColorModeValue("gray.200","gray.700")}
            color={message.role === "user" ? "white" : useColorModeValue("black","white")}
            borderRadius="md"
            boxShadow="sm"
          >
            <Text>{message.content}</Text>
          </Box>
        </Flex>
      ))}
    </Box>

    {/* Footer with input and send button */}
    <Flex
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      width={"full"}
      
    >
      <HStack width="full" marginBottom={1.5}>
        <Textarea
          value={input}
          size="lg"
          resize="none"
          placeholder="Enter your concerns here"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button height={20} width={20} onClick={handleSend} colorScheme="blue">
          Send
        </Button>
      </HStack>
    </Flex>
  </Container>
  );
};

export default Dashboard;
