import React from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Image, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreateProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030014] via-[#0a0020] to-[#1a0033] text-white flex items-center justify-center relative overflow-hidden px-6">
      {/* --- Background Glow --- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[20%] left-[15%] w-[450px] h-[450px] bg-purple-600/40 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] bg-indigo-600/40 blur-[160px] rounded-full animate-pulse" />
      </div>

      {/* --- Form Card --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white/10 border border-purple-400/20 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] p-10"
      >
        {/* --- Header --- */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Create Your AR Profile
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Build your digital identity that shines in augmented reality.
          </p>
        </div>

        {/* --- Profile Form --- */}
        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Prem Kumar"
                className="pl-10 bg-white/5 border border-purple-400/20 focus:border-purple-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Profession / Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Profession / Title
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Software Engineer | Developer"
                className="pl-10 bg-white/5 border border-purple-400/20 focus:border-purple-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Profile Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Profile Image URL
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <Input
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                className="pl-10 bg-white/5 border border-purple-400/20 focus:border-purple-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Bio / Description
            </label>
            <Textarea
              placeholder="Tell the world who you are..."
              className="bg-white/5 border border-purple-400/20 focus:border-purple-500 text-white placeholder-gray-400 resize-none h-28"
            />
          </div>

          {/* Website / Portfolio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Website / Portfolio
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <Input
                type="url"
                placeholder="https://your-portfolio.com"
                className="pl-10 bg-white/5 border border-purple-400/20 focus:border-purple-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* --- Create Button --- */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={(e) => {
                e.preventDefault();
                alert("Profile Created! 🚀");
              }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.5)] text-white font-semibold text-lg px-10 py-6 rounded-2xl"
            >
              Create Profile
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateProfile;
