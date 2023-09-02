import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";

export default function AppHeader() {
  return (
    <header className={headerStyles.appHeader}>
      <div className={`${headerStyles.burger_icon} pr-5`}>
        <span>
          <BurgerIcon type="primary" />
        </span>
        <p className={`text text_type_main-default pl-2`}>Конструктор</p>
        <span>
          <ListIcon type="secondary" />
        </span>
        <p className={`text text_type_main-default text_color_inactive pl-2`}>
          Лента заказов
        </p>
      </div>
      <div className={headerStyles.burger_logo}>
        <Logo />
      </div>
      <div className={headerStyles.profile_icon}>
        <span>
          <ProfileIcon type="secondary" />
        </span>
        <p className={`text text_type_main-default text_color_inactive pl-2`}>
          Личный кабинет
        </p>
      </div>
    </header>
  );
}
