import React, { useState, useCallback, useEffect } from 'react';
import { useSocket } from './hooks/useSocket';

import { Page, Property } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import PropertiesPage from './components/pages/PropertiesPage';
import PropertyDetailPage from './components/pages/PropertyDetailPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import ApplyNowModal from './components/ApplyNowModal';

const API_BASE_URL =
  "https://backend-nestinggloabl.onrender.com";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const transformProperty = (p: any) => ({
    id: p._id || p.id,
    title: p.title,
    location: p.location,
    price: p.price,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    type: p.type,
    status: p.status,
    images: p.images,
    description: p.description,
    amenities: p.amenities,
    agent: p.agent,
    coordinates: p.coordinates,
  });

  useEffect(() => {
    try {
      const cached = localStorage.getItem('propertiesCache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) setAllProperties(parsed.map(transformProperty));
      }
    } catch {}

    fetch(`${API_BASE_URL}/api/properties`)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data) ? data : (data.properties || []);
        const mapped = items.map(transformProperty);
        setAllProperties(mapped);
        try { localStorage.setItem('propertiesCache', JSON.stringify(mapped)); } catch {}
      })
      .catch(() => {});
  }, []);


  // Live updates
  useSocket("propertyAdded", (newProperty) => {
    setAllProperties(prev => {
      const updated = [transformProperty(newProperty), ...prev];
      try { localStorage.setItem('propertiesCache', JSON.stringify(updated)); } catch {}
      return updated;
    });
  });

  useSocket("propertyUpdated", (updatedProperty) => {
    setAllProperties(prev => {
      const updated = prev.map(p =>
        p.id === (updatedProperty._id || updatedProperty.id)
          ? transformProperty(updatedProperty)
          : p
      );
      try { localStorage.setItem('propertiesCache', JSON.stringify(updated)); } catch {}
      return updated;
    });
  });

  useSocket("propertyDeleted", (deletedProperty) => {
    const deletedId = deletedProperty._id || deletedProperty.id;
    setAllProperties(prev => {
      const updated = prev.filter(p => p.id !== deletedId);
      try { localStorage.setItem('propertiesCache', JSON.stringify(updated)); } catch {}
      return updated;
    });
  });

  const toggleFavorite = useCallback((propertyId: string) => {
    setFavorites(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setSelectedProperty(null);
  };

  const viewPropertyDetails = (property: Property) => {
    setSelectedProperty(property);
    setCurrentPage(Page.PropertyDetail);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage onViewDetails={viewPropertyDetails} properties={allProperties} />;
      case Page.Properties:
        return (
          <PropertiesPage
            properties={allProperties}
            onViewDetails={viewPropertyDetails}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        );
      case Page.PropertyDetail:
        if (selectedProperty) {
          return (
            <PropertyDetailPage
              property={selectedProperty}
              onNavigateBack={() => navigateTo(Page.Properties)}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onViewSimilar={viewPropertyDetails}
            />
          );
        }
        navigateTo(Page.Properties);
        return null;
      case Page.About:
        return <AboutPage />;
      case Page.Contact:
        return <ContactPage />;
      default:
        return <HomePage onViewDetails={viewPropertyDetails} properties={allProperties} />;
    }
  };

  return (
    <div className="bg-cream min-h-screen font-body text-charcoal">
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onApplyNowClick={() => setIsApplyModalOpen(true)}
      />
      <main>{renderPage()}</main>
      <Footer onNavigate={navigateTo} />
      <ApplyNowModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
};

export default App;
