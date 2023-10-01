import React from "react";
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";

const PriceRange = () => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState(5);
  return (
    <>
      <Box mb={4}>
        <h2 className="text-[1.2rem] font-semibold">Price Range</h2>
        <Slider
          aria-label="slider-ex-4"
          defaultValue={30}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onChange={(e) => setPriceRange(e)}
          min={500}
          max={50000}
          className="px-2"
        >
          <SliderMark
            value={1000}
            mt="1"
            ml="-2.5"
            fontSize="sm"
            className="font-mono"
          >
            1k
          </SliderMark>
          <SliderMark
            value={10000}
            mt="1"
            ml="-2.5"
            fontSize="sm"
            className="font-mono"
          >
            10k
          </SliderMark>
          <SliderMark
            value={30000}
            mt="1"
            ml="-2.5"
            fontSize="sm"
            className="font-mono"
          >
            30k
          </SliderMark>
          <SliderMark
            value={50000}
            mt="1"
            ml="-2.5"
            fontSize="sm"
            className="font-mono"
          >
            50k
          </SliderMark>
          <SliderTrack bg="rgb(0, 128, 128, .3)">
            <SliderFilledTrack bg="#008080" />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="#008080"
            placement="top"
            isOpen={showTooltip}
            label={`${priceRange}`}
          >
            <SliderThumb boxSize={5}>
              <Box color="#008080" />
            </SliderThumb>
          </Tooltip>
        </Slider>
      </Box>
    </>
  );
};

export default PriceRange;
