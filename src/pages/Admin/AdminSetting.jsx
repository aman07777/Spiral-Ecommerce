import React, { useState } from "react";
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Breadcrumb,
  BreadcrumbItem,
  useToast,
} from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import { NavLink } from "react-router-dom";
import { handleToast } from "../../global/toast";
function AdminSettings() {
  const [settings, setSettings] = useState({
    enableNotifications: true,
    enableEmails: false,
  });

  const handleSave = () => {};
  const toast = useToast();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.replace("/");
    handleToast(
      toast,
      "Logout Successful",
      "You have been logged out successfully.",
      "success"
    );
  };
  return (
    <>
      <Dashboard />
      <Breadcrumb
        spacing="5px"
        className="text-[.9rem] mt-5 font-semibold text-[#585858] px-4 @[767px]:px-0"
      >
        <BreadcrumbItem>
          <NavLink
            to="/adminHome"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
          >
            Home
          </NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <NavLink to="#">Products</NavLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex direction="column" className="text-[#585858] px-4">
        <h1 className="mb-4 text-[1.3rem] font-semibold ">Settings</h1>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
          <Box p="6">
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="enableNotifications" mb="0">
                Enable Notifications
              </FormLabel>
              <Switch
                id="enableNotifications"
                isChecked={settings.enableNotifications}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    enableNotifications: event.target.checked,
                  })
                }
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" mt={4}>
              <FormLabel htmlFor="enableEmails" mb="0">
                Enable Emails
              </FormLabel>
              <Switch
                id="enableEmails"
                isChecked={settings.enableEmails}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    enableEmails: event.target.checked,
                  })
                }
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              mt={4}
              onClick={handleSave}
            >
              Save Settings
            </Button>
          </Box>
        </Box>
      </Flex>
      <Button
        type="submit"
        colorScheme="blue"
        mt={4}
        className="mx-4"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
}

export default AdminSettings;
