"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../../components/header/page";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Cloud,
  Code2,
  Globe2,
  Layers3,
  PenTool,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

const BASE_PATH = "/velocity_webtech_solution";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const developerProfiles = [
  {
    name: "Frontend Developer",
    title: "React & Next.js Interfaces",
    category: "UI Engineering",
    text: "Builds responsive, polished, and high-performance web interfaces with clean component structure.",
    icon: Globe2,
    tone: "blue",
    skills: ["React", "Next.js", "Responsive UI"],
  },
  {
    name: "Backend Developer",
    title: "APIs & Business Logic",
    category: "Server Engineering",
    text: "Creates secure APIs, database models, admin workflows, and scalable backend services.",
    icon: Code2,
    tone: "indigo",
    skills: ["REST APIs", "Databases", "Auth"],
  },
  {
    name: "Mobile App Developer",
    title: "Android & iOS Experiences",
    category: "App Development",
    text: "Designs smooth mobile app flows for users, bookings, notifications, dashboards, and service journeys.",
    icon: Smartphone,
    tone: "green",
    skills: ["Android", "iOS", "App UX"],
  },
  {
    name: "Dashboard Developer",
    title: "Admin Panels & Reports",
    category: "Operations Tools",
    text: "Builds data-driven dashboards for customer records, reports, roles, requests, and daily business control.",
    icon: BarChart3,
    tone: "violet",
    skills: ["Reports", "Tables", "Role Views"],
  },
  {
    name: "Cloud Engineer",
    title: "Deployment & Hosting",
    category: "Cloud Delivery",
    text: "Prepares production deployments, hosting setup, release flows, monitoring, and maintenance support.",
    icon: Cloud,
    tone: "sky",
    skills: ["Hosting", "CI/CD", "Monitoring"],
  },
  {
    name: "UI/UX Designer",
    title: "Product Design & Flows",
    category: "Design Systems",
    text: "Shapes clean layouts, user flows, wireframes, and product screens that make complex tools easy to use.",
    icon: PenTool,
    tone: "orange",
    skills: ["Wireframes", "UI Design", "UX Flow"],
  },
  {
    name: "Full Stack Developer",
    title: "End-to-End Products",
    category: "Web Applications",
    text: "Connects frontend, backend, APIs, forms, dashboards, and deployment into complete working products.",
    icon: Layers3,
    tone: "cyan",
    skills: ["Frontend", "Backend", "Deployment"],
  },
  {
    name: "QA & Support",
    title: "Testing & Maintenance",
    category: "Quality Delivery",
    text: "Reviews forms, layouts, responsive behavior, build health, and post-launch updates for reliable delivery.",
    icon: ShieldCheck,
    tone: "green",
    skills: ["Testing", "Bug Fixing", "Support"],
  },
];

const metrics = [
  { value: "08", label: "Developer Roles" },
  { value: "Full", label: "Product Delivery" },
  { value: "24/7", label: "Support Mindset" },
];

export default function Portfolio() {
  return (
    <main>
      <Header />

      <section className="portfolio-hero">
        <Image
          src={`${BASE_PATH}/image/banner_new.png`}
          alt="Portfolio background"
          className="portfolio-hero-bg"
          width={1942}
          height={809}
          priority
        />
        <div className="portfolio-hero-overlay" />
        <motion.div
          className="portfolio-hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            <Sparkles size={18} />
            Developer Portfolio
          </motion.p>
          <motion.h1 variants={fadeUp}>Portfolio</motion.h1>
          <motion.p className="portfolio-hero-copy" variants={fadeUp}>
            Meet the development capabilities behind Velocity Webtech Solution:
            frontend, backend, mobile apps, cloud deployment, design, QA, and
            complete product delivery.
          </motion.p>
          <motion.div className="portfolio-actions" variants={fadeUp}>
            <a className="primary-button" href={`${BASE_PATH}/#contact`}>
              Start a Project
              <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href={`${BASE_PATH}/#services`}>
              View Services
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="portfolio-showcase"
          initial={{ opacity: 0, x: 36, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <Image
            src={`${BASE_PATH}/image/Brochure.png`}
            alt="Velocity Webtech developer capability showcase"
            width={1536}
            height={1024}
          />
        </motion.div>
      </section>

      <section className="portfolio-metrics" aria-label="Portfolio metrics">
        {metrics.map(({ value, label }) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section portfolio-section">
        <motion.div
          className="section-heading centered"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="eyebrow">
            <Layers3 size={18} />
            Developer Gallery
          </p>
          <h2>Our developer portfolio across modern digital products.</h2>
        </motion.div>

        <div className="portfolio-grid">
          {developerProfiles.map(
            (
              { name, title, category, text, icon: Icon, tone, skills },
              index
            ) => (
              <motion.article
                className={`portfolio-card ${tone}`}
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                whileHover={{ y: -8, scale: 1.01 }}
              >
                <span className="card-shine" />
                <div className="portfolio-preview">
                  <div className="portfolio-preview-bar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="portfolio-preview-body">
                    <span className="service-icon">
                      <Icon size={28} />
                    </span>
                    <div>
                      <strong>{name}</strong>
                      <small>{category}</small>
                    </div>
                  </div>
                  <div className="portfolio-preview-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="portfolio-card-top">
                  <span className="portfolio-category">{category}</span>
                  <BadgeCheck size={22} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="portfolio-tags">
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </motion.article>
            )
          )}
        </div>
      </section>

      <section className="portfolio-cta">
        <div>
          <p className="eyebrow">
            <Rocket size={18} />
            Ready to Collaborate
          </p>
          <h2>Work with our developers to bring your next product to life.</h2>
        </div>
        <a className="primary-button" href={`${BASE_PATH}/#contact`}>
          Contact Us
          <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}
