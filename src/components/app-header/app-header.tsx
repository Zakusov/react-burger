import {useMatch} from 'react-router-dom';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {AppHeaderItem, TType} from "../app-header-item/app-header-item";
import styles from "./app-header.module.css";

const AppHeader = () => {
    const homeType: TType = !!useMatch("/") ? "primary" : "secondary";
    const profileType: TType = !!useMatch("/profile") ? "primary" : "secondary";

    return (
        <header className={styles.navPanel}>
            <div className={styles.navList}>
                <nav className={`${styles.navigation} ${styles.first}`}>
                    <AppHeaderItem type={homeType} link="/">
                        <BurgerIcon type={homeType}/> Конструктор
                    </AppHeaderItem>
                    <AppHeaderItem type="secondary" link="/feed">
                        <ListIcon type="secondary"/> Лента заказов
                    </AppHeaderItem>
                </nav>
                <Logo/>
                <AppHeaderItem type={profileType} link="/profile" extraClass={styles.last}>
                    <ProfileIcon type={profileType}/> Личный кабинет
                </AppHeaderItem>
            </div>
        </header>
    );
}

export default AppHeader;