import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import IdeasGallery from './pages/IdeasGallery';
import SubmitProperty from './pages/SubmitProperty';
import Recommendations from './pages/Recommendations';
import AdminDashboard from './pages/admin/AdminDashboard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ideas" element={<IdeasGallery />} />
          <Route path="/submit" element={<SubmitProperty />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
