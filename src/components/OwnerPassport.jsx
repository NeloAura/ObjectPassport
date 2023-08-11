import {
  Flex,
  Box,
  Center,
  ButtonGroup,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ChakraBaseProvider,
  extendTheme,
  Badge,
  Spinner
} from "@chakra-ui/react";
import VerticalNavigationBar from "./NavigationBar";
import AssignPopoverForm from "./PopOver/AssignPopOver";
import FieldForm from "./PopOver/Fields";
import React, { useState, useEffect } from "react";
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";

const { ethers } = require("ethers");
const ObjectPassportCard = () => {
  const [passports, setPassports] = useState([]);
  const [filteredPassports, setFilteredPassporst] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userWalletAddress, setUserWalletAddress] = useState("");

  const contractAddress = "0x5FD0e620DB95F01c616Be49164c546B0123ac53c";
  const abi = ObjectPassportAbi.abi;

  useEffect(() => {
    const fetchPassports = async () => {
      // Connect to the Ethereum network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Load the smart contract
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        // Get the total number of passports
        const passportCount = await contract.passportCount();
        setUserWalletAddress(provider.provider.selectedAddress);

        // Fetch passport details
        const fetchedPassports = [];
        for (let i = 1; i <= passportCount; i++) {
          const passport = await contract.getPassportDetails(i);
          fetchedPassports.push({ id: i, ...passport });
          console.log("Fetched passport details");
        }

        // Update the state with fetched passports
        setPassports(fetchedPassports);
        setFilteredPassporst(passports.filter((passport) => passport.owner.toLowerCase() === userWalletAddress.toLowerCase()))
        setLoading(false);
      } catch (error) {
        console.error("Error fetching passports:", error);
        setLoading(false);
      }
    };

    fetchPassports();
  }, [abi, contractAddress, passports , userWalletAddress]);

  

  const theme = extendTheme({});

  return (
    <ChakraBaseProvider theme={theme}>
      <Flex>
        <VerticalNavigationBar />
        <Box display="flex" flexDirection="row" minW={"100%"}>
        {loading ? ( 
            <Center flexGrow={1} alignItems="center" justifyContent="center">
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Center>
          ) : (
            (filteredPassports.length === 0) ?  (
              <Center flexGrow={1} alignItems="center" justifyContent="center">
                <Text textAlign="center" color="blue.500" fontSize="24px" as="b">
                  No passport to show at the moment. Click the + button to add one.
                </Text>
              </Center>
            ) : (
              filteredPassports.map((passport) => (
              <Card
                key={passport.id}
                boxShadow="md"
                borderRadius="md"
                maxW="300px"
                maxH="500px"
                mb={4}
                mt="10px"
                mr={3}
              >
                <CardHeader
                  bg="blue.500"
                  textAlign="center"
                  py={2}
                >
                  <Text  fontSize="20px" color="white" as="b">{passport.name}</Text>
                  <ButtonGroup display="flex" justifyContent="center">
                  <AssignPopoverForm
                    name={"Transfer"}
                    color={"purple"}
                    formbutton={"Transfer"}
                  />
                </ButtonGroup>
                </CardHeader>
                <CardBody>
                  <p><Badge>Owner:</Badge> {passport.owner}</p>
                  <p><Badge>Maintenance Party:</Badge>{passport.maintenanceParty}</p>
                  <p><Badge>Certifying Party:</Badge> {passport.certifyingParty}</p>
                  <p><Badge>Description:</Badge> {passport.description}</p>
                  <p>
                  <Badge>Maintenance Performed:</Badge>{" "}
                    {passport.maintenancePerformed ? "Yes" : "No"}
                  </p>
                  <p><Badge>Certified:</Badge> {passport.certified ? "Yes" : "No"}</p>
                </CardBody>
                <CardFooter
                  bg="gray.100"
                  textAlign="center"
                  py={2}
                  justifyContent="center"
                >
                  <ButtonGroup display="flex" justifyContent="flex-end">
                    <AssignPopoverForm
                      name={"Certifier"}
                      color={"green"}
                      formbutton={"Assign"}
                    />
                    <FieldForm
                      name={"Maintenance"}
                      color={"orange"}
                      formbutton={"Assign"}
                      button={<FieldForm />}
                    />
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))
          ))}
        </Box>
      </Flex>
    </ChakraBaseProvider>
  );
};

export default ObjectPassportCard;
