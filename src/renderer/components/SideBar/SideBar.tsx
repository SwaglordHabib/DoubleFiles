import { ListAlt, Search } from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { drawerWidth } from '../../App';

export const SideBar = (props: { setTab: (tab: string) => void }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {['File search'].map((text, index) => (
          <ListItem button key={text} onClick={() => props.setTab(text)}>
            <ListItemIcon>
              {index % 2 === 0 ? <Search /> : <ListAlt />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
