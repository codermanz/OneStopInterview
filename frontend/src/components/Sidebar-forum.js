import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';
import HelpIcon from '@mui/icons-material/Help';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const categories = [
  {
    id: 'MENU',
    children: [
      {
        id: 'View Posts',
        icon: <ListIcon />,
        active: true,
      },
      { id: 'Create Post', icon: <CreateIcon />, moveTo: '/forums/addpost/' },
    ],
  },
  {
    id: 'PERSONAL NAVIGATOR',
    children: [
      { id: 'My Questions', icon: <HelpIcon /> },
      { id: 'My Answers', icon: <QuestionAnswerIcon /> },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: '#FFFFFF',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};


export default function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, moveTo }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item} to={moveTo}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}