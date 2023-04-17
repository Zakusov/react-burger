import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientList from "../ingredient-list/ingredient-list";
import styles from "./burger-ingredients.module.css";

const tab1 = 'Булки';
const tab2 = 'Соусы';
const tab3 = 'Начинки';

const BurgerIngredients = () => {

    /** Все ингредиенты **/
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

    const scrollList = React.useRef(null);
    const bunsList = React.useRef(null);
    const saucesList = React.useRef(null);
    const mainsList = React.useRef(null);

    const typeListRefs = new Map();
    typeListRefs.set(tab1, bunsList);
    typeListRefs.set(tab2, saucesList);
    typeListRefs.set(tab3, mainsList);

    const [currentTab, setCurrentTab] = React.useState(tab1);

    // Переключение вкладок при скроллинге
    useEffect(() => {
        const typeTitleInViewport = {};
        const callback = (entries) => {
            entries.forEach((entry) => {
                typeTitleInViewport[entry.target.id] = entry.isIntersecting;
            })
            for (const typeTitle of Object.keys(typeTitleInViewport)) {
                if (typeTitleInViewport[typeTitle]) {
                    setCurrentTab(typeTitle);
                }
            }
        };

        const options = {
            root: scrollList.current,
            rootMargin: '20% 0% -80% 0%',
            threshold: 0
        };
        const observer = new IntersectionObserver(callback, options);
        typeListRefs.forEach((typeTitle) => observer.observe(typeTitle.current));
    });

    const scrollTo = (ref) => {
        ref.current.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
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
    }, [currentTab]);

    return (
        <>
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
                <section className={styles.scrollList} ref={scrollList}>
                    <div>
                        <p className="text text_type_main-medium" ref={bunsList} id={tab1}>Булки</p>
                        <IngredientList data={buns}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium" ref={saucesList} id={tab2}>Соусы</p>
                        <IngredientList data={sauces}/>
                    </div>
                    <div>
                        <p className="text text_type_main-medium" ref={mainsList} id={tab3}>Начинки</p>
                        <IngredientList data={mains}/>
                    </div>
                </section>
            </section>
        </>
    )
}

export default BurgerIngredients;