import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
        name 
        products {
            id   
            gallery  
      }
    }
}
`;



export const GET_CURRENCIES = gql`
  query GerCurrencies {
    currencies {
        symbol
        label
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($category: String!) {
    category(input: {
      title: $category
    }) {
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

export const GET_PRODUCT = gql`
        query GetProduct($product: String!) {
        product(id: $product) {
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