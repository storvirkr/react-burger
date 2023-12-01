import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className={headerStyles.appHeader}>
      <div className={`${headerStyles.burger_icon} pr-5`}>
        <span>
          <BurgerIcon type="primary" />
        </span>
        <NavLink
          style={({ isActive }) => {
            return {
              textDecoration: "none",
              color: isActive ? "white" : "",
            };
          }}
          to="/"
          className="text text_type_main-default text_color_inactive pl-2"
        >
          Конструктор
        </NavLink>
        <span className={`${headerStyles.burger_list_icon} pl-5`}>
          <ListIcon type="secondary" />
        </span>

        <NavLink
          style={({ isActive }) => {
            return {
              textDecoration: "none",
              color: isActive ? "white" : "",
            };
          }}
          to="/feed"
          className="text text_type_main-default text_color_inactive pl-2"
        >
          Лента заказов
        </NavLink>
      </div>
      <div className={headerStyles.burger_logo}>
        <Logo />
      </div>
      <div className={headerStyles.profile_icon}>
        <span>
          <ProfileIcon type="secondary" />
        </span>
        <NavLink
          style={({ isActive }) => {
            return {
              textDecoration: "none",
              color: isActive ? "white" : "",
            };
          }}
          to="/profile"
          className="text text_type_main-default text_color_inactive pl-2"
        >
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
}
