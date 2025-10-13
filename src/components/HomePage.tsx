import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Award, BookOpen, ArrowRight, Users, Globe, Clock, Lightbulb, Handshake } from "lucide-react";

// Lazy observer hook
const useLazyObserver = (options = { threshold: 0.15 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);
  return [ref, visible];
};
// Counter component
const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          let start = 0;
          const duration = 2000; // 2 seconds
          const increment = value / (duration / 16);
          const step = () => {
            start += increment;
            if (start < value) {
              setCount(Math.floor(start));
              requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref} className="text-4xl font-extrabold text-primary mb-2">{count}+</div>;
};

export const HomePage = () => {
  const [aboutRef, aboutVisible] = useLazyObserver();
  const [coursesRef, coursesVisible] = useLazyObserver();
  const [galleryRef, galleryVisible] = useLazyObserver();
  const [testimonialRef, testimonialVisible] = useLazyObserver();
  const [contactRef, contactVisible] = useLazyObserver();

  return (
    <div className="w-full bg-gray-50 text-gray-900 antialiased">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-50 to-white overflow-hidden px-6 md:px-20">
        <div className="w-full md:w-1/2 flex flex-col items-start z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gradient">
            <span className="block">IIESP</span>
            <span className="text-primary">Empowering Your Future</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-lg text-gray-700">
            A unified hub for certifications, diplomas, and hands-on projects bridging education and employability.
          </p>
          <div className="flex gap-4 mb-8">
            <Link to="/register">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-secondary text-white">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline">
                Explore Courses
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {[
              { icon: <Award className="w-6 h-6 text-primary" />, title: "Certified Programs" },
              { icon: <Users className="w-6 h-6 text-primary" />, title: "Global Community" },
              { icon: <BookOpen className="w-6 h-6 text-primary" />, title: "Expert Mentors" },
              { icon: <ArrowRight className="w-6 h-6 text-primary" />, title: "Career Ready" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow hover:shadow-lg transition">
                {item.icon} <span className="font-medium">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 relative">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[50px] [clip-path:polygon(10%_0%,90%_0%,100%_10%,100%_90%,90%_100%,10%_100%,0%_90%,0%_10%)] animate-fade-in shadow-2xl"></div>
          <img
            src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
            alt="Learning"
            className="relative w-full h-[400px] md:h-[500px] object-cover rounded-[30px] shadow-xl"
          />
        </div>
      </section>

     {/* About Us + Why IIESP Section */}
<section
  ref={aboutRef}
  className={`py-28 px-6 md:px-20 bg-gradient-to-b from-white to-muted/10 transition-all duration-700 ${
    aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`}
>
  {/* Section Header */}
  <div className="max-w-6xl mx-auto text-center mb-20">
    <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-primary">About IIESP</h2>
    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
      IIESP (Integrated Institute for Education, Skills, and Professionalism) is a unified learning ecosystem designed to empower learners with practical knowledge, industry-aligned programs, and globally recognized credentials. Our mission is to bridge the gap between education and employability.
    </p>
  </div>

  {/* About Stats */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-24 text-center">
    {[
      { value: "50+", label: "Certified Programs" },
      { value: "100+", label: "Expert Mentors" },
      { value: "10k+", label: "Global Learners" },
      { value: "500+", label: "Hands-On Projects" },
    ].map((stat, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-2 will-appear"
        style={{ transitionDelay: `${i * 150}ms` }}
      >
        <div className="text-4xl font-extrabold text-primary mb-2">{stat.value}</div>
        <div className="text-gray-600">{stat.label}</div>
      </div>
    ))}
  </div>

  {/* Why IIESP Cards */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
    {[
      {
        title: "Career Growth",
        desc: "Programs designed with industry input ensuring your learning translates into real-world opportunities.",
        icon: "🎯",
      },
      {
        title: "Expert Mentors",
        desc: "Learn from professionals with proven experience guiding your path to excellence.",
        icon: "👨‍🏫",
      },
      {
        title: "Hands-On Learning",
        desc: "Engage in live projects, capstones, and assignments to develop practical skills.",
        icon: "🛠️",
      },
      {
        title: "Global Community",
        desc: "Connect and collaborate with learners, educators, and organizations worldwide.",
        icon: "🌍",
      },
      {
        title: "Verified Credentials",
        desc: "Earn certificates and diplomas recognized by industry and institutions.",
        icon: "📜",
      },
      {
        title: "Flexible Learning",
        desc: "Study at your own pace with online and hybrid program options.",
        icon: "⏰",
      },
      {
        title: "Innovative Curriculum",
        desc: "Our curriculum is updated regularly to meet modern industry standards.",
        icon: "💡",
      },
      {
        title: "Supportive Ecosystem",
        desc: "Get mentoring, peer collaboration, and placement support at every step.",
        icon: "🤝",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-3 will-appear text-center"
        style={{ transitionDelay: `${i * 100}ms` }}
      >
        <div className="text-5xl mb-4">{item.icon}</div>
        <h3 className="font-bold text-xl mb-3">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.desc}</p>
      </div>
    ))}
  </div>
</section>


      {/* Courses Section */}
      <section
        ref={coursesRef}
        className={`py-20 px-6 md:px-20 transition-all duration-700 ${coursesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Our Programs</h2>

        {/* Boxed marquee container */}
        <div className="overflow-hidden relative bg-muted/20 p-6 rounded-2xl shadow-inner">
          <div className="flex gap-6 animate-marquee-box">
            {["AI & ML", "Web Development", "Design Thinking", "Cloud & DevOps", "Cybersecurity", "Data Science"].map(
              (course, i) => (
                <div
                  key={i}
                  className="flex-none w-64 md:w-72 bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 border border-border"
                >
                  <h3 className="font-bold text-xl mb-2">{course}</h3>
                  <p className="text-gray-600 text-sm">Hands-on practical training for real-world applications.</p>
                </div>
              )
            )}

            {/* Repeat same items for seamless loop */}
            {["AI & ML", "Web Development", "Design Thinking", "Cloud & DevOps", "Cybersecurity", "Data Science"].map(
              (course, i) => (
                <div
                  key={`dup-${i}`}
                  className="flex-none w-64 md:w-72 bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 border border-border"
                >
                  <h3 className="font-bold text-xl mb-2">{course}</h3>
                  <p className="text-gray-600 text-sm">Hands-on practical training for real-world applications.</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>


      {/* Gallery Section */}
      <section
        ref={galleryRef}
        className={`py-20 px-6 md:px-20 transition-all duration-700 ${galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Learning in Action</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["ai", "learning", "classroom", "students", "teacher", "graduation"].map((topic, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer"
            >
              <img
                src={`https://source.unsplash.com/800x600/?${topic}`}
                alt={topic}
                className="w-full h-72 md:h-80 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialRef}
        className={`py-20 px-6 md:px-20 transition-all duration-700 ${testimonialVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Testimonials</h2>
        {/* Students Carousel */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { name: "Aisha Verma", text: "Certification helped me land my dream job!" },
            { name: "Rahul Singh", text: "Top-notch instructors and community support." },
            { name: "Maya Dutta", text: "Bridges gap between education and employment." },
          ].map((t, i) => (
            <div key={i} className="flex-none w-80 bg-white rounded-xl shadow p-6 hover:shadow-2xl transition transform hover:-translate-y-2">
              <p className="text-gray-700 mb-4">“{t.text}”</p>
              <h4 className="font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>

        {/* Industry Experts */}
        <h3 className="text-3xl md:text-4xl font-bold text-center my-12">Industry Experts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            { name: "Dr. Neha Sharma", title: "AI Specialist, Google", text: "IIESP programs are highly practical." },
            { name: "Mr. Vikram Singh", title: "CTO, TechNext", text: "Bridges academic learning with industry skills." },
            { name: "Ms. Priya Nair", title: "Lead Designer, Creative Labs", text: "Hands-on experience is invaluable." },
          ].map((t, i) => (
            <div key={i} className="bg-primary/5 p-8 rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-3 text-center">
              <h4 className="font-bold text-lg mb-1">{t.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{t.title}</p>
              <p className="italic">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        className={`py-20 px-6 md:px-20 transition-all duration-700 ${contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Contact Us</h2>
        <p className="text-gray-700 text-center mb-10 max-w-xl mx-auto">
          Have questions? Reach out to our support team or drop us a message below.
        </p>
        <form className="max-w-lg mx-auto space-y-4 bg-white p-8 rounded-xl shadow-lg">
          <input type="text" placeholder="Your Name" className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-primary" />
          <input type="email" placeholder="Your Email" className="w-full border rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-primary" />
          <textarea placeholder="Message" className="w-full border rounded-lg p-4 h-36 shadow-sm focus:ring-2 focus:ring-primary" />
          <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 font-semibold rounded-lg hover:from-secondary hover:to-primary">
            Send Message
          </Button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
            <h4 className="font-bold mb-4">IIESP</h4>
            <p>Empowering learners worldwide with skill-focused, industry-relevant education.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul>
              {["Home", "Courses", "About", "Contact"].map((link, i) => (
                <li key={i} className="hover:text-primary transition cursor-pointer">{link}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <a key={social} href={`https://${social}.com`} target="_blank" rel="noreferrer" className="hover:text-primary transition">{social.charAt(0).toUpperCase() + social.slice(1)}</a>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center mt-12 text-sm text-gray-500">© {new Date().getFullYear()} IIESP. All rights reserved.</p>
      </footer>

      {/* Inline CSS */}
      <style>{`
        .text-gradient {
          background: linear-gradient(90deg, #3b82f6, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .animate-fade-in { animation: fadeIn 1.2s ease-out both; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
         @keyframes marquee-box {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .animate-marquee-box {
      display: flex;
      gap: 1.5rem;
      animation: marquee-box 20s linear infinite;
      width: max-content;
    }

    @media (max-width: 768px) {
      .animate-marquee-box {
        animation: marquee-box 25s linear infinite;
      }
    }
  `}</style>
    </div>
  );
};
