import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegistrationPage from '../pages/RegistrationPage';
import FavoritesPage from './../pages/FavoritesPage';
import VideosPage from './../pages/VideosPage';
import MainLayout from './MainLayout';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/videos" />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
