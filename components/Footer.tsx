
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-off-white border-t border-beige-border text-charcoal">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Company */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-serif font-bold mb-4">Nesting Global<span className="text-champagne-gold">.</span></h3>
            <p className="text-warm-gray text-sm leading-relaxed">
              Your premier gateway to Dubai's most exclusive luxury properties. We curate exceptional living experiences with unparalleled service and expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-semibold tracking-wider uppercase text-charcoal mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate(Page.Home)} className="text-warm-gray hover:text-gold transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate(Page.Properties)} className="text-warm-gray hover:text-gold transition-colors">Properties</button></li>
              <li><button onClick={() => onNavigate(Page.About)} className="text-warm-gray hover:text-gold transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate(Page.Contact)} className="text-warm-gray hover:text-gold transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-sans font-semibold tracking-wider uppercase text-charcoal mb-4">Contact Us</h4>
            <address className="not-italic text-sm text-warm-gray space-y-3">
              <p>One Palm, Palm Jumeirah, Dubai, UAE</p>
              <p><a href="tel:+971563138227" className="hover:text-gold transition-colors">+971 563138227</a></p>
              <p><a href="mailto:Support@nestingglobal.com" className="hover:text-gold transition-colors">Support@nestingglobal.com</a></p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-sans font-semibold tracking-wider uppercase text-charcoal mb-4">Newsletter</h4>
            <p className="text-warm-gray text-sm mb-4">Receive exclusive listings and market updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your Email"
                className="w-full px-4 py-2 text-sm bg-white border border-beige-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-champagne-gold"
              />
              <button type="submit" className="bg-teal-accent text-white px-4 rounded-r-md hover:bg-opacity-90 transition-colors">
                &rarr;
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-beige-border flex flex-col sm:flex-row justify-between items-center text-sm text-warm-gray">
          <p>&copy; {new Date().getFullYear()} Nesting Global. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {/* Social media icons can be added here */}
            <a href="#" className="hover:text-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-gold transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-gold transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
