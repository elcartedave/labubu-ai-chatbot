import { Box, Button, Center, Container, Flex, HStack, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import React, {  useEffect, useRef, useState } from "react";
import { useChatStore } from "../storage/chats";

const VerticallyCenter=({isOpen, onClose, onOpen, image}) => {
  return (
    <>
      <Modal size={{base: "xs", sm: "sm", md:"md", lg:"lg"}} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalContent>
          <ModalBody>
            <VStack>
              <Image src={image} boxSize={{base: '240px', md: '290px', lg:'340px'}}/>
              <Text fontSize={{
              base: "19",
              md:"21",
              lg:"23"
              }} textAlign={"center"}>Give me a sec, binubuo ko pa ang tamang words para makatulong sa'yo! 🕒✨</Text>
            </VStack>
            
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
const Dashboard = () => {
  const [input, setInput] = useState("");
  const { chats, setChats, sendMessage } = useChatStore();
  const [sentiment, setSentiment] = useState("greetings");
  const toast = useToast()
  const chatBoxRef = useRef(null); //para sa autoscroll
  const [imageIndex, setImageIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state

  function getRandomInt(min, max) {
    min = Math.ceil(min); // Round up to the nearest whole number
    max = Math.floor(max); // Round down to the nearest whole number
    console.log("returned index:", Math.floor(Math.random() * (max - min + 1)) + min)
    return Math.floor(Math.random() * (max - min + 1)) + min; // Inclusive of both min and max
  }


 

  useEffect(() => {
    if (sentiment) {
      console.log("useEffect invoked due to sentiment change:", sentiment);
      let newIndex = 0;
      if (sentiment.includes("friendly")) newIndex = getRandomInt(0, friendlyImages.length - 1);
      else if (sentiment.includes("cheerful")) newIndex = getRandomInt(0, cheerfulImages.length - 1);
      else if (sentiment.includes("worried")) newIndex = getRandomInt(0, worriedImages.length - 1);
      else if (sentiment.includes("advisory")) newIndex = getRandomInt(0, advisoryImages.length - 1);
      else if (sentiment.includes("supportive")) newIndex = getRandomInt(0, supportiveImages.length - 1);
      else if (sentiment.includes("playful")) newIndex = getRandomInt(0, playfulImages.length - 1);
      else if (sentiment.includes("romantic")) newIndex = getRandomInt(0, romanticImages.length - 1);
  
      console.log("Setting new imageIndex:", newIndex);
      setImageIndex(newIndex);
    }
  }, [sentiment]); // Re-run whenever sentiment changes

  const cheerfulImages = [
    "cheerful_1.png",
    "cheerful_2.png",
    "cheerful_3.png",
    "cheerful_4.png",
    "cheerful_5.png",
  ]
  const thinkingImages = [
     "thinking_1.png",
    "thinking_2.png",
    "thinking_3.png",
    "thinking_4.png",
    "thinking_5.png",
  ]
  const worriedImages = [
    "worried_1.png",
    "worried_2.png",
    "worried_3.png",
    "worried_4.png",
    "worried_5.png",
  ]
  const greetings =  "greetings.png"

  const friendlyImages = [
    "friendly_1.png",
    "friendly_2.png",
    "friendly_3.png",
    "friendly_4.png",
    "friendly_5.png",
    
  ]

  const advisoryImages = [
    "advisory_1.png",
    "advisory_2.png",
    "advisory_3.png",
    "advisory_4.png",
    "advisory_5.png"
  ]

  const conflictedImage = "conflicted.png"
  const curiousImage =   "curious.png"
  const empatheticImage =  "empathetic_1.png"
  const excitedImage =   "excited_1.png"
  const playfulImages =   [
    "playful.png",
    "playful_2.png",
    "playful_3.png",
    "playful_4.png",
    "playful_5.png",

  ]
  const reassuringImage =   "reassuring.png"
  const romanticImages =   [
    "romantic.png",
    "romantic_2.png",
    "romantic_3.png",
    "romantic_4.png",
    "romantic_5.png",
  ]  
  const supportiveImages =   [
    "supportive_1.png",
    "supportive_2.png",
    "supportive_3.png",
    "supportive_4.png",
    "supportive_5.png",
  ]
  const sympatheticImage =   "sympathetic.png"
  

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


    onOpen()
    // Append the new message to the chat list
    const newMessage = { role: "user", content: input.trim() };
    const updatedChats = [...chats, newMessage];
    setChats(updatedChats);
    // Send the updated chats
    setInput("");
    const{success, message, sentiment}= await sendMessage(updatedChats);
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
      setSentiment(sentiment.toLowerCase())
      onClose()
     
      
      
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
    <Box flex="1" overflowY="auto" ref={chatBoxRef} pb={{base:"230",sm:"220",md:"210",lg:"200"}}  sx={{
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
      {chats.map((message, index)=> {
        const isLast = index === chats.length - 1 && message.role==="assistant";
        console.log("imageIndex:",imageIndex,"sentiment: ", sentiment)
        return (
        isLast ? 
        <>
         <Center>
          <VStack paddingLeft={{base:25, md: 30, lg: 35}} paddingRight={{base: 25, md: 30, lg:35}} paddingBottom={{base: 4, md: 7, lg:10}}>
           <Image 
            src={
                sentiment.toLowerCase().includes("greetings") ? greetings :
                sentiment.toLowerCase().includes("friendly") ? friendlyImages[imageIndex] :
                sentiment.toLowerCase().includes("cheerful") ? cheerfulImages[imageIndex] :
                sentiment.toLowerCase().includes("supportive")? supportiveImages[imageIndex]:
                sentiment.toLowerCase().includes("empathetic") ? empatheticImage:
                sentiment.toLowerCase().includes("romantic") ? romanticImages[imageIndex]:
                sentiment.toLowerCase().includes("advisory")? advisoryImages[imageIndex]:
                sentiment.toLowerCase().includes("excited")? excitedImage :
                sentiment.toLowerCase().includes("curious")? curiousImage :
                sentiment.toLowerCase().includes("reassuring")? reassuringImage :
                sentiment.toLowerCase().includes("playful")? playfulImages[imageIndex]:
                sentiment.toLowerCase().includes("sympathetic")? sympatheticImage :
                sentiment.toLowerCase().includes("conflicted")? conflictedImage :
                sentiment.toLowerCase().includes("worried")? worriedImages[imageIndex] :
                friendlyImages[1]
            } 
           boxSize={{base: '180px', md: '220px', lg:'270px'}}/> 
            <Text fontSize={{
              base: "17",
              md:"19",
              lg:"21"
              }} fontFamily={"arial"}>{message.content}</Text>
          </VStack>
          </Center> 
        </>:
        (<Flex
          key={index}
          justify={message.role === "user" ? "flex-end" : "flex-start"}
          mb={2}
          paddingBottom={5}
        >
          <Box
            p={4}
             maxW={{ base: "95%", md: "80%", lg: "60%" }} 
            bg={message.role === "user" ? "blue.500" : useColorModeValue("gray.200","gray.700")}
            color={message.role === "user" ? "white" : useColorModeValue("black","white")}
            borderRadius="md"
            boxShadow="sm"
          >
              <Text fontSize={17}
              >{message.content}</Text>
          </Box>
        </Flex>)
         
      )})}
    </Box>

    {/* Footer with input and send button */}
    <Flex
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      width={"full"}
      
    >
      <HStack width="full" paddingBottom={1.5} paddingTop={1.5} marginTop={1.5} marginLeft={1.5} marginRight={1.5} bg={useColorModeValue("white","gray.800")}>
        <Textarea
          value={input}
          size={'lg'}
          resize="none"
          placeholder="Enter your concerns here"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          backgroundColor={useColorModeValue("white","gray.800")}
          borderColor={useColorModeValue("gray.900","gray.100")}
        />
        <Button height={20} width={20} onClick={handleSend} colorScheme="blue">
          Send
        </Button>
      </HStack>
    </Flex>
    <VerticallyCenter isOpen={isOpen} onClose={onClose} onOpen={onOpen} image={thinkingImages[imageIndex]}/>
  </Container>
  );
};

export default Dashboard;
