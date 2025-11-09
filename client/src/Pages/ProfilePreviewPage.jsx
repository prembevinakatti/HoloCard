import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfilePreviewPage = () => {
  const [isARMode, setIsARMode] = useState(false);
  const userData = { name: "Prem Kumar", title: "Engineer | Developer" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030014] via-[#0a0020] to-[#1a0033] text-white flex flex-col items-center justify-center relative overflow-hidden">
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
            ? "Point your camera at the Hiro marker to see your 3D holographic card!"
            : "Preview or view your AR card in augmented reality."}
        </p>
      </motion.div>

      {/* ✅ AR MODE SECTION */}
      {isARMode ? (
        <div className="relative w-full h-[90vh] flex items-center justify-center">
          <iframe
            title="AR Scene"
            srcDoc={`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
                <script src="https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/aframe/build/aframe-ar-nft.js"></script>
                <style>
                  html, body { margin: 0; height: 100%; overflow: hidden; background: black; }
                </style>
              </head>
              <body>
                <a-scene
                  embedded
                  arjs="sourceType: webcam; debugUIEnabled: false;"
                  vr-mode-ui="enabled: false"
                  renderer="logarithmicDepthBuffer: true;"
                >
                  <a-marker preset="hiro">
                    <a-box
                      position="0 0.5 0"
                      width="2.5"
                      height="1.5"
                      depth="0.1"
                      material="color: #24005A; opacity: 0.9; metalness: 0.7; roughness: 0.2; emissive: #7c3aed; emissiveIntensity: 0.8"
                      animation="property: rotation; to: 0 360 0; loop: true; dur: 6000; easing: linear"
                    ></a-box>

                    <a-text
                      value="${userData.name}"
                      color="#c084fc"
                      width="3"
                      align="center"
                      position="0 1.3 0"
                    ></a-text>

                    <a-text
                      value="${userData.title}"
                      color="#a5b4fc"
                      width="2.5"
                      align="center"
                      position="0 1.1 0"
                    ></a-text>
                  </a-marker>
                  <a-entity camera></a-entity>
                </a-scene>
              </body>
              </html>
            `}
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
            variant="outline"
            className="border border-purple-400/40 text-purple-300 hover:bg-purple-600/10 hover:scale-105 transition-all duration-300 px-8 py-5 rounded-2xl flex items-center gap-2"
          >
            <Share2 size={20} /> Share AR Card
          </Button>
        </div>
      )}

      <footer className="absolute bottom-6 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()}{" "}
        <span className="text-purple-400 font-semibold">ARdentity</span> — Built by Prem
      </footer>
    </div>
  );
};

export default ProfilePreviewPage;
