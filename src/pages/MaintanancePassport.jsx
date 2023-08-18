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
  Divider,
  Text,
  Spinner,
  Select,
  Badge,
  Button,
  Wrap,
  WrapItem,
  VStack,
  AbsoluteCenter,
  Image,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import VerticalNavigationBar from "../components/NavigationBar";
import CommentForm from "../components/PopOver/util/Comment";
import History from "../components/modal/History";
import { SearchInput } from "@saas-ui/react";
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";
import { format, fromUnixTime } from "date-fns";
import Image1 from "../assets/images/SPL.png";
import {
  nationalities,
  genders,
} from "../components/PopOver/util/Nationalities";
import { Buffer } from "buffer";
const { ethers } = require("ethers");

const contractAddress = "0x57D72aC73CA959425916d9Bf2c313D49722C4c83";
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
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [mPhotoValue, setMPhotoValue] = useState("");
  const [buffer, setBuffer] = useState(null);
  const [expirationDate, setExpirationDate] = useState("");
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
        console.log(passports);
        setFilteredPassporst(
          passports.filter(
            (passport) =>
              passport[0][1].toLowerCase() ===
                userWalletAddress.toLowerCase() &&
              passport[0][0].toLowerCase().includes(value.toLowerCase()) &&
              (show || passport[0][9] === show)
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

  const captureFile = (eventvalue, event) => {
    setMPhotoValue(eventvalue);
    console.log(mPhotoValue);
    event.preventDefault();
    const file = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file); // Read buffered file

    // Callback
    reader.onloadend = () => {
      console.log("Buffer data: ", Buffer(reader.result));
      setBuffer(Buffer.from(reader.result));
    };
  };
  const formatDateToISO = (timestamp) => {
    const parsedDate = fromUnixTime(timestamp);
    return format(parsedDate, "yyyy-MM-dd");
  };

  const formatDateToISO2 = (timestamp) => {
    const parsedDate = fromUnixTime(timestamp);
    return format(parsedDate, "HH:mm:ss");
  };

  const handleClick = () => setShow(!show);

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
                  ml="500px"
                  bg="white"
                >
                  No passport to perform Maintanance at the moment.
                </Text>
              </Center>
            ) : (
              filteredPassports.map((passport) => {
                const editableFields = passport[0][6].split(", ");
                const timestamp = parseInt(passport[0][7]);
                const isoDate = formatDateToISO(timestamp);
                const isoTime =
                  formatDateToISO2(timestamp) === "20:00:00"
                    ? ""
                    : formatDateToISO2(timestamp);
                return (
                  <WrapItem key={passport.id}>
                    <Card
                      key={passport.id}
                      boxShadow="md"
                      borderRadius="md"
                      w="500px"
                      h="700px"
                      mb={4}
                      mt="10px"
                      ml={"10px"}
                    >
                      <CardHeader
                        bg="#01aece"
                        color="white"
                        textAlign="center"
                        py={2}
                        as="b"
                      >
                        Maintanance Card
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
                          <VStack>
                            <p>
                              <Badge colorScheme="orange">ID:</Badge>{" "}
                              <Badge>{passport.id}</Badge>
                            </p>
                            <p>
                              <Badge colorScheme="twitter">
                                Passport-name:
                              </Badge>
                              <Badge colorScheme="whatsapp">
                                {passport[0][3]}
                              </Badge>
                            </p>
                            <p>
                              <Badge colorScheme="twitter">Owner:</Badge>
                              <Badge colorScheme="whatsapp">
                                {passport[0][0]}
                              </Badge>
                            </p>
                            <p>
                              <Badge colorScheme="facebook">
                                Last Maintanance:
                              </Badge>{" "}
                              <Badge colorScheme="whatsapp">
                                {isoDate === "1969-12-31"
                                  ? "No Maintenance Performed yet"
                                  : isoDate}{""}
                                - {isoTime}
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

                        <Stack spacing={3} mt="7px">
                          <InputGroup size="sm">
                            <InputLeftAddon
                              children="passport-name"
                              bg="#68bfff"
                            />
                            <Input
                              defaultValue={passport[0][3]}
                              onChange={(e) => setName(e.target.value)}
                              isDisabled={!editableFields.includes("name")}
                            />
                          </InputGroup>
                          <InputGroup size="sm">
                            <InputLeftAddon children="full-name" bg="#68bfff" />
                            <Input
                              defaultValue={passport.fullname}
                              onChange={(e) => setFullName(e.target.value)}
                              isDisabled={!editableFields.includes("fullname")}
                            />
                          </InputGroup>

                          <InputGroup size="sm">
                            <InputLeftAddon
                              children="nationality"
                              bg="#7be0ea"
                            />
                            <Select
                              id={`nationality`}
                              defaultValue={passport.nationality}
                              onChange={(e) => setNationality(e.target.value)}
                              isDisabled={
                                !editableFields.includes("nationality")
                              }
                            >
                              {nationalities.map((nationality) => (
                                <option key={nationality} value={nationality}>
                                  {nationality}
                                </option>
                              ))}
                            </Select>
                          </InputGroup>

                          <InputGroup size="sm">
                            <InputLeftAddon children="gender" bg="#7be0ea" />
                            <Select
                              id={`gender`}
                              defaultValue={passport.sex}
                              onChange={(e) => setGender(e.target.value)}
                              isDisabled={!editableFields.includes("sex")}
                            >
                              {genders.map((gender) => (
                                <option key={gender} value={gender}>
                                  {gender}
                                </option>
                              ))}
                            </Select>
                          </InputGroup>

                          <InputGroup size="sm">
                            <InputLeftAddon
                              children="upload-new-photo"
                              bg="#6895ff"
                            />
                            <Input
                              type="file"
                              defaultValue={passport.photograph}
                              onChange={(e) => captureFile(e.target.value, e)}
                              isDisabled={
                                !editableFields.includes("photograph")
                              }
                            />
                          </InputGroup>
                          {passport[0][10] && (
                            <InputGroup size="sm">
                              <InputLeftAddon
                                children="expiration-date"
                                bg="#57a0d5"
                              />
                              <Input
                                defaultValue={formatDateToISO(
                                  parseInt(passport[0][8])
                                )}
                                type="date"
                                onChange={(e) =>
                                  setExpirationDate(e.target.value)
                                }
                                isDisabled={
                                  !editableFields.includes("expirationDate")
                                }
                              />
                            </InputGroup>
                          )}
                          {passport[0][10] && (
                            <ButtonGroup
                              display="flex"
                              justifyContent="center"
                              mt={5}
                            >
                              <History name={"History"} passport={passport} />
                              <a
                                href={passport[0][5]}
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
                        </Stack>
                      </CardBody>
                      <CardFooter
                        bg={passport[0][10] ? "gray.100" : "orange.300"}
                        textAlign="center"
                        py={2}
                        justifyContent="center"
                      >
                        {!passport[0][10] ? (
                          <Text as="b">
                            Passport Must be Certified in Order to Perform
                            Maintanance
                          </Text>
                        ) : (
                          <CommentForm
                            color={"green"}
                            button={"Save"}
                            id={passport.id}
                            name={name !== "" ? name : passport[0][3]}
                            fullname={
                              fullName !== "" ? fullName : passport.fullname
                            }
                            nationality={
                              nationality !== ""
                                ? nationality
                                : passport.nationality
                            }
                            gender={gender !== "" ? gender : passport.sex}
                            buffer={buffer}
                            useBuffer={setBuffer}
                            expirationDate={
                              expirationDate !== ""
                                ? expirationDate
                                : formatDateToISO(parseInt(passport[0][8]))
                            }
                            checker={passport[0][10]}
                          />
                        )}
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
