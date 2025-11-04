import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onApplyNowClick: () => void;
}

const NavLink: React.FC<{
    page: Page;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    children: React.ReactNode;
}> = ({ page, currentPage, onNavigate, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onNavigate(page)}
      className={`relative font-sans font-medium text-sm tracking-wider uppercase transition-colors duration-300 ${
        isActive ? 'text-charcoal' : 'text-warm-gray hover:text-charcoal'
      }`}
    >
      {children}
      <span
        className={`absolute bottom-[-6px] left-0 block h-[2px] bg-champagne-gold transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0'
        }`}
      ></span>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onApplyNowClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApplyClick = () => {
    setIsMenuOpen(false);
    onApplyNowClick();
  }

  const navLinks = (
    <>
      <NavLink page={Page.Home} currentPage={currentPage} onNavigate={onNavigate}>Home</NavLink>
      <NavLink page={Page.Properties} currentPage={currentPage} onNavigate={onNavigate}>Properties</NavLink>
      <NavLink page={Page.About} currentPage={currentPage} onNavigate={onNavigate}>About Us</NavLink>
      <NavLink page={Page.Contact} currentPage={currentPage} onNavigate={onNavigate}>Contact</NavLink>
    </>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled ? 'bg-white/80 shadow-elegant backdrop-blur-custom' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => onNavigate(Page.Home)} className="text-2xl font-serif font-bold text-charcoal">
              Nesting Global<span className="text-champagne-gold">.</span>
            </button>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks}
          </nav>
          <div className="hidden lg:flex items-center">
            <button onClick={onApplyNowClick} className="bg-champagne-gold text-white font-sans text-sm font-semibold px-6 py-2 rounded-full hover:bg-gold transition-all duration-300 transform hover:scale-105">
              Apply Now
            </button>
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-charcoal focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-full bg-cream z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className="flex flex-col items-center justify-center h-full space-y-8 pt-20">
            {navLinks}
            <button onClick={handleApplyClick} className="bg-champagne-gold text-white font-sans text-sm font-semibold px-6 py-3 rounded-full hover:bg-gold transition-all duration-300">
              Apply Now
            </button>
        </nav>
      </div>
    </>
  );
};

export default Header;