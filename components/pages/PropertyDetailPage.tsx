import React, { useState, useEffect } from "react";
import { Property } from "../../types";
import PropertyCard from "../PropertyCard";
import { io } from "socket.io-client";
import { HeartIcon } from "../icons";

interface PropertyDetailPageProps {
  propertyId: string;
  favorites: string[];
  onNavigateBack: () => void;
  onToggleFavorite: (propertyId: string) => void;
  onViewSimilar: (propertyId: string) => void;
}

const socket = io("http://localhost:5000");

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  propertyId,
  favorites,
  onNavigateBack,
  onToggleFavorite,
  onViewSimilar,
}) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);

  // Fetch property data
  const fetchProperty = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/properties/${propertyId}`);
      const data = await res.json();
      if (data.success) {
        setProperty(data.property);
        setMainImage(data.property.images[0] || "");
        fetchSimilarProperties(data.property.id);
      } else {
        console.error("Property not found");
      }
    } catch (err) {
      console.error("Error fetching property:", err);
    }
  };

  // Fetch similar properties
  const fetchSimilarProperties = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/properties/${id}/similar`);
      const data = await res.json();
      if (data.success) {
        setSimilarProperties(data.properties);
      }
    } catch (err) {
      console.error("Error fetching similar properties:", err);
    }
  };

  useEffect(() => {
    if (propertyId) fetchProperty();

    socket.on("propertyUpdated", (updatedProperty: any) => {
      if (updatedProperty.id === propertyId) fetchProperty();
    });

    socket.on("propertyAdded", (newProperty: any) => {
      if (newProperty.id === propertyId) fetchProperty();
    });

    return () => {
      socket.off("propertyUpdated");
      socket.off("propertyAdded");
    };
  }, [propertyId]);

  if (!property) return <p>Loading...</p>;

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
          {property.images.map((img, index) => (
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
        <p className="text-xl font-semibold">AED {property.price.toLocaleString()}</p>
        <button onClick={() => onToggleFavorite(property.id)}>
          <HeartIcon className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      <p className="mb-6">{property.description}</p>

      {/* Property details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div>Bedrooms: {property.bedrooms}</div>
        <div>Bathrooms: {property.bathrooms}</div>
        <div>Area: {property.area} sqft</div>
        <div>Type: {property.type}</div>
      </div>

      {/* Similar properties */}
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
                onViewDetails={() => onViewSimilar(prop.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;
