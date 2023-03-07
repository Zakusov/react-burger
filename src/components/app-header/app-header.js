import React from 'react';
import {BurgerIcon, Button, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

class AppHeader extends React.Component {
    render() {
        return (
            <header>
                <Button htmlType="button" type="secondary" size="small">
                    <p className="text text_type_main-default">
                        <BurgerIcon type="primary"/> Конструктор
                    </p>
                </Button>
                <Button htmlType="button" type="secondary" size="small">
                    <p className="text text_type_main-default text_color_inactive">
                        <ListIcon type="primary"/> Лента заказов
                    </p>
                </Button>
                <Button htmlType="button" type="secondary" size="small">
                    <Logo/>
                </Button>
                <Button htmlType="button" type="secondary" size="small">
                    <p className="text text_type_main-default text_color_inactive">
                        <ProfileIcon type="primary"/> Личный кабинет
                    </p>
                </Button>
            </header>
        )
    }
}

export default AppHeader;