"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

const BASE_PATH = "/velocity_webtech_solution";

const navItems = [
  { label: "Home", href: `${BASE_PATH}#home` },
  { label: "Services", href: `${BASE_PATH}#services` },
  { label: "About", href: `${BASE_PATH}#about` },
  { label: "Portfolio", href: `${BASE_PATH}#portfolio` },
  { label: "Contact Us", href: `${BASE_PATH}#contact` },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  function handleNavClick(event, href) {
    const hash = href.split("#")[1];

    if (!hash || typeof window === "undefined") {
      return;
    }

    const isHomePage =
      window.location.pathname === BASE_PATH ||
      window.location.pathname === `${BASE_PATH}/`;

    if (!isHomePage) {
      return;
    }

    const target = document.getElementById(hash);

    if (!target) {
      return;
    }

    event.preventDefault();
    setOpen(false);

    const headerHeight =
      document.querySelector(".site-header")?.getBoundingClientRect().height ||
      0;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
    window.history.pushState(null, "", href);
  }

  return (
    <header className="site-header">
      <a
        className="brand"
        href={`${BASE_PATH}#home`}
        aria-label="Velocity Webtech Solution home"
      >
        <div className="brand-logo">
          <Image
            src={`${BASE_PATH}/image/logo.png`}
            alt="Velocity Webtech Solution logo"
            width={54}
            height={54}
            priority
          />
        </div>
        <span>Velocity Webtech Solution</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <motion.a
            key={item.href}
            href={item.href}
            onClick={(event) => handleNavClick(event, item.href)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            {item.label}
          </motion.a>
        ))}
      </nav>

      <motion.a
        className="header-cta"
        href={`${BASE_PATH}#contact`}
        onClick={(event) => handleNavClick(event, `${BASE_PATH}#contact`)}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
      >
        <MessageCircle size={18} />
        Get Started
      </motion.a>

      <button
        className="menu-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <motion.nav
          className="mobile-nav"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </motion.nav>
      )}
    </header>
  );
}
