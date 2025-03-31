import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { Todo, Priority, Status } from "../types";
import { useTodo } from "../hooks/useTodo";
import { getPriorityColor, getStatusColor } from "../utils/todo-utils";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { t } = useTranslation();
  const { removeTodo, updateTodoStatus, updateTodoPriority } = useTodo();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Card sx={{ mb: 2, position: "relative" }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
          flexDirection={isMobile ? "column" : "row"}
          sx={{ alignItems: isMobile ? "flex-start" : "center" }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              mb: isMobile ? 1 : 0,
              width: isMobile ? "100%" : "auto",
              wordBreak: "break-word",
            }}
          >
            {todo.title}
          </Typography>
          <IconButton
            size="small"
            color="error"
            onClick={() => removeTodo(todo.id)}
            sx={{ alignSelf: isMobile ? "flex-end" : "center" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
          sx={{
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {todo.description}
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems="center"
          direction={isMobile || isTablet ? "column" : "row"}
        >
          <Grid>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, width: "100%" }}
            >
              <Chip
                label={t(`priority.${todo.priority}`)}
                color={getPriorityColor(todo.priority)}
                size="small"
                sx={{ mr: 1 }}
              />
              <Chip
                label={t(`status.${todo.status}`)}
                color={getStatusColor(todo.status)}
                size="small"
              />
            </Box>
          </Grid>

          <Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                width: "100%",
                justifyContent:
                  isMobile || isTablet ? "space-between" : "flex-end",
                mt: isMobile || isTablet ? 2 : 0,
              }}
            >
              <FormControl
                size="small"
                sx={{ minWidth: 120, flexGrow: isMobile ? 1 : 0 }}
              >
                <InputLabel id="priority-label">
                  {t("todo.priority")}
                </InputLabel>
                <Select
                  labelId="priority-label"
                  value={todo.priority}
                  label={t("todo.priority")}
                  onChange={(e) =>
                    updateTodoPriority(todo.id, e.target.value as Priority)
                  }
                  size="small"
                >
                  <MenuItem value="low">{t("priority.low")}</MenuItem>
                  <MenuItem value="medium">{t("priority.medium")}</MenuItem>
                  <MenuItem value="high">{t("priority.high")}</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{ minWidth: 120, flexGrow: isMobile ? 1 : 0 }}
              >
                <InputLabel id="status-label">{t("todo.status")}</InputLabel>
                <Select
                  labelId="status-label"
                  value={todo.status}
                  label={t("todo.status")}
                  onChange={(e) =>
                    updateTodoStatus(todo.id, e.target.value as Status)
                  }
                  size="small"
                >
                  <MenuItem value="todo">{t("status.todo")}</MenuItem>
                  <MenuItem value="in-progress">
                    {t("status.in-progress")}
                  </MenuItem>
                  <MenuItem value="done">{t("status.done")}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
