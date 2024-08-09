import {
  Button,
  VStack,
  Divider,
  useColorMode,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { BsDatabaseFillX } from 'react-icons/bs';

const SettingsMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack spacing={0} align="stretch">
      <Button variant="ghost" justifyContent="flex-start" py={3}>
        <FiLogOut size={20} style={{ marginRight: "10px" }} />
        Logout
      </Button>
      <Divider />

      <Button
        onClick={toggleColorMode}
        variant="ghost"
        justifyContent="flex-start"
        py={3}
      >
        {colorMode === "light" ? (
          <IoMoon size={20} style={{ marginRight: "10px" }} />
        ) : (
          <IoSunny size={20} style={{ marginRight: "10px" }} />
        )}
        {colorMode === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
      <Divider />

      <Button
        variant="ghost"
        justifyContent="flex-start"
        py={3}
      >
        <TiUserDeleteOutline
          size={20}
          style={{ marginRight: "10px" }}
        />
        Delete Account
      </Button>
      <Divider />

      <Button
        variant="ghost"
        justifyContent="flex-start"
        py={3}
      >
        <BsDatabaseFillX size={20} style={{ marginRight: "10px" }} />
        Clear Data
      </Button>
    </VStack>
  );
};

export default SettingsMenu;