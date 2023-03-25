import {LoaderSvg} from './loader.svg';
import style from './loader.module.css';

const loaderSizes = {
    small: 16,
    medium: 24,
    large: 40
};
export const Loader = ({size, inverse = false}) => {
    const loaderColor = inverse ? '#fff' : '#3C39EC';

    const wrapperStyleKey = 'wrapper_' + size;
    return (
        <div className={style[wrapperStyleKey]}>
            <LoaderSvg color={loaderColor} size={loaderSizes[size]}/>
        </div>
    );
};