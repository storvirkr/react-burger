import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { ProfilePage } from "../../pages/profile";
import { RegisterPage } from "../../pages/register";
import { NotFoundPage } from "../../pages/not-found";
import Modal from "../modal/modal";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <main className={styles.main_container}>
        
        <Routes location={background || location}>
          <Route path="/" exact={true} element={<HomePage />} />          
        
        <Route path="/register" exact={true} element={<RegisterPage />} />

        
        <Route path="*" element={<NotFoundPage/>} />
        <Route path="/login" element={<LoginPage/>} />
          <Route path="/profile" element={<ProfilePage/>}/>

          {background && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={
                  <Modal onClose={handleModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </Routes>
        
      </main>
    </div>
  );
}

export default App;
