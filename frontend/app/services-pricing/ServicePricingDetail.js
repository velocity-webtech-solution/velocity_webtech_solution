"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Mail,
  Phone,
  Rocket,
  Sparkles,
} from "lucide-react";
import { getPricingSection, pricingHighlights } from "./pricing-data";

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

export default function ServicePricingDetail({ serviceId }) {
  const service = getPricingSection(serviceId);

  if (!service) {
    return null;
  }

  const Icon = service.icon;

  return (
    <main>
      <Header />

      <section className={`service-pricing-hero ${service.tone}`}>
        <Image
          src={`${BASE_PATH}/image/banner_new_1.png`}
          alt={`${service.title} pricing`}
          className="pricing-hero-bg"
          width={1942}
          height={809}
          priority
        />
        <div className="pricing-hero-overlay" />
        <motion.div
          className="service-pricing-hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerGroup}
        >
          <motion.a
            className="service-pricing-back"
            href={`${BASE_PATH}/#services`}
            variants={fadeUp}
          >
            <ArrowLeft size={17} />
            Back to Services
          </motion.a>
          <motion.p className="eyebrow" variants={fadeUp}>
            <Sparkles size={18} />
            {service.eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp}>{service.title}</motion.h2>
          <motion.p className="pricing-hero-copy" variants={fadeUp}>
            {service.text}
          </motion.p>
          <motion.div className="pricing-hero-actions" variants={fadeUp}>
            <a className="primary-button" href={`${BASE_PATH}/#contact`}>
              {service.cta ? "Contact Us Today" : "Build With Us"}
              <ArrowRight size={18} />
            </a>
            {!service.hidePricingDetails ? (
              <a className="secondary-button" href="#pricing">
                View Pricing
              </a>
            ) : null}
          </motion.div>
        </motion.div>

        <motion.div
          className="service-pricing-summary"
          initial={{ opacity: 0, x: 36, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <span className="service-pricing-number">{service.number}</span>
          <span className="service-icon">
            <Icon size={34} />
          </span>
          <strong>{service.title}</strong>
          <p>{service.startingPrice || service.items[0][1]}</p>
        </motion.div>
      </section>

      {service.intro ? (
        <section className="section service-story-section">
          <motion.div
            className="service-story-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerGroup}
          >
            <motion.div className="service-story-copy" variants={fadeUp}>
              <p className="eyebrow">
                <Icon size={18} />
                Tailored For Your Business
              </p>
              <h2>
                {service.storyTitle ||
                  "Modern websites that look sharp and work hard."}
              </h2>
              <p>{service.intro}</p>
            </motion.div>

            <motion.div className="service-audience-card" variants={fadeUp}>
              <span>
                <Sparkles size={24} />
              </span>
              <h3>{service.audienceTitle || "Built for real business goals"}</h3>
              <p>{service.audience}</p>
            </motion.div>
          </motion.div>
        </section>
      ) : null}

      {!service.hidePricingDetails ? (
        <section id="pricing" className="section service-pricing-section">
          <motion.div
            className="section-heading centered"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="eyebrow">
              <Icon size={18} />
              Pricing Details
            </p>
            <h2>{service.title} packages for your business.</h2>
          </motion.div>

          <div className="service-pricing-layout">
            <motion.article
              className={`pricing-card service-pricing-main-card ${service.tone}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
            >
              <div className="pricing-card-media">
                <span className="pricing-number">{service.number}</span>
                <span className="service-icon">
                  <Icon size={32} />
                </span>
              </div>
              <div className="pricing-card-body">
                <h3>{service.title}</h3>
                <ul>
                  {service.items.map(([label, price]) => (
                    <li key={label}>
                      <span>
                        <CheckCircle2 size={16} />
                        {label}
                      </span>
                      <strong>{price}</strong>
                    </li>
                  ))}
                </ul>
                <p>{service.text}</p>
                <a className="pricing-card-cta" href={`${BASE_PATH}/#contact`}>
                  Get Started Today
                  <ArrowRight size={17} />
                </a>
              </div>
            </motion.article>

            <aside className="service-work-panel">
              <h3>What this work includes</h3>
              <div>
                {service.deliverables.map((item) => (
                  <span key={item}>
                    <CheckCircle2 size={16} />
                    {item}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>
      ) : null}

      {service.whyChoose ? (
        <section className="section service-choice-section">
          <motion.div
            className="section-heading centered"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="eyebrow">
              <CheckCircle2 size={18} />
              Why Choose Velocity Webtech Solution?
            </p>
            <h2>
              {service.choiceTitle ||
                "Clear design, clean development, and support after launch."}
            </h2>
          </motion.div>

          <motion.div
            className="service-choice-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={staggerGroup}
          >
            {service.whyChoose.map((item) => (
              <motion.article key={item} variants={fadeUp}>
                <CheckCircle2 size={20} />
                <strong>{item}</strong>
              </motion.article>
            ))}
          </motion.div>
        </section>
      ) : null}

      <section className="pricing-growth-band">
        <div>
          <Rocket size={42} />
          <h2>
            {service.cta || "Built for performance. Designed for growth."}
          </h2>
        </div>
        <a className="primary-button" href={`${BASE_PATH}/#contact`}>
          Contact Velocity For Your Enquiry
          <ArrowRight size={18} />
        </a>
      </section>

      <section className="pricing-highlight-grid" aria-label="Service promises">
        {pricingHighlights.map(({ title, text, icon: HighlightIcon }) => (
          <article key={title}>
            <span>
              <HighlightIcon size={24} />
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
