
import React, { useState } from 'react';
import { Property } from '../../types';
import { PROPERTIES } from '../../constants';
import { BedIcon, BathIcon, AreaIcon, CheckIcon, MapPinIcon, HeartIcon } from '../icons';
import PropertyCard from '../PropertyCard';

interface PropertyDetailPageProps {
  property: Property;
  onNavigateBack: () => void;
  favorites: string[];
  onToggleFavorite: (propertyId: string) => void;
  onViewSimilar: (property: Property) => void;
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ property, onNavigateBack, favorites, onToggleFavorite, onViewSimilar }) => {
  const [mainImage, setMainImage] = useState(property.images[0]);
  const isFavorite = favorites.includes(property.id);

  const similarProperties = PROPERTIES.filter(
    p => p.type === property.type && p.id !== property.id
  ).slice(0, 3);
  
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-24 md:py-32">
        {/* Gallery */}
        <section className="mb-12">
            <div className="relative">
                <img src={mainImage} alt={property.title} className="w-full h-[300px] md:h-[600px] object-cover rounded-lg shadow-elegant mb-4" />
                <button
                    onClick={() => onToggleFavorite(property.id)}
                    className="absolute top-6 right-6 bg-white/80 p-3 rounded-full text-warm-gray hover:text-red-500 transition-all duration-300 shadow-lg"
                    aria-label="Add to favorites"
                >
                    <HeartIcon className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
            </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {property.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${property.title} - view ${index + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-full h-24 md:h-40 object-cover rounded-md cursor-pointer transition-all duration-300 ${
                  mainImage === img ? 'ring-4 ring-gold' : 'opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <main className="lg:col-span-2">
            <h1 className="font-serif text-4xl md:text-6xl font-semibold text-charcoal">{property.title}</h1>
            <div className="flex items-center text-warm-gray mt-4 text-lg">
              <MapPinIcon className="w-5 h-5 mr-2 text-champagne-gold" />
              <span>{property.location}</span>
            </div>
            
            <p className="font-sans text-5xl font-bold text-teal-accent my-8">
              AED {property.price.toLocaleString()}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8 p-6 bg-off-white rounded-lg border border-beige-border">
                <div className="text-center">
                    <BedIcon className="w-8 h-8 mx-auto text-champagne-gold mb-2" />
                    <p className="font-sans font-semibold">{property.bedrooms}</p>
                    <p className="text-sm text-warm-gray">Bedrooms</p>
                </div>
                 <div className="text-center">
                    <BathIcon className="w-8 h-8 mx-auto text-champagne-gold mb-2" />
                    <p className="font-sans font-semibold">{property.bathrooms}</p>
                    <p className="text-sm text-warm-gray">Bathrooms</p>
                </div>
                 <div className="text-center">
                    <AreaIcon className="w-8 h-8 mx-auto text-champagne-gold mb-2" />
                    <p className="font-sans font-semibold">{property.area.toLocaleString()}</p>
                    <p className="text-sm text-warm-gray">sqft</p>
                </div>
                <div className="text-center">
                    <div className="text-3xl mx-auto text-champagne-gold mb-2">🏢</div>
                    <p className="font-sans font-semibold">{property.type}</p>
                    <p className="text-sm text-warm-gray">Type</p>
                </div>
            </div>

            <h2 className="font-serif text-3xl font-semibold text-charcoal mt-12 mb-4">Description</h2>
            <p className="text-warm-gray leading-loose">{property.description}</p>

            <h2 className="font-serif text-3xl font-semibold text-charcoal mt-12 mb-4">Amenities</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              {property.amenities.map(amenity => (
                <li key={amenity} className="flex items-center text-charcoal">
                  <CheckIcon className="w-5 h-5 mr-3 text-gold" />
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </main>

          {/* Sidebar */}
          <aside className="lg:sticky top-24 self-start">
            <div className="bg-cream p-8 rounded-lg border border-beige-border">
              <h3 className="font-serif text-2xl font-semibold text-center mb-6">Schedule a Viewing</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold" />
                <input type="tel" placeholder="Phone Number (+971...)" className="w-full px-4 py-3 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold" />
                <textarea placeholder="Your Message..." rows={4} className="w-full px-4 py-3 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold"></textarea>
                <button type="submit" className="w-full bg-teal-accent text-white font-sans font-semibold py-3 rounded-md hover:bg-opacity-90 transition-colors duration-300">
                  Send Inquiry
                </button>
              </form>
            </div>
            <div className="mt-8">
              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-4">Location</h3>
              <div className="w-full h-64 rounded-lg overflow-hidden border border-beige-border">
                <iframe
                  title="Property Location"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178653925015!2d${property.coordinates.lng}!3d${property.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEwJzM5LjYiTiA1NcKwMTYnMzEuMSJF!5e0!3m2!1sen!2sae!4v1672520800000!5m2!1sen!2sae`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </aside>
        </div>
        
        {/* Similar Properties */}
        {similarProperties.length > 0 && (
            <section className="mt-24">
                <h2 className="font-serif text-4xl font-semibold text-charcoal mb-8 text-center">Similar Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {similarProperties.map(prop => (
                        <PropertyCard
                            key={prop.id}
                            property={prop}
                            onViewDetails={onViewSimilar}
                            isFavorite={favorites.includes(prop.id)}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))}
                </div>
            </section>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailPage;
