import React from 'react';
import { IconButton, VStack } from '@chakra-ui/react';
import { StarIcon, SettingsIcon, CheckCircleIcon, PlusSquareIcon , LockIcon} from '@chakra-ui/icons';

const VerticalNavigationBar = () => {
  return (
    <VStack
      spacing={4}
      p={4}
      bg="gray.100"
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      alignItems="flex-start"
    >
      <IconButton icon={<PlusSquareIcon />} aria-label="Add" />
      <IconButton icon={<StarIcon/>} aria-label="Home" />
      <IconButton icon={<SettingsIcon/>} aria-label="Maintanance" />
      <IconButton icon={<CheckCircleIcon />} aria-label="Certify" />
      <IconButton icon={<LockIcon />} aria-label="LogOut" />
      
    </VStack>
  );
};

export default VerticalNavigationBar;
