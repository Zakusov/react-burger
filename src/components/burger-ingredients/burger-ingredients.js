import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import BigCard from "../big-card/big-card";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {ingredientArray} from "../../utils/prop-types";

const tab1 = 'Булки';
const tab2 = 'Соусы';
const tab3 = 'Начинки';

const BurgerIngredients = ({data}) => {

    const [current, setCurrent] = React.useState(tab1);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState([])

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            {modalVisible &&
                <Modal onClose={closeModal} title="Детали заказа">
                    <IngredientDetails item={selected}/>
                </Modal>}

            <section style={{width: '600px'}}>
                <div className='mt-10 mb-5'>
                    <p className="text text_type_main-large">
                        Соберите бургер
                    </p>
                </div>
                <div className='mb-10'>
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
                </div>
                <section className={styles.scrollingSection}>
                    <div>
                        <p className="text text_type_main-medium">Булки</p>
                        <BigCard data={data} type='bun' onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Соусы</p>
                        <BigCard data={data} type='sauce' onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Начинки</p>
                        <BigCard data={data} type='main' onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                </section>
            </section>
        </>
    )
}

BurgerIngredients.propTypes = {
    data: ingredientArray.isRequired
};

export default BurgerIngredients;