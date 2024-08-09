import { Stack, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "./components/NavBar/Navbar";
import { HomepageMobile } from "./components/HomePage/HomepageMobile";

// export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";
export const BASE_URL = "http://localhost:8080/api"

const App = () => {
  // Directly use string literals as the value
  // const flexDir = useBreakpointValue<'row' | 'column'>({
  //   base: 'column',
  //   md: 'row',
  // }) || 'row'; // Fallback value if undefined

  const isMobile = useBreakpointValue({ base: true, md: false });



  return (
    <Stack >
      {isMobile && (<HomepageMobile />)}
      {!isMobile && (<HomepageMobile />)}
      <Navbar />
    </Stack>
  );
};

export default App;
