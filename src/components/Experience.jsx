import React from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Co-Founder & Lead Developer",
    company: "TeamX",
    date: "2026 - Present",
    description: "Leading the development of a multi-role workspace management and workflow invoice planner. Architecting scalable solutions using Flutter and Firebase.",
    icon: <Briefcase size={20} />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    title: "Machine Learning & AI Intern",
    company: "ICT Academy of Kerala",
    date: "March 2026",
    description: "Participated in an intensive internship focusing on ML and AI. Gained hands-on experience in building intelligent data models.",
    icon: <Award size={20} />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Flutter Development Workshop",
    company: "Zoople Technologies",
    date: "2026",
    description: "Successfully completed a hands-on workshop actively engaging in discussions, activities, and collaborative exercises on Flutter Development.",
    icon: <GraduationCap size={20} />,
    color: "from-blue-500 to-cyan-500",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full bg-black overflow-hidden text-white px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24 border-t border-white/5">
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        
        {/* Label */}
        <div className="relative flex items-center justify-center gap-4 mb-5 opacity-0 animate-[fadeSlideDown_0.8s_ease_forwards]">
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.45em] text-white/35 font-mono">
            My Journey
          </span>
          <div className="relative overflow-hidden">
            <div className="w-10 h-px bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[lineMove_2s_linear_infinite]" />
          </div>
        </div>

        {/* Heading */}
        <div className="relative overflow-hidden mb-16">
          <h2
            className="text-center font-black tracking-tight leading-none drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] text-white opacity-0 animate-[headingReveal_1s_cubic-bezier(0.22,1,0.36,1)_0.15s_forwards]"
            style={{ fontSize: "clamp(28px, 5vw, 64px)" }}
          >
            <span className="inline-block bg-gradient-to-b from-white via-white to-white/45 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative w-full">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={exp.id}
                className="relative flex items-center justify-between md:justify-normal w-full mb-12 opacity-0"
                style={{
                  animation: `fadeSlideUp 0.8s ease ${0.2 + (index * 0.2)}s forwards`,
                }}
              >
                {/* Timeline Dot/Icon */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-black border border-white/20 z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <div className={`flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br ${exp.color} bg-opacity-20 text-white`}>
                    {exp.icon}
                  </div>
                </div>

                {/* Content Box */}
                <div className={`w-full pl-20 md:pl-0 md:w-1/2 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto"}`}>
                  <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 backdrop-blur-md">
                    <span className="inline-block px-3 py-1 mb-4 text-[10px] font-mono tracking-widest uppercase rounded-full bg-white/5 text-white/60 border border-white/10">
                      {exp.date}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                    <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">{exp.company}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes headingReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineMove {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
