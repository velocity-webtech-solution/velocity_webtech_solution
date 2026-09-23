"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Cloud,
  Code2,
  Globe2,
  Headphones,
  Layers3,
  Lock,
  Mail,
  MonitorCog,
  Phone,
  Rocket,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const pricingSections = [
  {
    id: "website-development",
    number: "01",
    title: "Website Development",
    text: "Responsive, fast-loading business websites with clean layouts, contact forms, domain guidance, hosting setup, and SEO-friendly structure.",
    icon: Globe2,
    tone: "blue",
    items: [
      ["Starter Website", "Starting at Rs. 9,999"],
      ["Business Website", "Starting at Rs. 19,999"],
      ["E-commerce Website", "Starting at Rs. 29,999"],
      ["School Website", "Starting at Rs. 14,999"],
      ["Custom Website", "Starting at Rs. 24,999"],
    ],
  },
  {
    id: "e-commerce-development",
    number: "02",
    title: "E-commerce Development",
    text: "Conversion-focused online stores with product catalogues, checkout flows, secure payments, order management, and admin control.",
    icon: ShoppingCart,
    tone: "orange",
    items: [
      ["Starter Online Store", "Starting at Rs. 29,999"],
      ["Business E-commerce", "Starting at Rs. 49,999"],
      ["Payment Gateway Setup", "Starting at Rs. 9,999"],
      ["Order Management Panel", "Starting at Rs. 19,999"],
      ["Custom Marketplace", "Starting at Rs. 89,999"],
    ],
  },
  {
    id: "mobile-app-development",
    number: "03",
    title: "Mobile App Development",
    text: "User-friendly Android and iOS apps with smooth performance, scalable architecture, admin panel integration, and business-ready flows.",
    icon: Smartphone,
    tone: "green",
    items: [
      ["Basic Android App", "Starting at Rs. 29,999"],
      ["Android + iOS App", "Starting at Rs. 59,999"],
      ["Advanced Business App", "Starting at Rs. 79,999"],
      ["E-commerce App", "Starting at Rs. 89,999"],
      ["Custom App Solution", "Starting at Rs. 1,49,999"],
    ],
  },
  {
    id: "custom-software-development",
    number: "04",
    title: "Custom Software Development",
    text: "Tailor-made software for automation, management, reporting, inventory, billing, customer records, and workflow improvement.",
    icon: MonitorCog,
    tone: "violet",
    items: [
      ["Business Software", "Starting at Rs. 49,999"],
      ["CRM / ERP Solution", "Starting at Rs. 79,999"],
      ["School Management Software", "Starting at Rs. 39,999"],
      ["Inventory / Billing Software", "Starting at Rs. 34,999"],
      ["Custom Solution", "Starting at Rs. 69,999"],
    ],
  },
  {
    id: "ui-ux-design",
    number: "05",
    title: "UI/UX Design",
    text: "Modern, attractive, and user-focused designs for websites, apps, dashboards, prototypes, and product screens.",
    icon: Layers3,
    tone: "cyan",
    items: [
      ["Landing Page Design", "Starting at Rs. 4,999"],
      ["Website UI Design", "Starting at Rs. 12,999"],
      ["Mobile App UI Design", "Starting at Rs. 19,999"],
      ["Dashboard UI Design", "Starting at Rs. 14,999"],
      ["Clickable Prototype", "Starting at Rs. 9,999"],
    ],
  },
  {
    id: "api-backend-development",
    number: "06",
    title: "API & Backend Development",
    text: "Secure APIs, databases, authentication, admin workflows, integrations, and backend systems built for long-term scaling.",
    icon: Server,
    tone: "indigo",
    items: [
      ["REST API Development", "Starting at Rs. 19,999"],
      ["Database Architecture", "Starting at Rs. 14,999"],
      ["Admin Panel Backend", "Starting at Rs. 24,999"],
      ["Third-party Integration", "Starting at Rs. 9,999"],
      ["Custom Backend System", "Starting at Rs. 49,999"],
    ],
  },
  {
    id: "cloud-deployment-services",
    number: "07",
    title: "Cloud & Deployment Services",
    text: "Deployment, hosting, maintenance, cloud setup, domain support, performance optimization, and reliable post-launch guidance.",
    icon: Cloud,
    tone: "sky",
    items: [
      ["Website Maintenance", "Starting at Rs. 2,999 / month"],
      ["POS / Billing Software", "Starting at Rs. 24,999"],
      ["Software Support & Upgrades", "Starting at Rs. 44,999"],
      ["Domain & Hosting Support", "Starting at Rs. 1,499 / year"],
      ["Digital Consultation", "Starting at Rs. 1,999"],
    ],
  },
];

const highlights = [
  { title: "Modern Design", text: "Attractive, responsive and user-focused designs.", icon: BadgeCheck },
  { title: "Secure Solutions", text: "Robust security, data protection and privacy care.", icon: Lock },
  { title: "Affordable Pricing", text: "Transparent pricing with the right value for money.", icon: ShieldCheck },
  { title: "Expert Support", text: "Dedicated support and guidance at every step.", icon: Headphones },
];

export default function ServicesPricingPage() {
  return (
    <main>
      <Header />

      <section className="pricing-hero">
        <Image
          src={`${BASE_PATH}/image/banner_new_1.png`}
          alt="Velocity Webtech services pricing"
          className="pricing-hero-bg"
          width={1942}
          height={809}
          priority
        />
        <div className="pricing-hero-overlay" />
        <motion.div
          className="pricing-hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerGroup}
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            <Sparkles size={18} />
            Professional Software Services
          </motion.p>
          <motion.h1 variants={fadeUp}>Services & Pricing</motion.h1>
          <motion.p className="pricing-hero-copy" variants={fadeUp}>
            Affordable, scalable and business-focused digital solutions for
            startups, schools, shops and growing businesses.
          </motion.p>
          <motion.div className="pricing-hero-actions" variants={fadeUp}>
            <a className="primary-button" href="#website-development">
              View Pricing
              <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href={`${BASE_PATH}/#contact`}>
              Contact Us
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="pricing-hero-showcase"
          initial={{ opacity: 0, x: 36, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <div className="pricing-device-board">
            <div>
              <Globe2 size={30} />
              <span>Websites</span>
            </div>
            <div>
              <Smartphone size={30} />
              <span>Mobile Apps</span>
            </div>
            <div>
              <Code2 size={30} />
              <span>Software</span>
            </div>
            <div>
              <ShoppingCart size={30} />
              <span>E-commerce</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="pricing-strip" aria-label="Pricing service types">
        {pricingSections.slice(0, 4).map(({ id, title, icon: Icon }) => (
          <a href={`#${id}`} key={id}>
            <Icon size={22} />
            <span>{title}</span>
          </a>
        ))}
      </section>

      <section className="section pricing-section">
        <motion.div
          className="section-heading centered"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="eyebrow">
            <Zap size={18} />
            Section Wise Pricing
          </p>
          <h2>Choose the right digital solution for your business.</h2>
        </motion.div>

        <div className="pricing-grid">
          {pricingSections.map(({ id, number, title, text, icon: Icon, tone, items }) => (
            <motion.article
              className={`pricing-card ${tone}`}
              id={id}
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45 }}
            >
              <div className="pricing-card-media">
                <span className="pricing-number">{number}</span>
                <span className="service-icon">
                  <Icon size={30} />
                </span>
              </div>
              <div className="pricing-card-body">
                <h3>{title}</h3>
                <ul>
                  {items.map(([label, price]) => (
                    <li key={label}>
                      <span>
                        <CheckCircle2 size={16} />
                        {label}
                      </span>
                      <strong>{price}</strong>
                    </li>
                  ))}
                </ul>
                <p>{text}</p>
                <a className="pricing-card-cta" href={`${BASE_PATH}/#contact`}>
                  Build With Us
                  <ArrowRight size={17} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="pricing-growth-band">
        <div>
          <Rocket size={42} />
          <h2>Built for performance. Designed for growth.</h2>
        </div>
        <a className="primary-button" href={`${BASE_PATH}/#contact`}>
          Get Started Today
          <ArrowRight size={18} />
        </a>
      </section>

      <section className="pricing-highlight-grid" aria-label="Service promises">
        {highlights.map(({ title, text, icon: Icon }) => (
          <article key={title}>
            <span>
              <Icon size={24} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="pricing-contact-band">
        <a href="tel:+916291499409">
          <Phone size={20} />
          +91 6291499409
        </a>
        <a href="mailto:subhankar.rc@velocitywebtechsolution.com">
          <Mail size={20} />
          subhankar.rc@velocitywebtechsolution.com
        </a>
        <a href="https://www.velocitywebtechsolution.com">
          <Globe2 size={20} />
          www.velocitywebtechsolution.com
        </a>
      </section>

      <Footer />
    </main>
  );
}
