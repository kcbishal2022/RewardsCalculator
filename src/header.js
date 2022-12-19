import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

export default function Header() {
  const styles = {
    customizeToolbar: {
      minHeight: 36
    }
  };
       return (
          <AppBar><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Rewards Calculator
        </Typography></AppBar>

      );
    };
                       
   
