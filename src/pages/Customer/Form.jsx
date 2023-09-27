<Stack spacing={4}>
<FormControl id="firstName">
  <FormLabel>First Name</FormLabel>
  <Input
    type="text"
    value={firstName}
    isReadOnly
    onChange={(e) => setFirstName(e.target.value)}
  />
</FormControl>
<FormControl id="lastName">
  <FormLabel>Last Name</FormLabel>
  <Input
    type="text"
    value={lastName}
    isReadOnly
    onChange={(e) => setLastName(e.target.value)}
  />
</FormControl>
<FormControl id="email">
  <FormLabel>Email</FormLabel>
  <Input
    type="email"
    value={email}
    isReadOnly
    onChange={(e) => setEmail(e.target.value)}
  />
</FormControl>
<FormControl id="birthday">
  <FormLabel>Birthday</FormLabel>
  <Flex alignItems="center">
    <CakeIcon size={20} />
    <Input
      type="date"
      value={birthday}
      isReadOnly
      onChange={(e) => setBirthday(e.target.value)}
      ml={2}
    />
  </Flex>
</FormControl>
<FormControl id="password">
  <FormLabel>Password</FormLabel>
  <Flex alignItems="center">
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
  </Flex>
  <FormHelperText>
    Leave blank to keep the same password
  </FormHelperText>
</FormControl>
<FormControl id="bonus">
  <FormLabel>Collected Bonus</FormLabel>
  <Input
    type="number"
    value={bonus}
    isReadOnly
    onChange={(e) => setBonus(e.target.value)}
  />
</FormControl>
<FormControl id="image">
  <FormLabel>Profile Image</FormLabel>
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
</FormControl>
</Stack>