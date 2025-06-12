"use client";

import React from "react";
import { PlayCircleIcon, SpeechIcon, BriefcaseIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

function SideMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <PlayCircleIcon className="mr-2" size={20} />,
      match: (path: string) =>
        path.endsWith("/dashboard") || path.includes("/interviews"),
    },
    {
      label: "AI Models",
      path: "/dashboard/interviewers",
      icon: <SpeechIcon className="mr-2" size={20} />,
      match: (path: string) => path.endsWith("/interviewers"),
    },
    {
      label: "Job Searches",
      path: "/dashboard/jobs",
      icon: <BriefcaseIcon className="mr-2" size={20} />,
      match: (path: string) => path.endsWith("/jobs"),
    },
  ];

  return (
    <div className="fixed top-[55px] left-0 w-full bg-slate-100 py-4 z-10 shadow-md">
      <div className="flex justify-center space-x-6">
        {menuItems.map((item, index) => {
          const isActive = item.match(pathname);
          return (
            <div
              key={index}
              onClick={() => router.push(item.path)}
              className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-md ${
                isActive ? "bg-blue-200 text-blue-800" : "bg-white"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideMenu;
