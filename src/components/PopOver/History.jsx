import React from "react";
import {
  Stack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
} from "@chakra-ui/react";
import { InfoOutlineIcon, DownloadIcon } from "@chakra-ui/icons";
import FocusLock from "react-focus-lock";
import { saveAs } from "file-saver";
import { format, fromUnixTime } from "date-fns"; // Importing date-fns functions

const formatDateToISO = (timestamp) => {
  const parsedDate = fromUnixTime(timestamp);
  return format(parsedDate,  "yyyy-MM-dd HH:mm:ss");
};

const HistoryContent = ({ passport }) => {
  const maintenanceHistory = passport.maintenanceHistory || [];

  if (maintenanceHistory.length === 0) {
    return (
      <Stack spacing={4} align="center">
        <Text>No History Yet</Text>
      </Stack>
    );
  }

  const tableData = maintenanceHistory.map((entry) => ({
    address: entry[0],
    timestamp: formatDateToISO(parseInt(entry[1])),
    comments: entry[2],
  }));

  const handleDownloadClick = () => {
    // Convert table data to CSV format
    const csvData = [
      ["Maintenance Address", "Date & Time", "Comments"],
      ...tableData.map((entry) => [entry.address, entry.timestamp, entry.comments]),
    ].map((row) => row.join(","));

    // Create a Blob with the CSV data
    const blob = new Blob([csvData.join("\n")], { type: "text/csv;charset=utf-8" });

    // Save the Blob as a CSV file
    saveAs(blob, "maintenance_history.csv");
  };

  return (
    <Stack spacing={4}>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Maintenance History</TableCaption>
        <Thead>
          <Tr>
            <Th>Maintenance Address</Th>
            <Th>Date & Time</Th>
            <Th>Comments</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((entry, index) => (
            <Tr key={index}>
              <Td>{entry.address}</Td>
              <Td>{entry.timestamp}</Td>
              <Td>{entry.comments}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        onClick={handleDownloadClick}
        leftIcon={<DownloadIcon />}
        colorScheme="blue"
        size="sm"
      >
        Download CSV
      </Button>
    </Stack>
  );
};

const History = ({ name, passport }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<InfoOutlineIcon />}
        colorScheme="twitter"
        variant="solid"
      >
        {name}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>History of Maintenance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FocusLock returnFocus persistentFocus={false}>
              <HistoryContent passport={passport} />
            </FocusLock>
          </ModalBody>

          <ModalFooter>{/* Optional footer content */}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default History;
