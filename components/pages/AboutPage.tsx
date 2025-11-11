import React, { useRef } from 'react';
import { AGENTS } from '../../constants';
import { useOnScreen } from '../../hooks/useOnScreen';

const AnimatedSection: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');
    return (
        <div ref={ref} className={`transition-all duration-1000 ease-out-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
}

const AboutPage: React.FC = () => {
  const features = [
    { title: "Expert Knowledge", description: "Our partners possess deep, nuanced understanding of Dubai's property landscape.", icon: "🧠" },
    { title: "Exclusive Listings", description: "Access to a curated portfolio of off-market and premium properties.", icon: "🔑" },
    { title: "Personalized Service", description: "A bespoke, client-centric approach tailored to your unique aspirations.", icon: "🤝" },
    { title: "Legal Support", description: "Comprehensive guidance through all legal and RERA compliance matters.", icon: "⚖️" }
  ];

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative bg-off-white pt-32 pb-16 md:pt-48 md:pb-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-serif font-semibold text-charcoal">Redefining Global Luxury Real Estate</h1>
          <p className="mt-6 text-lg text-warm-gray max-w-3xl mx-auto">
            At Nesting Global, we don't just sell properties; we curate lifestyles. Our foundation is built on a passion for Dubai's architectural marvels and a commitment to providing an unparalleled client experience.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="h-96 md:h-[600px] rounded-lg overflow-hidden shadow-elegant">
              <img src="/pawanpreet-singh-gAGEEvptFSc-unsplash.jpg" alt="Atlantis The Palm Dubai" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-charcoal">Our Journey</h2>
            <p className="mt-6 text-warm-gray leading-loose">
              Nesting Global was born from a vision to create a real estate consultancy that mirrors the ambition and luxury of Dubai itself. We began with a dedicated team of partners and a simple mission: to connect discerning individuals with the city's most extraordinary homes.
            </p>
            <p className="mt-4 text-warm-gray leading-loose">
              Today, we are recognized as a leader in the luxury market, with offices in New Delhi and a primary presence in Dubai. Our core values of integrity, discretion, and personalized service remain unchanged. We are more than agents; we are trusted advisors, dedicated to realizing your vision of the perfect global lifestyle.
            </p>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="bg-off-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-charcoal">The Nesting Global Advantage</h2>
            <p className="mt-4 text-warm-gray max-w-2xl mx-auto">Experience the difference that dedication, expertise, and a passion for excellence can make.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {features.map((feature, index) => (
              <AnimatedSection key={index}>
                <div className="bg-white p-8 rounded-lg text-center h-full shadow-elegant">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="font-sans text-xl font-semibold text-charcoal mb-2">{feature.title}</h3>
                  <p className="text-sm text-warm-gray leading-relaxed">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-charcoal">Meet Our Experts & Partners</h2>
          <p className="mt-4 text-warm-gray max-w-2xl mx-auto">A team of seasoned professionals dedicated to achieving your real estate goals.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {AGENTS.map(agent => (
            <AnimatedSection key={agent.id}>
              <div className="bg-white rounded-lg shadow-elegant overflow-hidden text-center group">
                <div className="relative h-80">
                  <img src={agent.image} alt={agent.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-sans text-xl font-semibold text-charcoal">{agent.name}</h3>
                  <p className="text-champagne-gold text-sm font-medium mt-1">{agent.title}</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <a href={agent.linkedin} className="text-warm-gray hover:text-gold transition-colors">LinkedIn</a>
                    <a href={agent.email} className="text-warm-gray hover:text-gold transition-colors">Email</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
