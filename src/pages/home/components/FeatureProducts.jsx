import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, useToast, Spinner } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import Saletime from "../../../components/Saletime";
import ProductCard from "../../../components/product-card";
import { getFeaturedProducts } from "../../../services/ProductServices";
import { handleToast } from "../../../global/toast";
import { useQuery } from "@tanstack/react-query";
import "./new-arrival-style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import UseGetInnerWidth from "../../Admin/hooks/get-inner-width";



const FeatureProducts = () => {
  const windowWIdth = UseGetInnerWidth();

  const toast = useToast(); // for toast message
  const navigate = useNavigate(); // for navigating to other routes
  // querying the backend for featured products
  const {
    data: products,
    error,
    isLoading,
    isError,
  } = useQuery(["get", "featured-products"], getFeaturedProducts);
  // handle error state -> if any error occurs, show toast message
  isError && handleToast(toast, "Error", error.message, "error");
  // if loading is false and products is an array and products length is greater than 0
  return !isLoading ? (
    !isError && Array.isArray(products) && products?.length > 0 && (
      // showing the featured products if there are any featured products
      <div className="flex justify-center w-full mb-5  text-[#585858]">
        <Box
          p={4}
          width={{ base: "100%", md: "95%", lg: "75%" }}
          className="@container"
        >
          {/* marquee for scrolling text */}
          <Marquee gradient>
            <p className="text-[2.5rem] md:text-[2.75rem] font-semibold mb-6 font-mono text-[#585858]/80 select-none">
              FLASH SALE! 50% OFF EVERYTHING
            </p>
          </Marquee>
          <div className="flex items-center flex-col md:flex-row gap-y-3 md:gap-y-0 md:justify-between w-full mb-5">
            <Text className="text-[#008080] font-semibold text-[1.5rem] font-mono">
              On Sale
            </Text>
            <Saletime />
            <div className=" hidden items-center justify-end w-[8em] md:flex">
              <button className="cta " onClick={() => navigate("/products")}>
                <span className="span">More</span>
                <span className="second">
                  <svg width="50px" height="20px" viewBox="0 0 66 43">
                    <g
                      id="arrow"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <path
                        className="one"
                        d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        className="two"
                        d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        className="three"
                        d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                    </g>
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <Swiper
            slidesPerView={
              windowWIdth < 300
                ? 1
                : windowWIdth > 301 && windowWIdth < 600
                  ? 2
                  : windowWIdth > 601 && windowWIdth < 900
                    ? 3
                    : 4
            }
            navigation={true}
            spaceBetween={20}
            modules={[Navigation]}
            className="h-[400px]"
          >
            {
              products?.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard data={product} key={product?.id} />
                </SwiperSlide>
              ))
            }
          </Swiper>
          {/* more items section for small screen */}
          <div className="flex justify-center w-full mt-1 md:hidden">
            <div className="flex items-center justify-end w-[8em]">
              <button className="cta " onClick={() => navigate("/products")}>
                <span className="span">More</span>
                <span className="second">
                  <svg width="50px" height="20px" viewBox="0 0 66 43">
                    <g
                      id="arrow"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <path
                        className="one"
                        d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        className="two"
                        d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        className="three"
                        d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                    </g>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </Box>
      </div>
    )
  ) : (
    // showing a spinner as loading state while querying the backend
    <div className="flex justify-center my-5">
      <Box
        width={{ base: "100%", md: "95%", lg: "75%" }}
        className="flex justify-center"
      >
        <Spinner />
      </Box>
    </div>
  );
};

export default FeatureProducts;
