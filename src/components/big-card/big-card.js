import PropTypes from 'prop-types';
import Card from '../card/card';

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
    arr: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired,
            __v: PropTypes.number.isRequired
        }).isRequired
    ).isRequired
};

export default BigCard;