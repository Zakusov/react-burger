import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import BigCard from "../big-card/big-card";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {IngredientsContext} from "../../utils/context";

const tab1 = 'Булки';
const tab2 = 'Соусы';
const tab3 = 'Начинки';

const BurgerIngredients = () => {

    const [current, setCurrent] = React.useState(tab1);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState([])

    /** Все ингридиенты **/
    const ingredients = React.useContext(IngredientsContext);

    /** Булки **/
    const buns = React.useMemo(
        () => ingredients.filter((item) => item.type === "bun"),
        [ingredients]
    );

    /** Соусы **/
    const sauces = React.useMemo(
        () => ingredients.filter((item) => item.type === "sauce"),
        [ingredients]
    );

    /** Начинки **/
    const mains = React.useMemo(
        () => ingredients.filter((item) => item.type === "main"),
        [ingredients]
    );

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            {modalVisible &&
                <Modal onClose={closeModal} title="Детали заказа">
                    <IngredientDetails item={selected}/>
                </Modal>}

            <section className={`${styles.section} mt-10`}>
                <div className='mt-10 mb-5'>
                    <p className="text text_type_main-large">
                        Соберите бургер
                    </p>
                </div>
                <div className='mb-10'>
                    <div className={styles.tab}>
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
                <section className={styles.scrollList}>
                    <div>
                        <p className="text text_type_main-medium">Булки</p>
                        <BigCard data={buns} onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Соусы</p>
                        <BigCard data={sauces} onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">Начинки</p>
                        <BigCard data={mains} onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                </section>
            </section>
        </>
    )
}

export default BurgerIngredients;