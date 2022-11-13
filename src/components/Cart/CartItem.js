import React from "react";
import './CartItem.css'

class CartItem extends React.Component {
    render() {
        const { classname, attributes, item, quantity, cart, currency, currIndex,
            displayedImage, displayedImages } = this.props;
        return (
            <div className={`${classname} wrapper`}>
                <div className={`${classname} specifications`}>
                    <p id={`${classname}-brand`}>{item.brand}</p>
                    <p id={`${classname}-name`}>{item.name}</p>
                    <div className={`${classname} price`}>
                        <span className="symbol">{currency}</span>
                        <span className="amount">{item.prices[currIndex].amount.toFixed(2)}</span>
                    </div>
                    <div className={`${classname} attributes`}>
                        {item.attributes.map((attr) => (
                            <div className={`${classname} attribute`} key={attr.id}>
                                <p id={`${classname}-attribute`}>{attr.name}:</p>
                                <div className={`${classname} attribute list`}>
                                    {attr.items.map((element) => (
                                        <div key={element.id}>
                                            {attr.type === "swatch" &&
                                                <button type="button" className={attr.items.indexOf(element) ===
                                                    attributes.filter(a => a.attribute === item.attributes.indexOf(attr))[0].selectedAttribute
                                                    ? `${classname} swatch selected` : `${classname} swatch`} style={{ backgroundColor: element.value }} key={element.id}>
                                                </button>}
                                            {attr.type !== "swatch" &&
                                                <button type="button" className={attr.items.indexOf(element) ===
                                                    attributes.filter(a => a.attribute === item.attributes.indexOf(attr))[0].selectedAttribute
                                                    ? `${classname} list item selected` : `${classname} list item`} key={element.id}>
                                                    {element.value}
                                                </button>}
                                        </div>

                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className={`${classname} quantity-images`}>
                    <div className={`${classname} quantity`}>
                        <button type="button" onClick={() => {
                            let ID = ""
                            attributes.forEach((a) => {
                                ID += a.selectedAttribute
                            })
                            const prod = cart.find(prod =>
                                prod.ID === item.id + ID
                            )
                            prod.quantity = prod.quantity + 1
                        }
                        }>+</button>
                        <p>{quantity}</p>
                        <button type="button" onClick={() => {
                            let ID = ""
                            attributes.forEach((a) => {
                                ID += a.selectedAttribute
                            })
                            const prod = cart.find(prod =>
                                prod.ID === item.id + ID
                            )
                            prod.quantity = prod.quantity - 1;
                            if (prod.quantity === 0) {
                                if (displayedImages) {
                                    displayedImages.splice(cart.indexOf(prod), 1);
                                }
                                cart.splice(cart.indexOf(prod), 1);

                            }
                        }
                        }>-</button>
                    </div>
                    {displayedImage > 0 &&
                        <div>
                            <img id={`${classname}-image`} src={item.gallery[displayedImage]} alt="product" />
                        </div>
                    }
                    {!displayedImage &&
                        <div>
                            <img id={`${classname}-image`} src={item.gallery[0]} alt="product" />
                        </div>
                    }

                </div>
            </div >
        )
    }
}

export default CartItem;