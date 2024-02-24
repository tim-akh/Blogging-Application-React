import './App.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { AuthProvider } from './components/context/AuthContext';
import Navbar from './components/other/Navbar';
import PublicationDetails from './components/publication/PublicationDetails';
import PublicationForm from './components/publication/PublicationForm';
import PublicationList from './components/publication/PublicationList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './components/user/UserPage';

function App() {
  return (
    <div>
      
      <AuthProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/publications" element={<PublicationList />} />
        <Route path="/publications/new" element={<PublicationForm />} />
        <Route path="/publications/:id" element={<PublicationDetails />} />
        <Route path="/users/:username" element={<UserPage />} />
      </Routes>
      </BrowserRouter>
      </AuthProvider>

      
    </div>
  );
}

export default App;

