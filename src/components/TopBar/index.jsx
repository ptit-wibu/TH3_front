import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import models from "../../modelData/models";
import { useLocation } from "react-router-dom";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 *
function TopBar() {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          This is the TopBar component
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
**/
function TopBar() {
  const location = useLocation();
  const leftName = "Lê Ngọc Đức";
  let rightText = "PhotoApp"; //default

  try {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] === "users" && parts[1]) {
      const user = models.userModel(parts[1]);
      if (user) rightText = `${user.first_name} ${user.last_name}`;
    } else if (parts[0] === "photos" && parts[1]) {
      const user = models.userModel(parts[1]);
      if (user) rightText = `Photos of ${user.first_name} ${user.last_name}`;
    } else if (parts[0] === "users") {
      rightText = "Users";
    }
  } catch (e) {}

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="topbar-toolBar">
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" color="inherit">
            {leftName}
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="inherit">
          {rightText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
