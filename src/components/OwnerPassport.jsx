import {
  Flex,
  Box,
  ButtonGroup,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ChakraBaseProvider,
  extendTheme,
  Badge
} from "@chakra-ui/react";
import VerticalNavigationBar from "./NavigationBar";
import AssignPopoverForm from "./PopOver/AssignPopOver";
import FieldForm from "./PopOver/Fields";
import React, { useState, useEffect } from "react";
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";

const { ethers } = require("ethers");
const ObjectPassportCard = () => {
  const [passports, setPassports] = useState([]);

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
        console.log("Total passport count:", passportCount);

        // Fetch passport details
        const fetchedPassports = [];
        for (let i = 1; i <= passportCount; i++) {
          const passport = await contract.getPassportDetails(i);
          fetchedPassports.push(passport);
          console.log("Fetched passport details:", passport);
        }

        // Update the state with fetched passports
        setPassports(fetchedPassports);
      } catch (error) {
        console.error("Error fetching passports:", error);
      }
    };

    fetchPassports();
  }, [abi, contractAddress]);

  // Default data to display when there are no passports
  const defaultData = {
    id: "Default ID",
    owner: "Default Owner",
    maintenanceParty: "Default Maintenance Party",
    certifyingParty: "Default Certifying Party",
    description:"Hello",
    maintenancePerformed: false,
    certified: false,
  };

  const theme = extendTheme({});

  return (
    <ChakraBaseProvider theme={theme}>
      <Flex>
        <VerticalNavigationBar />
        <Box display="flex" flexDirection="row" >
          {passports.length === 0 ? (
            <Card
              boxShadow="md"
              borderRadius="md"
              maxW="300px"
              maxH="300px"
              colorScheme="blue"
              mt="10px"
              mr="10px"
            >
              <CardHeader
                bg="blue.500"
                py={2}
                justifyContent="center"
                textAlign="center"
              >
                <Text fontSize="20px" color="white" as="b">
                  Euro Pass
                </Text>
                <ButtonGroup display="flex" justifyContent="center">
                  <AssignPopoverForm
                    name={"Transfer"}
                    color={"purple"}
                    formbutton={"Transfer"}
                  />
                </ButtonGroup>
              </CardHeader>
              <CardBody>
                <p>Owner: {defaultData.owner}</p>
                <p>Maintenance Party: {defaultData.maintenanceParty}</p>
                <p>Certifying Party: {defaultData.certifyingParty}</p>
                <p>Description: {defaultData.description}</p>
                <p>
                  Maintenance Performed:{" "}
                  {defaultData.maintenancePerformed ? "Yes" : "No"}
                </p>
                <p>Certified: {defaultData.certified ? "Yes" : "No"}</p>
              </CardBody>
              <CardFooter
                bg="gray.100"
                textAlign="center"
                py={2}
                justifyContent="center"
              >
                <p>No passport available ,Create </p>
              </CardFooter>
            </Card>
          ) : (
            passports.map((passport) => (
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
                  color="white"
                  textAlign="center"
                  py={2}
                >
                  {passport.name}
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
          )}
        </Box>
      </Flex>
    </ChakraBaseProvider>
  );
};

export default ObjectPassportCard;
