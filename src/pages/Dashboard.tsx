// src/pages/Dashboard.tsx
import { Box, Button, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box>
      <Text>Welcome, {user?.name}</Text>
      <Text>Your role is: {user?.role}</Text>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default Dashboard;
