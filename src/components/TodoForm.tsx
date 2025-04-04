import { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Priority } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addTodo } from "../store/slices/todoSlice";

interface TodoFormProps {
  open: boolean;
  onClose: () => void;
}

export const TodoForm = ({ open, onClose }: TodoFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = () => {
    if (title.trim() && currentUser) {
      dispatch(
        addTodo({
          title,
          description,
          priority,
          userId: currentUser.id,
        }),
      );
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
    >
      <DialogTitle>{t("todo.add")}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label={t("todo.title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size={isMobile ? "small" : "medium"}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={isMobile ? 3 : 4}
            label={t("todo.description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size={isMobile ? "small" : "medium"}
          />
          <FormControl
            fullWidth
            margin="normal"
            size={isMobile ? "small" : "medium"}
          >
            <InputLabel>{t("todo.priority")}</InputLabel>
            <Select
              value={priority}
              label={t("todo.priority")}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <MenuItem value="low">{t("priority.low")}</MenuItem>
              <MenuItem value="medium">{t("priority.medium")}</MenuItem>
              <MenuItem value="high">{t("priority.high")}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: isMobile ? 2 : 3, pb: isMobile ? 2 : 3 }}>
        <Button onClick={onClose} sx={{ width: isMobile ? "50%" : "auto" }}>
          {t("todo.cancel")}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ width: isMobile ? "50%" : "auto" }}
        >
          {t("todo.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
