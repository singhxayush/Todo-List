import { Flex, Spinner, Stack, Text, Divider } from "@chakra-ui/react";
import TodoItem from "./Todoitem";
import { useTodos } from "./useTodos";

const TodoList = () => {
  // Use the custom hook to fetch todos
  const { data: todos, isLoading } = useTodos();

  // Check if all tasks are completed
  const allTasksCompleted = todos?.every((todo) => todo.completed) ?? false;

  // Separate todos into pending and completed
  const pendingTodos = todos?.filter((todo) => !todo.completed) || [];
  const completedTodos = todos?.filter((todo) => todo.completed) || [];

  return (
    <>
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
          overflow="hidden"   // Hide overflow text
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
          overflow="hidden"   // Hide overflow text
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
          overflow="hidden"   // Hide overflow text
          textOverflow="ellipsis" // Add ellipsis if text overflows
        >
          Pending tasks
        </Text>
      )}

      {isLoading && (
        <Flex justifyContent={"center"} my={4}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {!isLoading && todos?.length === 0 && (
        <Stack alignItems={"center"} gap="3">
          <Text fontSize={"xl"} textAlign={"center"} color={"gray.600"}>
            Add a task
          </Text>
          <img src="/todo1.png" alt="todo logo" width={400} style={{ margin: "20px" }} />
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

export default TodoList;
