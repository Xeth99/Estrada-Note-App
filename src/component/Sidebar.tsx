import React, { useState } from "react";
import Logo from "../assets/img/estrada.png";
import { IoIosAdd } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { IoArchive } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { PiCopyrightThin } from "react-icons/pi";
import { HiOutlineX } from "react-icons/hi";
import { HiOutlineMenu } from "react-icons/hi";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative">
      <button
        className="lg:hidden p-2 rounded-md absolute top-4 left-4"
        onClick={toggleSidebar}
      >
        <HiOutlineMenu size={30} className="text-realPrimary" />
      </button>

      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out fixed top-0 left-0 h-full bg-white pt-[3rem] pl-[2rem] pr-[2rem] sm:w-[250px] lg:static lg:translate-x-0 z-10 shadow sm:lg:shadow-none`}
      >
        <button
          className="lg:hidden p-2 rounded-md absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          <HiOutlineX size={30} className="text-realPrimary" />
        </button>

        <img src={Logo} alt="Estarda Logo" className="w-[150px]" />

        <div className="mt-12">
          <div className="flex items-center text-sidebarText">
            <IoIosAdd
              size={24}
              className="mr-2 rounded-full bg-sidebarText bg-opacity-25 text-[#000000]"
            />
            <p className="font-RalewayRegular text-[16px] text-sidebarText">
              Add Note
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center text-sidebarText">
            <FaCalendarAlt size={20} className="mr-2 text-sidebarText" />
            <p className="font-RalewayRegular text-[16px] text-sidebarText">
              Calendar
            </p>
          </div>
          <div className="flex items-center text-sidebarText mt-2">
            <IoArchive size={20} className="mr-2 text-sidebarText" />
            <p className="font-RalewayRegular text-[16px] text-sidebarText">
              Archive
            </p>
          </div>
          <div className="flex items-center text-sidebarText mt-2">
            <GoTrash size={20} className="mr-2 text-sidebarText" />
            <p className="font-RalewayRegular text-[16px] text-sidebarText">
              Trash
            </p>
          </div>
        </div>

        <div className="mt-80 items-center text-center">
          <div className="flex">
            <PiCopyrightThin className="text-[#767676] inline" size={12} />
            <p className="text-[#767676] text-[8px] font-RalewayRegular text-nowrap">
              2024 Estrada International Staffing Solutions.
            </p>
          </div>
          <p className="text-[#767676] text-[8px]"> All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
