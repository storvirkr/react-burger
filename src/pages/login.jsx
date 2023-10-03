import React, { useState } from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <>
      <section>
        <form className={styles.login__form}>
          <h1 className="text text_type_main-medium">Вход</h1>

          <Input
            type={"email"}
            placeholder={"E-mail"}
            errorText={"Ошибка"}
            size={"default"}
          />

          <Input placeholder={"Пароль"} errorText={"Ошибка"} size={"default"} />

          <Button type="primary" size="big">
            Войти
          </Button>
        </form>

        <div className={`${styles.login__service} mt-20`}>
          <p
            className={`${styles.login__redirections} text text_type_main-default text_color_inactive mb-4`}
          >
            Вы - новый пользователь?
            <Link className={styles.login__link} to="/register">
              Зарегестрироваться
            </Link>
          </p>

          <p
            className={`${styles.login__redirections} text text_type_main-default text_color_inactive mb-4`}
          >
            Забыли пароль?
            <span className={styles.login__link}>Восстановить пароль</span>
          </p>
        </div>
      </section>
    </>
  );
};
