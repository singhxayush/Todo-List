import {
  Flex,
  Text,
  Box,
  Container,
  useColorModeValue,
  useBreakpointValue,
  Button,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalCloseButton,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Kbd,
} from "@chakra-ui/react";
import TodoProgressBar from "./TodoProgress";
import React, { useState, FormEvent, useEffect, useCallback } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import "../../../index.css";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../../../App";

export const DashboardMobile = () => {
  const dashBoardBg = useColorModeValue("white", "gray.700");
  const responsiveHeight = useBreakpointValue({
    base: "125px",
    sm: "145px",
    md: "165px",
    lg: "185px",
    xl: "200px",
  });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [newTodoHeader, setNewTodoHeader] = useState("");
  const [newTodoBody, setNewTodoBody] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast({
    position: "top-right",
  });

  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async () => {
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

        return data;
      } catch (error) {
        throw new Error((error as Error).message || "Error occurred");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodoHeader("");
      setNewTodoBody("");
      onClose();
      toast({
        title: "Todo added!",
        description: "Todo Item Successfully Added.",
        status: "success",
        duration: 3000,
        variant: "solid",
        isClosable: true,
      });
    },
    onError: (error: unknown) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Can't Add Empty Todo",
        status: "error",
        duration: 3000,
        variant: "solid",
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo();
  };

  const handleNewTask = useCallback(() => {
    setOverlay(<OverlayOne />);
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        handleNewTask();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleNewTask]);

  return (
    <>
      <Container
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={1000}
        width="100%"
        bgColor={dashBoardBg}
        height={responsiveHeight}
        p={0}
        m={0}
        maxWidth="100%"
        transition="height 0.3s ease-in-out"
      >
        <Box>
          <Flex
            gap={0.5}
            height={responsiveHeight}
            alignItems="stretch"
            justifyContent="center"
            transition="height 0.3s ease-in-out"
          >
            {/* Left section */}
            <Flex
              height="100%"
              alignItems="center"
              justifyContent="center"
              flex={1}
            >
              <Box width="80%" height="80%" maxWidth="100px" maxHeight="100px">
                <TodoProgressBar />
              </Box>
            </Flex>

            {/* Right section */}
            <Flex
              width="100%"
              maxWidth="400px"
              height="100%"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              flex={1}
              marginRight={2}
            >
              <Flex alignItems="flex-end" gap={2}>
                <Text
                  fontSize={"3xl"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  textColor={useColorModeValue("gray.500", "gray.200")}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  // fontFamily={"'Fira Sans', sans-serif"}
                >
                  222
                </Text>
                <Text
                  fontSize={{ base: "smaller" }}
                  fontWeight={"bold"}
                  textColor={useColorModeValue("gray.300", "gray.600")}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  365
                </Text>
              </Flex>

              <Button
                rightIcon={<MdOutlinePlaylistAdd size={"20px"} />}
                marginY={2}
                colorScheme="green"
                variant="solid"
                fontSize={"sm"}
                fontFamily={"'Fira Sans', sans-serif"}
                onClick={handleNewTask}
                mr={1}
              >
                NEW TASK
              </Button>
              {!isMobile && (
                <Kbd
                  marginRight={1.5}
                  size="2px"
                  opacity={0.5}
                  backgroundColor="transparent"
                >
                  ctrl/cmd + k
                </Kbd>
              )}

              <Modal
                isCentered
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                {overlay}
                <ModalContent mx={4}>
                  <ModalHeader>Create new task</ModalHeader>
                  <ModalCloseButton />
                  <form onSubmit={handleSubmit}>
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>Task name</FormLabel>
                        <Input
                          ref={initialRef}
                          value={newTodoHeader}
                          onChange={(e) => setNewTodoHeader(e.target.value)}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Input
                          value={newTodoBody}
                          onChange={(e) => setNewTodoBody(e.target.value)}
                        />
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button mr={3} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        colorScheme="green"
                        isLoading={isCreating}
                        loadingText="Creating"
                        spinnerPlacement="end"
                      >
                        Create
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </>
  );
};
