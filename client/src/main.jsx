import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myRoute from './routes/myRoute.jsx'
import {Toaster} from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRoute} />
    <Toaster position='top-center' reverseOrder={false} />
  </StrictMode>,
)
