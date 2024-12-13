import React from "react";
import SignFooter from "./SignFooter";
import { useNavigate } from "react-router-dom";

import {
  footerBrandData,
  footerContactData,
  footerEmployerData,
  footerSeekerData,
} from "../Data";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-brandColor dark:bg-darkColor text-gray-200">
      <div className="grid grid-cols-12 gap-4 sm:gap-0 innerDiv p-4 py-10 ">
        <div className=" col-span-6 sm:col-span-3 p-2 flex justify-center">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-50 dark:text-gray-200">
              Workio
            </div>
            {footerBrandData.map((element, index) => (
              <div
                key={index}
                className="cursor-pointer hover:underline text-xs hover:text-gray-50 dark:text-darkColor-text dark:hover:text-gray-100"
              >
                {element.title}
              </div>
            ))}
          </div>
        </div>

        <div className=" col-span-6 sm:col-span-3 p-2 flex justify-center">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-50  dark:text-gray-200">
              For Job Seekers
            </div>
            {footerSeekerData.map((element, index) => (
              <div
                key={index}
                onClick={() => navigate(element.path)}
               
                className="cursor-pointer hover:underline dark:text-darkColor-text   text-xs hover:text-gray-50 dark:hover:text-gray-100"
              >
                {element.title}
              </div>
            ))}
          </div>
        </div>


        <div className=" col-span-6 sm:col-span-3 p-2 flex justify-center">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-50  dark:text-gray-200">
              For Employers
            </div>
            {footerEmployerData.map((element, index) => (
              <div
                key={index}
                onClick={() => window.open(element.link)}
                className="cursor-pointer hover:underline dark:text-darkColor-text  text-xs hover:text-gray-50 dark:hover:text-gray-100"
              >
                {element.title}
              </div>
            ))}
          </div>
        </div>
       
        <div className=" col-span-6 sm:col-span-3 p-2 flex justify-center">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-50  dark:text-gray-200">
              Contact Us
            </div>
            {footerContactData.map((element, index) => (
              <div
                key={index}
                onClick={() => window.open(element.emailTo)}
                className="cursor-pointer hover:underline dark:text-darkColor-text  text-xs hover:text-gray-50 dark:hover:text-gray-100"
              >
                {element.title}
              </div>
            ))}
            <div className="  text-xs hover:text-gray-50 dark:text-darkColor-text dark:hover:text-gray-100">
              Call us 2255
            </div>
          </div>
        </div>
      </div>

      <SignFooter />
    </div>
  );
};

export default Footer;
