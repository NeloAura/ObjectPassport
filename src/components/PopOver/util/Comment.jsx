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
  Flex,
} from "@chakra-ui/react";
import FocusLock from "react-focus-lock";
import ipfs from "../../utils/ipfsApi";
import { parse } from "date-fns";
import ObjectPassportAbi from "../../../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";

const { ethers } = require("ethers");
const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const CommentForm = ({
   button, 
   color,
   checker, 
   id,
   name,
   fullname,
   nationality,
   gender,
   buffer, 
   useBuffer,
   expirationDate }) => {

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
       
          <Button colorScheme={color} variant="solid" isDisabled={!checker}>
            {button}
          </Button> 
       
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form
              firstFieldRef={firstFieldRef}
              onCancel={onClose}
              id={id}
              name={name}
              fullname={fullname}
              nationality={nationality}
              gender={gender}
              buffer={buffer}
              useBuffer={useBuffer}
              expirationDate={expirationDate}
            />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

const Form = ({ 
  firstFieldRef, 
  onCancel, 
  id, 
  name, 
  fullname,
  nationality,
  gender,
  buffer,
  expirationDate }) => {
  const [comment, setComment] = useState("");
  const [photograph, setPhotograph] = useState("");
  const [isWaiting, setIsWaiting] = useState(false); // Track if we're waiting for the transaction
  const contractAddress ="0x57D72aC73CA959425916d9Bf2c313D49722C4c83";
  const abi = ObjectPassportAbi.abi;
  const toast = useToast(); // Initialize the toast


  const formatDateToTimestamp = (dateString) => {
    const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
    return parsedDate.getTime() / 1000; // Convert to Unix timestamp (seconds since epoch)
  };

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const EditFunction = async () => {
    try {
      const result = await ipfs.add(buffer);
      if (result) {
      setPhotograph(`https://ap.infura-ipfs.io/ipfs/${result.path}`)
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setIsWaiting(true); // Set waiting state
      const assignMaintenanceParty = await contract.performMaintenance(
        id,
        comment,
        name,
        fullname,
        nationality,
        gender,
        photograph, 
        formatDateToTimestamp(expirationDate)
      );
      await assignMaintenanceParty.wait();
      console.log("Maintenance party assigned successfully!");
      setIsWaiting(false); // Reset waiting state

      // Show success toast
      toast({
        title: "Edit successful",
        status: "success",
        position:"top-right",
        duration: 5000,
        isClosable: true,
      });
    }} catch (error) {
      console.error("Error editing:", error);
    } finally {
      onCancel(); // Close the popover
    }
  };

  const handleEditClick = () => {
    EditFunction();
  };

  return (
    <Stack spacing={4}>
    {!isWaiting && (
      <>
      <TextInput
        label="Comment"
        id="comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        ref={firstFieldRef}
      />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={handleEditClick}>
          Submit
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

export default CommentForm;
