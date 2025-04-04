import { CssBaseline, Box } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  PaletteMode,
} from "@mui/material";
import { useMemo, useEffect } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { TodoList } from "./components/TodoList";
import { useAppSelector, useAppDispatch } from "./hooks/reduxHooks";
import { loadTodos } from "./store/slices/todoSlice";

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const dispatch = useAppDispatch();

  // Load todos when user changes
  useEffect(() => {
    dispatch(loadTodos(currentUser?.id));
  }, [currentUser, dispatch]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: currentTheme as PaletteMode,
          primary: {
            main: "#3f51b5",
          },
          secondary: {
            main: "#f50057",
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
        },
      }),
    [currentTheme],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
          {isAuthenticated ? <TodoList /> : <Login />}
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}

export default App;
