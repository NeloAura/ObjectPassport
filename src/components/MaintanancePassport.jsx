import VerticalNavigationBar from './NavigationBar';
import { Flex ,Box, Card, CardHeader, CardBody, CardFooter, Button , ChakraBaseProvider , extendTheme } from '@chakra-ui/react';
const passports = [];
const MaintenanceCard = () => {
  // Default data to display when there are no passports
  const defaultData = {
    id: 'Default ID',
    owner: 'Default Owner',
    certifyingParty: 'Default Certifying Party',
    maintenancePerformed: false,
  };

  const theme = extendTheme({
    
  });
  // Function to handle editing of owner's details
  const handleEditOwnerDetails = (passportId) => {
    // Implement the logic to allow the maintenance party to edit owner's details for the given passportId
    // You can use a separate modal or form to handle the editing process.
  };



  return (
    <ChakraBaseProvider theme={theme}>
    
    <Flex>
     <VerticalNavigationBar/>
     <Box style={{ position: 'relative' }}>
      {passports.length === 0 ? (
        <Card boxShadow="md" borderRadius="md" maxW="300px" mb={4} mt="10px">
          <CardHeader bg="blue.500" color="white" textAlign="center" py={2}>
            Certifier Passport
          </CardHeader>
          <CardBody>
            <p>Passport ID: {defaultData.id}</p>
            <p>Owner: {defaultData.owner}</p>
            <p>Maintenance Party: {defaultData.maintenanceParty}</p>
            <p>Certified: {defaultData.certified ? 'Yes' : 'No'}</p>
          </CardBody>
          <CardFooter bg="gray.100" textAlign="center" py={2}>
            No certifier passports available.
          </CardFooter>
       
        </Card>
      ) : (
        passports.map((passport) => (
          <Card key={passport.id} boxShadow="md" borderRadius="md" maxW="300px" mb={4} mt="10px">
            <CardHeader bg="green.500" color="white" textAlign="center" py={2}>
              Maintenance Passport
            </CardHeader>
            <CardBody>
              {/* ... Passport details display ... */}
            </CardBody>
            <CardFooter bg="gray.100" textAlign="center" py={2}>
              {/* Button to mark maintenance as performed */}
              <Button colorScheme="green" disabled={passport.maintenancePerformed}>
                Mark Maintenance Performed
              </Button>
              {/* Button to edit owner's details (only if maintenance party has permission) */}
              {passport.maintenanceParty === "YOUR_MANTENANCE_ADDRESS" && (
                <>
                  <Button
                    colorScheme="blue"
                    ml={2}
                    onClick={() => handleEditOwnerDetails(passport.id)}
                  >
                    Edit Owner's Details
                  </Button>
                  {/* Add more buttons for other fields that the maintenance party can edit */}
                  {/* For example, a button to edit certifyingParty */}
                  {/* <Button colorScheme="blue" ml={2} onClick={() => handleEditCertifyingParty(passport.id)}>
                    Edit Certifying Party
                  </Button> */}
                </>
              )}
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
