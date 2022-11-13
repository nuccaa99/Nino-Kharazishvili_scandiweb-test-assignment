import React from "react";

import { Query } from '@apollo/client/react/components';
import './ProductPage.css';
import { Interweave } from 'interweave';
import { GET_PRODUCT } from '../Query';

class ProductPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedImage: this.props.images[0],
            attributes: []
        }

    }

    saveIndex(attribute, selected) {
        const newArr = [...this.state.attributes]
        newArr[attribute] = selected
        this.setState({ attributes: newArr })

    }


    render() {
        const { cart, darkenPage, id, currency, currIndex, reference } = this.props;
        return (
            <Query query={GET_PRODUCT} variables={{ product: id }}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return (
                        <div className={`page container ${darkenPage}`}>
                            <div className="options-wrapper">
                                <div className="images">
                                    {data.product.gallery.map((source) => (
                                        <div className="image-wrapper" key={source}>
                                            <img className="option image" src={source} alt={data.product.name}
                                                onClick={() => { this.setState({ selectedImage: source }) }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`center ${data.product.inStock ? "" : "outOfStock"}`}>
                                {!data.product.inStock &&
                                    <p id="outOfStockLabel">OUT OF STOCK</p>}
                                <img className="option selected" src={this.state.selectedImage} alt={data.product.description} />
                            </div>
                            <div className="specifications">
                                <p id="brand">{data.product.brand}</p>
                                <p id="name">{data.product.name}</p>
                                {data.product.attributes.map((attr) => (
                                    <div className="attribute" key={attr.id}>
                                        <p id="attribute">{attr.name}:</p>
                                        <div className="attribute list">
                                            {attr.items.map((item) => (
                                                <div key={item.id} onClick={() => { this.saveIndex(data.product.attributes.indexOf(attr), attr.items.indexOf(item)) }}>
                                                    {attr.type === "swatch" &&
                                                        <button
                                                            type="button"
                                                            className={attr.items.indexOf(item) === this.state.attributes[data.product.attributes.indexOf(attr)] ? "selected swatch" : "swatch"}
                                                            style={{ backgroundColor: item.value }}
                                                            key={item.id}>
                                                        </button>}
                                                    {attr.type !== "swatch" &&
                                                        <button
                                                            type="button" className={attr.items.indexOf(item) === this.state.attributes[data.product.attributes.indexOf(attr)] ? "selected list item" : "list item"}
                                                            key={item.id}>
                                                            {item.value}
                                                        </button>}
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <p id="price">price:</p>
                                <div id="price-tag">
                                    <span>{currency}</span>
                                    <span className="amount">{data.product.prices[currIndex].amount.toFixed(2)}</span>

                                </div>
                                {data.product.inStock &&
                                    <button id="add-button" ref={reference} className={this.state.attributes.length === data.product.attributes.length ? "" : "disabled"} onClick={() => {
                                        if (data.product.inStock) {
                                            const attributes = [];
                                            if (this.state.attributes.length === data.product.attributes.length) {
                                                data.product.attributes.forEach((a) => {
                                                    attributes.push({ attribute: data.product.attributes.indexOf(a), selectedAttribute: this.state.attributes[data.product.attributes.indexOf(a)] })
                                                })
                                            } else {
                                                data.product.attributes.forEach((a) => {
                                                    attributes.push({ attribute: data.product.attributes.indexOf(a), selectedAttribute: this.state.attributes[data.product.attributes.indexOf(a)] ? this.state.attributes[data.product.attributes.indexOf(a)] : 0 })
                                                })
                                            }

                                            let ID = ""
                                            attributes.forEach((a) => {
                                                ID += a.selectedAttribute
                                            })
                                            const contains = cart.filter(item => item.ID === data.product.id + ID)
                                            if (contains.length === 0) {
                                                cart.push({ product: data.product, quantity: 1, attributes: attributes, ID: data.product.id + ID });
                                            } else {
                                                const currentProduct = cart.find(prod =>
                                                    prod.ID === data.product.id + ID
                                                )
                                                currentProduct.quantity = currentProduct.quantity + 1
                                            }

                                        }
                                    }}>
                                        ADD TO CART
                                    </button>}
                                {!data.product.inStock &&
                                    <button id="out-button">OUT OF STOCK</button>}
                                <div id="description">
                                    <Interweave content={data.product.description} />
                                </div>
                            </div>
                        </div>
                    )
                }}

            </Query>
        )
    }
}

export default ProductPage;