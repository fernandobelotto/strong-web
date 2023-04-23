import {
  Button,
  Divider,
  Heading,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { Key, Shortcut } from "@shopify/react-shortcuts";
import { Link, useNavigate } from "react-router-dom";

const SideBarButton = ({ to, label }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Button
      border={location.pathname === to ? "1px solid" : "none"}
      rounded="sm"
      borderColor={colorMode === "light" ? "gray.700" : "gray.300"}
      w="full"
      as={Link}
      to={to}
      size="sm"
    >
      {label}
    </Button>
  );
};

export function SideBar() {
  const navigate = useNavigate();

  const shortcuts = [
    {
      ordered: ["1"],
      onMatch: () => navigate("/dashboard/"),
    },
    {
      ordered: ["2"],
      onMatch: () => navigate("/dashboard/users"),
    },
    {
      ordered: ["3"],
      onMatch: () => navigate("/dashboard/entities"),
    },
    {
      ordered: ["4"],
      onMatch: () => navigate("/dashboard/roles"),
    },
  ];

  return (
    <>
      {shortcuts.map((shortcut) => {
        return (
          <Shortcut
            key={shortcut.ordered.join("")}
            held={["Control"]}
            ordered={shortcut.ordered as Key[]}
            onMatch={shortcut.onMatch}
          />
        );
      })}
      <VStack p={3}>
        <Link to="/dashboard">
          <Heading size="md">Strong Web</Heading>
        </Link>
        <Divider />
        <SideBarButton to="/dashboard/" label="Dashboard" />
        <SideBarButton to="/dashboard/history" label="History" />
        <SideBarButton to="/dashboard/exercises" label="Exercises" />
        <SideBarButton to="/dashboard/workout" label="Workout" />
        <SideBarButton to="/dashboard/measures" label="Measures" />
        {/* <SideBarButton to="/dashboard/users" label="Users" /> */}
      </VStack>
    </>
  );
}
