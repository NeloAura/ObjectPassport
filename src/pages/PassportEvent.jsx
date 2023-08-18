import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Center,
  Button,
  ButtonGroup,
  Text,
  Card,
  CardHeader,
  CardBody,
  ChakraBaseProvider,
  Divider,
  AbsoluteCenter,
  extendTheme,
  Badge,
  Spinner,
  Wrap,
  WrapItem,
  Image,
  VStack
} from "@chakra-ui/react";
import { ExternalLinkIcon} from '@chakra-ui/icons'
import History from "../components/modal/History";
import Image1 from "../assets/images/SPL.png";
import { format, fromUnixTime } from "date-fns";
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";
import { useParams } from "react-router-dom";


const contractAddress ="0x57D72aC73CA959425916d9Bf2c313D49722C4c83";
const infuraApiKey = "d9e4d3de366746b88f8e6c91867018bd";
const abi = ObjectPassportAbi.abi;

const { ethers } = require("ethers");

const PassportEvent = () => {
  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  
  const gradientColors = ["#99ccdf", "#029ec4", "#033f63"];
  const gradientColors2 = ["#FFD700", "#FFC500", "#FFB300"];
  const gradient = `linear-gradient(to bottom, ${gradientColors.join(", ")})`;
  const gradient2 = `linear-gradient(to bottom, ${gradientColors2.join(", ")})`;

  useEffect(() => {
    const fetchPassport = async () => {
      const parsedID = parseInt(id, 10);
      const uint256Id = ethers.BigNumber.from(parsedID);
      const infuraUrl = "https://polygon-mumbai.infura.io/v3/" + infuraApiKey;
      const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        const fetchedPassport = await contract.getPassportDetails(uint256Id);
        setPassport(fetchedPassport);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching passport:", error);
        setLoading(false);
      }
    };

    fetchPassport();
  }, [id]);



  const formatDateToISO = (timestamp) => {
    const parsedDate = fromUnixTime(timestamp);
    return format(parsedDate, "yyyy-MM-dd");
  };

  const formatDateToISO2 = (timestamp) => {
    const parsedDate = fromUnixTime(timestamp);
    return format(parsedDate, "HH:mm:ss");
  };


  const theme = extendTheme({});

  return (
    <ChakraBaseProvider theme={theme}>
      <Flex
        align="center"
        justify="center"
        minH="100vh" // Set the minimum height to cover the viewport
        bg={"#fffae0"}
      >
        <Box
          w="100%" // Set the width to cover the full viewport
          bg="#6CB4EE"
          backgroundImage={Image1}
          backgroundSize="contain"
          backgroundPosition="center"
          backgroundRepeat="repeat"
        >
          <Wrap spacing={4} justify="center">
            {loading ? (
              <Center flexGrow={1} alignItems="center" justifyContent="center">
                <Spinner
                  thickness="10px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="red.500"
                  size="xl"
                />
              </Center>
            ) : passport === null ? (
              <Center flexGrow={1} alignItems="center" justifyContent="center">
                <Text
                  textAlign="center"
                  color="#C40234"
                  fontSize="24px"
                  as="b"
                  bg="white"
                >
                  Loading passport details...
                </Text>
              </Center>
            ) : (
              <WrapItem>
                <Card
                  key={passport.id}
                  boxShadow="md"
                  borderRadius="md"
                  w="600px"
                  h="675px"
                  mb={4}
                  mt="10px"
                  ml={"10px"}
                  bg={gradient}
                >
                  <CardHeader bg={gradient2} textAlign="center" py={2}>
                    <Text fontSize="20px" color="white" as="b">
                      {passport[0][3]}
                    </Text>
                  </CardHeader>
                  <CardBody>
                  <Center>
                        <Image
                          mb={"5"}
                          boxSize="100px"
                          objectFit="cover"
                          src={passport.photograph}
                          alt="Profile"
                          fallbackSrc="https://scontent.fcur3-1.fna.fbcdn.net/v/t39.30808-6/240603964_4096273620501601_1563941666359861447_n.png?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=i2nOPFapG88AX8708VQ&_nc_ht=scontent.fcur3-1.fna&oh=00_AfD2Z-n9qmh0Gs3ZHgOp4UfW7OQyfXoJ8HHcBusUxLS_Ig&oe=64E2F878"
                        />
                      </Center>
                      <Center>
                      <p display="flex" flex>
                        <Badge colorScheme="teal">Owner:</Badge>{" "}
                        <Badge colorScheme="linkedin" >{passport[0][0]}</Badge>
                      </p>
                      </Center>
                      <Box position="relative" padding="7">
                        <Divider />
                        <AbsoluteCenter bg="white" px="4" >
                          Parties
                        </AbsoluteCenter>
                      </Box>
                      <Center>
                      <VStack>
                      <p>
                        <Badge colorScheme="messenger">
                          Maintenance Party:
                        </Badge>{" "}
                        <Badge colorScheme="yellow" >{passport[0][1]}</Badge>
                      </p>
                      <p>
                        <Badge colorScheme="messenger">Certifying Party:</Badge>{" "}
                        <Badge colorScheme="yellow" >{passport[0][2]}</Badge>
                      </p>
                      </VStack>
                      </Center>
                      <Box position="relative" padding="7">
                        <Divider />
                        <AbsoluteCenter  bg="white" px="4">
                          Details
                        </AbsoluteCenter>
                      </Box>
                      <Center>
                      <VStack>
                      <p>
                        <Badge colorScheme="teal">Fullname:</Badge>{" "}
                        <Badge colorScheme="gray" >{passport.fullname}</Badge>
                      </p>
                      <p>
                        <Badge colorScheme="purple">Nationality:</Badge>{" "}
                        <Badge colorScheme="cyan"> {passport.nationality}</Badge>
                      </p>
                      <p>
                        <Badge colorScheme="purple">Sex:</Badge>{" "}
                        <Badge colorScheme="cyan" > {passport.sex} </Badge>
                      </p>

                      <p>
                        <Badge colorScheme="orange">
                          Maintenance Performed:
                        </Badge>{" "}
                        {passport[0][9] ? "✅" : "⛔"}
                      </p>
                      <p>
                        <Badge colorScheme="whatsapp">Certified:</Badge>{" "}
                        {passport[0][10] ? "✅" : "⛔"}
                      </p>

                      {passport[0][10] && (
                        <p>
                          <Badge colorScheme="red">Expiration-date:</Badge>{" "}
                          <Badge colorScheme="messenger">{formatDateToISO(parseInt(passport[0][8]))} -{" "}
                          {formatDateToISO2(parseInt(passport[0][8]))}</Badge>
                        </p>
                      )}
                      </VStack>
                      </Center>
                    <Box position="relative" padding="7">
                      <Divider />
                      <AbsoluteCenter bg="white" px="4">
                        Exportable Data
                      </AbsoluteCenter>
                    </Box>
                    <ButtonGroup display="flex" justifyContent="center" mt={1}>
                      <History name={"History"} passport={passport} />
                      {passport[0][10] &&
                   
                    <a href={passport[0][5]} target="_blank" rel="noreferrer" >
                  <Button rightIcon={<ExternalLinkIcon/>} bgColor={"#ffcc00"}>Certification✔️</Button>
                  </a>
                   
                    }
                    </ButtonGroup>
  
                  </CardBody>
                </Card>
              </WrapItem>
            )}
          </Wrap>
        </Box>
      </Flex>
    </ChakraBaseProvider>
  );
};

export default PassportEvent;
