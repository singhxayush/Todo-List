import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useTodos } from "./useTodos"; // Import the custom hook

const TodoProgressBar = () => {
  // Use the custom hook to fetch todos
  const { data: todos, isLoading } = useTodos();

  // Show 0% when the data is still loading
  if (isLoading) {
    return (
      <CircularProgress value={0} color="green.400" size="220px">
        <CircularProgressLabel fontSize="sm">0.0%</CircularProgressLabel>
      </CircularProgress>
    );
  }

  // Calculate the total tasks and completed tasks
  const totalTaskCreated = todos?.length || 0;
  const totalTaskDone = todos?.filter((todo) => todo.completed).length || 0;

  // Calculate the percentage of completed tasks
  const percentageDone =
    totalTaskCreated === 0 ? 0 : (totalTaskDone / totalTaskCreated) * 100;

  return (
    <CircularProgress value={percentageDone} color="green.400" size="250px">
      <CircularProgressLabel fontSize="large">
        {percentageDone.toFixed(1)}%
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default TodoProgressBar;
