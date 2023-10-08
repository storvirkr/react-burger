import React, { useState, useEffect, useRef } from "react";
import pagesStyles from "./pages.module.css";
import {
  Input,
  Button,
   PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, Navigate, useLocation } from "react-router-dom";
import { useForm } from "../components/hooks/use-form";
import { useDispatch, useSelector, } from "react-redux";
import { registration } from "../services/actions/register";

export const RegisterPage = () => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    password: "",
    email: "",
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);
  const { registerMessage, registerSuccess, registerFailed } = useSelector(
    (store) => store.registerReducer
  );
  const { userSuccess} =
    useSelector((store) => store.userReducer);
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const timerRef = useRef(null);
  useEffect(() => {
    if (registerSuccess) {
      setValues({ name: "", password: "", email: "" });
      timerRef.current = setTimeout(() => {
        setRedirect(true);
      }, 1250);
    }
    
  }, [registerSuccess]);
  

  if (userSuccess) {
    return <Navigate to={location.state?.from || "/"} />;
  }


  if (redirect) {
    return <Navigate to="/login" />;
  }
  const sendForm = (e) => {
    e.preventDefault();
    registration(values, dispatch);
  };
  return (
    <>
      <section className={pagesStyles.login}>
        <form className={pagesStyles.form} onSubmit={sendForm}>
          <h1 className="text text_type_main-medium">Регистрация</h1>

          <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={handleChange}
              value={values.name}
              name={"name"}
              ref={inputRef}
              onIconClick={onIconClick}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />

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

<PasswordInput
              onChange={handleChange}
              value={values.password}
              name={"password"}
            />

{registerSuccess && (
              <div className={"mt-6"}>
                <p className={"text text_color_success text_type_main-default"}>
                  Вы успешно зарегистрированы
                </p>
              </div>
            )}
            {registerFailed && (
              <div className={"mt-6"}>
                <p className={"text text_color_error text_type_main-default"}>
                  {registerMessage}
                </p>
              </div>
            )}
          <Button type="primary" size="big">
            Зарегестрироваться
          </Button>
        </form>

        <div className={`${pagesStyles.login} mt-20`}>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Уже зарегестрировались?
            <Link className={pagesStyles.login} to="/login">
              Войти
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};