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
  Text,
  ChakraProvider, CSSReset, Box, Container
} from "@chakra-ui/react";

import Stepper from './Stepper';

function Explained() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

  return (
    <>
      <Button onClick={onOpen} colorScheme="orange">How it Works</Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
        size={"6xl"}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) "
        />
        <ModalContent>
          <ModalHeader>How to Work with The Passport?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <ChakraProvider>
      <CSSReset />
      <Container maxW="container.sm" py={8}>
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Stepper steps={steps} />
        </Box>
      </Container>
    </ChakraProvider>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Explained;
