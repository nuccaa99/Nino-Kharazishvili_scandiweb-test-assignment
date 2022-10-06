import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import './MiniCart.css';
import Cart from './icons/Empty_Cart.jpg';



class MiniCart extends React.Component {


    render() {

        return (
            <div ref={this.props.reference}>
                <div className="minicart icon">
                    <img src={Cart} alt="empty cart" onClick={this.props.onClick} />
                    <div className={this.props.elements.length === 0 ? "invisible" : "cart items quantity"}>
                        {this.props.elements.reduce((prev, object) => {
                            return prev + object.quantity
                        }, 0)}
                    </div>
                </div>

                {this.props.shownCart &&
                    <div className="modal">
                        <div className="heading">
                            <p>My Bag,</p>
                            <span>
                                {this.props.elements.reduce((prev, object) => {
                                    return prev + object.quantity
                                }, 0)}
                            </span>
                        </div>
                        <div className="items">
                            {this.props.elements.map((item) => {
                                return (
                                    <CartItem
                                        class="cartoverlay"
                                        attributes={item.attributes}
                                        key={`${item.ID} ${item.quantity} ${item.product.name}`}
                                        item={item.product}
                                        quantity={item.quantity}
                                        cart={this.props.elements}
                                        currency={this.props.currency}
                                        currIndex={this.props.currIndex}
                                        onClick={this.props.onClick}
                                    />
                                )
                            })}
                        </div>
                        <div className="sum">
                            <span>Total</span>
                            <div className="amount">
                                <span>{this.props.currency}</span>
                                <span>
                                    {this.props.elements.reduce((prev, object) => {
                                        return Math.round((prev + object.product.prices[this.props.currIndex].amount * object.quantity) * 100) / 100
                                    }, 0)}
                                </span>


                            </div>
                        </div>

                        <div className="buttons">
                            <Link to={`${window.location.pathname.substring(1, window.location.pathname.lastIndexOf('/') === window.location.pathname.indexOf('/') ? window.location.pathname.length : window.location.pathname.lastIndexOf('/'))}/cart`}>
                                <button ref={this.props.referenceTwo} id="view">view bag</button>
                            </Link>
                            <button id="check">check out</button>

                        </div>
                    </div>}
            </div>
        )
    }
}

export default MiniCart;