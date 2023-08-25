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
  Center,
  Link
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Felix from "../../assets/images/about/Jeanello-Profile.JPG";
import Maximo from "../../assets/images/about/Eldrickson.jpg";
import Danny from "../../assets/images/about/Danny.jpg";
import UoC from "../../assets/images/about/UOC.png";

function Abus() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="whatsapp">
        About Us
      </Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
        size={"full"}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center bg="#6bc8ed" h="100px" color="white">
              <Heading size="lg" fontSize="50px">
                AuraTeam
              </Heading>
            </Center>
            <Box position="relative" padding="10">
              <Divider />
              <AbsoluteCenter bg="white" px="4" fontSize={"lg"}>
                Our Goal
              </AbsoluteCenter>
            </Box>

            <Text fontSize="xl" textAlign={"center"}>
              Our group embarked on an exciting and challenging journey to
              create a decentralized application (DApp) centered around the
              concept of an "Object Passport." The project aimed to leverage
              blockchain technology to provide a unique digital identity for
              physical objects, enhancing their traceability, ownership history,
              and authenticity. Throughout this group project, our team was
              exposed to a dynamic blend of cutting-edge technologies,
              collaboration, and problem-solving.
            </Text>
            <Box position="relative" padding="10">
              <Divider />
              <AbsoluteCenter bg="white" px="4" fontSize={"lg"}>
                Meet our team!
              </AbsoluteCenter>
            </Box>

            <SimpleGrid
              spacing={20}
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              display={"flex"}
              justifyContent={"center"}
            >
              <Card maxW="lg">
                <CardBody>
                  <Image
                    src={Felix}
                    alt="Felix"
                    borderRadius="lg"
                    boxSize={"sm"}
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Felix<Link href="www.linkedin.com/in/jeanello-haddocks-9a34b6192" isExternal color={"#272a92"}><ExternalLinkIcon mx="2px" />
                    </Link></Heading>
                    <Text>Developer</Text>
                    <Text>
                      As a Frontend DApp Engineer, I merge technology and user
                      experience by crafting intuitive interfaces for DApps.
                      Using React and Ethers.js, I collaborate with designers to
                      bring concepts to life. My work aims to make
                      blockchain-powered applications visually appealing and
                      easy to navigate.
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
              <Card maxW="lg">
                <CardBody>
                  <Image src={Maximo} alt="Maximo" borderRadius="lg" boxSize={"sm"} />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Maximo <Link href="https://www.linkedin.com/in/eldrickson-sommer-164975208/" isExternal color={"#272a92"}><ExternalLinkIcon mx="2px" />
                    </Link></Heading>
                    <Text>Developer</Text>
                    <Text>
                      As a Blockchain DApp Developer, I design, code, and deploy
                      decentralized applications (DApps) on various blockchains.
                      With expertise in Solidity and blockchain protocols, I
                      contribute to secure and transparent solutions.
                      Collaborating across teams, I'm passionate about shaping
                      the future of blockchain technology and enhancing user
                      experiences.
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
              <Card maxW="lg">
                <CardBody>
                  <Image src={Danny} alt="Danny" borderRadius="lg" boxSize={"sm"} />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Danny <Link href="https://www.linkedin.com/in/daniel-murillo-casta%C3%B1o-b036201b9/" isExternal color={"#272a92"}><ExternalLinkIcon mx="2px" />
                    </Link></Heading>
                    <Text>Developer</Text>
                    <Text>
                      As a Smart Contract Developer, I create robust and secure
                      contracts for DApps. Through in-depth knowledge of
                      Solidity and collaboration with security experts, I ensure
                      reliable and resilient smart contract logic. My role
                      centers on shaping the integrity and functionality of
                      blockchain ecosystems.
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            </SimpleGrid>
            <Box position="relative" padding="10">
              <Divider />
              <AbsoluteCenter bg="white" px="4" fontSize={"lg"}>
                Organization
              </AbsoluteCenter>
            </Box>
            <SimpleGrid
              spacing={20}
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              display={"flex"}
              justifyContent={"center"}
            >
              <Card maxW="full">
                <CardBody>
                  <Center>
                    <Image
                      boxSize={"xl"}
                      src={UoC}
                      alt="UOC"
                      borderRadius="lg"
                    />
                  </Center>
                  <Stack mt="6" spacing="3">
                    <Heading size="md">UOC</Heading>
                    <Text>Organization</Text>
                    <Text>
                      <Text as={"b"}>A Heartfelt Thank You to:</Text>
                      <br></br>
                      Organization:
                      <br></br>
                      <Text color={"#6bc8ed"}>
                        <a
                          href="https://www.uoc.cw/"
                          color="blue"
                          target="_blank"
                          rel="noreferrer"
                        >
                          🏫University of Curacao (UOC){" "}
                        </a>
                      </Text>
                      Coordinator:
                      <br></br>
                      <Text color={"#6bc8ed"}>
                        <a
                          href="https://www.linkedin.com/in/luis-de-abreu-ladeira-32b4388/"
                          color="blue"
                          target="_blank"
                          rel="noreferrer"
                        >
                          🧭Luis de Abreu Ladeira 🔗
                        </a>
                      </Text>
                      Mentors:
                      <br></br>
                      <Text color={"#6bc8ed"}>
                        <a
                          href="https://www.linkedin.com/in/olivierrikken/"
                          color="blue"
                          target="_blank"
                          rel="noreferrer"
                        >
                          💠Olivier Rikken🔗{" "}
                        </a>
                      </Text>
                      <Text color={"#6bc8ed"}>
                        <a
                          href="https://www.linkedin.com/in/victor-van-der-hulst-37b3b210/"
                          color="blue"
                          target="_blank"
                          rel="noreferrer"
                        >
                          💠Victor van der Hulst🔗
                        </a>
                      </Text>
                    </Text>
                    <Box position="relative" padding="10">
                      <Divider />
                      <AbsoluteCenter bg="white" px="4" fontSize={"lg"}>
                        Thank you !
                      </AbsoluteCenter>
                    </Box>
                    <Text>
                      We would like to extend our sincere gratitude to
                      Organization UOC for providing us with the incredible
                      opportunity to work on a remarkable project in the world
                      of Decentralized Applications (DApps). This experience has
                      been both enriching and invaluable to our growth as
                      aspiring developers.
                      <br></br>
                      <br></br>
                      Coordinator Luis de Abreu Ladeira played a pivotal role in
                      facilitating our journey through this project. His
                      unwavering support, guidance, and dedication to our
                      success were truly commendable. Without his leadership,
                      this project wouldn't have been possible.
                      <br></br>
                      <br></br>
                      We are also immensely thankful to our mentors, Olivier
                      Rikken and Victor van der Hulst, for their expertise and
                      guidance throughout this endeavor. Their extensive
                      knowledge and willingness to share their insights have
                      been instrumental in shaping our understanding of DApps
                      and blockchain technology.
                      <br></br>
                      <br></br>
                      This project has not only honed our technical skills but
                      has also instilled in us a deeper appreciation for
                      collaborative teamwork. It has been an incredible journey,
                      and we are immensely grateful to all those who have been a
                      part of it.
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            </SimpleGrid>
            <Box position="relative" padding="10">
              <Divider />
              <AbsoluteCenter bg="white" px="4" fontSize={"lg"}>
                Special Thanks
              </AbsoluteCenter>
            </Box>
            <SimpleGrid
              spacing={20}
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              display={"flex"}
              justifyContent={"center"}
            >
              <Card maxW="lg">
                <CardBody>
                  <Image
                    boxSize={"sm"}
                    src={"https://chakra-ui.com/og-image.png"}
                    alt="Chakra"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Chakra UI</Heading>
                    <Text>FrontEnd Tool</Text>
                    <Link href="https://chakra-ui.com/" isExternal color={"#2abfb3"}>
                     https://chakra-ui.com/ <ExternalLinkIcon mx="2px" color={"#2abfb3"}/>
                    </Link>
                    <Text>
                      Chakra UI is a simple, modular and accessible component
                      library that gives you the building blocks you need to
                      build your React Applications💖
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
              <Card maxW="lg">
                <CardBody>
                  <Image
                    src={
                      "https://assets-global.website-files.com/6364e65656ab107e465325d2/6381641b6a60932fb3c3c2d9_crsLQ2lVok-0X37hZ_7RSl62vTm5GRP0Ws4xyPt4E5I.jpeg"
                    }
                    boxSize={"sm"}
                    alt="Hardhat"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Hardhat</Heading>
                    <Text>Development environment for Ethereum software</Text>
                    <Link href="https://hardhat.org/" isExternal color="#bba500">
                    https://hardhat.org/ <ExternalLinkIcon mx="2px" />
                    </Link>
                    <Text>
                      It consists of different components for editing,
                      compiling, debugging and deploying your smart contracts
                      and dApps, all of which work together to create a complete
                      development environment.👷
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
              <Card maxW="lg">
                <CardBody>
                  <Image
                    src={
                      "https://uploads-ssl.webflow.com/6433e6f821ae13dd37394322/64393ec631a32b4da0ee030c_ethersjs.png"
                    }
                    boxSize={"sm"}
                    alt="ethers"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Ethers.js</Heading>
                    <Text>
                      JavaScript library for Ethereum Blockchain development
                    </Text>
                    <Link href="https://docs.ethers.org/" isExternal color={"#272a92"}>
                    https://docs.ethers.org/ <ExternalLinkIcon mx="2px" />
                    </Link>
                    <Text>
                      It provides a simple and easy-to-use interface for
                      interacting with Ethereum smart contracts. It supports
                      contract deployment, function calls, and events handling. ☁️
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
