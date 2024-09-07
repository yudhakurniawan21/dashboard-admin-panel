import { ReactNode } from "react";
import { Box } from "@mantine/core";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box style={{ display: "flex", height: "100vh"  }}>
      <Sidebar />
      <Box style={{ flex: 1, padding: "16px" }}>{children}</Box>
    </Box>
  );
};

export default Layout;
