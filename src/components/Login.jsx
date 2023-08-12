import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Center,
  Heading,
  Input,
  Button,
  ChakraProvider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from "../assets/images/LS.png"

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
        minW={"100%"} backgroundImage={Image} 
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="repeat"
       
      >
        <Center flexDirection="column">
          <Heading size="xl" color="#36454F" bg="#F5F5F5"  rounded={'lg'}>
            Welcome to Aura-Passport's
          </Heading>
          
          <Input
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            size="lg"
            mt={8}
            width="300px"
            fontStyle={"italic"}
            borderRadius="md"
            color="#FFFAFA"
            bg="#8C92AC"
            minW="425px"
          />
          {!isLoggedIn ? (
            <>
              <Button colorScheme="teal" size="lg" mt={4} onClick={handleConnect}>
                Connect Wallet
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
