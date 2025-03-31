import { CssBaseline, Box } from "@mui/material";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { TodoList } from "./components/TodoList";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
          {isAuthenticated ? <TodoList /> : <Login />}
        </Box>
      </Box>
    </>
  );
}

export default App;
