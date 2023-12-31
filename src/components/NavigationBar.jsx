import React, { useState , useEffect } from "react";
import {
  IconButton,
  VStack,
  Tooltip,
  FormControl,
  FormLabel,
  Stack,
  Select,
  ButtonGroup,
  Button,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  Input,
  Spinner,
  useToast, 
  Flex
} from "@chakra-ui/react";
import {
  StarIcon,
  SettingsIcon,
  CheckCircleIcon,
  PlusSquareIcon,
  LockIcon,
} from "@chakra-ui/icons";
import FocusLock from "react-focus-lock";
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";
import { nationalities, genders } from "./PopOver/util/Nationalities";
import ipfs from "./utils/ipfsApi";
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";

const { ethers } = require("ethers");
const contractAddress ="0xA1A1A21A46988A13e3F0B55a51c909732A134eE4";
const abi = ObjectPassportAbi.abi;
const key = "APAT!";

async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const Form = ({ firstFieldRef, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nationality, setNationalilty] = useState("");
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [buffer, setBuffer] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false); 
  const toast = useToast(); 

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);  

   
    reader.onloadend = () => {
      setBuffer(Buffer.from(reader.result));
      
    };
  };

useEffect(() => {
    if (buffer) {
      console.log('=== buffer ===', buffer);
    }
  }, [buffer]);

  const createPassport = async () => {
    try {
      
      if (!name || !fullName || !nationality || !gender || !description || !buffer) {
        toast({
          title: "Please fill all the fields",
          status: "warning",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        return; 
      }
  
      const result = await ipfs.add(buffer);
      if (result) {
        const photo = `https://ap.infura-ipfs.io/ipfs/${result.path}`
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        setIsWaiting(true);

        //Hash all the parameters    
        const fullNameHash = CryptoJS.AES.encrypt(
          fullName,
          key
        ).toString();
        const photoHash = CryptoJS.AES.encrypt(
          photo,
          key
        ).toString();
        
        const create = await contract.createPassport(
          name,
          fullNameHash,
          description,
          nationality,
          gender,
          photoHash
        );
        await create.wait();
        
        setIsWaiting(false);
  
        // Show success toast
        toast({
          title: "Passport created successfully",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error creating passport:", error);
      
    } finally {
      onCancel(); 
    }
  };
  

  const handleCreateClick = () => {
    createPassport();
  };

  return (
    <Stack spacing={4}>
    {!isWaiting && (
      <>
      <TextInput
        label="Passport Name & Full Name"
        id="passportname"
        placeholder="Provide Passport Name"
        ref={firstFieldRef}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextInput
        placeholder="Provide Your Full Name"
        id="fullname"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />
      <FormLabel htmlFor={`nationality`}>Nationality & Gender</FormLabel>
                    <Select
                      id={`nationality`}
                      value={nationality}
                      onChange={(event) => setNationalilty(event.target.value)}
                    >
                      {nationalities.map((nationality) => (
                        <option key={nationality} value={nationality}>
                          {nationality}
                        </option>
                      ))}
                    </Select>

                    <Select
                      id={`sex`}
                      value={gender}
                      onChange={(event) => setGender(event.target.value)}
                    >
                      {genders.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </Select>              
      <TextInput
        label="Justification For Passport"
        id="description"
        type="textarea"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <FormLabel htmlFor={`photograph`}> Upload Photograph</FormLabel>
      <Input
        type="file"
        accept =".png , .jpg , .jpeg"
        id="photograph"
        onChange={(e) => captureFile(e)}
      />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={handleCreateClick}>
          Create
        </Button>
      </ButtonGroup>
      </>
    )}

      {isWaiting && (
        <Flex align="center" justify="center" p={4}>
          <Spinner color="blue.500" />
        </Flex>
      )}
    </Stack>
  );
};

const PopoverForm = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton
            icon={<PlusSquareIcon />}
            colorScheme="gray"
            aria-label="Add"
          />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

const VerticalNavigationBar = () => {
  const navigate = useNavigate();
  const gradientColors = [ "#99ccdf", "#029ec4" , "#033f63"];
  const gradient = `linear-gradient(to bottom, ${gradientColors.join(", ")})`;
  return (
    <VStack
      spacing={4}
      p={3}
      bg={gradient}
      position="static"
      left={0}
      top={0}
      minH={"100vh"}
      h="auto"
      alignItems="flex-start"
    >
      <Tooltip
        hasArrow
        label="Add Passport"
        bg="purple.300"
        color="black"
        placement="right"
      >
        {PopoverForm()}
      </Tooltip>

      <Tooltip
        hasArrow
        label="My Passports"
        bg="purple.300"
        color="black"
        placement="right"
      >
        <IconButton
          icon={<StarIcon />}
          colorScheme="facebook"
          aria-label="Home"
          onClick={() => {
            navigate('/o');
          }}
        />
      </Tooltip>
      <Tooltip
        hasArrow
        label="Maintanance"
        bg="purple.300"
        color="black"
        placement="right"
      >
        <IconButton
          icon={<SettingsIcon />}
          colorScheme="orange"
          aria-label="Maintanance"
          onClick={() => {
            navigate('/m');
          }}
        />
      </Tooltip>
      <Tooltip
        hasArrow
        label="Certify"
        bg="purple.300"
        color="black"
        placement="right"
      >
        <IconButton
          icon={<CheckCircleIcon />}
          colorScheme="green"
          aria-label="Certify"
          onClick={() => {
            navigate('/c');
          }}
        />
      </Tooltip>
      <Tooltip
        hasArrow
        label="LogOut"
        bg="red.300"
        color="black"
        placement="right"
      >
        <IconButton
          icon={<LockIcon />}
          isRound={true}
          colorScheme="red"
          aria-label="LogOut"
          onClick={() => {
            navigate('/', { replace: true });
          }}
        />
      </Tooltip>
    </VStack>
  );
};

export default VerticalNavigationBar;
