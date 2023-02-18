import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "rgb(59, 64, 67)" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              <Typography variant="h6" component="span">
                React Query
              </Typography>
            </Link>
            <Link to="/posts" style={{ textDecoration: "none", color: "#fff" }}>
              <Typography variant="h6" component="span">
                Post
              </Typography>
            </Link>
          </Box>
          {/* <ButtonLogin /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
