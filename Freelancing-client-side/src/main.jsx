import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/router';
import AuthProvider from './Provider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './Context/ThemeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <>
          <RouterProvider router={router} />
          <Toaster />
        </>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
