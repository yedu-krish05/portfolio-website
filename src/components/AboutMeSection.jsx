import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Download } from "lucide-react";

export default function AboutMeSection({ onClose }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      id="about-me"
      ref={ref}
      className="fixed inset-0 z-[100] w-full h-full bg-black/95 backdrop-blur-xl text-white overflow-y-auto px-6 md:px-12 lg:px-20 py-24"
    >
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 md:top-10 md:right-10 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
      >
        <X size={24} />
      </button>
      <div className="max-w-6xl mx-auto w-full min-h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
          <div className="absolute inset-0 border border-white/10 rounded-3xl z-20 group-hover:border-white/20 transition-colors duration-700" />
          <img
            src="/assets/yedu.jpeg"
            alt="Krish - Mobile App Developer"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          />
        </motion.div>

        {/* Text Container */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-white/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-white/50 font-mono">
              The Story
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            Crafting digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/60 to-white/20">
              experiences.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 text-white/70 text-base md:text-lg font-[Poppins] leading-relaxed"
          >
            <p>
              I am a passionate Mobile App Developer and the Co-founder of TeamX. 
              With a strong background in Flutter and Firebase, I specialize in building 
              high-performance, cross-platform applications that deliver seamless user experiences.
            </p>
            <p>
              My journey in software development has been driven by a relentless curiosity and 
              a desire to solve complex problems through clean, efficient code. I believe that 
              great design and solid engineering go hand in hand to create products that people love to use.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, brainstorming innovative app 
              ideas, or contributing to the developer community. Let's build something amazing together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex items-center gap-8"
          >
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">2+</span>
              <span className="text-xs tracking-[0.2em] text-white/50 uppercase mt-2">Years Exp.</span>
            </div>
            <div className="w-[1px] h-12 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">5+</span>
              <span className="text-xs tracking-[0.2em] text-white/50 uppercase mt-2">Projects</span>
            </div>
            <div className="w-[1px] h-12 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">TeamX</span>
              <span className="text-xs tracking-[0.2em] text-white/50 uppercase mt-2">Co-founder</span>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <a 
              href="/resume.pdf" 
              download="Krish_Resume.pdf"
              className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs tracking-[0.25em] uppercase font-bold hover:bg-white hover:text-black transition-all duration-300 rounded-full"
            >
              Download Resume
              <Download size={16} />
            </a>
          </motion.div>
        </div>
        </div>
      </div>
    </motion.section>
  );
}
