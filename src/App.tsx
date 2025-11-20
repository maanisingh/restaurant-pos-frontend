import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home, UtensilsCrossed, ShoppingCart, ChefHat, LayoutDashboard } from 'lucide-react';
import './App.css';

// Pages
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Kitchen from './pages/Kitchen';
import Tables from './pages/Tables';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app">
          {/* Navigation */}
          <nav className="nav">
            <div className="nav-container">
              <div className="nav-brand">
                <UtensilsCrossed size={32} />
                <h1>Restaurant POS</h1>
              </div>
              <div className="nav-links">
                <Link to="/" className="nav-link">
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
                <Link to="/menu" className="nav-link">
                  <Home size={20} />
                  Menu
                </Link>
                <Link to="/orders" className="nav-link">
                  <ShoppingCart size={20} />
                  Orders
                </Link>
                <Link to="/kitchen" className="nav-link">
                  <ChefHat size={20} />
                  Kitchen
                </Link>
                <Link to="/tables" className="nav-link">
                  <LayoutDashboard size={20} />
                  Tables
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/kitchen" element={<Kitchen />} />
              <Route path="/tables" element={<Tables />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
