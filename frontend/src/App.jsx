import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingSkeleton from './components/common/LoadingSkeleton';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PetProfilePage from './pages/PetProfilePage';
import AddPetPage from './pages/AddPetPage';
import HealthTrackerPage from './pages/HealthTrackerPage';
import GalleryPage from './pages/GalleryPage';
import RemindersPage from './pages/RemindersPage';
import VetFinderPage from './pages/VetFinderPage';
import AddVetPage from './pages/AddVetPage';
import AIAssistantPage from './pages/AIAssistantPage';
import NotesPage from './pages/NotesPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ExpenseTrackerPage from './pages/ExpenseTrackerPage';
import LostFoundPage from './pages/LostFoundPage';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          duration: 4000,
        }}
      />
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pets/:id" element={<PetProfilePage />} />
          <Route path="/add-pet" element={<AddPetPage />} />
          <Route path="/health/:id" element={<HealthTrackerPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/vet-finder" element={<VetFinderPage />} />
          <Route path="/add-vet" element={<AddVetPage />} />
          <Route path="/expenses" element={<ExpenseTrackerPage />} />
          <Route path="/lost-found" element={<LostFoundPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
