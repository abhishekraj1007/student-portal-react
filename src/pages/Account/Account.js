import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { MyProfile } from './components';
import { Card } from '@mui/material';

export default function Account() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log("event", event);
    console.log("newValue", newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Card>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="My Profile" value="1" />
              {/* <Tab label="Change Password" value="2" /> */}
            </TabList>
          </Box>
          <TabPanel value="1"><MyProfile /></TabPanel>
          {/* <TabPanel value="2">
            <ChangePassword />
          </TabPanel> */}
        </TabContext>
      </Card>
    </Box>
  );
}