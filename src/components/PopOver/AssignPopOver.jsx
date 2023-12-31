import React, { useState } from "react";
import {
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
  PlusSquareIcon,
} from "@chakra-ui/icons";
import FocusLock from "react-focus-lock";
import ObjectPassportAbi from "../../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";

const { ethers } = require("ethers");
const contractAddress ="0xA1A1A21A46988A13e3F0B55a51c909732A134eE4";
const abi = ObjectPassportAbi.abi; 

const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const Form = ({ firstFieldRef, onCancel, formbutton, id }) => {
  const [address, setAddress] = useState("");
  const [isWaiting, setIsWaiting] = useState(false); 
  const toast = useToast(); 
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const AssignFunctions = async (formbutton) => {
  try {
    
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const formattedAddress = ethers.utils.getAddress(address);

    if (formbutton === 'Assign') {
      
      if (address.toLowerCase() === window.ethereum.selectedAddress.toLowerCase()) {
        
        toast({
          title: "Cannot assign yourself as Certifier",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        
        setAddress("");
        return; 
      }
      
     
      setIsWaiting(true);
      const assigncertifyingParty = await contract.designateCertifyingParty(id, formattedAddress);
      await assigncertifyingParty.wait();
      
      setIsWaiting(false); 
    } else if (formbutton === 'Transfer') {
      
      
      if (address.toLowerCase() === window.ethereum.selectedAddress.toLowerCase()) {
        // Show error toast
        toast({
          title: "You're already the passport owner",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        
        setAddress("");
        return; 
      }
      
      
      setIsWaiting(true); 
      const transferPassport = await contract.changeOwner(formattedAddress, id);
      await transferPassport.wait();
      setIsWaiting(false); 
    } else {
      console.warn("Unknown form button:", formbutton);
    }

    
    toast({
      title: `${formbutton} successful`,
      status: "success",
      position: "top-right",
      duration: 5000,
      isClosable: true,
    });
  } catch (error) {
    console.error("Error transferring/passport:", error);
  } finally {
    onCancel(); 
  }
};


  const handleCreateClick = () => {
    AssignFunctions(formbutton);
  };

  return (
    <Stack spacing={4}>
    {!isWaiting && (
      <>
        <TextInput
          label="Wallet Address"
          id="address"
          ref={firstFieldRef}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <ButtonGroup display="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleCreateClick}>
            {formbutton}
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

const AssignPopoverForm = ({ name, color, formbutton, id }) => {
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
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Button leftIcon={<PlusSquareIcon />} colorScheme={color} variant="solid">
            {name}
          </Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} formbutton={formbutton} id={id} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AssignPopoverForm;
