import { React, useState, useEffect } from 'react';
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

const categories = [
  {
    id: 'MENU',
    menus: [
      { cid: '1', text: 'View Posts', icon: <ListIcon />, moveTo: '/forums/posts/' },
      { cid: '2', text: 'Create Post', icon: <CreateIcon />, moveTo: '/forums/addpost/' },
    ],
  },
  {
    id: 'PERSONAL NAVIGATOR',
    menus: [
      { cid: '3', text: 'My Questions', icon: <HelpIcon />, moveTo: '/forums/myposts/'},
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
  "&$selected": {
    backgroundColor: "red",
  },
};


export default function Navigator(props) {
  const { ...other } = props;

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        {categories.map(({id, menus}) => (
          <Box sx={{ bgcolor: '#101F33' }}>
            <ListItem key={id} sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {menus.map(({ cid, text, icon, active, moveTo }) => (
              <ListItem disablePadding key={cid} 
                        selected={selectedIndex === {cid}} 
                        onClick={(event) => handleListItemClick(event, cid)}>
                <ListItemButton sx={item} to={moveTo} >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{text}</ListItemText>
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