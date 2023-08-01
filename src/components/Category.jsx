import React from 'react'

const Category = () => {
    const Dummy = [

        {
          id: 1,
          name: 'T-Shirt',
          img: 'https://www.byrdie.com/thmb/1mtEzOLSXxFH4AQygcf4W-ZXcL0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greenjumpsuit-c700f1b32e5c4bd3ad561339dc9a25f2.jpg',
          price: 80,
          discount: 20,
        },
        {
          id: 1,
          name: 'T-Shirt',
          img: 'https://www.byrdie.com/thmb/1mtEzOLSXxFH4AQygcf4W-ZXcL0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greenjumpsuit-c700f1b32e5c4bd3ad561339dc9a25f2.jpg',
          price: 80,
          discount: 20,
        },
        {
          id: 1,
          name: 'T-Shirt',
          img: 'https://toyszoom.net/cdn/shop/products/Girls-Wedding-Dress-Kids-Princess-Dress-Little-Girl-Ball-Gown-Clothes-Baby-Floor-Satin-Dresses-Age_large.jpg?v=1537720572',
          price: 80,
          discount: 20,
        },
        {
          id: 1,
          name: 'T-Shirt',
          img: 'https://www.byrdie.com/thmb/1mtEzOLSXxFH4AQygcf4W-ZXcL0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greenjumpsuit-c700f1b32e5c4bd3ad561339dc9a25f2.jpg',
          price: 80,
          discount: 20,
        },
        {
          id: 1,
          name: 'T-Shirt',
          img: 'https://www.byrdie.com/thmb/1mtEzOLSXxFH4AQygcf4W-ZXcL0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greenjumpsuit-c700f1b32e5c4bd3ad561339dc9a25f2.jpg',
          price: 80,
          discount: 20,
        },
        
       
      ];
      
  return (
    <>
     <Heading as="h1" size="xl" mb={8} >
        We Provide the Best Experience
      </Heading>
    <Flex justify="center" align="center" direction="row" flexWrap="wrap" gap={8} >
              {Dummy.map((item) => (
                <Box
                  key={item.id}
                  borderRadius="lg"
                  bg="white"
                  width="250px"
                  height="375px"
                  cursor="pointer"
                  boxShadow="2xl"
                  position="relative"
                  transition="transform 0.2s ease-in-out"
                  _hover={{ transform: 'scale(1.05)' }}
                >
                  <Box
                    width="250px"
                    height="250px"
                    overflow="hidden"
                    position="relative"
                    mb={4}
                  >
                    <Image
                      src={item.img}
                      width="250px"
                      height="250px"
                      objectFit="center"
                    />
                    <Box
                      position="absolute"
                      top={2}
                      right={2}
                      bg="white"
                      p={1}
                      borderRadius="10px"
                      color="#0077B5"
                    >
                      <ShoppingCart />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Flex>
    
    </>
  )
}

export default Category