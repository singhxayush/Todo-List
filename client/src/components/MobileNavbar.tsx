import {
  IconButton,
  Collapse,
  VStack,
  useColorModeValue,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useState } from "react";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const menuButtonBgColor = useColorModeValue("gray.200", "gray.700");

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <IconButton
        icon={<GiHamburgerMenu />}
        backgroundColor={menuButtonBgColor}
        aria-label="Open menu"
        onClick={handleMenuToggle}
        display={{ base: "flex", md: "none" }} // Show on small screens only
        ml="auto" // Move to the right
        _hover={{ bg: useColorModeValue("gray.300", "gray.600") }} // Add a hover effect if desired
        _active={{ bg: useColorModeValue("gray.400", "gray.500") }} // Add an active effect if desired
      />
      <Collapse in={isMenuOpen}>
        <VStack
          spacing={4}
          align="stretch"
          display={{ base: "flex", md: "none" }} // Show only on mobile
          p={4}
          // bgColor={useColorModeValue("transparent", "transparent")} // Transparent background
          bgColor={useColorModeValue("white", "gray.800")}
          borderRadius="md"
          mt={10}
          position="absolute"
          left={0}
          right={0}
          width="auto"
          borderWidth={"0.5px"}
          mx={3} // Apply horizontal margins
          // backdropFilter="blur(10px)"
        >
          <Button
            variant="ghost" // Makes the button transparent
          >
            Todo List
          </Button>
          <Button
            variant="ghost" // Makes the button transparent
          >
            Analytics
          </Button>
          <Button
            onClick={toggleColorMode}
            variant="ghost" // Makes the button transparent but keeps the border
            _hover={{ bgColor: useColorModeValue("gray.100", "gray.700") }} // Optional hover effect
          >
            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
          </Button>
        </VStack>
      </Collapse>
    </>
  );
};

export default MobileNavbar;
