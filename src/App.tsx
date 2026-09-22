import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { isSupabaseConfigured } from '@/db/supabaseClient'
import { AuthProvider } from '@/auth/AuthContext'
import ProtectedRoute from '@/auth/ProtectedRoute'
import GuestRoute from '@/auth/GuestRoute'
import LoginPage from '@/auth/LoginPage'
import DashboardPage from '@/editions/DashboardPage'
import MapPage from '@/map/MapPage'
import ConfigErrorScreen from '@/ui/ConfigErrorScreen'

// Routing dell'app. Le rotte riservate sono avvolte da ProtectedRoute,
// che reindirizza al login se non c'e' una sessione valida (§3, §43);
// la rotta di login e' avvolta da GuestRoute, che fa l'inverso (chi e'
// gia' autenticato non deve restare bloccato sul form).
export default function App() {
  // Se le chiavi Supabase non sono configurate, meglio uno schermo
  // chiaro che spiega cosa manca piuttosto che un crash silenzioso
  // che lascia la pagina bianca (§34, §54).
  if (!isSupabaseConfigured) {
    return <ConfigErrorScreen />
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mappa"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
