import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030014] via-[#0a0020] to-[#1a0033] flex items-center justify-center text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-purple-600/30 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-600/30 blur-[150px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[90%] max-w-md bg-white/10 border border-purple-400/20 backdrop-blur-lg rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.3)] p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <UserPlus size={38} className="text-purple-400 mb-2" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Join ARdentity and build your holographic identity
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
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

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <Input
                type="email"
                placeholder="you@example.com"
                className="pl-10 bg-white/5 border border-purple-400/20 focus:border-purple-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-10 bg-white/5 border border-purple-400/20 focus:border-purple-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 py-5 text-lg font-semibold rounded-xl mt-4 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            Register
          </Button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
