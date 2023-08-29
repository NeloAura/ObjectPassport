import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  Spinner,
  useToast,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Button,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Image,
  IconButton,
  Box
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { nationalities, genders } from "./PopOver/util/Nationalities";
import ipfs from "./utils/ipfsApi";
import ObjectPassportAbi from "../artifacts/contracts/ObjectPassport.sol/ObjectPassport.json";
import {
  AppShell,
  Sidebar,
  SidebarToggleButton,
  SidebarSection,
  NavItem,
  PersonaAvatar,
  SearchInput
} from "@saas-ui/react";
import { FiBookmark, FiBriefcase, FiTool, FiPlusCircle } from "react-icons/fi";
import Image1 from "../assets/images/SPL.png";
import ObjectPassportCard from "../pages/OwnerPassport";

const { ethers } = require("ethers");
const contractAddress = "0xA1A1A21A46988A13e3F0B55a51c909732A134eE4";
const abi = ObjectPassportAbi.abi;

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
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
  const [nationality, setNationalilty] = useState("");
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [buffer, setBuffer] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false); // Track if we're waiting for the transaction
  const toast = useToast(); // Initialize the toast

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file); // Read buffered file

    // Callback
    reader.onloadend = () => {
      setBuffer(Buffer.from(reader.result));
    };
  };

useEffect(() => {
    if (buffer) {
      console.log("=== buffer ===", buffer);
    }
  }, [buffer]);
 
  const createPassport = async () => {
    try {
      // Check if any of the required fields are null
      if (!name || !fullName || !nationality || !gender || !description || !buffer) {
        toast({
          title: "Please fill all the fields",
          status: "warning",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        return; // Don't proceed if any field is null
      }

      const result = await ipfs.add(buffer);
      if (result) {
        const photo = `https://ap.infura-ipfs.io/ipfs/${result.path}`;
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        setIsWaiting(true);
        const create = await contract.createPassport(
          name,
          fullName,
          description,
          nationality,
          gender,
          photo
        );
        await create.wait();
        setIsWaiting(false);

        // Show success toast
        toast({
          title: "Passport created successfully",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
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
            label="Passport Name & Full Name"
            id="passportname"
            placeholder="Provide Passport Name"
            ref={firstFieldRef}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextInput
            placeholder="Provide Your Full Name"
            id="fullname"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
          <FormLabel htmlFor={`nationality`}>Nationality & Gender</FormLabel>
          <Select
            id={`nationality`}
            value={nationality}
            onChange={(event) => setNationalilty(event.target.value)}
          >
            {nationalities.map((nationality) => (
              <option key={nationality} value={nationality}>
                {nationality}
              </option>
            ))}
          </Select>

          <Select
            id={`sex`}
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </Select>
          <TextInput
            label="Justification For Passport"
            id="description"
            type="textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <FormLabel htmlFor={`photograph`}> Upload Photograph</FormLabel>
          <Input
            type="file"
            id="photograph"
            onChange={(e) => captureFile(e)}
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
        <NavItem
              icon={<FiPlusCircle />}
            >
              Create 📓
            </NavItem>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

const VerticalNavigationBar2 = () => {
  const [value, setValue] = React.useState("");
  const navigate = useNavigate();
  const gradientColors = ["#99ccdf", "#029ec4", "#033f63"];
  const gradient = `linear-gradient(to bottom, ${gradientColors.join(", ")})`;

  return (
    <AppShell 
      height="$100vh"
      navbar={
        <Box as="header" borderBottomWidth="1px" py="2" px="4">
            <SearchInput
        placeholder="Search by Passport Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onReset={() => setValue("")}
      />
        </Box>
      }
      sidebar={
        <Sidebar  >
          <SidebarToggleButton />
          <SidebarSection direction="row" bg={gradient} >
            <Image
              src="https://scontent.fcur3-1.fna.fbcdn.net/v/t39.30808-6/240603964_4096273620501601_1563941666359861447_n.png?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=i2nOPFapG88AX8708VQ&_nc_ht=scontent.fcur3-1.fna&oh=00_AfD2Z-n9qmh0Gs3ZHgOp4UfW7OQyfXoJ8HHcBusUxLS_Ig&oe=64E2F878"
              boxSize="7"
            />
            <Spacer />
            <Menu>
               <MenuButton
                  as={IconButton}
                  icon={
                    <PersonaAvatar
                      presence="online"
                      size="xs"
                      src={Image1}
                    />
                  }
                variant="ghost"
              />
              <MenuList>
                <MenuItem onClick={()=>{navigate('/r', { replace: true })}}>
                Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          </SidebarSection>
          <SidebarSection aria-label="Main" >
            {PopoverForm()}
            <NavItem
              icon={<FiBookmark />}
              onClick={() => {
                navigate("/o");
              }}
            >
              My Passports📓
            </NavItem>
            <NavItem
              icon={<FiTool />}
              onClick={() => {
                navigate("/m");
              }}
            >
              Maintenance👷
            </NavItem>
            <NavItem
              icon={<FiBriefcase />}
              onClick={() => {
                navigate("/c");
              }}
            >
              Certification✔️
            </NavItem>
          </SidebarSection>
        </Sidebar>
      }
      
    >
    <Box as="main" flex="1" overflowY="auto">
        <ObjectPassportCard value={value}/>
      </Box>
    </AppShell>
    
  );
};

export default VerticalNavigationBar2;
