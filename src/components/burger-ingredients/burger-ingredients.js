import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

const tab1 = 'Булки';
const tab2 = 'Соусы';
const tab3 = 'Начинки';

const BurgerIngredients = () => {

    const [current, setCurrent] = React.useState(tab1);

    return (
        <div style={{display: 'flex'}}>
            <Tab value={tab1} active={current === tab1} onClick={setCurrent}>
                {tab1}
            </Tab>
            <Tab value={tab2} active={current === tab2} onClick={setCurrent}>
                {tab2}
            </Tab>
            <Tab value={tab3} active={current === tab3} onClick={setCurrent}>
                {tab3}
            </Tab>
        </div>
    )
}

export default BurgerIngredients;