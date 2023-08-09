import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Center,
  Heading,
  Text,
  Input,
  Button,
  ChakraProvider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

function AuraPassportPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleConnect = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsLoggedIn(true);
        }
      } else {
        alert("Metamask not detected. Please install Metamask extension to connect.");
      }
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
    }
  };

  const handleLogin = () => {
    navigate('/o'); 
  };

  return (
    <ChakraProvider>
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bg="blue.500"
      >
        <Center flexDirection="column">
          <Heading size="xl" color="white">
            Welcome to Aura-Passport's
          </Heading>
          <Text color="white" fontSize="xl" mt={4}>
            Where your passport data is secure
          </Text>
          <Input
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            size="lg"
            mt={8}
            width="300px"
            borderRadius="md"
            color={"white"}
          />
          {!isLoggedIn ? (
            <>
              <Button colorScheme="teal" size="lg" mt={4} onClick={handleConnect}>
                Connect
              </Button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <Button colorScheme="purple" size="lg" mt={4} onClick={handleLogin}>
                Login
              </Button>
            </motion.div>
          )}
        </Center>
      </Box>
    </ChakraProvider>
  );
}

export default AuraPassportPage;
