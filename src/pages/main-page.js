import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend";

import AppHeader from "../components/app-header/app-header";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import {Loader} from "../components/loader/loader";
import {loadIngredients} from "../services/actions/ingredients-actions";
import styles from "./main-page.module.css";

export const MainPage = () => {
    const dispatch = useDispatch();
    const {isLoading, isFailed} = useSelector(state => state.ingredients);

    React.useEffect(() => {
            dispatch(loadIngredients());
        },
        [dispatch]
    );

    return (
        <>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    {isFailed && <div>Упс! Похоже, закончились ингредиенты... Попробуйте зайти позже.</div>}
                    {!isFailed && isLoading && <Loader size="large"/>}
                    {!isFailed && !isLoading && <BurgerIngredients/>}
                    <BurgerConstructor/>
                </main>
            </DndProvider>
        </>
    );
}
