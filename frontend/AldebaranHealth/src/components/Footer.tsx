import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">AldebaranHealth</h2>
            <p className="mt-3 text-sm text-left text-white">
              Leading the future of healthcare with AI-powered solutions that make quality care 
              accessible to everyone, everywhere, at any time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/about" className="text-white hover:text-gray-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-gray-200">
                  AI Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-gray-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/services" className="text-white hover:text-gray-200">
                  Doctor AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-gray-200">
                  Therapist AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-gray-200">
                  Stress Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white">Our Socials</h3>
            <div className="mt-3 flex justify-center md:justify-start space-x-4 text-gray-600">
              <a href="">
                <FontAwesomeIcon icon={faFacebook} className="text-white hover:text-gray-200"/>
              </a>
              <a href="">
               <FontAwesomeIcon icon={faInstagram} className="text-white hover:text-gray-200"/>
              </a>
              <a href="">
                <FontAwesomeIcon icon={faLinkedin} className="text-white hover:text-gray-200"/>
              </a>
              <a href="">
                <FontAwesomeIcon icon={faTwitter} className="text-white hover:text-gray-200"/>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="border-t mt-8 pt-6 text-sm text-white text-center">
          © {new Date().getFullYear()} AldebaranHealth. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
