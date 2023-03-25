import React from "react";
import {useSelector} from "react-redux";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/modal";
import IngredientList from "../ingredient-list/ingredient-list";
import IngredientDetails from "../ingredient-details/ingredient-details";

import styles from "./burger-ingredients.module.css";

const tab1 = 'Булки';
const tab2 = 'Соусы';
const tab3 = 'Начинки';

const BurgerIngredients = () => {

    const [currentTab, setCurrentTab] = React.useState(tab1);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState([])

    /** Все ингридиенты **/
    const {ingredients} = useSelector(state => state.ingredients);

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

    const bunsList = React.useRef(null);
    const saucesList = React.useRef(null);
    const mainsList = React.useRef(null);

    const scrollTo = (ref) => {
        ref.current.scrollIntoView({behavior: "smooth"});
    }

    React.useEffect(() => {
        switch (currentTab) {
            case tab2:
                scrollTo(saucesList);
                break;
            case tab3:
                scrollTo(mainsList);
                break;
            default:
                scrollTo(bunsList);
        }
    }, [currentTab])

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
                        <Tab value={tab1} active={currentTab === tab1} onClick={setCurrentTab}>
                            {tab1}
                        </Tab>
                        <Tab value={tab2} active={currentTab === tab2} onClick={setCurrentTab}>
                            {tab2}
                        </Tab>
                        <Tab value={tab3} active={currentTab === tab3} onClick={setCurrentTab}>
                            {tab3}
                        </Tab>
                    </div>
                </div>
                <section className={styles.scrollList}>
                    <div>
                        <p className="text text_type_main-medium" ref={bunsList}>Булки</p>
                        <IngredientList data={buns} onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium" ref={saucesList}>Соусы</p>
                        <IngredientList data={sauces} onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium" ref={mainsList}>Начинки</p>
                        <IngredientList data={mains} onClick={setModalVisible} setSelected={setSelected}/>
                    </div>
                </section>
            </section>
        </>
    )
}

export default BurgerIngredients;