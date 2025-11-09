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
import {
  Github,
  Linkedin,
  Globe,
  Twitter,
  Instagram,
} from "lucide-react";

// 🎴 Holographic 3D Card Component
const HoloCard = ({ profile }) => {
  const texture = useTexture(profile?.image || "/placeholder-avatar.png");

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group rotation={[0, 0.3, 0]}>
        {/* --- Card Base --- */}
        <mesh>
          <boxGeometry args={[3.2, 1.9, 0.08]} />
          <meshPhysicalMaterial
            color="#1e003a"
            roughness={0.25}
            metalness={0.8}
            transmission={0.6}
            transparent
            opacity={0.92}
            clearcoat={1}
            clearcoatRoughness={0.2}
            emissive="#7c3aed"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* --- Subtle Light Overlay --- */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[3.1, 1.8]} />
          <meshStandardMaterial
            color="#a855f7"
            transparent
            opacity={0.08}
            emissive="#a855f7"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* --- Name --- */}
        <Text
          position={[0, 0.55, 0.1]}
          fontSize={0.25}
          color="#c084fc"
          anchorX="center"
          anchorY="middle"
        >
          {profile?.fullName || "Prem Kumar"}
        </Text>

        {/* --- Title --- */}
        <Text
          position={[0, 0.3, 0.1]}
          fontSize={0.14}
          color="#a5b4fc"
          anchorX="center"
          anchorY="middle"
        >
          {profile?.title || "Engineer | Developer"}
        </Text>

        {/* --- Profile Image --- */}
        <mesh position={[0, -0.05, 0.1]}>
          <circleGeometry args={[0.32, 64]} />
          <meshStandardMaterial
            map={texture}
            emissive="#a855f7"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* --- Bio --- */}
        {profile?.bio && (
          <Html
            position={[0, -0.75, 0.15]}
            transform
            distanceFactor={1.3}
            style={{
              width: "200px",
              textAlign: "center",
              color: "#d1d5db",
              fontSize: "12px",
              lineHeight: "1.4",
              opacity: 0.9,
              fontFamily: "sans-serif",
            }}
          >
            {profile.bio.length > 90
              ? profile.bio.substring(0, 90) + "..."
              : profile.bio}
          </Html>
        )}

        {/* --- Social Icons --- */}
        {profile?.socials && (
          <Html
            position={[0, -1.1, 0.15]}
            transform
            distanceFactor={1.3}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              width: "200px",
              alignItems: "center",
            }}
          >
            {profile.socials.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#c084fc" }}
              >
                <Github size={18} />
              </a>
            )}
            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#60a5fa" }}
              >
                <Linkedin size={18} />
              </a>
            )}
            {profile.socials.twitter && (
              <a
                href={profile.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#38bdf8" }}
              >
                <Twitter size={18} />
              </a>
            )}
            {profile.socials.instagram && (
              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#f472b6" }}
              >
                <Instagram size={18} />
              </a>
            )}
            {profile.link && (
              <a
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#818cf8" }}
              >
                <Globe size={18} />
              </a>
            )}
          </Html>
        )}

        {/* --- Side Glow Accents --- */}
        <mesh position={[1.55, 0, 0]}>
          <boxGeometry args={[0.04, 1.8, 0.05]} />
          <meshStandardMaterial
            emissive="#a855f7"
            emissiveIntensity={1}
            color="#9333ea"
          />
        </mesh>
        <mesh position={[-1.55, 0, 0]}>
          <boxGeometry args={[0.04, 1.8, 0.05]} />
          <meshStandardMaterial
            emissive="#9333ea"
            emissiveIntensity={1}
            color="#a855f7"
          />
        </mesh>

        {/* --- Floating Particles --- */}
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

// 🎥 Main AR Page
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

  // 🧩 Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://holocard.onrender.com/api/holocard/profile/get",
          { withCredentials: true }
        );
        if (res.data.success) {
          // Ensure social links structure exists
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

      {/* --- Glow Overlay --- */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-br from-[#030014]/40 via-[#0a0020]/30 to-[#1a0033]/50"></div>

      {/* --- 3D Card --- */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[3, 3, 3]} intensity={1.2} />
            <spotLight position={[-2, -2, 4]} intensity={0.9} />
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <HoloCard profile={profile} />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>

      {/* --- Info Text --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-10 left-0 right-0 text-center text-gray-300"
      >
        🪄 Move your camera — your holographic card floats in AR!
      </motion.div>

      {/* --- Refresh Button --- */}
      <div className="absolute top-5 right-5 flex gap-4">
        <Button
          onClick={() => window.location.reload()}
          className="bg-purple-700/70 hover:bg-purple-800 text-white"
        >
          <RotateCcw size={20} className="mr-2" /> Refresh
        </Button>
      </div>
    </div>
  );
};

export default ProfilePreviewPage;
