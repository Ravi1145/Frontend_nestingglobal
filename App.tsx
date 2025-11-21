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

  // Fetch properties
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/properties`)
      .then(res => res.json())
      .then(data => {
        if (data && data.properties) {
          setAllProperties(data.properties.map(transformProperty));
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);


  // Live updates
  useSocket("propertyAdded", (newProperty) => {
    setAllProperties(prev => [transformProperty(newProperty), ...prev]);
  });

  useSocket("propertyUpdated", (updatedProperty) => {
    setAllProperties(prev =>
      prev.map(p =>
        p.id === (updatedProperty._id || updatedProperty.id)
          ? transformProperty(updatedProperty)
          : p
      )
    );
  });
  
  useEffect(()=> {
    window.scrollTo(0,0);

  },[currentPage,selectedProperty]);
  

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
              properties={allProperties}  
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