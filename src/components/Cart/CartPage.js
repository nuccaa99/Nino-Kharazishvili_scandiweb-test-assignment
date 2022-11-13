import React from "react";
import './CartPage.css';
import './CartItem.css';
import CartItem from "./CartItem";
import leftarrow from './icons/leftarrow.png';
import rightarrow from './icons/rightarrow.png';

class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayedImage: []
        }
        this.handleClickOnLeft = this.handleClickOnLeft.bind(this)
        this.handleClickOnRight = this.handleClickOnRight.bind(this)
    }



    handleClickOnLeft = (productIndex, selectedImage, galleryLength) => {
        if (!selectedImage) {
            selectedImage = 0
        }
        const newArr = [...this.state.displayedImage]
        if (selectedImage > 0) {
            newArr[productIndex] = selectedImage - 1
        } else {
            newArr[productIndex] = galleryLength - 1
        }
        this.setState({ displayedImage: newArr })
    }

    handleClickOnRight = (productIndex, selectedImage, galleryLength) => {
        if (!selectedImage) {
            selectedImage = 0
        }
        const newArr = [...this.state.displayedImage]
        if (selectedImage < galleryLength - 1) {
            newArr[productIndex] = selectedImage + 1
        } else {
            newArr[productIndex] = 0
        }
        this.setState({ displayedImage: newArr })
    }

    render() {
        const { darkenPage, cart, currency, currIndex } = this.props;
        return (
            <div className={`cartpage container ${darkenPage}`}>
                <div>
                    <div className="cart title">
                        <p>Cart</p>
                    </div>
                    {cart.map((prod) => {
                        return (
                            <div key={prod.ID} className="cartpage item">
                                <CartItem
                                    classname="cartpage"
                                    item={prod.product}
                                    currency={currency}
                                    currIndex={currIndex}
                                    attributes={prod.attributes}
                                    quantity={prod.quantity}
                                    displayedImage={this.state.displayedImage[cart.indexOf(prod)]}
                                    displayedImages={this.state.displayedImage}
                                    cart={cart}
                                />
                                {prod.product.gallery.length > 1 &&
                                    <div className="arrows">
                                        <img src={leftarrow}
                                            alt="left arrow icon" onClick={() => { this.handleClickOnLeft(cart.indexOf(prod), this.state.displayedImage[cart.indexOf(prod)], prod.product.gallery.length) }} />
                                        <img src={rightarrow}
                                            alt="right arrow icon" onClick={() => { this.handleClickOnRight(cart.indexOf(prod), this.state.displayedImage[cart.indexOf(prod)], prod.product.gallery.length) }} />
                                    </div>
                                }


                            </div>
                        )
                    })}
                </div>
                <div className="summary">
                    <div className="tax">
                        <span>Tax 21%:</span>
                        <span className="data">
                            <span>{currency}</span>
                            <span>
                                {cart.reduce((prev, object) => {
                                    return Math.round((prev + object.product.prices[currIndex].amount * object.quantity * 0.21) * 100) / 100
                                }, 0).toFixed(2)}
                            </span>
                        </span>
                    </div>
                    <div className="quantity">
                        <span>Quantity: </span>
                        <span className="data">
                            {cart.reduce((prev, object) => {
                                return prev + object.quantity
                            }, 0)}
                        </span>
                    </div>
                    <div className="total">
                        <span>Total: </span>
                        <span className="data">
                            <span>{currency}</span>
                            <span>
                                {cart.reduce((prev, object) => {
                                    return Math.round((prev + object.product.prices[currIndex].amount * object.quantity * 1.21) * 100) / 100
                                }, 0).toFixed(2)}
                            </span>
                        </span>
                    </div>

                    <button type="button" className="order button">order</button>

                </div>
            </div>
        )
    }

}

export default CartPage;