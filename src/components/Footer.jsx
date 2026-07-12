import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";

const GithubIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.16-1.4 6.16-7.2A5.8 5.8 0 0 0 19.3 4.8 5.8 5.8 0 0 0 19 2.5s-1.4-.4-4.5 1.7a14.6 14.6 0 0 0-5 0c-3.1-2.1-4.5-1.7-4.5-1.7a5.8 5.8 0 0 0-.3 2.3 5.8 5.8 0 0 0-1.8 3.03c0 5.8 3 6.8 6.16 7.2a4.8 4.8 0 0 0-1 3.03v4"/><path d="M9 20a5.5 5.5 0 0 1-4-2.5"/></svg>);
const LinkedinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);
const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", icon: <GithubIcon />, url: "https://github.com/yedu-krish05" },
    { name: "LinkedIn", icon: <LinkedinIcon />, url: "https://www.linkedin.com/in/yedu-krishnan-331baa2a2" }, 
    { name: "Instagram", icon: <InstagramIcon />, url: "https://www.instagram.com/yedu__krish" },
    { name: "Email", icon: <Mail size={20} />, url: "mailto:yedukrishnan05@gmail.com" },
  ];

  return (
    <footer className="relative w-full bg-black text-white pt-20 pb-10 border-t border-white/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Logo / Name area */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-3xl font-display uppercase tracking-widest bg-gradient-to-r from-white via-cyan-100 to-cyan-500 text-transparent bg-clip-text">
              Yedu Krishnan K
            </h2>
            <p className="text-white/40 text-sm font-medium tracking-wide">
              Building apps that feel alive.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300 group"
                aria-label={social.name}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.div>
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center justify-center gap-2 text-white/40 hover:text-cyan-400 transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300">
              <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Top</span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 my-10" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-white/30 tracking-widest uppercase">
          <p>© {currentYear} Yedu Krishnan K. All rights reserved.</p>
          <p>
            Designed & Built with <span className="text-cyan-500">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
