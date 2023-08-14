import React from "react";
import {
  Button,
  useDisclosure,
  useToast,
  Heading,
  Flex,
  Box,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import FocusLock from "react-focus-lock";




const Content = () => {
  
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        QRCode
      </Heading>
      <Flex>
      <img src={""} alt="loading..." />
      </Flex>
    </>
  )
}


const QRContent = ({ id , onClose}) => {
  
    const toast = useToast();

  return (
    <>
    <Box
        bg={"white"}
        borderWidth="1px"
        rounded="lg"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Content/>
      <ButtonGroup>
              <Button
                w="7rem"
                colorScheme="whatsapp"
                variant="solid"
                onClick={() => {
                  toast({
                    position:"top-right",
                    title: 'Perfect Decision',
                    description: "Downloading... ",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                  setTimeout(()=>{
                    onClose();
                  }, 3000)
                  

                }}>
                Download
              </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};


const QRCode = ({ name, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<InfoOutlineIcon />}
        colorScheme="facebook"
        variant="solid"
      >
        {name}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export your Passsport </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FocusLock returnFocus persistentFocus={false}>
              <QRContent id={id} onClose={onClose}  />
            </FocusLock>
          </ModalBody>

          <ModalFooter>{/* Optional footer content */}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QRCode;
