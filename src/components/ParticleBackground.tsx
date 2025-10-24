// components/ParticleBackground.tsx
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#0f172a", // dark slate
        },
        particles: {
          number: {
            value: 50,
          },
          color: {
            value: "#a78bfa", // purple-400
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: 3,
          },
          move: {
            enable: true,
            speed: 1,
          },
        },
      }}
    />
  );
};

export default ParticleBackground;