import React from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import {getIngredients} from '../../utils/burger-api';
import {IngredientsContext} from "../../utils/context";
import styles from "./app.module.css";

function App() {
    const [ingredients, setIngredients] = React.useState([]);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        getIngredients().then((res) => {
            setIngredients(res.data);
        }).catch((e) => {
            setError(true);
            console.log(e)
        });
    }, [])

    return (
        <>
            {error && <div>Упс! Похоже, закончились ингридиенты... Попробуйте зайти позже.</div>}
            <AppHeader/>
            <IngredientsContext.Provider value={ingredients}>
                <main className={styles.main}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </main>
            </IngredientsContext.Provider>
        </ >
    );
}

export default App;