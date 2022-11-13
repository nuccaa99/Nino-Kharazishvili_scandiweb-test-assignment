import React from "react";
import './Products.css';
import { Link } from "react-router-dom";
import { Query } from '@apollo/client/react/components';
import addcart from '../Cart/icons/addcart.png';
import { GET_PRODUCTS } from '../Query';


class Products extends React.Component {

    render() {
        const { cart, darkenPage, category, currency, currIndex } = this.props;
        return (
            <div className={`container category ${darkenPage}`}>
                <div className="category title">
                    <h1 key={category} className={category}>{category}</h1>
                </div>
                <div className="products">
                    <Query query={GET_PRODUCTS} variables={{ category: category }}>
                        {({ loading, error, data }) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error :(</p>;
                            return (
                                data.category.products.map((product) => (
                                    <Link to={`/${category}/${product.id}`}
                                        key={product.id}
                                        className={`product ${product.inStock ? "" : "outOfStock"}`}>
                                        <div className="card">
                                            {!product.inStock &&
                                                <p id="outOfStock">OUT OF STOCK</p>}
                                            <img src={product.gallery[0]} alt={`${product.id} first`} className="prod-image" />
                                            <img src={addcart} alt="add to the cart icon" className="invisible"
                                                onClick={(e) => {
                                                    if (product.inStock) {
                                                        const attributes = [];
                                                        product.attributes.forEach((a) => {
                                                            attributes.push({ attribute: product.attributes.indexOf(a), selectedAttribute: 0 })
                                                        })

                                                        let ID = ""
                                                        attributes.forEach((a) => {
                                                            ID += a.selectedAttribute
                                                        })

                                                        const contains = cart.filter(item => item.ID === (product.id + ID))

                                                        if (contains.length === 0) {
                                                            cart.push({ product: product, quantity: 1, attributes: attributes, ID: product.id + ID });
                                                        } else {
                                                            const currentProduct = cart.find(prod =>
                                                                prod.product.id === product.id
                                                            )
                                                            currentProduct.quantity = currentProduct.quantity + 1
                                                        }

                                                    }

                                                    e.preventDefault();
                                                }} />

                                            <div className="description">
                                                <p className="name">{product.brand} {product.name}</p>
                                                <div className="price">
                                                    <span className="symbol">{currency}</span>
                                                    <span className="amount">{product.prices[currIndex].amount.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))

                            )
                        }
                        }

                    </Query >


                </div>
            </div>


        )
    }
}

export default Products;


