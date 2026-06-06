import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myRoute from './routes/myRoute.jsx'
import {Toaster} from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRoute} />
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#ffffff",
          color: "#334155",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
        },
        success: { iconTheme: { primary: "#0d9488", secondary: "#ffffff" } },
        error: { iconTheme: { primary: "#ef4444", secondary: "#ffffff" } },
      }}
    />
  </StrictMode>,
)
