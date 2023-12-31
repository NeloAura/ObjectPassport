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
import CryptoJS from "crypto-js";
import ipfs from "../../utils/ipfsApi";
import { parse } from "date-fns";
import ObjectPassportAbi from "../../../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";


const { ethers } = require("ethers");
const key = "APAT!";

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
   photograph,
   hasPhoto,
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
              photograph={photograph}
              hasPhoto={hasPhoto}
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
  photograph,
  expirationDate }) => {

  const [comment, setComment] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const contractAddress ="0xA1A1A21A46988A13e3F0B55a51c909732A134eE4";
  const abi = ObjectPassportAbi.abi;
  const toast = useToast(); 


  const formatDateToTimestamp = (dateString) => {
    const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
    return parsedDate.getTime() / 1000; 
  };

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const EditFunction = async () => {
    try {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setIsWaiting(true); 
  
      let photo = photograph;
  
      if (buffer) {
        const result = await ipfs.add(buffer);
        photo = `https://ap.infura-ipfs.io/ipfs/${result.path}`;
      }

      const fullNameHash = CryptoJS.AES.encrypt(
        fullname,
        key
      ).toString();

      const photoHash = CryptoJS.AES.encrypt(
        photo,
        key
      ).toString();

      const commentHash = CryptoJS.AES.encrypt(
        comment,
        key
      ).toString();
  
      const assignMaintenanceParty = await contract.performMaintenance(
        id,
        commentHash,
        name,
        fullNameHash,
        nationality,
        gender,
        photoHash,
        formatDateToTimestamp(expirationDate)
      );
      await assignMaintenanceParty.wait();
      setIsWaiting(false);
  
      toast({
        title: "Edit successful",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error editing:", error);
    } finally {
      onCancel();
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
