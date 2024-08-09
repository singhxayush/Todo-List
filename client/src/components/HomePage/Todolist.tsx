import { Stack, Divider } from "@chakra-ui/react";
import TodoItem from "./Todoitem";
import { useTodos } from "../useTodos";

const TodoList = () => {
  // Use the custom hook to fetch todos
  const { data: todos} = useTodos();

  // Separate todos into pending and completed
  const pendingTodos = todos?.filter((todo) => !todo.completed) || [];
  const completedTodos = todos?.filter((todo) => todo.completed) || [];

  return (
    <>
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
