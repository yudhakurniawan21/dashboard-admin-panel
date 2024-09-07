// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../store/store";
import { Box, LoadingOverlay } from "@mantine/core";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: "user" | "admin";
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );

  if (loading)
    return (
      <Box>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "pink", type: "bars" }}
        />
      </Box>
    );
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (requiredRole && user?.role !== requiredRole)
    return <Navigate to="/unauthorized" />;

  return <>{children}</>;
};

export default PrivateRoute;
