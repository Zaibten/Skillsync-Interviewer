"use client";

import React, { useState, useEffect } from "react";
import { useOrganization } from "@clerk/nextjs";
import { useInterviews } from "@/contexts/interviews.context";
import InterviewCard from "@/components/dashboard/interview/interviewCard";
import CreateInterviewCard from "@/components/dashboard/interview/createInterviewCard";
import { InterviewService } from "@/services/interviews.service";
import { ClientService } from "@/services/clients.service";
import { ResponseService } from "@/services/responses.service";
import Modal from "@/components/dashboard/Modal";
import {
  Gem,
  Plus,
  BrainCircuit,
  MessageCircle,
  BarChart3,
  Users,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

function Interviews() {
  const { interviews, interviewsLoading } = useInterviews();
  const { organization } = useOrganization();
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("");
  const [allowedResponsesCount, setAllowedResponsesCount] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        if (organization?.id) {
          const data = await ClientService.getOrganizationById(organization.id);
          setCurrentPlan(data?.plan || "");
          setAllowedResponsesCount(data?.allowed_responses_count || 10);
          if (data?.plan === "free_trial_over") setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };
    fetchOrgData();
  }, [organization]);

  useEffect(() => {
    const fetchResponsesCount = async () => {
      if (!organization || currentPlan !== "free") return;
      setLoading(true);
      try {
        const totalResponses =
          await ResponseService.getResponseCountByOrganizationId(
            organization.id,
          );
        if (totalResponses >= allowedResponsesCount) {
          setCurrentPlan("free_trial_over");
          await InterviewService.deactivateInterviewsByOrgId(organization.id);
          await ClientService.updateOrganization(
            { plan: "free_trial_over" },
            organization.id,
          );
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponsesCount();
  }, [organization, currentPlan, allowedResponsesCount]);

  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Driven Questions",
      desc: "Dynamic questions based on candidate's answers.",
    },
    {
      icon: MessageCircle,
      title: "Live Scoring",
      desc: "Instant evaluation with feedback & AI recommendations.",
    },
    {
      icon: BarChart3,
      title: "In-depth Analytics",
      desc: "Powerful dashboards and exportable reports.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      desc: "Invite teammates, share insights, and assign roles.",
    },
  ];

  return (
    <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 animate-fade-in">
      {/* 🎯 Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden py-20 px-6 rounded-2xl text-white bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 shadow-xl"
      >
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-pink-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
        <h1 className="text-5xl font-black text-center animate-bounce">
          Welcome to Skillsync
        </h1>
        <p className="text-lg mt-4 max-w-3xl text-center mx-auto">
          Revolutionize your hiring process with AI-powered interviews, smart
          analytics, and seamless team workflows.
        </p>
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            🚀 Get Started
          </motion.button>
        </div>
      </motion.section>

      {/* 💡 Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform transition-all hover:-translate-y-1"
          >
            <item.icon
              className="mx-auto text-blue-600 mb-4 animate-pulse"
              size={36}
            />
            <h3 className="text-xl font-semibold text-center">{item.title}</h3>
            <p className="text-sm text-gray-600 text-center mt-2">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* 📋 Interview List */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Create / View Interviews
          </h2>
          <p className="text-gray-500">
            Manage all your scheduled and active interviews
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {currentPlan === "free_trial_over" ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="h-60 w-56 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl bg-gray-100"
            >
              <div className="text-center px-4">
                <Plus
                  size={40}
                  className="text-gray-500 mx-auto mb-2 animate-bounce"
                />
                <p className="text-gray-600 text-sm font-medium">
                  Upgrade to create more interviews
                </p>
              </div>
            </motion.div>
          ) : (
            <CreateInterviewCard />
          )}
          {loading || interviewsLoading
            ? [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-60 w-56 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-xl"
                ></div>
              ))
            : interviews.map((item) => (
                <InterviewCard
                  key={item.id}
                  id={item.id}
                  interviewerId={item.interviewer_id}
                  name={item.name}
                  url={item.url ?? ""}
                  readableSlug={item.readable_slug}
                />
              ))}
        </div>
      </section>

      {/* 👥 Testimonials Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-4xl mx-auto"
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          What Our Users Say
        </h3>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-gray-600 italic">
            “The Skillsync changed our hiring game. We’re faster and smarter
            than ever.”
          </p>
          <p className="text-sm font-semibold text-gray-500">
            – HR Manager, TechNova Inc.
          </p>
        </div>
      </motion.section>

      {/* 🚨 Modal */}
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center space-y-4 p-6 animate-fade-in">
            <Gem className="mx-auto text-blue-600 animate-ping" size={40} />
            <h3 className="text-xl font-bold">Upgrade to Pro</h3>
            <p className="text-gray-600">
              You’ve reached your free trial limit. Unlock full features by
              upgrading to Pro.
            </p>
            <div className="flex justify-center">
              <Image
                src="/premium-plan-icon.png"
                alt="Pro"
                width={200}
                height={200}
              />
            </div>
            <a
              href="mailto:founders@Skillsyncinfo.co"
              className="text-white bg-blue-600 px-6 py-2 rounded-full mt-4 font-semibold hover:bg-blue-700 transition"
            >
              Contact to Upgrade
            </a>
          </div>
        </Modal>
      )}

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

export default Interviews;
