import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Location,
} from "react-router-dom";
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
import { FeedPage } from "../../pages/feed";
import { useAppDispatch, useAppSelector } from "../hooks/custom-hook";
import FeedDetails from "../feed-constructor-element/feed-constructor";
import { OrderPage } from "../../pages/order";
import { ProfileFeedPage } from "../../pages/profile-feed";
import { ProfileLayout } from "../profile/profile";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const locationState = location.state as { background: Location };
  const background = locationState && locationState.background;
  const modals = useAppSelector((store) => store.modalReducer);

  useEffect(() => {
    const refreshToken = getCookie("refreshToken");
    dispatch(getIngredients());

    if (refreshToken) {
      dispatch(getUser());
    }
  }, []);

  const closeFeedModal = () => {
    dispatch(closeModal());
    navigate("/feed");
  };

  const closeProfileModal = () => {
    dispatch(closeModal());
    navigate("/profile/orders");
  };

  const handleModalClose = () => {
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
              {background && modals.ingredientModal.isVisible && (
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
                  <ProfileLayout />
                </RequireAuth>
              }
            >
              <Route index element={<ProfilePage />} />
              <Route path="orders" element={<ProfileFeedPage />}>
                {background && modals.feedModal.isVisible && (
                  <Route
                    path=":id"
                    element={
                      <Modal title="" closeHandler={closeProfileModal}>
                        <FeedDetails type="modal" />
                      </Modal>
                    }
                  />
                )}
              </Route>
            </Route>

            <Route path="feed" element={<FeedPage />}>
              {background && modals.feedModal.isVisible && (
                <Route
                  path=":id"
                  element={
                    <Modal title="" closeHandler={closeFeedModal}>
                      <FeedDetails type="modal" />
                    </Modal>
                  }
                />
              )}
            </Route>

            <Route path="ingredient/:id" element={<IngredientPage />} />
            <Route path="feed/:id" element={<OrderPage />} />
            <Route path="profile/orders/:id" element={<OrderPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ProtectedRouteProvider>
      </main>
    </div>
  );
}

export default App;
