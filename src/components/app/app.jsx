import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { Routes, Route, useLocation, useNavigate, NavLink } from "react-router-dom";
import {
  HomePage,
} from '../../pages/home'
import {
  LoginPage,
} from '../../pages/login'
import{
  ProfilePage
} from "../../pages/profile"
import { RegisterPage } from "../../pages/register";
import { ResetPasswordPage } from "../../pages/reset-password";
import Modal from "../modal/modal";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import { CLOSE_MODAL_INGREDIENT } from "../../services/actions/ingredient-detail";
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const ingredientModal = useSelector(store => store.objectIngredient.isOpened)

  const closeModalIngredient = () => {
    dispatch(CLOSE_MODAL_INGREDIENT)

    navigate('/');
};

  

  return (


    <div className={styles.app}>
      <div className={styles.header}>
        <AppHeader />
      </div>
        <main className={styles.main_container}>


           <Routes>
          <Route path='/' element={<HomePage />}/>
            {background && ingredientModal && (
              <Route path='ingredient/:id' element={
                <Modal 
                  title='Детали ингредиента'
                  onClose={closeModalIngredient}
                >
                  <IngredientDetails />
                </Modal>
              } />
            )}

          <Route path='login' element={
            //
              <LoginPage />
           // 
          }/>
          <Route path='profile' element={
            //
              <ProfilePage />
           // 
          }/>
          <Route path='register' element={
             
                <RegisterPage />
             
          }/>

          {/* <Route path='forgot-password' element={<ForgotPasswordPage /> }/> */}

          <Route path='reset-password' element={
            
              <ResetPasswordPage />
            
          }/>

<Route path='*' element={
            
            <HomePage />
          
        }/>
          </Routes>

        </main>
      {/* )} */}
    </div>
  );
}
// const Loader = () => {
//   return (
//     <div>
//       <h1>Loading...</h1>
//     </div>
//   );
// };

export default App;
