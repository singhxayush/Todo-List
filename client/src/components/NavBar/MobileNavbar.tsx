import { useCallback, useEffect, useState } from "react";
import {
  IconButton,
  Container,
  Box,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useColorModeValue,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";

import { LuListTodo } from "react-icons/lu";
import { GrAnalytics } from "react-icons/gr";
import { TbDevicesPin } from "react-icons/tb";
import SettingsMenu from "./SettingsMenu"; // Import the SettingsMenu component
import { AiOutlineSetting } from "react-icons/ai";

const MobileNavbar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleBackButton = useCallback((e: PopStateEvent) => {
    e.preventDefault();
    setIsSettingsOpen(false);
  }, []);

  const handleSettingsToggle = useCallback(() => {
    setIsSettingsOpen((prev) => {
      if (!prev) {
        // If we're opening the drawer, push a new state
        window.history.pushState({ drawer: "open" }, "", window.location.href);
      } else {
        // If we're closing the drawer, go back in history
        window.history.back();
      }
      return !prev;
    });
  }, []);

  useEffect(() => {
    if (isSettingsOpen) {
      window.addEventListener("popstate", handleBackButton);
    } else {
      window.removeEventListener("popstate", handleBackButton);
    }

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [isSettingsOpen, handleBackButton]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Container
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        zIndex={1000}
        width="100%"
        p={0}
        m={0}
        maxWidth="100%"
        backgroundColor={isMobile ? useColorModeValue("white", "gray.700") : "transparent"}
        backdropFilter={isMobile ? undefined : "blur(10px)"}
      >
        <Box borderTopWidth="0.5px" backdropFilter="blur(4px)">
          <Flex h={14} alignItems="center" justifyContent="center">
            <Flex
              width="100%"
              maxWidth={{
                base:"350px",
                sm:"400px",
                md:"800px",
              }}
              justifyContent="space-between"
              alignItems="center"
              px={4}
              gap={{
                md: 24,
                xl: 24,
              }}
            >
              {isMobile ? (
                <IconButton
                  icon={<LuListTodo size={20} />}
                  aria-label="Todo"
                  variant="ghost"
                />
              ) : (
                <Button
                  variant={"ghost"}
                  leftIcon={<LuListTodo size={20} />}
                >
                  Todo
                </Button>
              )}

              {isMobile ? (
                <IconButton
                  icon={<TbDevicesPin size={20} />}
                  aria-label="Projects"
                  variant="ghost"
                />
              ) : (
                <Button
                  variant={"ghost"}
                  leftIcon={<TbDevicesPin size={20} />}
                >
                  Projects
                </Button>
              )}

              {isMobile ? (
                <IconButton
                  icon={<GrAnalytics size={20} />}
                  aria-label="Analytics"
                  variant="ghost"
                />
              ) : (
                <Button
                  variant={"ghost"}
                  leftIcon={<GrAnalytics size={20} />}
                >
                  Analytics
                </Button>
              )}

              {isMobile ? (
                <IconButton
                  icon={<AiOutlineSetting size={20} />}
                  aria-label="Open settings"
                  onClick={handleSettingsToggle}
                  variant="ghost"
                />
              ) : (
                <Button
                  variant={"ghost"}
                  leftIcon={<AiOutlineSetting size={20} />}
                  onClick={handleSettingsToggle}
                >
                  Settings
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      </Container>

      <Drawer
        isOpen={isSettingsOpen}
        placement="bottom"
        onClose={handleSettingsToggle}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>
          <DrawerBody>
            <SettingsMenu />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavbar;
