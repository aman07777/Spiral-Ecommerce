import { Box } from '@chakra-ui/react'
import React from 'react'
import { FormControl, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { Search } from '@mui/icons-material'
const Searchbar = () => {
  return (
    <>
   
   <Box display='flex' alignItems='center' justifyContent={{ base: 'center' }} py={{ base: 3, sm: 0 }} >
            <FormControl as='form' width={{ base: '100%', sm: '20vw', md: '30vw' }} minWidth="200px" >
                <InputGroup size='md'>
                    <Input
                        name='search'
                        pr='4.5rem'
                         placeholder='Search for clothes...'
                       
                    />
                    <InputRightElement width='4rem'>
                        <Button h='1.75rem' size='sm' variant='solid' colorScheme='linkedin'  >
                            <Search />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </Box>
    
    
    </>
  )
}

export default Searchbar