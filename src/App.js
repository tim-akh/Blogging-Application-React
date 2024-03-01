import './App.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { AuthProvider } from './components/context/AuthContext';
import Navbar from './components/other/Navbar';
import PublicationDetails from './components/publication/PublicationDetails';
import PublicationList from './components/publication/PublicationList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './components/user/UserPage';
import PublicationEdit from './components/publication/PublicationEdit';
import PublicationCreate from './components/publication/PublicationCreate';
import CommentEdit from './components/comment/CommentEdit';
import CommentDetails from './components/comment/CommentDetails';
import ReportList from './components/report/ReportList';
import ReportCreate from './components/report/ReportCreate';

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
            <Route path="/publications/new" element={<PublicationCreate />} />
            <Route path="/publications/:id" element={<PublicationDetails />} />
            <Route path="/publications/:id/edit" element={<PublicationEdit />} />
            <Route path="/comments/:id" element={<CommentDetails />} />
            <Route path="/comments/:id/edit" element={<CommentEdit />} />
            <Route path="/users/:username" element={<UserPage />} />
            <Route path="/reports" element={<ReportList />} />
            <Route path="/reports/new" element={<ReportCreate />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

      
    </div>
  );
}

export default App;

