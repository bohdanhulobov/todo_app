import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme as useMuiTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";
import { useAuth } from "../hooks/useAuth";
import { Language } from "../types";

export const Header = () => {
  const { t } = useTranslation();
  const { currentTheme, toggleTheme } = useTheme();
  const { currentLanguage, setLanguage } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const [languageMenuAnchor, setLanguageMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
    handleLanguageMenuClose();
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          {t("app.title")}
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" edge="end" onClick={toggleMobileMenu}>
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            >
              <Box sx={{ width: 250 }} role="presentation">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={toggleTheme}>
                      <ListItemIcon>
                        {currentTheme === "dark" ? (
                          <Brightness7Icon />
                        ) : (
                          <Brightness4Icon />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={t("theme.toggle")} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LanguageIcon />
                      </ListItemIcon>
                      <ListItemText primary={t("language.select")} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ pl: 4 }}>
                    <ListItemButton
                      onClick={() => handleLanguageChange("en")}
                      selected={currentLanguage === "en"}
                    >
                      <ListItemText primary={t("language.en")} />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding sx={{ pl: 4 }}>
                    <ListItemButton
                      onClick={() => handleLanguageChange("uk")}
                      selected={currentLanguage === "uk"}
                    >
                      <ListItemText primary={t("language.uk")} />
                    </ListItemButton>
                  </ListItem>

                  {isAuthenticated && (
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("auth.logout")} />
                      </ListItemButton>
                    </ListItem>
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
              {currentTheme === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              onClick={handleLanguageMenuOpen}
              sx={{ ml: 1 }}
            >
              <LanguageIcon />
            </IconButton>
            <Menu
              anchorEl={languageMenuAnchor}
              open={Boolean(languageMenuAnchor)}
              onClose={handleLanguageMenuClose}
            >
              <MenuItem
                onClick={() => handleLanguageChange("en")}
                selected={currentLanguage === "en"}
              >
                {t("language.en")}
              </MenuItem>
              <MenuItem
                onClick={() => handleLanguageChange("uk")}
                selected={currentLanguage === "uk"}
              >
                {t("language.uk")}
              </MenuItem>
            </Menu>

            {isAuthenticated && (
              <Button color="inherit" onClick={logout} sx={{ ml: 1 }}>
                {t("auth.logout")}
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
