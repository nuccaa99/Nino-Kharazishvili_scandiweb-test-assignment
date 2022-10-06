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



    handleClickOnLeft = (productIndex, selectedImage) => {
        if (!selectedImage) {
            selectedImage = 0
        }
        const newArr = [...this.state.displayedImage]
        if (selectedImage > 0) {
            newArr[productIndex] = selectedImage - 1
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
        }
        this.setState({ displayedImage: newArr })
    }

    render() {

        return (
            <div className={`cartpage container ${this.props.darkenPage}`}>
                <div>
                    <div className="cart title">
                        <p>Cart</p>
                    </div>
                    {this.props.cart.map((prod) => {
                        return (
                            <div key={prod.ID}>
                                <CartItem
                                    class="cartpage"
                                    item={prod.product}
                                    currency={this.props.currency}
                                    currIndex={this.props.currIndex}
                                    attributes={prod.attributes}
                                    quantity={prod.quantity}
                                    displayedImage={this.state.displayedImage[this.props.cart.indexOf(prod)]}
                                    cart={this.props.cart}
                                />
                                {prod.product.gallery.length > 1 &&
                                    <div className="arrows">
                                        <img src={leftarrow} className={this.state.displayedImage[this.props.cart.indexOf(prod)] ? "" : "noMore"}
                                            alt="left arrow icon" onClick={() => { this.handleClickOnLeft(this.props.cart.indexOf(prod), this.state.displayedImage[this.props.cart.indexOf(prod)]) }} />
                                        <img src={rightarrow} className={this.state.displayedImage[this.props.cart.indexOf(prod)] === prod.product.gallery.length - 1 ? "noMore" : ""}
                                            alt="right arrow icon" onClick={() => { this.handleClickOnRight(this.props.cart.indexOf(prod), this.state.displayedImage[this.props.cart.indexOf(prod)], prod.product.gallery.length) }} />
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
                            <span>{this.props.currency}</span>
                            <span>
                                {this.props.cart.reduce((prev, object) => {
                                    return Math.round((prev + object.product.prices[this.props.currIndex].amount * object.quantity * 0.21) * 100) / 100
                                }, 0)}
                            </span>
                        </span>
                    </div>
                    <div className="quantity">
                        <span>Quantity:</span>
                        <span className="data">
                            {this.props.cart.reduce((prev, object) => {
                                return prev + object.quantity
                            }, 0)}
                        </span>
                    </div>
                    <div className="total">
                        <span>Total: </span>
                        <span className="data">
                            <span>{this.props.currency}</span>
                            <span>
                                {this.props.cart.reduce((prev, object) => {
                                    return Math.round((prev + object.product.prices[this.props.currIndex].amount * object.quantity * 1.21) * 100) / 100
                                }, 0)}
                            </span>
                        </span>
                    </div>

                    <button type="button" className="order button">Order</button>

                </div>
            </div>
        )
    }

}

export default CartPage;