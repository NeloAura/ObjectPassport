import React from 'react'
import { Steps, StepsItem, StepsCompleted  } from '@saas-ui/react'
import {
  Button,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import create from '../../../../assets/gifs/Create.gif'
import transaction from '../../../../assets/gifs/Transaction.gif'
import card from '../../../../assets/images/MyFirstPassport.png'

function CVertStepper() {
    const [step, setStep] = React.useState(0)
  
    const back = () => {
      setStep(step - 1)
    }
  
    const next = () => {
      setStep(step + 1)
    }
  
    const steps = [
      {
        name: 'step 1',
        title: 'Use the certify button to view passports assigned to you for certification.',
        children: (
          <>
            <Box ml={"40px"} py="4"><img src={create} alt="loading..." /></Box>
            <ButtonGroup ml={"40px"}>
              <Button
                onClick={next}
                isDisabled={step >= 3}
                colorScheme="facebook"
              >Next</Button>
            </ButtonGroup>
          </>
        ),
      },
      {
        name: 'step 2',
        title: 'Use the button to filter between already certified passports and those awaiting certification',
        children: (
          <>
            <Box ml={"40px"} py="4"><img src={transaction} alt="loading..." /></Box>{' '}
            <ButtonGroup  ml={"40px"}> 
              <Button
                onClick={back}
                isDisabled={step === 0}
                variant="ghost"
                colorScheme="twitter"
              >Back</Button>
              <Button
                onClick={next}
                isDisabled={step >= 3}
                colorScheme="facebook"
              >Next</Button>
            </ButtonGroup>
          </>
        ),
      },
      {
        name: 'step 3',
        title: 'Click the "Approve" button to certify the passport',
        children: (
          <>
            <Box ml={"40px"} py="4"><img src={transaction} alt="loading..." /></Box>{' '}
            <ButtonGroup  ml={"40px"}> 
              <Button
                onClick={back}
                isDisabled={step === 0}
                variant="ghost"
                colorScheme="twitter"
              >Back</Button>
              <Button
                onClick={next}
                isDisabled={step >= 3}
                colorScheme="facebook"
              >Next</Button>
            </ButtonGroup>
          </>
        ),
      },
      {
        name: 'step 4',
        title: 'Enter your comment',
        children: (
          <>
            <Box ml={"40px"} py="4"><img src={transaction} alt="loading..." /></Box>{' '}
            <ButtonGroup  ml={"40px"}> 
              <Button
                onClick={back}
                isDisabled={step === 0}
                variant="ghost"
                colorScheme="twitter"
              >Back</Button>
              <Button
                onClick={next}
                isDisabled={step >= 3}
                colorScheme="facebook"
              >Next</Button>
            </ButtonGroup>
          </>
        ),
      },

      {
        name: 'step 4',
        title: 'Approve transcation in your metamask',
        children: (
          <>
            <Box ml={"40px"} py="4"><img src={transaction} alt="loading..." /></Box>{' '}
            <ButtonGroup  ml={"40px"}> 
              <Button
                onClick={back}
                isDisabled={step === 0}
                variant="ghost"
                colorScheme="twitter"
              >Back</Button>
              <Button
                onClick={next}
                isDisabled={step >= 3}
                colorScheme="facebook"
              >Next</Button>
            </ButtonGroup>
          </>
        ),
      },
      {
        name: 'step 4',
        title: 'Find the certified passports approved by you ',
        children: (
          <>
            <Box ml={"40px"} py="4"><img src={card} alt="loading..." /></Box>
            <ButtonGroup ml={"40px"}>
              <Button
                onClick={back}
                isDisabled={step === 0}
                variant="ghost"
                colorScheme="twitter"
              >
                Back
              </Button>
              <Button
                onClick={next}
                isDisabled={step >= 3}
                colorScheme="whatsapp"
              >
                Complete
              </Button>
            </ButtonGroup>
          </>
        ),
      },
    ]
  
    return (
      <>
        <Steps step={step} mb="2" orientation="vertical">
          {steps.map((args, i) => (
            <StepsItem key={i} {...args} />
          ))}
          <StepsCompleted py="4">🎉Completed 🥳</StepsCompleted>
        </Steps>
      </>
    )
  }

  export default CVertStepper;