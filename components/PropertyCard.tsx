import React, { useRef } from 'react';
import { Property } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';
import { MapPinIcon, BedIcon, BathIcon, AreaIcon, HeartIcon } from './icons';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (propertyId: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (propertyId: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  isFavorite,
  onToggleFavorite
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref, '-100px');

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(property.id);
  };

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg shadow-elegant overflow-hidden transition-all duration-700 ease-out-expo transform hover:-translate-y-2 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onClick={() => property.id && onViewDetails(property.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="relative overflow-hidden">
        <img
          src={property.images?.[0] || '/placeholder.jpg'}
          alt={property.title}
          className="w-full h-64 object-cover transition-transform duration-500 ease-out-expo group-hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>

        {property.status !== 'For Sale' && (
          <span className="absolute top-4 left-4 bg-gold text-white text-xs font-sans font-bold uppercase px-3 py-1 rounded-full">
            {property.status}
          </span>
        )}

        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-warm-gray hover:text-red-500 transition-all duration-300"
          aria-label="Add to favorites"
        >
          <HeartIcon className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      <div className="p-6">
        <h3 className="font-serif text-2xl font-semibold text-charcoal leading-tight truncate">
          {property.title}
        </h3>

        <div className="flex items-center text-warm-gray mt-2">
          <MapPinIcon className="w-4 h-4 mr-2 text-champagne-gold" />
          <span className="text-sm">{property.location}</span>
        </div>

        <p className="font-sans text-2xl font-bold text-teal-accent mt-4">
          AED {property.price?.toLocaleString() || 0}
        </p>

        <div className="mt-4 pt-4 border-t border-beige-border flex justify-between items-center text-warm-gray text-sm">
          <div className="flex items-center">
            <BedIcon className="w-5 h-5 mr-2" />
            <span>{property.bedrooms || 0}</span>
          </div>

          <div className="flex items-center">
            <BathIcon className="w-5 h-5 mr-2" />
            <span>{property.bathrooms || 0}</span>
          </div>

          <div className="flex items-center">
            <AreaIcon className="w-5 h-5 mr-2" />
            <span>{property.area?.toLocaleString() || 0} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
