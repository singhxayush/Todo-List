import {
  Box,
  Flex,
  Container,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container
      position="fixed"
      top={0}
      left="50%"
      transform="translateX(-50%)"
      zIndex={1000}
      width="full"
      maxW="container.lg"
    >
      <Box
        px={4}
        py={2}
        borderRadius="md"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
        </Flex>
      </Box>
    </Container>
  );
}
