import { createTheme, MantineProvider } from "@mantine/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { useAppSelector } from "./store/store";
import "@mantine/core/styles.css";
import './App.css';
import Layout from "./components/Layout"; // New Layout component

const App = () => {
  // const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  const theme = createTheme({
    fontFamily: "Open Sans, sans-serif",
    primaryColor: "cyan",
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Layout>
                  <Navigate to="/dashboard" replace />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Layout>
                  <PrivateRoute requiredRole="admin">
                    <Dashboard />
                  </PrivateRoute>
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/unauthorized"
            element={<div>Unauthorized Access</div>}
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;
