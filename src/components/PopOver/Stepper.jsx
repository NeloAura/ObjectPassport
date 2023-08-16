'use client'

import { useState } from 'react'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Link
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import logo from '../../assets/gifs/Start.gif'
import login from '../../assets/gifs/Login.gif'
import metamask from '../../assets/gifs/metamask.gif'
import polygon from '../../assets/images/polygon.png'
import faucet from '../../assets/gifs/faucet.gif'
import VertStepper from './VertStepper'

const steps = [
  { title: 'Metamask Wallet:', description: 'The DApp requires users to have the Metamask browser extension installed.', image: metamask, link: 'https://metamask.io/'},
  { title: 'Polygon Network', description: 'The DApp operates on the Polygon network.', image: polygon,link: 'https://mumbai.polygonscan.com/' },
  { title: 'Sufficient Funds', description: 'Ensure you have sufficient funds in your wallets to interact with the DApp.', image: faucet,link: 'https://faucet.polygon.technology/' },
]

function VerticalStepper() {
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  return (
    <Stepper index={activeStep} orientation='vertical' height='400px' gap='0'>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
            <img style={{ width: 50, height: 50 }} src={step.image} alt="loading..." />
            <Link href={step.link} isExternal>
  {step.link} <ExternalLinkIcon mx='2px' />
</Link>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}

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
        Requirements
      </Heading>
      <Flex>
     <VerticalStepper></VerticalStepper>
      </Flex>
    </>
  )
}

const Form3 = () => {
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

const Form4 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="5%">
        Creating a new passport
      </Heading>
      <Flex>
      <VertStepper></VertStepper>
      </Flex>
    </>
  )
}

export default function HorizontalStepper({onClose}) {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)

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
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : step === 3 ? <Form3 /> : <Form4 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 25)
                }}
                isDisabled={step === 1}
                colorScheme="orange"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 4}
                onClick={() => {
                  setStep(step + 1)
                  if (step === 4) {
                    setProgress(100)
                  } else {
                    setProgress(progress + 25)
                  }
                }}
                colorScheme="facebook"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 4 ? (
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