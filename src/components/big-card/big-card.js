import Card from '../card/card';
import {ingredientArray} from "../../utils/prop-types";

const BigCard = ({lookDetails, arr, type, modal}) => {

    return (
        <div className='pt-6 pr-1 pb-10 pl-4' style={{display: 'flex', flexWrap: 'wrap'}}>
            {arr.map((elem) => {
                if (elem.type === type) {
                    return (
                        <Card image={elem.image} price={elem.price} name={elem.name} key={elem._id}
                              onClick={modal} onDetails={lookDetails} info={elem}/>
                    )
                }
            })}
        </div>
    )
}

BigCard.propTypes = {
    arr: ingredientArray
};

export default BigCard;