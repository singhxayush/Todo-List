import {
  CircularProgress,
  CircularProgressLabel,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTodos } from "../../useTodos";

const TodoProgressBar = () => {
  const { data: todos, isLoading } = useTodos();
  const barSize = useBreakpointValue({
    base: "110px",
    sm: "120px",
    md: "140px",
    lg: "160px",
    xl: "180px",
  });

  if (isLoading) {
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress value={0} color="green.400" size={barSize}>
          <CircularProgressLabel fontSize="xs">0.0%</CircularProgressLabel>
        </CircularProgress>
      </Box>
    );
  }

  const totalTaskCreated = todos?.length || 0;
  const totalTaskDone = todos?.filter((todo) => todo.completed).length || 0;
  const percentageDone =
    totalTaskCreated === 0 ? 0 : (totalTaskDone / totalTaskCreated) * 100;

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress
        value={percentageDone}
        color="green.400"
        size={barSize}
        capIsRound={false}
        thickness={"16px"}
      >
        <CircularProgressLabel fontSize="xs">
          {percentageDone.toFixed(1)}%
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
};

export default TodoProgressBar;
