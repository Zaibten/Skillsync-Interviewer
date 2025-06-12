"use client";

import React from "react";
import { useInterviewers } from "@/contexts/interviewers.context";
import { ChevronLeft, ChevronRight, Users, Rocket, Star } from "lucide-react";
import InterviewerCard from "@/components/dashboard/interviewer/interviewerCard";
import CreateInterviewerButton from "@/components/dashboard/interviewer/createInterviewerButton";
import { motion } from "framer-motion";

function Interviewers() {
  const { interviewers, interviewersLoading } = useInterviewers();

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    if (slider) slider.scrollLeft -= 250;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    if (slider) slider.scrollLeft += 250;
  };

  const InterviewersLoader = () => (
    <div className="flex space-x-4">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="h-44 w-36 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"
        />
      ))}
    </div>
  );

  return (
    <main className="p-8 pt-0 ml-12 mr-auto space-y-16 animate-fade-in">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-14 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl text-white shadow-xl"
      >
        <h1 className="text-5xl font-extrabold mb-4 animate-bounce tracking-tight">
          Meet the Interviewers
        </h1>
        <p className="text-lg max-w-xl mx-auto opacity-90">
          Discover experienced professionals ready to conduct AI-powered
          interviews.
        </p>
      </motion.section>

      {/* Interviewers Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Our Top Interviewers
          </h2>
          <div className="space-x-2">
            <button
              onClick={slideLeft}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ChevronLeft size={30} />
            </button>
            <button
              onClick={slideRight}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>
        <div
          id="slider"
          className="flex overflow-x-scroll space-x-4 pb-4 scroll-smooth scrollbar-hide"
        >
          {interviewers.length === 0 && !interviewersLoading && (
            <CreateInterviewerButton />
          )}
          {interviewersLoading ? (
            <InterviewersLoader />
          ) : (
            interviewers.map((interviewer) => (
              <motion.div
                key={interviewer.id}
                whileHover={{ scale: 1.05 }}
                className="flex-none w-48"
              >
                <InterviewerCard interviewer={interviewer} />
              </motion.div>
            ))
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-blue-50 rounded-xl p-10 text-center shadow-md"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Want to become an Interviewer?
        </h3>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Join our growing network of interviewers and help organizations make
          smarter hiring decisions.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all">
          Apply Now
        </button>
      </motion.section>

      {/* ⚙️ Footer (100% width) */}
      <motion.footer
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full mt-16 py-10 px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white rounded-t-3xl shadow-xl"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-xl font-bold mb-2">Skillsync</h4>
            <p className="text-sm text-gray-400">
              Revolutionizing recruitment with artificial intelligence.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Quick Links</h4>
            <ul className="text-sm space-y-1 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Follow Us</h4>
            <p className="text-sm text-gray-400">LinkedIn • Twitter • GitHub</p>
          </div>
        </div>
        <p className="mt-6 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Skillsync. All rights reserved.
        </p>
      </motion.footer>
    </main>
  );
}

export default Interviewers;
