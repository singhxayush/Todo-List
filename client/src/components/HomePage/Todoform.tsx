import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { BASE_URL } from "../../App";
import { PiCommandFill } from "react-icons/pi";
import { TbSquareLetterKFilled } from "react-icons/tb";

const TodoForm = () => {
  const [newTodoHeader, setNewTodoHeader] = useState("");
  const [newTodoBody, setNewTodoBody] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast({
    position: 'top',
  })
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [iconsVisible, setIconsVisible] = useState(true);
  const handleFocus = () => {
    setIconsVisible(false);
  };
  const handleBlur = () => {
    setIconsVisible(true);
  };

  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await fetch(BASE_URL + `/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ heading: newTodoHeader, body: newTodoBody }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        setNewTodoHeader("");
        setNewTodoBody("");
        return data;
      } catch (error: any) {
        throw new Error(error.message || "Error occurred");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      // Show success toast
      toast({
        title: "Todo added!",
        description: "Todo Item Successfully Added.",
        status: "success",
        duration: 3000,
        variant: "solid",
        isClosable: true,
      });
    },
    onError: (error: any) => {
      // Show error toast
      toast({
        title: "Error",
        description: error.message || "Can't Add Empty Todo",
        status: "error",
        duration: 3000,
        variant: "solid",
        isClosable: true,
      });
    },
  });

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <form onSubmit={createTodo}>
      <Flex gap={2}>
        <InputGroup>
          <Input
            ref={inputRef}
            type="text"
            value={newTodoHeader}
            onChange={(e) => setNewTodoHeader(e.target.value)}
            placeholder="Type your todo"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {iconsVisible && !isMobile && (
            <InputRightElement pointerEvents="none" marginRight={2}>
              <PiCommandFill size={28} opacity={0.5} />
              <TbSquareLetterKFilled size={27} opacity={0.5} />
            </InputRightElement>
          )}
        </InputGroup>
        <Button
          mx={2}
          type="submit"
          _active={{
            transform: "scale(.97)",
          }}
        >
          {isCreating ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
        </Button>
      </Flex>
    </form>
  );
};

export default TodoForm;
