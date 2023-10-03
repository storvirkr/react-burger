import React, { useState } from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const ResetPasswordPage = () => {
  return (
    <section className={styles.login}>
      <form className={styles.login__form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>

        <Input
          placeholder={"Введите новый пароль"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />

        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          error={false}
          errorText={"Ошибка"}
        />

        <Button type="primary" size="big">
          Сохранить
        </Button>
      </form>

      <div className={`${styles.login__service} mt-20`}>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспоинили вопрос?
          <Link className={styles.login__link} to="/login">
            {" "}
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
};
