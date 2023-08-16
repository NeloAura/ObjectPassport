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
} from "@chakra-ui/react";
import VerticalNavigationBar from "../components/NavigationBar";
import AssignPopoverForm from "../components/PopOver/AssignPopOver";
import FieldForm from "../components/PopOver/Fields";
import History from "../components/modal/History";
import Image from "../assets/images/SPL.png";
import { SearchInput } from "@saas-ui/react";
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
          backgroundImage={Image}
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
                    w="450px"
                    h="550px"
                    mb={4}
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
                      <p>
                        <Badge colorScheme="teal">Owner:</Badge>{" "}
                        {passport.owner}
                      </p>
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
                      <p>
                        <Badge colorScheme="purple">Description:</Badge>{" "}
                        {passport.description}
                      </p>
                      <p>
                        <Badge colorScheme="orange">
                          Maintenance Performed:
                        </Badge>{" "}
                        {passport.maintenancePerformed ? "✅" : "⛔" }
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
                      <ButtonGroup
                        display="flex"
                        justifyContent="center"
                        mt={1}
                      >
                        <History name={"History"} passport={passport} />
                        <QRCode name={"QR-Code"} id={passport.id} />
                      </ButtonGroup>
                      <Box position="relative" padding="5" mt={"15px"}>
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