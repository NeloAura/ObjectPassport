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
  Button,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import VerticalNavigationBar from "../components/NavigationBar";
import CommentForm from "../components/PopOver/util/Comment";
import History from "../components/modal/History";
import { SearchInput } from '@saas-ui/react'
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";
import { format, fromUnixTime } from "date-fns";
import Image from "../assets/images/SPL.png"
const { ethers } = require("ethers");

const contractAddress = "0xA3C8fD22e44695c97d180d108F3945DceCeb70A6";
const abi = ObjectPassportAbi.abi;

const MaintenanceCard = () => {
  const theme = extendTheme({
    // Add your theme configurations here
  });


  const [passports, setPassports] = useState([]);
  const [filteredPassports, setFilteredPassporst] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [value, setValue] = React.useState('')
  const [show, setShow] = React.useState(true);

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
              userWalletAddress.toLowerCase()&&
              passport.owner.toLowerCase().includes(value.toLowerCase()) &&
              (show || passport.maintenancePerformed === show)
          )
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching passports:", error);
        setLoading(false);
      }
    };

    fetchPassports();
  }, [ passports, userWalletAddress , value , show]);

  const formatDateToISO = (timestamp) => {
    const parsedDate = fromUnixTime(timestamp);
    return format(parsedDate, "yyyy-MM-dd");
  };

  const formatDateToISO2 = (timestamp) => {
    const parsedDate = fromUnixTime(timestamp);
    return format(parsedDate, "HH:mm:ss");
  };

  const handleClick = () => setShow(!show)

  return (
    <ChakraBaseProvider theme={theme}>
     <SearchInput
      placeholder="Search by Owner Address"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onReset={() => setValue('')}
      rightElement=<Button colorScheme={show?"yellow":"whatsapp"} h='2.00rem' minW="unset"  size='lg' onClick={handleClick} mr={"175px"}>
          <Text>{show ? 'Pending Passports ' : ' All Passports'}</Text>
        </Button>
    />
    
      <Flex>
        <VerticalNavigationBar />
        <Box display="flex" flexDirection="row" minW={"100%"} bg="#6CB4EE" backgroundImage={Image} 
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="repeat">
        <Wrap spacing={4} justify="center" >
          {loading ? (
            <Center flexGrow={1} alignItems="center" justifyContent="center">
              <Spinner
                mt="350px"
                ml="750px"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="red.500"
                size="xl"
              />
            </Center>
          ) : filteredPassports.length === 0 ? (
            <Center flexGrow={1} alignItems="center" justifyContent="center">
            
              <Text textAlign="center" color="#C40234" fontSize="24px" as="b" mt="300px" ml="500px" bg="white">
                No passport to perform Maintanance at the moment.
              </Text>
              
            </Center>
          ) : (
            filteredPassports.map((passport) => {

              const editableFields = passport.editableFields.split(", ");

              return(
                <WrapItem key={passport.id}>
              <Card
               key={passport.id} boxShadow="md" borderRadius="md" w="450px" h="550px" mb={4} mt="10px" ml={"10px"}
              >
                <CardHeader
                  bg="#01aece" color="white" textAlign="center" py={2} as="b" 
                >
                 Maintanance Card
                </CardHeader>
                <CardBody>
                  <p>
                    <Badge colorScheme="twitter">ID:</Badge>{" "}
                    <Badge colorScheme="teal">{passport.id}</Badge>
                  </p>
                  <p>
                    <Badge colorScheme="twitter">Owner:</Badge>{" "}
                    <Badge colorScheme="teal">{passport.owner}</Badge>
                  </p>
                  <p>
                    <Badge colorScheme="facebook">Last Maintanance:</Badge>{" "}
                    <Badge colorScheme="whatsapp">{formatDateToISO(parseInt(passport.lastMaintenanceTimestamp))==="1969-12-31"?("No Maintanance Performed yet"):formatDateToISO(parseInt(passport.lastMaintenanceTimestamp))} @ {formatDateToISO2(parseInt(passport.lastMaintenanceTimestamp))} </Badge>
                  </p>
                  <Stack spacing={3} mt="5px">
                    <InputGroup size="sm">
                      <InputLeftAddon children="name" bg="#68bfff" />
                      <Input
                        defaultValue={passport.name}
                        onChange={(e) => setName(e.target.value)}
                        isDisabled={!editableFields.includes("name")}
                      />
                    </InputGroup>

                    <InputGroup size="sm">
                      <InputLeftAddon children="description" bg="#6895ff" />
                      <Input
                        defaultValue={passport.description}
                        onChange={(e) => setDescription(e.target.value)}
                        isDisabled={!editableFields.includes("description")}
                      />
                    </InputGroup>
                    {passport.certified &&
                    <InputGroup size="sm">
                      <InputLeftAddon children="expiration-date" bg="#57a0d5" />
                      <Input
                        defaultValue={
                          formatDateToISO(parseInt(passport.expirationDate))
                        }
                        type="date"
                        onChange={(e) => setExpirationDate(e.target.value)}
                        isDisabled={!editableFields.includes("expirationDate")}
                      />
                    </InputGroup>
                    }
                    <ButtonGroup display="flex" justifyContent="center" mt={5} >
                  <History name={"History"} passport={passport} />
                 
                </ButtonGroup>
                  </Stack>
                </CardBody>
                <CardFooter
                  bg={passport.certified?"gray.100":"orange.300"}
                  textAlign="center"
                  py={2}
                  justifyContent="center"
                >
                   {!passport.certified ?(<Text as="b">Passport Must be Certified in Order to Perform Maintanance</Text>):
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
                    checker={passport.certified}
                  />
                   }
                </CardFooter>
                </Card>
                </WrapItem>
              );
            })
          )}
          </Wrap>
        </Box>
      </Flex>
    </ChakraBaseProvider>
  );
};


export default MaintenanceCard;