import React, { useState } from "react";
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
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";

const { ethers } = require("ethers");
const contractAddress = "0xA3C8fD22e44695c97d180d108F3945DceCeb70A6";
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isWaiting, setIsWaiting] = useState(false); // Track if we're waiting for the transaction
  const toast = useToast(); // Initialize the toast

  const createPassport = async () => {
    try {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setIsWaiting(true); // Set waiting state
      const create = await contract.createPassport(name, description);
      await create.wait();
      console.log("Passport created successfully!");
      setIsWaiting(false); // Reset waiting state

      // Show success toast
      toast({
        title: "Passport created successfully",
        status: "success",
        position:"top-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating passport:", error);
      // Handle error, e.g., show an error message to the user
    } finally {
      onCancel(); // Close the popover
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
        label="Passport name"
        id="name"
        ref={firstFieldRef}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextInput
        label="Description"
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
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
      p={4}
      bg={gradient}
      position="static"
      left={0}
      top={0}
      h="100vh"
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
