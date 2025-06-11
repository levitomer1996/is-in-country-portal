import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "leaflet/dist/leaflet.css";
import CountryTable from "./Pages/CountryTable/CountryTable";
import LocationTestTool from "./Pages/LocationTestTool/LocationTestTool";
import Documentation from "./Pages/Documation/Documentation";

const drawerWidth = 240;

function Main() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Toolbar />
      <List>
        <ListItem
          button
          component={Link}
          to="/countries"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemText primary="Country Management" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/test-location"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemText primary="Location Testing Tool" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItemText primary="Documentation" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              isInCountry Portal
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile Drawer */}
          {isMobile && (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          )}

          {/* Desktop Drawer */}
          {!isMobile && (
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/countries" element={<CountryTable />} />
            <Route path="/test-location" element={<LocationTestTool />} />
            <Route path="/" element={<Documentation />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default Main;
