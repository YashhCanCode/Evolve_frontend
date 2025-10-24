import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb, X, HelpCircle } from "lucide-react";

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  const content = [
    "Evolve is a platform built for innovators, developers, and curious minds who want to solve real-world problems.",
    "It helps you discover meaningful challenges in fields like healthcare, environment, accessibility, public services, and technology.",
    "Each problem listed on Evolve includes a clear background, existing solutions, their current limitations, and a space to think: \"What can I do better?\"",
    "Whether you're a student looking for a final-year project, a developer seeking impactful work, or a team aiming to build something useful, Evolve gives you problems that actually matter — not just generic ideas.",
    "With Evolve, we're not just building projects. We're solving problems. 🌍💡"
  ];

  // 👇 Play sound once on first user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      const audio = new Audio("/intro.mp3");
      audio.volume = 0.6;
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });

      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    return () => window.removeEventListener("click", handleUserInteraction);
  }, []);

  // 👇 Scroll to exit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setFadeOut(true);
        setTimeout(() => onComplete(), 700);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Background blobs */}
      <div className="absolute -inset-10 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
      </div>

      {/* Floating icons */}
      {Array.from({ length: 8 }, (_, i) => {
        const Icon = i % 2 === 0 ? Lightbulb : HelpCircle;
        return (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ y: [-10, 10, -10] }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          >
            <Icon className="w-6 h-6 text-purple-300" />
          </motion.div>
        );
      })}

      {/* Skip Button */}
      <button
        onClick={() => {
          setFadeOut(true);
          setTimeout(() => onComplete(), 700);
        }}
        className="absolute top-6 right-6 text-gray-400 hover:text-white z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
            <Lightbulb className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Welcome to Evolve
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full shadow-lg" />
        </motion.div>

        {/* Text Reveal */}
        <motion.div
          className="space-y-6 mb-12 min-h-[300px]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.4
              }
            }
          }}
        >
          {content.map((line, i) => (
            <motion.p
              key={i}
              className="text-lg text-gray-300 leading-relaxed backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.5 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            onClick={() => {
              setFadeOut(true);
              setTimeout(() => onComplete(), 700);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 shadow-lg hover:scale-105 transition-all duration-300"
          >
            Start Exploring
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeAnimation;
