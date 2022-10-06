import React from "react";
import './Products.css';
import { Link } from "react-router-dom";
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import addcart from '../Cart/icons/addcart.png';


const GET_PRODUCTS = gql`
  query GetProducts {
    categories {
        name 
        products {
            id
            name
            gallery
            inStock
            brand
            prices {
                currency {
                  symbol
                }
                amount
              }
            attributes{id}
            attributes{name}
            attributes{type}
            attributes{items{value}}
            attributes{items{id}}
            attributes{items{displayValue}}
            prices {
                currency {
                  symbol
                }
                amount
                
              }
          }       
      }
}
`;


class Products extends React.Component {

    render() {
        return (
            <Query query={GET_PRODUCTS}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return (
                        <div className={`container category ${this.props.darkenPage}`}>
                            <div className="category title">
                                <h1 key={this.props.category} className={this.props.category}>{this.props.category}</h1>
                            </div>
                            <div className="products">
                                {data.categories[this.props.page].products.map((product) => (
                                    <Link to={`/${this.props.category}/${product.id}`} key={product.id} className={`product ${product.inStock ? "" : "outOfStock"}`}>
                                        <div className="card">
                                            <div>
                                                {!product.inStock &&
                                                    <p id="outOfStock">OUT OF STOCK</p>}
                                                <img src={product.gallery[0]} alt={`${product.id} first`} className="image" />
                                                <img src={addcart} alt="add to the cart icon" className="invisible"
                                                    onClick={(e) => {
                                                        if (product.inStock) {
                                                            const contains = this.props.cart.filter(item => item.product.id === product.id)
                                                            if (contains.length === 0) {
                                                                const attributes = [];
                                                                product.attributes.forEach((a) => {
                                                                    attributes.push({ attribute: product.attributes.indexOf(a), selectedAttribute: 0 })
                                                                })

                                                                let ID = ""
                                                                attributes.forEach((a) => {
                                                                    ID += a.selectedAttribute
                                                                })
                                                                this.props.cart.push({ product: product, quantity: 1, attributes: attributes, ID: product.id + ID });
                                                            } else {
                                                                const currentProduct = this.props.cart.find(prod =>
                                                                    prod.product.id === product.id
                                                                )
                                                                currentProduct.quantity = currentProduct.quantity + 1
                                                            }

                                                        }

                                                        e.preventDefault();
                                                    }} />
                                            </div>
                                            <div className="description">
                                                <p className="name">{product.brand} {product.name}</p>
                                                <div className="price">
                                                    <span className="symbol">{this.props.currency}</span>
                                                    <span className="amount">{product.prices[this.props.currIndex].amount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}


                            </div>
                        </div>
                    );
                }
                }

            </Query >

        )
    }
}

export default Products;


