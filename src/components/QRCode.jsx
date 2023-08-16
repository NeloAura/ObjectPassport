import React, { useState, useEffect } from "react";
import {
  Button,
  useDisclosure,
  useToast,
  Heading,
  Flex,
  Box,
  Center,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import FocusLock from "react-focus-lock";
import qrcode from "qrcode";
import { saveAs } from "file-saver"; // Import the saveAs function from file-saver

const Content = ({ id, setQRCodeDataURL , qrCodeDataURL }) => {
  useEffect(() => {
    const QRCodeData = `${id}`;
    qrcode.toDataURL(QRCodeData).then((dataURL) => {
      setQRCodeDataURL(dataURL);
    });
  }, [id, setQRCodeDataURL]);

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
       Passport QRCode
      </Heading>
      <Flex display="flex" justifyContent="center">
        <Image
          src={qrCodeDataURL}
          alt="Loading..."
          boxSize="300px"
          objectFit="contain"
          align="center"
        />
      </Flex>
    </>
  );
};

const QRContent = ({ id, onClose }) => {
  const [qrCodeDataURL, setQRCodeDataURL] = useState("");
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
        as="form"
      >
        <Content id={id} setQRCodeDataURL={setQRCodeDataURL} qrCodeDataURL={qrCodeDataURL} />
        <Center>
        <ButtonGroup justifyContent={"center"}>
          <Button
            w="7rem"
            colorScheme="whatsapp"
            variant="solid"
            onClick={() => {
              if (qrCodeDataURL) {
                toast({
                  position: "bottom-right",
                  title: "Perfect Decision",
                  description: "Downloading...",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });

                const blob = fetch(qrCodeDataURL).then((res) => res.blob());

                blob.then((blobData) => {
                  saveAs(blobData, "qrcode.png");
                });

                setTimeout(() => {
                  onClose();
                }, 3000);
              }
            }}
          >
            Download
          </Button>
        </ButtonGroup>
        </Center>
      </Box>
    </>
  );
};

const QRCode = ({ name, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const gradientColors = [ "#99ccdf", "#029ec4" , "#033f63"];
  const gradient = `linear-gradient(to bottom, ${gradientColors.join(", ")})`;  
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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
        <ModalHeader color={"white"} bg="#0280a6" as={"b"}>Export your Passport</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={gradient} >
            <FocusLock returnFocus persistentFocus={false}>
            
              <QRContent id={id} onClose={onClose} />
            
            </FocusLock>
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </>
  );
};

export default QRCode;
