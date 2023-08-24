import React from 'react'
import { Steps, StepsItem, StepsCompleted  } from '@saas-ui/react'
import {
  Button,
  ButtonGroup,
  Box,
  Flex
} from "@chakra-ui/react";





function OVertStepper() {
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
        title: 'Creating a new passport',
        children: (
          <>
          <Box ml={"40px"} py="4">
            <Flex>
      <div style={{ position: 'relative', width: 'fit-content', height: 'fit-content' }}>
    <a style={{ position: 'absolute', top: '20px', right: '1rem', opacity: 0.8 }} href="https://clipchamp.com/watch/w4bCk0jzyKm?utm_source=embed&utm_medium=embed&utm_campaign=watch">
    </a>
    <iframe title='Connect' allow="autoplay;" allowfullscreen style={{ border: 'none' }} src="https://clipchamp.com/watch/w4bCk0jzyKm/embed" width="300" height="360"></iframe>
</div>

      </Flex>
      </Box>
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
        title: 'Assigning a certifer and maintenance party',
        children: (
          <>
          <Box ml={"40px"} py="4">
            <Flex>
      <div style={{ position: 'relative', width: 'fit-content', height: 'fit-content' }}>
    <a style={{ position: 'absolute', top: '20px', right: '1rem', opacity: 0.8 }} href="https://clipchamp.com/watch/OR69RZf4sJn?utm_source=embed&utm_medium=embed&utm_campaign=watch">
    </a>
    <iframe title='Connect' allow="autoplay;" allowfullscreen style={{ border: 'none' }} src="https://clipchamp.com/watch/OR69RZf4sJn/embed" width="300" height="360"></iframe>
</div>

      </Flex>
      </Box>
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
        title: 'Transfering passports to a different owner',
        children: (
          <>
          <Box ml={"40px"} py="4">
            <Flex>
      <div style={{ position: 'relative', width: 'fit-content', height: 'fit-content' }}>
    <a style={{ position: 'absolute', top: '20px', right: '1rem', opacity: 0.8 }} href="https://clipchamp.com/watch/NjJhJDPwJEw?utm_source=embed&utm_medium=embed&utm_campaign=watch">
    </a>
    <iframe title='Connect' allow="autoplay;" allowfullscreen style={{ border: 'none' }} src="https://clipchamp.com/watch/NjJhJDPwJEw/embed" width="450" height="360"></iframe>
</div>

      </Flex>
      </Box>
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

  export default OVertStepper;