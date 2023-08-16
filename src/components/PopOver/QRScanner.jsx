import React, { useState } from 'react';
import Html5QrcodePlugin from '../util/Html5QrcodePlugin';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function QRScanner() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const [decodedResults, setDecodedResults] = useState([]);
  const onNewScanResult = (decodedText, decodedResult) => {
	  console.log("App [result]", decodedResult);
	  setDecodedResults(prev => [...prev, decodedResult]);
	  toast({
        position: "bottom-right",
        title: "QRCode Scanned",
        description: "Loading Passport...",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate(`/p/${decodedText}`);
  };

  const gradientColors = ["#99ccdf", "#029ec4", "#033f63"];
  const gradient = `linear-gradient(to bottom, ${gradientColors.join(", ")})`;

 

  return (
    <>
      <Button onClick={onOpen} colorScheme="purple">
        QR-Scanner
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"} size={"full"}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader color={"white"} bg="#0280a6" as={"b"}>
            Please Scan The QR-Code
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={gradient}>
            <Center>
			<div className="App">
            <section className="App-section">
                <div className="App-section-title"> Html5-qrcode React demo</div>
                <br />
                <br />
                <br />
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </section>
        </div>
            </Center>
            
          </ModalBody>

          <ModalFooter bg={"white"}>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default QRScanner;
