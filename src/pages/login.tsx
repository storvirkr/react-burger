import React, { FormEvent, useState } from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { recoveryRequest } from "../services/actions/auth";
import { useAuth } from "../services/protected-route";
import { TAuth, TAuthBody } from "../utils/types";

type TInputs = {
  email: string;
  password: string;
  passwordType: "email" | "password" | "text" | undefined;
  passwordIcon: any;
}

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const requestAuth = useAuth();
  let auth: TAuth;
  if (requestAuth) {
      auth = requestAuth;
  }
    const data = useSelector((store: any) => store.authReducer);

  const [inputs, setInputs] = useState<TInputs>({
    email: "",
    password: "",
    passwordType: "password",
    passwordIcon: "ShowIcon",
  });

  // const onIconClick = () => {
  //   inputs.passwordType === "password"
  //     ? setInputs({ ...inputs, passwordType: "text", passwordIcon: "HideIcon" })
  //     : setInputs({
  //         ...inputs,
  //         passwordType: "password",
  //         passwordIcon: "ShowIcon",
  //       });
  // };

  const redirectPath = location.state?.path || "/";

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const body: TAuthBody = {
      email: inputs.email,
      password: inputs.password,
    };
    auth?.logIn(body);
    navigate(redirectPath, { replace: true });
  };

  const onForgotClick = (e: FormEvent) => {
    e.preventDefault();
    dispatch(recoveryRequest());
    navigate("/forgot-password");
  };

  return (
    <>
      {!data.isAuth && (
        <section className={styles.login}>
          <form className={styles.loginForm} onSubmit={onSubmitHandler}>
            <h1 className="text text_type_main-medium">Вход</h1>

            <Input
              type={"email"}
              placeholder={"E-mail"}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  email: e.target.value,
                })
              }
              error={false}
              value={inputs.email}
              errorText={"Ошибка"}
              size={"default"}
            />

            <PasswordInput
              placeholder={"Пароль"}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  password: e.target.value,
                })
              }
              value={inputs.password}
              size={"default"}
            />

            <Button type="primary" size="large"  htmlType="submit">
              Войти
            </Button>
          </form>

          <div className={`${styles.loginService} mt-20`}>
            <p
              className={`${styles.loginRedirections} text text_type_main-default text_color_inactive mb-4`}
            >
              Вы - новый пользователь?
              <Link className={styles.loginLink} to="/register">
                Зарегестрироваться
              </Link>
            </p>

            <p
              className={`${styles.loginRedirections} text text_type_main-default text_color_inactive mb-4`}
            >
              Забыли пароль?
              <span className={styles.loginLink} onClick={onForgotClick}>
                Восстановить пароль
              </span>
            </p>
          </div>
        </section>
      )}
    </>
  );
};
