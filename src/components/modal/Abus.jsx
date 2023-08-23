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
  Divider,
  Box,
  AbsoluteCenter,
  Center
} from "@chakra-ui/react";
import Felix from "../../assets/images/about/Jeanello-Profile.JPG"

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
        size={"full"}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px)"
        />
        <ModalContent>
          <ModalHeader>About Us</ModalHeader>
          <ModalCloseButton />
          <ModalBody >

          <Center bg='#007fff' h='100px' color='white'>
          <Heading size='lg' fontSize='50px'>
  AuraTeam
</Heading>
</Center>
<Text fontSize='xl' textAlign={"center"}>
Our group embarked on an exciting and challenging journey to create a decentralized application (DApp) centered around the concept of an "Object Passport." The project aimed to leverage blockchain technology to provide a unique digital identity for physical objects, enhancing their traceability, ownership history, and authenticity.
Throughout this group project, our team was exposed to a dynamic blend of cutting-edge technologies, collaboration, and problem-solving. 
</Text>
          <Box position='relative' padding='10'>
  <Divider />
  <AbsoluteCenter bg='white' px='4' fontSize={"lg"}>
    Meet our team!
  </AbsoluteCenter>
</Box>

          <SimpleGrid spacing={20} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' display={"flex"} justifyContent={"center"}>
          <Card maxW='lg'>
  <CardBody>
    <Image
      src={Felix}
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
<Box position='relative' padding='10'>
  <Divider />
  <AbsoluteCenter bg='white' px='4' fontSize={"lg"}>
    Organization
  </AbsoluteCenter>
</Box>
<SimpleGrid spacing={20} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' display={"flex"} justifyContent={"center"}>
<Card maxW='lg'>
  <CardBody>
    <Image
      src={"https://scontent.fcur3-1.fna.fbcdn.net/v/t39.30808-6/240603964_4096273620501601_1563941666359861447_n.png?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=i2nOPFapG88AX8708VQ&_nc_ht=scontent.fcur3-1.fna&oh=00_AfD2Z-n9qmh0Gs3ZHgOp4UfW7OQyfXoJ8HHcBusUxLS_Ig&oe=64E2F878"}
      alt='UOC'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>UOC</Heading>
      <Text>Organization</Text>
      <Text>
      As a Frontend DApp Engineer, 
      I merge technology and user experience by crafting intuitive interfaces for DApps. 
      Using React and Web3.js, I collaborate with designers to bring concepts to life. 
      My work aims to make blockchain-powered applications visually appealing and easy to navigate.
      </Text>
    </Stack>
  </CardBody>
</Card>
</SimpleGrid>
<Box position='relative' padding='10'>
  <Divider />
  <AbsoluteCenter bg='white' px='4' fontSize={"lg"}>
    Special Thanks
  </AbsoluteCenter>
</Box>
<SimpleGrid spacing={20} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' display={"flex"} justifyContent={"center"}>
<Card maxW='lg'>
  <CardBody>
    <Image
      src={"https://chakra-ui.com/og-image.png"}
      alt='Chakra'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Chakra UI</Heading>
      <Text>FrontEnd Tool</Text>
      <Text>
      As a Frontend DApp Engineer, 
      I merge technology and user experience by crafting intuitive interfaces for DApps. 
      Using React and Web3.js, I collaborate with designers to bring concepts to life. 
      My work aims to make blockchain-powered applications visually appealing and easy to navigate.
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
