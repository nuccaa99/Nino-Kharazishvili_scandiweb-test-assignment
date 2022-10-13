import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';

import Products from "./Products/Products";
import ProductPage from "./Products/ProductPage";
import CurrencyDropdown from "./Header/CurrencyDropdown";
import MiniCart from "./Cart/MiniCart";
import CartPage from "./Cart/CartPage";
import Categories from "./Header/Categories";

import './Header/Header.css';

import Logo from './Header/icons/logo.jpg';


const GET_DATA = gql`
  query GetData {
    categories {
        name 
        products {
            id   
            gallery  
      }
    }
}
`;


class App extends React.Component {

    constructor() {
        super()
        this.state = {
            selectedCur: "$",
            selectedCurIndex: 0,
            openDropDown: false,
            shownCart: false,
            cartItems: []
        }


        this.handleClickOnCart = this.handleClickOnCart.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleClickOnAddCart = this.handleClickOnAddCart.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this)
        this.refCurrency = React.createRef();
        this.refCart = React.createRef();
        this.refAddButton = React.createRef();
        this.refView = React.createRef();

    }


    componentDidMount() {
        document
            .addEventListener('click', this.handleClickOutside);

        if (localStorage.getItem('selectedCur')) {
            const jsonselectedCur = localStorage.getItem('selectedCur')
            const selectedCur = JSON.parse(jsonselectedCur)
            this.setState(() => ({ selectedCur }))
        }

        if (localStorage.getItem('selectedCurIndex')) {
            const jsonselectedCurIndex = localStorage.getItem('selectedCurIndex')
            const selectedCurIndex = JSON.parse(jsonselectedCurIndex)
            this.setState(() => ({ selectedCurIndex }))
        }
        if (localStorage.getItem('selectedCurIndex')) {
            const jsonopenDropDown = localStorage.getItem('openDropDown')
            const openDropDown = JSON.parse(jsonopenDropDown)
            this.setState(() => ({ openDropDown }))
        }
        if (localStorage.getItem('selectedCurIndex')) {
            const jsonshownCart = localStorage.getItem('shownCart')
            const shownCart = JSON.parse(jsonshownCart)
            this.setState(() => ({ shownCart }))
        }
        if (localStorage.getItem('selectedCurIndex')) {
            const jsoncartItems = localStorage.getItem('cartItems')
            const cartItems = JSON.parse(jsoncartItems)
            this.setState(() => ({ cartItems }))
        }


    }

    componentDidUpdate(prevProps, prevStates) {
        const jsonselectedCur = JSON.stringify(this.state.selectedCur)
        localStorage.setItem('selectedCur', jsonselectedCur)

        const jsonselectedCurIndex = JSON.stringify(this.state.selectedCurIndex)
        localStorage.setItem('selectedCurIndex', jsonselectedCurIndex)

        const jsonopenDropDown = JSON.stringify(this.state.openDropDown)
        localStorage.setItem('openDropDown', jsonopenDropDown)

        const jsonshownCart = JSON.stringify(this.state.shownCart)
        localStorage.setItem('shownCart', jsonshownCart)

        const jsoncartItems = JSON.stringify(this.state.cartItems)
        localStorage.setItem('cartItems', jsoncartItems)

    }

    handleClickOutside = (event) => {
        if (this.refCurrency.current && this.refCurrency.current.contains(event.target)) {
            return;
        } else {
            this.setState({ openDropDown: false })
        }

        if (((this.refCart.current && this.refCart.current.contains(event.target))
            || (this.refAddButton.current && this.refAddButton.current.contains(event.target)))
            && !(this.refView.current && this.refView.current.contains(event.target))) {
            return;
        } else {
            this.setState({ shownCart: false })
        }
    }

    handleClickOnCart = () => {
        this.setState({ shownCart: !this.state.shownCart })
    }

    handleClickOnAddCart = () => {
        this.setState({ shownCart: true })
    }

    saveCurrency = (currency, index) => {
        this.setState({
            selectedCur: currency,
            selectedCurIndex: index
        })
    }

    handleDropdown = () => {
        this.setState({ openDropDown: !this.state.openDropDown })
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClickOutside);
    }

    render() {
        return (
            <div>
                <div className="container header">
                    <div className="categories">
                        <Categories />
                    </div>
                    <img id="green-logo" src={Logo} alt="green logo" />
                    <div className="currencies cart">
                        <CurrencyDropdown
                            saveCurrency={this.saveCurrency}
                            selectedCur={this.state.selectedCur}
                            selectedCurIndex={this.state.selectedCurIndex}
                            handleDropdownClick={this.handleDropdown}
                            dropDown={this.state.openDropDown}
                            reference={this.refCurrency} />

                        <MiniCart
                            shownCart={this.state.shownCart}
                            onClick={this.handleClickOnCart}
                            elements={this.state.cartItems}
                            currency={this.state.selectedCur}
                            currIndex={this.state.selectedCurIndex}
                            reference={this.refCart}
                            referenceTwo={this.refView}
                        />
                    </div>
                </div>
                <Query query={GET_DATA}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        return (
                            <Routes>
                                <Route path="/" element={<Navigate to="/all" />} />
                                {data.categories.map((category, index) => {
                                    return (
                                        <React.Fragment key={category.name}>
                                            <Route path={`/${category.name}`}
                                                element={<Products
                                                    cart={this.state.cartItems}
                                                    darkenPage={this.state.shownCart ? "darken" : ""}
                                                    category={category.name}
                                                    page={index}
                                                    currency={this.state.selectedCur}
                                                    currIndex={this.state.selectedCurIndex} />}
                                            />
                                            <Route path={`/${category.name}/cart`}
                                                element={<CartPage
                                                    darkenPage={this.state.shownCart ? "darken" : ""}
                                                    cart={this.state.cartItems}
                                                    onClick={this.handleClickOnCart}
                                                    currency={this.state.selectedCur}
                                                    currIndex={this.state.selectedCurIndex} />} />
                                            {category.products.map((product) => {
                                                return (
                                                    <Route path={`/${category.name}/${product.id}`} key={product.id}
                                                        element={<ProductPage
                                                            cart={this.state.cartItems}
                                                            darkenPage={this.state.shownCart ? "darken" : ""}
                                                            id={product.id}
                                                            images={product.gallery}
                                                            currency={this.state.selectedCur}
                                                            currIndex={this.state.selectedCurIndex}
                                                            onClick={this.handleClickOnAddCart}
                                                            reference={this.refAddButton} />} />
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                })}
                            </Routes>

                        );
                    }
                    }
                </Query >


            </div>
        )
    }
}

export default App;