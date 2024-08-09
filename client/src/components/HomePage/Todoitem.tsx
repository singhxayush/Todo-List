import {
  Badge,
  Box,
  Flex,
  Spinner,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Todo } from "../useTodos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../App";
import { IoArrowUndoCircle } from "react-icons/io5";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const textColor = useColorModeValue("gray.700", "gray.200");
  const queryClient = useQueryClient();
  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      //   if (todo.completed) return alert("Todo is already completed");
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: "PATCH",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => {
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Flex gap={2} alignItems={"center"}>
      <Flex
        flex={1}
        flexDirection={"column"}
        alignItems={"start"}
        border={"1px"}
        borderColor={"gray.600"}
        p={2}
        borderRadius={"lg"}
        justifyContent={"space-between"}
        cursor={isMobile ? "pointer" : undefined}
        onClick={isMobile ? () => updateTodo() : undefined}
      >
        <Text
          ml="1"
          mb="1"
          fontSize="sm"
          fontWeight="bold"
          color={textColor}
          textDecoration={todo.completed ? "line-through" : "none"}
        >
          {todo.heading}
        </Text>

        <VStack>
          {todo.completed ? (
            <Badge ml="1" colorScheme="green">
              Done
            </Badge>
          ) : (
            <Badge ml="1" colorScheme="yellow">
              Pending
            </Badge>
          )}
        </VStack>

        <Text
          ml="1"
          fontSize="sm"
          color={textColor}
          textDecoration={todo.completed ? "line-through" : "none"}
        >
          {todo.body}
        </Text>
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        {!isMobile && !todo.completed && (
          <Box
            color={"green.300"}
            cursor={"pointer"}
            onClick={() => updateTodo()}
          >
            {!isUpdating && <FaCheckCircle size={20} />}
            {isUpdating && <Spinner size={"sm"} />}
          </Box>
        )}
        <VStack>
          <Box
            color={"red.400"}
            cursor={"pointer"}
            onClick={() => deleteTodo()}
          >
            {!isDeleting && <RiDeleteBack2Fill size={24} />}
            {isDeleting && <Spinner size={"sm"} />}
          </Box>

          <Box
            color={"blue.400"}
            cursor={"pointer"}
            onClick={() => updateTodo()}
          >
            {todo.completed && !isUpdating && <IoArrowUndoCircle size={28} />}
            {todo.completed && isUpdating && <Spinner size={"sm"} />}
          </Box>
        </VStack>
      </Flex>
    </Flex>
  );
};
export default TodoItem;
