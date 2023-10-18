import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import { city } from './CityData';
import { BiChevronDown } from "react-icons/bi";
import { addressBookStore } from '../helper/AddressBookStore';
import { useToast } from '@chakra-ui/react';

const EditAddressForm = ({ props, id, fetchAddressDetails }) => {
  const toast = useToast()
  const [provienceList, setProvienceList] = useState([])
  const [selectedProvience, setSelectedProvience] = useState({});
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [areaList, setAreaList] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [full_address, setFull_address] = useState("");
  const [openStates, setOpenStates] = useState({ div1: false, div2: false, div3: false });
  const fetchSingleAddressBook = addressBookStore((state) => state.getSingleAddressBook);
  const updateAddressBook = addressBookStore((state) => state.updateAddressBook);
  // const fetchAllAddress = addressBookStore((state) => state.getAllAddress);


  const API_BASE_URL = 'https://www.nepallocation.com.np/api/v1';
  const API_HEADERS = {
    Authorization: 'Bearer tRgafsI-tIaVf-CvHJFtJjxN',
    'Content-Type': 'application/json',
  };


  async function fetchLocationData() {
    try {
      const response = await axios.get(`${API_BASE_URL}/province/list`, {
        headers: API_HEADERS,
      });
      return response.data.data.data;
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  }

  async function fetchCitiesData() {
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
      console.error('Error fetching cities data:', error);
      throw error;
    }
  }

  useEffect(() => {
    fetchLocationData()
      .then((data) => {
        setProvienceList(data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);


  useEffect(() => {
    fetchCitiesData()
      .then((data) => {
        const filteredCity = city?.filter((item) => {
          return data?.some((cityItem) => cityItem.name === item.name);
        });
        setCityList(filteredCity);
        const filteredArea = filteredCity?.filter((item) => item.name === selectedCity);
        if (filteredArea[0]) {
          setAreaList(filteredArea[0].area)
        } else {
          setAreaList([])
        }
      })
      .catch((error) => {
        throw error;
      });
  }, [selectedProvience, selectedCity]);

  const toggleOpen = (divName) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [divName]: !prevState[divName],
    }));
  };

  // if all fields are non-empty
  const areAllFieldsFilled = () => {
    return (
      selectedArea.trim() !== "" &&
      selectedCity.trim() !== "" &&
      selectedProvience

    );
  };

  //submit button 
  function updateFunction() {
    try {
      const data = {
        province_id: selectedProvience.id,
        province: selectedProvience.name,
        city: selectedCity,
        area: selectedArea,
        fullAddress: full_address
      }

      updateAddressBook(id, data).then((message) => {
        toast({
          title: "Success",
          description: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchAddressDetails()
      })
      props(false)
    } catch (error) {

    }

  }


  // button -> edit function
  function submitEdithandler() {
    if (areAllFieldsFilled()) {
      updateFunction();
    } else {
      toast({
        title: "Error",
        description: "Fields can't be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  // fetch single address book 
  useEffect(() => {
    if (id) {
      fetchSingleAddressBook(id).then((data) => {
        setSelectedArea(data?.area)
        setSelectedCity(data?.city)
        setSelectedProvience({
          id: data?.province_id, name: data?.province,
        })
        setFull_address(data?.fullAddress);
      })
    }
  }, [fetchSingleAddressBook])




  return (
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[30rem] md:h-[28rem]  pb-5">
      {/*header*/}
      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
        <span className='font-bold w-[80%] md:w-full'>Edit your Address Book</span>
        <i className="p-1 ml-auto float-right" onClick={() => props(false)}>
          <AiOutlineClose
            size={30}
            className="text-red-900 block cursor-pointer"
          />
        </i>
      </div>
      {/* body  */}
      {/*body*/}
      <div className="relative px-6 flex-auto break-words space-y-3 overflow-y-scroll">
        {/* User personal detail Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        </div>
        <div className='relative flex flex-col gap-y-2'>
          <span className='font-semibold'>Provience *</span>
          <div className="w-72 font-medium ">
            <div
              onClick={() => toggleOpen('div1')}
              className={` w-full p-2 flex items-center justify-between rounded border border-b-gray-500`}
            >
              <span>{
                selectedProvience.name ? selectedProvience.name : "Choose your provience"
              }</span>
              <BiChevronDown size={20} className={`${openStates.div1 && "rotate-180"}`} />
            </div>
            <ul
              className={`bg-white mt-2 overflow-y-auto z-50 ${openStates.div1 ? "max-h-60" : "max-h-0"
                } `}
            >

              {provienceList?.map((item) => (
                <li
                  key={item?.name}
                  className={`p-2 text-sm  hover:text-blue-500 cursor-pointer text-white"}`}
                  onClick={() => {
                    setSelectedProvience({ id: item?.province_id, name: item?.name })
                    toggleOpen('div1')
                  }}
                >
                  {item?.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='relative select-none flex flex-col gap-y-2'>
          <span className='font-semibold'>City *</span>
          <div className="w-72 font-medium ">
            <div
              onClick={() => toggleOpen('div2')}
              className={` w-full p-2 flex items-center justify-between rounded border border-b-gray-500`}
            >
              <span>{
                selectedCity ? selectedCity : "Choose your city"
              }</span>
              <BiChevronDown size={20} className={`${openStates.div2 && "rotate-180"}`} />
            </div>
            <ul
              className={`bg-white mt-2 overflow-y-auto ${openStates.div2 ? "max-h-60" : "max-h-0"
                } `}
            >

              {cityList?.map((item) => (
                <li
                  key={item?.name}
                  className={`p-2 text-sm  hover:text-blue-500 cursor-pointer text-white"}`}
                  onClick={() => {
                    setSelectedCity(item?.name)
                    toggleOpen('div2')
                  }}
                >
                  {item?.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex flex-col gap-y-2'>
          <span className='font-semibold'>Area *</span>
          <div className="w-72 font-medium ">
            <div
              onClick={() => toggleOpen('div3')}
              className={` w-full p-2 flex items-center justify-between rounded border border-b-gray-500`}
            >
              <span>{
                selectedArea ? selectedArea : "Choose your Area"
              }</span>
              <BiChevronDown size={20} className={`${openStates.div3 && "rotate-180"}`} />
            </div>
            <ul
              className={`bg-white mt-2 overflow-y-auto ${openStates.div3 ? "max-h-60" : "max-h-0"
                } `}
            >

              {areaList?.map((item) => (
                <li
                  key={item?.name}
                  className={`p-2 text-sm  hover:text-blue-500 cursor-pointer text-white"}`}
                  onClick={() => {
                    setSelectedArea(item?.name)
                    toggleOpen('div3')
                  }}
                >
                  {item?.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex flex-col gap-y-3'>
          {/* it can't be empty  */}
          <span className='font-semibold'>Your delivery full address</span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter your delivery full Address"
              className="border border-gray-400 rounded-md pl-3 py-2 w-72 "
              required
              value={full_address}
              onChange={(e) => { setFull_address(e.target.value) }}
            />
          </div>
        </div>

      </div>
      <div className="w-full flex items-center justify-center">
        <span
          className="mt-4 px-8 py-2 text-sm font-semibold tracking-wide rounded-md bg-[#008080] text-white cursor-pointer"
          onClick={submitEdithandler}
        >
          Save
        </span>
      </div>
    </div>
  )
}

export default EditAddressForm