import {
  Box,
  Flex,
  Stack,
} from "@chakra-ui/react";
import TodoProgressBar from "./TodoProgress";


export const Dashboard = () => {
  return (
    <Box p={6}>
      <Flex direction="column" align="center" justify="center" h="fit-content">
        <Stack spacing={8} align="center">
          <TodoProgressBar />
        </Stack>
      </Flex>
    </Box>
  );
};
