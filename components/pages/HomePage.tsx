
import React, { useState, useEffect, useRef } from 'react';
import { Property, Testimonial, PropertyType } from '../../types';
import { PROPERTIES, TESTIMONIALS } from '../../constants';
import PropertyCard from '../PropertyCard';
import { useOnScreen } from '../../hooks/useOnScreen';
import { ChevronDownIcon, StarIcon, ArrowRightIcon } from '../icons';

interface HomePageProps {
  onViewDetails: (property: Property) => void;
}

const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 2000;
      const incrementTime = (duration / end);
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const HomePage: React.FC<HomePageProps> = ({ onViewDetails }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredProperties = PROPERTIES.filter(p => p.status === 'Featured').slice(0, 3);
  
  const categories: { name: PropertyType; icon: string }[] = [
    { name: 'Apartment', icon: '🏢' },
    { name: 'Villa', icon: '🏡' },
    { name: 'Penthouse', icon: '🏙️' },
    { name: 'Commercial', icon: '💼' },
    { name: 'Off-Plan', icon: '🏗️' }
  ];

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center text-white text-center bg-cover bg-fixed bg-center" style={{ backgroundImage: "url('/pawanpreet-singh-gAGEEvptFSc-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-charcoal opacity-50"></div>
        <div className="relative z-10 p-6">
          <h1 className="font-serif text-5xl md:text-7xl font-semibold tracking-tight animate-[fadeInUp_1s_ease-out]">
            Discover Luxury Living in Dubai
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto my-6 animate-[expandWidth_1.5s_ease-out_0.5s]"></div>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 animate-[fadeInUp_1s_ease-out_1s]">
            Your exclusive portal to the most prestigious properties in the world's most dynamic city.
          </p>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center text-charcoal">Featured Properties</h2>
        <p className="text-center text-warm-gray mt-4 max-w-xl mx-auto">A curated selection of our finest listings, showcasing the pinnacle of luxury and design.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featuredProperties.map(prop => (
            <PropertyCard key={prop.id} property={prop} onViewDetails={onViewDetails} isFavorite={false} onToggleFavorite={()=>{}} />
          ))}
        </div>
      </section>

      {/* About Dubai Real Estate */}
      <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="pr-0 lg:pr-12">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-charcoal">The Heart of Global Luxury</h2>
          <p className="mt-6 text-warm-gray leading-loose">
            Dubai's real estate market is a testament to visionary leadership and architectural marvel. A global hub for business and leisure, it offers an unmatched lifestyle with world-class infrastructure, tax-free income, and unparalleled safety. Investing here isn't just acquiring property; it's securing a piece of the future.
          </p>
          <div className="mt-8 flex space-x-8 text-center">
            <div>
              <p className="text-4xl font-sans font-bold text-teal-accent"><AnimatedCounter value={500} />+</p>
              <p className="text-sm text-warm-gray mt-1">Properties Listed</p>
            </div>
            <div>
              <p className="text-4xl font-sans font-bold text-teal-accent"><AnimatedCounter value={95} />%</p>
              <p className="text-sm text-warm-gray mt-1">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-sans font-bold text-teal-accent"><AnimatedCounter value={20} />+</p>
              <p className="text-sm text-warm-gray mt-1">Years Experience</p>
            </div>
          </div>
        </div>
        <div className="h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-elegant">
          <img src="/david-rodrigo-Fr6zexbmjmc-unsplash.jpg" alt="Dubai Downtown Skyline" className="w-full h-full object-cover" />
        </div>
      </section>
      
      {/* Property Categories */}
      <section className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center text-charcoal">Find Your Perfect Space</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
              {categories.map(cat => (
                  <div key={cat.name} className="bg-white p-6 rounded-lg shadow-elegant text-center group hover:-translate-y-2 transition-transform duration-300">
                      <div className="text-5xl mb-4">{cat.icon}</div>
                      <h3 className="font-sans font-semibold text-charcoal">{cat.name}</h3>
                  </div>
              ))}
          </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-off-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-charcoal">What Our Clients Say</h2>
          <div className="relative mt-12 max-w-3xl mx-auto h-80">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full transition-opacity duration-700 ease-in-out ${
                  index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg" />
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-gold' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="font-serif italic text-xl text-charcoal leading-relaxed">"{testimonial.quote}"</p>
                <p className="mt-6 font-sans font-semibold text-charcoal">{testimonial.name}</p>
                <p className="text-sm text-warm-gray">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
