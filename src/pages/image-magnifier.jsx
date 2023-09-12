import React, { useState, useRef } from "react";
import { imageUrl } from "../global/config";

const ImageMagnifier = ({ image }) => {
  const [isMagnifierVisible, setMagnifierVisible] = useState(false);
  const [magnifiedPosition, setMagnifiedPosition] = useState({
    x: 0,
    y: 0,
  });

  // const containerRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    setMagnifierVisible(true);
  };

  const handleMouseLeave = () => {
    setMagnifierVisible(false);
  };

  const handleMouseMove = (e) => {
    const image = imageRef.current;
    // const container = containerRef.current;
    if (!image) return;

    const imageRect = image.getBoundingClientRect();
    const x = e.clientX - imageRect.left;
    const y = e.clientY - imageRect.top;
    setMagnifiedPosition({ x, y });
  };
  return (
    <>
      <div className="w-full">
        <div
          className="relative h-[550px] sm:h-[630px] md:h-[500px] lg:h-[500px] w-full lg:max-w-[600px]"
          //   className="relative overflow-hidden w-[500px] h-[600px]"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          // onMouseMove={handleMouseMove}
          // ref={containerRef}
        >
          <img
            ref={imageRef}
            src={
              `${imageUrl}/${image ?? image}`
              // "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
              //   "https://www.topgear.com/sites/default/files/2023/03/TG%20LAMBO230309_0013.jpg"
            }
            alt=""
            className="object-cover w-full h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          />
        </div>
        {isMagnifierVisible && (
          <div
            className={`absolute w-[500px] h-[500px] border border-[#ccc] ${
              isMagnifierVisible ? "block" : "hidden"
            }`}
            style={{
              //   background: `url(https://www.topgear.com/sites/default/files/2023/03/TG%20LAMBO230309_0013.jpg)`,
              // background: `url(https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80)`,
              background: `url(${imageUrl}/${image ?? image})`,
              backgroundPosition: `-${magnifiedPosition.x * 2}px -${
                magnifiedPosition.y * 2
              }px`,
              backgroundRepeat: "no-repeat",
              objectFit: "cover",
              left: `${magnifiedPosition.x - 250}px`,
              top: `${magnifiedPosition.y - 250}px`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </>
  );
};

export default ImageMagnifier;
