
import React, { useState, useMemo, useEffect } from 'react';
import { Property, PropertyType } from '../../types';
import PropertyCard from '../PropertyCard';
import { ChevronDownIcon } from '../icons';

interface PropertiesPageProps {
  properties: Property[];
  onViewDetails: (property: Property) => void;
  favorites: string[];
  onToggleFavorite: (propertyId: string) => void;
}

const PropertiesPage: React.FC<PropertiesPageProps> = ({ properties=[], onViewDetails, favorites, onToggleFavorite }) => {
  const [filters, setFilters] = useState({
    location: 'All',
    type: 'All',
    price: 100000000,
    bedrooms: 'Any',
    bathrooms: 'Any',
  });
  const [sortBy, setSortBy] = useState('Newest First');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (filterName: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const locations = useMemo(() => ['All', ...new Set(properties.map(p => p.location))], [properties]);
  const types: (PropertyType | 'All')[] = ['All', 'Apartment', 'Villa', 'Penthouse', 'Commercial', 'Off-Plan'];

  const filteredAndSortedProperties = useMemo(() => {
    let result = properties
      .filter(p => filters.location === 'All' || p.location === filters.location)
      .filter(p => filters.type === 'All' || p.type === filters.type)
      .filter(p => p.price <= filters.price)
      .filter(p => filters.bedrooms === 'Any' || p.bedrooms >= parseInt(filters.bedrooms as string))
      .filter(p => filters.bathrooms === 'Any' || p.bathrooms >= parseInt(filters.bathrooms as string))
      .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase()));

    switch (sortBy) {
      case 'Price (Low to High)':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price (High to Low)':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Newest First':
        // Using ID as a proxy for newest, assuming higher ID is newer
        result.sort((a, b) => parseInt(b.id.substring(1)) - parseInt(a.id.substring(1)));
        break;
    }
    return result;
  }, [properties, filters, sortBy, searchTerm]);

  return (
    <div className="bg-off-white">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-charcoal">Our Exclusive Portfolio</h1>
          <p className="mt-4 text-lg text-warm-gray max-w-2xl mx-auto">Browse our collection of exquisite properties, each selected for its unique character and luxury.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-1/4 lg:sticky top-24 self-start">
            <div className="bg-white p-6 rounded-lg shadow-elegant space-y-6">
              <h3 className="text-2xl font-serif font-semibold">Filter Properties</h3>
              {/* Search */}
              <div>
                <label className="text-sm font-sans font-semibold text-charcoal block mb-2">Search</label>
                <input
                  type="text"
                  placeholder="e.g. 'Penthouse in Downtown'"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="text-sm font-sans font-semibold text-charcoal block mb-2">Location</label>
                <select id="location" value={filters.location} onChange={(e) => handleFilterChange('location', e.target.value)} className="w-full px-4 py-2 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold">
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label htmlFor="type" className="text-sm font-sans font-semibold text-charcoal block mb-2">Property Type</label>
                <select id="type" value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)} className="w-full px-4 py-2 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold">
                  {types.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              
              {/* Price Range */}
              <div>
                <label htmlFor="price" className="text-sm font-sans font-semibold text-charcoal block mb-2">Max Price</label>
                <input type="range" id="price" min="1000000" max="100000000" step="1000000" value={filters.price} onChange={(e) => handleFilterChange('price', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-champagne-gold" />
                <div className="text-center text-warm-gray text-sm mt-1">Up to AED {filters.price.toLocaleString()}</div>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bedrooms" className="text-sm font-sans font-semibold text-charcoal block mb-2">Bedrooms</label>
                  <select id="bedrooms" value={filters.bedrooms} onChange={(e) => handleFilterChange('bedrooms', e.target.value)} className="w-full px-4 py-2 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold">
                    <option>Any</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bathrooms" className="text-sm font-sans font-semibold text-charcoal block mb-2">Bathrooms</label>
                  <select id="bathrooms" value={filters.bathrooms} onChange={(e) => handleFilterChange('bathrooms', e.target.value)} className="w-full px-4 py-2 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold">
                    <option>Any</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Property Grid */}
          <main className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-warm-gray">{filteredAndSortedProperties.length} properties found</p>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 text-sm border border-beige-border rounded-md focus:outline-none focus:ring-2 focus:ring-champagne-gold">
                <option>Newest First</option>
                <option>Price (Low to High)</option>
                <option>Price (High to Low)</option>
              </select>
            </div>
            {filteredAndSortedProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAndSortedProperties.map(prop => (
                    <PropertyCard
                      key={prop.id}
                      property={prop}
                      onViewDetails={(id) => {
                        const p = properties.find(x => x.id === id);
                        if (p) onViewDetails(p);
                      }}
                      isFavorite={favorites.includes(prop.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-elegant">
                    <h3 className="text-2xl font-serif text-charcoal">No Properties Found</h3>
                    <p className="text-warm-gray mt-2">Try adjusting your filters to find your perfect home.</p>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
