import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Download, Briefcase, GraduationCap, Code2, User, Award, FolderGit2, Languages, Info } from "lucide-react";
import { projects } from "./Showcase";

export default function ResumeModal({ onClose, autoPrint = false }) {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => {
        window.print();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  const downloadPdf = () => {
    window.print();
  };



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="relative w-full max-w-5xl h-[90vh] sm:h-full max-h-[900px] bg-[#050505] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Action Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-white/[0.02] shrink-0 print:hidden">
          <h2 className="text-xl font-bold tracking-widest uppercase text-white/90">Interactive Resume</h2>
          <div className="flex items-center gap-4 print:hidden">
            <button
              onClick={downloadPdf}
              className="inline-flex items-center gap-2 border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 px-4 py-2 text-xs uppercase font-bold hover:bg-cyan-500 hover:text-black rounded-full transition shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Content */}
        <div id="printable-resume" className="flex-1 overflow-y-auto p-6 sm:p-12 hide-scrollbar">
          <div className="max-w-4xl mx-auto space-y-16 bg-[#050505] p-2 sm:p-8 rounded-3xl">
            
            {/* Top Section: Name & Title */}
            <div className="text-center sm:text-left border-b border-white/10 pb-12">
              <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-4 tracking-tight">
                Yedu Krishnan K
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-cyan-400 tracking-wide uppercase">
                Mobile App Developer
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-white/50 font-mono">
                <span>📍 Kollam, Kerala</span>
                <span className="hidden sm:inline">•</span>
                <span>📧 yedukrish88@gmail.com</span>
                <span className="hidden sm:inline">•</span>
                <span>📱 8891769446</span>
                <span className="hidden sm:inline">•</span>
                <a href="https://github.com/yedu-krish05" target="_blank" rel="noreferrer" className="hover:text-white transition underline decoration-white/30">GitHub</a>
                <span className="hidden sm:inline">•</span>
                <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" className="hover:text-white transition underline decoration-white/30">LinkedIn</a>
              </div>
            </div>

            {/* Grid Layout for Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left Column (Wider) */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Summary */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <User className="text-cyan-400" size={24} />
                    <h3 className="text-2xl font-bold text-white tracking-wider uppercase">Professional Summary</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed text-lg">
                    Dedicated BCA Graduate with a strong academic record and a foundation in software development, cross-platform mobile applications, and Machine Learning. Proficient in Flutter, Python, and Java. Proven ability to translate complex requirements into functional code, demonstrated by the successful development of various full-scale applications.
                  </p>
                </section>

                {/* Experience */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="text-cyan-400" size={24} />
                    <h3 className="text-2xl font-bold text-white tracking-wider uppercase">Experience</h3>
                  </div>
                  <div className="space-y-8 border-l-2 border-white/10 pl-6 ml-3">
                    
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                      <h4 className="text-xl font-bold text-white">Co-Founder & Lead Developer</h4>
                      <p className="text-cyan-400/80 font-mono text-sm mt-1 mb-3">TeamX • 2026 - Present</p>
                      <p className="text-white/60 leading-relaxed">
                        Leading the development of a multi-role workspace management and workflow invoice planner. Architecting scalable solutions using Flutter and Firebase. Managing a team of developers and overseeing the entire product lifecycle from ideation to deployment.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-white/30 rounded-full" />
                      <h4 className="text-xl font-bold text-white">Machine Learning & AI Intern</h4>
                      <p className="text-white/50 font-mono text-sm mt-1 mb-3">ICT Academy of Kerala • Mar 2026</p>
                      <p className="text-white/60 leading-relaxed">
                        Participated in an intensive internship focusing on ML and AI. Gained hands-on experience in building intelligent data models, analyzing datasets, and understanding core artificial intelligence concepts for integration into modern applications.
                      </p>
                    </div>

                  </div>
                </section>

                {/* Projects */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <FolderGit2 className="text-cyan-400" size={24} />
                    <h3 className="text-2xl font-bold text-white tracking-wider uppercase">Key Projects</h3>
                  </div>
                  <div className="space-y-6">
                    {projects.map((project, idx) => (
                      <div key={idx} className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                          <h4 className="text-xl font-bold text-white flex items-center gap-2">
                            {project.projectName}
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-cyan-400 text-xs hover:underline">Live</a>
                            )}
                            {project.github && (
                              <a href={project.github} target="_blank" rel="noreferrer" className="text-cyan-400 text-xs hover:underline">Source</a>
                            )}
                          </h4>
                          <span className="text-white/40 font-mono text-xs whitespace-nowrap">{project.completionDate}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-500/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <p className="text-white/60 leading-relaxed text-sm">
                          {project.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column (Narrower) */}
              <div className="space-y-12">
                
                {/* Education */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="text-purple-400" size={24} />
                    <h3 className="text-xl font-bold text-white tracking-wider uppercase">Education</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10">
                      <h4 className="text-lg font-bold text-white">Bachelor of Computer Applications (BCA)</h4>
                      <p className="text-white/50 font-mono text-xs mt-1 mb-3">College of Applied Science, Adoor • Graduating 2026</p>
                      <p className="text-white/60 text-sm">Relevant Coursework: Software Engineering, DBMS, Web Technologies, Data Structures.</p>
                    </div>

                    <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10">
                      <h4 className="text-lg font-bold text-white">Higher Secondary (Class XII)</h4>
                      <p className="text-white/50 font-mono text-xs mt-1 mb-3">Sree Buddha Central School, Karunagapally • 2021</p>
                      <p className="text-white/60 text-sm">Score: 66%</p>
                    </div>
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Code2 className="text-purple-400" size={24} />
                    <h3 className="text-xl font-bold text-white tracking-wider uppercase">Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Flutter", "Dart", "Python (ML)", "Java", "C++", "Firebase", "Scikit-Learn", "Pandas", "NumPy", "Git", "HTML"].map((skill) => (
                      <span key={skill} className="bg-white/5 border border-white/10 text-white/80 px-3 py-1.5 rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Certifications Highlights */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="text-purple-400" size={24} />
                    <h3 className="text-xl font-bold text-white tracking-wider uppercase">Certificates</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">▹</span>
                      Flutter Development Workshop (Zoople Tech)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">▹</span>
                      Career Orientation on Cybersecurity
                    </li>
                  </ul>
                </section>

                {/* Languages */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Languages className="text-purple-400" size={24} />
                    <h3 className="text-xl font-bold text-white tracking-wider uppercase">Languages</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-center justify-between bg-white/[0.02] p-3 rounded-lg border border-white/5">
                      <span className="text-white">English</span>
                      <span className="text-cyan-400/80 text-xs font-mono">Professional</span>
                    </li>
                    <li className="flex items-center justify-between bg-white/[0.02] p-3 rounded-lg border border-white/5">
                      <span className="text-white">Malayalam</span>
                      <span className="text-cyan-400/80 text-xs font-mono">Native</span>
                    </li>
                  </ul>
                </section>

                {/* Additional Info */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Info className="text-purple-400" size={24} />
                    <h3 className="text-xl font-bold text-white tracking-wider uppercase">Additional Info</h3>
                  </div>
                  <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 space-y-3 text-sm">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-white/50">Experience Level</span>
                      <span className="text-white font-medium">Fresher</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-white/50">Availability</span>
                      <span className="text-green-400 font-medium">Immediate</span>
                    </div>
                  </div>
                </section>
                
              </div>
            </div>
            
          </div>
        </div>
      </motion.div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media print {
          @page {
            margin: 0.5cm;
          }
          html, body {
            background-color: #050505 !important;
            height: auto !important;
          }
          /* Force motion elements to behave nicely */
          div[style*="transform"] {
            transform: none !important;
          }
          /* Hide all other sections individually */
          nav, 
          #Home, 
          #experience, 
          #showcase, 
          #contact, 
          footer,
          .animate-marquee,
          .border-t {
            display: none !important;
          }
          
          #about-section,
          #about-me {
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
            min-height: 0 !important;
            position: static !important;
            background: transparent !important;
          }

          /* Hide the text content of the about sections, leaving only the modal */
          #about-section > div:not(.fixed),
          #about-section > button,
          #about-me > div:not(.fixed),
          #about-me > button {
            display: none !important;
          }
          
          /* Transform the modal into a normal, flowing document */
          /* CRITICAL: transform: none fixes Framer Motion breaking pagination! */
          .fixed.inset-0, 
          .max-w-5xl, 
          #printable-resume {
            position: static !important;
            display: block !important;
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
            transform: none !important;
            box-shadow: none !important;
            border: none !important;
          }
          
          /* Fix layout inside the grid so it prints nicely */
          .grid {
            display: block !important;
          }
          
          /* Ensure exact background colors print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Prevent page breaks inside cards */
          section {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </motion.div>
  );
}
