import {
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex h={16} alignItems="center" justifyContent="space-between">
      {isMobile ? <MobileNavbar /> : <MobileNavbar />}
    </Flex>
  );
}
