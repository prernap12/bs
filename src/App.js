import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/home';
import Featured from './pages/Featured';
import ArrivalsPage from './pages/ArrivalsPage';
import Nepali from './components/NepaliBooks';
import Navbar from './components/navbar';
import ContactUs from './components/contactUs';
import Dashboard from './pages/admin/components/Dashboard';

function App() {
  return (
  <>
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/arrivals" element={<ArrivalsPage />} />
          <Route path="/nepali" element={<Nepali />} />

          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/admin-dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
