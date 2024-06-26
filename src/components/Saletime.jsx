import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

const Saletime = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const saleEndTime = new Date("2023-08-02T12:59:59");
    const currentTime = new Date();
    const timeDifference = saleEndTime - currentTime;

    if (timeDifference <= 0) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    } else {
      const totalSeconds = Math.floor(timeDifference / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };
    }
  }

  return (
    <Box
      display={{ base: "flex" }}
      fontSize="lg"
      textAlign="center"
      className="items-center text-["
    >
      Sale Ends in:
      <Box
        mx={1}
        borderRadius="5px"
        backgroundColor="#008080"
        className="px-3 py-1"
      >
        <Text as="span" color="white">
          {timeLeft.hours}
        </Text>
      </Box>
      <Text as="span" color="gray.500" mx={1}>
        :
      </Text>
      <Box
        mx={1}
        borderRadius="5px"
        className="px-3 py-1"
        backgroundColor="#008080"
      >
        <Text as="span" color="white">
          {timeLeft.minutes}
        </Text>
      </Box>
      <Text as="span" color="gray.500" mx={1}>
        :
      </Text>
      <Box
        mx={1}
        borderRadius="5px"
        className="px-3 py-1"
        backgroundColor="#008080"
      >
        <Text as="span" color="white">
          {timeLeft.seconds}
        </Text>
      </Box>
    </Box>
  );
};

export default Saletime;
