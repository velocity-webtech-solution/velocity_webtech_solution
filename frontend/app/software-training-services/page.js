"use client";

import { useMemo, useState } from "react";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CheckCircle2,
  Code2,
  Database,
  FileJson,
  FolderKanban,
  GitBranch,
  Lightbulb,
  Monitor,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";

const techStack = [
  "Core PHP",
  "Laravel",
  "CodeIgniter",
  "Python",
  "Django",
  "Flask",
  "React",
  "Angular",
  "Vue",
  "SQL",
];

const courseTabs = [
  {
    id: "frontend",
    title: "Frontend Development",
    duration: "2 Months",
    icon: Monitor,
    accent: "#ff7a18",
    summary:
      "Build responsive, polished interfaces with modern frontend tools.",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "jQuery",
      "Responsive Web Design",
      "Git & GitHub",
      "Angular",
      "React.js",
      "Vue.js",
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    duration: "2 Months",
    icon: ServerCog,
    accent: "#ec4899",
    summary:
      "Create secure server-side applications, APIs, and admin-ready logic.",
    items: [
      "Core PHP & PHP fundamentals",
      "Form handling, sessions & cookies",
      "File handling & database connectivity",
      "CRUD operations",
      "Laravel basics",
      "Python backend with Django and Flask",
      "Django REST Framework",
      "REST API development",
      "Authentication & authorization",
      "CRUD APIs & API integration",
      "Backend project structure",
    ],
  },
  {
    id: "backend-stack",
    title: "Backend Stack",
    duration: "2 Months",
    icon: Code2,
    accent: "#8b5cf6",
    summary: "Practice the backend stack used across the course projects.",
    items: [
      "Core PHP",
      "Laravel",
      "CodeIgniter",
      "Python",
      "Django",
      "Flask",
      "REST API",
      "Authentication",
      "CRUD",
      "API Integration",
    ],
  },
  {
    id: "database",
    title: "Database",
    duration: "",
    icon: Database,
    accent: "#06b6d4",
    summary: "Design, query, and connect reliable SQL and NoSQL databases.",
    items: [
      "SQL Fundamentals",
      "MySQL / PostgreSQL",
      "NoSQL / MongoDB intro",
      "Database design",
      "Tables, relationships, joins",
      "CRUD queries",
      "Constraints, indexing",
      "Normalization",
      "ORM basics",
      "Database integration with PHP/Python applications",
    ],
  },
  {
    id: "additional",
    title: "Additional Topics",
    duration: "Included",
    icon: Lightbulb,
    accent: "#22c55e",
    summary:
      "Learn the practical tools needed to work like a production developer.",
    items: [
      "REST API",
      "FastAPI basics",
      "Postman",
      "JSON",
      "Git & GitHub",
      "Debugging",
      "Deployment basics",
      "Hosting",
      "Cloud / AWS intro",
    ],
  },
  {
    id: "projects",
    title: "Live Projects",
    duration: "Real Applications",
    icon: FolderKanban,
    accent: "#f43f5e",
    summary:
      "Build portfolio-ready projects that connect frontend, backend, and database.",
    items: [
      "Chat Application",
      "Billing Application",
      "School Management System",
      "E-commerce Website",
      "Restaurant Management System",
      "Student Portal",
      "Business Website",
      "REST API projects",
    ],
  },
  {
    id: "learn",
    title: "What Students Will Learn",
    duration: "Skills",
    icon: BookOpenCheck,
    accent: "#eab308",
    summary:
      "Leave with job-ready, end-to-end full stack web development skills.",
    items: [
      "Build full stack web applications",
      "Create responsive and modern UI",
      "Work with APIs and databases",
      "Deploy real-world projects",
      "Collaborate using Git & GitHub",
      "Gain industry-relevant skills",
    ],
  },
  {
    id: "outcome",
    title: "Course Outcome",
    duration: "Career Ready",
    icon: Trophy,
    accent: "#3b82f6",
    summary: "Complete the program with a portfolio and practical confidence.",
    items: [
      "Job-ready skills",
      "Complete web application development knowledge",
      "Build a strong portfolio",
      "Confidence to work on real-world projects",
      "Course completion certificate",
      // "Placement support guidance",
    ],
  },
];

const featureHighlights = [
  { label: "Practical Learning", icon: Rocket },
  { label: "Real-world Projects", icon: Users },
  { label: "Expert Guidance", icon: Wrench },
  { label: "Certificate on Completion", icon: Award },
];

export default function SoftwareTrainingServicesPage() {
  const [activeTabId, setActiveTabId] = useState(courseTabs[0].id);
  const activeTab = useMemo(
    () => courseTabs.find((tab) => tab.id === activeTabId) || courseTabs[0],
    [activeTabId],
  );
  const ActiveIcon = activeTab.icon;

  return (
    <>
      <Header />
      <main className="training-page">
        <section className="training-hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />

          <div className="hero-topline">
            <span>Build Your Future in Tech</span>
            <span>Learn Build Grow</span>
          </div>

          <div className="hero-stage">
            <div className="hero-copy">
              <p className="course-kicker">
                <Sparkles size={18} />
                Professional Course | 6 Months
              </p>
              <h1>
                Full Stack
                <span>Web Development</span>
              </h1>
              <p className="hero-subtitle">
                From basics to job-ready skills with frontend, backend,
                database, REST APIs, deployment basics, live projects, and
                certificate support.
              </p>
              <div className="hero-actions" aria-label="Course highlights">
                <span>
                  <Rocket size={18} /> Live Projects
                </span>
                {/* <span><Award size={18} /> Certificate</span>
              <span><Users size={18} /> Placement Support</span> */}
              </div>
            </div>

            <div
              className="hero-showcase"
              aria-label="Training course overview"
            >
              <div className="showcase-card main-card">
                <div className="window-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="code-lines">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="project-tag">Ideas to Real Products</div>
              </div>
              {/* <div className="showcase-card floating-card months-card">
                <strong>6</strong>
                <span>Months</span>
              </div> */}
              <div className="showcase-card floating-card stack-card">
                <Code2 size={24} />
                <span>Frontend + Backend + Database</span>
              </div>
            </div>
          </div>

          <div className="tech-strip" aria-label="Course technology stack">
            {techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </section>

        <section
          className="tabs-section"
          aria-label="Full stack course modules"
        >
          <div className="section-heading">
            <p>Course Curriculum</p>
            <h2>Every course box is available as a tab</h2>
          </div>

          <div className="tab-layout">
            <div className="tab-list" role="tablist" aria-label="Course boxes">
              {courseTabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = tab.id === activeTabId;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${tab.id}-panel`}
                    id={`${tab.id}-tab`}
                    className={`tab-card ${isActive ? "active" : ""}`}
                    style={{ "--accent": tab.accent }}
                    onClick={() => setActiveTabId(tab.id)}
                  >
                    <span className="tab-icon">
                      <TabIcon size={26} />
                    </span>
                    <span className="tab-text">
                      <strong>{tab.title}</strong>
                      <small>{tab.duration}</small>
                    </span>
                  </button>
                );
              })}
            </div>

            <article
              className="tab-panel"
              role="tabpanel"
              id={`${activeTab.id}-panel`}
              aria-labelledby={`${activeTab.id}-tab`}
              style={{ "--accent": activeTab.accent }}
            >
              <div className="panel-header">
                <div className="panel-icon">
                  <ActiveIcon size={38} />
                </div>
                <div>
                  <p>{activeTab.duration}</p>
                  <h3>{activeTab.title}</h3>
                </div>
              </div>

              <p className="panel-summary">{activeTab.summary}</p>

              <div className="panel-list">
                {activeTab.items.map((item) => (
                  <div className="panel-item" key={item}>
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="quick-band">
          <div className="backend-pill">
            <ServerCog size={26} />
            <span>
              Backend - 2 Months: Core PHP | Laravel | CodeIgniter | Python |
              Django | Flask | REST API | Authentication | CRUD | API
              Integration
            </span>
          </div>
          <div className="tool-pills">
            <span>
              <FileJson size={18} /> JSON
            </span>
            <span>
              <GitBranch size={18} /> Git & GitHub
            </span>
            <span>
              <ShieldCheck size={18} /> Deployment Basics
            </span>
          </div>
        </section>

        <section className="outcome-section">
          <div className="enroll-panel">
            <p>Turn Your Skills Into Opportunities</p>
            <h2>Enroll Today</h2>
            <a href="tel:6291499409" className="enroll-button">
              Call Now <ArrowRight size={22} />
            </a>
          </div>

          <div className="feature-row">
            {featureHighlights.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div className="feature-chip" key={feature.label}>
                  <FeatureIcon size={26} />
                  <span>{feature.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        <style>{`
          .training-page {
            min-height: 100vh;
            overflow: hidden;
            background:
              radial-gradient(
                circle at 16% 18%,
                rgba(14, 165, 233, 0.34),
                transparent 28%
              ),
              radial-gradient(
                circle at 84% 16%,
                rgba(236, 72, 153, 0.28),
                transparent 26%
              ),
              radial-gradient(
                circle at 48% 72%,
                rgba(250, 204, 21, 0.12),
                transparent 31%
              ),
              #030712;
            color: #f8fbff;
          }

          .training-hero {
            position: relative;
            display: grid;
            gap: 26px;
            min-height: calc(100vh - 20px);
            padding: calc(var(--header-offset, 78px) + clamp(24px, 4vw, 48px))
              clamp(18px, 5vw, 72px) 42px;
            isolation: isolate;
          }

          .hero-grid {
            position: absolute;
            inset: 0;
            z-index: -4;
            background:
              linear-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(59, 130, 246, 0.12) 1px,
                transparent 1px
              ),
              linear-gradient(
                115deg,
                rgba(3, 7, 18, 0.52),
                rgba(3, 7, 18, 0.88) 58%,
                rgba(14, 165, 233, 0.12)
              );
            background-size:
              72px 72px,
              72px 72px,
              auto;
            mask-image: linear-gradient(to bottom, black 74%, transparent);
          }

          .training-hero::before,
          .training-hero::after {
            position: absolute;
            z-index: -2;
            content: "";
            border: 1px solid rgba(125, 211, 252, 0.26);
            border-radius: 8px;
            background:
              linear-gradient(
                135deg,
                rgba(15, 23, 42, 0.28),
                rgba(14, 165, 233, 0.08)
              ),
              rgba(15, 23, 42, 0.38);
            box-shadow: 0 0 44px rgba(14, 165, 233, 0.22);
          }

          .training-hero::before {
            left: 3vw;
            top: 16vh;
            width: min(30vw, 420px);
            height: min(26vw, 315px);
            transform: perspective(900px) rotateY(20deg) rotateZ(-4deg);
          }

          .training-hero::after {
            right: 4vw;
            top: 15vh;
            width: min(28vw, 380px);
            height: min(25vw, 300px);
            transform: perspective(900px) rotateY(-20deg) rotateZ(4deg);
          }

          .hero-glow {
            position: absolute;
            z-index: -1;
            border-radius: 999px;
            filter: blur(28px);
            opacity: 0.82;
          }

          .hero-glow-one {
            right: 18%;
            top: 17%;
            width: 210px;
            height: 210px;
            background: rgba(236, 72, 153, 0.42);
          }

          .hero-glow-two {
            left: 16%;
            top: 48%;
            width: 260px;
            height: 260px;
            background: rgba(6, 182, 212, 0.36);
          }

          .hero-topline {
            display: flex;
            justify-content: space-between;
            gap: 18px;
            color: #d9f99d;
            font-family: "Caveat", cursive;
            font-size: clamp(1.9rem, 4vw, 3.5rem);
            line-height: 0.95;
            text-shadow: 0 0 18px rgba(34, 211, 238, 0.72);
          }

          .hero-stage {
            display: grid;
            grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.72fr);
            gap: clamp(24px, 5vw, 72px);
            align-items: center;
          }

          .hero-copy {
            display: grid;
            justify-items: start;
            gap: 16px;
            max-width: 880px;
            text-align: left;
          }

          .course-kicker {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin: 0;
            padding: 11px 20px;
            border: 1px solid rgba(125, 211, 252, 0.8);
            border-radius: 999px;
            background: linear-gradient(
              135deg,
              rgba(15, 23, 42, 0.88),
              rgba(14, 165, 233, 0.16)
            );
            color: #eef2ff;
            font-size: clamp(1rem, 1.6vw, 1.22rem);
            font-weight: 900;
            box-shadow:
              inset 0 0 18px rgba(14, 165, 233, 0.16),
              0 0 28px rgba(56, 189, 248, 0.32);
          }

          .hero-copy h1 {
            max-width: 960px;
            margin: 0;
            font-size: clamp(3.4rem, 9vw, 6.1rem);
            font-weight: 1000;
            line-height: 0.82;
            text-transform: uppercase;
            text-shadow:
              0 5px 0 rgba(2, 6, 23, 0.96),
              0 0 24px rgba(34, 211, 238, 0.74),
              0 0 54px rgba(14, 165, 233, 0.38);
          }

          .hero-copy h1 span {
            display: block;
            background: linear-gradient(
              180deg,
              #fff7ed 0%,
              #facc15 16%,
              #fb923c 48%,
              #ec4899 78%,
              #38bdf8 100%
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.18);
          }

          .hero-subtitle {
            max-width: 720px;
            margin: 0;
            color: #dbeafe;
            font-size: clamp(1.05rem, 1.8vw, 1.28rem);
            font-weight: 700;
            line-height: 1.48;
          }

          .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 4px;
          }

          .hero-actions span {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            min-height: 42px;
            padding: 0 14px;
            border: 1px solid rgba(34, 211, 238, 0.36);
            border-radius: 999px;
            background: rgba(2, 6, 23, 0.72);
            color: #f8fafc;
            font-weight: 900;
            box-shadow: inset 0 0 18px rgba(14, 165, 233, 0.12);
          }

          .hero-actions svg {
            color: #facc15;
          }

          .hero-showcase {
            position: relative;
            min-height: 430px;
          }

          .showcase-card {
            border: 1px solid rgba(125, 211, 252, 0.42);
            border-radius: 8px;
            background: rgba(2, 6, 23, 0.78);
            box-shadow:
              inset 0 0 30px rgba(14, 165, 233, 0.16),
              0 0 46px rgba(14, 165, 233, 0.2);
            backdrop-filter: blur(14px);
          }

          .main-card {
            position: absolute;
            inset: 26px 8px 76px 34px;
            overflow: hidden;
            padding: 22px;
            transform: perspective(900px) rotateY(-9deg) rotateX(3deg);
          }

          .main-card::before {
            position: absolute;
            inset: auto -20% -28% 24%;
            height: 190px;
            content: "";
            background: radial-gradient(
              circle,
              rgba(250, 204, 21, 0.3),
              transparent 65%
            );
          }

          .window-bar {
            display: flex;
            gap: 8px;
            margin-bottom: 26px;
          }

          .window-bar span {
            width: 12px;
            height: 12px;
            border-radius: 999px;
            background: #fb7185;
            box-shadow: 0 0 12px currentColor;
          }

          .window-bar span:nth-child(2) {
            background: #facc15;
          }

          .window-bar span:nth-child(3) {
            background: #22c55e;
          }

          .code-lines {
            display: grid;
            gap: 14px;
          }

          .code-lines i {
            display: block;
            height: 16px;
            border-radius: 999px;
            background: linear-gradient(
              90deg,
              #22d3ee,
              #818cf8 46%,
              transparent
            );
            box-shadow: 0 0 18px rgba(34, 211, 238, 0.32);
          }

          .code-lines i:nth-child(1) {
            width: 86%;
          }

          .code-lines i:nth-child(2) {
            width: 62%;
            background: linear-gradient(
              90deg,
              #facc15,
              #fb7185 52%,
              transparent
            );
          }

          .code-lines i:nth-child(3) {
            width: 76%;
          }

          .code-lines i:nth-child(4) {
            width: 48%;
            background: linear-gradient(
              90deg,
              #34d399,
              #22d3ee 52%,
              transparent
            );
          }

          .project-tag {
            position: absolute;
            right: 22px;
            bottom: 22px;
            max-width: 190px;
            color: #fef08a;
            font-size: clamp(1.45rem, 3vw, 2.2rem);
            font-family: "Caveat", cursive;
            font-weight: 800;
            line-height: 0.95;
            text-align: right;
            text-shadow: 0 0 18px rgba(250, 204, 21, 0.48);
          }

          .floating-card {
            position: absolute;
            display: grid;
            place-items: center;
            text-align: center;
          }

          .months-card {
            right: 0;
            bottom: 40px;
            width: 172px;
            height: 172px;
            border-color: rgba(250, 204, 21, 0.78);
            border-radius: 999px;
            background: radial-gradient(
              circle at 35% 25%,
              #fef08a,
              #f97316 38%,
              #dc2626 78%
            );
            color: #ffffff;
            box-shadow: 0 0 36px rgba(250, 204, 21, 0.52);
          }

          .months-card strong {
            font-size: 4.8rem;
            line-height: 0.82;
            text-shadow: 0 4px 0 rgba(127, 29, 29, 0.55);
          }

          .months-card span {
            margin-top: -18px;
            font-size: 1.5rem;
            font-weight: 1000;
            text-transform: uppercase;
          }

          .stack-card {
            left: 0;
            bottom: 0;
            grid-template-columns: auto 1fr;
            gap: 10px;
            width: min(330px, 80%);
            min-height: 76px;
            padding: 14px 16px;
            color: #e0f2fe;
            text-align: left;
            font-weight: 900;
          }

          .stack-card svg {
            color: #22d3ee;
          }

          .tech-strip {
            display: grid;
            grid-template-columns: repeat(10, minmax(72px, 1fr));
            gap: 10px;
            padding: 14px;
            border: 1px solid rgba(56, 189, 248, 0.72);
            border-radius: 8px;
            background:
              linear-gradient(
                90deg,
                rgba(14, 165, 233, 0.18),
                rgba(217, 70, 239, 0.12)
              ),
              rgba(2, 6, 23, 0.78);
            box-shadow:
              inset 0 0 30px rgba(14, 165, 233, 0.24),
              0 0 34px rgba(14, 165, 233, 0.24);
          }

          .tech-strip span {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 54px;
            overflow: hidden;
            border: 1px solid rgba(148, 163, 184, 0.34);
            border-radius: 8px;
            background:
              linear-gradient(
                145deg,
                rgba(15, 23, 42, 0.96),
                rgba(30, 41, 59, 0.72)
              ),
              rgba(15, 23, 42, 0.9);
            color: #ffffff;
            font-weight: 1000;
            box-shadow:
              inset 0 0 0 1px rgba(255, 255, 255, 0.04),
              0 12px 24px rgba(0, 0, 0, 0.24);
            animation: tech-card-float 3.8s ease-in-out infinite;
            transition:
              transform 180ms ease,
              border-color 180ms ease,
              box-shadow 180ms ease;
          }

          .tech-strip span::before {
            position: absolute;
            inset: 0;
            content: "";
            background: linear-gradient(
              110deg,
              transparent 0%,
              rgba(255, 255, 255, 0.22) 45%,
              transparent 72%
            );
            transform: translateX(-125%);
            animation: tech-card-shine 4.6s ease-in-out infinite;
          }

          .tech-strip span:hover {
            transform: translateY(-5px) scale(1.02);
            border-color: rgba(34, 211, 238, 0.78);
            box-shadow:
              inset 0 0 18px rgba(34, 211, 238, 0.2),
              0 16px 30px rgba(14, 165, 233, 0.28);
          }

          .tech-strip span:nth-child(2n) {
            animation-delay: 0.18s;
          }

          .tech-strip span:nth-child(3n) {
            animation-delay: 0.36s;
          }

          .tech-strip span:nth-child(4n) {
            animation-delay: 0.54s;
          }

          .tech-strip span:nth-child(2n)::before {
            animation-delay: 0.55s;
          }

          .tech-strip span:nth-child(3n)::before {
            animation-delay: 1.1s;
          }

          @keyframes tech-card-float {
            0%,
            100% {
              transform: translateY(0);
              box-shadow:
                inset 0 0 0 1px rgba(255, 255, 255, 0.04),
                0 12px 24px rgba(0, 0, 0, 0.24);
            }

            50% {
              transform: translateY(-4px);
              box-shadow:
                inset 0 0 18px rgba(34, 211, 238, 0.16),
                0 16px 30px rgba(14, 165, 233, 0.22);
            }
          }

          @keyframes tech-card-shine {
            0%,
            58% {
              transform: translateX(-125%);
            }

            78%,
            100% {
              transform: translateX(125%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .tech-strip span,
            .tech-strip span::before {
              animation: none;
            }
          }

          .tabs-section,
          .quick-band,
          .outcome-section {
            width: min(1180px, calc(100% - 32px));
            margin: 0 auto;
          }

          .tabs-section {
            position: relative;
            padding: 54px 0 28px;
            isolation: isolate;
          }

          .tabs-section::before {
            position: absolute;
            inset: 18px -34px 0;
            z-index: -2;
            content: "";
            border: 1px solid rgba(34, 211, 238, 0.18);
            border-radius: 8px;
            background:
              radial-gradient(circle at 26% 44%, rgba(250, 204, 21, 0.18), transparent 28%),
              radial-gradient(circle at 74% 30%, rgba(217, 70, 239, 0.2), transparent 30%),
              linear-gradient(180deg, rgba(15, 23, 42, 0.24), rgba(2, 6, 23, 0.62));
            box-shadow: inset 0 0 70px rgba(14, 165, 233, 0.08);
          }

          .section-heading {
            display: grid;
            justify-items: center;
            gap: 10px;
            max-width: 820px;
            margin: 0 auto 24px;
            text-align: center;
          }

          .section-heading p {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 26px;
            margin: 0;
            padding: 0 12px;
            border-radius: 4px;
            background: linear-gradient(90deg, #2563eb, #7c3aed);
            color: #ffffff;
            font-size: 0.82rem;
            font-weight: 1000;
            text-transform: uppercase;
            box-shadow: 0 0 22px rgba(37, 99, 235, 0.48);
          }

          .section-heading h2 {
            margin: 0;
            font-size: clamp(2.15rem, 4.7vw, 4.6rem);
            line-height: 0.96;
            text-wrap: balance;
            text-shadow: 0 0 26px rgba(14, 165, 233, 0.22);
          }

          .tab-layout {
            position: relative;
            display: grid;
            grid-template-columns: minmax(300px, 0.82fr) minmax(0, 1.18fr);
            gap: 18px;
            align-items: stretch;
            padding: 10px;
            border: 1px solid rgba(125, 211, 252, 0.2);
            border-radius: 8px;
            background:
              linear-gradient(135deg, rgba(15, 23, 42, 0.3), rgba(2, 6, 23, 0.74)),
              rgba(2, 6, 23, 0.46);
            box-shadow:
              inset 0 0 42px rgba(14, 165, 233, 0.08),
              0 24px 80px rgba(0, 0, 0, 0.32);
          }

          .tab-layout::before {
            position: absolute;
            inset: -1px;
            z-index: -1;
            content: "";
            border-radius: 8px;
            background: linear-gradient(135deg, rgba(250, 204, 21, 0.5), transparent 28%, rgba(34, 211, 238, 0.42) 58%, rgba(236, 72, 153, 0.46));
            opacity: 0.42;
          }

          .tab-list {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            align-content: start;
          }

          .tab-card {
            position: relative;
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            gap: 12px;
            align-items: center;
            min-height: 92px;
            overflow: hidden;
            padding: 14px;
            border: 1px solid color-mix(in srgb, var(--accent), transparent 28%);
            border-radius: 8px;
            background:
              radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--accent), transparent 74%), transparent 44%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.94), rgba(15, 23, 42, 0.7));
            color: #ffffff;
            text-align: left;
            cursor: pointer;
            box-shadow:
              inset 0 0 0 1px rgba(255, 255, 255, 0.03),
              0 0 20px color-mix(in srgb, var(--accent), transparent 80%);
            transition:
              transform 180ms ease,
              border-color 180ms ease,
              box-shadow 180ms ease,
              background 180ms ease;
          }

          .tab-card::after {
            position: absolute;
            inset: 0;
            content: "";
            background: linear-gradient(110deg, transparent, rgba(255, 255, 255, 0.13), transparent);
            transform: translateX(-120%);
            transition: transform 420ms ease;
          }

          .tab-card:hover,
          .tab-card.active {
            transform: translateY(-3px);
            border-color: color-mix(in srgb, var(--accent), white 18%);
            background:
              radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--accent), transparent 58%), transparent 46%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.78));
            box-shadow:
              0 0 0 1px color-mix(in srgb, var(--accent), transparent 42%),
              0 0 32px color-mix(in srgb, var(--accent), transparent 55%);
          }

          .tab-card:hover::after,
          .tab-card.active::after {
            transform: translateX(120%);
          }

          .tab-card.active::before {
            position: absolute;
            inset: auto 14px 10px;
            height: 3px;
            content: "";
            border-radius: 999px;
            background: var(--accent);
            box-shadow: 0 0 14px var(--accent);
          }

          .tab-icon,
          .panel-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            color: var(--accent);
            background:
              radial-gradient(circle at 50% 20%, color-mix(in srgb, var(--accent), transparent 72%), transparent 60%),
              rgba(2, 6, 23, 0.72);
            box-shadow:
              inset 0 0 0 1px color-mix(in srgb, var(--accent), transparent 38%),
              0 0 20px color-mix(in srgb, var(--accent), transparent 74%);
          }

          .tab-icon {
            width: 48px;
            height: 48px;
          }

          .tab-text {
            position: relative;
            z-index: 1;
            display: grid;
            gap: 4px;
            min-width: 0;
          }

          .tab-text strong {
            font-size: clamp(1rem, 1.6vw, 1.2rem);
            line-height: 1.04;
          }

          .tab-text small {
            color: var(--accent);
            font-size: 0.88rem;
            font-weight: 1000;
          }

          .tab-panel {
            position: relative;
            min-height: 530px;
            overflow: hidden;
            padding: clamp(22px, 3vw, 36px);
            border: 1px solid color-mix(in srgb, var(--accent), transparent 24%);
            border-radius: 8px;
            background:
              radial-gradient(circle at 94% 8%, color-mix(in srgb, var(--accent), transparent 62%), transparent 30%),
              radial-gradient(circle at 0% 100%, rgba(14, 165, 233, 0.16), transparent 36%),
              linear-gradient(145deg, rgba(15, 23, 42, 0.96), rgba(2, 6, 23, 0.86));
            box-shadow:
              inset 0 0 42px rgba(15, 23, 42, 0.9),
              0 0 42px color-mix(in srgb, var(--accent), transparent 62%);
          }

          .tab-panel::before {
            position: absolute;
            right: -70px;
            top: -70px;
            width: 190px;
            height: 190px;
            content: "";
            border: 1px solid color-mix(in srgb, var(--accent), transparent 42%);
            border-radius: 999px;
            box-shadow: 0 0 42px color-mix(in srgb, var(--accent), transparent 56%);
          }

          .panel-header {
            position: relative;
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 18px;
          }

          .panel-icon {
            flex: 0 0 auto;
            width: 76px;
            height: 76px;
          }

          .panel-header p {
            display: inline-flex;
            margin: 0 0 6px;
            color: var(--accent);
            font-weight: 1000;
            text-transform: uppercase;
            text-shadow: 0 0 16px color-mix(in srgb, var(--accent), transparent 46%);
          }

          .panel-header h3 {
            margin: 0;
            font-size: clamp(2.1rem, 4.3vw, 3.55rem);
            line-height: 0.95;
            text-wrap: balance;
          }

          .panel-summary {
            position: relative;
            max-width: 700px;
            margin: 0 0 22px;
            color: #dbeafe;
            font-size: 1.1rem;
            font-weight: 800;
          }

          .panel-list {
            position: relative;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .panel-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            min-height: 50px;
            padding: 12px 13px;
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 8px;
            background:
              linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.64)),
              rgba(15, 23, 42, 0.72);
            color: #f8fafc;
            font-weight: 800;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
            transition:
              transform 180ms ease,
              border-color 180ms ease,
              background 180ms ease;
          }

          .panel-item:hover {
            transform: translateX(4px);
            border-color: color-mix(in srgb, var(--accent), transparent 36%);
            background:
              linear-gradient(135deg, color-mix(in srgb, var(--accent), transparent 88%), rgba(15, 23, 42, 0.82)),
              rgba(15, 23, 42, 0.82);
          }

          .panel-item svg {
            flex: 0 0 auto;
            margin-top: 2px;
            color: var(--accent);
            filter: drop-shadow(0 0 8px color-mix(in srgb, var(--accent), transparent 36%));
          }

          .quick-band {
            display: grid;
            gap: 12px;
            padding: 18px 0 4px;
          }

          .backend-pill,
          .tool-pills span {
            position: relative;
            display: flex;
            align-items: center;
            gap: 10px;
            overflow: hidden;
            border-radius: 8px;
            background: rgba(2, 6, 23, 0.8);
            color: #ffffff;
            font-weight: 900;
            box-shadow:
              inset 0 0 0 1px rgba(217, 70, 239, 0.72),
              0 0 24px rgba(217, 70, 239, 0.22);
            animation: course-card-float 4.2s ease-in-out infinite;
            transition:
              transform 180ms ease,
              border-color 180ms ease,
              box-shadow 180ms ease;
          }

          .backend-pill::before,
          .tool-pills span::before,
          .enroll-panel::before,
          .feature-chip::before {
            position: absolute;
            inset: 0;
            content: "";
            background: linear-gradient(
              110deg,
              transparent 0%,
              rgba(255, 255, 255, 0.18) 44%,
              transparent 72%
            );
            transform: translateX(-125%);
            animation: course-card-shine 5s ease-in-out infinite;
            pointer-events: none;
          }

          .backend-pill:hover,
          .tool-pills span:hover,
          .feature-chip:hover {
            transform: translateY(-5px);
            border-color: rgba(34, 211, 238, 0.78);
            box-shadow:
              inset 0 0 22px rgba(34, 211, 238, 0.18),
              0 18px 34px rgba(14, 165, 233, 0.28);
          }

          .backend-pill {
            padding: 14px 18px;
            border: 1px solid rgba(217, 70, 239, 0.72);
          }

          .backend-pill svg {
            color: #d946ef;
            flex: 0 0 auto;
          }

          .tool-pills {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
          }

          .tool-pills span {
            justify-content: center;
            min-height: 48px;
            padding: 10px 12px;
            border: 1px solid rgba(34, 211, 238, 0.5);
            box-shadow:
              inset 0 0 0 1px rgba(34, 211, 238, 0.35),
              0 0 20px rgba(34, 211, 238, 0.16);
          }

          .tool-pills span:nth-child(2) {
            animation-delay: 0.2s;
          }

          .tool-pills span:nth-child(3) {
            animation-delay: 0.4s;
          }

          .tool-pills span:nth-child(2)::before {
            animation-delay: 0.75s;
          }

          .tool-pills span:nth-child(3)::before {
            animation-delay: 1.5s;
          }

          .tool-pills svg {
            color: #22d3ee;
          }

          .outcome-section {
            display: grid;
            grid-template-columns: minmax(280px, 0.8fr) minmax(0, 1.2fr);
            gap: 18px;
            align-items: stretch;
            padding: 20px 0 24px;
          }

          .enroll-panel {
            position: relative;
            display: grid;
            align-content: center;
            gap: 8px;
            min-height: 190px;
            overflow: hidden;
            padding: 24px;
            border-radius: 8px;
            background:
              radial-gradient(circle at 88% 18%, rgba(250, 204, 21, 0.28), transparent 26%),
              linear-gradient(
                135deg,
                rgba(14, 165, 233, 0.92),
                rgba(37, 99, 235, 0.72)
              ),
              #0369a1;
            box-shadow: 0 0 34px rgba(14, 165, 233, 0.34);
            animation: enroll-card-pulse 4.8s ease-in-out infinite;
            transition:
              transform 180ms ease,
              box-shadow 180ms ease;
          }

          .enroll-panel:hover {
            transform: translateY(-5px) scale(1.01);
            box-shadow:
              0 0 44px rgba(14, 165, 233, 0.48),
              0 18px 38px rgba(37, 99, 235, 0.28);
          }

          .enroll-panel p {
            margin: 0;
            color: #fef08a;
            font-family: "Caveat", cursive;
            font-size: 2rem;
            line-height: 1;
          }

          .enroll-panel h2 {
            margin: 0;
            font-size: clamp(2.3rem, 5vw, 4.7rem);
            line-height: 0.9;
            text-transform: uppercase;
          }

          .enroll-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: fit-content;
            min-height: 52px;
            margin-top: 4px;
            padding: 0 20px;
            border-radius: 999px;
            background: linear-gradient(135deg, #facc15, #fb923c);
            color: #08111f;
            font-weight: 1000;
            text-transform: uppercase;
            box-shadow: 0 10px 24px rgba(251, 146, 60, 0.36);
          }

          .feature-row {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .feature-chip {
            position: relative;
            display: flex;
            align-items: center;
            gap: 12px;
            min-height: 88px;
            overflow: hidden;
            padding: 16px;
            border: 1px solid rgba(34, 211, 238, 0.42);
            border-radius: 8px;
            background:
              radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.14), transparent 42%),
              rgba(2, 6, 23, 0.76);
            color: #f8fafc;
            font-weight: 900;
            box-shadow: inset 0 0 28px rgba(14, 165, 233, 0.15);
            animation: course-card-float 4.2s ease-in-out infinite;
            transition:
              transform 180ms ease,
              border-color 180ms ease,
              box-shadow 180ms ease;
          }

          .feature-chip:nth-child(2) {
            animation-delay: 0.18s;
          }

          .feature-chip:nth-child(3) {
            animation-delay: 0.36s;
          }

          .feature-chip:nth-child(4) {
            animation-delay: 0.54s;
          }

          .feature-chip:nth-child(2)::before {
            animation-delay: 0.6s;
          }

          .feature-chip:nth-child(3)::before {
            animation-delay: 1.2s;
          }

          .feature-chip:nth-child(4)::before {
            animation-delay: 1.8s;
          }

          .feature-chip svg {
            color: #22d3ee;
            flex: 0 0 auto;
          }

          @keyframes course-card-float {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-4px);
            }
          }

          @keyframes course-card-shine {
            0%,
            56% {
              transform: translateX(-125%);
            }

            78%,
            100% {
              transform: translateX(125%);
            }
          }

          @keyframes enroll-card-pulse {
            0%,
            100% {
              box-shadow: 0 0 34px rgba(14, 165, 233, 0.34);
            }

            50% {
              box-shadow:
                0 0 50px rgba(14, 165, 233, 0.5),
                0 0 28px rgba(250, 204, 21, 0.18);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .backend-pill,
            .tool-pills span,
            .enroll-panel,
            .feature-chip,
            .backend-pill::before,
            .tool-pills span::before,
            .enroll-panel::before,
            .feature-chip::before {
              animation: none;
            }
          }

          @media (max-width: 980px) {
            .training-hero::before,
            .training-hero::after {
              opacity: 0.34;
            }

            .hero-topline {
              font-size: clamp(1.55rem, 6vw, 2.4rem);
            }

            .hero-stage {
              grid-template-columns: 1fr;
            }

            .hero-copy {
              justify-items: center;
              text-align: center;
              margin: 0 auto;
            }

            .hero-actions {
              justify-content: center;
            }

            .hero-showcase {
              min-height: 330px;
              width: min(620px, 100%);
              margin: 0 auto;
            }

            .main-card {
              inset: 10px 20px 66px 20px;
            }

            .tech-strip {
              grid-template-columns: repeat(5, minmax(0, 1fr));
            }

            .tab-layout,
            .outcome-section {
              grid-template-columns: 1fr;
            }

            .tab-panel {
              min-height: 0;
            }
          }

          @media (max-width: 680px) {
            .training-hero {
              min-height: auto;
              padding-top: calc(var(--header-offset, 78px) + 24px);
            }

            .hero-topline {
              display: grid;
              justify-content: start;
            }

            .hero-showcase {
              min-height: 260px;
            }

            .main-card {
              inset: 0 0 58px 0;
              transform: none;
            }

            .months-card {
              right: 6px;
              bottom: 26px;
              width: 124px;
              height: 124px;
            }

            .months-card strong {
              font-size: 3.4rem;
            }

            .months-card span {
              margin-top: -12px;
              font-size: 1.08rem;
            }

            .stack-card {
              width: calc(100% - 74px);
              min-height: 64px;
            }

            .tech-strip,
            .tab-list,
            .panel-list,
            .tool-pills,
            .feature-row {
              grid-template-columns: 1fr;
            }

            .tab-card {
              min-height: 76px;
            }

            .panel-header {
              align-items: flex-start;
            }

            .panel-icon {
              width: 58px;
              height: 58px;
            }

            .backend-pill {
              align-items: flex-start;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
