import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {IngredientType} from "../../utils/types";
import style from './ingredient-details.module.css';

const IngredientDetails = () => {
    // @ts-ignore
    const {ingredients} = useSelector(state => state.ingredients);
    const [item, setItem] = useState<IngredientType>()
    const {id} = useParams();

    useEffect(
        () => {
            const found = ingredients.find((item: IngredientType) => item._id === id);
            if (found) {
                setItem(found);
            }
        },
        [id, ingredients]
    );

    if (!item) {
        return null;
    }

    return (
        <div className={style.content}>
            <div className='mb-4'><img className={style.photo} src={item.image} alt="Ingredient"></img></div>
            <div className='mb-8'><p className="text text_type_main-medium">{item.name}</p></div>
            <div className={style.ingredients}>
                <div className={style.ingredients_section}>
                    <p className="text text_type_main-small text_color_inactive mb-2">Калории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.calories}</p>
                </div>
                <div className={style.ingredients_section}>
                    <p className="text text_type_main-small text_color_inactive mb-2">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.proteins}</p>
                </div>
                <div className={style.ingredients_section}>
                    <p className="text text_type_main-small text_color_inactive mb-2">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.fat}</p>
                </div>
                <div className={style.ingredients_section}>
                    <p className="text text_type_main-small text_color_inactive mb-2">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetails