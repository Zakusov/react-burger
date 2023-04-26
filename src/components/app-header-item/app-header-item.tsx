import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import styles from "./app-header-item.module.css";

type TType = 'primary' | 'secondary';

type TAppHeaderItemProps = {
    type: TType;
    extraClass: string;
    link: string;
} & React.HTMLAttributes<HTMLElement>;

const AppHeaderItem: FC<TAppHeaderItemProps> = ({type, extraClass, link, children}: TAppHeaderItemProps) => {
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
export default AppHeaderItem;
