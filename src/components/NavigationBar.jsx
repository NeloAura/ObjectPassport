import React from "react";
import {
  IconButton,
  VStack,
  Tooltip,
  FormControl,
  FormLabel,
  Stack,
  ButtonGroup,
  Button,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  Input,
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
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";

const { ethers } = require("ethers");
const contractAddress = "0x5FD0e620DB95F01c616Be49164c546B0123ac53c";
const abi = ObjectPassportAbi.abi; 



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
  const createPassport = async (name, description) => {
    try {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const create = await contract.createPassport(name, description);
      await create.wait();
      console.log("Passport created successfully!");
      // You can handle the success message and any other necessary actions here
    } catch (error) {
      console.error("Error creating passport:", error);
      // Handle error, e.g., show an error message to the user
    } finally {
      onCancel(); // Close the popover
    }
  };

  const handleCreateClick = () => {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    createPassport(name, description);
  };

  return (
    <Stack spacing={4}>
      <TextInput
        label="Passport name"
        id="name"
        ref={firstFieldRef}
        defaultValue=""
      />
      <TextInput label="Description" id="description" defaultValue="" />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={handleCreateClick}>
          Create
        </Button>
      </ButtonGroup>
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
              colorScheme="teal"
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

  return (
    <VStack
      spacing={4}
      p={4}
      bg="gray.100"
      position="static"
      left={0}
      top={0}
      h="100vh"
      alignItems="flex-start"
      mr="10px"
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
        <IconButton icon={<StarIcon />} colorScheme="blue" aria-label="Home" onClick={() => {
    navigate('/o'); 
  }
}/>
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
    navigate('/m');}}
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
    navigate('/c');}}
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
    navigate('/');}}
        />
      </Tooltip>
    </VStack>
  );
};

export default VerticalNavigationBar;
