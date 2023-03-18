import Card from "../card/card";
import PropTypes from "prop-types";
import {ingredientArray} from "../../utils/prop-types";
import styles from "./ingredient-list.module.css"

const IngredientList = ({data, onClick, setSelected}) => {
    return (
        <div className={`${styles.main} pt-6 pr-1 pb-10 pl-4`}>
            {data.map((elem) => {
                return (
                    <Card key={elem._id} item={elem} onClick={onClick} setSelected={setSelected}/>
                )
            })}
        </div>
    )
}

IngredientList.propTypes = {
    data: ingredientArray.isRequired,
    onClick: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired
};

export default IngredientList;