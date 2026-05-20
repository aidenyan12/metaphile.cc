import React from 'react';
import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import { useGalleryTranslation } from './hooks/useGalleryTranslation.js';

const NotFound = () => {
  const { t } = useGalleryTranslation();
  return (
    <div className="flex min-h-[60vh] flex-1 flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">{t('not_found_title')}</h1>
      <p className="mb-8 max-w-md text-muted-foreground">{t('not_found_message')}</p>
      <Link to="/" className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90">
        {t('return_to_gallery')}
      </Link>
    </div>
  );
};

function App() {
  return (
    <Router basename="/gallery">
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
        <Header />
        <main className="flex-1 pt-24 sm:pt-28 lg:pt-32">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:projectId" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
