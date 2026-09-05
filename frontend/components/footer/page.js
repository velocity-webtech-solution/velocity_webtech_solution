import Image from "next/image";

const BASE_PATH = "";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  // { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Image
            src={`${BASE_PATH}/image/logo_new.gif`}
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
          <a href="/#services">Website Development</a>
          <a href="/#services">Mobile App Development</a>
          <a href="/#services">Custom Software</a>
          <a href="/#services">E-commerce</a>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <a href="tel:+916291499409">+91 6291499409</a>
          <a>subhankar.rc@velocitywebtechsolution.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Velocity Webtech Solution. All rights reserved.</span>
        <span>Your Vision, Our Mission.</span>
      </div>
    </footer>
  );
}
