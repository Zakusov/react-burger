import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

const tab1 = 'Булки';
const tab2 = 'Соусы';
const tab3 = 'Начинки';

class BurgerIngredients extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: tab1
        };

        this.setCurrent = this.setCurrent.bind(this);
    }

    setCurrent(tab) {
        this.setState({current: tab});
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <Tab value={tab1} active={this.state.current === tab1} onClick={this.setCurrent}>
                    {tab1}
                </Tab>
                <Tab value={tab2} active={this.state.current === tab2} onClick={this.setCurrent}>
                    {tab2}
                </Tab>
                <Tab value={tab3} active={this.state.current === tab3} onClick={this.setCurrent}>
                    {tab3}
                </Tab>
            </div>
        )
    }
}

export default BurgerIngredients;