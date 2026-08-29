"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../components/header/page";
import {
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cloud,
  Database,
  Globe2,
  Layers3,
  Mail,
  MessageCircle,
  PenTool,
  Phone,
  Rocket,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const BASE_PATH = "/velocity_webtech_solution";

const services = [
  {
    title: "Website Development",
    text: "Responsive, fast, and SEO-friendly websites and web applications.",
    icon: Globe2,
    tone: "blue",
  },
  {
    title: "Mobile App Development",
    text: "Modern Android and iOS applications with smooth user experiences.",
    icon: Smartphone,
    tone: "green",
  },
  {
    title: "Custom Software Development",
    text: "Business-specific software solutions and automation systems.",
    icon: Code2,
    tone: "violet",
  },
  {
    title: "E-commerce Development",
    text: "Powerful online stores with secure payment integration.",
    icon: ShoppingCart,
    tone: "orange",
  },
  {
    title: "UI/UX Design",
    text: "Clean, attractive, and user-friendly digital experiences.",
    icon: Layers3,
    tone: "cyan",
  },
  {
    title: "API & Backend Development",
    text: "Secure and scalable APIs, databases, and backend systems.",
    icon: Server,
    tone: "indigo",
  },
  {
    title: "Cloud & Deployment Services",
    text: "Deployment, hosting, maintenance, and cloud solutions.",
    icon: Cloud,
    tone: "sky",
  },
];

const strengths = [
  { label: "Modern & Secure", icon: ShieldCheck },
  { label: "Scalable Solutions", icon: Rocket },
  { label: "Client Focused", icon: Users },
  { label: "Quality Assured", icon: BadgeCheck },
];

const heroStats = [
  { value: "7+", label: "Digital Services" },
  { value: "24/7", label: "Support" },
  { value: "100%", label: "Business Focused" },
];

const heroFeatures = [
  { title: "Web Apps", icon: Globe2 },
  { title: "Mobile Apps", icon: Smartphone },
  { title: "Cloud Launch", icon: Cloud },
];

const techChips = [
  "Next.js",
  "React",
  "React Native",
  "Flutter",
  "Django",
  "PostgreSQL",
  "RestAPI",
  "FastAPI",
  "AWS Cloud",
  "UI/UX",
];

const processSteps = [
  {
    title: "Discover",
    text: "Understand goals, users, and growth needs.",
    icon: Sparkles,
  },
  {
    title: "Design",
    text: "Shape clean UI flows and product structure.",
    icon: PenTool,
  },
  {
    title: "Develop",
    text: "Build reliable frontend, backend, and APIs.",
    icon: Code2,
  },
  {
    title: "Deploy",
    text: "Launch, host, maintain, and scale securely.",
    icon: Rocket,
  },
];

const aboutHighlights = [
  {
    title: "Business-first strategy",
    text: "Every website, app, and software workflow is planned around your goals.",
    icon: Users,
  },
  {
    title: "Secure scalable systems",
    text: "Clean code, strong backend foundations, and deployment-ready architecture.",
    icon: ShieldCheck,
  },
  {
    title: "Launch-ready delivery",
    text: "From UI/UX to cloud deployment, your product is built for real users.",
    icon: Rocket,
  },
];

const aboutMetrics = [
  { value: "01", label: "Clear discovery" },
  { value: "02", label: "Smart execution" },
  { value: "03", label: "Reliable launch" },
];

const developerImage = (fileName) =>
  `${BASE_PATH}/image/developers/${fileName}`;

const developers = [
  {
    name: "Rohan Sen",
    designation: "Frontend Developer",
    image: developerImage("dev_1.avif"),
    skills: ["React", "Next.js", "UI Animation"],
  },
  {
    name: "Priya Sharma",
    designation: "Backend Developer",
    image: developerImage("dev_3.avif"),
    skills: ["APIs", "Database", "Security"],
  },
  {
    name: "Arjun Mehta",
    designation: "Mobile App Developer",
    image: developerImage("dev_2.jpg"),
    skills: ["Android", "iOS", "App UX"],
  },
  {
    name: "Nisha Roy",
    designation: "UI/UX Designer",
    image: developerImage("developer-4.svg"),
    skills: ["Wireframes", "Design System", "Prototype"],
  },
  {
    name: "Sayan Das",
    designation: "Cloud Engineer",
    image: developerImage("developer-5.svg"),
    skills: ["Hosting", "CI/CD", "Monitoring"],
  },
  // {
  //   name: "Ananya Gupta",
  //   designation: "Full Stack Developer",
  //   image: developerImage("developer-6.svg"),
  //   skills: ["Frontend", "Backend", "Deployment"],
  // },
];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact Us", href: "#contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [contactStatus, setContactStatus] = useState({
    type: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [activeDeveloper, setActiveDeveloper] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const developerCount = developers.length;
  const lastDeveloperIndex = Math.max(developerCount - 1, 0);
  const activeDeveloperIndex = Math.min(activeDeveloper, lastDeveloperIndex);

  function showPreviousDeveloper() {
    setActiveDeveloper((current) => {
      if (developerCount === 0) {
        return 0;
      }

      return current === 0 ? lastDeveloperIndex : current - 1;
    });
  }

  function showNextDeveloper() {
    setActiveDeveloper((current) => {
      if (developerCount === 0) {
        return 0;
      }

      return current >= lastDeveloperIndex ? 0 : current + 1;
    });
  }

  function getDeveloperSlideClass(index) {
    const previous =
      activeDeveloperIndex === 0
        ? lastDeveloperIndex
        : activeDeveloperIndex - 1;
    const next =
      activeDeveloperIndex === lastDeveloperIndex
        ? 0
        : activeDeveloperIndex + 1;

    if (index === activeDeveloperIndex) {
      return "active";
    }

    if (index === previous) {
      return "previous";
    }

    if (index === next) {
      return "next";
    }

    return "hidden";
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    setActiveDeveloper((current) =>
      current > lastDeveloperIndex ? lastDeveloperIndex : current,
    );
  }, [lastDeveloperIndex]);

  useEffect(() => {
    if (developerCount === 0) {
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return undefined;
    }

    const slideTimer = window.setInterval(() => {
      setActiveDeveloper((current) =>
        current >= lastDeveloperIndex ? 0 : current + 1,
      );
    }, 3500);

    return () => window.clearInterval(slideTimer);
  }, [developerCount, lastDeveloperIndex]);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 360);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleContactSubmit(event) {
    event.preventDefault();
    setContactStatus({
      type: "success",
      message: "This contact form is currently not connected to a backend.",
    });
  }

  return (
    <main>
      <Header />

      <section id="home" className="hero">
        <motion.div
          className="hero-pulse hero-pulse-one"
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-pulse hero-pulse-two"
          animate={{ y: [0, -20, 0], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <Image
          src={`${BASE_PATH}/image/banner_new.png`}
          alt="Velocity Webtech digital solutions banner"
          className="hero-bg"
          width={1942}
          height={809}
          priority
        />
        <div className="hero-overlay" />
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerGroup}
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            <Sparkles size={18} />
            Software Development Services
          </motion.p>
          <motion.h2 variants={fadeUp}>Velocity Webtech Solution</motion.h2>
          <motion.p className="hero-copy" variants={fadeUp}>
            Reliable and innovative digital solutions that help businesses grow
            with modern, scalable, secure, and tailored software.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <motion.a
              className="primary-button"
              href="#contact"
              whileHover={{
                y: -3,
                boxShadow: "0 22px 45px rgba(0, 126, 255, 0.34)",
              }}
              whileTap={{ scale: 0.96 }}
            >
              Let&apos;s Build
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              className="secondary-button"
              href="#services"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              Explore Services
            </motion.a>
          </motion.div>
          <motion.div className="hero-stats" variants={fadeUp}>
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-showcase"
          initial={{ opacity: 0, x: 42, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        >
          <motion.div
            className="launch-card"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="launch-icon">
              <Rocket size={28} />
            </span>
            <div>
              <strong>Launch Ready</strong>
              <span>Idea to powerful digital product</span>
            </div>
          </motion.div>

          <div className="hero-feature-grid">
            {heroFeatures.map(({ title, icon: Icon }, index) => (
              <motion.div
                className="hero-feature-card"
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + index * 0.12 }}
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <Icon size={24} />
                <span>{title}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="tech-strip"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
          >
            {techChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="trust-band" aria-label="Business strengths">
        {strengths.map(({ label, icon: Icon }, index) => (
          <motion.div
            className="trust-item"
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ backgroundColor: "#06224a" }}
          >
            <Icon size={22} />
            <span>{label}</span>
          </motion.div>
        ))}
      </section>

      <section id="services" className="section services-section">
        <motion.div
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="eyebrow">
            <Zap size={18} />
            Our Services
          </p>
          <h2>
            From idea to launch, we turn your vision into powerful digital
            solutions.
          </h2>
        </motion.div>

        <motion.div
          className="service-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={staggerGroup}
        >
          {services.map(({ title, text, icon: Icon, tone }, index) => (
            <motion.article
              className={`service-card ${tone}`}
              key={title}
              variants={fadeUp}
              transition={{ delay: index * 0.05, duration: 0.45 }}
              whileHover={{
                y: -10,
                rotateX: 4,
                rotateY: index % 2 === 0 ? -4 : 4,
                scale: 1.02,
              }}
            >
              <span className="card-shine" />
              <span className="service-card-glow" />
              <div className="service-card-top">
                <div className="service-icon">
                  <Icon size={28} />
                </div>
                <span className="service-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="service-card-footer">
                <span>Build With Us</span>
                <ArrowRight size={17} />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section id="about" className="section about-section">
        <motion.div
          className="about-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerGroup}
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            <Sparkles size={18} />
            About Us
          </motion.p>
          <motion.h2 variants={fadeUp}>
            Digital products built with clarity, speed, and long-term
            reliability.
          </motion.h2>
          <motion.p variants={fadeUp}>
            We provide end-to-end software development for growing businesses,
            combining clean interfaces, secure backend systems, scalable
            deployment, and practical automation.
          </motion.p>

          <motion.div className="about-highlight-grid" variants={staggerGroup}>
            {aboutHighlights.map(({ title, text, icon: Icon }) => (
              <motion.article
                className="about-highlight"
                key={title}
                variants={fadeUp}
                whileHover={{ x: 6 }}
              >
                <span>
                  <Icon size={20} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div className="about-metrics" variants={fadeUp}>
            {aboutMetrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="about-list" variants={fadeUp}>
            {processSteps.map(({ title, icon: Icon }) => (
              <motion.span key={title} whileHover={{ y: -3 }}>
                <Icon size={16} />
                {title}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="floating-badge top"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShieldCheck size={20} />
            Secure Code
          </motion.div>
          <div className="brochure-frame">
            <Image
              src={`${BASE_PATH}/image/Brochure.png`}
              alt="Velocity Webtech services brochure"
              width={1536}
              height={1024}
            />
          </div>
          <motion.div
            className="floating-badge bottom"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cloud size={20} />
            Cloud Ready
          </motion.div>
        </motion.div>
      </section>

      <section id="portfolio" className="section developer-portfolio-section">
        <motion.div
          className="section-heading centered"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="eyebrow">
            <Users size={18} />
            Developer Portfolio
          </p>
          <h2>Meet the developers behind our digital solutions.</h2>
        </motion.div>

        <motion.div
          className="developer-slider"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <button
            className="slider-control"
            type="button"
            onClick={showPreviousDeveloper}
            aria-label="Previous developer"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="developer-carousel-stage">
            {developers.map(({ name, designation, image, skills }, index) => (
              <motion.article
                className={`developer-slide ${getDeveloperSlideClass(index)}`}
                key={name}
                animate={getDeveloperSlideClass(index)}
                variants={{
                  active: {
                    x: 0,
                    z: 80,
                    rotateY: 0,
                    scale: 1,
                    opacity: 1,
                  },
                  previous: {
                    x: "-48%",
                    z: -80,
                    rotateY: 24,
                    scale: 0.82,
                    opacity: 0.58,
                  },
                  next: {
                    x: "48%",
                    z: -80,
                    rotateY: -24,
                    scale: 0.82,
                    opacity: 0.58,
                  },
                  hidden: {
                    x: 0,
                    z: -180,
                    rotateY: 0,
                    scale: 0.72,
                    opacity: 0,
                  },
                }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
              >
                <span className="developer-number">0{index + 1}</span>
                <div className="developer-photo-wrap">
                  <Image
                    src={image}
                    alt={`${name} profile`}
                    width={320}
                    height={320}
                  />
                </div>
                <div className="developer-copy">
                  <span className="developer-kicker">Team Member</span>
                  <h3>{name}</h3>
                  <p>{designation}</p>
                  <div className="developer-skills">
                    {skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <button
            className="slider-control"
            type="button"
            onClick={showNextDeveloper}
            aria-label="Next developer"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>

        <div className="developer-slider-dots" aria-label="Developer slides">
          {developers.map((developer, index) => (
            <button
              key={developer.name}
              className={index === activeDeveloperIndex ? "active" : ""}
              type="button"
              onClick={() => setActiveDeveloper(index)}
              aria-label={`Show ${developer.name}`}
              aria-current={index === activeDeveloperIndex}
            />
          ))}
        </div>
      </section>

      <section className="section process-section">
        <motion.div
          className="section-heading centered"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="eyebrow">
            <Database size={18} />
            Development Process
          </p>
          <h2>Simple steps, strong execution, measurable results.</h2>
        </motion.div>

        <div className="process-grid">
          {processSteps.map(({ title, text, icon: Icon }, index) => (
            <motion.article
              className="process-card"
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <span className="process-number">0{index + 1}</span>
              <span className="process-icon">
                <Icon size={30} />
              </span>
              <span className="process-connector" />
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <motion.div
          className="contact-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerGroup}
        >
          <motion.div className="contact-copy" variants={fadeUp}>
            <p className="eyebrow">
              <MessageCircle size={18} />
              Contact Us
            </p>
            <h2>Let&apos;s build something amazing together.</h2>
            <p>
              Tell us what you want to build, and we will help you shape it into
              a modern, scalable, and launch-ready digital solution.
            </p>
            <div className="contact-actions">
              <a href="tel:9674700201">
                <Phone size={22} />
                9674700201
              </a>
              <a href="mailto:velocitywebtechsolution@gmail.com">
                <Mail size={22} />
                velocitywebtechsolution@gmail.com
              </a>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            variants={fadeUp}
            onSubmit={handleContactSubmit}
          >
            <div className="form-row">
              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  required
                />
              </label>
            </div>
            <label>
              Email Address
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                required
              />
            </label>
            <label>
              Service Required
              <select name="service" defaultValue="" required>
                <option value="" disabled>
                  Select a service
                </option>
                <option>Website Development</option>
                <option>Mobile App Development</option>
                <option>Custom Software Development</option>
                <option>E-commerce Development</option>
                <option>UI/UX Design</option>
                <option>API & Backend Development</option>
                <option>Cloud & Deployment Services</option>
              </select>
            </label>
            <label>
              Project Details
              <textarea
                name="message"
                placeholder="Tell us about your project"
                rows={5}
                required
              />
            </label>
            {contactStatus.message && (
              <p className={`form-status ${contactStatus.type}`}>
                {contactStatus.message}
              </p>
            )}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{
                y: -3,
                boxShadow: "0 22px 45px rgba(0, 126, 255, 0.34)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              {submitting ? "Sending..." : "Send Message"}
              <ArrowRight size={18} />
            </motion.button>
          </motion.form>
        </motion.div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Image
              src={`${BASE_PATH}/image/logo.png`}
              alt="Velocity Webtech Solution logo"
              width={64}
              height={64}
            />
            <div>
              <h3>Velocity Webtech Solution</h3>
              <p>
                Modern, secure, and scalable digital solutions for businesses
                ready to grow online.
              </p>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <a href="#services">Website Development</a>
            <a href="#services">Mobile App Development</a>
            <a href="#services">Custom Software</a>
            <a href="#services">E-commerce</a>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <a href="tel:9674700201">9674700201</a>
            <a href="mailto:velocitywebtechsolution@gmail.com">
              velocitywebtechsolution@gmail.com
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Velocity Webtech Solution. All rights reserved.</span>
          <span>Your Vision, Our Mission.</span>
        </div>
      </footer>

      {showScrollTop && (
        <motion.button
          className="scroll-top-button"
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
        >
          <ArrowUp size={22} />
        </motion.button>
      )}
    </main>
  );
}
