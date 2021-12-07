import { Search } from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { drawerWidth } from '../../App';

const SideBarTabs = [{ name: 'File search', icon: <Search /> }];

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
        {SideBarTabs.map((tab, index) => (
          <ListItem
            button
            key={tab.name}
            onClick={() => props.setTab(tab.name)}
          >
            <ListItemIcon>{tab.icon}</ListItemIcon>
            <ListItemText primary={tab.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
