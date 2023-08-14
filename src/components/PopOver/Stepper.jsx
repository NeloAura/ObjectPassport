'use client'

import { useState } from 'react'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import logo from '../../assets/gifs/Start.gif'
import login from '../../assets/gifs/Login.gif'
import create from '../../assets/gifs/Create.gif'

const Form1 = () => {
  
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Get Started
      </Heading>
      <Flex>
      <img src={logo} alt="loading..." />
      </Flex>
    </>
  )
}

const Form2 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Connect wallet to login
      </Heading>
      <Flex>
      <img src={login} alt="loading..." />
      </Flex>
    </>
  )
}

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Use the + button to create new passport
      </Heading>
      <Flex>
      <img src={create} alt="loading..." />
      </Flex>
    </>
  )
}

export default function Stepper({onClose}) {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)

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
        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated colorScheme='whatsapp'></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 33.33)
                }}
                isDisabled={step === 1}
                colorScheme="twitter"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1)
                  if (step === 3) {
                    setProgress(100)
                  } else {
                    setProgress(progress + 33.33)
                  }
                }}
                colorScheme="facebook"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="whatsapp"
                variant="solid"
                onClick={() => {
                  toast({
                    position:"top-right",
                    title: 'Perfect Decision',
                    description: "Redirecting... ",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                  setTimeout(()=>{
                    onClose();
                  }, 3000)
                  

                }}>
                Start Now
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  )
}