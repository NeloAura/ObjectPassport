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

const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const Form = ({ firstFieldRef, onCancel}) => {
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
        <Button  colorScheme="teal" onClick={onCancel}>
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
        <IconButton icon={<StarIcon />} colorScheme="blue" aria-label="Home" />
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
        />
      </Tooltip>
    </VStack>
  );
};

export default VerticalNavigationBar;
