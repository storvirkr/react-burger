import React, { FormEvent, useState } from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/actions/auth";
import { useDispatch } from "react-redux";

type TInputs = {
  token: string;
  password: string;
  passwordType: "email" | "password" | "text" | undefined;
  passwordIcon: any;
}

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState<TInputs>({
    token: "",
    password: "",
    passwordType: "password",
    passwordIcon: "ShowIcon",
  });

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      password: inputs.password,
      token: inputs.token,
    };

    dispatch(resetPassword(body) as any);
  };

  

  return (
    <section className={styles.login}>
      <form className={styles.loginForm} onSubmit={onSubmitHandler}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>

        <PasswordInput
          placeholder={"Введите новый пароль"}
          onChange={(e) =>
            setInputs({
              ...inputs,
              password: e.target.value,
            })
          }
          value={inputs.password}
          size={"default"}
        />

        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) =>
            setInputs({
              ...inputs,
              token: e.target.value,
            })
          }
          error={false}
          value={inputs.token}
          errorText={"Ошибка"}
        />
        
        <Button type="primary" size="large" htmlType="submit">
          Сохранить
        </Button>
      </form>

      <div className={`${styles.loginService} mt-20`}>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?
          <Link className={styles.loginLink} to="/login">
            {" "}
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
};
