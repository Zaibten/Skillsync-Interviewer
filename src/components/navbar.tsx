import Link from "next/link";
import React from "react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4 overflow-hidden w-full">
          {/* Logo + Brand */}
          <Link
            href="/dashboard"
            aria-label="Go to dashboard"
            className="flex items-center gap-2 hover:opacity-80 transition shrink-0"
          >
            <Sparkles className="text-blue-600 dark:text-blue-400 h-6 w-6" />
            <span className="font-semibold text-xl text-gray-900 dark:text-white">
              Skill
              <span className="text-blue-600 dark:text-blue-400">
                sync
              </span>{" "}
              Info
            </span>
          </Link>

          {/* Divider */}
          <span className="text-gray-400 dark:text-gray-500 hidden sm:inline">
            |
          </span>

          {/* Marquee Section */}
          <div className="relative overflow-hidden h-6 flex-1 hidden md:block">
            <div className="absolute whitespace-nowrap animate-marquee text-sm text-gray-700 dark:text-gray-300 font-medium">
              Empowering Recruiters with AI-Based Interview Insights • Real-Time
              Candidate Analysis • Voice, Emotion & Skill Evaluation • Fast &
              Smart Hiring
            </div>
          </div>

          {/* Organization Switcher */}
          <div className="hidden lg:block ml-4">
            <OrganizationSwitcher
              afterCreateOrganizationUrl="/dashboard"
              hidePersonal
              afterSelectOrganizationUrl="/dashboard"
              afterLeaveOrganizationUrl="/dashboard"
              appearance={{
                variables: {
                  fontSize: "0.875rem",
                },
              }}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ml-4 shrink-0">
          <UserButton afterSignOutUrl="/sign-in" signInUrl="/sign-in" />
        </div>
      </div>

      {/* Custom Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          display: inline-block;
          min-width: 100%;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </header>
  );
}

export default Navbar;
