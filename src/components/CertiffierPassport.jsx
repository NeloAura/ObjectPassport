import React, { useState, useEffect } from "react";
import VerticalNavigationBar from './NavigationBar';
import { Flex ,Box,Badge,Center, Card, CardHeader, CardBody, CardFooter ,Button ,ButtonGroup, Text, Spinner,ChakraBaseProvider, extendTheme} from '@chakra-ui/react';
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";
const { ethers } = require("ethers");

const CertifierCard = () => {
  
  const [passports, setPassports] = useState([]);
  const [filteredPassports, setFilteredPassporst] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userWalletAddress, setUserWalletAddress] = useState("");

  
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
        setFilteredPassporst(passports.filter((passport) => passport.certifyingParty.toLowerCase() === userWalletAddress.toLowerCase()))
        setLoading(false);
      } catch (error) {
        console.error("Error fetching passports:", error);
        setLoading(false);
      }
    };

    fetchPassports();
  }, [abi, contractAddress, passports, userWalletAddress ]);
  
  const theme = extendTheme({
    
  });


 

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

   const Certify = async (id) => {
    try {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const certify = await contract.certifyObject(
        id
      );
      await certify.wait();
      console.log("Certification successfull!");
      // You can handle the success message and any other necessary actions here
    } catch (error) {
      console.error("Error Certifying:", error);
      // Handle error, e.g., show an error message to the user
    } finally {
      
    }
  };

  const handleCertifyClick = (id) => {
    Certify(id);
  };

  return (
    <ChakraBaseProvider theme={theme}>
    
    <Flex>
     <VerticalNavigationBar/>
     <Box display="flex" flexDirection="row" minW={"100%"} bg="lightgrey">
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
                  No passport to Certify at the moment.
                </Text>
              </Center>
            ) : (
        passports.map((passport) => (
          <Card key={passport.id} boxShadow="md" borderRadius="md" maxW="400px" maxH="400px" mb={4} mt="10px" ml="10px">
            <CardHeader bg="green.500" color="white" textAlign="center" py={2}>
              Certifier Passport
            </CardHeader>
            <CardBody>
            <p><Badge colorScheme="orange">ID:</Badge> <Badge>{passport.id}</Badge></p>
            <p><Badge>Name:</Badge>{passport.name}</p>
              <p><Badge>Owner:</Badge> {passport.owner}</p>
                  <p><Badge>Maintenance Party:</Badge>{passport.maintenanceParty}</p>
                  <p><Badge>Certifying Party:</Badge> {passport.certifyingParty}</p>
                  <p><Badge>Description:</Badge> {passport.description}</p>
                  <p><Badge>Certified:</Badge> {passport.certified ? "Yes" : "No"}</p>
            </CardBody>
            <CardFooter bg="gray.100" textAlign="center" py={2} justifyContent={"center"}>
              {/* Button to mark object as certified */}
              <ButtonGroup >
              <Button colorScheme="blue" isDisabled={passport.certified} onClick={()=>{handleCertifyClick(passport.id)}}>
                Mark Certified
              </Button>
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

export default CertifierCard;
