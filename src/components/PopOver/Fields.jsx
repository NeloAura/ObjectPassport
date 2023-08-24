import React, { useState } from "react";
import {
  Stack,
  VStack,
  ButtonGroup,
  Button,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
  Flex, // Import useToast
  Center,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
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

const Form = ({ onCancel, firstFieldRef, formbutton, id }) => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [address, setAddress] = useState("");
  const [isWaiting, setIsWaiting] = useState(false); // Track if we're waiting for the transaction
  const toast = useToast(); // Initialize the toast

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const AssignFunction = async (editableFields) => {
    try {
      if (
        address.toLowerCase() === window.ethereum.selectedAddress.toLowerCase()
      ) {
       
        toast({
          title: "Cannot assign yourself as Maintenance",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        setAddress(""); 
        return;
      }
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const formattedAddress = ethers.utils.getAddress(address);
      setIsWaiting(true); // Set waiting state
      const assignMaintenanceParty = await contract.designateMaintenanceParty(
        id,
        formattedAddress,
        editableFields
      );
      await assignMaintenanceParty.wait();
      console.log("Maintenance party assigned successfully!");
      setIsWaiting(false);

      
      toast({
        title: `${formbutton} successful`,
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error assigning maintenance party:", error);
     
    } finally {
      onCancel(); 
    }
  };

  const handleCheckboxChange = (event) => {
    const fieldName = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
    
      setSelectedFields((prevSelectedFields) => [
        ...prevSelectedFields,
        fieldName,
      ]);
    } else {
      
      setSelectedFields((prevSelectedFields) =>
        prevSelectedFields.filter((field) => field !== fieldName)
      );
    }
  };

  const handleAssignClick = () => {
    
    const formattedEditableFields = selectedFields.join(", ");

    AssignFunction(formattedEditableFields);
  };

  return (
    <Stack spacing={4}>
      {!isWaiting && (
        <>
        <Center>
        <FormLabel htmlFor="ir" >Wallet Address</FormLabel>
        </Center>
          <TextInput
            id="adds"
            ref={firstFieldRef}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          
          <Center>
            <FormLabel htmlFor="i" >Maintenance Fields</FormLabel>
          </Center>

          <VStack spacing={5} direction="row">
            <Checkbox
              value="name"
              colorScheme="red"
              onChange={handleCheckboxChange}
            >
              Passport-Name
            </Checkbox>
            <Checkbox
              value="name"
              colorScheme="yellow"
              onChange={handleCheckboxChange}
            >
              FullName
            </Checkbox>
            <Checkbox
              value="description"
              colorScheme="green"
              onChange={handleCheckboxChange}
            >
              Nationatlity
            </Checkbox>
            <Checkbox
              value="sex"
              colorScheme="purple"
              onChange={handleCheckboxChange}
            >
              Gender
            </Checkbox>
            <Checkbox
              value="photograph"
              colorScheme="pink"
              onChange={handleCheckboxChange}
            >
              Photo
            </Checkbox>
            <Checkbox
              value="expirationDate"
              colorScheme="blue"
              onChange={handleCheckboxChange}
            >
              Expiration Date
            </Checkbox>
          </VStack>

          <ButtonGroup display="flex" justifyContent="center">
            <Button variant="ghost" colorScheme="red" onClick={onCancel}>
              Cancel
            </Button>
            <Button colorScheme="whatsapp" onClick={handleAssignClick}>
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

const FieldForm = ({ name, color, formbutton, id }) => {
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
          <Button
            leftIcon={<PlusSquareIcon />}
            colorScheme={color}
            variant="solid"
          >
            {name}
          </Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form
              firstFieldRef={firstFieldRef}
              onCancel={onClose}
              formbutton={formbutton}
              id={id}
            />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default FieldForm;
