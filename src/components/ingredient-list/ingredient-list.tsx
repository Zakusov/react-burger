import Card from "../card/card";
import styles from "./ingredient-list.module.css"

interface IIngredientProps {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

const IngredientList = (data: IIngredientProps[]) => {
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

export default IngredientList;