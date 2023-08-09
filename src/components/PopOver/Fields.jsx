import React from "react";
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

} from "@chakra-ui/react";
import {
  PlusSquareIcon,
} from "@chakra-ui/icons";
import FocusLock from "react-focus-lock";


const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});


const Form = ({  onCancel , firstFieldRef , formbutton }) => {
  return (
    <Stack spacing={4}>
    <TextInput
        label="Wallet Address"
        id="address"
        ref={firstFieldRef}
        defaultValue=""
      />

      
      <FormLabel htmlFor="id">Maintanance Fields</FormLabel>
      
      <Stack spacing={5} direction="row">

        <Checkbox colorScheme="purple" defaultChecked>
          Name
        </Checkbox>
        <Checkbox colorScheme="green" >
          Desc
        </Checkbox>
        <Checkbox colorScheme="blue" >
        Exipiration Date
        </Checkbox>
      </Stack>
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="red" onClick={onCancel}>
          {formbutton}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const FieldForm = ({name ,color , formbutton}) => {
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
          <Button leftIcon={<PlusSquareIcon/>} colorScheme={color} variant="solid">
            {name}
          </Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} formbutton={formbutton} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default FieldForm;
