import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';

export default function Logo() {

  return (
    <AppBar position="static" sx={{ background: "#5a189a" }} >
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recruit Mate
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "end", marginRight: "20px" }}>
              Abhinav
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