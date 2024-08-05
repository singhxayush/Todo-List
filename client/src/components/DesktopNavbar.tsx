import {
  Box,
  Flex,
  Button,
  useColorMode,
  Container,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import React from "react";

type DesktopNavbarProps = {
  children?: React.ReactNode;
};

const DesktopNavbar = ({ children }: DesktopNavbarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      position="fixed"
      top={0}
      left="50%"
      transform="translateX(-50%)"
      zIndex={1000}
      width={"auto"}
    >
      <Box
        px={4}
        my={4}
        borderWidth="0.5px"
        borderRadius={"60"}
        backdropFilter="blur(3px)"
      >
        <Flex h={14} alignItems={"center"} justifyContent={"center"}>
          {/* LEFT SIDE */}
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          >
            <Button variant="ghost">Todo List</Button>
            <Button variant="ghost">Analytics</Button>
            <Button variant="ghost" onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
            </Button>
          </Flex>
        </Flex>
        {children}
      </Box>
    </Container>
  );
};

export default DesktopNavbar;






// import {
//   Box,
//   Flex,
//   Button,
//   useColorModeValue,
//   useColorMode,
//   Container,
// } from "@chakra-ui/react";
// import { IoMoon } from "react-icons/io5";
// import { LuSun } from "react-icons/lu";
// import React from "react";

// type NavbarProps = {
//   children?: React.ReactNode;
// };

// export default function Navbar({ children }: NavbarProps) {
//   const { colorMode, toggleColorMode } = useColorMode();

//   return (
//     <Container
//       position="fixed"
//       top={0}
//       left="50%"
//       transform="translateX(-50%)"
//       zIndex={1000}
//       width={"auto"}
//     >
//       <Box
//         bgColor={useColorModeValue(
//           "rgba(255, 255, 255, 0.1)",
//           "rgba(255, 255, 255, 0.1)"
//         )}
//         px={4}
//         my={4}
//         borderRadius={"60"}
//         backdropFilter="blur(3px)"
//       >
//         <Flex h={16} alignItems={"center"} justifyContent={"center"}>
//           {/* LEFT SIDE */}
//           <Flex
//             justifyContent={"center"}
//             alignItems={"center"}
//             gap={3}
//             display={{ base: "none", sm: "flex" }}
//           >
//             <Button>Todo</Button>
//             <Button>Analytics</Button>
//             <Button onClick={toggleColorMode}>
//               {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
//             </Button>
//           </Flex>
//         </Flex>
//         {children}
//       </Box>
//     </Container>
//   );
// }
