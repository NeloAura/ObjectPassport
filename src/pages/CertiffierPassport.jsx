import React, { useState, useEffect } from "react";
import VerticalNavigationBar from "../components/NavigationBar";
import {
  useToast,
  Input,
  InputGroup,
  InputLeftAddon,
  Image,
  Flex,
  Box,
  Badge,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  AbsoluteCenter,
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
import { ExternalLinkIcon } from "@chakra-ui/icons";
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";
import { SearchInput } from "@saas-ui/react";
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";
import Image1 from "../assets/images/SPL.png";
import ipfs from "../components/utils/ipfsApi";
import { format, fromUnixTime } from "date-fns";

const { ethers } = require("ethers");
const contractAddress = "0xA1A1A21A46988A13e3F0B55a51c909732A134eE4";
const abi = ObjectPassportAbi.abi;
const key = "APAT!";

const CertifierCard = () => {
  const [passports, setPassports] = useState([]);
  const [buffer, setBuffer] = useState(null);
  const toast = useToast(); 
  const [filteredPassports, setFilteredPassporst] = useState([]);
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [value, setValue] = React.useState("");
  const [show, setShow] = React.useState(true);

  useEffect(() => {
    const fetchPassports = async () => {
     
      const provider = new ethers.providers.Web3Provider(window.ethereum);
   
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
       
        const passportCount = await contract.passportCount();
        setUserWalletAddress(provider.provider.selectedAddress);

      
        const fetchedPassports = [];
        for (let i = 1; i <= passportCount; i++) {
          const passport = await contract.getPassportDetails(i);
          fetchedPassports.push({ id: i, ...passport });
        }

        
        setPassports(fetchedPassports);
        setFilteredPassporst(
          passports.filter(
            (passport) =>
              passport[0][2].toLowerCase() ===
                userWalletAddress.toLowerCase() &&
              passport[0][0].toLowerCase().includes(value.toLowerCase()) &&
              (show || passport[0][10] === show)
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

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file); 

    
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
        const document = `https://ap.infura-ipfs.io/ipfs/${result.path}`;
        const documentHash = CryptoJS.AES.encrypt(
          document,
          key
        ).toString();
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setWaiting(true);
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const certify = await contract.certifyObject(id, documentHash);
        await certify.wait();

        toast({
          title: "Certification successfull",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        
      }
    } catch (error) {
      console.error("Error Certifying:", error);

      
    } finally {
      setWaiting(false);
    }
  };

  const handleCertifyClick = (id) => {
    if (buffer === null) {
      toast({
        title: "Please Upload Certification File",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
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
          backgroundImage={Image1}
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
                    w="550px"
                    h="610px"
                    mb={4}
                    mt="10px"
                    ml={"10px"}
                  >
                    <CardHeader
                      bg={passport[0][10] ? "green.500" : "yellow.400"}
                      color="white"
                      textAlign="center"
                      py={2}
                      as="b"
                    >
                      {passport[0][10] ? "Certified✔️" : "Pending🚧"}
                    </CardHeader>
                    <CardBody>
                      <Center>
                        <Image
                          mb={"5"}
                          boxSize="100px"
                          objectFit="cover"
                          src={CryptoJS.AES.decrypt(passport.photograph, key).toString(
                          CryptoJS.enc.Utf8
                        )}
                          alt="Profile"
                          fallbackSrc="https://scontent.fcur3-1.fna.fbcdn.net/v/t39.30808-6/240603964_4096273620501601_1563941666359861447_n.png?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=i2nOPFapG88AX8708VQ&_nc_ht=scontent.fcur3-1.fna&oh=00_AfD2Z-n9qmh0Gs3ZHgOp4UfW7OQyfXoJ8HHcBusUxLS_Ig&oe=64E2F878"
                        />
                      </Center>
                      <Center>
                        <VStack>
                          <p>
                            <Badge colorScheme="orange">ID:</Badge>{" "}
                            <Badge>{passport.id}</Badge>
                          </p>
                          <p>
                            <Badge colorScheme="twitter">Passport-name:</Badge>
                            <Badge colorScheme="whatsapp">
                              {passport[0][3]}
                            </Badge>
                          </p>
                        </VStack>
                      </Center>
                      <Box position="relative" padding="5">
                        <Divider />
                        <AbsoluteCenter as={"b"} px="2">
                          Personal Data
                        </AbsoluteCenter>
                      </Box>
                      <p>
                        <Badge colorScheme="twitter">Owner:</Badge>{" "}
                        {passport[0][0]}
                      </p>
                      <p>
                        <Badge colorScheme="teal">Fullname:</Badge>{" "}
                        {CryptoJS.AES.decrypt(passport.fullname, key).toString(
                          CryptoJS.enc.Utf8
                        )}
                      </p>
                      <p>
                        <Badge colorScheme="purple">Nationality:</Badge>{" "}
                        {passport.nationality}
                      </p>
                      <p>
                        <Badge colorScheme="purple">Sex:</Badge> {passport.sex}
                      </p>
                      <Box position="relative" padding="5">
                        <Divider />
                        <AbsoluteCenter as={"b"} px="2">
                          Details
                        </AbsoluteCenter>
                      </Box>
                      <p>
                        <Badge colorScheme="facebook">Maintenance Party:</Badge>
                        {passport[0][1]}
                      </p>
                      <p>
                        <Badge colorScheme="telegram">Justification:</Badge>{" "}
                        <Text color="black" as={"kbd"}>
                          {passport[0][4]}
                        </Text>
                      </p>
                      {passport[0][10] && (
                        <p>
                          <Badge colorScheme="pink">Expiration-Date:</Badge>{" "}
                          <Badge>
                            {formatDateToISO(parseInt(passport[0][8]))} -{" "}
                            {formatDateToISO2(parseInt(passport[0][8]))}
                          </Badge>
                        </p>
                      )}
                      <p>
                        <Badge colorScheme="green">Certified:</Badge>{" "}
                        {passport[0][10] ? "✅" : "⛔"}
                      </p>
                    </CardBody>
                    <CardFooter
                      bg="gray.100"
                      textAlign="center"
                      py={2}
                      justifyContent={"center"}
                    >
                      <VStack>
                        {!passport[0][10] && (
                          <InputGroup size="sm">
                            <InputLeftAddon
                              children="upload-certification-file"
                              bg="#6895ff"
                            />
                            <Input
                              type="file"
                              accept=".pdf"
                              onChange={(e) => captureFile(e)}
                            />
                          </InputGroup>
                        )}
                        {!passport[0][10] && (
                          <ButtonGroup>
                            <Button
                              colorScheme="blue"
                              isDisabled={passport[0][10]}
                              onClick={() => {
                                handleCertifyClick(passport.id);
                              }}
                            >
                              Mark Certified
                            </Button>
                          </ButtonGroup>
                        )}
                        {passport[0][10] && (
                          <ButtonGroup>
                            <a
                              href={CryptoJS.AES.decrypt(passport[0][5] , key).toString(
                          CryptoJS.enc.Utf8
                        )}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Button
                                rightIcon={<ExternalLinkIcon />}
                                bgColor={"#b9c57a"}
                              >
                                Certification🤝✔️
                              </Button>
                            </a>
                          </ButtonGroup>
                        )}
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
