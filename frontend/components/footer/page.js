import Image from "next/image";

const BASE_PATH = "/velocity_webtech_solution";

const navItems = [
  { label: "Home", href: `${BASE_PATH}#home` },
  { label: "Services", href: `${BASE_PATH}#services` },
  { label: "About", href: `${BASE_PATH}#about` },
  // { label: "Portfolio", href: `${BASE_PATH}#portfolio` },
  { label: "Contact Us", href: `${BASE_PATH}#contact` },
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
          <a href={`${BASE_PATH}#services`}>Website Development</a>
          <a href={`${BASE_PATH}#services`}>Mobile App Development</a>
          <a href={`${BASE_PATH}#services`}>Custom Software</a>
          <a href={`${BASE_PATH}#services`}>E-commerce</a>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <a href="tel:+916291499409">+91 6291499409</a>
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
  );
}
