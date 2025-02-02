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
    <div className="bg-brandColor text-gray-200 dark:bg-darkColor">
      <div className="innerDiv grid grid-cols-12 gap-4 p-4 py-10 sm:gap-0">
        <div className="col-span-6 flex justify-center p-2 sm:col-span-3">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-50 dark:text-gray-200">
              Workio
            </div>
            {footerBrandData.map((element, index) => (
              <div
                key={index}
                className="cursor-pointer text-xs hover:text-gray-50 hover:underline dark:text-darkColor-text dark:hover:text-gray-300"
              >
                {element.title}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-6 flex justify-center p-2 sm:col-span-3">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-50 dark:text-gray-200">
              For Job Seekers
            </div>
            {footerSeekerData.map((element, index) => (
              <div
                key={index}
                onClick={() => navigate(element.path)}
                className="cursor-pointer text-xs hover:text-gray-50 hover:underline dark:text-darkColor-text dark:hover:text-gray-100"
              >
                {element.title}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-6 flex justify-center p-2 sm:col-span-3">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-50 dark:text-gray-200">
              For Employers
            </div>
            {footerEmployerData.map((element, index) => (
              <div
                key={index}
                onClick={() => window.open(element.link)}
                className="cursor-pointer text-xs hover:text-gray-50 hover:underline dark:text-darkColor-text dark:hover:text-gray-100"
              >
                {element.title}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-6 flex justify-center p-2 sm:col-span-3">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-gray-50 dark:text-gray-200">
              Contact Us
            </div>
            {footerContactData.map((element, index) => (
              <div
                key={index}
                onClick={() => window.open(element.emailTo)}
                className="cursor-pointer text-xs hover:text-gray-50 hover:underline dark:text-darkColor-text dark:hover:text-gray-100"
              >
                {element.title}
              </div>
            ))}
            <div className="text-xs hover:text-gray-50 dark:text-darkColor-text dark:hover:text-gray-100">
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
