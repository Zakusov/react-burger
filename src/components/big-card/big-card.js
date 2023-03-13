import Card from '../card/card';
import {ingredientArray} from "../../utils/prop-types";
import PropTypes from "prop-types";

const BigCard = ({data, type, onClick, setSelected}) => {
    return (
        <div className='pt-6 pr-1 pb-10 pl-4' style={{display: 'flex', flexWrap: 'wrap'}}>
            {data.map((elem) => {
                if (elem.type === type) {
                    return (
                        <Card key={elem._id} item={elem} onClick={onClick} setSelected={setSelected}/>
                    )
                }
            })}
        </div>
    )
}

BigCard.propTypes = {
    data: ingredientArray.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired
};

export default BigCard;