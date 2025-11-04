import React, { useState, useCallback, useEffect } from 'react';
import { Page, Property } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import PropertiesPage from './components/pages/PropertiesPage';
import PropertyDetailPage from './components/pages/PropertyDetailPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import ApplyNowModal from './components/ApplyNowModal';
import { PROPERTIES } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>(PROPERTIES);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedProperty]);
  
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
        return <HomePage onViewDetails={viewPropertyDetails} />;
      case Page.Properties:
        return <PropertiesPage 
                 properties={allProperties}
                 onViewDetails={viewPropertyDetails} 
                 favorites={favorites} 
                 onToggleFavorite={toggleFavorite} />;
      case Page.PropertyDetail:
        if (selectedProperty) {
          return <PropertyDetailPage 
                   property={selectedProperty} 
                   onNavigateBack={() => navigateTo(Page.Properties)}
                   favorites={favorites}
                   onToggleFavorite={toggleFavorite}
                   onViewSimilar={viewPropertyDetails}
                  />;
        }
        // Fallback to properties page if no property is selected
        navigateTo(Page.Properties); 
        return null;
      case Page.About:
        return <AboutPage />;
      case Page.Contact:
        return <ContactPage />;
      default:
        return <HomePage onViewDetails={viewPropertyDetails} />;
    }
  };

  return (
    <div className="bg-cream min-h-screen font-body text-charcoal">
      <Header 
        currentPage={currentPage} 
        onNavigate={navigateTo} 
        onApplyNowClick={() => setIsApplyModalOpen(true)}
      />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={navigateTo}/>
      <ApplyNowModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
      />
    </div>
  );
};

export default App;