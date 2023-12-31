import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box, Container
} from "@chakra-ui/react";

import HorizontalStepper from './Stepper/Stepper';


function Explained() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
  const gradientColors = [ "#99ccdf", "#029ec4" , "#033f63"];
  const gradient = `linear-gradient(to bottom, ${gradientColors.join(", ")})`;  

  
  return (
    <>
      <Button onClick={onOpen} colorScheme="orange">How it Works</Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"outside"}
        size={"full"}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) "
        />
        <ModalContent>
          <ModalHeader color={"white"} bg="#0280a6" as={"b"}>How to Work with AP💖?</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={gradient} >
          
      
      <Container maxW="container.sm" py={8}>
        <Box borderWidth="1px" borderRadius="lg" p={4} bg={"white"}>
          <HorizontalStepper steps={steps} onClose={onClose} />
        </Box>
      </Container>
    
          </ModalBody>

          <ModalFooter bg={"white"} >
            <Button colorScheme="red" mr={3} mb={5} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Explained;
