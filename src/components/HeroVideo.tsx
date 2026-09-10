import { motion } from "framer-motion";

const VIDEO_URL =
  "https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_video_head.mp4?utm_source=chatgpt.com";

export default function HeroVideo() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      className="relative mt-6 md:mt-10 w-full max-w-[640px] mx-auto"
    >
      {/* Soft ethereal backglow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-40"
        style={{ width: 600, height: 600, filter: "blur(100px)" }}
        aria-hidden="true"
      />

      {/* Masked video wrapper */}
      <div
        className="relative w-full aspect-[640/594] overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 65%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 65%, transparent 100%)",
        }}
      >
        <video
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover mix-blend-darken"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
