import React from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030014] via-[#0a0020] to-[#1a0033] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* --- Background Glow Effects --- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-purple-600/40 blur-[180px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] bg-indigo-700/40 blur-[180px] rounded-full animate-pulse"></div>
      </div>

      {/* --- Hero Content --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 px-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Welcome to{" "}
          <span className="text-white drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]">
            ARdentity
          </span>
        </h1>

        <p className="text-gray-300 max-w-xl mx-auto text-lg">
          Build your holographic identity and showcase it to the world.  
          Manage your profile, connect your data, and experience the next evolution of personal branding.
        </p>

        {/* --- Create Profile Button --- */}
        <div className="mt-10 flex justify-center">
          <Button
            onClick={() => alert("Redirecting to profile creation...")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.5)] text-white font-semibold text-lg px-8 py-6 rounded-2xl flex items-center gap-2"
          >
            <UserPlus size={22} />
            Create Your AR Profile Card
          </Button>
        </div>
      </motion.div>

      {/* --- Footer --- */}
      <footer className="absolute bottom-6 text-gray-500 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-purple-400 font-semibold">ARdentity</span> — Built by Prem
      </footer>
    </div>
  );
};

export default HomePage;
