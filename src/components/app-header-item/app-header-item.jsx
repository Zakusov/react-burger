import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./app-header-item.module.css";

function AppHeaderItem({type, extraClass, link, children}) {
    let className = type === "primary" ? styles.primary : styles.secondary;

    if (extraClass) {
        className = className + " " + extraClass;
    }

    return (
        <NavLink className={className} to={link}>
            {children}
        </NavLink>
    );
}

AppHeaderItem.propTypes = {
    type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
    extraClass: PropTypes.string,
    link: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default AppHeaderItem;
