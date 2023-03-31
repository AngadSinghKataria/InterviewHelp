import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import LOGO from '../Images/logo.jpg'
import { useLocation, useNavigate } from 'react-router-dom';


export default function Logo() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ background: "#5a189a" }} >
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <img src={LOGO} onClick={() => navigate("/")} width={"auto"} height={"50px"} style={{
            margin: "10px",
            cursor: "pointer",
            boxSizing: "border-box"
          }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "end", marginRight: "20px" }}>
              {
                pathname == "/recruiter" ? "Ananya" : pathname == "/" ? "" : "Hetvi"
              }
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}