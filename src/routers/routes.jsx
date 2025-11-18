import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { LayoutAdmin } from "../layouts/LayoutAdmin";
import { ProtectedRoute } from "../hooks/ProtectedRoute";
import { NotFound } from "../pages/NotFound";
import { EspecialitiesPage } from "../pages/EspecialitiesPage";
import { HoraryPage } from "../pages/HoraryPage";
import { UsersPage } from "../pages/UsersPage";
import { HistoryMedicPage } from "../pages/HistoryMedicPage";
import { PacientPage } from "../pages/PacientPage";
import { ConsultoryPage } from "../pages/ConsultoryPage";
import { AppointmentsPage } from "../pages/AppointmentsPage";
import { PayPage } from "../pages/PayPage";

export const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute authenticated={false}>
            <LoginPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute authenticated={true}>
            <LayoutAdmin />
          </ProtectedRoute>
        }
      >
        <Route index element={<HoraryPage />} />
        <Route path="/especialidades" element={<EspecialitiesPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/historias" element={<HistoryMedicPage />} />
        <Route path="/pacientes" element={<PacientPage />} />
        <Route path="/consultorios" element={<ConsultoryPage />} />
        <Route path="/citas" element={<AppointmentsPage />} />
        <Route path="/pagos" element={<PayPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
