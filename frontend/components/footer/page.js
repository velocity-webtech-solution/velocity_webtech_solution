import Image from "next/image";

const BASE_PATH = "";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
          <h4>Contact</h4>
          <span>
            832b, M. G. Road, Haridevpur,
            <br />
            West Bengal, Kolkata - 700 082
          </span>
          <a href="tel:+916291499409">+91 6291499409</a>
          <a>info@velocitywebtechsolution.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {currentYear} Velocity Webtech Solution. All rights reserved.
        </span>
        <span>Your Vision, Our Mission.</span>
      </div>
    </footer>
  );
}
