import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource/noto-sans-tamil/400.css';
import '@fontsource/noto-sans-tamil/500.css';
import '@fontsource/noto-sans-tamil/600.css';
import '@fontsource/noto-sans-tamil/700.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource-variable/arima';
import './index.css';
import App from './App';
import { initTapTracking } from './lib/analytics';

initTapTracking();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
