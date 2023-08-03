import React, { useState } from 'react';
import { Flex, Box, Heading, Button, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import Dashboard from './Dashboard';
function AdminSettings() {
  const [settings, setSettings] = useState({
    enableNotifications: true,
    enableEmails: false,
  });

  const handleSave = () => {
  };

  return (<>
    <Dashboard />
    <Flex direction="column" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Settings
      </Heading>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
        <Box p="6">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="enableNotifications" mb="0">
              Enable Notifications
            </FormLabel>
            <Switch id="enableNotifications" isChecked={settings.enableNotifications} onChange={(event) => setSettings({ ...settings, enableNotifications: event.target.checked })} />
          </FormControl>
          <FormControl display="flex" alignItems="center" mt={4}>
            <FormLabel htmlFor="enableEmails" mb="0">
              Enable Emails
            </FormLabel>
            <Switch id="enableEmails" isChecked={settings.enableEmails} onChange={(event) => setSettings({ ...settings, enableEmails: event.target.checked })} />
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={4} onClick={handleSave}>
            Save Settings
          </Button>
        </Box>
      </Box>
    </Flex>
    </>
  );
}

export default AdminSettings;