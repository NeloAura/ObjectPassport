import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Center,
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
} from "@chakra-ui/react";
import History from "../components/modal/History";
import Image from "../assets/images/SPL.png";
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";
import { useParams } from "react-router-dom";


const contractAddress = "0xA3C8fD22e44695c97d180d108F3945DceCeb70A6";
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

  const theme = extendTheme({});

  return (
    <ChakraBaseProvider theme={theme}>
      <Flex
        align="center"
        justify="center"
        minH="100vh" // Set the minimum height to cover the viewport
        bg="#6CB4EE"
      >
        <Box
          w="100%" // Set the width to cover the full viewport
          bg="#6CB4EE"
          backgroundImage={Image}
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
                  h="475px"
                  mb={4}
                  mt="10px"
                  ml={"10px"}
                  bg={gradient}
                >
                  <CardHeader bg={gradient2} textAlign="center" py={2}>
                    <Text fontSize="20px" color="white" as="b">
                      {passport.name}
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <p color="white">
                      <Badge colorScheme="teal">Owner:</Badge>{" "}
                      <Text color="white">{passport.owner}</Text>
                    </p>
                    <p color="white">
                      <Badge colorScheme="messenger">Maintenance Party:</Badge>
                      <Text color="white">{passport.maintenanceParty}</Text>
                    </p>
                    <p>
                      <Badge colorScheme="twitter">Certifying Party:</Badge>{" "}
                      <Text color="white">{passport.certifyingParty}</Text>
                    </p>
                    <p>
                      <Badge colorScheme="purple">Description:</Badge>{" "}
                      <Text color="white" as={"b"}>
                        {passport.description}
                      </Text>
                    </p>
                    <p>
                      <Badge colorScheme="orange">Maintenance Performed:</Badge>{" "}
                      <Text color="white" as={"b"}>
                        {passport.maintenancePerformed ? "✅" : "⛔" }
                      </Text>
                    </p>
                    <p>
                      <Badge colorScheme="whatsapp">Certified:</Badge>{" "}
                        {passport.certified ? "✅" : "⛔" }
                    </p>
                    <Box position="relative" padding="10">
                      <Divider />
                      <AbsoluteCenter bg="white" px="4">
                        Exportable Data
                      </AbsoluteCenter>
                    </Box>
                    <ButtonGroup display="flex" justifyContent="center" mt={1}>
                      <History name={"History"} passport={passport} />
                    </ButtonGroup>
                    <Box position="relative" padding="5" mt={"15px"}>
                      <Divider />
                      <AbsoluteCenter bg="white" px="5"></AbsoluteCenter>
                    </Box>
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
