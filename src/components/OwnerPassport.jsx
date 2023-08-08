import { Flex , Card, CardHeader, CardBody, CardFooter, Button ,ChakraBaseProvider } from '@chakra-ui/react';
import VerticalNavigationBar from './NavigationBar';

const passports = [];
const ObjectPassportCard = () => {

  // Default data to display when there are no passports
  const defaultData = {
    id: 'Default ID',
    owner: 'Default Owner',
    maintenanceParty: 'Default Maintenance Party',
    certifyingParty: 'Default Certifying Party',
    maintenancePerformed: false,
    certified: false,
  };

  return (
    <ChakraBaseProvider>
    <Flex>
     <VerticalNavigationBar/>
     <div>
      {passports.length === 0 ? (
        <Card boxShadow="md" borderRadius="md" maxW="300px" colorScheme='blue'>
          <CardHeader bg="blue.500" color="white" textAlign="center" py={2}>
            Object Passport
          </CardHeader>
          <CardBody>
            <p>Passport ID: {defaultData.id}</p>
            <p>Owner: {defaultData.owner}</p>
            <p>Maintenance Party: {defaultData.maintenanceParty}</p>
            <p>Certifying Party: {defaultData.certifyingParty}</p>
            <p>Maintenance Performed: {defaultData.maintenancePerformed ? 'Yes' : 'No'}</p>
            <p>Certified: {defaultData.certified ? 'Yes' : 'No'}</p>
          </CardBody>
          <CardFooter bg="gray.100" textAlign="center" py={2}>
            No passports available.
          </CardFooter>
        </Card>
      ) : (
        passports.map((passport) => (
          <Card key={passport.id} boxShadow="md" borderRadius="md" maxW="300px" mb={4}>
            <CardHeader bg="blue.500" color="white" textAlign="center" py={2}>
              Object Passport
            </CardHeader>
            <CardBody>
              <p>Passport ID: {passport.id}</p>
              <p>Owner: {passport.owner}</p>
              <p>Maintenance Party: {passport.maintenanceParty}</p>
              <p>Certifying Party: {passport.certifyingParty}</p>
              <p>Maintenance Performed: {passport.maintenancePerformed ? 'Yes' : 'No'}</p>
              <p>Certified: {passport.certified ? 'Yes' : 'No'}</p>
            </CardBody>
            <CardFooter bg="gray.100" textAlign="center" py={2}>
              {/* Button to assign certifiers */}
              <Button colorScheme="green" mr={2}>
                Assign Certifier
              </Button>
              {/* Button to assign maintenance party */}
              <Button colorScheme="blue">Assign Maintenance</Button>
            </CardFooter>
          </Card>
        ))
      )}
      </div>
      </Flex>
      </ChakraBaseProvider>
  );
};

export default ObjectPassportCard;
