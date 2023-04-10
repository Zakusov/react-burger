import Card from "../card/card";
import {ingredientArray} from "../../utils/prop-types";
import styles from "./ingredient-list.module.css"

const IngredientList = ({data}) => {
    return (
        <div className={`${styles.main} pt-6 pr-1 pb-10 pl-4`}>
            {data.map((elem) => {
                return (
                    <Card key={elem._id} item={elem}/>
                )
            })}
        </div>
    )
}

IngredientList.propTypes = {
    data: ingredientArray.isRequired
};

export default IngredientList;