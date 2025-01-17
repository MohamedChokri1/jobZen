"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

interface JobOwner {
  id: number;
  name: string;
  email: string;
  password: string;
  adress: string;
  phone: number;
  image: string;
  rating: number;
  description: string;
}

const DropNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const id = Cookies.get("id");
  const [jobOwner, setJobowner] = useState<JobOwner>({
    id: 0,
    name: "",
    email: "",
    password: "",
    adress: "",
    phone: 0,
    image: "",
    rating: 0,
    description: "",
  });

  const settings = [
    { name: "Account", href: `/jobownerProfile/${id}` },
    { name: "Messages", href: "/jobDetails/messageJobDetails" },
    { name: "Job List", href: `/listjobbycompany/${id}` },
    { name: "Logout", href: "/home" },
  ];

  const handleToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    axios
      .get(` http://localhost:3000/jobOwner/job-owner/${id}`)
      .then((response) => {
        setJobowner(response.data);
        console.log("hello");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="relative inline-flex items-center group">
      <button
        id="avatarButton"
        className="rounded-full p-1 focus:outline-none"
        onClick={() => handleToggle()}
      >
        <img
          className="w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={jobOwner.image}
          // {user.image}
          alt="User dropdown"
        />
      </button>
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{
          opacity: isDropdownOpen ? 1 : 0,
          scaleY: isDropdownOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute origin-top-right z-10 w-[160px] h-[160px] left-[-77px] mt-[203px] -mr-[80px] bg-gradient-to-br from-[#172554] to-[#267296] divide-y divide-gray-200 rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hover:bg-transparent active:scale-95 transition-all duration-150 ease-linear"
        aria-labelledby="options-menu"
      >
        {settings.map((setting, index) => (
          <Link href={setting.href} key={setting.name}>
            <motion.a
              className=" pl-6 pr-4 py-2 flex items-center text-white text-base font-medium hover:bg-transparent focus:outline-none"
              whileHover={{
                scale: 1.07,
                color: "#91c6EF",
                transition: { duration: 0.3 },
              }}
            >
              {index === 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
              {index === 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                  />
                </svg>
              )}
              {index === 2 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>
              )}
              {index === 3 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
              )}
              {setting.name}
            </motion.a>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};
export default DropNavbar;
