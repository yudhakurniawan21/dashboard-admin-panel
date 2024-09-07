import { Box, Button, Group } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch } from "../store/store";

interface MenuItem {
  label: string;
  path: string;
}

const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Define menu items dynamically
  const menuItems: MenuItem[] = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/profile" },
    // Add more items here if needed
  ];

  const isActive = (path: string) => location.pathname === path;
  return (
    <Box
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "#f1f3f5",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo or title */}
      <Box style={{ fontWeight: "bold", fontSize: "20px" }}>MyApp</Box>

      {/* Dynamic Menu Items */}
      <Group gap="md">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            component={Link}
            to={item.path}
            variant={isActive(item.path) ? "filled" : "light"} // Apply active style
          >
            {item.label}
          </Button>
        ))}
      </Group>

      {/* Logout Button */}
      <Button color="red" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </Box>
  );
};

export default Header;
