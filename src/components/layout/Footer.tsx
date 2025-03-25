
import React from 'react';
import { Link } from 'react-router-dom';
import { coffee, instagram, facebook, twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pergamino-cream py-12 border-t border-pergamino-darkTeal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-pergamino-darkTeal">
              <div className="w-10 h-10 rounded-full bg-pergamino-darkTeal flex items-center justify-center text-white">
                <coffee className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold font-sumana">Pergamino</span>
            </Link>
            <p className="text-pergamino-darkTeal/80 mt-2">
              The finest coffee beans from around the world, crafted with passion and expertise.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-pergamino-darkTeal hover:text-pergamino-orange transition-colors">
                <instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-pergamino-darkTeal hover:text-pergamino-orange transition-colors">
                <facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-pergamino-darkTeal hover:text-pergamino-orange transition-colors">
                <twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-pergamino-darkTeal font-sumana">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-pergamino-darkTeal/80 hover:text-pergamino-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-pergamino-darkTeal/80 hover:text-pergamino-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-pergamino-darkTeal/80 hover:text-pergamino-orange transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-pergamino-darkTeal/80 hover:text-pergamino-orange transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-pergamino-darkTeal font-sumana">Contact Us</h3>
            <address className="not-italic space-y-2 text-pergamino-darkTeal/80">
              <p>123 Coffee Avenue</p>
              <p>City, Country 12345</p>
              <p>Email: info@pergamino.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>

        <div className="border-t border-pergamino-darkTeal/10 mt-12 pt-8 text-center text-pergamino-darkTeal/70">
          <p>© {new Date().getFullYear()} Pergamino Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
