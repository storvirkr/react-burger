import React from "react";
import pagesStyles from "./pages.module.css";
import {
  Input,
  Button,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, } from "react-router-dom";
import { useForm } from "../components/hooks/use-form";
import { autorization } from "../services/actions/login";
import { useDispatch, useSelector } from "react-redux";

export const LoginPage = () => {
  const { values, handleChange } = useForm({ password: "", email: "" });
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();
  const { loginMessage, loginFailed } = useSelector(
    (store) => store.loginReducer
  );

  
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const auth = (e) => {
    e.preventDefault();
    autorization(values, dispatch);
  };
  

  return (
    <>
      <section>
      <div className={pagesStyles.container}>
        
          <form className={pagesStyles.form} onSubmit={auth}>
            <p className="text text_type_main-medium">Войти</p>
            <div className={"mb-6"} />
            <Input
              type={"text"}
              placeholder={"E-mail"}
              onChange={handleChange}
              value={values.email}
              name={"email"}
              ref={inputRef}
              onIconClick={onIconClick}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
            <div className={"mb-6"} />
            <PasswordInput
              onChange={handleChange}
              value={values.password}
              name={"password"}
            />
            {loginFailed && (
              <div className={"mt-6"}>
                <p className={"text text_color_error text_type_main-default"}>
                  {loginMessage}
                </p>
              </div>
            )}
            <div className={"mb-6"} />
            <Button type="primary" size="large">
              Войти
            </Button>
            <div className={"mb-20"} />
            <p className={"text text_color_inactive text_type_main-default"}>
              Вы — новый пользователь?
              <Link to="/register">
                <button className={pagesStyles.button}>Зарегистрироваться</button>
              </Link>
            </p>
            <div className={"mb-4"} />
            <p className={"text text_color_inactive text_type_main-default"}>
              Забыли пароль?
              <Link to="/forgot-password">
                <button className={pagesStyles.button}>Восстановить пароль</button>
              </Link>
            </p>
          </form>
        
      </div>
      </section>
    </>
  );
};