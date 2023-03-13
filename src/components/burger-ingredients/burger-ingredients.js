import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import BigCard from "../big-card/big-card";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";

const tab1 = 'Булки';
const tab2 = 'Соусы';
const tab3 = 'Начинки';

const BurgerIngredients = (props) => {

    const [current, setCurrent] = React.useState(tab1);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [dataIngredients, setDataIngredients] = React.useState([])

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            {modalVisible &&
                <Modal onClose={closeModal} title="Детали заказа">
                    <IngredientDetails data={dataIngredients}/>
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
                        <p className="text text_type_main-medium">
                            Булки
                        </p>
                        <BigCard arr={props.data} type='bun' modal={setModalVisible} lookDetails={setDataIngredients}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">
                            Соусы
                        </p>
                        <BigCard arr={props.data} type='sauce' modal={setModalVisible}
                                 lookDetails={setDataIngredients}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">
                            Начинки
                        </p>
                        <BigCard arr={props.data} type='main' modal={setModalVisible} lookDetails={setDataIngredients}/>
                    </div>
                </section>
            </section>
        </>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired,
            __v: PropTypes.number.isRequired
        }).isRequired
    ).isRequired
};

export default BurgerIngredients;