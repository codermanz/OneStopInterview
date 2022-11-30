import { React, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from '../components/Sidebar-forum';
import PostContent from '../components/Post-content';

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
  },
};

const drawerWidth = 250;

export default function PostList() {

  return (
    <ThemeProvider theme={theme}>
      <Navigator
        PaperProps={{ style: { width: drawerWidth, top: '75px' } }}
        sx={{ display: { sm: 'block',  } }} />
      <Box 
        sx={{ display: 'flex', flexFlow: 'column', alignItems: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
          <Box sx={{ flex: 1, justifyContent: "center", flexDirection: 'column', marginTop: '30px' }}>
            <div style={{ marginLeft: drawerWidth }}>
              <PostContent/>
            </div>
          </Box>
      </Box>
    </ThemeProvider>
  );
}