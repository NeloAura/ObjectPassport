import React, { useState } from "react";
import {
  Flex,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ChakraBaseProvider,
  extendTheme,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Badge
} from "@chakra-ui/react";
import VerticalNavigationBar from "./NavigationBar";

const passports = [];

const MaintenanceCard = () => {
  const [defaultData, setDefaultData] = useState({
    id: "Default ID",
    owner: "Default Owner",
    certifyingParty: "Default Certifying Party",
    maintenancePerformed: false,
  });

  const theme = extendTheme({
    // Add your theme configurations here
  });

  // Function to handle editing of owner's details
  const handleEditOwnerDetails = () => {
    // Implement the logic to save the edited owner details
    console.log("Owner details saved:", defaultData);
  };

  return (
    <ChakraBaseProvider theme={theme}>
      <Flex>
        <VerticalNavigationBar />
        <Box style={{ position: "relative" }}>
          {passports.length === 0 ? (
            <Card
              boxShadow="md"
              borderRadius="md"
              maxW="300px"
              mb={4}
              mt="10px"
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
                <p><Badge colorScheme="orange">ID:</Badge> <Badge>{defaultData.id}</Badge></p>
                <p><Badge colorScheme="purple">Owner:</Badge> <Badge>{defaultData.owner}</Badge></p>
                <Stack spacing={3} mt="5px">
                  <InputGroup size="sm" >
                    <InputLeftAddon children="Name" bg="green.200"/>
                    <Input 
                      value={defaultData.owner}
                      onChange={(e) =>
                        setDefaultData({
                          ...defaultData,
                          owner: e.target.value,
                        })
                      }
                    />
                  </InputGroup>

                  <InputGroup size="sm">
                    <InputLeftAddon children="description" bg="blue.200" />
                    <Input value={defaultData.owner}
                      onChange={(e) =>
                        setDefaultData({
                          ...defaultData,
                          owner: e.target.value,
                        })
                      }/>
                  </InputGroup>
                </Stack>
              </CardBody>
              <CardFooter
                bg="gray.100"
                textAlign="center"
                py={2}
                justifyContent="center"
              >
                <Button
                  colorScheme="green"
                  ml={2}
                  onClick={handleEditOwnerDetails}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          ) : (
            passports.map((passport) => (
              <Card
                key={passport.id}
                boxShadow="md"
                borderRadius="md"
                maxW="300px"
                mb={4}
                mt="10px"
              >
                <CardHeader
                  bg="orange.500"
                  color="white"
                  textAlign="center"
                  py={2}
                >
                  Maintenance Passport
                </CardHeader>
                <CardBody>{/* ... Passport details display ... */}</CardBody>
                <CardFooter bg="gray.100" textAlign="center" py={2}>
                  <Button
                    colorScheme="green"
                    ml={2}
                    onClick={handleEditOwnerDetails}
                  >
                    Save
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </Box>
      </Flex>
    </ChakraBaseProvider>
  );
};

export default MaintenanceCard;
