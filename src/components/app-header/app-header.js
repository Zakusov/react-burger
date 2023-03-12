import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import header from './app-header.module.css'

const AppHeader = () => {
    return (
        <header className={header.navPanel}>
            <nav>
                <ul className={header.navList}>
                    <li>
                        <a href="#" className={`${header.navItem} text text_type_main-default`}>
                            <BurgerIcon type="primary"/> Конструктор
                        </a>
                    </li>
                    <li>
                        <a href="#" className={`${header.navItem} text text_type_main-default text_color_inactive`}>
                            <ListIcon type="secondary"/> Лента заказов
                        </a>
                    </li>
                    <li>
                        <Logo/>
                    </li>
                    <li>
                        <a href="#" className={`${header.navItem} text text_type_main-default text_color_inactive`}>
                            <ProfileIcon type="secondary"/> Личный кабинет
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;