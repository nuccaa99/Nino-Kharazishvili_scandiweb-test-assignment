import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import './MiniCart.css';
import Cart from './icons/Empty_Cart.jpg';



class MiniCart extends React.Component {

    render() {
        const {shownCart, onClick, elements, currency, currIndex, reference, referenceTwo} = this.props;
        return (
            <div ref={reference}>
                <div className="minicart icon">
                    <img src={Cart} alt="empty cart" onClick={onClick} />
                    <div className={elements.length === 0 ? "invisible" : "cart items quantity"}>
                        {elements.reduce((prev, object) => {
                            return prev + object.quantity
                        }, 0)}
                    </div>
                </div>

                {shownCart &&
                    <div className="modal">
                        <div className="heading">
                            <p>My Bag,</p>
                            <span>
                                {elements.reduce((prev, object) => {
                                    return prev + object.quantity
                                }, 0)}
                            </span>
                        </div>
                        <div className="items">
                            {elements.map((item) => {
                                return (
                                    <CartItem
                                        classname="cartoverlay"
                                        attributes={item.attributes}
                                        key={`${item.ID} ${item.quantity} ${item.product.name}`}
                                        item={item.product}
                                        quantity={item.quantity}
                                        cart={elements}
                                        currency={currency}
                                        currIndex={currIndex}
                                        onClick={onClick}
                                    />
                                )
                            })}
                        </div>
                        <div className="sum">
                            <span>Total</span>
                            <div className="amount">
                                <span>{currency}</span>
                                <span>
                                    {elements.reduce((prev, object) => {
                                        let sum = Math.round((prev + (object.product.prices[currIndex].amount * object.quantity)) * 100) / 100
                                        return sum
                                    }, 0).toFixed(2)}
                                </span>


                            </div>
                        </div>

                        <div className="buttons">
                            <Link to='/cart'>
                                <button ref={referenceTwo} id="view">view bag</button>
                            </Link>
                            <button id="check">check out</button>

                        </div>
                    </div>}
            </div>
        )
    }
}

export default MiniCart;