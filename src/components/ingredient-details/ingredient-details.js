import style from './ingredient-details.module.css';
import {ingredientType} from "../../utils/prop-types";

const IngredientDetails = (props) => {
    return (
        <div className={style.content}>
            <div className='mb-4'><img className={style.photo} src={props.data.image} alt="Ingredient"></img></div>
            <div className='mb-8'><p className="text text_type_main-medium">{props.data.name}</p></div>
            <div className={style.ingredients}>
                <div className={style.ingredients_section}>
                    <p className="text text_type_main-small text_color_inactive mb-2">Калории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.data.calories}</p>
                </div>
                <div className={style.ingredients_section}>
                    <p className="text text_type_main-small text_color_inactive mb-2">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.data.proteins}</p>
                </div>
                <div className={style.ingredients_section}>
                    <p className="text text_type_main-small text_color_inactive mb-2">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.data.fat}</p>
                </div>
                <div className={style.ingredients_section}>
                    <p className="text text_type_main-small text_color_inactive mb-2">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{props.data.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}
IngredientDetails.propTypes = {
    data: ingredientType
}

export default IngredientDetails