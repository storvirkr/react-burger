import React, { useEffect, useRef } from "react";
import pagesStyles from "./pages.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserData,
  userLogout,
} from "../services/actions/auth";
import {NavLink, useNavigate} from "react-router-dom";
import {SET_USER_SUCCESS} from "../services/actions/order";
import {useForm} from "../components/hooks/use-form";

export const ProfilePage = () => {
  const history = useNavigate()
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();

  const {userAccess} = useSelector(store => store.orderReducer)

  const {values, handleChange, setValues} = useForm({name: "", password: "", email: ""});


  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

 

  const saveChange = (e) => {
    e.preventDefault();
    dispatch(editUserData(values));
  };

  const logout = () => {
    dispatch(userLogout());
  };

  if (userAccess) {
    dispatch({
      type: SET_USER_SUCCESS,
      userAccess: false
    })
   history.push('/')
  }

  return (
    <main className={pagesStyles.main}>
      <div className={pagesStyles.profile}>
        <div className={pagesStyles.box}>
          <NavLink
            to="/profile"
            exact='true'
            className={pagesStyles.link}
            activeclassname={pagesStyles.link_active}
          >
            <p className="text text_type_main-medium">Профиль</p>
          </NavLink>
          <NavLink
            to="/profile/orders"
            exact='true'
            className={pagesStyles.link}
            activeclassname={pagesStyles.link}
          >
            <p className="text text_type_main-medium">История заказов</p>
          </NavLink>
          <div className={pagesStyles.link}>
            <p onClick={logout} className="text text_type_main-medium">
              Выход
            </p>
          </div>
          <div className={"mb-20"} />
          <div className={pagesStyles.info}>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
        </div>
        <form className={pagesStyles.form} onSubmit={saveChange}>
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
            autoComplete="current-password"
          />
          <div className={"mb-6"} />
         
            <div className={pagesStyles.buttons}>
              <Button  type="secondary" size="medium">
                Отмена
              </Button>
              <Button type="primary" size="large">
                Сохранить
              </Button>
            </div>
        </form>
      </div>
    </main>
  );
};