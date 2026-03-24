import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroUIProvider } from '@heroui/react'
import { RouterProvider } from 'react-router'
import { myRouter } from './Routing/AppRouter'

import { ThemeProvider } from './Context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <HeroUIProvider>
        <RouterProvider router={myRouter}/>
      </HeroUIProvider>
    </ThemeProvider>
  </StrictMode>,
)
