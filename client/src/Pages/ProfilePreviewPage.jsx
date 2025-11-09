import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  PerspectiveCamera,
  Text,
  Html,
  useTexture,
} from "@react-three/drei";
import axios from "axios";
import { Github, Linkedin, Twitter, Instagram, Globe } from "lucide-react";

// 🎴 Holographic 3D Business Card
const HoloCard = ({ profile }) => {
  const texture = useTexture(profile?.image || "/placeholder-avatar.png");

  return (
    <Float speed={2} rotationIntensity={0.7} floatIntensity={1}>
      <group rotation={[0, 0.4, 0]}>
        {/* --- Card Base --- */}
        <mesh>
          <boxGeometry args={[3.4, 2, 0.08]} />
          <meshPhysicalMaterial
            color="#0a001a"
            metalness={0.9}
            roughness={0.2}
            transmission={0.5}
            clearcoat={1}
            transparent
            opacity={0.95}
            emissive="#6d28d9"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* --- Glass Overlay --- */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[3.3, 1.9]} />
          <meshStandardMaterial
            color="#8b5cf6"
            transparent
            opacity={0.12}
            emissive="#a855f7"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* --- Profile Image --- */}
        <mesh position={[-1.05, 0.1, 0.1]}>
          <circleGeometry args={[0.35, 64]} />
          <meshStandardMaterial
            map={texture}
            emissive="#a855f7"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* --- Name + Title --- */}
        <Text
          position={[0.4, 0.45, 0.1]}
          fontSize={0.23}
          color="#c084fc"
          anchorX="left"
          anchorY="middle"
        >
          {profile?.fullName || "Prem Kumar"}
        </Text>

        <Text
          position={[0.4, 0.2, 0.1]}
          fontSize={0.13}
          color="#a5b4fc"
          anchorX="left"
          anchorY="middle"
        >
          {profile?.title || "Engineer | Developer"}
        </Text>

        {/* --- Bio --- */}
        {profile?.bio && (
          <Html
            position={[0.4, -0.25, 0.15]}
            transform
            distanceFactor={1.3}
            style={{
              width: "220px",
              textAlign: "left",
              color: "#d1d5db",
              fontSize: "12px",
              lineHeight: "1.4",
              opacity: 0.9,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {profile.bio.length > 120
              ? profile.bio.substring(0, 120) + "..."
              : profile.bio}
          </Html>
        )}

        {/* --- Social Icons Row --- */}
        <Html
          position={[0.3, -0.8, 0.15]}
          transform
          distanceFactor={1.3}
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          {profile?.socials?.linkedin && (
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              <Linkedin
                size={18}
                className="hover:scale-125 transition-all"
                color="#60a5fa"
              />
            </a>
          )}
          {profile?.socials?.github && (
            <a href={profile.socials.github} target="_blank" rel="noreferrer">
              <Github
                size={18}
                className="hover:scale-125 transition-all"
                color="#c084fc"
              />
            </a>
          )}
          {profile?.socials?.twitter && (
            <a href={profile.socials.twitter} target="_blank" rel="noreferrer">
              <Twitter
                size={18}
                className="hover:scale-125 transition-all"
                color="#38bdf8"
              />
            </a>
          )}
          {profile?.socials?.instagram && (
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram
                size={18}
                className="hover:scale-125 transition-all"
                color="#f472b6"
              />
            </a>
          )}
          {profile?.link && (
            <a href={profile.link} target="_blank" rel="noreferrer">
              <Globe
                size={18}
                className="hover:scale-125 transition-all"
                color="#818cf8"
              />
            </a>
          )}
        </Html>

        {/* --- Accent Edges --- */}
        <mesh position={[1.65, 0, 0]}>
          <boxGeometry args={[0.05, 1.8, 0.05]} />
          <meshStandardMaterial
            emissive="#a855f7"
            emissiveIntensity={1}
            color="#9333ea"
          />
        </mesh>
        <mesh position={[-1.65, 0, 0]}>
          <boxGeometry args={[0.05, 1.8, 0.05]} />
          <meshStandardMaterial
            emissive="#9333ea"
            emissiveIntensity={1}
            color="#a855f7"
          />
        </mesh>

        {/* --- Floating Lights --- */}
        {[...Array(10)].map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 3.4,
              (Math.random() - 0.5) * 1.9,
              0.15,
            ]}
          >
            <sphereGeometry args={[0.015, 16, 16]} />
            <meshBasicMaterial color="#c084fc" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// 🎥 Main AR Profile Page
const ProfilePreviewPage = () => {
  const videoRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟣 Start Camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        alert("Camera access denied or unavailable.");
        console.error(err);
      }
    };
    startCamera();
  }, []);

  // 🧩 Fetch User Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://holocard.onrender.com/api/holocard/profile/get",
          { withCredentials: true }
        );
        if (res.data.success) {
          const p = res.data.profile;
          p.socials = {
            github: p.github || "",
            linkedin: p.linkedin || "",
            twitter: p.twitter || "",
            instagram: p.instagram || "",
          };
          setProfile(p);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0018] text-gray-300 text-lg">
        Loading your holographic profile...
      </div>
    );

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* --- Camera Background --- */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      {/* --- Gradient Overlay --- */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-br from-[#030014]/40 via-[#0a0020]/30 to-[#1a0033]/60"></div>

      {/* --- 3D HoloCard Scene --- */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="w-[340px] h-[340px] md:w-[420px] md:h-[420px]">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[3, 3, 3]} intensity={1.3} />
            <spotLight position={[-2, -2, 4]} intensity={1} />
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <HoloCard profile={profile} />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>

      {/* --- Footer Text --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-10 left-0 right-0 text-center text-gray-300 text-sm md:text-base"
      >
        ✨ Your digital identity — beautifully rendered in AR.
      </motion.div>

      {/* --- Refresh Button --- */}
      <div className="absolute top-5 right-5 flex gap-4">
        <Button
          onClick={() => window.location.reload()}
          className="bg-purple-700/70 hover:bg-purple-800 text-white px-5 py-2 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          <RotateCcw size={18} className="mr-2" /> Refresh
        </Button>
      </div>
    </div>
  );
};

export default ProfilePreviewPage;
