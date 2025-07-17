import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import ProfilePage from "./pages/ProfilePage"
import PortfolioPage from "./pages/PortfolioPage"
import MarketDetailPage from "./pages/MarketDetailPage"


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage />, },
      { path: 'market-detail/:id', element: <MarketDetailPage /> },
      { path: 'portfolio', element: <PortfolioPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
    errorElement: <NotFoundPage />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
