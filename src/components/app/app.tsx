import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { Routes, Route, useLocation, useNavigate, Location } from "react-router-dom";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { ProfilePage } from "../../pages/profile";
import { RegisterPage } from "../../pages/register";
import { NotFoundPage } from "../../pages/not-found";
import Modal from "../modal/modal";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import { IngredientPage } from "../../pages/ingredient";
import { useDispatch } from "react-redux";
import { closeModal } from "../../services/actions/modal";
import { ProtectedRouteProvider } from "../../services/protected-route";
import { RequireLogIn } from "../../services/protected-route";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { RequireReset } from "../../services/protected-route";
import { RequireAuth } from "../../services/protected-route";
import { useSelector } from "react-redux";
import { getCookie } from "../../services/cookie";
import { getIngredients } from "../../services/actions/ingredients";
import { useEffect } from "react";
import { getUser } from "../../services/actions/auth";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const locationState = location.state as { background: Location}
  const background = locationState && locationState.background;
  const ingredientModal = useSelector(
    (store: any) => store.modalReducer.ingredientModal.isVisible
  );

  useEffect(() => {
    const refreshToken = getCookie("refreshToken");
    //@ts-ignore
    dispatch(getIngredients());
    if (refreshToken) {
    //@ts-ignore
      dispatch(getUser());
    }
  }, []);

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    dispatch(closeModal());
    navigate("/");
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <main className={styles.main_container}>
        <ProtectedRouteProvider>
          <Routes location={location || background}>
            <Route path="/" element={<HomePage />}>
              {background && ingredientModal && (
                <Route
                  path="ingredient/:id"
                  element={
                    <Modal
                      title="Детали ингредиента"
                      closeHandler={handleModalClose}
                    >
                      <IngredientDetails />
                    </Modal>
                  }
                />
              )}
            </Route>

            <Route
              path="login"
              element={
                <RequireLogIn>
                  <LoginPage />
                </RequireLogIn>
              }
            />

            <Route
              path="register"
              element={
                <RequireLogIn>
                  <RegisterPage />
                </RequireLogIn>
              }
            />

            <Route path="forgot-password" element={<ForgotPasswordPage />} />

            <Route
              path="reset-password"
              element={
                <RequireReset>
                  <ResetPasswordPage />
                </RequireReset>
              }
            />

            <Route
              path="profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />

            <Route path="ingredient/:id" element={<IngredientPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ProtectedRouteProvider>
      </main>
    </div>
  );
}

export default App;
