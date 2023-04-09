import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderItem from "../app-header-item/app-header-item";
import styles from "./app-header.module.css";

function AppHeader() {
    return (
        <header className={styles.navPanel}>
            <div className={styles.navList}>
                <nav className={`${styles.navigation} ${styles.first}`}>
                    <AppHeaderItem type="primary" link="/">
                        <BurgerIcon type="primary"/> Конструктор
                    </AppHeaderItem>
                    <AppHeaderItem type="secondary" link="/">
                        <ListIcon type="secondary"/> Лента заказов
                    </AppHeaderItem>
                </nav>
                <Logo/>
                <AppHeaderItem type="secondary" link="/profile" extraClass={styles.last}>
                    <ProfileIcon type="secondary"/> Личный кабинет
                </AppHeaderItem>
            </div>
        </header>
    );
}

export default AppHeader;