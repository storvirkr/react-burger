import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerComponents from "../burger-constructor/burger-constructor";

const URL = "https://norma.nomoreparties.space/api";

function App() {
  const [data, setData] = useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
  });

  useEffect(() => {
    const getIngredients = async (URL) => {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Something went wrong");
        const ingredientsData = await res.json();
        setData({
          ingredients: ingredientsData.data,
          hasError: false,
          isLoading: false,
        });
      } catch (err) {
        setData({ ...data, hasError: true, isLoading: false });
      }
    };
    setData({ ...data, hasError: false, isLoading: true });

    getIngredients(`${URL}/ingredients`);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <main className={styles.main_container}>
        {data.isLoading && <Loader />}
        {!data.isLoading && !data.hasError && data.ingredients.length && (
          <>
            <div className={styles.burger_ingredients}>
              <BurgerIngredients ingredients={data.ingredients} />
            </div>
            <div className={styles.burger_constructor}>
              <BurgerComponents ingredients={data.ingredients} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

const Loader = () => {
  return <p className="loader">Loading...</p>;
};

export default App;
