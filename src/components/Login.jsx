import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Input,
  ButtonGroup,
  Button,
  ChakraProvider

} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Explained from './PopOver/Explained';
import Abus from './PopOver/Abus';
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
        bg="blue.500"
        backgroundImage={Image}
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="repeat"
        position="relative" // Set the parent container to relative positioning
      >
      <ButtonGroup mt="25px" ml="100px">
        <Explained/>
        <Abus/>
      </ButtonGroup>
      
        <Flex
          height="100vh"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          position="relative" // Set the child container to relative positioning
        >
       
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
        
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default AuraPassportPage;
