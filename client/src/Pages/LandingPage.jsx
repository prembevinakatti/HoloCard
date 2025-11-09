import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  PerspectiveCamera,
  Text,
  Html,
} from "@react-three/drei";

// --- Holographic Card Component ---
const HoloCard = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group rotation={[0, 0.3, 0]}>
        {/* Base Card */}
        <mesh>
          <boxGeometry args={[3.2, 1.9, 0.08]} />
          <meshPhysicalMaterial
            color="#20004d"
            roughness={0.25}
            metalness={0.7}
            transmission={0.7}
            transparent
            opacity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.2}
            emissive="#6d28d9"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Glass Overlay */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[3.1, 1.8]} />
          <meshStandardMaterial
            color="#8b5cf6"
            transparent
            opacity={0.1}
            emissive="#a855f7"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Name + Role */}
        <Text
          position={[0, 0.45, 0.1]}
          fontSize={0.22}
          color="#c084fc"
          anchorX="center"
          anchorY="middle"
        >
          Prem Kumar
        </Text>
        <Text
          position={[0, 0.18, 0.1]}
          fontSize={0.12}
          color="#a5b4fc"
          anchorX="center"
          anchorY="middle"
        >
          Engineer | Developer
        </Text>

        {/* Avatar Circle */}
        <mesh position={[0, -0.35, 0.1]}>
          <circleGeometry args={[0.25, 64]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#a855f7"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Side accent lights */}
        <mesh position={[1.5, 0, 0]}>
          <boxGeometry args={[0.04, 1.8, 0.05]} />
          <meshStandardMaterial
            emissive="#a855f7"
            emissiveIntensity={0.8}
            color="#9333ea"
          />
        </mesh>
        <mesh position={[-1.5, 0, 0]}>
          <boxGeometry args={[0.04, 1.8, 0.05]} />
          <meshStandardMaterial
            emissive="#9333ea"
            emissiveIntensity={0.8}
            color="#a855f7"
          />
        </mesh>

        {/* Decorative glow particles */}
        {[...Array(10)].map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 1.6,
              0.15,
            ]}
          >
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="#c084fc" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#030014] via-[#050026] to-[#1a0033] text-white overflow-hidden">
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-purple-700/40 blur-[160px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] bg-indigo-600/40 blur-[160px] rounded-full animate-pulse"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center px-10 py-6 relative z-20">
        <h1 className="text-3xl font-extrabold tracking-wider drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
          <span className="text-purple-500">Holo</span>Card
        </h1>

        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 duration-300 text-white font-medium px-6 py-2 rounded-xl shadow-[0_0_10px_rgba(168,85,247,0.6)]">
          Get Started
        </Button>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="flex flex-col md:flex-row justify-center items-center text-center md:text-left mt-12 md:mt-24 px-6 md:px-20 relative z-10">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="md:w-1/2 space-y-8"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            Your Identity,
            <br />
            <span className="text-white drop-shadow-[0_0_12px_rgba(147,51,234,0.5)]">
              Augmented in Reality
            </span>
          </h2>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-md">
            ARdentity transforms your digital presence into a holographic 3D
            business card — ready to scan, share, and showcase anywhere in the
            world.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-6">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center gap-2">
              Launch Demo <ArrowRight size={18} />
            </Button>
            <a
              href="#features"
              className="text-gray-400 hover:text-white transition-all"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE (VISIBLE 3D HOLOGRAPHIC CARD) --- */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 mt-16 md:mt-0 h-[350px] md:h-[400px] w-full flex justify-center items-center"
        >
          <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
            <Canvas camera={{ position: [0, 0, 4] }}>
              {/* --- LIGHTING SETUP (MAKES CARD CLEAR) --- */}
              <ambientLight intensity={0.7} />
              <directionalLight
                position={[3, 3, 3]}
                intensity={1.2}
                color="#a855f7"
              />
              <spotLight
                position={[-2, -2, 4]}
                angle={0.3}
                intensity={0.9}
                color="#8b5cf6"
              />
              <PerspectiveCamera makeDefault position={[0, 0, 4]} />
              <HoloCard />
              <OrbitControls enableZoom={false} />
            </Canvas>
            <div className="absolute bottom-6 w-full text-center text-sm text-gray-400">
              🪄 Scan to view your AR profile
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURES --- */}
      <section
        id="features"
        className="mt-28 px-8 md:px-24 text-center relative z-10"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-12">
          Explore the <span className="text-purple-400">Future</span> of
          Networking
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "🔮 Immersive Presence",
              desc: "Project your identity as a 3D holographic business card anyone can scan.",
            },
            {
              title: "🌐 Universal Access",
              desc: "Works directly in browsers — no app or headset needed.",
            },
            {
              title: "⚡ Powered by MERN + AR.js",
              desc: "Built with modern web tech for seamless performance and speed.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 25px rgba(168,85,247,0.4)",
              }}
              className="p-8 bg-white/5 border border-purple-400/10 rounded-2xl backdrop-blur-lg"
            >
              <h4 className="text-xl font-semibold mb-3 text-purple-400">
                {item.title}
              </h4>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="mt-28 text-center py-8 text-gray-400 text-sm border-t border-purple-500/20">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-purple-400 font-semibold">ARdentity</span> —
          Built by Prem.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
