// import LockIcon from "@mui/icons-material/Lock";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import CakeIcon from "@mui/icons-material/Cake";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Stats from "./components/stats";
import UserDetails from "./components/user-details/user-details";
import PromoCodTable from "./components/promo-code/promo-code-table";
import PromoCodeUserTable from "./components/promo-code-user-table";
const AffliatorProfile = () => {
  return (
    <>
      <div className="@container w-full">
        <div className="flex flex-col @[650px]:flex-row-reverse">
          {/* profile section -> user details like name, address, contact */}
          <UserDetails />
          {/* stats section -> gives a summary of the sales income of the affiliator => card are made to represent this  */}
          <Stats />
        </div>
        {/* promo codes section -> promo codes are presented in table */}
        <div className="w-full px-4 @[1000px]:px-8 mt-5 grid @[1000px]:grid-cols-2 gap-3 text-[#585858] ">
          {/* promo code table -> displays a table of the promo codes of the affiliator */}
          {/* adding a promo code is also handled in this file */}
          <PromoCodTable />
          {/* users table -> a table for listing user, who uses the promo codes of the affiliator */}
          <PromoCodeUserTable />
        </div>
      </div>
    </>
  );
};

export default AffliatorProfile;

// <Box borderWidth="1px" borderRadius="lg" overflow="hidden" w="50%">
//   <Flex alignItems="center" bg="gray.50" p={4}>
//     <Avatar size="lg" name={`${firstName} ${lastName}`} src={image} />
//     <Box ml={4}>
//       <Text fontWeight="bold">{`${firstName} ${lastName}`}</Text>
//       <Text fontSize="sm">{email}</Text>
//       <Text fontSize="sm">{`Bonus: ${bonus}`}</Text>
//     </Box>
//     <Box ml="auto">
//       <IconButton
//         aria-label="Edit Profile"
//         icon={<EditIcon />}
//         onClick={handleEditProfile}
//       />
//     </Box>
//   </Flex>
//   <Flex>
//     <Box w="25%" bg="gray.50" p={4}>
//       <Heading size="md" mb={4}>
//         My Account
//       </Heading>
//       <List spacing={3}>
//         <ListItem>
//           <ListIcon as={ShoppingCartIcon} />
//           <Text>My Orders</Text>
//         </ListItem>
//         <ListItem>
//           <ListIcon as={ShoppingCartIcon} />
//           <Text>My Cart</Text>
//         </ListItem>
//         <ListItem>
//           <ListIcon as={ExitToAppIcon} />
//           <Text onClick={handleLogout}>Log Out</Text>
//         </ListItem>
//         <ListItem>
//           <ListIcon as={CakeIcon} />
//           <Text>My Profile</Text>
//         </ListItem>
//       </List>
//     </Box>
//     <Box w="75%" p={4}>
//       <Heading size="md" mb={4}>
//         My Profile
//       </Heading>
//       <Stack spacing={4}>
//         <Flex>
//           <Box w="30%">
//             <Text fontWeight="bold">First Name:</Text>
//           </Box>
//           <Box w="70%">
//             <Text>{firstName}</Text>
//           </Box>
//         </Flex>
//         <Flex>
//           <Box w="30%">
//             <Text fontWeight="bold">Last Name:</Text>
//           </Box>
//           <Box w="70%">
//             <Text>{lastName}</Text>
//           </Box>
//         </Flex>
//         <Flex>
//           <Box w="30%">
//             <Text fontWeight="bold">Email:</Text>
//           </Box>
//           <Box w="70%">
//             <Text>{email}</Text>
//           </Box>
//         </Flex>
//         <Flex>
//           <Box w="30%">
//             <Text fontWeight="bold">Birthday:</Text>
//           </Box>
//           <Box w="70%">
//             <Flex alignItems="center">
//               <CakeIcon size={20} />
//               <Text ml={2}>{birthday}</Text>
//             </Flex>
//           </Box>
//         </Flex>
//         {/* <form
//         // onSubmit={handleSubmit}
//         >
//           <Flex>
//             <Box w="30%">
//               <Text fontWeight="bold">Password:</Text>
//             </Box>
//             <Box w="70%">
//               <FormControl>
//                 <FormLabel>Password</FormLabel>
//                 <Input
//                   type="password"
//                   value={password}
//                   // isReadOnly
//                   // onChange={(e) => setPassword(e.target.value)}
//                   mr={2}
//                 />
//                 <IconButton
//                   aria-label="Change Password"
//                   icon={<LockIcon />}
//                   onClick={handlePasswordChange}
//                   variant="outline"
//                   isDisabled
//                 />
//               </FormControl>
//               <FormHelperText>
//                 Leave blank to keep the same password
//               </FormHelperText>
//             </Box>
//           </Flex>
//           <Flex>
//             <Box w="30%">
//               <Text fontWeight="bold">Collected Bonus:</Text>
//             </Box>
//             <Box w="70%">
//               <FormControl>
//                 <FormLabel>Bonus</FormLabel>
//                 <Input
//                   type="number"
//                   value={bonus}
//                   // isReadOnly
//                   // onChange={(e) => setBonus(e.target.value)}
//                 />
//               </FormControl>
//             </Box>
//           </Flex>
//           <Flex>
//             <Box w="30%">
//               <Text fontWeight="bold">Profile Image:</Text>
//             </Box>
//             <Box w="70%">
//               <Flex alignItems="center">
//                 <Avatar
//                   size="xl"
//                   name={`${firstName} ${lastName}`}
//                   src={image}
//                   mr={4}
//                 />
//                 <IconButton
//                   aria-label="Upload Image"
//                   icon={<AddAPhotoIcon />}
//                   onClick={handleImageUpload}
//                   variant="outline"
//                   isDisabled
//                 />
//               </Flex>
//             </Box>
//           </Flex>
//         </form> */}
//         <Box w={{ base: "100%", md: "75%" }} p={4}>
//           <Heading size="md" mb={4}>
//             My Profile
//           </Heading>

//           <Stack spacing={4}>
//             <FormControl id="firstName">
//               <FormLabel>First Name</FormLabel>
//               <Input
//                 type="text"
//                 value={firstName}
//                 isReadOnly
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//             </FormControl>
//             <FormControl id="lastName">
//               <FormLabel>Last Name</FormLabel>
//               <Input
//                 type="text"
//                 value={lastName}
//                 isReadOnly
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//             </FormControl>
//             <FormControl id="email">
//               <FormLabel>Email</FormLabel>
//               <Input
//                 type="email"
//                 value={email}
//                 isReadOnly
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </FormControl>
//             <FormControl id="password">
//               <FormLabel>Password</FormLabel>
//               <Flex alignItems="center">
//                 <Input
//                   type="password"
//                   value={password}
//                   isReadOnly
//                   onChange={(e) => setPassword(e.target.value)}
//                   mr={2}
//                 />
//                 <IconButton
//                   aria-label="Change Password"
//                   icon={<LockIcon />}
//                   onClick={handlePasswordChange}
//                   variant="outline"
//                   isDisabled
//                 />
//               </Flex>
//               <FormHelperText>
//                 Leave blank to keep the same password
//               </FormHelperText>
//             </FormControl>
//             <FormControl id="birthday">
//               <FormLabel>Birthday</FormLabel>
//               <Flex alignItems="center">
//                 <CakeIcon size={20} />
//                 <Input
//                   type="date"
//                   value={birthday}
//                   isReadOnly
//                   onChange={(e) => setBirthday(e.target.value)}
//                   ml={2}
//                 />
//               </Flex>
//             </FormControl>

//             <FormControl id="bonus">
//               <FormLabel>Collected Bonus</FormLabel>
//               <Input
//                 type="number"
//                 value={bonus}
//                 isReadOnly
//                 onChange={(e) => setBonus(e.target.value)}
//               />
//             </FormControl>
//             <FormControl id="image">
//               <FormLabel>Profile Image</FormLabel>
//               <Flex alignItems="center">
//                 <Avatar
//                   size="xl"
//                   name={`${firstName} ${lastName}`}
//                   src={image}
//                   mr={4}
//                 />
//                 <IconButton
//                   aria-label="Upload Image"
//                   icon={<AddAPhotoIcon />}
//                   onClick={handleImageUpload}
//                   variant="outline"
//                   isDisabled
//                 />
//               </Flex>
//             </FormControl>
//           </Stack>
//         </Box>
//       </Stack>
//     </Box>
//   </Flex>
// </Box>;
