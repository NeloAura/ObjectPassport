import React , {useState} from "react";
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
import FocusLock from "react-focus-lock";
import { parse  } from "date-fns";
import ObjectPassportAbi from "../../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";

const { ethers } = require("ethers");
const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});



const CommentForm = ({button ,color , id ,name, description,expirationDate}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
 
  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
         
            <Button  colorScheme={color} variant='solid'>
             {button}
            </Button>
         
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} id={id} name={name} description={description} expirationDate={expirationDate} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

const Form = ({ firstFieldRef, onCancel , id ,name, description,expirationDate}) => {
  const [comment, setComment] = useState("");
  const contractAddress = "0xA3C8fD22e44695c97d180d108F3945DceCeb70A6";
  const abi = ObjectPassportAbi.abi;

  const formatDateToTimestamp = (dateString) => {
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    return parsedDate.getTime() / 1000; // Convert to Unix timestamp (seconds since epoch)
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
      const assignMaintenanceParty = await contract.performMaintenance(
        id,
        comment,
        name,
        description,
        formatDateToTimestamp(expirationDate),
      );
      await assignMaintenanceParty.wait();
      console.log("Maintenance party assigned successfully!");
      // You can handle the success message and any other necessary actions here
    } catch (error) {
      console.error("Error assigning maintenance party:", error);
      // Handle error, e.g., show an error message to the user
    } finally {
      onCancel(); // Close the popover
    }
  };

  const handleEditClick = () => {
    EditFunction();
  };

  return (
    <Stack spacing={4}>
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
        <Button  colorScheme="teal" onCancel={onCancel} onClick={()=>{handleEditClick()}}>
          Submit
        </Button>
      </ButtonGroup>
    </Stack>
  );
};



export default CommentForm;