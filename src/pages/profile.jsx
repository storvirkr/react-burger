import React from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfilePage = () => {
  return (
    <>
      <section className={styles.profile}>
        <div className={`${styles.profile__selector} mr-15`}>
          <div className={`${styles.profile__tabs} mb-20`}>
            <h1 className={`${styles.profile__tab} text text_type_main-medium`}>
              Профиль
            </h1>
            <h1
              className={`${styles.profile__tab} text text_type_main-medium text_color_inactive`}
            >
              История заказов
            </h1>
            <h1
              className={`${styles.profile__tab} text text_type_main-medium text_color_inactive`}
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

        <form className={styles.login__form}>
          <Input
            type={"text"}
            name={"name"}
            placeholder={"Имя"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />

          <Input
            type={"text"}
            name={"login"}
            placeholder={"Логин"}
            error={false}
          />

          <Input type={"password"} name={"password"} placeholder={"Пароль"} />

          <div className={`${styles.profile__buttons} mt-6`}>
            <Button type="primary" size="big">
              Сохранить
            </Button>
            <Button type="primary" size="big">
              Отмена
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};
