import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './app-header.module.css';

export default function AppHeader(){
    return(
        <div className ={headerStyles.appHeader}> 
            <div className={headerStyles.burger_icon}>
            <span >
            <BurgerIcon type="primary" />
            </span>
            </div>
            <div className={headerStyles.burger_header_constructor}>
            <p className="text text_type_main-default">Конструктор</p>
            </div>
            <div className={headerStyles.list_icon}>
                <span>
            <ListIcon type="secondary" />
            </span>
            </div>
            <div className={headerStyles.burger_header_orederList}>
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
            </div>
            <div className={headerStyles.burger_logo}>
            <Logo />
            </div>
            <div>
            <span className={headerStyles.profile_icon}>
            <ProfileIcon type="secondary" />
              </span>
            </div>
            <div className={headerStyles.burger_header_profile}>
              <p className="text text_type_main-default text_color_inactive">Личный кабинет</p> 
            </div>
            </div>
        
    )
}