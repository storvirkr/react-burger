import React, { FormEvent, useEffect, useState } from "react";
import styles from "./profile.module.css";
import { useAppSelector } from "../../components/hooks/custom-hook";
import { getCookie } from "../../services/cookie";
import { useAuth } from "../../services/protected-route";
import { TAuth } from "../../utils/types";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

export const ProfileLayout = () => {
  const data = useAppSelector((store) => store.authReducer);
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
  const navigate = useNavigate();
  const location = useLocation();

  const requestAuth = useAuth();
  let auth: TAuth;
  if (requestAuth) {
    auth = requestAuth;
  }

  useEffect(() => {
    if (location.pathname === "/profile/orders") {
      setActiveTab("orders");
    }
  }, []);

  const onLogoutHandler = (e: FormEvent) => {
    e.preventDefault();
    const refreshToken = getCookie("refreshToken");
    const body = {
      token: refreshToken,
    };

    if (auth !== null) {
      auth.logOut(body);
    }
  };

  const handleProfileClick = () => {
    if (activeTab !== "profile") {
      navigate("/profile");
      setActiveTab("profile");
    }
  };

  const handleOrdersClick = () => {
    navigate("/profile/orders");
    setActiveTab("orders");
  };

  return (
    <>
      {data.isAuth && (
        <section className={styles.profile}>
          <div className={`${styles.profile__selector} mr-15`}>
            <div className={`${styles.profile__tabs} mb-20`}>
              <h1
                className={`${styles.profile__tab} text text_type_main-medium ${
                  activeTab === "profile" ? "" : "text_color_inactive"
                }`}
                onClick={handleProfileClick}
              >
                Профиль
              </h1>
              <h1
                className={`${styles.profile__tab} text text_type_main-medium ${
                  activeTab === "orders" ? "" : "text_color_inactive"
                }`}
                onClick={handleOrdersClick}
              >
                История заказов
              </h1>
              <h1
                className={`${styles.profile__tab} text text_type_main-medium text_color_inactive`}
                onClick={onLogoutHandler}
              >
                Выход
              </h1>
            </div>

            <div className={styles.profile__description}>
              <p className="text text_type_main-default text_color_inactive">
                В этом разделе вы можете изменить свои персональные данные
              </p>
            </div>
          </div>

          {activeTab === "profile" ? (
            <div className={styles.profile__edits}>
              <Outlet />
            </div>
          ) : (
            <div className={styles.profile__orders}>
              <Outlet />
            </div>
          )}
        </section>
      )}
    </>
  );
};
