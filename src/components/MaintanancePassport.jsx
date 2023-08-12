import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Center,
  Card,
  ButtonGroup,
  CardHeader,
  CardBody,
  CardFooter,
  ChakraBaseProvider,
  extendTheme,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import VerticalNavigationBar from "./NavigationBar";
import CommentForm from "./PopOver/Comment";
import History from "./PopOver/History";
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";
import { format, fromUnixTime } from "date-fns";

const { ethers } = require("ethers");

const MaintenanceCard = () => {
  const theme = extendTheme({
    // Add your theme configurations here
  });

  // Function to handle editing of owner's details
  // const handleEditOwnerDetails = () => {
  //   // Implement the logic to save the edited owner details
  //   console.log("Owner details saved:", inputData);
  // };

  const [passports, setPassports] = useState([]);
  const [filteredPassports, setFilteredPassporst] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const contractAddress = "0xA3C8fD22e44695c97d180d108F3945DceCeb70A6";
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
        }

        // Update the state with fetched passports
        setPassports(fetchedPassports);
        setFilteredPassporst(
          passports.filter(
            (passport) =>
              passport.maintenanceParty.toLowerCase() ===
              userWalletAddress.toLowerCase()
          )
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching passports:", error);
        setLoading(false);
      }
    };

    fetchPassports();
  }, [abi, contractAddress, passports, userWalletAddress]);

  const formatDateToISO = (timestamp) => {
    const parsedDate = fromUnixTime(timestamp);
    return format(parsedDate, "yyyy-MM-dd");
  };

  return (
    <ChakraBaseProvider theme={theme}>
      <Flex>
        <VerticalNavigationBar />
        <Box display="flex" flexDirection="row" minW={"100%"} bg="lightgrey">
          {loading ? (
            <Center flexGrow={1} alignItems="center" justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          ) : filteredPassports.length === 0 ? (
            <Center flexGrow={1} alignItems="center" justifyContent="center">
              <Text textAlign="center" color="blue.500" fontSize="24px" as="b">
                No passport to perform Maintanance at the moment.
              </Text>
            </Center>
          ) : (
            filteredPassports.map((passport) => {

              const editableFields = passport.editableFields.split(", ");

              return(
              <Card
                key={passport.id}
                boxShadow="md"
                borderRadius="md"
                maxW="400px"
                maxH="400px"
                mb={4}
                mt="10px"
                ml="10px"
              >
                <CardHeader
                  bg="orange.500"
                  color="white"
                  textAlign="center"
                  py={2}
                >
                  Maintenance Passport
                </CardHeader>
                <CardBody>
                  <p>
                    <Badge colorScheme="orange">ID:</Badge>{" "}
                    <Badge>{passport.id}</Badge>
                  </p>
                  <p>
                    <Badge colorScheme="purple">Owner:</Badge>{" "}
                    <Badge>{passport.owner}</Badge>
                  </p>
                  <Stack spacing={3} mt="5px">
                    <InputGroup size="sm">
                      <InputLeftAddon children="name" bg="green.200" />
                      <Input
                        value={name || passport.name}
                        onChange={(e) => setName(e.target.value)}
                        isDisabled={!editableFields.includes("name")}
                      />
                    </InputGroup>

                    <InputGroup size="sm">
                      <InputLeftAddon children="description" bg="blue.200" />
                      <Input
                        value={description || passport.description}
                        onChange={(e) => setDescription(e.target.value)}
                        isDisabled={!editableFields.includes("description")}
                      />
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputLeftAddon children="expiration-date" bg="red.200" />
                      <Input
                        value={
                          expirationDate ||
                          formatDateToISO(parseInt(passport.expirationDate))
                        }
                        type="date"
                        onChange={(e) => setExpirationDate(e.target.value)}
                        isDisabled={!editableFields.includes("expirationDate")}
                      />
                    </InputGroup>
                    <ButtonGroup display="flex" justifyContent="center" mt={5} >
                  <History name={"History"} passport={passport} />
                </ButtonGroup>
                  </Stack>
                </CardBody>
                <CardFooter
                  bg="gray.100"
                  textAlign="center"
                  py={2}
                  justifyContent="center"
                >
                  <CommentForm
                    color={"green"}
                    button={"Save"}
                    id={passport.id}
                    name={name !== "" ? name : passport.name}
                    description={
                      description !== "" ? description : passport.description
                    }
                    expirationDate={
                      expirationDate !== ""
                        ? expirationDate
                        : formatDateToISO(parseInt(passport.expirationDate))
                    }
                  />
                  
                </CardFooter>
                </Card>
              );
            })
          )}
        </Box>
      </Flex>
    </ChakraBaseProvider>
  );
};


export default MaintenanceCard;
