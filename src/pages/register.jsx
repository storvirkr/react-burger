import React, { useState } from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <>
      <section className={styles.login}>
        <form className={styles.login__form}>
          <h1 className="text text_type_main-medium">Регистрация</h1>

          <Input
            type={"text"}
            placeholder={"Имя"}
            error={false}
            errorText={"Ошибка"}
          />

          <Input
            className={"mb-6"}
            type={"email"}
            placeholder={"E-mail"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />

          <Input
            placeholder={"Пароль"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />

          <Button type="primary" size="big">
            Зарегестрироваться
          </Button>
        </form>

        <div className={`${styles.login__service} mt-20`}>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Уже зарегестрировались?
            <Link className={styles.login__link} to="/login">
              Войти
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};
