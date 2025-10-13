import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Users,
  Calendar,
  Lightbulb,
  Globe,
  Target,
  Handshake,
  BookOpen,
  Shield,
  GraduationCap,
  Menu,
  Sun,
  Moon,
} from "lucide-react";

// Notifications for ticker
const TICKER_NOTIFICATIONS = [
  { id: 1, text: "Admissions open for Winter 2025 — Enroll now!", href: "/admissions" },
  { id: 2, text: "Upcoming: SkillHack Summit — Register today", href: "/events" },
  { id: 3, text: "New: Global Diploma in AI — Apply", href: "/courses/ai" },
];

// Intersection observer hook for appear-on-scroll
const useLazyObserver = (threshold = 0.15) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
};

// Animated counter
const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let started = false;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const duration = 1800;
          const stepTime = 16;
          const steps = Math.max(1, Math.round(duration / stepTime));
          const increment = value / steps;
          let cur = 0;
          const run = () => {
            cur += increment;
            if (cur < value) {
              setCount(Math.floor(cur));
              requestAnimationFrame(run);
            } else {
              setCount(value);
            }
          };
          requestAnimationFrame(run);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
      {count}
      {suffix}
    </div>
  );
};

export const HomePage: React.FC = () => {
  // Sections observer
  const [aboutRef, aboutVisible] = useLazyObserver();
  const [programsRef, programsVisible] = useLazyObserver();
  const [galleryRef, galleryVisible] = useLazyObserver();
  const [testRef, testVisible] = useLazyObserver();
  const [contactRef, contactVisible] = useLazyObserver();

  // Theme toggle
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem("iiesp-theme") as "light" | "dark") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("iiesp-theme", theme);
  }, [theme]);

  // Ticker pause hover
  const [tickerPaused, setTickerPaused] = useState(false);

  // Programs marquee
  const programs = ["AI & ML", "Web Development", "Data Science", "Cybersecurity", "Cloud & DevOps", "UI/UX Design"];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center font-bold">II</div>
            <div className="hidden sm:block">
              <div className="font-semibold">IIESP</div>
              <div className="text-xs text-muted-foreground">Certifications & Diplomas</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-primary">Home</Link>
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#programs" className="hover:text-primary">Programs</a>
            <a href="#gallery" className="hover:text-primary">Gallery</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>

            <button className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification ticker */}
        <div
          className={`w-full border-t border-gray-200 dark:border-gray-800 overflow-hidden`}
          onMouseEnter={() => setTickerPaused(true)}
          onMouseLeave={() => setTickerPaused(false)}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center gap-4">
            <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded-sm">Notifications</div>
            <div className="flex-1 overflow-hidden">
              <div
                className="inline-flex whitespace-nowrap gap-12 items-center will-change-transform"
                style={{
                  animation: `${tickerPaused ? "none" : "ticker 22s linear infinite"}`,
                  transform: tickerPaused ? "translateX(0)" : undefined,
                }}
                role="list"
              >
                {TICKER_NOTIFICATIONS.concat(TICKER_NOTIFICATIONS).map((n, i) => (
                  <a
                    key={i}
                    href={n.href}
                    className="text-sm text-muted-foreground hover:text-primary transition"
                    role="listitem"
                  >
                    {n.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes ticker {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </header>

      {/* PAGE CONTENT */}
      <main className="pt-28">
        {/* HERO */}
<section className="relative min-h-[80vh] flex items-center px-4 md:px-8 lg:px-20 overflow-hidden">
  {/* Top-right colorful shadow/glow */}
  <div className="absolute -right-32 top-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 opacity-30 blur-3xl animate-pulse-slow -z-10"></div>

  {/* Bottom-right secondary shadow/glow */}
  <div className="absolute -right-20 bottom-0 w-[400px] h-[400px] rounded-tl-full bg-gradient-to-tl from-pink-500 to-yellow-400 opacity-25 blur-2xl animate-pulse-slow -z-10"></div>

  <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 w-full transition-all duration-1000 transform opacity-0 translate-y-10 animate-hero-fade-in">
    {/* Left text */}
    <div className="md:w-1/2 text-center md:text-left z-10">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-up">
        <span className="block text-gradient">IIESP</span>
        A unified hub for certifications & professional growth
      </h1>
      <p className="text-lg text-muted-foreground mb-6 animate-fade-up animate-delay-200">
        Learn from industry experts, join curated events, build real projects and earn credentials that employers trust.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start animate-fade-up animate-delay-400">
        <Link to="/register">
          <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-2">
            Start Learning <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link to="/courses">
          <Button size="lg" variant="outline">Explore Programs</Button>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 animate-fade-up animate-delay-600">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <Award className="w-5 h-5 text-primary" /> <span className="text-sm">Certified Programs</span>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <Users className="w-5 h-5 text-primary" /> <span className="text-sm">Global Community</span>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <Calendar className="w-5 h-5 text-primary" /> <span className="text-sm">Live Events</span>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <Target className="w-5 h-5 text-primary" /> <span className="text-sm">Career Focused</span>
        </div>
      </div>
    </div>

    {/* Right hero image */}
    <div className="md:w-1/2 relative flex justify-center md:justify-end animate-fade-up animate-delay-800">
      <div className="w-full h-[400px] md:h-[520px] rounded-[40px_10px_50px_10px] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
        <img
          src="iiesp-0.png"
          alt="hero"
          className="w-full h-full object-cover"
          style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)" }}
        />
      </div>
    </div>
  </div>

  <style>{`
    .text-gradient {
      background: linear-gradient(90deg,#3b82f6,#9333ea);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @keyframes heroFadeIn {
      0% { opacity: 0; transform: translateY(40px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-hero-fade-in {
      animation: heroFadeIn 1s ease-out forwards;
    }

    @keyframes fadeUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
    .animate-delay-200 { animation-delay: 0.2s; }
    .animate-delay-400 { animation-delay: 0.4s; }
    .animate-delay-600 { animation-delay: 0.6s; }
    .animate-delay-800 { animation-delay: 0.8s; }

    @keyframes pulseSlow {
      0%, 100% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.05); opacity: 0.4; }
    }
    .animate-pulse-slow {
      animation: pulseSlow 6s ease-in-out infinite;
    }
  `}</style>
</section>


        {/* ABOUT */}
        <section
          id="about"
          ref={aboutRef as any}
          className={`py-20 px-4 md:px-8 lg:px-20 transition-all duration-700 ${aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">About IIESP</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Integrated Institute for Education, Skills & Professionalism — bridging education and industry through practical programs and verified credentials.
            </p>
          </div>

          {/* Counters */}
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Programs", val: 60, icon: <BookOpen className="w-6 h-6 text-primary" /> },
              { label: "Events", val: 30, icon: <Calendar className="w-6 h-6 text-primary" /> },
              { label: "Learners", val: 12000, icon: <Users className="w-6 h-6 text-primary" /> },
              { label: "Partners", val: 200, icon: <Handshake className="w-6 h-6 text-primary" /> },
            ].map((s, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow">
                <div className="flex justify-center mb-3">{s.icon}</div>
                <AnimatedCounter value={s.val} />
                <div className="text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Why boxes */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Career Growth", desc: "Aligned programs to boost employability.", icon: <Target className="w-6 h-6 text-primary" /> },
              { title: "Skill Events", desc: "Workshops, bootcamps and summits.", icon: <Calendar className="w-6 h-6 text-primary" /> },
              { title: "Innovation", desc: "Project-based learning and capstones.", icon: <Lightbulb className="w-6 h-6 text-primary" /> },
              { title: "Global Network", desc: "Industry & academic collaborations.", icon: <Globe className="w-6 h-6 text-primary" /> },
            ].map((b, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow hover:shadow-lg transition">
                <div className="flex items-center justify-center mb-4">{b.icon}</div>
                <h3 className="font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROGRAMS MARQUEE */}
        <section
          id="programs"
          ref={programsRef as any}
          className={`py-16 px-4 md:px-8 lg:px-20 transition-all duration-700 ${programsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="max-w-6xl mx-auto mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Programs</h2>
          </div>

          <div className="overflow-hidden">
            <div className="flex gap-6 items-center animate-marquee-box will-change-transform" style={{ width: "max-content" }}>
              {[...programs, ...programs].map((p, i) => (
                <div key={i} className="flex-none w-64 md:w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow">
                  <h3 className="font-semibold text-lg text-primary mb-2">{p}</h3>
                  <p className="text-sm text-muted-foreground">Industry-aligned curriculum & projects.</p>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes marquee-box {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee-box {
              display: flex;
              gap: 1.5rem;
              animation: marquee-box 22s linear infinite;
            }
            @media (max-width: 768px) {
              .animate-marquee-box { animation-duration: 26s; }
            }
          `}</style>
        </section>

        {/* GALLERY */}
        <section
          id="gallery"
          ref={galleryRef as any}
          className={`py-16 px-4 md:px-8 lg:px-20 ${galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} transition-all duration-700`}
        >
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Learning in Action</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition">
                <img src={`https://source.unsplash.com/random/800x600?sig=${i}&education`} alt={`gallery-${i}`} className="w-full h-60 object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          ref={testRef as any}
          className={`py-16 px-4 md:px-8 lg:px-20 ${testVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} transition-all duration-700`}
        >
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Testimonials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Learners and industry leaders share their experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { name: "Aisha Verma", role: "Graduate", text: "IIESP helped me land my first job.", icon: <GraduationCap className="w-6 h-6 text-primary" /> },
              { name: "Rohit Sharma", role: "Industry Mentor", text: "Hands-on programs are really impactful.", icon: <Shield className="w-6 h-6 text-primary" /> },
              { name: "Sneha Patel", role: "Learner", text: "Amazing community and projects!", icon: <Users className="w-6 h-6 text-primary" /> },
            ].map((t, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow hover:shadow-lg transition">
                <div className="flex justify-center mb-3">{t.icon}</div>
                <p className="text-sm text-muted-foreground mb-3">"{t.text}"</p>
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          ref={contactRef as any}
          className={`py-16 px-4 md:px-8 lg:px-20 ${contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} transition-all duration-700`}
        >
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Get in Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Have questions? Drop us a message and we will respond promptly.</p>
          </div>

          <form className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Name" className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            <input type="email" placeholder="Email" className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            <input type="text" placeholder="Subject" className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 md:col-span-2" />
            <textarea placeholder="Message" rows={5} className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 md:col-span-2"></textarea>
            <Button size="lg" className="md:col-span-2 w-full bg-gradient-to-r from-primary to-secondary text-white">Send Message</Button>
          </form>
        </section>
      </main>
    </div>
  );
};
