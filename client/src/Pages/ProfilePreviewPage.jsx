import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ProfilePreviewPage = () => {
  const [isARMode, setIsARMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/holocard/profile/get",
          {
            withCredentials: true,
          }
        );
        console.log("Profile fetch response:", res.data);
        if (res.data.success) {
          setProfile(res.data.profile);
        } else {
          alert("No profile found. Please create one first.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to fetch profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl bg-[#0a0018]">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#0a0018]">
        <p className="text-gray-400 text-lg mb-6">
          No AR Profile found. Please create one first.
        </p>
        <Button onClick={() => (window.location.href = "/create-profile")}>
          Create Profile
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030014] via-[#0a0020] to-[#1a0033] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          {isARMode ? "AR Mode Active" : "Your AR Profile Card"}
        </h1>
        <p className="text-gray-400 mt-2">
          {isARMode
            ? "Point your camera at the Hiro marker to see your holographic card."
            : "Preview your 3D profile card in augmented reality."}
        </p>
      </motion.div>

      {/* --- AR MODE --- */}
      {isARMode ? (
        <div className="relative w-full h-[90vh] flex items-center justify-center">
          <iframe
            title="AR Scene"
            srcDoc={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/aframe/build/aframe-ar.js"></script>
    <style>
      html, body { margin: 0; height: 100%; overflow: hidden; background: black; }
    </style>
  </head>
  <body>
    <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
      <!-- Marker -->
      <a-marker preset="hiro">
        <!-- Card base -->
        <a-box
          position="0 0.5 0"
          width="2.8"
          height="1.6"
          depth="0.1"
          material="color: #1a0033; opacity: 0.9; metalness: 0.8; roughness: 0.3; emissive: #7c3aed; emissiveIntensity: 0.6"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 8000; easing: linear"
        ></a-box>

        <!-- Profile Image -->
        ${
          profile.image
            ? `<a-image src="${profile.image}" width="1" height="1" position="0 1.3 0.06" rotation="0 0 0"></a-image>`
            : ""
        }

        <!-- Name -->
        <a-text
          value="${profile.fullName}"
          color="#c084fc"
          width="3"
          align="center"
          position="0 1.7 0"
        ></a-text>

        <!-- Title -->
        <a-text
          value="${profile.title}"
          color="#a5b4fc"
          width="2.5"
          align="center"
          position="0 1.5 0"
        ></a-text>

        <!-- Bio -->
        <a-text
          value="${profile.bio}"
          color="#d1d5db"
          width="2.5"
          align="center"
          position="0 1.2 0"
        ></a-text>

        <!-- Website -->
        <a-text
          value="${profile.link}"
          color="#818cf8"
          width="2.5"
          align="center"
          position="0 1.0 0"
        ></a-text>
      </a-marker>

      <a-entity camera></a-entity>
    </a-scene>
  </body>
</html>`}
            className="w-full h-full border-0"
            allow="camera; microphone; fullscreen"
          ></iframe>

          <button
            onClick={() => setIsARMode(false)}
            className="absolute top-5 right-5 bg-purple-700/70 hover:bg-purple-800 text-white text-2xl rounded-full w-12 h-12"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Button
            onClick={() => setIsARMode(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.5)] text-white font-semibold text-lg px-8 py-5 rounded-2xl flex items-center gap-2"
          >
            <Eye size={20} />
            View in AR
          </Button>

          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border border-purple-400/40 text-purple-300 hover:bg-purple-600/10 hover:scale-105 transition-all duration-300 px-8 py-5 rounded-2xl flex items-center gap-2"
          >
            <RotateCcw size={20} /> Refresh
          </Button>
        </div>
      )}

      <footer className="absolute bottom-6 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()}{" "}
        <span className="text-purple-400 font-semibold">ARdentity</span> — Built
        by Prem
      </footer>
    </div>
  );
};

export default ProfilePreviewPage;
