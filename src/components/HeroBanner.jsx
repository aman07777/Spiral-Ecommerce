import { Box, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Autoplay } from "swiper/modules";
const images = [
  "https://icms-image.slatic.net/images/ims-web/6e743cde-460d-430a-b4e3-0e5b42361e0a.jpg_1200x1200.jpg",
  "https://icms-image.slatic.net/images/ims-web/acf2f203-656e-4501-8060-fa5f78b2df66.jpg",
  "https://icms-image.slatic.net/images/ims-web/77c49853-b80c-4f7a-906d-a32ab7937748.jpg",
];

function HeroBanner() {
  return (
    <div className="flex justify-center w-full text-[#585858]">
      <Box
        p={4}
        width={{ base: "100%", md: "95%", lg: "75%" }}
        className="@container"
      >
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[EffectFade, Autoplay]}
          className="w-full"
        >
          {images.map((imageUrl, index) => (
            <SwiperSlide className="w-full" key={index}>
              <Image
                src={imageUrl}
                alt={`Image ${index}`}
                width="100%"
                height={{ base: "300px", md: "500px" }}
                objectFit="cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </div>
  );
}

export default HeroBanner;
