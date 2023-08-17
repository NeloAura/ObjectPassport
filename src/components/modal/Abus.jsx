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
  Card,  
  CardBody,
  SimpleGrid,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react";

function Abus() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="whatsapp">About Us</Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
        size={"6xl"}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px)"
        />
        <ModalContent>
          <ModalHeader>Who Are We?</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
          <SimpleGrid spacing={20} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          <Card maxW='lg'>
  <CardBody>
    <Image
      src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Felix</Heading>
      <Text>Developer</Text>
      <Text>
      As a Frontend DApp Engineer, 
      I merge technology and user experience by crafting intuitive interfaces for DApps. 
      Using React and Web3.js, I collaborate with designers to bring concepts to life. 
      My work aims to make blockchain-powered applications visually appealing and easy to navigate.
      </Text>
    </Stack>
  </CardBody>
</Card>
<Card maxW='lg'>
  <CardBody>
    <Image
      src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Maximo</Heading>
      <Text>Developer</Text>
      <Text>
      As a Blockchain DApp Developer, 
      I design, code, and deploy decentralized applications (DApps) on various blockchains. 
      With expertise in Solidity and blockchain protocols, 
      I contribute to secure and transparent solutions. Collaborating across teams, 
      I'm passionate about shaping the future of blockchain technology and enhancing user experiences.
      </Text>
    </Stack>
  </CardBody>
</Card>
<Card maxW='lg'>
  <CardBody>
    <Image
      src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Danny</Heading>
      <Text>Developer</Text>
      <Text>
      As a Smart Contract Developer, I create robust and secure contracts for DApps. 
      Through in-depth knowledge of Solidity and collaboration with security experts, 
      I ensure reliable and resilient smart contract logic. 
      My role centers on shaping the integrity and functionality of blockchain ecosystems.
      </Text>
    </Stack>
  </CardBody>
</Card>
</SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Abus;
