import React from "react";

import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';

import Vector from './icons/Vector.jpg';
import VectorTwo from './icons/VectorTwo.jpg';


const GET_CURRENCIES = gql`
  query GerCurrencies {
    currencies {
        symbol
        label
    }
  }
`;


class Dropdown extends React.Component {
    render() {
        return (
            <div>
                <Query query={GET_CURRENCIES}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        const renderedOptions = data.currencies.map((option) => {
                            return (
                                <div
                                    key={option.label}
                                    className="item"
                                    onClick={() => { this.props.saveCurrency(option.symbol, data.currencies.indexOf(option)) }}
                                >
                                    <span className={`symbol ${option.symbol}`}>{option.symbol}</span>
                                    <span className={`label ${option.label}`}>{option.label}</span>
                                </div>
                            )
                        })
                        return (
                            <div ref={this.props.reference} onClick={this.props.handleDropdownClick} className="select currency">
                                <div className="selected currency">
                                    <div id="current currency">{this.props.selectedCur}</div>
                                    <img className="arrow" src={this.props.dropDown ? VectorTwo : Vector} alt="dropdown arrow" />
                                </div>
                                <div className={this.props.dropDown ? "dropdown" : "notVisibleDropDown"}>{renderedOptions}</div>
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}

export default Dropdown;