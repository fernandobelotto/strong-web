import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { RecoverPage } from "../pages/RecoverPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AccountPage } from "../pages/private/AccountPage";
import { ExercisesPage } from "../pages/private/ExercisesPage";
import { HistoryPage } from "../pages/private/HistoryPage";
import { MeasuresPage } from "../pages/private/MeasuresPage";
import { RolesPage } from "../pages/private/RolesPage";
import { SettingsPage } from "../pages/private/SettingsPage";
import { UsersPage } from "../pages/private/UsersPage";
import { WorkoutPage } from "../pages/private/WorkoutPage";
import { PublicAuth } from "./PublicAuth";
import { RequireAuth } from "./RequireAuth";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <PublicAuth>
                <LoginPage />
              </PublicAuth>
            }
          />
          <Route
            path="register"
            element={
              <PublicAuth>
                <RegisterPage />
              </PublicAuth>
            }
          />
          <Route
            path="recover"
            element={
              <PublicAuth>
                <RecoverPage />
              </PublicAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="exercises" index element={<ExercisesPage />} />
            <Route path="workout" index element={<WorkoutPage />} />
            <Route path="measures" index element={<MeasuresPage />} />

            <Route path="users" index element={<UsersPage />} />
            <Route path="settings" index element={<SettingsPage />} />
            <Route path="account" index element={<AccountPage />} />
            <Route path="roles" index element={<RolesPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
