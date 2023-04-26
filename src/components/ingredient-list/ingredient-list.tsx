import Card from "../card/card";
import {IngredientType} from "../../utils/types";
import styles from "./ingredient-list.module.css"

interface IIngredientListProps {
    data: IngredientType[];
}

const IngredientList = ({data}: IIngredientListProps) => {
    return (
        <div className={styles.main}>
            {data.map((item: IngredientType) => <Card key={item._id} item={item}/>)}
        </div>
    )
}

export default IngredientList;