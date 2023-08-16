import React, { useState, useEffect } from "react";
import VerticalNavigationBar from "../components/NavigationBar";
import {
  useToast,
  Input,
  InputGroup,
  InputLeftAddon,
  Flex,
  Box,
  Badge,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ButtonGroup,
  Text,
  Spinner,
  ChakraBaseProvider,
  Wrap,
  WrapItem,
  extendTheme,
  VStack,
} from "@chakra-ui/react";
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";
import { SearchInput } from "@saas-ui/react";
import { Buffer } from "buffer";
import Image from "../assets/images/SPL.png";
import ipfs from "../components/utils/ipfsApi";
import { format, fromUnixTime } from "date-fns";

const { ethers } = require("ethers");
const contractAddress = "0xA3C8fD22e44695c97d180d108F3945DceCeb70A6";
const abi = ObjectPassportAbi.abi;

const CertifierCard = () => {
  const [passports, setPassports] = useState([]);
  const [referenceDocument, setReferenceDocument] = useState("");
  const [referenceDocumentValue, setReferenceDocumentValue] = useState("");
  const [buffer, setBuffer] = useState(null);
  const toast = useToast(); // Initialize the toast
  const [filteredPassports, setFilteredPassporst] = useState([]);
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [value, setValue] = React.useState("");
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
              passport.certifyingParty.toLowerCase() ===
                userWalletAddress.toLowerCase() &&
              passport.owner.toLowerCase().includes(value.toLowerCase()) &&
              (show || passport.certified === show)
          )
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching passports:", error);
        setLoading(false);
      }
    };

    fetchPassports();
  }, [passports, userWalletAddress, value, show]);

  const captureFile = (eventvalue,event) => {
    setReferenceDocumentValue(eventvalue);
    event.preventDefault();
    const file = event.target.files[0];
    
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);  // Read buffered file

    // Callback
    reader.onloadend = () => {
      setBuffer(Buffer.from(reader.result));
      
    };
  };

  const theme = extendTheme({});

  const formatDateToISO = (timestamp) => {
    const parsedDate = fromUnixTime(timestamp);
    return format(parsedDate, "yyyy-MM-dd");
  };

  const formatDateToISO2 = (timestamp) => {
    const parsedDate = fromUnixTime(timestamp);
    return format(parsedDate, "HH:mm:ss");
  };
  const handleClick = () => setShow(!show);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const Certify = async (id) => {
    try {
      const result = await ipfs.add(buffer);
      if (result) {
      setReferenceDocument(result.path)
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setWaiting(true);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const certify = await contract.certifyObject(id ,referenceDocument);
      await certify.wait();

      toast({
        title: "Certification successfull",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      console.log("Certification successfull!");
      // You can handle the success message and any other necessary actions here
    }} catch (error) {
      console.error("Error Certifying:", error);

      // Handle error, e.g., show an error message to the user
    } finally {
      setWaiting(false);
    }
  };

  const handleCertifyClick = (id) => {
    Certify(id);
  };

  return (
    <ChakraBaseProvider theme={theme}>
      <SearchInput
        placeholder="Search by Owner Address"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onReset={() => setValue("")}
        rightElement=<Button
          colorScheme={show ? "yellow" : "whatsapp"}
          h="2.00rem"
          minW="unset"
          size="lg"
          onClick={handleClick}
          mr={"175px"}
        >
          <Text>{show ? "Pending Passports " : " All Passports"}</Text>
        </Button>
      />
      <Flex>
        <VerticalNavigationBar />
        <Box
          display="flex"
          flexDirection="row"
          minW={"100%"}
          bg="#6CB4EE"
          backgroundImage={Image}
          backgroundSize="contain"
          backgroundPosition="center"
          backgroundRepeat="repeat"
        >
          <Wrap spacing={4} justify="center">
            {loading || waiting ? (
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
                <Text
                  textAlign="center"
                  color="#C40234"
                  fontSize="24px"
                  as="b"
                  mt="300px"
                  ml="575px"
                  bg="white"
                >
                  No passport to Certify at the moment.
                </Text>
              </Center>
            ) : (
              filteredPassports.map((passport) => (
                <WrapItem key={passport.id}>
                  <Card
                    key={passport.id}
                    boxShadow="md"
                    borderRadius="md"
                    w="450px"
                    h="550px"
                    mb={4}
                    mt="10px"
                    ml={"10px"}
                  >
                    <CardHeader
                      bg={passport.certified ? "green.500" : "yellow.400"}
                      color="white"
                      textAlign="center"
                      py={2}
                      as="b"
                    >
                      {passport.certified ? "Certified✔️" : "Pending🚧"}
                    </CardHeader>
                    <CardBody>
                      <p>
                        <Badge colorScheme="orange">ID:</Badge>{" "}
                        <Badge>{passport.id}</Badge>
                      </p>
                      <p>
                        <Badge colorScheme="twitter">Name:</Badge>
                        <Badge colorScheme="whatsapp">{passport.name}</Badge>
                      </p>
                      <p>
                        <Badge colorScheme="twitter">Owner:</Badge>{" "}
                        {passport.owner}
                      </p>
                      <p>
                        <Badge colorScheme="facebook">Maintenance Party:</Badge>
                        {passport.maintenanceParty}
                      </p>
                      <p>
                        <Badge colorScheme="purple">Last Maintanance:</Badge>{" "}
                        <Badge colorScheme="yellow">
                          {formatDateToISO(
                            parseInt(passport.lastMaintenanceTimestamp)
                          ) === "1969-12-31"
                            ? "No Maintanance Performed yet"
                            : formatDateToISO(
                                parseInt(passport.lastMaintenanceTimestamp)
                              )}{" "}
                          @{" "}
                          {formatDateToISO2(
                            parseInt(passport.lastMaintenanceTimestamp)
                          )}{" "}
                        </Badge>
                      </p>
                      <p>
                        <Badge colorScheme="pink">Expiration-Date:</Badge>{" "}
                        <Badge>
                          {formatDateToISO(parseInt(passport.expirationDate))}
                        </Badge>
                      </p>

                      <p>
                        <Badge colorScheme="blue">Description:</Badge>{" "}
                        {passport.description}
                      </p>
                      <p>
                        <Badge colorScheme="green">Certified:</Badge>{" "}
                        {passport.certified ? "✅" : "⛔"}
                      </p>
                    </CardBody>
                    <CardFooter
                      bg="gray.100"
                      textAlign="center"
                      py={2}
                      justifyContent={"center"}
                    >
                    <VStack>
                    {passport.certified &&
                      <InputGroup size="sm">
                        <InputLeftAddon
                          children="upload-certification-file"
                          bg="#6895ff"
                        />
                        <Input
                          type="file"
                          value={referenceDocumentValue}
                          onChange={(e) => captureFile(e.target.value , e)}
                        />
                      </InputGroup>
                    }
                    {!passport.certified &&
                      <ButtonGroup>
                        <Button
                          colorScheme="blue"
                          isDisabled={passport.certified}
                          onClick={() => {
                            handleCertifyClick(passport.id);
                          }}
                        >
                          Mark Certified
                        </Button>
                      </ButtonGroup>
                    }
                      </VStack>
                    </CardFooter>
                  </Card>
                </WrapItem>
              ))
            )}
          </Wrap>
        </Box>
      </Flex>
    </ChakraBaseProvider>
  );
};

export default CertifierCard;
