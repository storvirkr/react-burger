import React, { useEffect, useState } from "react";
import styles from "./pages.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../services/cookie";
import { updateUser } from "../services/actions/auth";
import { useAuth } from "../services/protected-route";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  const data = useSelector((store) => store.authReducer);
  const [nameEdit, setNameEdit] = useState(true);
  const [loginEdit, setLoginEdit] = useState(true);
  const [passwordEdit, setPasswordEdit] = useState(true);
  const [inputs, setInputs] = useState({
    name: "",
    login: "",
    password: "",
    icon: "EditIcon",
    editing: false,
  });

  useEffect(() => {
    setInputs({
      ...inputs,
      name: data.user.name,
      login: data.user.email,
    });
  }, []);

  const onLogoutHandler = (e) => {
    e.preventDefault();
    const refreshToken = getCookie("refreshToken");
    const body = {
      token: refreshToken,
    };
    auth.logOut(body);
  };

  const profileEdit = (name, login) => {
    setNameEdit(true);
    setLoginEdit(true);
    setPasswordEdit(true);

    if (name && login) {
      setInputs({
        ...inputs,
        name: data.user.name,
        login: data.user.email,
        editing: false,
      });
      return;
    }
    setInputs({ ...inputs, editing: false });
  };

  const cancelButtonHandler = (e) => {
    e.preventDefault();
    profileEdit(data.user.name, data.user.email);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      name: inputs.name,
      login: inputs.login,
    };

    if (inputs.password !== "") {
      body = {
        ...body,
        password: inputs.password,
      };
    }

    dispatch(updateUser(body));
    profileEdit();
  };
  const onOrderClickHandler = () => {
    navigate("/orders");
  };

  return (
    <>
      {data.isAuth && (
        <section className={styles.profile}>
          <div className={`${styles.profileSelector} mr-15`}>
            <div className={`${styles.profileTabs} mb-20`}>
              <h1 className={`${styles.profileTab} text text_type_main-medium`}>
                Профиль
              </h1>
              <h1
                className={`${styles.profileTab} text text_type_main-medium text_color_inactive`}
                onClick={onOrderClickHandler}
              >
                История заказов
              </h1>
              <h1
                className={`${styles.profileTab} text text_type_main-medium text_color_inactive`}
                onClick={onLogoutHandler}
              >
                Выход
              </h1>
            </div>

            <div className={styles.profileDescription}>
              <p className="text text_type_main-default text_color_inactive">
                В этом разделе вы можете изменить свои персональные данные
              </p>
            </div>
          </div>

          <form className={styles.loginForm} onSubmit={onSubmitHandler}>
            <Input
              type={"text"}
              name={"name"}
              placeholder={"Имя"}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  name: e.target.value,
                })
              }
              error={false}
              value={inputs.name}
              onIconClick={() => {
                setNameEdit(!nameEdit);
                setInputs({ ...inputs, editing: true });
              }}
              icon={inputs.icon}
              errorText={"Ошибка"}
              size={"default"}
              disabled={nameEdit}
            />

            <Input
              type={"text"}
              name={"login"}
              placeholder={"Логин"}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  login: e.target.value,
                })
              }
              error={false}
              value={inputs.login}
              onIconClick={() => {
                setLoginEdit(!loginEdit);
                setInputs({ ...inputs, editing: true });
              }}
              icon={inputs.icon}
              errorText={"Ошибка"}
              disabled={loginEdit}
            />

            <PasswordInput
              name={"password"}
              placeholder={"Пароль"}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  password: e.target.value,
                })
              }
              error={false}
              value={inputs.password}
              onIconClick={() => {
                setPasswordEdit(!passwordEdit);
                setInputs({ ...inputs, editing: true });
              }}
              icon="EditIcon"
              errorText={"Ошибка"}
              disabled={passwordEdit}
            />

            {inputs.editing && (
              <div className={`${styles.profileButtons} mt-6`}>
                <Button type="primary" size="large">
                  Сохранить
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={cancelButtonHandler}
                >
                  Отмена
                </Button>
              </div>
            )}
          </form>
        </section>
      )}
    </>
  );
};
