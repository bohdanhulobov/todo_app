import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
import { useTodo } from "../hooks/useTodo";

export const TodoList = () => {
  const { t } = useTranslation();
  const { todos } = useTodo();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      <Paper sx={{ p: { xs: 2, sm: 3 }, mt: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexDirection={isMobile ? "column" : "row"}
          gap={2}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
              textAlign: isMobile ? "center" : "left",
              width: isMobile ? "100%" : "auto",
            }}
          >
            {t("app.title")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
            sx={{
              width: isMobile ? "100%" : "auto",
              whiteSpace: "nowrap",
            }}
          >
            {t("todo.add")}
          </Button>
        </Box>

        {todos.length > 0 ? (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <Typography
            align="center"
            color="textSecondary"
            sx={{
              py: 4,
              px: 2,
            }}
          >
            {t("todo.emptyList")}
          </Typography>
        )}

        <TodoForm
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
        />
      </Paper>
    </Container>
  );
};
