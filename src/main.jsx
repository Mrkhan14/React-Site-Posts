import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.jsx';
import StoreProvider from './redux/store/index.jsx';
import AuthProvider from './context/auth.jsx';

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <StoreProvider>
         <AuthProvider>
            <App />
         </AuthProvider>
      </StoreProvider>
   </StrictMode>
);
