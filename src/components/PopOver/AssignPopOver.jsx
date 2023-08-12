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
} from "@chakra-ui/react";
import {
  PlusSquareIcon,
} from "@chakra-ui/icons";
import FocusLock from "react-focus-lock";
import ObjectPassportAbi from "../../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";

const { ethers } = require("ethers");
const contractAddress = "0xA3C8fD22e44695c97d180d108F3945DceCeb70A6";
const abi = ObjectPassportAbi.abi; 


const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const Form = ({ firstFieldRef, onCancel ,formbutton, id}) => {
  const [address, setAddress] = useState("");
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const AssignFunctions = async (formbutton) => {
    try {
      console.log(address);
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const formattedAddress = ethers.utils.getAddress(address);

      switch(formbutton) {
        case 'Transfer':
          const transferPassport = await contract.changeOwner(formattedAddress, id);
          await transferPassport.wait();
          console.log("Passport transfered successfully!");
          return ;

          case 'Assign':
            const assigncertifyingParty = await contract.designatecertifyingParty(id , formattedAddress);
            await assigncertifyingParty.wait();
            console.log("Passport assigned successfully!");

            break ;  
        
        default:
          return console.warn("Unknown form button:", formbutton);;
      }
      // You can handle the success message and any other necessary actions here
    } catch (error) {
      console.error("Error transfering passport:", error);
      // Handle error, e.g., show an error message to the user
    } finally {
      onCancel(); // Close the popover
    }
  };


  const handleCreateClick = () => {
    AssignFunctions(formbutton);
  };

  return (
    <Stack spacing={4}>
      <TextInput
        label="Wallet Address"
        id="address"
        ref={firstFieldRef}
        value={address} // Bind the state variable to the input value
        onChange={(event) => setAddress(event.target.value)} // Update the state when the input changes
      />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button  colorScheme="teal" onClick={handleCreateClick}>
          {formbutton}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const AssignPopoverForm = ({name ,color , formbutton ,id}) => {
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
         
            <Button leftIcon={<PlusSquareIcon/>} colorScheme={color} variant='solid'>
             {name}
            </Button>
         
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} formbutton={formbutton} id={id}/>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AssignPopoverForm;