import Image from "next/image";
import PipelineRunner from "@/components/PipelineRunner";
import SnakeGame from "@/components/SnakeGame";
import CicdAnimation from "@/components/CicdAnimation";

export default function Home() {
  const experiences = [
    {
      title: "DevOps Engineer",
      company: "DPTSI ITS",
      period: "January 2022 – Present",
      description: [
        "Architecting and scaling robust IT infrastructure for the entire ITS Campus ecosystem.",
        "Orchestrating complex CI/CD pipelines using GitHub Actions & Docker for mission-critical apps.",
        "Fine-tuning Kubernetes clusters and maintaining observability with Prometheus & Grafana.",
        "Managing enterprise identity and access management with Microsoft Entra ID and Active Directory."
      ],
      icon: "🚀"
    },
    {
      title: "Web Developer",
      company: "DPTSI ITS",
      period: "November 2019 – January 2022",
      description: [
        "Engineered internal university information systems with focus on performance and reliability.",
        "Championed Agile methodologies to accelerate feature delivery and team synergy."
      ],
      icon: "💻"
    },
    {
      title: "Software Engineer",
      company: "PT Infodata Solusi Cipta",
      period: "August 2018 – November 2019",
      description: [
        "Developed ERP solutions for web and desktop environments.",
        "Managed and optimized server infrastructures to ensure high availability and streamlined production releases."
      ],
      icon: "🛠️"
    }
  ];

  const certifications = [
    { name: "Google Cloud Associate Cloud Engineer", provider: "Google Cloud", year: "2025", icon: "☁️" },
    { name: "OCI Certified Foundations Associate", provider: "Oracle", year: "2025", icon: "🅾️" },
    { name: "AWS Certified Solutions Architect – Associate", provider: "Amazon Web Services", year: "2023", icon: "🅰️" },
    { name: "Zend PHP Certified Engineer", provider: "Zend", year: "2021", icon: "🐘" }
  ];

  const publications = [
    { title: "Anomaly Detection in Application Logs with Attention Mechanism-Enhanced LSTM", year: "2025" },
    { title: "Comparative Analysis of SVM and IndoBERT for Intent Classification in Indonesian Overtime Chatbots", year: "2024" },
    { title: "Optimization Techniques for Data Consistency and Throughput Using Kafka Stateful Stream Processing", year: "2024" },
    { title: "Analysis of Anomaly with Machine Learning Based Model for Detecting HTTP DDoS Attack", year: "2023" },
    { title: "Rancang Bangun Sistem Jemuran Pakaian Otomatis Menggunakan Metode Fuzzy Logic", year: "2019" }
  ];


  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-32 px-6 overflow-hidden min-h-[85vh]">
        {/* Mountain Silhouette Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-slate-900 to-transparent mountain-mask" />
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#1e293b" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        {/* Trail Path Glow */}
        <div className="absolute inset-0 trail-path pointer-events-none opacity-40" />
        
        <div className="relative z-10 max-w-4xl w-full animate-fade-in-up flex flex-col items-center md:items-start md:flex-row gap-12">
          {/* Profile Photo Space */}
          <div className="relative group shrink-0 self-center">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-trail-gold to-sky-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-800">
              <Image 
                src="/avatar.jpeg" 
                alt="Nusantara Profile" 
                width={224} 
                height={224}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-6 inline-block px-4 py-1.5 rounded-full glass border-emerald-500/20 text-emerald-400 text-sm font-medium tracking-wide">
               Scalable Cloud & IT Infrastructure Architect
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Hi, I&apos;m <span className="text-gradient">Adetiya Bagus Nusantara</span> ⛰️
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl leading-relaxed mb-8">
              DevOps Engineer passionate about building reliable systems and automating the boring stuff. I enjoy solving infrastructure puzzles and making deployments feel effortless.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="https://github.com/bagusnusantara" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30_rgba(16,185,129,0.5)] inline-flex items-center gap-2 group/btn"
              >
                <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub Profile
              </a>
              <a 
                href="https://www.linkedin.com/in/adetiya-bagus-nusantara-684688112/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 glass glass-hover text-white rounded-xl font-semibold inline-flex items-center gap-2 group/btn"
              >
                <svg className="w-5 h-5 text-sky-400 transition-transform group-hover/btn:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Game Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-slate-950 to-transparent" />
        <div className="max-w-screen-2xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tighter">The Infrastructure Lab</h2>
          <p className="text-slate-400 mb-16 font-mono text-sm tracking-widest">AUTOMATION. RESILIENCE. DEPLOYMENT.</p>
          
          <div className="grid grid-cols-1 gap-16 items-start max-w-4xl mx-auto">
            <div className="flex flex-col gap-6 p-1 rounded-3xl bg-gradient-to-b from-emerald-500/10 to-transparent">
              <div className="flex items-center justify-between px-6 pt-4">
                <h3 className="text-sm font-black text-emerald-400 uppercase tracking-[0.3em]">Peak Runner</h3>
                <span className="text-[10px] text-slate-600 font-mono">STATUS: OPTIMAL</span>
              </div>
              <PipelineRunner />
            </div>
            <div className="flex flex-col gap-6 p-1 rounded-3xl bg-gradient-to-b from-trail-gold/10 to-transparent">
              <div className="flex items-center justify-between px-6 pt-4">
                <h3 className="text-sm font-black text-trail-gold uppercase tracking-[0.3em]">Wild Monitor</h3>
                <span className="text-[10px] text-slate-600 font-mono">STATUS: ACTIVE</span>
              </div>
              <SnakeGame />
            </div>
            <div className="flex flex-col gap-6 p-1 rounded-3xl bg-gradient-to-b from-sky-500/10 to-transparent">
              <div className="flex items-center justify-between px-6 pt-4">
                <h3 className="text-sm font-black text-sky-400 uppercase tracking-[0.3em]">Cloud Ascent</h3>
                <span className="text-[10px] text-slate-600 font-mono">STATUS: DEPLOYING</span>
              </div>
              <CicdAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto relative group">
        <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-trail-gold/50 to-transparent md:block hidden" />
        <h2 className="text-3xl font-bold mb-16 flex items-center gap-4">
          <span className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl border border-emerald-500/20 italic">03</span>
          Professional Experience
        </h2>
        
        <div className="grid gap-8">
          {experiences.map((exp, i) => (
            <div key={i} className="glass glass-hover p-10 rounded-3xl group transition-all duration-700 hover:border-emerald-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />
              <div className="flex flex-col md:flex-row justify-between mb-8 gap-4 relative z-10">
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
                    {exp.icon} {exp.title}
                  </h3>
                  <p className="text-emerald-400/80 font-bold tracking-widest text-sm mt-1 uppercase">@ {exp.company}</p>
                </div>
                <div className="text-slate-500 text-[10px] font-black tracking-[0.2em] bg-slate-900 shadow-inner self-start px-4 py-2 rounded-xl mb-4 md:mb-0">
                  {exp.period}
                </div>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-400 relative z-10">
                {exp.description.map((desc, d) => (
                  <li key={d} className="flex gap-4 text-sm leading-relaxed">
                    <span className="text-emerald-500 shrink-0 font-bold tracking-tighter">/</span>
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 px-6 bg-slate-900/10 relative overflow-hidden">
        <div className="absolute inset-0 mountain-mask opacity-5 pointer-events-none rotate-180" />
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 flex items-center gap-4 text-gradient uppercase italic">
            Technical Certifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, i) => (
              <div key={i} className="glass glass-hover p-8 rounded-3xl flex items-center gap-8 group">
                <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-500 shadow-inner">
                  {cert.icon}
                </div>
                <div>
                  <h4 className="font-black text-lg text-white leading-tight mb-2 uppercase tracking-tight group-hover:text-emerald-400 transition-colors">{cert.name}</h4>
                  <p className="text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase">{cert.provider} / {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto relative">
        <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-emerald-500/50 to-transparent md:block hidden" />
        <h2 className="text-3xl font-bold mb-16 flex items-center gap-4">
          <span className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 text-xl border border-sky-500/20 italic">04</span>
          Research Publications
        </h2>
        
        <div className="grid gap-6">
          {publications.map((pub, i) => (
            <div key={i} className="glass glass-hover p-8 rounded-3xl group transition-all duration-700 hover:border-sky-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-sky-500/10 transition-colors" />
              <div className="flex flex-col md:flex-row justify-between gap-4 relative z-10">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors leading-tight mb-3">
                    {pub.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                    <span className="px-3 py-1 bg-slate-900 rounded-lg">{pub.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="https://scholar.google.com/citations?user=MkeN6AYAAAAJ&hl=id&oi=ao"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass glass-hover text-sky-400 rounded-xl font-semibold text-sm group/link"
          >
            <svg className="w-5 h-5 transition-transform group-hover/link:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 9a8 8 0 017.162 4.44L24 9.5z"/>
            </svg>
            View Full Google Scholar Profile
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-slate-900 text-center relative overflow-hidden">
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <div className="text-3xl font-black italic tracking-tighter text-gradient opacity-50 uppercase">Nusantara</div>
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.5em] leading-[2]">
            Endurance in Code / Resilience in Infrastructure / Peaks in Life<br />
            © 2026 Adetiya Bagus Nusantara / No Bugs, Just Trails
          </p>
        </div>
      </footer>
    </div>
  );
}
