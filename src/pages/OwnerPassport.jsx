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
  CardFooter,
  ChakraBaseProvider,
  Divider,
  AbsoluteCenter,
  extendTheme,
  Badge,
  Spinner,
  Wrap,
  WrapItem,
  Image,
} from "@chakra-ui/react";
import VerticalNavigationBar from "../components/NavigationBar";
import AssignPopoverForm from "../components/PopOver/AssignPopOver";
import FieldForm from "../components/PopOver/Fields";
import History from "../components/modal/History";
import Image1 from "../assets/images/SPL.png";
import { SearchInput } from "@saas-ui/react";
import { format, fromUnixTime } from "date-fns";
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";
import QRCode from "../components/QRCode";

const contractAddress = "0xA3C8fD22e44695c97d180d108F3945DceCeb70A6";
const abi = ObjectPassportAbi.abi;

const { ethers } = require("ethers");
const ObjectPassportCard = () => {
  const [passports, setPassports] = useState([]);
  const [filteredPassports, setFilteredPassporst] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [value, setValue] = React.useState("");

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
              passport.owner.toLowerCase() ===
                userWalletAddress.toLowerCase() &&
              passport.name.toLowerCase().includes(value.toLowerCase())
          )
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching passports:", error);
        setLoading(false);
      }
    };

    fetchPassports();
  }, [passports, userWalletAddress, value]);

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
      <SearchInput
        placeholder="Search by Passport Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onReset={() => setValue("")}
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
                <Text
                  textAlign="center"
                  color="#C40234"
                  fontSize="24px"
                  as="b"
                  mt="300px"
                  ml="400px"
                  bg="white"
                >
                  No passport to show at the moment. Click the + button to add
                  one.
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
                    h="710px"
                    mb={10}
                    mt="10px"
                    ml={"10px"}
                  >
                    <CardHeader bg="blue.500" textAlign="center" py={2}>
                      <Text fontSize="20px" color="white" as="b">
                        {passport.name}
                      </Text>
                      <ButtonGroup display="flex" justifyContent="center">
                        <AssignPopoverForm
                          name={"Transfer"}
                          color={"purple"}
                          formbutton={"Transfer"}
                          id={passport.id}
                        />
                      </ButtonGroup>
                    </CardHeader>
                    <CardBody>
                    <Center>
                      <Image
                        mb={"5"}
                        boxSize="100px"
                        objectFit="cover"
                        src={passport.photograph}
                        alt="Profile"
                        fallbackSrc='https://scontent.fcur3-1.fna.fbcdn.net/v/t39.30808-6/240603964_4096273620501601_1563941666359861447_n.png?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=i2nOPFapG88AX8708VQ&_nc_ht=scontent.fcur3-1.fna&oh=00_AfD2Z-n9qmh0Gs3ZHgOp4UfW7OQyfXoJ8HHcBusUxLS_Ig&oe=64E2F878'
                      />
                      </Center>
                      <p>
                        <Badge colorScheme="teal">Owner:</Badge>{" "}
                        {passport.owner}
                      </p>
                      <Box   position="relative" padding="4">
                        <Divider />
                        <AbsoluteCenter as={"b"} px="2">
                          Parties
                        </AbsoluteCenter>
                      </Box>
                      <p>
                        <Badge colorScheme="messenger">
                          Maintenance Party:
                        </Badge>
                        {passport.maintenanceParty}
                      </p>
                      <p>
                        <Badge colorScheme="twitter">Certifying Party:</Badge>{" "}
                        {passport.certifyingParty}
                      </p>
                      <Box   position="relative" padding="4">
                        <Divider />
                        <AbsoluteCenter as={"b"} px="2">
                          Details
                        </AbsoluteCenter>
                      </Box>
                      <p>
                        <Badge colorScheme="teal">Fullname:</Badge>{" "}
                        {passport.fullname}
                      </p>
                      <p>
                        <Badge colorScheme="purple">Nationality:</Badge>{" "}
                        {passport.nationality}
                      </p>
                      <p>
                        <Badge colorScheme="purple">Sex:</Badge>{" "}
                        {passport.sex}
                      </p>
                      
                      <p>
                        <Badge colorScheme="orange">
                          Maintenance Performed:
                        </Badge>{" "}
                        {passport.maintenancePerformed ? "✅" : "⛔"}
                      </p>
                      <p>
                        <Badge colorScheme="whatsapp">Certified:</Badge>{" "}
                        {passport.certified ? "✅" : "⛔"}
                      </p>
                   
                      {passport.certified &&
                      <p>
                        <Badge colorScheme="red">Expiration-date:</Badge>{" "}
                        {formatDateToISO(parseInt(passport.expirationDate))} - {formatDateToISO2(parseInt(passport.expirationDate))}
                      </p>
                      }
                      <Box position="relative" padding="10">
                        <Divider />
                        <AbsoluteCenter bg="white" px="4">
                          Exportable Data
                        </AbsoluteCenter>
                      </Box>
                      <ButtonGroup
                        display="flex"
                        justifyContent="center"
                        mt={1}
                      >
                        <History name={"History"} passport={passport} />
                        <QRCode name={"QR-Code"} id={passport.id} />
                      </ButtonGroup>
                      <Box position="relative" padding="3" mt={"15px"}>
                        <Divider />
                        <AbsoluteCenter bg="white" px="5">
                          Actions
                        </AbsoluteCenter>
                      </Box>
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
                          id={passport.id}
                        />
                        <FieldForm
                          name={"Maintenance"}
                          color={"orange"}
                          formbutton={"Assign"}
                          button={<FieldForm />}
                          id={passport.id}
                        />
                      </ButtonGroup>
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

export default ObjectPassportCard;
