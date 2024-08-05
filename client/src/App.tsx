import { Box, Container, Flex, Stack, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import TodoForm from "./components/Todoform";
import TodoList from "./components/Todolist";
import Dashboard from "./components/Dashboard";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";

const App = () => {
  // Directly use string literals as the value
  const flexDir = useBreakpointValue<'row' | 'column'>({
    base: 'column',
    md: 'row',
  }) || 'row'; // Fallback value if undefined

  return (
    <Stack spacing={4} minH="100vh">
      <Navbar />
      <Flex
        direction={flexDir} // Use direction instead of flexDirection
        flex="1"
        mt={['80px', '80px', '80px']}
        h="calc(100vh - 80px)"
        overflow="hidden"
      >
        <Container flex="1" p={4} maxW="container.xl" overflow="hidden">
          <TodoForm />
          <Box maxH="calc(100vh - 80px)" overflowY="auto" mt={4} paddingBottom={30}>
            <TodoList />
          </Box>
        </Container>
        <Container flex="1" p={4} maxW="container.xl" overflow="hidden">
          <Dashboard />
        </Container>
      </Flex>
    </Stack>
  );
};

export default App;
