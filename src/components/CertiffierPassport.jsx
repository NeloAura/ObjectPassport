import VerticalNavigationBar from './NavigationBar';
import { Flex ,Box,Card, CardHeader, CardBody, CardFooter ,Button ,ChakraBaseProvider, extendTheme} from '@chakra-ui/react';
const passports = [];
const CertifierCard = () => {
  // Default data to display when there are no passports
  const defaultData = {
    id: 'Default ID',
    owner: 'Default Owner',
    maintenanceParty: 'Default Maintenance Party',
    certified: false,
  };

  const theme = extendTheme({
    
  });

  return (
    <ChakraBaseProvider theme={theme}>
    
    <Flex>
     <VerticalNavigationBar/>
     <Box style={{ position: 'relative' }}>
      {passports.length === 0 ? (
        <Card boxShadow="md" borderRadius="md" maxW="300px" mb={4} colorScheme='blue' mt="10px">
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
            <CardHeader bg="blue.500" color="white" textAlign="center" py={2}>
              Certifier Passport
            </CardHeader>
            <CardBody>
              <p>Passport ID: {passport.id}</p>
              <p>Owner: {passport.owner}</p>
              <p>Maintenance Party: {passport.maintenanceParty}</p>
              <p>Certified: {passport.certified ? 'Yes' : 'No'}</p>
            </CardBody>
            <CardFooter bg="gray.100" textAlign="center" py={2}>
              {/* Button to mark object as certified */}
              <Button colorScheme="blue" disabled={passport.certified}>
                Mark Certified
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

export default CertifierCard;
