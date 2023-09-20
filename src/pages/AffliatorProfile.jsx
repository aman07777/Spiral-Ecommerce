import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CakeIcon from "@mui/icons-material/Cake";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useState } from "react";

const AffliatorProfile = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [birthday, setBirthday] = useState("1990-01-01");
  const [password, setPassword] = useState("");
  const [bonus, setBonus] = useState(100);
  const [image, setImage] = useState("");

  const handlePasswordChange = () => {
    // TODO: Implement password change logic
  };

  const handleImageUpload = () => {
    // TODO: Implement image upload logic
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
  };

  const handleEditProfile = () => {
    // TODO: Implement edit profile logic
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" w="50%">
      <Flex alignItems="center" bg="gray.50" p={4}>
        <Avatar size="lg" name={`${firstName} ${lastName}`} src={image} />
        <Box ml={4}>
          <Text fontWeight="bold">{`${firstName} ${lastName}`}</Text>
          <Text fontSize="sm">{email}</Text>
          <Text fontSize="sm">{`Bonus: ${bonus}`}</Text>
        </Box>
        <Box ml="auto">
          <IconButton
            aria-label="Edit Profile"
            icon={<EditIcon />}
            onClick={handleEditProfile}
          />
        </Box>
      </Flex>
      <Flex>
        <Box w="25%" bg="gray.50" p={4}>
          <Heading size="md" mb={4}>
            My Account
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={ShoppingCartIcon} />
              <Text>My Orders</Text>
            </ListItem>
            <ListItem>
              <ListIcon as={ShoppingCartIcon} />
              <Text>My Cart</Text>
            </ListItem>
            <ListItem>
              <ListIcon as={ExitToAppIcon} />
              <Text onClick={handleLogout}>Log Out</Text>
            </ListItem>
            <ListItem>
              <ListIcon as={CakeIcon} />
              <Text>My Profile</Text>
            </ListItem>
          </List>
        </Box>
        <Box w="75%" p={4}>
          <Heading size="md" mb={4}>
            My Profile
          </Heading>
          <Stack spacing={4}>
            <Flex>
              <Box w="30%">
                <Text fontWeight="bold">First Name:</Text>
              </Box>
              <Box w="70%">
                <Text>{firstName}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box w="30%">
                <Text fontWeight="bold">Last Name:</Text>
              </Box>
              <Box w="70%">
                <Text>{lastName}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box w="30%">
                <Text fontWeight="bold">Email:</Text>
              </Box>
              <Box w="70%">
                <Text>{email}</Text>
              </Box>
            </Flex>
            <Flex>
              <Box w="30%">
                <Text fontWeight="bold">Birthday:</Text>
              </Box>
              <Box w="70%">
                <Flex alignItems="center">
                  <CakeIcon size={20} />
                  <Text ml={2}>{birthday}</Text>
                </Flex>
              </Box>
            </Flex>
            <Flex>
              <Box w="30%">
                <Text fontWeight="bold">Password:</Text>
              </Box>
              <Box w="70%">
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    isReadOnly
                    onChange={(e) => setPassword(e.target.value)}
                    mr={2}
                  />
                  <IconButton
                    aria-label="Change Password"
                    icon={<LockIcon />}
                    onClick={handlePasswordChange}
                    variant="outline"
                    isDisabled
                  />
                </FormControl>
                <FormHelperText>
                  Leave blank to keep the same password
                </FormHelperText>
              </Box>
            </Flex>
            <Flex>
              <Box w="30%">
                <Text fontWeight="bold">Collected Bonus:</Text>
              </Box>
              <Box w="70%">
                <FormControl>
                  <FormLabel>Bonus</FormLabel>
                  <Input
                    type="number"
                    value={bonus}
                    isReadOnly
                    onChange={(e) => setBonus(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Flex>
            <Flex>
              <Box w="30%">
                <Text fontWeight="bold">Profile Image:</Text>
              </Box>
              <Box w="70%">
                <Flex alignItems="center">
                  <Avatar
                    size="xl"
                    name={`${firstName} ${lastName}`}
                    src={image}
                    mr={4}
                  />
                  <IconButton
                    aria-label="Upload Image"
                    icon={<AddAPhotoIcon />}
                    onClick={handleImageUpload}
                    variant="outline"
                    isDisabled
                  />
                </Flex>
              </Box>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default AffliatorProfile;
