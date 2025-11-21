import React, { useState, useEffect, useMemo } from "react";
import { Property } from "../../types";
import PropertyCard from "../PropertyCard";
import { HeartIcon } from "../icons";

interface PropertyDetailPageProps {
  property: Property | null;
  properties: Property[];
  favorites: string[];
  onNavigateBack: () => void;
  onToggleFavorite: (propertyId: string) => void;
  onViewSimilar: (property: Property) => void;
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  properties,
  favorites,
  onNavigateBack,
  onToggleFavorite,
  onViewSimilar,
}) => {
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (property?.images?.length) {
      setMainImage(property.images[0]);
    } else {
      setMainImage("/placeholder.jpg");
    }
  }, [property]);

  const similarProperties = useMemo(() => {
    if (!property) return [];
    return properties
      .filter(
        (p) =>
          p.id !== property.id &&
          (p.type === property.type || p.location === property.location)
      )
      .slice(0, 6);
  }, [properties, property]);

  if (!property) {
    return (
      <div className="container mx-auto p-6">
        <button onClick={onNavigateBack} className="mb-4 text-blue-600">
          &larr; Back
        </button>
        <div className="p-6 bg-off-white rounded-lg">
          <p className="text-warm-gray">Property details are unavailable.</p>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(property.id);

  return (
    <div className="container mx-auto p-6">
      <button onClick={onNavigateBack} className="mb-4 text-blue-600">
        &larr; Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

      <div className="mb-6">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full max-h-[500px] object-cover rounded-lg mb-2"
        />
        <div className="flex gap-2">
          {property.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${property.title} ${index + 1}`}
              className={`w-24 h-24 object-cover rounded cursor-pointer border-2 ${
                mainImage === img ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <p className="text-xl font-semibold">
          AED {property.price.toLocaleString()}
        </p>
        <button onClick={() => onToggleFavorite(property.id)}>
          <HeartIcon
            className={`w-6 h-6 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
      </div>

      <p className="mb-6">{property.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div>Bedrooms: {property.bedrooms}</div>
        <div>Bathrooms: {property.bathrooms}</div>
        <div>Area: {property.area} sqft</div>
        <div>Type: {property.type}</div>
      </div>

      {similarProperties.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isFavorite={favorites.includes(prop.id)}
                onToggleFavorite={onToggleFavorite}
                onViewDetails={() => onViewSimilar(prop)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;
