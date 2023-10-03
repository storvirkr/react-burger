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
        <NavLink className={({isActive}) => isActive ? "active" : ''} to="/"><p className={`text text_type_main-default pl-2`}>Конструктор</p></NavLink>
        <span className={`${headerStyles.burger_list_icon} pl-5`}>
          <ListIcon type="secondary" />
        </span>
        
        <NavLink className={({isActive}) => isActive ? "active" : ''} to="/login"><p className={`text text_type_main-default text_color_inactive pl-2`}>
          Лента заказов
        </p>
        </NavLink>
      </div>
      <div className={headerStyles.burger_logo}>
        <Logo />
      </div>
      <div className={headerStyles.profile_icon}>
        <span>
          <ProfileIcon type="secondary" />
        </span>
        <NavLink className={({isActive}) => isActive ? "active" : ''} to="/profile">
        <p className={`text text_type_main-default text_color_inactive pl-2`}>
          Личный кабинет
        </p>
        </NavLink>
      </div>
    </header>
  );
}
