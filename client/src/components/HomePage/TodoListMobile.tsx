import { Flex, Stack, Text, Divider, Box, IconButton, Container } from "@chakra-ui/react";
import TodoItem from "./Todoitem";
import { useTodos } from "../useTodos";
import { Skeleton } from "@chakra-ui/react";
import { LuListTodo } from "react-icons/lu";
import { TbDevicesPin } from "react-icons/tb";
import { GrAnalytics } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";

export const TodoListMobile = () => {
  // Use the custom hook to fetch todos
  const { data: todos, isLoading } = useTodos();

  // Check if all tasks are completed
  const allTasksCompleted = todos?.every((todo) => todo.completed) ?? false;

  // Separate todos into pending and completed
  const pendingTodos = todos?.filter((todo) => !todo.completed) || [];
  const completedTodos = todos?.filter((todo) => todo.completed) || [];

  return (
    <>
        <Container
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        width="100%"
        p={0}
        m={0}
        maxWidth="100%"
      >
        <Box borderTopWidth="0.5px" backdropFilter="blur(4px)">
          <Flex h={14} alignItems="center" justifyContent="center">
            <Flex
              width="100%"
              maxWidth="400px"
              justifyContent="space-between"
              alignItems="center"
              px={4}
            >
              <IconButton
                icon={<LuListTodo size={20} />}
                aria-label="Todo List"
                variant="ghost"
              />
            

              <IconButton
                icon={<TbDevicesPin size={20} />}
                aria-label="Devices"
                variant="ghost"
              />
            
              <IconButton
                icon={<GrAnalytics size={20} />}
                aria-label="Analytics"
                variant="ghost"
              />
            

              <IconButton
                icon={<IoSettingsOutline size={20} />}
                aria-label="Open menu"
                variant="ghost"
              />
              
            </Flex>
          </Flex>
        </Box>
      </Container>
      {!isLoading && todos?.length === 0 ? (
        <Text
          fontSize={{ base: "2xl", md: "4xl" }} // Smaller size for mobile, larger for medium screens and up
          textTransform={"uppercase"}
          fontWeight={"bold"}
          textAlign={"center"}
          my={2}
          bgGradient="linear(to-b, gray.100, gray.700)"
          bgClip="text"
          whiteSpace="nowrap" // Prevent text from wrapping
          overflow="hidden" // Hide overflow text
          textOverflow="ellipsis" // Add ellipsis if text overflows
        >
          No task entry
        </Text>
      ) : allTasksCompleted ? (
        <Text
          fontSize={{ base: "2xl", md: "4xl" }} // Smaller size for mobile, larger for medium screens and up
          textTransform={"uppercase"}
          fontWeight={"bold"}
          textAlign={"center"}
          my={2}
          bgGradient="linear(to-b, gray.100, gray.700)"
          bgClip="text"
          whiteSpace="nowrap" // Prevent text from wrapping
          overflow="hidden" // Hide overflow text
          textOverflow="ellipsis" // Add ellipsis if text overflows
        >
          All tasks completed
        </Text>
      ) : (
        <Text
          fontSize={{ base: "2xl", md: "4xl" }} // Smaller size for mobile, larger for medium screens and up
          textTransform={"uppercase"}
          fontWeight={"bold"}
          textAlign={"center"}
          my={2}
          bgGradient="linear(to-b, gray.100, gray.700)"
          bgClip="text"
          whiteSpace="nowrap" // Prevent text from wrapping
          overflow="hidden" // Hide overflow text
          textOverflow="ellipsis" // Add ellipsis if text overflows
        >
          Pending tasks
        </Text>
      )}

      {isLoading && (
        <Flex justifyContent={"center"} my={4}>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          {/* <Skeleton startColor='pink.500' endColor='orange.500' height='20px' /> */}
          {/* <Spinner size={"xl"} /> */}
        </Flex>
      )}

      {!isLoading && todos?.length === 0 && (
        <Stack alignItems={"center"} gap="3">
          <Text fontSize={"xl"} textAlign={"center"} color={"gray.600"}>
            Add a task
          </Text>
          {/* <Skeleton height='20px' /> */}
          {/* <Skeleton startColor='pink.500' endColor='orange.500' height='20px' /> */}
          {/* <Spinner size={"xl"} /> */}
          <img
            src="/todo1.png"
            alt="todo logo"
            width={400}
            style={{ margin: "20px" }}
          />
        </Stack>
      )}

      <Stack gap={3}>
        {pendingTodos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}

        {/* Show a line separation if there are completed todos */}
        {completedTodos.length > 0 && <Divider my={4} />}

        {completedTodos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </Stack>
    </>
  );
};
