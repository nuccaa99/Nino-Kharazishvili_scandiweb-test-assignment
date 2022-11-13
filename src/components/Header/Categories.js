import React from "react";
import { NavLink } from "react-router-dom";



class Categories extends React.Component {
  render() {
    const { category } = this.props;
    return (
      <NavLink to={`/${category}`}
        className={({ isActive }) => (isActive ? 'active' : 'inactive')}> {category} </NavLink>
    )
  }
}

export default Categories;


