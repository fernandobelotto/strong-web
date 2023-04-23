import {
  Box,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { HeaderBar } from "./HeaderBar";
import { SideBar } from "./SideBar";

export const DashboardLayout = () => {
  const showSidebar = useBreakpointValue(
    {
      base: false,
      sm: true,
    },
    {
      fallback: "md",
    }
  );

  return (
    <>
      <Flex minH="97vh" m={2}>
        {showSidebar ? (
          <Box w="220px" border="1px solid" borderColor="gray.300" rounded="sm">
            <SideBar />
          </Box>
        ) : null}

        <Box w="full" ml={2}>
          <Box
            border="1px solid"
            borderColor="gray.300"
            rounded="sm"
            h="55px"
            bg={useColorModeValue("white", "gray.700")}
            w="full"
          >
            <HeaderBar />
          </Box>
          <main>
            <Box border="1px solid" borderColor="gray.300" my={2} rounded="sm">
              <Box p={5}>
                <Outlet />
              </Box>
            </Box>
          </main>
        </Box>
      </Flex>
    </>
  );
};
