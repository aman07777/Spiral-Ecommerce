import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

import { BiChevronDown } from "react-icons/bi";
import { city } from "./CityData";

const API_BASE_URL = "https://www.nepallocation.com.np/api/v1";
const API_HEADERS = {
  Authorization: "Bearer tRgafsI-tIaVf-CvHJFtJjxN",
  "Content-Type": "application/json",
};
const AddressForm = ({ props }) => {
  const [provienceList, setProvienceList] = useState([]);
  const [selectedProvience, setSelectedProvience] = useState({});
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [areaList, setAreaList] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [openStates, setOpenStates] = useState({
    div1: false,
    div2: false,
    div3: false,
  });

  const fetchLocationData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/province/list`, {
        headers: API_HEADERS,
      });
      return response.data.data.data;
    } catch (error) {
      console.error("Error fetching location data:", error);
      throw error;
    }
  }, []);

  const fetchCitiesData = useCallback(async () => {
    if (!selectedProvience.id) return [];

    try {
      const response = await axios.get(
        `${API_BASE_URL}/province/${selectedProvience.id}/cities`,
        {
          headers: API_HEADERS,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching cities data:", error);
      throw error;
    }
  }, [selectedProvience]);

  useEffect(() => {
    fetchLocationData()
      .then((data) => {
        setProvienceList(data);
      })
      .catch((error) => {
        throw error;
      });
  }, [fetchLocationData]);

  useEffect(() => {
    fetchCitiesData()
      .then((data) => {
        const filteredCity = city?.filter((item) => {
          return data?.some((cityItem) => cityItem.name === item.name);
        });
        setCityList(filteredCity);
        const filteredArea = filteredCity?.filter(
          (item) => item.name === selectedCity
        );
        if (filteredArea[0]) {
          setAreaList(filteredArea[0].area);
        } else {
          setAreaList([]);
        }
      })
      .catch((error) => {
        throw error;
      });
  }, [selectedProvience, selectedCity, fetchCitiesData]);

  const toggleOpen = (divName) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [divName]: !prevState[divName],
    }));
  };

  return (
    <>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[30rem] md:h-[28rem]  pb-5">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
          <span className="font-bold w-[80%] md:w-full">
            Add your delivery and billing address
          </span>
          <i className="float-right p-1 ml-auto" onClick={() => props(false)}>
            <AiOutlineClose
              size={30}
              className="block text-red-900 cursor-pointer"
            />
          </i>
        </div>
        {/* body  */}
        {/*body*/}
        <div className="relative flex-auto p-6 space-y-3 overflow-y-scroll break-words">
          {/* User personal detail Section */}
          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2">
            <div className="flex flex-col gap-y-2">
              <span className="font-semibold">Full Name</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="py-2 pl-3 border border-gray-400 rounded-md w-72"
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-semibold">Phone Number</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="py-2 pl-3 border border-gray-400 rounded-md w-72 "
                />
              </div>
            </div>
            <div className="relative flex flex-col gap-y-2">
              <span className="font-semibold">Provience</span>
              <div className="font-medium w-72 ">
                <div
                  onClick={() => toggleOpen("div1")}
                  className={` w-full p-2 flex items-center justify-between rounded border border-b-gray-500`}
                >
                  <span>
                    {selectedProvience.name
                      ? selectedProvience.name
                      : "Choose your provience"}
                  </span>
                  <BiChevronDown
                    size={20}
                    className={`${openStates.div1 && "rotate-180"}`}
                  />
                </div>
                <ul
                  className={`bg-white mt-2 overflow-y-auto z-50 ${
                    openStates.div1 ? "max-h-60" : "max-h-0"
                  } `}
                >
                  {provienceList?.map((item) => (
                    <li
                      key={item?.name}
                      className={`p-2 text-sm  hover:text-blue-500 cursor-pointer text-white"}`}
                      onClick={() => {
                        setSelectedProvience({
                          id: item?.province_id,
                          name: item?.name,
                        });
                        toggleOpen("div1");
                      }}
                    >
                      {item?.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-semibold">City</span>
              <div className="font-medium w-72 ">
                <div
                  onClick={() => toggleOpen("div2")}
                  className={` w-full p-2 flex items-center justify-between rounded border border-b-gray-500`}
                >
                  <span>
                    {selectedCity ? selectedCity : "Choose your city"}
                  </span>
                  <BiChevronDown
                    size={20}
                    className={`${openStates.div2 && "rotate-180"}`}
                  />
                </div>
                <ul
                  className={`bg-white mt-2 overflow-y-auto ${
                    openStates.div2 ? "max-h-60" : "max-h-0"
                  } `}
                >
                  {cityList?.map((item) => (
                    <li
                      key={item?.name}
                      className={`p-2 text-sm  hover:text-blue-500 cursor-pointer text-white"}`}
                      onClick={() => {
                        setSelectedCity(item?.name);
                        toggleOpen("div2");
                      }}
                    >
                      {item?.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-semibold">Area</span>
              <div className="font-medium w-72 ">
                <div
                  onClick={() => toggleOpen("div3")}
                  className={` w-full p-2 flex items-center justify-between rounded border border-b-gray-500`}
                >
                  <span>
                    {selectedArea ? selectedArea : "Choose your Area"}
                  </span>
                  <BiChevronDown
                    size={20}
                    className={`${openStates.div3 && "rotate-180"}`}
                  />
                </div>
                <ul
                  className={`bg-white mt-2 overflow-y-auto ${
                    openStates.div3 ? "max-h-60" : "max-h-0"
                  } `}
                >
                  {areaList?.map((item) => (
                    <li
                      key={item?.name}
                      className={`p-2 text-sm  hover:text-blue-500 cursor-pointer text-white"}`}
                      onClick={() => {
                        setSelectedArea(item?.name);
                        toggleOpen("div3");
                      }}
                    >
                      {item?.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              {/* it can't be empty  */}
              <span className="font-semibold">Your delivery full address</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter your delivery full Address"
                  className="py-2 pl-3 border border-gray-400 rounded-md w-72 "
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <span className="mt-4 px-8 py-2 text-sm font-semibold tracking-wide rounded-md bg-[#008080] text-white cursor-pointer">
              Save
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
