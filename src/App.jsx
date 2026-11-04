import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider, useT } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Products from '@/pages/Products';
import Category from '@/pages/Category';
import Offers from '@/pages/Offers';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

function SkipLink() {
  const t = useT();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      {t.skipToContent}
    </a>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SkipLink />
        <Header />
        <main id="main" className="overflow-x-clip">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<Category />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <div className="pb-16 md:pb-0">
          <Footer />
        </div>
        <MobileActionBar />
        <FloatingWhatsApp />
      </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
