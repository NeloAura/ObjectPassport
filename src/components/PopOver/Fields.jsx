import React, { useState } from "react";
import {
  Stack,
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
  Flex // Import useToast
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
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
      console.log(address);
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
      setIsWaiting(false); // Reset waiting state

      // Show success toast
      toast({
        title: `${formbutton} successful`,
        status: "success",
        position:"top-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error assigning maintenance party:", error);
      // Handle error, e.g., show an error message to the user
    } finally {
      onCancel(); // Close the popover
    }
  };

  const handleCheckboxChange = (event) => {
    const fieldName = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the field to the selected fields array
      setSelectedFields((prevSelectedFields) => [...prevSelectedFields, fieldName]);
    } else {
      // Remove the field from the selected fields array
      setSelectedFields((prevSelectedFields) =>
        prevSelectedFields.filter((field) => field !== fieldName)
      );
    }
  };

  const handleAssignClick = () => {
    // Use the 'address' state variable instead of direct DOM access
    const formattedEditableFields = selectedFields.join(", ");
    console.log(formattedEditableFields);
    AssignFunction(formattedEditableFields);
  };

  return (
    <Stack spacing={4}>
    {!isWaiting && (
      <>
      <TextInput
        label="Wallet Address"
        id="adds"
        ref={firstFieldRef}
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />

      <FormLabel htmlFor="i">Maintenance Fields</FormLabel>

      <Stack spacing={5} direction="row">
        <Checkbox value="name" colorScheme="purple" onChange={handleCheckboxChange}>
          Name
        </Checkbox>
        <Checkbox value="description" colorScheme="green" onChange={handleCheckboxChange}>
          Desc
        </Checkbox>
        <Checkbox value="expirationDate" colorScheme="blue" onChange={handleCheckboxChange}>
          Expiration Date
        </Checkbox>
      </Stack>

      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="red" onClick={handleAssignClick}>
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
        closeOnBlur={false}
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

export default FieldForm;
