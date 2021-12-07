/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ReactElement, useState } from 'react';

interface TabPanelProps {
  children?: ReactElement;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{ height: 'calc( 100% - 48px )' }}
      {...other}
    >
      {children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function BasicTabs({ children }: { children: ReactElement[] }) {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Doubles" {...a11yProps(0)} />
          <Tab label="All" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {children[0]}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {children[1]}
      </TabPanel>
    </Box>
  );
}
