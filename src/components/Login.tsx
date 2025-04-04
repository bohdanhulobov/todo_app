import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../hooks/reduxHooks";
import { login } from "../store/slices/authSlice";

export const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(login({ username, password }));
      // Check if login was successful by seeing if we have a current user
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "null",
      );
      if (!currentUser) {
        setError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ px: { xs: 2, sm: 3 } }}>
      <Paper
        elevation={3}
        sx={{
          mt: { xs: 4, sm: 8 },
          p: { xs: 2, sm: 4 },
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontSize: { xs: "1.3rem", sm: "1.5rem" },
              textAlign: "center",
              mb: 1,
            }}
          >
            {t("auth.login")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              width: "100%",
            }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {t("auth.loginError")}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label={t("auth.username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label={t("auth.password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size={isMobile ? "small" : "medium"}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("auth.login")}
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: 2,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              Demo users: user1/password1, user2/password2
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
