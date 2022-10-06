import React from "react";
import './CartItem.css'

class CartItem extends React.Component {

    render() {

        return (
            <div className={`${this.props.class} wrapper`}>
                <div className={`${this.props.class} specifications`}>
                    <p id={`${this.props.class}-brand`}>{this.props.item.brand}</p>
                    <p id={`${this.props.class}-name`}>{this.props.item.name}</p>
                    <div className={`${this.props.class} price`}>
                        <span className="symbol">{this.props.currency}</span>
                        <span className="amount">{this.props.item.prices[this.props.currIndex].amount}</span>
                    </div>
                    <div className={`${this.props.class} attributes`}>
                        {this.props.item.attributes.map((attr) => (
                            <div className={`${this.props.class} attribute`} key={attr.id}>
                                <p id={`${this.props.class}-attribute`}>{attr.name}:</p>
                                <div className={`${this.props.class} attribute list`}>
                                    {attr.items.map((element) => (
                                        <div key={element.id}>
                                            {attr.type === "swatch" &&
                                                <button type="button" className={attr.items.indexOf(element) ===
                                                    this.props.attributes.filter(a => a.attribute === this.props.item.attributes.indexOf(attr))[0].selectedAttribute
                                                    ? `${this.props.class} swatch selected` : `${this.props.class} swatch`} style={{ backgroundColor: element.value }} key={element.id}>
                                                </button>}
                                            {attr.type !== "swatch" &&
                                                <button type="button" className={attr.items.indexOf(element) ===
                                                    this.props.attributes.filter(a => a.attribute === this.props.item.attributes.indexOf(attr))[0].selectedAttribute
                                                    ? `${this.props.class} list item selected` : `${this.props.class} list item`} key={element.id}>
                                                    {element.value}
                                                </button>}
                                        </div>

                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className={`${this.props.class} quantity`}>

                    <button type="button" onClick={() => {
                        let ID = ""
                        this.props.attributes.forEach((a) => {
                            ID += a.selectedAttribute
                        })
                        const prod = this.props.cart.find(prod =>
                            prod.ID === this.props.item.id + ID
                        )
                        prod.quantity = prod.quantity + 1
                    }
                    }>+</button>
                    <p>{this.props.quantity}</p>
                    <button type="button" onClick={() => {
                        let ID = ""
                        this.props.attributes.forEach((a) => {
                            ID += a.selectedAttribute
                        })
                        const prod = this.props.cart.find(prod =>
                            prod.ID === this.props.item.id + ID
                        )
                        prod.quantity = prod.quantity - 1;
                        if (prod.quantity === 0) {
                            this.props.cart.splice(this.props.cart.indexOf(prod), 1);

                        }
                        if (this.props.cart.length === 0) {
                            if (this.props.onClick) {
                                this.props.onClick()
                            }
                        }

                    }
                    }>-</button>
                </div>
                {this.props.displayedImage > 0 &&
                    <div>
                        <img id={`${this.props.class}-image`} src={this.props.item.gallery[this.props.displayedImage]} alt="product" />
                    </div>
                }
                {!this.props.displayedImage &&
                    <div>
                        <img id={`${this.props.class}-image`} src={this.props.item.gallery[0]} alt="product" />
                    </div>
                }


            </div >
        )
    }
}

export default CartItem;