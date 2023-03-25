import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadIngredients} from "../../services/actions/ingredients";

import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import {Loader} from "../loader/loader";

import styles from "./app.module.css";

function App() {
    const dispatch = useDispatch();
    const {loadingStarted, loadingFailed} = useSelector(
        state => state.ingredients
    );

    React.useEffect(() => {
            dispatch(loadIngredients());
        },
        [dispatch]
    );

    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                {loadingFailed && <div>Упс! Похоже, закончились ингридиенты... Попробуйте зайти позже.</div>}
                {!loadingFailed && loadingStarted && <Loader size="large"/>}
                {!loadingFailed && !loadingStarted && <BurgerIngredients/>}
                <BurgerConstructor/>
            </main>
        </>
    );
}

export default App;