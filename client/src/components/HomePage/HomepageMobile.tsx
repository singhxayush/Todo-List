import {
  Box,
  Flex,
  useBreakpointValue,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Center,
  Container,
  Stack,
} from "@chakra-ui/react";
import { DashboardMobile } from "./Dashboard/DashboardMobile";
import { useTodos } from "../useTodos";
import TodoItem from "./Todoitem";
import { useState } from "react"; // Add this import

let currentTabIndex = 0;
export const isSecondTabActive = () => currentTabIndex === 1;

export const HomepageMobile = () => {
  const [, setTabIndex] = useState(0);

  const responsiveHeight = useBreakpointValue({
    base: "125px",
    sm: "145px",
    md: "165px",
    lg: "185px",
    xl: "200px",
  });

  // Use the custom hook to fetch todos
  const { data: todos } = useTodos();

  // Separate todos into pending and completed
  const pendingTodos = todos?.filter((todo) => !todo.completed) || [];
  const completedTodos = todos?.filter((todo) => todo.completed) || [];

  // Calculate available height for the list section
  const availableHeight = `calc(100vh - ${responsiveHeight} - 26px - 28px)`;

  const handleTabChange = (index: number) => {
    currentTabIndex = index;
    setTabIndex(index); // This forces a re-render
  };

  return (
    <Flex direction="column" height="100vh" overflow="hidden">
      <Box>
        <DashboardMobile />
      </Box>
      <Box
        marginTop={`calc(${responsiveHeight} + 6px)`}
        transition="margin-top 0.3s ease-in-out"
        flex="1"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Tabs
          variant="line"
          display="flex"
          flexDirection="column"
          flex="1"
          onChange={handleTabChange}
        >
          <TabList>
            <Center width="100%">
              <Tab>Pending</Tab>
              <Tab>Done</Tab>
            </Center>
          </TabList>

          <TabPanels flex="1" overflow="hidden">
            <TabPanel height="100%" padding={0}>
              <Container
                overflowY="auto"
                height={availableHeight}
                paddingBottom={20}
              >
                <Stack gap={3} paddingY={4}>
                  {pendingTodos.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                  ))}
                </Stack>
              </Container>
            </TabPanel>

            <TabPanel height="100%" padding={0}>
              <Box height={availableHeight} overflowY="auto">
                <Container>
                  <Stack gap={3} paddingY={4}>
                    {completedTodos.map((todo) => (
                      <TodoItem key={todo._id} todo={todo} />
                    ))}
                  </Stack>
                </Container>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};