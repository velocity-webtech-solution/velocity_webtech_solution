"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import {
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
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
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Quote,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { submitContactForm } from "./api/apiservice";

const BASE_PATH = "";

const services = [
  {
    title: "Website Development",
    text: "Professional, responsive, and SEO-friendly websites for business growth.",
    icon: Globe2,
    tone: "blue",
    path: "/website-development-services/",
  },
  {
    title: "E-commerce Development",
    text: "Online stores with product management, checkout, and secure payments.",
    icon: ShoppingCart,
    tone: "orange",
    path: "/e-commerce-development-services/",
  },
  {
    title: "Mobile App Development",
    text: "Modern Android and iOS apps with smooth customer experiences.",
    icon: Smartphone,
    tone: "green",
    path: "/mobile-app-development-services/",
  },
  {
    title: "Custom Software Development",
    text: "Business-specific software solutions and automation systems.",
    icon: Code2,
    tone: "violet",
    path: "/custom-software-development-services/",
  },
  {
    title: "CRM / ERP / Business Management Systems",
    text: "Centralized systems for leads, operations, teams, billing, and reporting.",
    icon: BriefcaseBusiness,
    tone: "cyan",
    path: "/crm-erp-business-management-systems-services/",
  },
  {
    title: "API & Backend Development",
    text: "Secure and scalable APIs, databases, and backend systems.",
    icon: Server,
    tone: "indigo",
    path: "/api-backend-development-services/",
  },
  {
    title: "Cloud Hosting / Deployment",
    text: "Cloud setup, hosting configuration, deployment, and launch support.",
    icon: Cloud,
    tone: "sky",
    path: "/cloud-deployment-services/",
  },
  {
    title: "Website & Software Maintenance",
    text: "Ongoing updates, fixes, security checks, backups, and technical support.",
    icon: Settings,
    tone: "blue",
    path: "/website-software-maintenance-services/",
  },
  {
    title: "Domain/Hosting Assistance",
    text: "Guidance for domain purchase, DNS setup, hosting, SSL, and email setup.",
    icon: Database,
    tone: "orange",
    path: "/domain-hosting-assistance-services/",
  },
  {
    title: "Software Training",
    text: "Practical training for software tools, admin panels, and digital workflows.",
    icon: BookOpenCheck,
    tone: "green",
    path: "/software-training-services/",
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
  "WordPress",
  "Php",
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

const testimonialImage = (fileName) =>
  `${BASE_PATH}/image/testimonial/favhost/${fileName}`;

const testimonials = [
  {
    name: "Subhradeep Das",
    role: "Owner",
    company: "Favhost",
    image: testimonialImage("thumbnail_new.jpg"),
    logo: testimonialImage("favhost_logo.png"),
    quote:
      "Working with Velocity Webtech Solution on Favhost.com was an outstanding experience from start to finish.They expertly developed a powerful rental channel manager with multi-calendar synchronization and real-time API integrations.Their deep expertise in cloud infrastructure delivered a fast, scalable, and highly reliable platform.Highly responsive and professional, they consistently delivered clean code on time — highly recommended for complex web applications.",
  },
  // {
  //   name: "Ananya Sen",
  //   role: "Operations Lead",
  //   company: "Retail Growth Partner",
  //   image: "",
  //   logo: "",
  //   quote:
  //     "The team understood our workflow quickly and turned a scattered process into a simple digital system. Communication stayed clear and delivery was smooth.",
  // },
  // {
  //   name: "Rahul Mehta",
  //   role: "Business Owner",
  //   company: "Cloud Service Client",
  //   image: "",
  //   logo: "",
  //   quote:
  //     "From design to deployment, they kept the project focused on real business needs. Our new website is responsive, easy to manage, and ready for growth.",
  // },
];

const developerImage = (fileName) =>
  `${BASE_PATH}/image/developers/${fileName}`;

const developers = [
  {
    name: "Subhankar Roy Choudhury",
    designation: "Full Stack Developer",
    image: developerImage("s1.jpeg"),
    skills: [
      "React",
      "Next.js",
      "UI Animation",
      "APIs",
      "Database",
      "Security",
    ],
  },
  {
    name: "Arnab Das",
    designation: "Backend Developer",
    image: developerImage("s3.jpeg"),
    skills: ["APIs", "Database", "Security"],
  },
  {
    name: "Ayub Thapa",
    designation: "Mobile App Developer",
    image: developerImage("s2.jpeg"),
    skills: ["Android", "iOS", "App UX"],
  },
  {
    name: "Brooklyn Gilbert",
    designation: "UI/UX Designer",
    image: developerImage("dev_2.jpg"),
    skills: ["Wireframes", "Design System", "Prototype"],
  },
  // {
  //   name: "Sayan Das",
  //   designation: "Cloud Engineer",
  //   image: developerImage("developer-5.svg"),
  //   skills: ["Hosting", "CI/CD", "Monitoring"],
  // },
  // {
  //   name: "Ananya Gupta",
  //   designation: "Full Stack Developer",
  //   image: developerImage("developer-6.svg"),
  //   skills: ["Frontend", "Backend", "Deployment"],
  // },
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(1);
  const [testimonialSlideCycle, setTestimonialSlideCycle] = useState(0);
  const [activeDeveloper, setActiveDeveloper] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const testimonialCount = testimonials.length;
  const hasMultipleTestimonials = testimonialCount > 1;
  const lastTestimonialIndex = Math.max(testimonialCount - 1, 0);
  const activeTestimonialIndex = Math.min(
    activeTestimonial,
    lastTestimonialIndex,
  );
  const activeTestimonialData = testimonials[activeTestimonialIndex];
  const developerCount = developers.length;
  const lastDeveloperIndex = Math.max(developerCount - 1, 0);
  const activeDeveloperIndex = Math.min(activeDeveloper, lastDeveloperIndex);

  function showPreviousTestimonial() {
    if (!hasMultipleTestimonials) {
      return;
    }

    setTestimonialDirection(-1);
    setTestimonialSlideCycle((current) => current + 1);
    setActiveTestimonial((current) => {
      if (testimonialCount === 0) {
        return 0;
      }

      return current === 0 ? lastTestimonialIndex : current - 1;
    });
  }

  function showNextTestimonial() {
    if (!hasMultipleTestimonials) {
      return;
    }

    setTestimonialDirection(1);
    setTestimonialSlideCycle((current) => current + 1);
    setActiveTestimonial((current) => {
      if (testimonialCount === 0) {
        return 0;
      }

      return current >= lastTestimonialIndex ? 0 : current + 1;
    });
  }

  function showTestimonial(index) {
    if (!hasMultipleTestimonials || index === activeTestimonialIndex) {
      return;
    }

    setTestimonialDirection(index >= activeTestimonialIndex ? 1 : -1);
    setTestimonialSlideCycle((current) => current + 1);
    setActiveTestimonial(index);
  }

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
    setActiveTestimonial((current) =>
      current > lastTestimonialIndex ? lastTestimonialIndex : current,
    );
  }, [lastTestimonialIndex]);

  useEffect(() => {
    if (testimonialCount <= 1) {
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return undefined;
    }

    const slideTimer = window.setInterval(() => {
      setTestimonialDirection(1);
      setTestimonialSlideCycle((current) => current + 1);
      setActiveTestimonial((current) =>
        current >= lastTestimonialIndex ? 0 : current + 1,
      );
    }, 4200);

    return () => window.clearInterval(slideTimer);
  }, [testimonialCount, lastTestimonialIndex]);

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

  async function handleContactSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setContactStatus({ type: "", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await submitContactForm({
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        service: formData.get("service"),
        message: formData.get("message"),
      });

      form.reset();
      setContactStatus({
        type: "success",
        message: response.message || "Enquiry Submitted Successfully.",
      });
    } catch (error) {
      setContactStatus({
        type: "error",
        message:
          error.message || "Something went wrong. Please try again shortly.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <Header />

      <section id="home" className="hero">
        <Image
          src={`${BASE_PATH}/image/banner_new_1.png`}
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
            Web, App & Software Studio
          </motion.p>
          <motion.h1 variants={fadeUp}>Velocity Webtech Solution</motion.h1>
          <motion.p className="hero-copy" variants={fadeUp}>
            We design and build polished websites, mobile apps, backend systems,
            and cloud-ready products for businesses that want to move faster
            with confidence.
          </motion.p>
          <motion.div className="hero-service-line" variants={fadeUp}>
            <span>Strategy</span>
            <span>UI/UX</span>
            <span>Development</span>
            <span>Deployment</span>
          </motion.div>
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
              <Layers3 size={18} />
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
          <div className="hero-console">
            <div className="hero-console-top">
              <span />
              <span />
              <span />
              <strong>Project Command Center</strong>
            </div>

            <div className="hero-launch-panel">
              <span className="launch-icon">
                <Rocket size={28} />
              </span>
              <div>
                <p>Launch Status</p>
                <strong>Ready for production</strong>
              </div>
            </div>

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

            <div className="hero-progress-list">
              {processSteps.map(({ title, icon: Icon }, index) => (
                <div key={title}>
                  <span>
                    <Icon size={16} />
                  </span>
                  <strong>{title}</strong>
                  <small>{index + 1 < 10 ? `0${index + 1}` : index + 1}</small>
                </div>
              ))}
            </div>

            <motion.div
              className="tech-strip"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
            >
              {techChips.slice(0, 8).map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </motion.div>
          </div>
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
          {services.map(({ title, text, icon: Icon, tone, path }, index) => (
            <motion.a
              className={`service-card ${tone}`}
              href={`${BASE_PATH}${path}`}
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
            </motion.a>
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
              src={`${BASE_PATH}/image/brochure_2.png`}
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

      <section id="testimonials" className="section testimonials-section">
        <motion.div
          className="testimonials-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="testimonial-pill">Client Testimonials</p>
          <h2>
            Trusted <span>by Clients</span>
          </h2>
          <p>
            Real feedback from businesses that trusted Velocity Webtech Solution
            for design, development, deployment, and long-term support.
          </p>
        </motion.div>

        <motion.div
          className="testimonial-card-viewport testimonial-card-slider"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <button
            className="testimonial-nav testimonial-nav-prev"
            type="button"
            onClick={showPreviousTestimonial}
            disabled={!hasMultipleTestimonials}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="testimonial-carousel-stage">
            <AnimatePresence initial={false} custom={testimonialDirection}>
              {activeTestimonialData && (
                <motion.article
                  className="testimonial-feature-card testimonial-slide-active"
                  key={`${activeTestimonialData.name}-${testimonialSlideCycle}`}
                  custom={testimonialDirection}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={{
                    enter: (direction) => ({
                      x: direction > 0 ? "115%" : "-115%",
                      scale: 0.96,
                      opacity: 0,
                      zIndex: 2,
                    }),
                    center: {
                      x: 0,
                      scale: 1,
                      opacity: 1,
                      zIndex: 3,
                    },
                    exit: (direction) => ({
                      x: direction > 0 ? "-115%" : "115%",
                      scale: 0.96,
                      opacity: 0,
                      zIndex: 2,
                    }),
                  }}
                  transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="testimonial-panel-frame">
                    <div className="testimonial-panel">
                      <Quote
                        className="testimonial-quote-mark quote-left"
                        size={34}
                      />
                      <Quote
                        className="testimonial-quote-mark quote-right"
                        size={34}
                      />
                      <div className="testimonial-card-top">
                        <div className="testimonial-client">
                          {activeTestimonialData.image ? (
                            <Image
                              src={activeTestimonialData.image}
                              alt={`${activeTestimonialData.name} profile`}
                              width={160}
                              height={160}
                              sizes="(max-width: 760px) 114px, 142px"
                            />
                          ) : (
                            <span className="testimonial-avatar-fallback">
                              {activeTestimonialData.name
                                .split(" ")
                                .map((part) => part[0])
                                .join("")}
                            </span>
                          )}
                          <div>
                            <strong>{activeTestimonialData.name}</strong>
                            <small>{activeTestimonialData.role}</small>
                            <span className="testimonial-company-name">
                              {activeTestimonialData.company}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="testimonial-quote-body">
                        <p>{activeTestimonialData.quote}</p>
                      </div>

                      <div className="testimonial-client-logo">
                        {activeTestimonialData.logo ? (
                          <Image
                            src={activeTestimonialData.logo}
                            alt={`${activeTestimonialData.company} logo`}
                            width={220}
                            height={104}
                          />
                        ) : (
                          <span>{activeTestimonialData.company}</span>
                        )}
                      </div>

                      {/* <div className="testimonial-card-footer">
                      <span>Learn More</span>
                    </div> */}
                    </div>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </div>

          <button
            className="testimonial-nav testimonial-nav-next"
            type="button"
            onClick={showNextTestimonial}
            disabled={!hasMultipleTestimonials}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>

        <div className="testimonial-slider-dots" aria-label="Testimonials">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              className={index === activeTestimonialIndex ? "active" : ""}
              type="button"
              onClick={() => showTestimonial(index)}
              disabled={!hasMultipleTestimonials}
              aria-label={`Show testimonial from ${testimonial.name}`}
              aria-current={index === activeTestimonialIndex}
            />
          ))}
        </div>
      </section>

      {/* <section id="portfolio" className="section developer-portfolio-section">
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
                    width={640}
                    height={640}
                    sizes="(max-width: 768px) 150px, 170px"
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
      </section> */}

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
                +91 6291499409
              </a>
              <a className="contact-email-link">
                <Mail size={22} />
                subhankar.rc@velocitywebtechsolution.com
              </a>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            variants={fadeUp}
            onSubmit={handleContactSubmit}
          >
            <h3 className="contact-form-title">Send Your Query</h3>
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

      <Footer />

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
