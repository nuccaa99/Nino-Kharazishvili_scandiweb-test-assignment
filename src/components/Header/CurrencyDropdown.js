import React from "react";

import Vector from './icons/Vector.jpg';
import VectorTwo from './icons/VectorTwo.jpg';




class Dropdown extends React.Component {
    componentDidMount() {
        if (!localStorage.getItem('selectedCur')) {
            this.props.saveCurrency(this.props.initCurrency, 0)
        }
    }
    render() {
        const { data, saveCurrency, selectedCur, selectedCurIndex, handleDropdownClick, dropDown, reference } = this.props;
        
        const renderedOptions = data.currencies.map((option) => {
            return (
                <div
                    key={option.label}
                    className={`item ${selectedCurIndex === data.currencies.indexOf(option) ? "" : "notSelected"}`}
                    onClick={() => { saveCurrency(option.symbol, data.currencies.indexOf(option)) }}
                >
                    <span className={`symbol ${option.symbol}`}>{option.symbol}</span>
                    <span className={`label ${option.label}`}>{option.label}</span>
                </div>
            )
        })
        return (
            <div ref={reference} onClick={handleDropdownClick} className="select currency">
                <div className="selected currency">
                    <div id="current currency">{selectedCur}</div>
                    <img className="arrow" src={dropDown ? VectorTwo : Vector} alt="dropdown arrow" />
                </div>
                <div className={dropDown ? "dropdown" : "notVisibleDropDown"}>{renderedOptions}</div>
            </div>

        )
    }
}

export default Dropdown;