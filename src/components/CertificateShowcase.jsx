import { ExternalLink, Award } from "lucide-react";

const certificates = [
  {
    title: "Machine Learning and Artificial Intelligence Internship",
    issuer: "ICT Academy of Kerala",
    date: "Mar 2026",
    description: "Completed a one-month internship project in Machine Learning and Artificial Intelligence with the ICT Academy of Kerala.",
    link: "/ict-internship.png",
    image: "/ict-internship.png",
  },
  {
    title: "Career Orientation on Cybersecurity",
    issuer: "Technovalley Software India",
    date: "Mar 2026",
    description: "Successfully participated in the 5-Day Career Orientation on Cybersecurity conducted by Technovalley Software India Pvt. Ltd.",
    link: "/cybersecurity.png",
    image: "/cybersecurity.png",
  },
  {
    title: "Flutter Development Workshop",
    issuer: "Zoople Technologies",
    date: "Nov 2024",
    description: "Successfully completed a one-day workshop actively engaging in discussions, activities, and collaborative exercises on Flutter Development.",
    link: "/flutter-zoople.jpeg",
    image: "/flutter-zoople.jpeg",
  },
  {
    title: "Data Science & AI-ML Workshop",
    issuer: "Zoople Technologies",
    date: "Feb 2025",
    description: "Successfully completed a one-day workshop actively engaging in discussions, activities, and collaborative exercises on Data Science and AI-ML.",
    link: "/ds-aiml-zoople.jpeg",
    image: "/ds-aiml-zoople.jpeg",
  },
];

function CertificateCard({ item }) {
  return (
    <div
      className="group relative rounded-2xl border border-white/15 overflow-hidden bg-white/[0.06]
      hover:border-white/25 transition-all duration-500
      hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 backdrop-blur-md flex flex-col h-full"
      style={{ backdropFilter: "blur(20px)" }}
    >
      {/* Gradient Top Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500/60 via-orange-500/60 to-yellow-500/60 shrink-0" />

      {/* Optional Image */}
      {item.image && (
        <div className="w-full h-48 overflow-hidden border-b border-white/10 shrink-0 bg-black/50">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-6 space-y-4 flex flex-col flex-1">
        {/* Header with Icon */}
        <div className="flex items-start justify-between">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-yellow-500/80 group-hover:text-yellow-400 transition-colors">
            <Award size={20} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono border border-white/10 px-3 py-1 rounded-full bg-white/5">
            {item.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed line-clamp-3 min-h-[60px]">
          {item.description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
          <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
            {item.issuer}
          </span>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full
            bg-white/5 border border-white/15 text-white/60
            hover:bg-white/10 hover:text-white hover:border-white/30
            transition-all duration-200 active:scale-95 shrink-0 ml-2"
            aria-label={`View ${item.title} certificate`}
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CertificateShowcase() {
  return (
    <div className="w-full">
      {/* Slider of Certificates */}
      <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
        {certificates.map((item, i) => (
          <div
            key={i}
            className="opacity-0 shrink-0 w-[85vw] sm:w-[340px] snap-center"
            style={{
              animation: `fadeSlideUp 0.5s ease ${i * 0.1}s forwards`,
            }}
          >
            <CertificateCard item={item} />
          </div>
        ))}
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
