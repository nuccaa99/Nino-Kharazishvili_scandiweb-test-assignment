import React from "react";
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { NavLink } from "react-router-dom";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

class Categories extends React.Component {
  render() {
    return (
      <Query query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.categories.map(({ name }) => (
            <NavLink to={`/${name}`}
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              key={name}> {name} </NavLink>
          ));
        }
        }

      </Query >
    )
  }
}

export default Categories;


