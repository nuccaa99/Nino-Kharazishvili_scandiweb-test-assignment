import React from "react";
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import './ProductPage.css'

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

        const GET_PRODUCT = gql`
        query GetProduct {
        product(id: "${this.props.id}") {
            id
            brand
            name 
            description
            gallery
            inStock
            prices {
                currency {
                  symbol
                }
                amount
              }
            gallery
            attributes{id}
            attributes{name}
            attributes{type}
            attributes{items{value}}
            attributes{items{id}}
            attributes{items{displayValue}}
           
      }
}
`;

        return (
            <Query query={GET_PRODUCT}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return (
                        <div className={`page container ${this.props.darkenPage}`}>
                            <div className="options-wrapper">
                                <div className="images">
                                    {data.product.gallery.map((source) => (
                                        <div className="image-wrapper" key={source}>
                                            <img className="product option image" src={source} alt={data.product.name}
                                                onClick={() => { this.setState({ selectedImage: source }) }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="center">
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
                                                            type="button" className={attr.items.indexOf(item) === this.state.attributes[data.product.attributes.indexOf(attr)] ? "selected swatch" : "swatch"} style={{ backgroundColor: item.value }} key={item.id}>
                                                        </button>}
                                                    {attr.type !== "swatch" &&
                                                        <button
                                                            type="button" className={attr.items.indexOf(item) === this.state.attributes[data.product.attributes.indexOf(attr)] ? "selected list item" : "list item"} key={item.id}>
                                                            {item.value}
                                                        </button>}
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <p id="price">price:</p>
                                <div id="price-tag">
                                    <span>{this.props.currency}</span>
                                    <span className="amount">{data.product.prices[this.props.currIndex].amount}</span>

                                </div>
                                {data.product.inStock &&
                                    <button id="add-button" ref={this.props.reference} onClick={() => {
                                        if (data.product.inStock) {
                                            this.props.onClick();
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


                                            const contains = this.props.cart.filter(item => item.ID === data.product.id + ID)
                                            if (contains.length === 0) {
                                                this.props.cart.push({ product: data.product, quantity: 1, attributes: attributes, ID: data.product.id + ID });
                                            } else {
                                                const currentProduct = this.props.cart.find(prod =>
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
                                <div id="description"
                                    dangerouslySetInnerHTML={{ __html: data.product.description }}
                                />
                            </div>
                        </div>
                    )
                }}

            </Query>
        )
    }
}

export default ProductPage;